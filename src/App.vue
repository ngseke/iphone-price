<script setup lang="ts">
import TheHero from './components/TheHero.vue'
import TheFooter from './components/TheFooter.vue'
import IconButtonDarkMode from './components/IconButtonDarkMode.vue'
import DataSource from './components/DataSource.vue'
import ChartAndFilters from './components/ChartAndFilters.vue'
</script>

<template>
  <TheHero />

  <div class="container min-h-screen space-y-16 px-4 py-6">
    <ChartAndFilters />

    <div class="mx-auto max-w-2xl space-y-4">
      <DataSource />
    </div>
  </div>

  <TheFooter />

  <div class="fixed bottom-4 right-4">
    <IconButtonDarkMode />
  </div>
</template>
