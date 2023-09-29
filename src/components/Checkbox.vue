<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import Label from './Label.vue'

const props = defineProps<{
  modelValue: unknown[] | boolean
  value?: unknown
  disabled?: boolean
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: unknown]
}>()

const vModel = useVModel(props, 'modelValue', emit)

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue?.includes(props.value)
  }
  return Boolean(props.modelValue)
})
</script>

<template>
  <div class="form-control">
    <Label :active="isChecked" :disabled="disabled" :label="label">
      <input
        v-model="vModel"
        class="checkbox checkbox-sm"
        :class="{ 'checkbox-primary': isChecked }"
        :disabled="disabled"
        type="checkbox"
        :value="value"
      >
    </Label>
  </div>
</template>
