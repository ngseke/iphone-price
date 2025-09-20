import { currencyOptions } from '@/src/modules/currency'
import { CurrencyContext } from '@/src/providers/CurrencyProvider'
import { useContext } from 'react'

export function useCurrency() {
  const context = useContext(CurrencyContext)

  const formattedCurrency = currencyOptions[context.currency].name

  return {
    ...context,
    formattedCurrency,
  }
}
