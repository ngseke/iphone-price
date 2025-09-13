import { cn } from '@/src/modules/cn'
import { ComponentProps } from 'react'

export function NewBadge({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'rounded-full border border-current bg-orange-500/10 px-1.5 text-xs font-bold text-orange-500',
        className,
      )}
      {...props}
    >
      New
    </span>
  )
}
