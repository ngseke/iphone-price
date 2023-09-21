<script setup lang="ts">
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { latestReleasedAt } from '../databases/iphone'
import StatGroupLatestPrice from './StatGroupLatestPrice.vue'

const lastUpdatedAtYear = dayjs(latestReleasedAt, 'YYYY-MM').year()
</script>

<template>
  <div class="hero bg-base-200 py-8 sm:min-h-screen sm:py-0">
    <div class="hero-content w-full">
      <div class="w-full max-w-2xl flex-1 space-y-8">
        <div class="space-y-2">
          <span class="badge badge-accent font-bold sm:badge-lg">
            {{ lastUpdatedAtYear }} 年
          </span>
          <h1 class="text-3xl font-extrabold sm:text-5xl sm:leading-tight">
            台灣 iPhone 價格<br>歷史趨勢
            <FontAwesomeIcon
              class="text-2xl text-primary sm:text-4xl"
              :icon="['fas', 'arrow-trend-up']"
            />
          </h1>
        </div>
        <StatGroupLatestPrice />
      </div>
      <div class="hidden flex-none lg:block">
        <div class="relative -translate-y-12 select-none text-[7rem] before:absolute before:left-0 before:top-0 before:translate-x-4 before:translate-y-8 before:text-[10rem] before:content-['📱'] after:content-['📈'] " />
      </div>
    </div>
  </div>
</template>
