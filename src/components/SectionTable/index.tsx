import { forwardRef, PropsWithChildren, useMemo, useState } from 'react'
import groupBy from 'lodash-es/groupBy'
import dayjs from 'dayjs'
import { iphoneList } from '../../databases/iphone'
import { formatDateChinese } from '../../modules/date'
import TablePriceByDate from './TablePriceByDate'
import { cn } from '@/src/modules/cn'
import { NewBadge } from './NewBadge'
import { IconTableFilled } from '@tabler/icons-react'

function ListItem({
  active,
  onClick,
  children,
}: PropsWithChildren<{
  active?: boolean
  onClick: () => void
}>) {
  return (
    <li className="w-full">
      <button
        type="button"
        className={cn(
          'flex w-full select-none items-center justify-between rounded-[1.9rem] px-4 py-2 text-left',
          {
            'hover:bg-base-content/10': !active,
            'bg-primary text-primary-content font-bold': active,
          },
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  )
}

export const SectionTable = forwardRef<HTMLElement>(
  function SectionTable(_, ref) {
    const groups = useMemo(
      () =>
        groupBy(
          iphoneList.filter((x) => x.isInitialRelease),
          'releasedAt',
        ),
      [],
    )

    const releaseDates = useMemo(
      () => Object.keys(groups).sort((a, b) => +dayjs(b) - +dayjs(a)),
      [groups],
    )

    const [selectedDate, setSelectedDate] = useState<string | null>(
      releaseDates[0] ?? null,
    )

    const displayed = useMemo(() => {
      if (selectedDate) {
        return [{ date: selectedDate, list: groups[selectedDate] }]
      }
      return releaseDates.map((date) => ({ date, list: groups[date] }))
    }, [groups, releaseDates, selectedDate])

    return (
      <section className="mx-auto flex max-w-5xl flex-col gap-y-8" ref={ref}>
        <h2 className="text-3xl font-bold">歷年首發機型</h2>

        <div className="flex flex-wrap gap-4">
          <div className="relative w-full lg:w-1/5">
            <div className="sticky top-4 flex flex-col gap-y-4">
              <h3 className="text-xl font-medium">發售年月</h3>

              <ul className="flex flex-col rounded-2xl bg-base-200 p-2 text-sm">
                <ListItem
                  active={!selectedDate}
                  onClick={() => {
                    setSelectedDate(null)
                  }}
                >
                  <span className="inline-flex items-center">
                    <IconTableFilled className="mr-2 inline-block" size={20} />
                    顯示全部
                  </span>
                </ListItem>

                {releaseDates.map((date, index) => {
                  const isActive = date === selectedDate

                  return (
                    <ListItem
                      key={date}
                      active={isActive}
                      onClick={() => {
                        setSelectedDate(date)
                      }}
                    >
                      {formatDateChinese(date)}
                      {!index && (
                        <NewBadge
                          className={cn(
                            'rounded-full border border-current bg-orange-500/10 px-1.5 text-xs font-bold text-orange-500',
                            { 'text-inherit bg-transparent': isActive },
                          )}
                        />
                      )}
                    </ListItem>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className="flex min-w-full flex-col gap-4 sm:mx-0 sm:flex-1 lg:min-w-0 lg:px-8">
            {displayed.map(({ date, list }, index) => (
              <TablePriceByDate key={index} date={date} list={list} />
            ))}

            <span className="text-xs opacity-70">單位：新台幣</span>
          </div>
        </div>
      </section>
    )
  },
)
