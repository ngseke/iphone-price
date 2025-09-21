import { useTranslations } from 'next-intl'
import { CurrencyValue } from '../modules/currency'

export function useFormatCurrency() {
  const t = useTranslations('Currency')
  const map = {
    twd: t('twd'),
    usd: t('usd'),
    eur: t('eur'),
  }

  function formatCurrency(currency: CurrencyValue) {
    return map[currency]
  }

  return {
    formatCurrency,
  }
}
