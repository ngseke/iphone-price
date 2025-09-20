import {
  type IphoneLine,
  type Iphone,
  type IphoneModel,
  type IphoneSuffix,
} from '../types/Iphone'
import dayjs from 'dayjs'
import { type StorageSize } from '../types/StorageSize'
import { formatIphoneModel } from './iphoneModel'
import { iphoneLines } from './iphoneLine'
import { Nullish } from '../types/Nullish'
import colors from 'tailwindcss/colors'
import { CurrencyValue } from './currency'

export interface GenerateDatasetOptions {
  currency: CurrencyValue
  storage?: StorageSize
  lines?: IphoneLine[]
  groupBy: (keyof Iphone)[]
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
  color?: string
}

function generateColor(
  suffix: Nullish<IphoneSuffix>,
  line: Nullish<IphoneLine>,
) {
  if (!suffix) return
  const shade = 700

  if (line === 'entry-level') return colors.green[shade]

  return {
    base: colors.cyan[shade],
    plus: colors.indigo[shade],
    pro: colors.pink[shade],
    'pro-max': colors.fuchsia[shade],
    mini: colors.yellow[shade],
    air: colors.blue[shade],
  }[suffix]
}

export function generateIphoneDataset(
  list: Iphone[],
  options: GenerateDatasetOptions,
) {
  const groups: Record<string, IphoneDataset> = {}

  list
    .filter((iphone) => iphone.price[options.currency])
    .filter((iphone) => !options.storage || iphone.storage === options.storage)
    .filter((iphone) => !options.lines || options.lines.includes(iphone.line))
    .filter((iphone) => {
      const year = dayjs(iphone.releasedAt, 'YYYY-MM').year()
      return options.yearRange[0] <= year && year <= options.yearRange[1]
    })
    .filter((iphone) => iphone.isInitialRelease ?? options.showAllRelease)
    .forEach((iphone) => {
      const group = options.groupBy.map((key) => iphone[key] as string).join()
      const groupName = options.groupBy
        .filter((key) => key !== 'storage')
        .map((key) => iphone[key] as string)
        .join()

      groups[group] ??= {
        source: [],
        name: groupName,
        color: generateColor(iphone.suffix, iphone.line),
      }

      groups[group].source.push({
        ...iphone,
        name: formatIphoneModel(iphone.model),
        date: +dayjs(iphone.releasedAt, 'YYYY-MM'),
        value: iphone.price[options.currency] ?? 0,
      })
    })

  return Object.values(groups)
}

export function formatDatasetName(name: string) {
  if (name.startsWith('iphone')) return formatIphoneModel(name as IphoneModel)

  try {
    const chunks = name.split(',').map((chunk, index) => {
      if (!index) return iphoneLines[chunk as IphoneLine].name
      const suffixMap: Record<IphoneSuffix, string> = {
        base: '',
        plus: 'Plus',
        pro: 'Pro',
        'pro-max': 'Pro Max',
        mini: 'mini',
        air: 'Air',
      }
      return suffixMap[chunk as IphoneSuffix]
    })

    return `${chunks[0]} ${chunks[1] ? `(${chunks[1]})` : ''}`
  } catch (e) {
    console.error(e)
    return name
  }
}
