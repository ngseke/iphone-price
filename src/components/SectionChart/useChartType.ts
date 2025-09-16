import { ChartTypeOptionValue } from '../../modules/chartType'
import { useState } from 'react'

export function useChartType() {
  return useState<ChartTypeOptionValue>('generation')
}
