import z from 'zod'

export const currencySchema = z.enum(['twd', 'usd', 'eur'])

export type CurrencyValue = z.infer<typeof currencySchema>

export interface CurrencyOption {
  name: string
  flag: string
  description: string
  isExperimental?: boolean
}

export const currencyOptions: Record<CurrencyValue, CurrencyOption> = {
  twd: { name: '新台幣', flag: '🇹🇼', description: '' },
  usd: { name: '美金', flag: '🇺🇸', description: '' },
  eur: { name: '歐元', flag: '🇪🇺', description: '', isExperimental: true },
}

export type Price = Partial<Record<CurrencyValue, number>>
