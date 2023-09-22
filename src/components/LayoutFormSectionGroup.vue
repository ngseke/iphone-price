<script setup lang="ts">
import IconButtonReset from './IconButtonReset.vue'
import Title from './Title.vue'

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
  <section class="space-y-4">
    <Title>
      <slot name="title" />
      <template #titleActions>
        <IconButtonReset
          v-if="showReset"
          size="sm"
          @click="$emit('reset')"
        />
      </template>
    </Title>
    <div class="flex flex-col gap-y-4">
      <slot />
    </div>
  </section>
</template>
