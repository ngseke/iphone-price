import { currencyOptions, CurrencyValue } from '@/src/modules/currency'
import { Tabs } from '../Tabs'

interface Props {
  value?: CurrencyValue
  onChange?: (value: CurrencyValue) => void
}

const TAB_VALUES: CurrencyValue[] = ['twd', 'usd']

export default function TabsCurrency({ value = 'twd', onChange }: Props) {
  const tabs = TAB_VALUES.map((v) => ({ ...currencyOptions[v], value: v }))
  const description = currencyOptions[value].description

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
