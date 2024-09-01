<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowTrendUp, faChartLine, faTable } from '@fortawesome/free-solid-svg-icons'
import StatGroupLatestPrice from './StatGroupLatestPrice.vue'
import TextVerticalScrolling from './TextVerticalScrolling.vue'
import { computed } from 'vue'
import { useDark } from '../composables/useDark'

defineEmits<{
  'clickViewChart': []
  'clickViewTable': []
}>()

const isDark = useDark()

const className = computed(() => (
  isDark.value
    ? 'bg-[linear-gradient(rgba(16,16,16,1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,16,16,1)_1px,transparent_1px)]'
    : 'bg-[linear-gradient(rgba(230,230,230,1)_1px,transparent_1px),linear-gradient(90deg,rgba(230,230,230,1)_1px,transparent_1px)] '
))
</script>

<template>
  <div
    class="hero bg-base-200 bg-[length:1rem_1rem] py-8 sm:min-h-screen sm:py-0"
    :class="className"
  >
    <div class="hero-content w-full max-w-4xl flex-wrap justify-center">
      <div class="flex-1 space-y-8">
        <div class="flex flex-col items-start space-y-2">
          <h1 class="flex flex-col text-3xl font-extrabold sm:text-5xl sm:leading-tight">
            <span>台灣 iPhone 價格</span>
            <span>
              <TextVerticalScrolling
                v-for="(char, index) in '歷史趨勢'"
                :key="index"
                :char="char"
                :index="index"
              />
              <FontAwesomeIcon
                class="pl-2 text-2xl text-primary sm:text-4xl"
                :icon="faArrowTrendUp"
              />
            </span>
          </h1>
        </div>
        <StatGroupLatestPrice />
      </div>
      <div class="hidden flex-none lg:block">
        <div class="relative -translate-y-12 select-none text-[7rem] before:absolute before:left-0 before:top-0 before:translate-x-4 before:translate-y-8 before:text-[10rem] before:content-['📱'] after:content-['📈'] " />
      </div>

      <div class="mt-4 flex w-full gap-4">
        <button
          class="btn btn-primary"
          type="button"
          @click="$emit('clickViewChart')"
        >
          <FontAwesomeIcon :icon="faChartLine" />
          查看圖表
        </button>
        <button
          class="btn btn-primary"
          type="button"
          @click="$emit('clickViewTable')"
        >
          <FontAwesomeIcon :icon="faTable" />
          查看表格
        </button>
      </div>
    </div>
  </div>
</template>
