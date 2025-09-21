import { useFormatDate } from '@/src/hooks/useFormatDate'
import { cn } from '@/src/modules/cn'
import { IphoneDatasetSource } from '@/src/modules/iphoneDataset'
import { formatIphoneModelAbbreviation } from '@/src/modules/iphoneModel'
import { formatPrice } from '@/src/modules/price'
import { Nullish } from '@/src/types/Nullish'
import { IconArrowDown, IconArrowRight, IconArrowUp } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { Fragment, useMemo } from 'react'

interface Column {
  field: keyof IphoneDatasetSource | 'difference'
  headerName?: string
  align?: 'left' | 'right'
}

function TextPriceDifference({ value }: { value: Nullish<number> }) {
  if (value == null) return null

  const size = 18

  const icon = (() => {
    if (value > 0) {
      return { className: 'text-rose-600', icon: <IconArrowUp size={size} /> }
    }
    if (value < 0) {
      return { className: 'text-lime-600', icon: <IconArrowDown size={size} /> }
    }
    return {
      className: 'text-gray-500',
      icon: <IconArrowRight size={size} />,
    }
  })()

  const formattedPrice = formatPrice(Math.abs(value))

  return (
    <span className={cn('inline-flex items-center', icon.className)}>
      {icon.icon}
      <span className="ml-1">{formattedPrice}</span>
    </span>
  )
}

export function DatasetTable({ source }: { source?: IphoneDatasetSource[] }) {
  const t = useTranslations('Chart')

  const columns: Column[] = [
    { field: 'model', headerName: t('table.model') },
    { field: 'date', headerName: t('table.date') },
    { field: 'value', headerName: t('table.price'), align: 'right' },
    { field: 'difference', headerName: t('table.difference') },
  ]

  const sourceWithDifference = useMemo(
    () =>
      source?.map((item, index, list) => {
        const previousItem = index ? list[index - 1] : null
        const difference = previousItem ? item.value - previousItem.value : null
        const differencePercent =
          previousItem && difference ? difference / previousItem.value : null
        return { ...item, difference, differencePercent }
      }),
    [source],
  )

  const { formatDate } = useFormatDate()

  return (
    <div className="overflow-x-auto">
      <table
        className="
          w-full whitespace-nowrap text-left text-sm
          [&_td]:px-3 [&_td]:py-2 [&_td]:align-middle [&_th]:px-3 [&_th]:py-2 [&_th]:align-middle [&_tr]:border-b [&_tr]:border-base-content/10"
      >
        <thead className="text-xs font-bold text-base-content/60">
          <tr>
            {columns.map((column, index) => (
              <td
                key={index}
                className={cn({
                  'text-right': column.align === 'right',
                  'text-left': column.align === 'left',
                })}
              >
                {column.headerName}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {sourceWithDifference?.map((row, index) => (
            <tr
              key={index}
              className="last:border-b-0 hover:bg-base-content/10"
            >
              {columns.map((column) => (
                <Fragment key={column.field}>
                  {(() => {
                    if (column.field === 'model')
                      return (
                        <td className="w-0">
                          <a
                            className="underline decoration-neutral-500 hover:decoration-neutral-400"
                            href={row.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {formatIphoneModelAbbreviation(row[column.field])}
                          </a>
                        </td>
                      )
                    if (column.field === 'date')
                      return (
                        <td className="w-0">{formatDate(row[column.field])}</td>
                      )

                    if (column.field === 'value')
                      return (
                        <td className="text-right font-bold">
                          {formatPrice(row[column.field])}
                        </td>
                      )

                    if (column.field === 'difference')
                      return (
                        <td className="space-x-1 font-bold">
                          <div className="flex items-center gap-2">
                            {row[column.field] != null && (
                              <TextPriceDifference value={row[column.field]} />
                            )}
                            {row.differencePercent && (
                              <span className="text-xs text-base-content/80">
                                (<span>+</span>
                                {(row.differencePercent * 100).toFixed(1)}%)
                              </span>
                            )}
                          </div>
                        </td>
                      )

                    return <td>{row[column.field] as string}</td>
                  })()}
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
