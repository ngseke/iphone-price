<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { type LineSeriesOption, type EChartsOption, type DatasetComponentOption } from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import VueECharts from 'vue-echarts'
import { DatasetComponent, TooltipComponent, GridComponent, MarkLineComponent } from 'echarts/components'
import { type Iphone } from '../types/Iphone'
import { formatIphoneModel, formatIphoneModelAbbreviation } from '../modules/iphoneModel'
import { useDark } from '../composables/useDark'
import colors from 'tailwindcss/colors'
import { formatPrice, formatPriceAbbreviation } from '../modules/price'
import CardNoResult from './CardNoResult.vue'
import { type TaiwanMinimumWage } from '../databases/taiwanMinimumWage'
import { useChartTooltip } from '../composables/useChartTooltip'

use([
  CanvasRenderer,
  LineChart,
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  MarkLineComponent,
])

const props = defineProps<{
  selectedSeriesName?: string | null

  iphoneDataset: DatasetComponentOption[]
  taiwanMinimumWageList: TaiwanMinimumWage[]

  modelNameAbbreviation: boolean
  priceAbbreviation: boolean
  hidePrice: boolean
  hideTooltip: boolean

  showTaiwanMinimumWageList: boolean
}>()

const emit = defineEmits<{
  reset: []
  'update:selectedSeriesName': [index: string | null]
}>()

const isDark = useDark()
const shade = computed(() => isDark.value ? 800 : 600)

const commonLabelRich = computed(() => ({
  textBorderWidth: 2,
  textBorderColor: isDark.value
    ? 'rgba(0,0,0,.7)'
    : 'rgba(255,255,255,.7)',
} as const))

const labelRichPrice = computed(() => ({
  ...commonLabelRich.value,
  fontSize: 14,
  fontWeight: 600,
}))

const labelRichName = computed(() => ({
  ...commonLabelRich.value,
  color: colors.neutral[isDark.value ? 400 : 600],
  fontSize: props.hidePrice ? 12 : 10,
  fontWeight: props.hidePrice ? 500 : 400,
  lineHeight: 16,
  padding: [0, 4, 0, 0],
}))

const label = computed<LineSeriesOption['label']>(() => {
  const {
    modelNameAbbreviation: isModelNameAbbreviation,
    priceAbbreviation: isPriceAbbreviation,
    hidePrice: isPriceHidden,
  } = props

  return {
    show: true,
    formatter (params) {
      const iphone = params.data as Iphone

      const { model } = iphone
      const formattedModelName = isModelNameAbbreviation
        ? formatIphoneModelAbbreviation(model)
        : formatIphoneModel(model)

      const price = iphone.price.twd
      const formattedPrice = isPriceAbbreviation
        ? formatPriceAbbreviation(price)
        : formatPrice(price)

      return [
        `{name|${formattedModelName}}`,
        isPriceHidden ? null : `{price|${formattedPrice}}`,
      ]
        .filter(Boolean)
        .join(isModelNameAbbreviation ? '' : '\n')
    },
    rich: {
      name: labelRichName.value,
      price: labelRichPrice.value,
    },
  }
})

const taiwanMinimumWageLabel = computed<LineSeriesOption['label']>(() => {
  const {
    modelNameAbbreviation: isModelNameAbbreviation,
    priceAbbreviation: isPriceAbbreviation,
    hidePrice: isPriceHidden,
  } = props

  return {
    show: true,
    formatter (params) {
      if (!Array.isArray(params.value)) return ''

      const price = +params.value[1]
      const formattedPrice = isPriceAbbreviation
        ? formatPriceAbbreviation(price)
        : formatPrice(price)
      const name = isModelNameAbbreviation ? '月薪' : '台灣基本工資（月薪）'

      return [
        !params.dataIndex ? `{name|${name}}` : null,
        isPriceHidden ? null : `{price|${formattedPrice}}`,
      ]
        .filter(Boolean)
        .join(isModelNameAbbreviation ? '' : '\n')
    },
    rich: {
      name: labelRichName.value,
      price: labelRichPrice.value,
    },
  }
})

const taiwanMinimumWageSeriesName = '台灣基本工資（月薪）'
const taiwanMinimumWageSeries = computed<LineSeriesOption>(() => ({
  type: 'line',
  silent: true,
  smooth: true,
  symbol: 'roundRect',
  symbolSize: 8,
  label: taiwanMinimumWageLabel.value,
  color: isDark.value ? colors.zinc[400] : colors.zinc[700],
  emphasis: { focus: 'series' },
  encode: {
    x: 'date',
    y: 'value',
    itemName: 'name',
  },
  name: taiwanMinimumWageSeriesName,
  data: props.taiwanMinimumWageList.map((item) => ({
    name: taiwanMinimumWageSeriesName,
    date: +dayjs(item.implementedAt, 'YYYY-MM-DD'),
    value: [
      +dayjs(item.implementedAt, 'YYYY-MM-DD'),
      item.monthlySalary.twd,
    ],
  })),
}))

const { tooltip } = useChartTooltip()

const option = computed<EChartsOption>(() => ({
  darkMode: isDark.value,
  dataset: props.iphoneDataset,
  tooltip: props.hideTooltip ? undefined : tooltip.value,
  series: [
    ...props.iphoneDataset.map<LineSeriesOption>((dataset, index) => ({
      type: 'line',
      label: label.value,
      symbol: 'circle',
      symbolSize: 6,
      smooth: true,
      encode: {
        x: 'date',
        y: 'value',
        itemName: 'name',
      },
      datasetIndex: index,
      name: dataset.name,
      id: dataset.name,
      emphasis: {
        focus: 'series',
        scale: 1.3,
      },
      triggerLineEvent: true,
    })),
    ...(props.showTaiwanMinimumWageList
      ? [taiwanMinimumWageSeries.value]
      : []),
  ],
  animationDuration: 200,
  animationDurationUpdate: 350,
  textStyle: {
    fontFamily: ['Rubik', '"Noto Sans TC"'].join(','),
  },
  color: [
    colors.rose[shade.value],
    colors.amber[shade.value],
    colors.lime[shade.value],
    colors.cyan[shade.value],
    colors.teal[shade.value],
    colors.indigo[shade.value],
    colors.orange[shade.value],
    colors.green[shade.value],
    colors.emerald[shade.value],
    colors.violet[shade.value],
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
    min: 'dataMin',
    axisLabel: {
      formatter: formatPriceAbbreviation,
    },
    splitLine: {
      lineStyle: {
        color: isDark.value ? '#666' : '#ccc',
      },
    },
  },
}))

const isEmpty = computed(() => !props.iphoneDataset.length)

const chartRef = ref<InstanceType<typeof VueECharts> | null>(null)

function handleClick (event: Parameters<NonNullable<InstanceType< typeof VueECharts>['onClick']>>[0]) {
  if (event.seriesName === taiwanMinimumWageSeriesName) return

  emit('update:selectedSeriesName', event.seriesName ?? null)
}

function highlight () {
  if (props.selectedSeriesName != null) {
    chartRef.value?.dispatchAction({
      type: 'highlight',
      seriesName: props.selectedSeriesName,
    })
  }
}

async function handleMouseOut () {
  await nextTick()
  highlight()
}

watch(() => props.selectedSeriesName, () => {
  if (!props.selectedSeriesName) {
    chartRef.value?.dispatchAction({
      type: 'downplay',
    })
  } else {
    highlight()
  }
})

function getDownloadUrl () {
  return chartRef.value?.getDataURL({ type: 'png' })
}

defineExpose({ getDownloadUrl })
</script>

<template>
  <CardNoResult v-if="isEmpty" @reset="$emit('reset')" />
  <div v-else class="h-full w-full min-w-[800px] overflow-hidden sm:min-w-0">
    <VueECharts
      ref="chartRef"
      autoresize
      class="h-full w-full"
      :option="option"
      @click="handleClick"
      @mouseout="handleMouseOut"
      @zr:mouseout="handleMouseOut"
    />
  </div>
</template>
