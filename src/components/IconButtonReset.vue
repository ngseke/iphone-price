<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

withDefaults(defineProps<{
  size?: 'xs' | 'sm'
}>(), {
  size: 'xs',
})

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="btn btn-circle btn-ghost"
    :class="{
      'btn-xs': size === 'xs',
      'btn-sm': size === 'sm',
    }"
    title="重置"
    type="button"
    @click="$emit('click')"
  >
    <FontAwesomeIcon :icon="['fas', 'rotate-left']" />
  </button>
</template>
