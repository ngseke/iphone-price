<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import TheHero from './components/TheHero.vue'
import TheFooter from './components/TheFooter.vue'
import IconButtonDarkMode from './components/IconButtonDarkMode.vue'
import DataSource from './components/DataSource.vue'

const SectionChart = defineAsyncComponent(async () =>
  await import('./components/SectionChart.vue')
)

const SectionTable = defineAsyncComponent(async () =>
  await import('./components/SectionTable.vue')
)

const chartRef = ref<InstanceType<typeof SectionChart> | null>(null)
const tableRef = ref<InstanceType<typeof SectionTable> | null>(null)
function scrollToChart () {
  chartRef.value?.$el?.scrollIntoView({ behavior: 'smooth' })
}
function scrollToTable () {
  tableRef.value?.$el?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <TheHero @clickViewChart="scrollToChart" @clickViewTable="scrollToTable" />

  <main class="container min-h-screen space-y-20 px-4 py-6">
    <SectionChart ref="chartRef" />
    <SectionTable ref="tableRef" />

    <div class="mx-auto max-w-2xl space-y-4">
      <DataSource />
    </div>
  </main>

  <TheFooter />

  <div class="fixed bottom-4 right-4 z-[100]">
    <IconButtonDarkMode />
  </div>
</template>
