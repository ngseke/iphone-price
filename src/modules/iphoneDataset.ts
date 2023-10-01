import { type IphoneLine, type Iphone, type IphoneModel } from '../types/Iphone'
import dayjs from 'dayjs'
import { type StorageSize } from '../types/StorageSize'
import { formatIphoneModel } from './iphoneModel'

export interface GenerateDatasetOptions {
  storage?: StorageSize
  lines?: IphoneLine[]
  groupBy: Array<keyof Iphone>
  showAllRelease?: boolean
  yearRange: [number, number]
}

export type IphoneDatasetSource = Iphone & {
  name: string
  date: number
  value: number
}

export interface IphoneDataset {
  name: string
  source: IphoneDatasetSource[]
}

export function generateIphoneDataset (
  list: Iphone[],
  options: GenerateDatasetOptions
) {
  const groups: Record<string, IphoneDataset> = {}

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
        .join()
      const groupName = options.groupBy
        .filter(key => key !== 'storage')
        .map(key => iphone[key])
        .join()

      groups[group] ??= {
        source: [],
        name: groupName,
      }

      groups[group].source.push({
        ...iphone,
        name: formatIphoneModel(iphone.model),
        date: +dayjs(iphone.releasedAt, 'YYYY-MM'),
        value: iphone.price.twd,
      })
    })

  return Object.values(groups)
}

export function formatDatasetName (name: string) {
  if (name.startsWith('iphone')) return formatIphoneModel(name as IphoneModel)
  return name
}
