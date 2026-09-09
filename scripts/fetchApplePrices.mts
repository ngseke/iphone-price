/**
 * Fetch iPhone prices from Apple's online store and keep `src/databases/*.ts`
 * in sync.
 *
 * Usage (Node 24+, no extra dependencies):
 *
 *   # List every iPhone buy page on the Taiwan store, whether it's online, and
 *   # which models it sells (models missing from src/databases are marked NEW)
 *   pnpm fetch-prices discover
 *
 *   # New models: fetch buy-page slugs and write a database file
 *   pnpm fetch-prices fetch --slugs iphone-18,iphone-18-pro --released-at 2026-09 \
 *     --out src/databases/iphone18.ts --name iphone18List
 *
 *   # Existing models: compare store prices with the database and append
 *   # price-adjustment entries (no `isInitialRelease`) to the matching files
 *   pnpm fetch-prices adjust --slugs iphone-17,iphone-air,iphone-17e,iphone-16 \
 *     --released-at 2026-09 --write
 *
 *   Without --out / --write both commands are dry runs that only print.
 *
 *   Offline testing: set FIXTURE_DIR=<dir> containing buy_index.html,
 *   buy_<slug>.html (TW) and buy_us_<slug>.html (US) instead of hitting the network.
 *
 * Data sources (per buy page, e.g. https://www.apple.com/tw/shop/buy-iphone/iphone-17):
 *   - `<script id="metrics" type="application/json">` → data.products[] with
 *     { sku, partNumber, price.fullPrice, name: "iPhone 17 256GB Mist Blue" }
 *   - TWD: metrics fullPrice is the retail price.
 *   - USD: metrics fullPrice is the SIM-free ("connect later") price. The headline
 *     price (what this project records, e.g. $799 for iPhone 17) is the lowest
 *     carrier-activation price, read from the `prices` map
 *     (`product` / `carrierProduct` / `amountBeforeTradeIn`) embedded in the same page.
 *   - EUR is intentionally left out (experimental column, filled manually).
 *   - A 503 whose body contains `"cv":"announce"` is the "We'll be back" page.
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

type Line = 'premium' | 'regular' | 'entry-level'

interface Product {
  model: string
  storage: number
  line: Line
  suffix: string
  price: { twd?: number; usd?: number }
  url: string
}

interface DbEntry {
  file: string
  model: string
  storage: number
  line: Line
  suffix: string
  releasedAt: string
  price: { twd?: number; usd?: number }
  /** The `url:` expression as written in the file (usually a const name). */
  urlExpression?: string
  isInitialRelease: boolean
}

const DB_DIR = 'src/databases'
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36'

const KNOWN_SUFFIXES = ['base', 'plus', 'pro', 'pro-max', 'mini', 'air', 'fold']
const PREMIUM_SUFFIXES = ['pro', 'pro-max', 'fold']

/** Manual overrides for models the heuristics can't classify. */
const OVERRIDES: Partial<
  Record<string, Partial<Pick<Product, 'line' | 'suffix'>>>
> = {
  'iphone-duo': { line: 'premium', suffix: 'fold' },
}

// ---------------------------------------------------------------------------
// CLI helpers
// ---------------------------------------------------------------------------

function parseArgs(argv: string[]) {
  const [command = 'fetch', ...rest] = argv
  const opts: Record<string, string> = {}
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i]
    if (!arg.startsWith('--')) continue
    const key = arg.slice(2)
    const next = rest[i + 1]
    if (next && !next.startsWith('--')) {
      opts[key] = next
      i++
    } else {
      opts[key] = 'true'
    }
  }
  return { command, opts }
}

function parseSlugs(value: string | undefined) {
  if (!value)
    throw new Error('--slugs is required, e.g. --slugs iphone-17,iphone-air')
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function requireReleasedAt(value: string | undefined) {
  if (!value || !/^\d{4}-\d{2}(-\d{2})?$/.test(value))
    throw new Error('--released-at is required, e.g. --released-at 2026-09')
  return value
}

// ---------------------------------------------------------------------------
// Fetching
// ---------------------------------------------------------------------------

const TW_INDEX_URL = 'https://www.apple.com/tw/shop/buy-iphone'
const twBuyUrl = (slug: string) => `${TW_INDEX_URL}/${slug}`
const usBuyUrl = (slug: string) =>
  `https://www.apple.com/shop/buy-iphone/${slug}`
const twSpecsUrl = (slug: string) => `https://www.apple.com/tw/${slug}/specs/`

function fixturePath(url: string) {
  const dir = process.env.FIXTURE_DIR
  if (!dir) return null
  if (url === TW_INDEX_URL) return join(dir, 'buy_index.html')
  const tw = /\/tw\/shop\/buy-iphone\/([a-z0-9-]+)$/.exec(url)
  if (tw) return join(dir, `buy_${tw[1]}.html`)
  const us = /apple\.com\/shop\/buy-iphone\/([a-z0-9-]+)$/.exec(url)
  if (us) return join(dir, `buy_us_${us[1]}.html`)
  return null
}

async function fetchPage(url: string) {
  const fixture = fixturePath(url)
  let status: number
  let html: string
  if (fixture) {
    if (existsSync(fixture)) {
      status = 200
      html = readFileSync(fixture, 'utf8')
    } else {
      status = 404
      html = ''
    }
  } else {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept-Language': 'zh-TW,en;q=0.8' },
    })
    status = res.status
    html = await res.text()
  }
  const isAnnounce = status === 503 || /"cv"\s*:\s*"announce"/.test(html)
  return { status, html, isAnnounce }
}

function extractJsonScript(html: string, id: string): unknown {
  const re = new RegExp(`<script[^>]*id="${id}"[^>]*>([\\s\\S]*?)</script>`)
  const m = re.exec(html)
  if (!m) throw new Error(`<script id="${id}"> not found`)
  return JSON.parse(m[1])
}

interface MetricsProduct {
  sku: string
  partNumber: string
  price: { fullPrice: number }
  name: string
}

function extractMetricsProducts(html: string): MetricsProduct[] {
  const metrics = extractJsonScript(html, 'metrics') as {
    data: { currency: string; products: MetricsProduct[] }
  }
  return metrics.data.products
}

/** part number → lowest carrier-activation price (US page only). */
function extractCarrierPrices(html: string) {
  // Entries look like:
  //   "mg464ll_a_verizon_iphone17":{"product":"MG484LL/A","carrierProduct":"ATT_IPHONE17",...,"amountBeforeTradeIn":799.00
  //   "mg484ll_a_unlocked_us":{"product":"MG484LL/A","carrierProduct":"UNLOCKED/US",...,"amountBeforeTradeIn":829.00
  // `product` is the representative part for a capacity; take the lowest amount across carriers.
  const re =
    /"product":"([A-Z0-9/]+)","carrierProduct":"[^"]+"[^{}]*?"amountBeforeTradeIn":([0-9.]+)/g
  const result = new Map<string, number>()
  for (const m of html.matchAll(re)) {
    const part = m[1]
    const price = Number(m[2])
    const current = result.get(part)
    if (current === undefined || price < current) result.set(part, price)
  }
  return result
}

/**
 * "iPhone 17 Pro Max 256GB Cosmic Orange" → { model: 'iphone-17-pro-max', storage: 256 }
 */
function parseProductName(rawName: string) {
  // Apple uses non-breaking spaces (U+00A0) inside product names.
  const name = rawName.replace(/\s+/g, ' ').trim()
  const m = /^(iPhone .+?) (\d+) ?(GB|TB)\b/i.exec(name)
  if (!m) return null
  const modelName = m[1].trim()
  const size = Number(m[2])
  const storage = m[3].toUpperCase() === 'TB' ? size * 1024 : size
  const model = modelName.toLowerCase().replace(/\s+/g, '-')
  return { model, modelName, storage }
}

function classify(model: string): { line: Line; suffix: string } {
  const parts = model.split('-').slice(1) // drop "iphone"
  const rest = parts.filter((p) => !/^\d+e?$/.test(p)) // drop generation number
  let suffix = rest.length === 0 ? 'base' : rest.join('-')
  let line: Line = 'regular'

  if (parts.some((p) => /^\d+e$/.test(p))) line = 'entry-level'
  else if (PREMIUM_SUFFIXES.includes(suffix)) line = 'premium'

  const override = OVERRIDES[model]
  if (override?.line) line = override.line
  if (override?.suffix) suffix = override.suffix

  if (!KNOWN_SUFFIXES.includes(suffix)) {
    console.warn(
      `⚠️  Unknown suffix "${suffix}" for ${model}. Add it to IphoneSuffix in src/types/Iphone.ts (and a color in src/modules/iphoneDataset.ts), or set OVERRIDES in this script.`,
    )
  }
  return { line, suffix }
}

const productKey = (model: string, storage: number) =>
  `${model},${String(storage)}`

async function fetchSlug(slug: string) {
  const [tw, us] = await Promise.all([
    fetchPage(twBuyUrl(slug)),
    fetchPage(usBuyUrl(slug)),
  ])
  if (tw.isAnnounce)
    throw new Error(`${twBuyUrl(slug)} → store is down ("We'll be back")`)
  if (tw.status !== 200)
    throw new Error(`${twBuyUrl(slug)} → HTTP ${String(tw.status)}`)

  const products = new Map<string, Product>()

  for (const p of extractMetricsProducts(tw.html)) {
    const parsed = parseProductName(p.name)
    if (!parsed) {
      console.warn(`⚠️  Could not parse product name: "${p.name}"`)
      continue
    }
    const key = productKey(parsed.model, parsed.storage)
    if (products.has(key)) continue
    products.set(key, {
      model: parsed.model,
      storage: parsed.storage,
      ...classify(parsed.model),
      price: { twd: p.price.fullPrice },
      url: twSpecsUrl(slug),
    })
  }

  if (us.status === 200 && !us.isAnnounce) {
    const carrierPrices = extractCarrierPrices(us.html)
    for (const p of extractMetricsProducts(us.html)) {
      const parsed = parseProductName(p.name)
      if (!parsed) continue
      const product = products.get(productKey(parsed.model, parsed.storage))
      if (!product) continue
      const headline = carrierPrices.get(p.partNumber)
      const usd = headline ?? p.price.fullPrice
      product.price.usd = Math.min(product.price.usd ?? Infinity, usd)
    }
  } else {
    console.warn(
      `⚠️  US page unavailable for ${slug} (HTTP ${String(us.status)}); usd left empty`,
    )
  }

  return [...products.values()].sort(
    (a, b) => a.model.localeCompare(b.model) || a.storage - b.storage,
  )
}

async function fetchSlugs(slugs: string[]) {
  const products: Product[] = []
  for (const slug of slugs) {
    console.log(`Fetching ${slug} ...`)
    products.push(...(await fetchSlug(slug)))
  }
  return products
}

// ---------------------------------------------------------------------------
// Existing database
// ---------------------------------------------------------------------------

function readDatabase(): DbEntry[] {
  const entries: DbEntry[] = []
  const files = readdirSync(DB_DIR).filter(
    (f) => /^iphone.+\.ts$/.test(f) && f !== 'iphone.ts',
  )
  for (const file of files) {
    const path = join(DB_DIR, file)
    const source = readFileSync(path, 'utf8')
    for (const m of source.matchAll(/\{\s*\n\s*model:[\s\S]*?\n\s*\}/g)) {
      const block = m[0]
      const pick = (key: string) =>
        new RegExp(`\\b${key}:\\s*([^,\\n}]+)`).exec(block)?.[1].trim()
      const unquote = (v: string | undefined) => v?.replace(/^'|'$/g, '')
      const num = (v: string | undefined) =>
        v === undefined ? undefined : Number(v.replaceAll('_', ''))
      const model = unquote(pick('model'))
      const storage = num(pick('storage'))
      const releasedAt = unquote(pick('releasedAt'))
      if (!model || storage === undefined || !releasedAt) continue
      entries.push({
        file: path,
        model,
        storage,
        line: unquote(pick('line')) as Line,
        suffix: unquote(pick('suffix')) ?? 'base',
        releasedAt,
        price: { twd: num(pick('twd')), usd: num(pick('usd')) },
        // `url: iphone17Url,` → "iphone17Url"; shorthand `url,` → "url"
        urlExpression:
          pick('url') ?? (/\n\s*url,/.test(block) ? 'url' : undefined),
        isInitialRelease: /isInitialRelease:\s*true/.test(block),
      })
    }
  }
  return entries
}

/** (model, storage) → entries sorted by releasedAt ascending. */
function groupDatabase(entries: DbEntry[]) {
  const map = new Map<string, DbEntry[]>()
  for (const e of entries) {
    const key = productKey(e.model, e.storage)
    const list = map.get(key) ?? []
    list.push(e)
    map.set(key, list)
  }
  map.forEach((list) =>
    list.sort((a, b) => a.releasedAt.localeCompare(b.releasedAt)),
  )
  return map
}

// ---------------------------------------------------------------------------
// Code generation
// ---------------------------------------------------------------------------

function formatNumber(n: number) {
  return n.toLocaleString('en-US').replaceAll(',', '_')
}

function toCamel(slug: string) {
  return slug.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())
}

function formatPrice(price: { twd?: number; usd?: number }) {
  return [
    price.twd !== undefined ? `twd: ${formatNumber(price.twd)}` : null,
    price.usd !== undefined ? `usd: ${formatNumber(price.usd)}` : null,
  ]
    .filter(Boolean)
    .join(', ')
}

function formatEntry(
  p: Pick<Product, 'model' | 'storage' | 'line' | 'suffix' | 'price'>,
  releasedAt: string,
  urlExpression: string,
  isInitialRelease: boolean,
) {
  return [
    '  {',
    `    model: '${p.model}',`,
    `    storage: ${String(p.storage)},`,
    `    line: '${p.line}',`,
    `    suffix: '${p.suffix}',`,
    `    releasedAt: '${releasedAt}',`,
    `    price: { ${formatPrice(p.price)} },`,
    ...(isInitialRelease ? ['    isInitialRelease: true,'] : []),
    urlExpression === 'url' ? '    url,' : `    url: ${urlExpression},`,
    '  },',
  ].join('\n')
}

function generateSource(
  products: Product[],
  slugs: string[],
  releasedAt: string,
  listName = `${toCamel(slugs[0])}List`,
) {
  const urlVars = new Map<string, string>()
  products.forEach((p) => {
    if (!urlVars.has(p.url)) {
      const slug = /\/tw\/([a-z0-9-]+)\/specs/.exec(p.url)?.[1] ?? p.url
      urlVars.set(p.url, `${toCamel(slug)}Url`)
    }
  })

  const lines: string[] = []
  lines.push(`import { type Iphone } from '../types/Iphone'`, '')
  urlVars.forEach((name, url) => lines.push(`const ${name} = '${url}'`))
  lines.push('', `export const ${listName}: Iphone[] = [`)

  let prevModel = ''
  products.forEach((p) => {
    if (prevModel && prevModel !== p.model) lines.push('')
    prevModel = p.model
    lines.push(
      formatEntry(p, releasedAt, urlVars.get(p.url) ?? `'${p.url}'`, true),
    )
  })
  lines.push(']', '')
  return lines.join('\n')
}

function printTable(products: Product[]) {
  console.table(
    products.map((p) => ({
      model: p.model,
      storage: p.storage,
      line: p.line,
      suffix: p.suffix,
      twd: p.price.twd,
      usd: p.price.usd,
    })),
  )
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

async function discover() {
  const index = await fetchPage(TW_INDEX_URL)
  if (index.isAnnounce) {
    console.log('🚧 Taiwan store is down ("We\'ll be back")')
    return
  }
  if (index.status !== 200)
    throw new Error(`${TW_INDEX_URL} → HTTP ${String(index.status)}`)

  const knownModels = new Set(readDatabase().map((e) => e.model))
  const slugs = [
    ...new Set(
      [...index.html.matchAll(/buy-iphone\/([a-z0-9-]+)/g)].map((m) => m[1]),
    ),
  ].filter((s) => s.startsWith('iphone'))

  for (const slug of slugs) {
    const page = await fetchPage(twBuyUrl(slug))
    let names = ''
    if (!page.isAnnounce && page.status === 200) {
      try {
        const models = [
          ...new Set(
            extractMetricsProducts(page.html)
              .map((p) => parseProductName(p.name)?.model)
              .filter((m) => m !== undefined),
          ),
        ]
        names = models
          .map((m) => (knownModels.has(m) ? m : `${m} ⭐ NEW`))
          .join(', ')
      } catch {
        names = '(metrics not found)'
      }
    }
    const state = page.isAnnounce ? '🚧 down' : `HTTP ${String(page.status)}`
    console.log(`${slug.padEnd(20)} ${state.padEnd(10)} ${names}`)
  }
}

async function fetchCommand(opts: Record<string, string>) {
  const slugs = parseSlugs(opts.slugs)
  const releasedAt = requireReleasedAt(opts['released-at'])
  const products = await fetchSlugs(slugs)
  printTable(products)

  const known = groupDatabase(readDatabase())
  const existing = products.filter((p) =>
    known.has(productKey(p.model, p.storage)),
  )
  if (existing.length) {
    console.warn(
      `⚠️  Already in database (use "adjust" for price changes): ${[...new Set(existing.map((p) => p.model))].join(', ')}`,
    )
  }

  const source = generateSource(products, slugs, releasedAt, opts.name)
  if (opts.out) {
    writeFileSync(opts.out, source)
    console.log(`✅ Wrote ${String(products.length)} entries to ${opts.out}`)
  } else {
    console.log('\n--- generated source (dry run, pass --out to write) ---\n')
    console.log(source)
  }
}

async function adjustCommand(opts: Record<string, string>) {
  const slugs = parseSlugs(opts.slugs)
  const releasedAt = requireReleasedAt(opts['released-at'])
  const products = await fetchSlugs(slugs)
  const known = groupDatabase(readDatabase())

  interface Adjustment {
    product: Product
    latest: DbEntry
  }
  const adjustments: Adjustment[] = []
  const rows: Record<string, unknown>[] = []

  for (const p of products) {
    const history = known.get(productKey(p.model, p.storage))
    const latest = history?.at(-1)
    let status: string
    if (!latest) {
      status = 'NEW (use fetch)'
    } else if (latest.releasedAt === releasedAt) {
      status = 'already recorded'
    } else if (
      latest.price.twd === p.price.twd &&
      (p.price.usd === undefined || latest.price.usd === p.price.usd)
    ) {
      status = 'unchanged'
    } else {
      status = 'CHANGED'
      adjustments.push({ product: p, latest })
    }
    rows.push({
      model: p.model,
      storage: p.storage,
      'twd (db)': latest?.price.twd,
      'twd (store)': p.price.twd,
      'usd (db)': latest?.price.usd,
      'usd (store)': p.price.usd,
      status,
    })
  }
  console.table(rows)

  if (!adjustments.length) {
    console.log('✅ No price changes.')
    return
  }

  // Group by file, keep the database's line/suffix and url expression.
  const byFile = new Map<string, string[]>()
  for (const { product, latest } of adjustments) {
    const entry = formatEntry(
      { ...product, line: latest.line, suffix: latest.suffix },
      releasedAt,
      latest.urlExpression ?? `'${product.url}'`,
      false,
    )
    const list = byFile.get(latest.file) ?? []
    list.push(entry)
    byFile.set(latest.file, list)
  }

  for (const [file, entries] of byFile) {
    const addition = `\n${entries.join('\n')}\n`
    if (opts.write === 'true') {
      const source = readFileSync(file, 'utf8')
      const closing = source.lastIndexOf('\n]')
      if (closing === -1)
        throw new Error(`Could not find closing "]" in ${file}`)
      writeFileSync(
        file,
        `${source.slice(0, closing)}\n${addition}${source.slice(closing + 1)}`,
      )
      console.log(`✅ Appended ${String(entries.length)} entries to ${file}`)
    } else {
      console.log(
        `\n--- ${file} (dry run, pass --write to append) ---${addition}`,
      )
    }
  }
}

async function main() {
  const { command, opts } = parseArgs(process.argv.slice(2))
  switch (command) {
    case 'discover':
      await discover()
      break
    case 'fetch':
      await fetchCommand(opts)
      break
    case 'adjust':
      await adjustCommand(opts)
      break
    default:
      throw new Error(`Unknown command: ${command} (discover | fetch | adjust)`)
  }
}

main().catch((err: unknown) => {
  console.error('❌', err instanceof Error ? err.message : err)
  process.exit(1)
})
