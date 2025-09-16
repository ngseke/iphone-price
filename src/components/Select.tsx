import { cn } from '../modules/cn'

export function Select<Value extends string | number | boolean>({
  value,
  onChange,
  items,
  label,
}: {
  value: Value | null
  onChange: (value: Value | null) => void
  items: { label: string; value: Value }[]
  label?: string
}) {
  const options = items.map((value) => {
    if (
      typeof value === 'number' ||
      typeof value === 'string' ||
      typeof value === 'boolean'
    ) {
      return {
        label: String(value),
        value,
      }
    }
    return value
  })

  return (
    <div className="flex w-full flex-col">
      {label && <label className="px-1 py-2 text-sm font-bold">{label}</label>}

      <select
        className={cn(
          'inline-flex h-12 min-h-3 cursor-pointer appearance-none rounded-full border border-base-content/20 bg-base-100 pl-4 pr-10 text-sm',
          'bg-no-repeat [background-image:linear-gradient(45deg,_transparent_50%,_currentColor_50%),_linear-gradient(135deg,_currentColor_50%,_transparent_50%)] [background-position:calc(100%_-_20px)_calc(1px_+_50%),_calc(100%_-_16.1px)_calc(1px_+_50%)] [background-size:4px_4px,_4px_4px]',
        )}
        value={String(value)}
        onChange={(event) => {
          const originalValue = options.find(
            (option) => String(option.value) === event.target.value,
          )?.value
          if (originalValue === undefined) return

          onChange(originalValue)
        }}
      >
        {options.map(({ value, label }) => (
          <option key={String(value)} value={String(value)}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
