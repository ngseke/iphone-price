<script setup lang="ts">
import IconButtonReset from './IconButtonReset.vue'

withDefaults(defineProps<{
  showReset?: boolean
}>(), {
  showReset: false,
})

defineEmits<{
  reset: []
}>()
</script>

<template>
  <div class="flex flex-col space-y-2">
    <div class="flex items-center gap-2">
      <h3 v-if="$slots.title" class="text-xl font-medium">
        <slot name="title" />
      </h3>
      <IconButtonReset v-if="showReset" @click="$emit('reset')" />
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>
