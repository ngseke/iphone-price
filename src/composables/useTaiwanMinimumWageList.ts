import { type MaybeRef, computed, unref } from 'vue'
import { taiwanMinimumWageList } from '../databases/taiwanMinimumWage'
import dayjs from 'dayjs'

export default function useTaiwanMinimumWageList ({ options }: {
  options: MaybeRef<{
    yearRange: [number, number]
  }>
}) {
  const filteredTaiwanMinimumWageList = computed(() => (
    taiwanMinimumWageList.filter((item) => {
      const { yearRange } = unref(options)
      const start = yearRange[0]
      const end = yearRange[1] + 1
      const year = dayjs(item.implementedAt, 'YYYY-MM-DD').year()
      return start <= year && year <= end
    })
  ))

  return {
    taiwanMinimumWageList: filteredTaiwanMinimumWageList,
  }
}
