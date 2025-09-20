import { type Iphone } from '../types/Iphone'

const iphone6Url = 'https://support.apple.com/111954'
const iphone6PlusUrl = 'https://support.apple.com/111940'

export const iphone6List: Iphone[] = [
  {
    model: 'iphone-6',
    storage: 16,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2014-09',
    price: { twd: 22_500, usd: 649 },
    isInitialRelease: true,
    url: iphone6Url,
  },
  {
    model: 'iphone-6',
    storage: 64,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2014-09',
    price: { twd: 25_900, usd: 749 },
    isInitialRelease: true,
    url: iphone6Url,
  },
  {
    model: 'iphone-6',
    storage: 128,
    line: 'regular',
    suffix: 'base',
    releasedAt: '2014-09',
    price: { twd: 29_500, usd: 849 },
    isInitialRelease: true,
    url: iphone6Url,
  },

  {
    model: 'iphone-6-plus',
    storage: 16,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2014-09',
    price: { twd: 25_900, usd: 749 },
    isInitialRelease: true,
    url: iphone6PlusUrl,
  },
  {
    model: 'iphone-6-plus',
    storage: 64,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2014-09',
    price: { twd: 29_500, usd: 849 },
    isInitialRelease: true,
    url: iphone6PlusUrl,
  },
  {
    model: 'iphone-6-plus',
    storage: 128,
    line: 'regular',
    suffix: 'plus',
    releasedAt: '2014-09',
    price: { twd: 32_900, usd: 949 },
    isInitialRelease: true,
    url: iphone6PlusUrl,
  },
]
