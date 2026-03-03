import { type Iphone } from '../types/Iphone'

const url = 'https://www.apple.com/tw/iphone-17e/specs/'

export const iphone17eList: Iphone[] = [
  {
    model: 'iphone-17e',
    storage: 256,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2026-03',
    price: { twd: 21_900, usd: 599, eur: 0 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-17e',
    storage: 512,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2026-03',
    price: { twd: 28_900, usd: 799, eur: 0 },
    isInitialRelease: true,
    url,
  },
]
