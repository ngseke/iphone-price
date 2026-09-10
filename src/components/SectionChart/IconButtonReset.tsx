import { cn } from '@/src/modules/cn'
import { IconRestore } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import type { ButtonHTMLAttributes } from 'react'

export function IconButtonReset({
  size = 'xs',
  title,
  className,
  ...props
}: {
  size?: 'xs' | 'sm'
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>) {
  const t = useTranslations('Chart')

  return (
    <button
      type="button"
      title={title ?? t('button.reset')}
      className={cn(
        ' inline-flex items-center justify-center rounded-full hover:bg-base-content/20',
        {
          'size-8': size === 'sm',
          'size-6': size === 'xs',
        },
        className,
      )}
      {...props}
    >
      <IconRestore
        className={cn({
          'size-5': size === 'sm',
          'size-4': size === 'xs',
        })}
      />
    </button>
  )
}
