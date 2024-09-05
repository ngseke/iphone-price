<script setup lang="ts">
import { faArrowTrendDown, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import { type Nullish } from '../types/Nullish'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, ref } from 'vue'
import { formatPrice } from '../modules/price'
import { formatDateChinese } from '../modules/date'
import { useDark } from '../composables/useDark'

const props = defineProps<{
  value: Nullish<number>
  original: Nullish<number>
  releasedAt: Nullish<string>
}>()

const isDark = useDark()
const isDecreased = computed(() => (props.value ?? 0) < (props.original ?? 0))
const color = computed(() => {
  if (isDecreased.value) {
    return isDark.value ? 'text-lime-600' : 'text-lime-700'
  }

  return isDark.value ? 'text-rose-600' : 'text-rose-700'
})

const isHovered = ref(false)
const tooltip = computed(() => {
  return `${formatDateChinese(props.releasedAt)}${isDecreased.value ? '降價' : '漲價'}`
})
</script>

<template>
  <span
    v-if="value"
    class="tooltip  tooltip-bottom inline-flex items-center gap-2"
    :class="[color, { 'tooltip-open': isHovered }]"
    :data-tip="tooltip"
    @mouseout="isHovered = false"
    @mouseover="isHovered = true"
  >
    <FontAwesomeIcon
      v-if="original"
      class="text-sm"
      :icon="isDecreased ? faArrowTrendDown : faArrowTrendUp"
    />
    <span class="font-rubik text-sm font-bold">
      {{ formatPrice(value) }}
    </span>
    <!-- <div class="badge badge-sm gap-2" :class="isDecreased ? 'badge-success' : 'badge-error'">
      {{ badge }}
    </div> -->
  </span>
</template>
