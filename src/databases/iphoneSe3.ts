import { type Iphone } from '../types/Iphone'

const url = 'https://support.apple.com/111866'

export const iphoneSe3List: Iphone[] = [
  {
    model: 'iphone-SE-3rd-gen',
    storage: 64,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2022-03',
    price: { twd: 13_900, usd: 429 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-SE-3rd-gen',
    storage: 128,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2022-03',
    price: { twd: 15_500, usd: 479 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-SE-3rd-gen',
    storage: 256,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2022-03',
    price: { twd: 19_000, usd: 579 },
    isInitialRelease: true,
    url,
  },

  {
    model: 'iphone-SE-3rd-gen',
    storage: 64,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2022-09',
    price: { twd: 14_900 },
    url,
  },
  {
    model: 'iphone-SE-3rd-gen',
    storage: 128,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2022-09',
    price: { twd: 16_500 },
    url,
  },
  {
    model: 'iphone-SE-3rd-gen',
    storage: 256,
    line: 'entry-level',
    suffix: 'base',
    releasedAt: '2022-09',
    price: { twd: 20_000 },
    url,
  },
]
