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
    price: { twd: 25_500, usd: 699 },
    isInitialRelease: true,
    url: iphone8Url,
  },
  {
    model: 'iphone-8',
    storage: 256,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2017-09',
    price: { twd: 30_900, usd: 849 },
    isInitialRelease: true,
    url: iphone8Url,
  },

  {
    model: 'iphone-8',
    storage: 64,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2018-09',
    price: { twd: 21_500, usd: 599 },
    url: iphone8Url,
  },
  {
    model: 'iphone-8',
    storage: 256,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2018-09',
    price: { twd: 27_100, usd: 749 },
    url: iphone8Url,
  },

  {
    model: 'iphone-8',
    storage: 64,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2019-09',
    price: { twd: 15_900, usd: 449 },
    url: iphone8Url,
  },
  {
    model: 'iphone-8',
    storage: 128,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2019-09',
    price: { twd: 17_900, usd: 499 },
    url: iphone8Url,
  },

  {
    model: 'iphone-8-plus',
    storage: 64,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2017-09',
    price: { twd: 28_900, usd: 799 },
    isInitialRelease: true,
    url: iphone8PlusUrl,
  },
  {
    model: 'iphone-8-plus',
    storage: 256,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2017-09',
    price: { twd: 34_500, usd: 949 },
    isInitialRelease: true,
    url: iphone8PlusUrl,
  },

  {
    model: 'iphone-8-plus',
    storage: 64,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2018-09',
    price: { twd: 25_500, usd: 699 },
    url: iphone8PlusUrl,
  },
  {
    model: 'iphone-8-plus',
    storage: 256,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2018-09',
    price: { twd: 31_100, usd: 849 },
    url: iphone8PlusUrl,
  },

  {
    model: 'iphone-8-plus',
    storage: 64,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2019-09',
    price: { twd: 19_000, usd: 549 },
    url: iphone8PlusUrl,
  },
  {
    model: 'iphone-8-plus',
    storage: 128,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2019-09',
    price: { twd: 21_900, usd: 599 },
    url: iphone8PlusUrl,
  },
]
