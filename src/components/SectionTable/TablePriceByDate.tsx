import { useMemo } from 'react'
import { uniq } from 'lodash-es'
import { formatDateChinese } from '../../modules/date'
import { formatPrice } from '../../modules/price'
import { formatStorageSize } from '../../modules/storageSize'
import { formatIphoneModel } from '../../modules/iphoneModel'
import AdjustedPrice from './AdjustedPrice'
import type { Iphone, IphoneModel } from '../../types/Iphone'
import type { StorageSize } from '../../types/StorageSize'
import type { Nullish } from '../../types/Nullish'
import { findAdjustedList } from '../../databases/iphone'
import { StyledLink } from '../StyledLink'
import { CurrencyValue } from '@/src/modules/currency'

interface Row {
  model: IphoneModel
  byStorage: Partial<Record<StorageSize, Iphone>>
  firstUrl?: string
}

export default function IphonePriceTable({
  date,
  list,
  currency,
}: {
  date: Nullish<string>
  list: Nullish<Iphone[]>
  currency: CurrencyValue
}) {
  const columns = useMemo<StorageSize[]>(
    () =>
      uniq((list ?? []).map((iphone) => iphone.storage)).sort((a, b) => a - b),
    [list],
  )

  const rows = useMemo<Row[]>(() => {
    const map = new Map<IphoneModel, Row>()

    ;(list ?? []).forEach((iphone) => {
      if (!map.has(iphone.model)) {
        map.set(iphone.model, {
          model: iphone.model,
          byStorage: {},
          firstUrl: iphone.url,
        })
      }
      const row = map.get(iphone.model)
      if (!row) return

      row.byStorage[iphone.storage] = iphone
      if (!row.firstUrl && iphone.url) row.firstUrl = iphone.url
    })

    return Array.from(map.values())
  }, [list])

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <h3 className="text-xl font-bold text-base-content/80">
        {formatDateChinese(date)}
      </h3>

      <div className="w-full min-w-0">
        <div className="overflow-x-auto overflow-y-hidden pb-6">
          <table className="w-full text-left [&_tr]:border-b [&_tr]:border-base-content/10">
            <thead className="text-xs font-bold text-base-content/60">
              <tr>
                <th className="px-4 py-3 align-middle">型號</th>
                {columns.map((col) => (
                  <th key={col} className="px-4 py-3">
                    {formatStorageSize(col)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.model}
                  className="last:border-b-0 hover:bg-base-content/10"
                >
                  <td className="px-4 py-3 align-top font-bold">
                    {row.firstUrl ? (
                      <StyledLink href={row.firstUrl} target="_blank">
                        {formatIphoneModel(row.model)}
                      </StyledLink>
                    ) : (
                      <span>{formatIphoneModel(row.model)}</span>
                    )}
                  </td>

                  {columns.map((col) => {
                    const iphone = row.byStorage[col]
                    const price = iphone?.price[currency]
                    const adjustedList = findAdjustedList(col, row.model)

                    return (
                      <td key={col} className="px-4 py-3 align-top">
                        <div className="flex flex-col items-start">
                          <span className="font-rubik text-lg font-bold">
                            {formatPrice(price)}
                          </span>

                          {adjustedList.map((iphone, index) => {
                            const prev =
                              adjustedList[index - 1]?.price[currency] ?? price
                            return (
                              <AdjustedPrice
                                key={index}
                                original={prev}
                                releasedAt={iphone.releasedAt}
                                value={iphone.price[currency]}
                              />
                            )
                          })}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
