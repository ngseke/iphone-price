import { TaiwanMinimumWage } from '@/src/databases/taiwanMinimumWage'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { type LineSeriesOption, type EChartsOption } from 'echarts'
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  MarkLineComponent,
} from 'echarts/components'
import { AxisBreak } from 'echarts/features'
import ReactECharts from 'echarts-for-react'
import { useCallback, useMemo, useRef, useState } from 'react'
import colors from 'tailwindcss/colors'
import {
  formatIphoneModelAbbreviation,
  formatIphoneModel,
} from '@/src/modules/iphoneModel'
import { formatPriceAbbreviation, formatPrice } from '@/src/modules/price'
import { Iphone } from '@/src/types/Iphone'
import dayjs from 'dayjs'
import { Nullish } from '@/src/types/Nullish'
import { useChartTooltip } from './useChartTooltip'
import { CardNoResult } from './CardNoResult'
import { IphoneDataset } from '@/src/modules/iphoneDataset'
import { useTranslations } from 'next-intl'

// eslint-disable-next-line react-hooks/rules-of-hooks
use([
  CanvasRenderer,
  LineChart,
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  MarkLineComponent,
  AxisBreak,
])

export default function Chart({
  iphoneDataset,
  taiwanMinimumWageList,
  onClickSeries,
  modelNameAbbreviation,
  priceAbbreviation,
  hidePrice,
  hideTooltip,
  showTaiwanMinimumWageList,
  onReset,
}: {
  iphoneDataset: IphoneDataset[]
  taiwanMinimumWageList: TaiwanMinimumWage[]

  selectedSeriesName?: string | null
  onClickSeries?: (index: string | null) => void

  modelNameAbbreviation: boolean
  priceAbbreviation: boolean
  hidePrice: boolean
  hideTooltip: boolean

  showTaiwanMinimumWageList: boolean
  onReset?: () => void
}) {
  const t = useTranslations('Chart')

  const [isDark] = useState(true)
  const shade = isDark ? 800 : 600
  const commonLabelRich = useMemo(
    () =>
      ({
        textBorderWidth: 2,
        textBorderColor: isDark ? 'rgba(0,0,0,.7)' : 'rgba(255,255,255,.7)',
      }) as const,
    [isDark],
  )
  const labelRichPrice = useMemo(
    () => ({
      ...commonLabelRich,
      fontSize: 14,
      fontWeight: 600,
    }),
    [commonLabelRich],
  )
  const labelRichName = useMemo(
    () => ({
      ...commonLabelRich,
      color: colors.neutral[isDark ? 400 : 600],
      fontSize: hidePrice ? 12 : 10,
      fontWeight: hidePrice ? 500 : 400,
      lineHeight: 16,
      padding: [0, 4, 0, 0],
    }),
    [commonLabelRich, isDark, hidePrice],
  )

  const label = useMemo(
    () =>
      ({
        show: true,
        formatter(params) {
          const price = (params.data as { value: number }).value
          const iphone = params.data as Iphone

          const { model } = iphone
          const formattedModelName = modelNameAbbreviation
            ? formatIphoneModelAbbreviation(model)
            : formatIphoneModel(model)

          const formattedPrice = priceAbbreviation
            ? formatPriceAbbreviation(price)
            : formatPrice(price)

          return [
            `{name|${formattedModelName}}`,
            hidePrice ? null : `{price|${String(formattedPrice)}}`,
          ]
            .filter(Boolean)
            .join(modelNameAbbreviation ? '' : '\n')
        },
        rich: {
          name: labelRichName,
          price: labelRichPrice,
        },
      }) satisfies LineSeriesOption['label'],
    [
      labelRichName,
      labelRichPrice,
      hidePrice,
      modelNameAbbreviation,
      priceAbbreviation,
    ],
  )

  const taiwanMinimumWageSeriesName = t('series.taiwanMinimumWage')
  const taiwanMinimumWageAbbreviation = t(
    'series.taiwanMinimumWageAbbreviation',
  )

  const taiwanMinimumWageLabel = useMemo<LineSeriesOption['label']>(
    () => ({
      show: true,
      formatter(params) {
        if (!Array.isArray(params.value)) return ''

        const price = Number(params.value[1])
        const formattedPrice = priceAbbreviation
          ? formatPriceAbbreviation(price)
          : formatPrice(price)
        const name = modelNameAbbreviation
          ? taiwanMinimumWageAbbreviation
          : taiwanMinimumWageSeriesName

        return [
          !params.dataIndex ? `{name|${name}}` : null,
          hidePrice ? null : `{price|${String(formattedPrice)}}`,
        ]
          .filter(Boolean)
          .join(modelNameAbbreviation ? '' : '\n')
      },
      rich: {
        name: labelRichName,
        price: labelRichPrice,
      },
    }),
    [
      labelRichName,
      labelRichPrice,
      hidePrice,
      modelNameAbbreviation,
      priceAbbreviation,
      taiwanMinimumWageAbbreviation,
      taiwanMinimumWageSeriesName,
    ],
  )

  const taiwanMinimumWageSeries: LineSeriesOption = useMemo(
    () => ({
      type: 'line',
      silent: true,
      smooth: true,
      symbol: 'roundRect',
      symbolSize: 8,
      label: taiwanMinimumWageLabel,
      color: isDark ? colors.zinc[400] : colors.zinc[700],
      emphasis: { focus: 'series' },
      encode: { x: 'date', y: 'value', itemName: 'name' },
      name: taiwanMinimumWageSeriesName,
      data: taiwanMinimumWageList.map((item) => ({
        name: taiwanMinimumWageSeriesName,
        date: +dayjs(item.implementedAt, 'YYYY-MM-DD'),
        value: [
          +dayjs(item.implementedAt, 'YYYY-MM-DD'),
          item.monthlySalary.twd,
        ],
      })),
    }),
    [
      isDark,
      taiwanMinimumWageList,
      taiwanMinimumWageLabel,
      taiwanMinimumWageSeriesName,
    ],
  )

  const { tooltip } = useChartTooltip()

  const isOneDataset =
    iphoneDataset.length === 1 && (iphoneDataset[0]?.source.length ?? 0) > 1

  /**
   * Collapse a large empty band of the y-axis (e.g. between the Pro Max and
   * the foldable) so one outlier series doesn't squash everything else.
   */
  const yAxisBreaks = useMemo(() => {
    // Only break the axis when a foldable series is shown together with
    // other lines; the band marks the gap between the two groups.
    const items = iphoneDataset.flatMap((dataset) => dataset.source)
    const foldableValues = items
      .filter((item) => item.line === 'foldable')
      .map((item) => item.value)
    const otherValues = items
      .filter((item) => item.line !== 'foldable')
      .map((item) => item.value)
    if (!foldableValues.length || !otherValues.length) return []

    const lower = Math.max(...otherValues)
    const upper = Math.min(...foldableValues)
    const range = Math.max(...foldableValues) - Math.min(...otherValues)
    if (upper <= lower || (upper - lower) / range < 0.25) return []

    // Leave more room below the break so the label above the highest
    // non-foldable point isn't covered by the break band.
    const lowerMargin = range * 0.06
    const upperMargin = range * 0.02
    // Round the break bounds to a unit one order of magnitude below the
    // range, so TWD (tens of thousands) rounds to 1,000 and USD to 100.
    const roundTo = 10 ** Math.max(0, Math.floor(Math.log10(range)) - 1)
    const start = Math.ceil((lower + lowerMargin) / roundTo) * roundTo
    const end = Math.floor((upper - upperMargin) / roundTo) * roundTo
    if (start >= end) return []

    return [{ start, end, gap: '2.5%' }]
  }, [iphoneDataset])

  const option = useMemo(
    () =>
      ({
        darkMode: isDark,
        dataset: iphoneDataset,
        tooltip: hideTooltip ? undefined : tooltip,
        series: [
          ...iphoneDataset.map<LineSeriesOption>((dataset, index) => ({
            type: 'line',
            label,
            symbol: 'circle',
            symbolSize: 6,
            smooth: true,
            encode: { x: 'date', y: 'value', itemName: 'name' },
            datasetIndex: index,
            name: dataset.name,
            id: dataset.name,
            emphasis: { focus: 'series', scale: 1.5 },
            triggerLineEvent: true,
            color: dataset.color,
          })),
          ...(showTaiwanMinimumWageList ? [taiwanMinimumWageSeries] : []),
        ],
        animationDuration: 300,
        animationDurationUpdate: 400,
        textStyle: { fontFamily: ['Rubik', '"Noto Sans TC"'].join(',') },
        color: [
          colors.rose[shade],
          colors.amber[shade],
          colors.lime[shade],
          colors.cyan[shade],
          colors.teal[shade],
          colors.indigo[shade],
          colors.orange[shade],
          colors.green[shade],
          colors.emerald[shade],
          colors.violet[shade],
        ],
        grid: {
          containLabel: true,
          top: '8%',
          right: '4%',
          bottom: '0%',
          left: '4%',
        },
        xAxis: {
          type: 'time',
          minInterval: 24 * 3600 * 1000,
          splitNumber: 5,
          boundaryGap: ['5%', '5%'],
          axisLabel: {
            formatter: '{yyyy}-{MM}',
            showMaxLabel: true,
            showMinLabel: true,
          },
        },
        yAxis: {
          type: 'value',
          // With a break the space above the foldable series is wasted;
          // hug the top value instead of rounding the axis up.
          max:
            isOneDataset || yAxisBreaks.length
              ? ({ max }) => max * 1.03
              : undefined,
          min: isOneDataset ? ({ min }) => min * 0.99 : 'dataMin',
          axisLabel: { formatter: formatPriceAbbreviation },
          splitLine: { lineStyle: { color: isDark ? '#666' : '#ccc' } },
          breaks: yAxisBreaks,
          breakArea: {
            show: true,
            zigzagAmplitude: 2,
            zigzagMinSpan: 8,
            zigzagMaxSpan: 14,
            expandOnClick: false,
            itemStyle: {
              color: isDark ? '#27272a' : '#f4f4f5',
              borderColor: isDark ? '#a1a1aa' : '#71717a',
              borderType: 'solid',
              opacity: 1,
            },
          },
        },
      }) satisfies EChartsOption,
    [
      isDark,
      isOneDataset,
      yAxisBreaks,
      label,
      hideTooltip,
      iphoneDataset,
      showTaiwanMinimumWageList,
      shade,
      taiwanMinimumWageSeries,
      tooltip,
    ],
  )

  const isEmpty = !iphoneDataset.length

  const chartRef = useRef<ReactECharts | null>(null)

  const handleClick = useCallback(
    (event: { seriesName: Nullish<string> }) => {
      onClickSeries?.(event.seriesName ?? null)
    },
    [onClickSeries],
  )

  /**
   * ECharts draws the axis-break band as sharp zigzags. zrender polylines
   * support `smooth`, so round them off after each render.
   */
  const handleFinished = useCallback(() => {
    const chart = chartRef.current?.getEchartsInstance()
    if (!chart) return
    const displayList = chart
      .getZr()
      .storage.getDisplayList(true) as unknown as {
      anid?: string
      shape?: { smooth?: number }
      setShape: (shape: { smooth: number }) => void
    }[]
    displayList.forEach((element) => {
      if (!element.anid?.startsWith('break_')) return
      if (element.shape?.smooth) return
      element.setShape({ smooth: 0.5 })
    })
  }, [])

  const onEvents = useMemo(
    () => ({
      click: handleClick,
      finished: handleFinished,
    }),
    [handleClick, handleFinished],
  )

  if (isEmpty) return <CardNoResult onReset={onReset} />

  return (
    <div className="size-full overflow-hidden sm:min-w-0">
      <ReactECharts
        ref={(e) => {
          chartRef.current = e
        }}
        notMerge
        className="!size-full"
        option={option}
        onEvents={onEvents}
      />
    </div>
  )
}
