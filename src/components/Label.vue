<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()
</script>

<template>
  <label
    class="label cursor-pointer justify-start space-x-3 font-bold"
    :class="{
      'cursor-pointer': !disabled,
      'cursor-not-allowed': disabled,
    }"
  >
    <slot />
  </label>
</template>
