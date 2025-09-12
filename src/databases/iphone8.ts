import { type Iphone } from '../types/Iphone'

const iphone8Url = 'https://support.apple.com/111976'
const iphone8PlusUrl = 'https://support.apple.com/111950'

export const iphone8List: Iphone[] = [
  {
    model: 'iphone-8',
    storage: 64,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2017-09',
    price: { twd: 25_500 },
    isInitialRelease: true,
    url: iphone8Url,
  },
  {
    model: 'iphone-8',
    storage: 256,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2017-09',
    price: { twd: 30_900 },
    isInitialRelease: true,
    url: iphone8Url,
  },

  {
    model: 'iphone-8',
    storage: 64,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2018-09',
    price: { twd: 21_500 },
    url: iphone8Url,
  },
  {
    model: 'iphone-8',
    storage: 256,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2018-09',
    price: { twd: 27_100 },
    url: iphone8Url,
  },

  {
    model: 'iphone-8',
    storage: 64,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2019-09',
    price: { twd: 15_900 },
    url: iphone8Url,
  },
  {
    model: 'iphone-8',
    storage: 128,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2019-09',
    price: { twd: 17_900 },
    url: iphone8Url,
  },

  {
    model: 'iphone-8-plus',
    storage: 64,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2017-09',
    price: { twd: 28_900 },
    isInitialRelease: true,
    url: iphone8PlusUrl,
  },
  {
    model: 'iphone-8-plus',
    storage: 256,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2017-09',
    price: { twd: 34_500 },
    isInitialRelease: true,
    url: iphone8PlusUrl,
  },

  {
    model: 'iphone-8-plus',
    storage: 64,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2018-09',
    price: { twd: 25_500 },
    url: iphone8PlusUrl,
  },
  {
    model: 'iphone-8-plus',
    storage: 256,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2018-09',
    price: { twd: 31_100 },
    url: iphone8PlusUrl,
  },

  {
    model: 'iphone-8-plus',
    storage: 64,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2019-09',
    price: { twd: 19_000 },
    url: iphone8PlusUrl,
  },
  {
    model: 'iphone-8-plus',
    storage: 128,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2019-09',
    price: { twd: 21_900 },
    url: iphone8PlusUrl,
  },
]
