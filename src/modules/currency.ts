import z from 'zod'

export const currencySchema = z.enum(['twd', 'usd', 'eur'])

export type CurrencyValue = z.infer<typeof currencySchema>

export interface CurrencyOption {
  name: string
  description: string
}

export const currencyOptions: Record<CurrencyValue, CurrencyOption> = {
  twd: { name: '新台幣 (TWD)', description: '' },
  usd: { name: '美金 (USD)', description: '' },
  eur: { name: '歐元 (EUR)', description: '' },
}

export type Price = Partial<Record<CurrencyValue, number>>
