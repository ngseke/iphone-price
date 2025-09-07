<script setup lang="ts">
withDefaults(defineProps<{
  char?: string
  index?: number
}>(), {
  char: '',
  index: 0,
})

const classNames = [
  '',
  'text-accent',
  'text-secondary',
  'text-primary',
]

const units = classNames.length + 1
</script>

<template>
  <span
    class="relative inline-flex overflow-hidden"
    :style="{
      '--char': `'${char}'`,
    }"
  >
    <span class="opacity-0 after:content-[var(--char)]" />
    <span
      class="scroll absolute left-0 top-0 flex flex-col"
      :style="{
        animationDuration: '7s',
        animationDelay: `${index * 70}ms`,
        animationIterationCount: 'infinite',
      }"
    >
      <span
        v-for="(className, index) in classNames"
        :key="index"
        class="select-none after:content-[var(--char)]"
        :class="className"
      />
      <span>{{ char }}</span>
    </span>
  </span>
</template>

<style scoped lang="scss">
@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  15%, 100% {
    transform: translateY(calc(-100% + (100% / v-bind(units))));
  }
}

.scroll {
  animation-name: scroll;
}
</style>
