import { type Iphone } from '../types/Iphone'

const url = 'https://support.apple.com/112005'

export const iphoneSeList: Iphone[] = [
  {
    model: 'iphone-SE',
    storage: 16,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2016-03',
    price: { twd: 15_500, usd: 399 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-SE',
    storage: 64,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2016-03',
    price: { twd: 19_500, usd: 499 },
    isInitialRelease: true,
    url,
  },

  {
    model: 'iphone-SE',
    storage: 32,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2017-03',
    price: { twd: 15_500, usd: 399 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-SE',
    storage: 128,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2017-03',
    price: { twd: 19_500, usd: 499 },
    isInitialRelease: true,
    url,
  },

  {
    model: 'iphone-SE',
    storage: 32,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2017-09',
    price: { twd: 12_900, usd: 349 },
    url,
  },
  {
    model: 'iphone-SE',
    storage: 128,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2017-09',
    price: { twd: 16_500, usd: 449 },
    url,
  },
]
