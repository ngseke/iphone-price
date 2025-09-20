import { type Iphone } from '../types/Iphone'

const url = 'https://www.apple.com/tw/iphone-16e/specs/'

export const iphone16eList: Iphone[] = [
  {
    model: 'iphone-16e',
    storage: 128,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2025-02',
    price: { twd: 21_900, usd: 599, eur: 599 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-16e',
    storage: 256,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2025-02',
    price: { twd: 25_400, usd: 699, eur: 699 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-16e',
    storage: 512,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2025-02',
    price: { twd: 32_400, usd: 899, eur: 899 },
    isInitialRelease: true,
    url,
  },
]
