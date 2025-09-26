import { useMemo } from 'react'
import { taiwanMinimumWageList as originalTaiwanMinimumWageList } from '@/src/databases/taiwanMinimumWage'
import dayjs from 'dayjs'

export function useTaiwanMinimumWageList({
  yearRange,
}: {
  yearRange: [number, number]
}) {
  const taiwanMinimumWageList = useMemo(
    () =>
      originalTaiwanMinimumWageList.filter((wage) => {
        const year = dayjs(wage.implementedAt, 'YYYY-MM-DD').year()
        return yearRange[0] <= year && year <= yearRange[1] + 1
      }),
    [yearRange],
  )

  return {
    taiwanMinimumWageList,
  }
}
