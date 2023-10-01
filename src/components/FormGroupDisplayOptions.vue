<script setup lang="ts">
import LayoutFormGroup from './LayoutFormGroup.vue'
import Switch from './Switch.vue'
import LayoutFormSectionGroup from './LayoutFormSectionGroup.vue'
import { useVModels } from '@vueuse/core'

const props = defineProps<{
  isModelNameAbbreviation: boolean
  isPriceAbbreviation: boolean
  isPriceHidden: boolean

  isTooltipHidden: boolean

  isTaiwanMinimumWageListShown: boolean

  showReset: boolean
}>()

const emit = defineEmits<{
  'update:isModelNameAbbreviation': [value: boolean]
  'update:isPriceAbbreviation': [value: boolean]
  'update:isPriceHidden': [value: boolean]

  'update:isTooltipHidden': [value: boolean]

  'update:isTaiwanMinimumWageListShown': [value: boolean]

  reset: []
}>()

const {
  isModelNameAbbreviation,
  isPriceAbbreviation,
  isPriceHidden,
  isTooltipHidden,
  isTaiwanMinimumWageListShown,
} = useVModels(props, emit)
</script>

<template>
  <LayoutFormSectionGroup
    :showReset="showReset"
    @reset="emit('reset')"
  >
    <template #title>顯示方式</template>
    <LayoutFormGroup>
      <template #title>標籤</template>
      <div class="flex flex-col flex-wrap gap-x-4">
        <Switch
          v-model="isModelNameAbbreviation"
          label="簡化產品名稱"
        />
        <Switch
          v-model="isPriceHidden"
          label="隱藏價格"
        />
        <Switch
          v-model="isPriceAbbreviation"
          :disabled="isPriceHidden"
          label="簡化價格"
        />
      </div>
    </LayoutFormGroup>

    <LayoutFormGroup>
      <template #title>提示框</template>
      <div class="flex flex-col flex-wrap gap-x-4">
        <Switch
          v-model="isTooltipHidden"
          label="隱藏懸浮提示框"
        />
      </div>
    </LayoutFormGroup>

    <LayoutFormGroup>
      <template #title>其他指標</template>
      <div class="flex flex-wrap gap-x-4">
        <Switch
          v-model="isTaiwanMinimumWageListShown"
          label="顯示台灣基本工資（月薪）"
        />
      </div>
    </LayoutFormGroup>
  </LayoutFormSectionGroup>
</template>
