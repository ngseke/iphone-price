<script setup lang="ts">
</script>

<template>
  <div class="mt-6 flex items-center gap-2">
    <h2 class="text-3xl font-bold">
      <slot />
    </h2>
    <div v-if="$slots.titleActions">
      <slot name="titleActions" />
    </div>
  </div>
</template>
