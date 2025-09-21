import { CurrencyContext } from '@/src/providers/CurrencyProvider'
import { useContext } from 'react'

export function useCurrency() {
  const context = useContext(CurrencyContext)

  return context
}
