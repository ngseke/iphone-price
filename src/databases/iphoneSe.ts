import { type Iphone } from '../types/Iphone'

const url = 'https://support.apple.com/112005'

export const iphoneSeList: Iphone[] = [
  {
    model: 'iphone-SE',
    storage: 16,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2016-03',
    price: { twd: 15_500 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-SE',
    storage: 64,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2016-03',
    price: { twd: 19_500 },
    isInitialRelease: true,
    url,
  },

  {
    model: 'iphone-SE',
    storage: 32,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2017-03',
    price: { twd: 15_500 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-SE',
    storage: 128,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2017-03',
    price: { twd: 19_500 },
    isInitialRelease: true,
    url,
  },
]
