import { ComponentProps } from 'react'
import { cn } from '../modules/cn'

export function Button({
  variant = 'primary',
  className,
  ...props
}: ComponentProps<'button'> & { variant?: 'primary' | 'outline' }) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'inline-flex h-12 min-h-12 shrink-0 cursor-pointer select-none flex-wrap items-center justify-center gap-2 rounded-[2rem] border border-transparent bg-primary px-4 text-center text-sm font-semibold text-primary-content duration-200',
        {
          'hover:brightness-75 shadow-lg shadow-primary/30':
            variant === 'primary',
          'border-base-content bg-transparent text-base-content hover:bg-base-content hover:text-primary-content':
            variant === 'outline',
        },
        className,
      )}
    />
  )
}
