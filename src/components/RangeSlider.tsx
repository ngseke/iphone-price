import {
  ChangeEvent,
  ComponentProps,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { cn } from '../modules/cn'
import { clamp } from 'lodash-es'

function RangeInput({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={cn(
        `
          absolute left-0 size-full cursor-pointer appearance-none bg-transparent
          [&::-webkit-slider-runnable-track]:h-2
          [&::-webkit-slider-runnable-track]:bg-transparent

          [&::-webkit-slider-thumb]:pointer-events-auto
          [&::-webkit-slider-thumb]:relative
          [&::-webkit-slider-thumb]:top-1/2
          [&::-webkit-slider-thumb]:z-10
          [&::-webkit-slider-thumb]:size-6
          [&::-webkit-slider-thumb]:-translate-y-1/2
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-primary
        `,
        className,
      )}
      type="range"
      {...props}
    />
  )
}

const serializeSorted = (list: number[]) =>
  [...list].sort((a, b) => a - b).join()

type Value = [number, number]

export function RangeSlider({
  value = [0, 100],
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: {
  value?: Value
  onChange?: (val: Value) => void
  min?: number
  max?: number
  step?: number
}) {
  const [draft, setDraft] = useState<Value>(value)

  const lastSerialized = useRef(serializeSorted(draft))
  useEffect(() => {
    const incoming = serializeSorted(value)
    if (incoming !== lastSerialized.current) {
      setDraft(value)
      lastSerialized.current = incoming
    }
  }, [value])

  const highlightStyle = useMemo(() => {
    const getPercent = (value: number) => {
      const percent = Math.round(((value - min) / (max - min)) * 100)
      return clamp(percent, 0, 100)
    }

    let [left, right] = draft
    if (left > right) [left, right] = [right, left]
    const leftPercent = getPercent(left)
    const rightPercent = getPercent(right)
    return {
      left: `${String(leftPercent)}%`,
      width: `${String(rightPercent - leftPercent)}%`,
    }
  }, [draft, min, max])

  const ticks = useMemo(() => {
    const count = Math.floor((max - min) / step) + 1
    return Array.from({ length: count }, (_, i) => min + i * step)
  }, [min, max, step])

  const commitChange = (next: Value) => {
    const sorted: Value = [...next].sort((a, b) => a - b) as Value
    lastSerialized.current = serializeSorted(sorted)
    onChange?.(sorted)
  }

  const handleInput = (index: 0 | 1) => (e: ChangeEvent<HTMLInputElement>) => {
    console.log('handleInput')
    const nextDraft: Value = [...draft]
    nextDraft[index] = e.target.valueAsNumber

    setDraft(nextDraft)
    commitChange(nextDraft)
  }

  return (
    <div className="relative space-y-2 px-1 py-2">
      <div className="relative flex h-6 w-full items-center">
        <RangeInput
          min={min}
          max={max}
          step={step}
          value={draft[0]}
          onInput={handleInput(0)}
        />
        <RangeInput
          min={min}
          max={max}
          step={step}
          value={draft[1]}
          onInput={handleInput(1)}
        />

        <div className="pointer-events-none relative flex h-2 w-full items-center justify-between overflow-hidden rounded-2xl bg-base-content/10">
          <div className="absolute h-full bg-primary" style={highlightStyle} />
          {ticks.map((tick) => (
            <span key={tick} className="flex w-6 justify-center">
              <span className="block size-0.5 rounded-full bg-base-content/30" />
            </span>
          ))}
        </div>
      </div>

      <div className="flex w-full select-none justify-between">
        {ticks.map((tick, index) => {
          const showNumber =
            draft.includes(tick) || !index || index === ticks.length - 1

          return (
            <span
              key={tick}
              className={cn(
                'flex w-6 items-center justify-center text-xs font-bold',
                'empty:after:inline-block empty:after:h-2 empty:after:w-0.5 empty:after:rounded-full empty:after:bg-base-content/50',
              )}
            >
              {showNumber && (
                <span
                  className={cn(
                    draft.includes(tick)
                      ? 'text-primary'
                      : 'text-base-content/80',
                  )}
                >
                  {tick}
                </span>
              )}
            </span>
          )
        })}
      </div>
    </div>
  )
}
