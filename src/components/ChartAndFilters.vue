<script setup lang="ts">
import { computed, ref } from 'vue'
import Chart from './Chart.vue'
import LayoutFormGroup from './LayoutFormGroup.vue'
import RadioGroupStorageSize from './RadioGroupStorageSize.vue'
import CheckboxGroupIphoneLine from './CheckboxGroupIphoneLine.vue'
import Switch from './Switch.vue'
import useFilter from '../composables/useFilter'
import TabChartType from './TabChartType.vue'
import useDisplayOptions from '../composables/useDisplayOptions'
import { chartTypeOptions } from '../modules/chartType'
import useChartType from '../composables/useChartType'
import { taiwanMinimumWageList } from '../databases/taiwanMinimumWage'
import ModelFullscreen from './ModelFullscreen.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExpand, faDownload } from '@fortawesome/free-solid-svg-icons'
import RangeSlider from './RangeSlider.vue'
import { defaultFilter } from '../modules/filter'
import LayoutFormSectionGroup from './LayoutFormSectionGroup.vue'
import useIphoneDataset from '../composables/useIphoneDataset'
import Table from './Table.vue'
import ButtonBack from './ButtonBack.vue'

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
  resetYearRange,
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
} = useIphoneDataset({
  options: computed(() => ({
    storage: filter.value.storage,
    lines: filter.value.lines,
    groupBy: chartTypeOptions[chartType.value].groupBy,
    showAllRelease: chartType.value === 'priceAdjustment',
    yearRange: filter.value.yearRange,
  })),
})

const isFullscreenChartShown = ref(false)
const downloadUrl = ref<string | null>(null)

const chartBind = computed(() => ({
  iphoneDataset: iphoneDataset.value,
  taiwanMinimumWageList,
  modelNameAbbreviation: displayOptions.value.isModelNameAbbreviation,
  priceAbbreviation: displayOptions.value.isPriceAbbreviation,
  hidePrice: displayOptions.value.isPriceHidden,
  showTaiwanMinimumWageList: displayOptions.value.isTaiwanMinimumWageListShown,
  onReset: resetFilter,
}))
</script>

<template>
  <div class="flex flex-wrap gap-y-8">
    <div class="-mx-4 min-w-full sm:mx-0 sm:flex-1 lg:min-w-0">
      <div class="flex w-full flex-col items-start space-y-8 overflow-x-auto lg:sticky lg:top-8 lg:px-4">
        <div class="h-[24rem] w-full min-w-[36rem] sm:h-[32rem]">
          <Chart
            v-bind="chartBind"
            v-model:selectedSeriesName="selectedDatasetName"
            @dataUrlChanged="(url) => { downloadUrl = url }"
          />
          <ModelFullscreen v-model="isFullscreenChartShown">
            <Chart v-bind="chartBind" />
          </ModelFullscreen>
        </div>
        <ul class="menu rounded-box menu-horizontal bg-base-200 font-medium">
          <li>
            <button type="button" @click="isFullscreenChartShown = true">
              <FontAwesomeIcon :icon="faExpand" />
            </button>
          </li>
          <li :class="{ 'disabled': !downloadUrl }">
            <a download="chart.png" :href="downloadUrl ?? 'javascript:void(0)'">
              <FontAwesomeIcon :icon="faDownload" />
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="relative w-full lg:w-1/3">
      <Transition
        :enterFromClass="`${!selectedDatasetName ? '-translate-x-5' : 'translate-x-5'} opacity-0`"
        enterActiveClass="transition duration-250"
        :leaveToClass="`${!selectedDatasetName ? 'translate-x-5' : '-translate-x-5'} opacity-0`"
        leaveActiveClass="transition duration-250 absolute"
      >
        <div v-if="!selectedDatasetName" class="flex flex-col gap-y-4">
          <LayoutFormSectionGroup>
            <template #title>圖表類型</template>
            <TabChartType v-model="chartType" />
          </LayoutFormSectionGroup>

          <LayoutFormSectionGroup
            :showReset="isSomeFilterChanged"
            @reset="resetFilter"
          >
            <template #title>篩選條件</template>
            <LayoutFormGroup
              :showReset="isFilterStorageSizeChanged"
              @reset="resetFilterStorageSize"
            >
              <template #title>儲存空間</template>
              <RadioGroupStorageSize v-model="filter.storage" />
            </LayoutFormGroup>

            <LayoutFormGroup
              :showReset="isFilterLinesChanged"
              @reset="resetFilterLines"
            >
              <template #title>產品線</template>
              <CheckboxGroupIphoneLine v-model="filter.lines" />
            </LayoutFormGroup>

            <LayoutFormGroup
              :showReset="isFilterYearRangeChanged"
              @reset="resetYearRange"
            >
              <template #title>發售年份</template>
              <RangeSlider
                v-model="filter.yearRange"
                :max="defaultFilter.yearRange[1]"
                :min="defaultFilter.yearRange[0]"
              />
            </LayoutFormGroup>
          </LayoutFormSectionGroup>

          <LayoutFormSectionGroup
            :showReset="isSomeDisplayOptionsChanged"
            @reset="resetDisplayOptions"
          >
            <template #title>顯示方式</template>
            <LayoutFormGroup>
              <template #title>標籤</template>
              <div class="flex flex-col flex-wrap gap-x-4">
                <Switch
                  v-model="displayOptions.isModelNameAbbreviation"
                  label="簡化產品名稱"
                />
                <Switch
                  v-model="displayOptions.isPriceHidden"
                  label="隱藏價格"
                />
                <Switch
                  v-model="displayOptions.isPriceAbbreviation"
                  :disabled="displayOptions.isPriceHidden"
                  label="簡化價格"
                />
              </div>
            </LayoutFormGroup>
            <LayoutFormGroup>
              <template #title>其他指標</template>
              <div class="flex flex-wrap gap-x-4">
                <Switch
                  v-model="displayOptions.isTaiwanMinimumWageListShown"
                  label="顯示台灣基本工資（月薪）"
                />
              </div>
            </LayoutFormGroup>
          </LayoutFormSectionGroup>
        </div>
        <div v-else class="flex w-full flex-col gap-y-4">
          <div>
            <ButtonBack @click="selectedDatasetName = null" />
          </div>
          <Table :source="selectedDataset?.source" />
        </div>
      </Transition>
    </div>
  </div>
</template>
