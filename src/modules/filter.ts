import dayjs from 'dayjs'
import { earliestReleasedAt, latestReleasedAt } from '../databases/iphone'
import { type IphoneLine } from '../types/Iphone'
import { type StorageSize } from '../types/StorageSize'

export interface Filter {
  storage: StorageSize
  lines: IphoneLine[]
  isPriceAdjusted: boolean
  yearRange: [number, number]
}

export const defaultFilter: Readonly<Filter> = {
  storage: 256,
  lines: ['entry-level', 'regular', 'premium'],
  isPriceAdjusted: false,
  yearRange: [
    dayjs(earliestReleasedAt, 'YYYY-MM').year(),
    dayjs(latestReleasedAt, 'YYYY-MM').year(),
  ],
}
