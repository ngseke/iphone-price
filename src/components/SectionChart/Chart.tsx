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

// eslint-disable-next-line react-hooks/rules-of-hooks
use([
  CanvasRenderer,
  LineChart,
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  MarkLineComponent,
])

export default function Chart(props: {
  iphoneDataset: IphoneDataset[]
  selectedDataset: Nullish<IphoneDataset>
  taiwanMinimumWageList: TaiwanMinimumWage[]

  selectedSeriesName?: string | null
  onChangeSelectedSeriesName?: (index: string | null) => void

  modelNameAbbreviation: boolean
  priceAbbreviation: boolean
  hidePrice: boolean
  hideTooltip: boolean

  showTaiwanMinimumWageList: boolean
  onReset?: () => void
}) {
  const selectedSeriesNameRef = useRef(props.selectedSeriesName)
  selectedSeriesNameRef.current = props.selectedSeriesName

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
      fontSize: props.hidePrice ? 12 : 10,
      fontWeight: props.hidePrice ? 500 : 400,
      lineHeight: 16,
      padding: [0, 4, 0, 0],
    }),
    [commonLabelRich, isDark, props.hidePrice],
  )

  const label = useMemo(
    () =>
      ({
        show: true,
        formatter(params) {
          const iphone = params.data as Iphone

          const { model } = iphone
          const formattedModelName = props.modelNameAbbreviation
            ? formatIphoneModelAbbreviation(model)
            : formatIphoneModel(model)

          const price = iphone.price.twd
          const formattedPrice = props.priceAbbreviation
            ? formatPriceAbbreviation(price)
            : formatPrice(price)

          return [
            `{name|${formattedModelName}}`,
            props.hidePrice ? null : `{price|${String(formattedPrice)}}`,
          ]
            .filter(Boolean)
            .join(props.modelNameAbbreviation ? '' : '\n')
        },
        rich: {
          name: labelRichName,
          price: labelRichPrice,
        },
      }) satisfies LineSeriesOption['label'],
    [
      labelRichName,
      labelRichPrice,
      props.hidePrice,
      props.modelNameAbbreviation,
      props.priceAbbreviation,
    ],
  )

  const taiwanMinimumWageLabel = useMemo<LineSeriesOption['label']>(
    () => ({
      show: true,
      formatter(params) {
        if (!Array.isArray(params.value)) return ''

        const price = Number(params.value[1])
        const formattedPrice = props.priceAbbreviation
          ? formatPriceAbbreviation(price)
          : formatPrice(price)
        const name = props.modelNameAbbreviation
          ? '月薪'
          : '台灣基本工資（月薪）'

        return [
          !params.dataIndex ? `{name|${name}}` : null,
          props.hidePrice ? null : `{price|${String(formattedPrice)}}`,
        ]
          .filter(Boolean)
          .join(props.modelNameAbbreviation ? '' : '\n')
      },
      rich: {
        name: labelRichName,
        price: labelRichPrice,
      },
    }),
    [
      labelRichName,
      labelRichPrice,
      props.hidePrice,
      props.modelNameAbbreviation,
      props.priceAbbreviation,
    ],
  )

  const taiwanMinimumWageSeriesName = '台灣基本工資（月薪）'
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
      data: props.taiwanMinimumWageList.map((item) => ({
        name: taiwanMinimumWageSeriesName,
        date: +dayjs(item.implementedAt, 'YYYY-MM-DD'),
        value: [
          +dayjs(item.implementedAt, 'YYYY-MM-DD'),
          item.monthlySalary.twd,
        ],
      })),
    }),
    [isDark, props.taiwanMinimumWageList, taiwanMinimumWageLabel],
  )

  const { tooltip } = useChartTooltip()

  const displayedDataset = useMemo(
    () =>
      props.selectedDataset ? [props.selectedDataset] : props.iphoneDataset,
    [props.iphoneDataset, props.selectedDataset],
  )

  const option = useMemo(
    () =>
      ({
        darkMode: isDark,
        dataset: displayedDataset,
        tooltip: props.hideTooltip ? undefined : tooltip,
        series: [
          ...displayedDataset.map<LineSeriesOption>((dataset, index) => ({
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
          ...(props.showTaiwanMinimumWageList ? [taiwanMinimumWageSeries] : []),
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
          max:
            (props.selectedDataset?.source.length ?? 0) > 1
              ? ({ max }) => max * 1.03
              : undefined,
          min:
            (props.selectedDataset?.source.length ?? 0) > 1
              ? ({ min }) => min * 0.99
              : 'dataMin',
          axisLabel: { formatter: formatPriceAbbreviation },
          splitLine: { lineStyle: { color: isDark ? '#666' : '#ccc' } },
        },
      }) satisfies EChartsOption,
    [
      displayedDataset,
      isDark,
      label,
      props.hideTooltip,
      props.selectedDataset,
      props.showTaiwanMinimumWageList,
      shade,
      taiwanMinimumWageSeries,
      tooltip,
    ],
  )

  const isEmpty = !props.iphoneDataset.length

  const chartRef = useRef<ReactECharts | null>(null)

  const handleClick = useCallback(
    (event: { seriesName: Nullish<string> }) => {
      if (event.seriesName === taiwanMinimumWageSeriesName) return

      const callback = props.onChangeSelectedSeriesName
      callback?.(event.seriesName ?? null)
    },
    [props.onChangeSelectedSeriesName],
  )

  const onEvents = useMemo(
    () => ({
      click: handleClick,
    }),
    [handleClick],
  )

  if (isEmpty) return <CardNoResult onReset={props.onReset} />

  return (
    <div className="size-full min-w-[800px] overflow-hidden sm:min-w-0">
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
