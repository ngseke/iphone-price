<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type ModelValue = [number, number]

const props = withDefaults(defineProps<{
  modelValue?: ModelValue
  min?: number
  max?: number
  step?: number
}>(), {
  modelValue: () => [0, 100],
  min: 0,
  max: 100,
  step: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: ModelValue]
}>()

const draft = ref<ModelValue>(props.modelValue)
watch(() => props.modelValue, async (modelValue) => {
  const serialize = (list: number[]) => [...list].sort((a, b) => a - b).join()
  if (serialize(modelValue) !== serialize(draft.value)) {
    draft.value = [...modelValue]
  }
})

function getPercent (value: number) {
  const { max, min } = props
  return Math.round(((value - min) / (max - min)) * 100)
}

const highlightStyle = computed(() => {
  let [left, right] = draft.value
  if (left > right) [left, right] = [right, left]

  const leftPercent = getPercent(left)
  const rightPercent = getPercent(right)

  return {
    left: `${leftPercent}%`,
    width: `${rightPercent - leftPercent}%`,
  }
})

function handleInput (event: Event, index: 0 | 1) {
  const target = event.target as HTMLInputElement
  const newDraft: ModelValue = [...draft.value]

  newDraft[index] = target.valueAsNumber
  draft.value = [...newDraft]

  const newSortedDraft = ([...newDraft] as ModelValue).sort((a, b) => a - b)
  emit('update:modelValue', newSortedDraft)
}

function handleChange () {
  draft.value = [...props.modelValue]
}

const ticks = computed(() => {
  const tickCount = Math.min(props.max - props.min / props.step) + 1
  return Array.from({ length: tickCount })
    .map((_, index) => index + props.min)
})
</script>

<template>
  <div class="relative space-y-2 px-1 py-2">
    <div class="relative flex h-6 w-full items-center">
      <input
        class="range range-primary"
        :max="max"
        :min="min"
        :step="step"
        type="range"
        :value="draft[0]"
        @change="handleChange"
        @input="handleInput($event, 0)"
      >
      <input
        class="range range-primary"
        :max="max"
        :min="min"
        :step="step"
        type="range"
        :value="draft[1]"
        @change="handleChange"
        @input="handleInput($event, 1)"
      >
      <div class="relative flex h-2 w-full items-center justify-between overflow-hidden rounded-box bg-base-content/10">
        <div
          class="absolute h-full bg-primary"
          :style="highlightStyle"
        />

        <span
          v-for="tick in ticks"
          :key="tick"
          class="flex w-6 justify-center"
        >
          <span class="block h-0.5 w-0.5 rounded-full bg-base-content/30" />
        </span>
      </div>
    </div>

    <div class="flex w-full select-none justify-between">
      <span
        v-for="(tick, index) in ticks"
        :key="tick"
        class="flex w-6 justify-center text-xs font-bold"
      >
        <Transition
          enterActiveClass="transition duration-100"
          enterFromClass="scale-90"
          mode="out-in"
        >
          <span
            v-if="draft.includes(tick) || !index || index === ticks.length - 1"
            :class="draft.includes(tick) ? 'text-primary' : 'text-base-content/80'"
          >
            {{ tick }}
          </span>
          <span
            v-else
            class="after:inline-block after:h-2 after:w-[2px] after:rounded-full after:bg-base-content/50 after:content-['']"
          />
        </Transition>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
input.range {
  @apply absolute left-0 w-full h-full;
  @apply pointer-events-none;

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
