import { cn } from '@/src/modules/cn'

const colorClassNames = ['', 'text-accent', 'text-secondary', 'text-primary']
const units = colorClassNames.length + 1

export default function TextVerticalScrolling({
  char = '',
  index = 0,
}: {
  char?: string
  index?: number
}) {
  return (
    <span
      className="relative inline-flex overflow-hidden"
      style={{
        '--char': `"${char}"`,
        '--units': String(units),
        '--delay': `${String(index * 70)}ms`,
        '--duration': '7s',
      }}
    >
      <span className="opacity-0 after:content-[var(--char)]" />

      <span className="absolute left-0 top-0 flex animate-[text-vertical-scrolling_var(--duration)_var(--delay)_ease_infinite] flex-col">
        {colorClassNames.map((className, i) => (
          <span
            key={i}
            className={cn('select-none after:content-[var(--char)]', className)}
          />
        ))}
        <span>{char}</span>
      </span>
    </span>
  )
}
