<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import Chart from './Chart.vue'
import useFilter from '../composables/useFilter'
import TabChartType from './TabChartType.vue'
import useDisplayOptions from '../composables/useDisplayOptions'
import { chartTypeOptions } from '../modules/chartType'
import useChartType from '../composables/useChartType'
import ModelFullscreen from './ModelFullscreen.vue'
import LayoutFormSectionGroup from './LayoutFormSectionGroup.vue'
import useIphoneDataset from '../composables/useIphoneDataset'
import Table from './Table.vue'
import ButtonBack from './ButtonBack.vue'
import FormGroupFilter from './FormGroupFilter.vue'
import FormGroupDisplayOptions from './FormGroupDisplayOptions.vue'
import MenuChart from './MenuChart.vue'
import Select from './Select.vue'
import { formatDatasetName } from '../modules/iphoneDataset'
import useTaiwanMinimumWageList from '../composables/useTaiwanMinimumWageList'

const { chartType } = useChartType()

const {
  filter,
  isFilterStorageSizeChanged,
  isFilterLinesChanged,
  isFilterYearRangeChanged,
  isSomeFilterChanged,
  resetFilter,
  resetFilterStorageSize,
  resetFilterLines,
  resetFilterYearRange,
} = useFilter()

const {
  displayOptions,
  isSomeDisplayOptionsChanged,
  resetDisplayOptions,
} = useDisplayOptions()

const {
  iphoneDataset,
  selectedDatasetName,
  selectedDataset,
  iphoneDatasetNames,
} = useIphoneDataset({
  options: computed(() => ({
    storage: filter.value.storage,
    lines: filter.value.lines,
    groupBy: chartTypeOptions[chartType.value].groupBy,
    showAllRelease: chartType.value === 'priceAdjustment',
    yearRange: filter.value.yearRange,
  })),
})

const { taiwanMinimumWageList } = useTaiwanMinimumWageList({
  options: computed(() => ({
    yearRange: filter.value.yearRange,
  })),
})

const isFullscreenChartShown = ref(false)

const chartBind = computed(() => ({
  iphoneDataset: iphoneDataset.value,
  taiwanMinimumWageList: taiwanMinimumWageList.value,
  modelNameAbbreviation: displayOptions.value.isModelNameAbbreviation,
  priceAbbreviation: displayOptions.value.isPriceAbbreviation,
  hidePrice: displayOptions.value.isPriceHidden,
  showTaiwanMinimumWageList: displayOptions.value.isTaiwanMinimumWageListShown,
  hideTooltip: displayOptions.value.isTooltipHidden,
  onReset: resetFilter,
}))

const iphoneDatasetNameItems = computed(() => (
  iphoneDatasetNames.value.map((name) => ({
    value: name,
    title: formatDatasetName(name),
  }))
))

const chartRef = ref<InstanceType<typeof Chart> | null>(null)
const downloadLinkRef = ref<HTMLAnchorElement | null>(null)
const downloadUrl = ref<string | null>(null)

async function download () {
  const url = chartRef.value?.getDownloadUrl()
  if (!url) return
  downloadUrl.value = url
  await nextTick()
  downloadLinkRef.value?.click()
}

const shouldShowTable = computed(() => Boolean(selectedDataset.value))
</script>

<template>
  <div class="flex flex-wrap gap-y-8">
    <div class="-mx-4 min-w-full sm:mx-0 sm:flex-1 lg:min-w-0">
      <div class="flex w-full flex-col items-start space-y-8 overflow-x-auto lg:sticky lg:top-8 lg:px-4">
        <div class="h-[24rem] w-full min-w-[36rem] sm:h-[32rem]">
          <Chart
            ref="chartRef"
            v-bind="chartBind"
            v-model:selectedSeriesName="selectedDatasetName"
          />
          <ModelFullscreen v-model="isFullscreenChartShown">
            <Chart v-bind="chartBind" />
          </ModelFullscreen>
        </div>
        <div class="flex w-full items-center justify-between">
          <MenuChart
            v-model:isFullscreenChartShown="isFullscreenChartShown"
            :downloadUrl="downloadUrl"
            @clickDownload="download"
          />
          <span class="text-xs opacity-70">單位：新台幣</span>
        </div>
        <a
          ref="downloadLinkRef"
          class="hidden"
          download="chart.png"
          :href="downloadUrl ?? ''"
        />
      </div>
    </div>

    <div class="relative w-full lg:w-1/3">
      <Transition
        :enterFromClass="`${!shouldShowTable ? '-translate-x-5' : 'translate-x-5'} opacity-0`"
        enterActiveClass="transition duration-250"
        :leaveToClass="`${!shouldShowTable ? 'translate-x-5' : '-translate-x-5'} opacity-0`"
        leaveActiveClass="transition duration-250 absolute"
      >
        <div v-if="shouldShowTable" class="inset-0 z-50 bg-base-100 sm:absolute">
          <div class="sticky top-0 flex flex-col gap-y-4 py-6">
            <div class="flex">
              <ButtonBack @click="selectedDatasetName = null" />
            </div>
            <Select
              v-model="selectedDatasetName"
              :items="iphoneDatasetNameItems"
              label="查看系列"
            />
            <Table :source="selectedDataset?.source" />
          </div>
        </div>
      </Transition>

      <div
        class="flex-col gap-y-4 transition duration-150"
        :class="shouldShowTable ? 'hidden sm:flex sm:invisible' : 'flex'"
      >
        <LayoutFormSectionGroup>
          <template #title>圖表類型</template>
          <TabChartType v-model="chartType" />
        </LayoutFormSectionGroup>

        <FormGroupFilter
          v-model:lines="filter.lines"
          v-model:storage="filter.storage"
          v-model:yearRange="filter.yearRange"
          :showLinesReset="isFilterLinesChanged"
          :showReset="isSomeFilterChanged"
          :showStorageSizeReset="isFilterStorageSizeChanged"
          :showYearRangeReset="isFilterYearRangeChanged"
          @reset="resetFilter"
          @resetLines="resetFilterLines"
          @resetStorageSize="resetFilterStorageSize"
          @resetYearRange="resetFilterYearRange"
        />

        <FormGroupDisplayOptions
          v-model:isModelNameAbbreviation="displayOptions.isModelNameAbbreviation"
          v-model:isPriceAbbreviation="displayOptions.isPriceAbbreviation"
          v-model:isPriceHidden="displayOptions.isPriceHidden"
          v-model:isTaiwanMinimumWageListShown="displayOptions.isTaiwanMinimumWageListShown"
          v-model:isTooltipHidden="displayOptions.isTooltipHidden"
          :showReset="isSomeDisplayOptionsChanged"
          @reset="resetDisplayOptions"
        />
      </div>
    </div>
  </div>
</template>
