<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowTrendUp, faChartLine, faChevronDown, faTable } from '@fortawesome/free-solid-svg-icons'
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
    class="hero relative bg-base-200 bg-[length:1rem_1rem] py-8 sm:min-h-screen sm:py-0"
    :class="className"
  >
    <div class="hero-content w-full max-w-4xl flex-wrap justify-center pt-28">
      <div class="flex-1 space-y-8">
        <div class="flex flex-col items-center space-y-2">
          <h1 class="flex flex-col items-center text-3xl font-extrabold sm:text-6xl sm:leading-tight">
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

        <p class="text-center text-base-content/70">
          透過圖表比較 <b>iPhone 17</b> 與歷代產品的價格變化
        </p>
      </div>

      <div class="mt-8 flex w-full justify-center gap-4">
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

      <div class="mt-8">
        <button class="hidden p-6 text-4xl sm:block" type="button" @click="$emit('clickViewChart')">
          <FontAwesomeIcon class="animate-bounce opacity-90" :icon="faChevronDown" />
        </button>
      </div>
    </div>
  </div>
</template>
