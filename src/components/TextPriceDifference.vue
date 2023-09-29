<script setup lang="ts">
import { computed } from 'vue'
import { faArrowUp, faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { formatPrice } from '../modules/price'

const props = defineProps<{
  value?: number | null
}>()

const icon = computed(() => {
  if (props.value == null) return
  if (props.value > 0) {
    return {
      className: 'text-red-500',
      icon: faArrowUp,
    }
  }
  if (props.value < 0) {
    return {
      className: 'text-green-500',
      icon: faArrowDown,
    }
  }
  return {
    className: 'text-gray-500',
    icon: faArrowRight,
  }
})

const formattedPrice = formatPrice(Math.abs(props.value ?? 0))
</script>

<template>
  <span :class="icon?.className">
    <FontAwesomeIcon
      v-if="icon?.icon"
      class="mr-1"

      :icon="icon?.icon"
      title="Magic is included!"
    />
    {{ formattedPrice }}
  </span>
</template>
