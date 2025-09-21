import z from 'zod'
import { type Iphone } from '../types/Iphone'

export const chartTypeOptionValueSchema = z.enum([
  'generation',
  'priceAdjustment',
])
export type ChartTypeOptionValue = z.infer<typeof chartTypeOptionValueSchema>

export type ChartDatasetGroupBy = (keyof Iphone)[]

export interface ChartTypeOption {
  groupBy: ChartDatasetGroupBy
}

export const chartTypeOptions: Record<ChartTypeOptionValue, ChartTypeOption> = {
  generation: {
    groupBy: ['line', 'suffix', 'storage'],
  },
  priceAdjustment: {
    groupBy: ['model', 'storage'],
  },
}
