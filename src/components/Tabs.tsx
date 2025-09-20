import { ComponentProps } from 'react'
import { cn } from '../modules/cn'

export function Tabs({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center rounded-[1.9rem] bg-base-200 p-1 text-sm font-semibold',
        className,
      )}
      {...props}
    />
  )
}

Tabs.Tab = function Tab({
  className,
  active,
  ...props
}: ComponentProps<'button'> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex flex-none select-none items-center rounded-[1.9rem] px-4 py-2',
        {
          'hover:bg-base-content/10': !active,
          'bg-primary text-primary-content font-bold': active,
        },
        className,
      )}
      {...props}
    />
  )
}

Tabs.Divider = function Divider({
  className,
  ...props
}: ComponentProps<'div'> & { active?: boolean }) {
  return (
    <div
      className={cn(
        'float-none mx-2 inline-flex h-6 border-l border-base-content/30',
        className,
      )}
      {...props}
    />
  )
}
