import { chartTypeOptionValueSchema } from '../../modules/chartType'
import { useQueryState } from '../../hooks/useQueryState'

const storageId = 'iphonePriceChartType'

export function useChartType() {
  return useQueryState(storageId, chartTypeOptionValueSchema, 'generation')
}
