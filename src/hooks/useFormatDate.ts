import dayjs from 'dayjs'
import { useLocale } from 'next-intl'

export function useFormatDate() {
  const locale = useLocale()

  function formatDate(date: dayjs.ConfigType) {
    if (locale.includes('zh') || locale.startsWith('ja')) {
      return dayjs(date, 'YYYY-MM').format('YYYY 年 M 月')
    }

    return dayjs(date, 'YYYY-MM').format('MMM YYYY')
  }

  return {
    formatDate,
  }
}
