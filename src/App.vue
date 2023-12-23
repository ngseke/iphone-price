<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import TheHero from './components/TheHero.vue'
import TheFooter from './components/TheFooter.vue'
import IconButtonDarkMode from './components/IconButtonDarkMode.vue'
import DataSource from './components/DataSource.vue'

const ChartAndFilters = defineAsyncComponent(async () =>
  await import('./components/ChartAndFilters.vue')
)

const mainRaf = ref<HTMLElement | null>(null)
function scrollToMain () {
  mainRaf.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <TheHero @clickViewChart="scrollToMain" />

  <main
    ref="mainRaf"
    class="container min-h-screen space-y-16 px-4 py-6"
  >
    <ChartAndFilters />

    <div class="mx-auto max-w-2xl space-y-4">
      <DataSource />
    </div>
  </main>

  <TheFooter />

  <div class="fixed bottom-4 right-4 z-20">
    <IconButtonDarkMode />
  </div>
</template>
