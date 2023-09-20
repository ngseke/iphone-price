import dayjs from 'dayjs'
import { type DatasetComponentOption } from 'echarts'
import { type TaiwanMinimumWage } from '../databases/taiwanMinimumWage'

export function generateTaiwanMinimumWageDataset (
  list: TaiwanMinimumWage[]
) {
  const dataset: DatasetComponentOption = {
    source: list.map((item) => ({
      date: +dayjs(item.implementedAt, 'YYYY-MM-DD'),
      value: item.monthlySalary.twd,
    })),
  }

  return dataset
}
