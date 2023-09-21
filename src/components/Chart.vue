<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { type LineSeriesOption, type EChartsOption, type DatasetComponentOption } from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import VueECharts from 'vue-echarts'
import { DatasetComponent, TooltipComponent, GridComponent } from 'echarts/components'
import { type Iphone } from '../types/Iphone'
import { formatIphoneModel, formatIphoneModelAbbreviation } from '../modules/iphoneModel'
import { useDark } from '../composables/useDark'
import colors from 'tailwindcss/colors'
import { formatPrice, formatPriceAbbreviation } from '../modules/price'
import CardNoResult from './CardNoResult.vue'
import { nanoid } from 'nanoid'
import { type TaiwanMinimumWage } from '../databases/taiwanMinimumWage'

use([
  CanvasRenderer,
  LineChart,
  DatasetComponent,
  TooltipComponent,
  GridComponent,
])

const props = defineProps<{
  iphoneDataset: DatasetComponentOption[]
  taiwanMinimumWageList: TaiwanMinimumWage[]

  modelNameAbbreviation: boolean
  priceAbbreviation: boolean
  showTaiwanMinimumWageList: boolean
}>()

const emit = defineEmits<{
  reset: []
  dataUrlChanged: [url: string]
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

const label = computed<LineSeriesOption['label']>(() => {
  const isModelNameAbbreviation = props.modelNameAbbreviation
  const isPriceAbbreviation = props.priceAbbreviation

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
      `{price|${formattedPrice}}`,
      ].join(isModelNameAbbreviation ? '' : '\n')
    },
    rich: {
      name: {
        ...commonLabelRich.value,
        color: colors.neutral[isDark.value ? 400 : 600],
        fontSize: 10,
        lineHeight: 16,
        fontWeight: 400,
        padding: [0, 4, 0, 0],
      },
      price: labelRichPrice.value,
    },
  }
})

const taiwanMinimumWageLabel = computed<LineSeriesOption['label']>(() => {
  const isPriceAbbreviation = props.priceAbbreviation

  return {
    show: true,
    formatter (params) {
      if (!Array.isArray(params.value)) return ''

      const price = +params.value[1]
      const formattedPrice = isPriceAbbreviation
        ? formatPriceAbbreviation(price)
        : formatPrice(price)

      return `{price|${formattedPrice}}`
    },
    rich: {
      price: labelRichPrice.value,
    },
  }
})

const taiwanMinimumWageSeries = computed<LineSeriesOption>(() => ({
  type: 'line',
  smooth: true,
  symbol: 'roundRect',
  symbolSize: 8,
  label: taiwanMinimumWageLabel.value,
  color: isDark.value ? colors.zinc[400] : colors.zinc[700],
  data: props.taiwanMinimumWageList.map((item) => ({
    name: '',
    value: [
      +dayjs(item.implementedAt, 'YYYY-MM-DD'),
      item.monthlySalary.twd,
    ],
  })),
}))

const seriesIdPrefix = ref('')
watch(() => props.iphoneDataset, () => {
  seriesIdPrefix.value = nanoid()
}, { immediate: true })

const option = computed<EChartsOption>(() => ({
  darkMode: isDark.value,
  dataset: props.iphoneDataset,
  series: [
    ...props.iphoneDataset.map((_, index) => ({
      type: 'line',
      label: label.value,
      symbol: 'circle',
      symbolSize: 6,
      smooth: true,
      encode: { x: 'date', y: 'value' },
      datasetIndex: index,
      // HACK: force chart to replay animation
      id: `${seriesIdPrefix.value}${index}`,
    } as const)),
    ...(props.showTaiwanMinimumWageList
      ? [taiwanMinimumWageSeries.value]
      : []),
  ],
  animationDuration: 200,
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
    top: '5%',
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
    min: (value) => value.min - 2000,
    max: (value) => value.max + 2000,
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

function handleFinished () {
  const url = chartRef.value?.getDataURL({ type: 'png' })
  if (url) emit('dataUrlChanged', url)
}
</script>

<template>
  <CardNoResult v-if="isEmpty" @reset="$emit('reset')" />
  <VueECharts
    v-else
    ref="chartRef"
    autoresize
    class="h-full w-full"
    :option="option"
    @finished="handleFinished"
  />
</template>
