import z from 'zod'

export const currencySchema = z.enum(['twd', 'usd', 'eur'])

export type CurrencyValue = z.infer<typeof currencySchema>

export interface CurrencyOption {
  flag: string
  description: string
  isExperimental?: boolean
}

export const currencyOptions: Record<CurrencyValue, CurrencyOption> = {
  twd: { flag: '🇹🇼', description: '' },
  usd: { flag: '🇺🇸', description: '' },
  eur: { flag: '🇪🇺', description: '', isExperimental: true },
}

export type Price = Partial<Record<CurrencyValue, number>>
