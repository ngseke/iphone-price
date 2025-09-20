import {
  chartTypeOptions,
  type ChartTypeOptionValue,
} from '../../modules/chartType'
import { Tabs } from '../Tabs'

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
      <Tabs>
        {tabs.map((tab) => {
          const active = tab.value === value
          return (
            <Tabs.Tab
              key={tab.value}
              onClick={() => onChange?.(tab.value)}
              active={active}
            >
              {tab.name}
            </Tabs.Tab>
          )
        })}
      </Tabs>

      <p className="text-sm text-base-content/80">{description}</p>
    </div>
  )
}
