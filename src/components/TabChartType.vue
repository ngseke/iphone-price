<script setup lang="ts">
import { computed } from 'vue'
import { chartTypeOptions, type ChartTypeOptionValue } from '../modules/chartType'

const props = withDefaults(defineProps<{
  modelValue: ChartTypeOptionValue
}>(), {
  modelValue: 'generation',
})

defineEmits<{
  'update:modelValue': [value: ChartTypeOptionValue]
}>()

const tabs = (['generation', 'priceAdjustment'] as ChartTypeOptionValue[])
  .map(value => ({
    ...chartTypeOptions[value],
    value,
  }))

const description = computed(() => (
  chartTypeOptions[props.modelValue].description
))
</script>

<template>
  <div class="flex flex-col items-start gap-y-3">
    <div class="tabs-boxed tabs font-semibold">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab"
        :class="{ 'tab-active': tab.value === modelValue }"
        type="button"
        @click="$emit('update:modelValue', tab.value)"
      >
        {{ tab.name }}
      </button>
    </div>
    <p class="text-sm opacity-80">
      {{ description }}
    </p>
  </div>
</template>
