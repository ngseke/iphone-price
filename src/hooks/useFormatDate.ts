import dayjs from 'dayjs'
import { useLocale } from 'next-intl'
import relativeTime from 'dayjs/plugin/relativeTime'
import en from 'dayjs/locale/en'
import zhTw from 'dayjs/locale/zh-tw'
import ja from 'dayjs/locale/ja'
import ko from 'dayjs/locale/ko'

dayjs.extend(relativeTime)

export function useFormatDate() {
  const locale = useLocale()

  const dayjsLocale =
    {
      'zh-Hant': zhTw,
      en,
      ja,
      ko,
    }[locale] ?? en

  function formatDate(date: dayjs.ConfigType) {
    if (locale.includes('zh') || locale.startsWith('ja')) {
      return dayjs(date, 'YYYY-MM').format('YYYY 年 M 月')
    }

    return dayjs(date, 'YYYY-MM').format('MMM YYYY')
  }

  function formatDateRelative(date: dayjs.ConfigType) {
    const instance = dayjs(date, 'YYYY-MM')
    if (dayjs().isBefore(instance.add(1, 'month'))) return null

    return instance.locale(dayjsLocale).fromNow()
  }

  return {
    formatDate,
    formatDateRelative,
  }
}
