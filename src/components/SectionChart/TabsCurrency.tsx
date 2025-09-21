import { currencyOptions, CurrencyValue } from '@/src/modules/currency'
import { Tabs } from '../Tabs'
import { IconFlaskFilled } from '@tabler/icons-react'
import { ReactNode } from 'react'
import { useFormatCurrency } from '@/src/hooks/useFormatCurrency'

interface Props {
  value?: CurrencyValue
  onChange?: (value: CurrencyValue) => void
}

function Item({
  name,
  currency,
  flag,
  isExperimental,
}: {
  name: string
  currency: string
  flag: ReactNode
  isExperimental?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl">{flag}</span>
      <div className="flex flex-col">
        {name}
        {name.toUpperCase() !== currency.toUpperCase() && (
          <span className="text-[8px] uppercase leading-none">{currency}</span>
        )}
      </div>
      {isExperimental && <IconFlaskFilled size={18} title="測試版" />}
    </div>
  )
}

export default function TabsCurrency({ value = 'twd', onChange }: Props) {
  const currencies: (CurrencyValue | { isDivider: true })[] = [
    'twd',
    { isDivider: true },
    'usd',
  ]

  const description = currencyOptions[value].description

  const { formatCurrency } = useFormatCurrency()

  return (
    <div className="flex flex-col items-start gap-y-3">
      <Tabs>
        {currencies.map((item, index) => {
          if (typeof item === 'string') {
            const currencyOption = currencyOptions[item]

            return (
              <Tabs.Tab
                key={index}
                onClick={() => onChange?.(item)}
                active={value === item}
              >
                <Item
                  name={formatCurrency(item)}
                  currency={item}
                  flag={currencyOption.flag}
                  isExperimental={currencyOption.isExperimental}
                />
              </Tabs.Tab>
            )
          }

          return <Tabs.Divider key={index} />
        })}
      </Tabs>

      <p className="text-sm text-base-content/80">{description}</p>
    </div>
  )
}
