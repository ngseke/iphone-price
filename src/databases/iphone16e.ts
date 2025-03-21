import { type Iphone } from '../types/Iphone'

const url = 'https://www.apple.com/tw/iphone-16e/specs/'

export const iphone16e: Iphone[] = [
  {
    model: 'iphone-16e',
    storage: 128,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2025-02',
    price: { twd: 21_900 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-16e',
    storage: 256,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2025-02',
    price: { twd: 25_400 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-16e',
    storage: 512,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2025-02',
    price: { twd: 32_400 },
    isInitialRelease: true,
    url,
  },
]
