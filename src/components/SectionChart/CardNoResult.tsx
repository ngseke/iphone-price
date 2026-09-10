import { IconRestore } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { Button } from '../Button'

export function CardNoResult({ onReset }: { onReset?: () => void }) {
  const t = useTranslations('Chart')

  return (
    <div className="flex size-full items-center justify-center ">
      <div className="flex w-96 max-w-full flex-col gap-2 rounded-xl bg-base-200 p-8 shadow-xl">
        <div className="text-xl font-semibold">{t('noResult.title')}</div>
        <p>{t('noResult.description')}</p>
        <div className="flex justify-end">
          <Button onClick={onReset}>
            <IconRestore />
            {t('noResult.reset')}
          </Button>
        </div>
      </div>
    </div>
  )
}
