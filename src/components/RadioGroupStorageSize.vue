<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import Radio from './Radio.vue'
import { type StorageSize } from '../types/StorageSize'
import { formatStorageSize } from '../modules/storageSize'

const props = defineProps<{
  modelValue: StorageSize
}>()

const emit = defineEmits<{
  'update:modelValue': [value: StorageSize]
}>()

const options: StorageSize[] = [16, 32, 64, 128, 256, 512, 1024]

const vModel = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div class="flex flex-wrap gap-x-3">
    <template v-for="item in options" :key="item">
      <Radio
        v-model="vModel"
        :label="formatStorageSize(item)"
        :value="item"
      />
    </template>
  </div>
</template>
