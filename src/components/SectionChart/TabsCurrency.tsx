import { currencyOptions, CurrencyValue } from '@/src/modules/currency'
import { Tabs } from '../Tabs'
import { IconFlaskFilled } from '@tabler/icons-react'
import { PropsWithChildren } from 'react'

interface Props {
  value?: CurrencyValue
  onChange?: (value: CurrencyValue) => void
}

const DEFAULT_TAB_VALUE: CurrencyValue = 'twd'
const TAB_VALUES: CurrencyValue[] = ['usd']

function Superscript({ children }: PropsWithChildren) {
  return <sup className="ml-0.5 text-[10px] uppercase">{children}</sup>
}

export default function TabsCurrency({ value = 'twd', onChange }: Props) {
  const tabs = TAB_VALUES.map((v) => ({ ...currencyOptions[v], value: v }))
  const description = currencyOptions[value].description

  return (
    <div className="flex flex-col items-start gap-y-3">
      <Tabs>
        <Tabs.Tab
          key={DEFAULT_TAB_VALUE}
          onClick={() => onChange?.(DEFAULT_TAB_VALUE)}
          active={DEFAULT_TAB_VALUE === value}
        >
          {currencyOptions[DEFAULT_TAB_VALUE].name}
          <Superscript>{DEFAULT_TAB_VALUE}</Superscript>
        </Tabs.Tab>
        <Tabs.Divider />
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            onClick={() => onChange?.(tab.value)}
            active={tab.value === value}
          >
            {tab.name}
            <Superscript>{tab.value}</Superscript>
            {tab.isExperimental && (
              <IconFlaskFilled className="ml-2" size={18} title="測試版" />
            )}
          </Tabs.Tab>
        ))}
      </Tabs>

      <p className="text-sm text-base-content/80">{description}</p>
    </div>
  )
}
