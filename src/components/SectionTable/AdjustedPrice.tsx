import { useMemo } from 'react'
import { formatPrice } from '../../modules/price'
import { formatDateChinese } from '../../modules/date'
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'
import { cn } from '@/src/modules/cn'

interface Props {
  value?: number | null
  original?: number | null
  releasedAt?: string | null
}

export default function PriceTag({ value, original, releasedAt }: Props) {
  const isDecreased = useMemo(
    () => (value ?? 0) < (original ?? 0),
    [value, original],
  )
  if (!value) return null

  const tooltip = `${formatDateChinese(releasedAt)}${isDecreased ? '降價' : '漲價'}`

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
