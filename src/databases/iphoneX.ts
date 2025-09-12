import { type Iphone } from '../types/Iphone'

const url = 'https://support.apple.com/111864'

export const iphoneXList: Iphone[] = [
  {
    model: 'iphone-X',
    storage: 64,
    line: 'premium',
    suffix: 'pro',
    releasedAt: '2017-09',
    price: { twd: 35_900 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-X',
    storage: 256,
    line: 'premium',
    suffix: 'pro',
    releasedAt: '2017-09',
    price: { twd: 41_500 },
    isInitialRelease: true,
    url,
  },
]
