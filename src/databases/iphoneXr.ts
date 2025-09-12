import { type Iphone } from '../types/Iphone'

const url = 'https://support.apple.com/111868'

export const iphoneXrList: Iphone[] = [
  {
    model: 'iphone-XR',
    storage: 64,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2018-09',
    price: { twd: 26_900 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-XR',
    storage: 128,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2018-09',
    price: { twd: 28_900 },
    isInitialRelease: true,
    url,
  },
  {
    model: 'iphone-XR',
    storage: 256,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2018-09',
    price: { twd: 32_500 },
    isInitialRelease: true,
    url,
  },

  {
    model: 'iphone-XR',
    storage: 64,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2019-09',
    price: { twd: 21_500 },
    url,
  },
  {
    model: 'iphone-XR',
    storage: 128,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2019-09',
    price: { twd: 23_500 },
    url,
  },

  {
    model: 'iphone-XR',
    storage: 64,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2020-10',
    price: { twd: 16_900 },
    url,
  },
  {
    model: 'iphone-XR',
    storage: 128,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2020-10',
    price: { twd: 18_500 },
    url,
  },
]
