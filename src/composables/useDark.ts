import { useDark as baseUseDark } from '@vueuse/core'

const isDark = baseUseDark({
  selector: 'html',
  attribute: 'data-theme',
  valueLight: 'lemonade',
  valueDark: 'forest',
  disableTransition: false,
})

export function useDark () {
  return isDark
}
