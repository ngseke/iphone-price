import { IconButtonReset } from './IconButtonReset'
import type { PropsWithChildren, ReactNode } from 'react'

export function FormSectionGroup({
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
    <section className="space-y-4">
      <div className="sticky top-0 z-20 flex items-center gap-2 bg-base-100 pt-4 after:absolute after:-bottom-4 after:h-4 after:w-full after:bg-gradient-to-b after:from-base-100 after:to-transparent after:content-['']">
        <h2 className="text-3xl font-bold">{title}</h2>
        {showReset ? <IconButtonReset size="sm" onClick={onReset} /> : null}
      </div>

      <div className="flex flex-col gap-y-4">{children}</div>
    </section>
  )
}
