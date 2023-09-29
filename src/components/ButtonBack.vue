<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="btn btn-secondary"
    type="button"
    @click="$emit('click')"
  >
    <FontAwesomeIcon :icon="faChevronLeft" />
    返回
  </button>
</template>
