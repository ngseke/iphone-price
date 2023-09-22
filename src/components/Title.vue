<script setup lang="ts">
</script>

<template>
  <div
    class="
      sticky top-0 z-20 flex items-center gap-2 bg-base-100 pt-4
      after:absolute after:-bottom-4 after:h-4 after:w-full after:bg-gradient-to-b after:from-base-100 after:to-transparent  after:content-['']
    "
  >
    <h2 class="text-3xl font-bold">
      <slot />
    </h2>
    <div v-if="$slots.titleActions">
      <slot name="titleActions" />
    </div>
  </div>
</template>
