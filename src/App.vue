<script setup lang="ts">
import { computed, ref } from 'vue'
import Chart from './components/Chart.vue'
import TheHero from './components/TheHero.vue'
import FormGroupLayout from './components/FormGroupLayout.vue'
import RadioGroupStorageSize from './components/RadioGroupStorageSize.vue'
import CheckboxGroupIphoneLine from './components/CheckboxGroupIphoneLine.vue'
import TheFooter from './components/TheFooter.vue'
import Switch from './components/Switch.vue'
import Title from './components/Title.vue'
import IconButtonReset from './components/IconButtonReset.vue'
import useFilter from './composables/useFilter'
import IconButtonDarkMode from './components/IconButtonDarkMode.vue'
import TabChartType from './components/TabChartType.vue'
import { generateIphoneDataset } from './modules/iphoneDataset'
import useDisplayOptions from './composables/useDisplayOptions'
import { chartTypeOptions } from './modules/chartType'
import useChartType from './composables/useChartType'
import { iphoneList } from './databases/iphone'
import { taiwanMinimumWageList } from './databases/taiwanMinimumWage'
import DataSource from './components/DataSource.vue'
import ModelFullscreen from './components/ModelFullscreen.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExpand, faDownload } from '@fortawesome/free-solid-svg-icons'

const { chartType } = useChartType()

const {
  filter,
  isFilterStorageSizeChanged,
  isFilterLinesChanged,
  isSomeFilterChanged,
  resetFilter,
  resetFilterStorageSize,
  resetFilterLines,
} = useFilter()

const {
  displayOptions,
  isSomeDisplayOptionsChanged,
  resetDisplayOptions,
} = useDisplayOptions()

const iphoneDataset = computed(() => (
  generateIphoneDataset(iphoneList, {
    storage: filter.value.storage,
    lines: filter.value.lines,
    groupBy: chartTypeOptions[chartType.value].groupBy,
    showAllRelease: chartType.value === 'priceAdjustment',
  })
))

const isFullscreenChartShown = ref(false)
const downloadUrl = ref<string | null>(null)

const chartBind = computed(() => ({
  iphoneDataset: iphoneDataset.value,
  taiwanMinimumWageList,
  modelNameAbbreviation: displayOptions.value.isModelNameAbbreviation,
  priceAbbreviation: displayOptions.value.isPriceAbbreviation,
  showTaiwanMinimumWageList: displayOptions.value.isTaiwanMinimumWageListShown,
  onReset: resetFilter,
  onDataUrlChanged: (url: string) => { downloadUrl.value = url },
}))
</script>

<template>
  <TheHero />

  <div class="container min-h-screen space-y-16 px-4 py-6">
    <div class="flex flex-wrap gap-y-8">
      <div class="-mx-4 min-w-full sm:mx-0 sm:flex-1 lg:min-w-0">
        <div class="flex w-full flex-col items-start space-y-8 overflow-x-auto lg:sticky lg:top-8 lg:px-4">
          <div class="h-[24rem] w-full min-w-[36rem] sm:h-[32rem]">
            <Chart v-bind="chartBind" />
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

      <div class="flex w-full flex-col gap-y-4 lg:w-1/3">
        <Title>圖表類型</Title>
        <TabChartType v-model="chartType" />

        <Title>
          篩選條件
          <template #titleActions>
            <IconButtonReset
              v-if="isSomeFilterChanged"
              size="sm"
              @click="resetFilter"
            />
          </template>
        </Title>
        <div class="flex flex-col gap-y-4">
          <FormGroupLayout
            :showReset="isFilterStorageSizeChanged"
            @reset="resetFilterStorageSize"
          >
            <template #title>儲存空間</template>
            <RadioGroupStorageSize v-model="filter.storage" />
          </FormGroupLayout>

          <FormGroupLayout
            :showReset="isFilterLinesChanged"
            @reset="resetFilterLines"
          >
            <template #title>產品線</template>
            <CheckboxGroupIphoneLine v-model="filter.lines" />
          </FormGroupLayout>
        </div>

        <Title>
          顯示方式
          <template #titleActions>
            <IconButtonReset
              v-if="isSomeDisplayOptionsChanged"
              size="sm"
              @click="resetDisplayOptions"
            />
          </template>
        </Title>
        <FormGroupLayout>
          <template #title>標籤</template>
          <div class="flex flex-wrap gap-x-4">
            <Switch v-model="displayOptions.isModelNameAbbreviation">
              簡化產品名稱
            </Switch>
            <Switch v-model="displayOptions.isPriceAbbreviation">
              簡化價格
            </Switch>
          </div>
        </FormGroupLayout>

        <FormGroupLayout>
          <template #title>其他指標</template>
          <div class="flex flex-wrap gap-x-4">
            <Switch v-model="displayOptions.isTaiwanMinimumWageListShown">
              顯示台灣基本工資（月薪）
            </Switch>
          </div>
        </FormGroupLayout>
      </div>
    </div>

    <div class="mx-auto max-w-2xl space-y-4">
      <DataSource />
    </div>
  </div>

  <TheFooter />

  <div class="fixed bottom-4 right-4">
    <IconButtonDarkMode />
  </div>
</template>
