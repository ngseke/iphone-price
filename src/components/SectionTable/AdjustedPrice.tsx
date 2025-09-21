import { useMemo } from 'react'
import { formatPrice } from '../../modules/price'
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'
import { cn } from '@/src/modules/cn'
import { useFormatDate } from '@/src/hooks/useFormatDate'

interface Props {
  value?: number | null
  original?: number | null
  releasedAt?: string | null
}

export default function PriceTag({ value, original, releasedAt }: Props) {
  const { formatDate } = useFormatDate()

  const isDecreased = useMemo(
    () => (value ?? 0) < (original ?? 0),
    [value, original],
  )
  if (!value) return null

  const tooltip = formatDate(releasedAt)

  return (
    <span
      className={cn(
        'group inline-flex items-center gap-2',
        isDecreased ? 'text-lime-600' : 'text-rose-600',
      )}
      title={tooltip}
    >
      {original ? (
        isDecreased ? (
          <IconTrendingDown size={16} stroke={3} />
        ) : (
          <IconTrendingUp size={16} stroke={3} />
        )
      ) : null}
      <span className="font-rubik text-sm font-bold">{formatPrice(value)}</span>
    </span>
  )
}
