import { ComponentProps } from 'react'
import { cn } from '../modules/cn'
import Link from 'next/link'

export function StyledLink({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        'underline decoration-neutral-500 hover:decoration-neutral-400',
        className,
      )}
      {...props}
    />
  )
}
