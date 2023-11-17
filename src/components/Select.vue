<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

type Value = string | number | boolean

const props = defineProps<{
  modelValue: unknown
  items: Array<Value | { title: string, value: Value }>
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: unknown]
}>()

const vModel = useVModel(props, 'modelValue', emit)

const options = computed(() => (
  props.items.map((value) => {
    if (
      typeof value === 'number' ||
      typeof value === 'string' ||
      typeof value === 'boolean'
    ) return { title: String(value), value }
    return value
  })
))
</script>

<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text font-bold">
        {{ label }}
      </span>
    </label>
    <select v-model="vModel" class="select select-bordered">
      <option
        v-for="{ title, value } in options"
        :key="String(value)"
        :value="value"
      >
        {{ title }}
      </option>
    </select>
  </div>
</template>
