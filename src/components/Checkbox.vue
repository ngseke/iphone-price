<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import Label from './Label.vue'

const props = defineProps<{
  modelValue: unknown[] | boolean
  value?: unknown
  disabled?: boolean
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
    <Label :disabled="disabled">
      <input
        v-model="vModel"
        class="checkbox checkbox-sm"
        :class="{ 'checkbox-primary': isChecked }"
        :disabled="disabled"
        type="checkbox"
        :value="value"
      >
      <span
        class="label-text"
        :class="{
          'text-primary': isChecked,
          'opacity-50': disabled,
        }"
      >
        <slot />
      </span>
    </Label>
  </div>
</template>
