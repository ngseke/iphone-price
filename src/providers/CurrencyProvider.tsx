import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react'
import { CurrencyValue } from '../modules/currency'

export const CurrencyContext = createContext<{
  currency: CurrencyValue
  setCurrency?: Dispatch<SetStateAction<CurrencyValue>>
}>({
  currency: 'twd',
})

export const CurrencyProvider = ({ children }: PropsWithChildren) => {
  const [currency, setCurrency] = useState<CurrencyValue>('twd')

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}
