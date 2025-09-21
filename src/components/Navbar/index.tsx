'use client'

import { usePathname, useRouter } from '@/src/i18n/navigation'
import { routing } from '@/src/i18n/routing'
import { cn } from '@/src/modules/cn'
import { IconLanguage } from '@tabler/icons-react'
import { useLocale } from 'next-intl'

export function Navbar() {
  const localeOptions: {
    label: string
    locale: (typeof routing)['locales'][number]
  }[] = [
    { label: '中文', locale: 'zh-Hant' },
    { label: 'English', locale: 'en' },
  ]

  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className={cn('fixed inset-x-0 top-0 z-30')}>
      <div className="container flex w-full flex-wrap justify-end px-4 py-5">
        <label className="relative flex items-center gap-1 rounded-[1.9rem] bg-base-content/10 px-3 py-1 text-sm backdrop-blur-sm hover:bg-base-content/20">
          <select
            className="absolute inset-0 cursor-pointer appearance-none border-none bg-transparent text-transparent"
            onChange={(event) => {
              router.push(pathname, { locale: event.target.value })
            }}
            value={locale}
          >
            {localeOptions.map((option, index) => (
              <option key={index} value={option.locale}>
                {option.label}
              </option>
            ))}
          </select>
          <IconLanguage size={20} />
          <span>
            {localeOptions.find((option) => option.locale === locale)?.label}
          </span>
        </label>
      </div>
    </nav>
  )
}
