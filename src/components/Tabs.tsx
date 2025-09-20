import { ComponentProps } from 'react'
import { cn } from '../modules/cn'

export function Tabs({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'grid rounded-[1.9rem] bg-base-200 p-1 text-sm font-semibold',
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
        'row-start-1 inline-flex w-full select-none items-center rounded-[1.9rem] px-4 py-2',
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
