import { useTranslations } from 'next-intl'
import { CurrencyValue } from '../modules/currency'
import { useFormatCurrency } from '../hooks/useFormatCurrency'

export function CurrencyNote({ currency }: { currency: CurrencyValue }) {
  const { formatCurrency } = useFormatCurrency()
  const t = useTranslations('Currency')
  const formatted = formatCurrency(currency)

  return (
    <span className="text-xs text-base-content/70">
      {t('unit')}: {formatted}{' '}
      {formatted.toUpperCase() !== currency.toUpperCase() && (
        <>({currency.toUpperCase()})</>
      )}
    </span>
  )
}
