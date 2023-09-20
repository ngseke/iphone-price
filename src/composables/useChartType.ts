import { useStorage } from '@vueuse/core'
import { type ChartTypeOptionValue } from '../modules/chartType'

const storageId = 'iphonePriceChartType'

export default function useChartType () {
  const chartType = useStorage<ChartTypeOptionValue>(
    storageId,
    'generation',
    localStorage,
    { mergeDefaults: true }
  )

  return {
    chartType,
  }
}
