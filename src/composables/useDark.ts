import { useDark as baseUseDark } from '@vueuse/core'

const isDark = baseUseDark({
  selector: 'html',
  attribute: 'data-theme',
  valueLight: 'lemonade',
  valueDark: 'forest',
})

export function useDark () {
  return isDark
}
