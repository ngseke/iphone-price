import { storageSizeSchema, type StorageSize } from '../../types/StorageSize'
import { formatStorageSize } from '../../modules/storageSize'
import { cn } from '@/src/modules/cn'

const options = [...storageSizeSchema.values]

export function SliderStorageSize({
  value,
  onChange,
}: {
  value: StorageSize
  onChange: (value: StorageSize) => void
}) {
  const handleInput = (index: number) => {
    onChange(options[index])
  }

  const currentIndex = options.indexOf(value)

  return (
    <div className="relative space-y-2 px-1 py-2">
      <div className="relative flex h-6 w-full items-center">
        <input
          className="
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
          "
          max={options.length - 1}
          min={0}
          type="range"
          value={currentIndex}
          onChange={(e) => {
            handleInput(+e.target.value)
          }}
        />
        <div className="pointer-events-none relative flex h-2 w-full items-center justify-between overflow-hidden rounded-2xl bg-base-content/10">
          {options.map((_, index) => (
            <span key={index} className="flex w-6 justify-center">
              <span className="block size-0.5 rounded-full bg-base-content/30" />
            </span>
          ))}
        </div>
      </div>

      <div className="flex w-full select-none justify-between">
        {options.map((option, index) => (
          <button
            key={option}
            className="flex w-6 justify-center text-xs font-bold"
            type="button"
            onClick={() => {
              handleInput(index)
            }}
          >
            <span
              className={cn('text-base-content/80 transition duration-100', {
                'text-primary': index === currentIndex,
              })}
            >
              {formatStorageSize(option)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
