import { type IphoneLine } from '../types/Iphone'
import { type StorageSize } from '../types/StorageSize'

export interface Filter {
  storage: StorageSize
  lines: IphoneLine[]
  isPriceAdjusted: boolean
}

export const defaultFilter: Readonly<Filter> = {
  storage: 256,
  lines: ['entry-level', 'regular', 'premium'],
  isPriceAdjusted: false,
}
