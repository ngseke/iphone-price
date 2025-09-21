'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Button } from '../Button'
import {
  IconChartDotsFilled,
  IconChevronCompactDown,
  IconTableRow,
  IconTrendingUp,
} from '@tabler/icons-react'
import { cn } from '@/src/modules/cn'

export function Hero({
  onClickViewChart,
  onClickViewTable,
}: {
  onClickViewChart?: () => void
  onClickViewTable?: () => void
}) {
  const t = useTranslations('Hero')
  const locale = useLocale()
  const isLatin = !locale.includes('zh')

  return (
    <div className="relative grid w-full place-items-center bg-base-200 bg-[linear-gradient(rgba(16,16,16,1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,16,16,1)_1px,transparent_1px)] bg-[length:1rem_1rem] py-8 sm:min-h-screen  sm:py-0">
      <div className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-1 p-4 pt-28">
        <div className="flex-1 space-y-8">
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={onClickViewChart}
              className="rounded-full border border-primary bg-primary/10 px-4 py-1 text-sm font-medium duration-300 hover:brightness-125"
            >
              {t('button.updatedBadge', { modal: 'iPhone 17' })}
            </button>

            <h1
              className={cn(
                'items-center text-3xl font-extrabold sm:text-6xl sm:leading-tight',
                { 'tracking-tight': isLatin },
              )}
            >
              {t.rich('button.title1', { br: () => <br /> })}
              <span
                className="
                animate-[gradient-text_7s_linear_infinite]
                bg-primary
                bg-[linear-gradient(45deg,theme(colors.primary),theme(colors.accent),theme(colors.secondary),theme(colors.primary))]
                bg-[length:400%] bg-clip-text text-transparent
              "
              >
                {t('button.title2')}
              </span>
              <span className="relative mb-1 ml-2 inline-block rounded-full align-middle leading-[0] after:absolute after:inset-0 after:scale-y-75 after:bg-primary/50 after:blur-xl sm:mb-3 sm:ml-3">
                <IconTrendingUp
                  className="text-primary sm:size-14"
                  stroke={2.5}
                />
              </span>
            </h1>
          </div>

          <p className="text-center text-base-content/70">
            {t.rich('button.description', { b: (chunks) => <b>{chunks}</b> })}
          </p>
        </div>

        <div className="mt-8 flex w-full justify-center gap-4">
          <Button onClick={onClickViewChart}>
            <IconChartDotsFilled size={20} />
            {t('button.viewChart')}
          </Button>
          <Button onClick={onClickViewTable} variant="outline">
            <IconTableRow size={20} />
            {t('button.viewTable')}
          </Button>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={onClickViewChart}
            className="hidden p-6 duration-300 hover:brightness-125 sm:block"
            aria-label="Scroll to chart"
          >
            <IconChevronCompactDown
              className="animate-bounce opacity-90"
              size={50}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
