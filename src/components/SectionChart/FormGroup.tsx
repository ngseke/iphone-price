import { IconButtonReset } from './IconButtonReset'
import type { PropsWithChildren, ReactNode } from 'react'

export function FormGroup({
  showReset,
  onReset,
  title,
  children,
}: PropsWithChildren<{
  showReset?: boolean
  onReset?: () => void
  title?: ReactNode
}>) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-medium">{title}</h2>
        {showReset ? <IconButtonReset size="xs" onClick={onReset} /> : null}
      </div>

      <div>{children}</div>
    </div>
  )
}
