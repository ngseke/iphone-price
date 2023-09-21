import { type IphoneLine } from '../types/Iphone'

export const iphoneLines: Record<IphoneLine, {
  name: string
  description: string
}> = {
  'entry-level': {
    name: '入門級',
    description: '例如各代 SE',
  },
  regular: {
    name: '高階級',
    description: '例如 XR, 8, 11, 13 mini, 15 Plus ...',
  },
  premium: {
    name: '旗艦級',
    description: '例如 X, XS, 11 Pro, 15 Pro Max ...',
  },
}
