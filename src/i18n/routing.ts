import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['zh-Hant', 'en', 'ja', 'ko'],
  defaultLocale: 'zh-Hant',
})
