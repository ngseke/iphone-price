import { type IphoneLine } from '../types/Iphone'

export const iphoneLines: Record<IphoneLine, {
  name: string
  description: string
}> = {
  'entry-level': {
    name: '入門級',
    description: '',
  },
  regular: {
    name: '高階級',
    description: '',
  },
  premium: {
    name: '旗艦級',
    description: '',
  },
}
