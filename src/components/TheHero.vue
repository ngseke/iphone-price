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
        <div class="flex flex-col items-center gap-3">
          <button
            class="rounded-full border border-primary bg-primary/10 px-4 py-1 text-sm font-medium duration-300 hover:brightness-125"
            type="button"
            @click="$emit('clickViewChart')"
          >
            更新 iPhone 17 價格
          </button>

          <h1 class="items-center text-3xl font-extrabold sm:text-6xl sm:leading-tight">
            台灣 iPhone 價格
            <br>
            <TextVerticalScrolling
              v-for="(char, index) in '歷史趨勢'"
              :key="index"
              :char="char"
              :index="index"
            />
            <span class="relative mb-1 ml-2 inline-block rounded-full align-middle leading-[0] after:absolute after:inset-0 after:scale-y-75 after:bg-primary/50 after:blur-xl sm:mb-3 sm:ml-3">
              <FontAwesomeIcon
                class="text-2xl text-primary sm:text-5xl"
                :icon="faArrowTrendUp"
              />
            </span>
          </h1>
        </div>

        <p class="text-center text-base-content/70">
          透過圖表比較歷代 <b>iPhone</b> 的價格變化
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
          class="btn btn-outline"
          type="button"
          @click="$emit('clickViewTable')"
        >
          <FontAwesomeIcon :icon="faTable" />
          查看表格
        </button>
      </div>

      <div class="mt-8">
        <button class="hidden p-6 text-4xl duration-300 hover:brightness-125 sm:block" type="button" @click="$emit('clickViewChart')">
          <FontAwesomeIcon class="animate-bounce opacity-90" :icon="faChevronDown" />
        </button>
      </div>
    </div>
  </div>
</template>
