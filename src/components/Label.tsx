import { PropsWithChildren } from 'react'
import { cn } from '../modules/cn'

export function Label({
  active,
  disabled,
  label,
  children,
}: PropsWithChildren<{
  active?: boolean
  disabled?: boolean
  label?: string
}>) {
  return (
    <label
      className={cn(
        'relative flex select-none items-center justify-start space-x-3 px-1 py-2 font-bold',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
    >
      {children}
      <span
        className={cn('text-sm transition-colors duration-100', {
          'text-primary': active,
          'opacity-50': disabled,
        })}
      >
        {label}
      </span>
    </label>
  )
}
