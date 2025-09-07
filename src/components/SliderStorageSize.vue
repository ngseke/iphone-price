<script setup lang="ts">
import { type StorageSize } from '../types/StorageSize'
import { formatStorageSize } from '../modules/storageSize'

defineProps<{
  modelValue: StorageSize
}>()

const emit = defineEmits<{
  'update:modelValue': [value: StorageSize]
}>()

const options: StorageSize[] = [16, 32, 64, 128, 256, 512, 1024]

function handleInput (index: number) {
  emit('update:modelValue', options[index])
}
</script>

<template>
  <div class="relative space-y-2 px-1 py-2">
    <div class="relative flex h-6 w-full items-center">
      <input
        class="range range-primary"
        :max="options.length - 1"
        min="0"
        type="range"
        :value="options.indexOf(modelValue)"
        @input="handleInput(+($event.target as HTMLInputElement)?.value)"
      >
      <div class="pointer-events-none relative flex h-2 w-full items-center justify-between overflow-hidden rounded-box bg-base-content/10">
        <span
          v-for="(_, index) in options"
          :key="index"
          class="flex w-6 justify-center"
        >
          <span class="block h-0.5 w-0.5 rounded-full bg-base-content/30" />
        </span>
      </div>
    </div>

    <div class="flex w-full select-none justify-between">
      <button
        v-for="(option, index) in options"
        :key="option"
        class="flex w-6 justify-center text-xs font-bold"
        type="button"
        @click="handleInput(index)"
      >
        <Transition
          enterActiveClass="transition duration-100"
          enterFromClass="scale-90"
          mode="out-in"
        >
          <span
            :class="index === options.indexOf(modelValue) ? 'text-primary' : 'text-base-content/80'"
          >
            {{ formatStorageSize(option) }}
          </span>
        </Transition>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
input.range {
  @apply absolute left-0 w-full h-full;

  &::-webkit-slider-runnable-track {
    @apply bg-transparent;
  }
  &::-moz-range-track {
    @apply bg-transparent;
  }

  &::-webkit-slider-thumb {
    @apply pointer-events-auto;
    @apply z-10;
    @apply bg-primary;
    box-shadow:
      0 0 0 3px hsl(var(--range-shdw)) inset,
      var(--focus-shadow, 0 0);
  }

  &::-moz-range-thumb {
    @apply pointer-events-auto;
    @apply bg-primary;
    box-shadow:
      0 0 0 3px hsl(var(--range-shdw)) inset,
      var(--focus-shadow, 0 0);
  }
}
</style>
