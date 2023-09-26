import { type IphoneLine, type Iphone } from '../types/Iphone'
import dayjs from 'dayjs'
import { type StorageSize } from '../types/StorageSize'
import { type DatasetComponentOption } from 'echarts'
import { formatIphoneModel } from './iphoneModel'

export type ChartDatasetGroupBy = Array<keyof Iphone>

export interface GenerateDatasetOptions {
  storage?: StorageSize
  lines?: IphoneLine[]
  groupBy: Array<keyof Iphone>
  showAllRelease?: boolean
  yearRange: [number, number]
}

export function generateIphoneDataset (
  list: Iphone[],
  options: GenerateDatasetOptions
) {
  const groups: Record<string, DatasetComponentOption> = {}

  list
    .filter(iphone => !options.storage || iphone.storage === options.storage)
    .filter(iphone => !options.lines || options.lines.includes(iphone.line))
    .filter(iphone => {
      const year = dayjs(iphone.releasedAt, 'YYYY-MM').year()
      return options.yearRange[0] <= year &&
        year <= options.yearRange[1]
    })
    .filter(iphone => iphone.isInitialRelease ?? options.showAllRelease)
    .forEach((iphone) => {
      const group = options.groupBy
        .map(key => iphone[key])
        .join(',')
      const groupName = options.groupBy
        .filter(key => key !== 'storage')
        .map(key => iphone[key])
        .join(',')

      groups[group] ??= {
        source: [],
        name: groupName,
      }; (groups[group].source as unknown[]).push({
        ...iphone,
        name: formatIphoneModel(iphone.model),
        date: +dayjs(iphone.releasedAt, 'YYYY-MM'),
        value: iphone.price.twd,
      })
    })

  return Object.values(groups)
}
