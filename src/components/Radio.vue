<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import Label from './Label.vue'

const props = defineProps<{
  modelValue: unknown
  value: unknown
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: unknown]
}>()

const vModel = useVModel(props, 'modelValue', emit)

const isChecked = computed(() =>
  props.modelValue === props.value ||
  (props.value === undefined && Boolean(props.modelValue))
)
</script>

<template>
  <div class="form-control">
    <Label :active="isChecked" :label="label">
      <input
        v-model="vModel"
        class="radio radio-sm"
        :class="{ 'radio-primary': isChecked }"
        type="radio"
        :value="value"
      >
    </Label>
  </div>
</template>
