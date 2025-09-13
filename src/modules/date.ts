import dayjs from 'dayjs'

export function formatDateChinese(date: dayjs.ConfigType) {
  return dayjs(date, 'YYYY-MM').format('YYYY 年 M 月')
}
