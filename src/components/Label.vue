<script setup lang="ts">
defineProps<{
  active?: boolean
  disabled?: boolean
  label?: string
}>()
</script>

<template>
  <label
    class="label relative cursor-pointer justify-start space-x-3 font-bold"
    :class="{
      'cursor-pointer': !disabled,
      'cursor-not-allowed': disabled,
    }"
  >
    <slot />
    <span
      class="label-text transition-colors duration-100"
      :class="{
        'text-primary': active,
        'opacity-50': disabled,
      }"
    >
      {{ label }}
    </span>
  </label>
</template>
