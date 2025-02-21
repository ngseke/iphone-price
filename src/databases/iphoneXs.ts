import { type Iphone } from '../types/Iphone'

const iphoneXsUrl = 'https://support.apple.com/111881'
const iphoneXsMaxUrl = 'https://support.apple.com/111880'

export const iphoneXsList: Iphone[] = [
  {
    model: 'iphone-XS',
    storage: 64,
    line: 'premium',
    suffix: 'pro',
    releasedAt: '2018-09',
    price: { twd: 35_900 },
    isInitialRelease: true,
    url: iphoneXsUrl,
  },
  {
    model: 'iphone-XS',
    storage: 256,
    line: 'premium',
    suffix: 'pro',
    releasedAt: '2018-09',
    price: { twd: 41_500 },
    isInitialRelease: true,
    url: iphoneXsUrl,
  },
  {
    model: 'iphone-XS',
    storage: 512,
    line: 'premium',
    suffix: 'pro',
    releasedAt: '2018-09',
    price: { twd: 48_900 },
    isInitialRelease: true,
    url: iphoneXsUrl,
  },
  {
    model: 'iphone-XS-max',
    storage: 64,
    line: 'premium',
    suffix: 'pro-max',
    releasedAt: '2018-09',
    price: { twd: 39_900 },
    isInitialRelease: true,
    url: iphoneXsMaxUrl,
  },
  {
    model: 'iphone-XS-max',
    storage: 256,
    line: 'premium',
    suffix: 'pro-max',
    releasedAt: '2018-09',
    price: { twd: 45_500 },
    isInitialRelease: true,
    url: iphoneXsMaxUrl,
  },
  {
    model: 'iphone-XS-max',
    storage: 512,
    line: 'premium',
    suffix: 'pro-max',
    releasedAt: '2018-09',
    price: { twd: 52_900 },
    isInitialRelease: true,
    url: iphoneXsMaxUrl,
  },
]
