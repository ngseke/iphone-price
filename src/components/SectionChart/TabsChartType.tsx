import { cn } from '@/src/modules/cn'
import {
  chartTypeOptions,
  type ChartTypeOptionValue,
} from '../../modules/chartType'

interface Props {
  value?: ChartTypeOptionValue
  onChange?: (value: ChartTypeOptionValue) => void
}

const TAB_VALUES: ChartTypeOptionValue[] = ['generation', 'priceAdjustment']

export default function TabsChartType({
  value = 'generation',
  onChange,
}: Props) {
  const tabs = TAB_VALUES.map((v) => ({ ...chartTypeOptions[v], value: v }))
  const description = chartTypeOptions[value].description

  return (
    <div className="flex flex-col items-start gap-y-3">
      <div className="grid rounded-[1.9rem] bg-base-200 p-1 text-sm font-semibold">
        {tabs.map((tab) => {
          const active = tab.value === value
          return (
            <button
              key={tab.value}
              type="button"
              className={cn(
                'row-start-1 inline-flex w-full select-none items-center rounded-[1.9rem] px-4 py-2',
                {
                  'hover:bg-base-content/10': !active,
                  'bg-primary text-primary-content font-bold': active,
                },
              )}
              onClick={() => onChange?.(tab.value)}
            >
              {tab.name}
            </button>
          )
        })}
      </div>

      <p className="text-sm text-base-content/80">{description}</p>
    </div>
  )
}
