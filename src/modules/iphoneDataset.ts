import { type IphoneLine, type Iphone } from '../types/Iphone'
import dayjs from 'dayjs'
import { type StorageSize } from '../types/StorageSize'
import { formatStorageSize } from './storageSize'
import { type DatasetComponentOption } from 'echarts'

export type ChartDatasetGroupBy = Array<keyof Iphone>

export interface GenerateDatasetOptions {
  storage?: StorageSize
  lines?: IphoneLine[]
  groupBy: Array<keyof Iphone>
  showAllRelease?: boolean
}

export function generateIphoneDataset (
  list: Iphone[],
  options: GenerateDatasetOptions
) {
  const groups: Record<string, DatasetComponentOption> = {}

  list
    .filter(iphone => !options.storage || iphone.storage === options.storage)
    .filter(iphone => !options.lines || options.lines.includes(iphone.line))
    .filter(iphone => iphone.isInitialRelease ?? options.showAllRelease)
    .forEach((iphone) => {
      const group = options.groupBy
        .map(key => iphone[key])
        .join(',')

      groups[group] ??= {
        source: [],
      }; (groups[group].source as unknown[]).push({
        ...iphone,
        name: `${iphone.model},${formatStorageSize(iphone.storage)}`,
        date: +dayjs(iphone.releasedAt, 'YYYY-MM'),
        value: iphone.price.twd,
      })
    })

  return Object.values(groups)
}
