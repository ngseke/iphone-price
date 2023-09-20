<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import Label from './Label.vue'

const props = defineProps<{
  modelValue: unknown
  value?: unknown
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
    <Label>
      <input
        v-model="vModel"
        class="toggle toggle-sm"
        :class="{ 'toggle-primary': isChecked }"
        type="checkbox"
        :value="value"
      >
      <span
        class="label-text"
        :class="{ 'text-primary': isChecked }"
      >
        <slot />
      </span>
    </Label>
  </div>
</template>
