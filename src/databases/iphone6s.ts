import { type Iphone } from '../types/Iphone'

const iphone6sUrl = 'https://support.apple.com/111952'
const iphone6sPlusUrl = 'https://support.apple.com/111996'

export const iphone6sList: Iphone[] = [
  {
    model: 'iphone-6s',
    storage: 16,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2015-10',
    price: { twd: 24_500 },
    isInitialRelease: true,
    url: iphone6sUrl,
  },
  {
    model: 'iphone-6s',
    storage: 64,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2015-10',
    price: { twd: 28_500 },
    isInitialRelease: true,
    url: iphone6sUrl,
  },
  {
    model: 'iphone-6s',
    storage: 128,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2015-10',
    price: { twd: 32_500 },
    isInitialRelease: true,
    url: iphone6sUrl,
  },

  {
    model: 'iphone-6s',
    storage: 32,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2016-09',
    price: { twd: 20_500 },
    url: iphone6sUrl,
  },
  {
    model: 'iphone-6s',
    storage: 128,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2016-09',
    price: { twd: 24_500 },
    url: iphone6sUrl,
  },

  {
    model: 'iphone-6s',
    storage: 32,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2017-09',
    price: { twd: 16_500 },
    url: iphone6sUrl,
  },
  {
    model: 'iphone-6s',
    storage: 128,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2017-09',
    price: { twd: 19_900 },
    url: iphone6sUrl,
  },

  {
    model: 'iphone-6s-plus',
    storage: 16,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2015-10',
    price: { twd: 28_500 },
    isInitialRelease: true,
    url: iphone6sPlusUrl,
  },
  {
    model: 'iphone-6s-plus',
    storage: 64,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2015-10',
    price: { twd: 32_500 },
    isInitialRelease: true,
    url: iphone6sPlusUrl,
  },
  {
    model: 'iphone-6s-plus',
    storage: 128,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2015-10',
    price: { twd: 36_500 },
    isInitialRelease: true,
    url: iphone6sPlusUrl,
  },

  {
    model: 'iphone-6s-plus',
    storage: 32,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2016-09',
    price: { twd: 24_500 },
    url: iphone6sPlusUrl,
  },
  {
    model: 'iphone-6s-plus',
    storage: 128,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2016-09',
    price: { twd: 28_500 },
    url: iphone6sPlusUrl,
  },

  {
    model: 'iphone-6s-plus',
    storage: 32,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2017-09',
    price: { twd: 19_900 },
    url: iphone6sPlusUrl,
  },
  {
    model: 'iphone-6s-plus',
    storage: 128,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2017-09',
    price: { twd: 23_500 },
    url: iphone6sPlusUrl,
  },
]
