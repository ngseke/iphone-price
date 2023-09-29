<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import Checkbox from './Checkbox.vue'
import { type IphoneLine } from '../types/Iphone'
import { iphoneLines } from '../modules/iphoneLine'

const props = defineProps<{
  modelValue: IphoneLine[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: IphoneLine[]]
}>()

const options: IphoneLine[] = [
  'premium',
  'regular',
  'entry-level',
]

const vModel = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div class="flex flex-col flex-wrap items-start gap-y-2">
    <div v-for="item in options" :key="item">
      <Checkbox
        v-model="vModel"
        :label="iphoneLines[item].name"
        :value="item"
      />
      <p class="pl-9 text-xs text-base-content/80">
        {{ iphoneLines[item].description }}
      </p>
    </div>
  </div>
</template>
