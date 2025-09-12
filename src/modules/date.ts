import dayjs from 'dayjs'

export function formatDateChinese(date: dayjs.ConfigType) {
  return dayjs(date, 'YYYY-MM').format('YYYY年MM月')
}
