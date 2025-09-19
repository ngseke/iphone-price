import z from 'zod'
import { type Price } from './Currency'
import { type StorageSize } from './StorageSize'

export type IphoneModel =
  | 'iphone-17-pro'
  | 'iphone-17-pro-max'
  | 'iphone-17'
  | 'iphone-air'
  | 'iphone-16e'
  | 'iphone-16-pro'
  | 'iphone-16-pro-max'
  | 'iphone-16'
  | 'iphone-16-plus'
  | 'iphone-15-pro'
  | 'iphone-15-pro-max'
  | 'iphone-15'
  | 'iphone-15-plus'
  | 'iphone-14-pro'
  | 'iphone-14-pro-max'
  | 'iphone-14'
  | 'iphone-14-plus'
  | 'iphone-SE-3rd-gen'
  | 'iphone-13-pro'
  | 'iphone-13-pro-max'
  | 'iphone-13-mini'
  | 'iphone-13'
  | 'iphone-12-pro'
  | 'iphone-12-pro-max'
  | 'iphone-12-mini'
  | 'iphone-12'
  | 'iphone-SE-2nd-gen'
  | 'iphone-11-pro'
  | 'iphone-11-pro-max'
  | 'iphone-11'
  | 'iphone-XS'
  | 'iphone-XS-max'
  | 'iphone-XR'
  | 'iphone-X'
  | 'iphone-8-plus'
  | 'iphone-8'
  | 'iphone-7-plus'
  | 'iphone-7'
  | 'iphone-6s-plus'
  | 'iphone-6s'
  | 'iphone-6-plus'
  | 'iphone-6'
  | 'iphone-SE'

export const iphoneLineSchema = z.enum(['premium', 'regular', 'entry-level'])
export type IphoneLine = z.infer<typeof iphoneLineSchema>

export const iphoneSuffixSchema = z.enum([
  'base',
  'plus',
  'pro',
  'pro-max',
  'mini',
  'air',
])
export type IphoneSuffix = z.infer<typeof iphoneSuffixSchema>

export interface Iphone {
  model: IphoneModel
  storage: StorageSize
  line: IphoneLine
  suffix: IphoneSuffix
  releasedAt: `${number}-${number}` | `${number}-${number}-${number}`
  price: Price
  isInitialRelease?: true
  url?: string
}
