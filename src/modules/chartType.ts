import { type Iphone } from '../types/Iphone'

export type ChartTypeOptionValue = 'generation' | 'priceAdjustment'

export type ChartDatasetGroupBy = Array<keyof Iphone>

export interface ChartTypeOption {
  name: string
  description: string
  groupBy: ChartDatasetGroupBy
}

export const chartTypeOptions: Record<ChartTypeOptionValue, ChartTypeOption> = {
  generation: {
    name: '歷代趨勢',
    description: '各個產品線下的歷代 iPhone 價格變化',
    groupBy: ['line', 'suffix', 'storage'],
  },
  priceAdjustment: {
    name: '售價調整趨勢',
    description: '相同型號 iPhone 價格的漲跌變化',
    groupBy: ['model', 'storage'],
  },
}
