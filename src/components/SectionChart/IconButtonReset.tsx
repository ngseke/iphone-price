import { cn } from '@/src/modules/cn'
import { IconRestore } from '@tabler/icons-react'
import type { ButtonHTMLAttributes } from 'react'

export function IconButtonReset({
  size = 'xs',
  title = '重置',
  className,
  ...props
}: {
  size?: 'xs' | 'sm'
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>) {
  return (
    <button
      type="button"
      title={title}
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
