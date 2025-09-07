<script setup lang="ts">
import LayoutFormGroup from './LayoutFormGroup.vue'
import CheckboxGroupIphoneLine from './CheckboxGroupIphoneLine.vue'
import RangeSlider from './RangeSlider.vue'
import { type Filter, defaultFilter } from '../modules/filter'
import LayoutFormSectionGroup from './LayoutFormSectionGroup.vue'
import { useVModels } from '@vueuse/core'
import { type StorageSize } from '../types/StorageSize'
import { type IphoneLine } from '../types/Iphone'
import SliderStorageSize from './SliderStorageSize.vue'

const props = defineProps<{
  storage: StorageSize
  lines: IphoneLine[]
  yearRange: [number, number]

  showReset: boolean
  showStorageSizeReset: boolean
  showLinesReset: boolean
  showYearRangeReset: boolean
}>()

const emit = defineEmits<{
  'update:storage': [value: Filter]
  'update:lines': [value: IphoneLine[]]
  'update:yearRange': [value: [number, number]]

  reset: []
  resetStorageSize: []
  resetLines: []
  resetYearRange: []
}>()

const { storage, lines, yearRange } = useVModels(props, emit)
</script>

<template>
  <LayoutFormSectionGroup
    :showReset="showReset"
    @reset="$emit('reset')"
  >
    <template #title>篩選條件</template>
    <LayoutFormGroup
      :showReset=" showStorageSizeReset"
      @reset="$emit('resetStorageSize')"
    >
      <template #title>儲存空間</template>
      <SliderStorageSize v-model="storage" />
    </LayoutFormGroup>

    <LayoutFormGroup
      :showReset="showLinesReset"
      @reset="$emit('resetLines')"
    >
      <template #title>產品線</template>
      <CheckboxGroupIphoneLine v-model="lines" />
    </LayoutFormGroup>

    <LayoutFormGroup
      :showReset="showYearRangeReset"
      @reset="$emit('resetYearRange')"
    >
      <template #title>發售年份</template>
      <RangeSlider
        v-model="yearRange"
        :max="defaultFilter.yearRange[1]"
        :min="defaultFilter.yearRange[0]"
      />
    </LayoutFormGroup>
  </LayoutFormSectionGroup>
</template>
