<script setup lang="ts">
import groupBy from 'lodash-es/groupBy'
import { iphoneList } from '../databases/iphone'
import dayjs from 'dayjs'
import { formatDateChinese } from '../modules/date'
import { computed, ref } from 'vue'
import TablePriceByDate from './TablePriceByDate.vue'

const groups = groupBy(
  iphoneList.filter(iphone => iphone.isInitialRelease),
  'releasedAt'
)

const releaseDates = Object.keys(groups)
  .sort((a, b) => +dayjs(b) - +dayjs(a))

const selectedDate = ref<string | null>(releaseDates[0])
const selectedGroup = computed(() => (
  selectedDate.value ? groups[selectedDate?.value] : null
))

const displayed = computed(() => {
  if (selectedGroup.value) {
    return [{ date: selectedDate.value, list: selectedGroup.value }]
  }

  return releaseDates.map((date) => ({ date, list: groups[date] }))
})
</script>

<template>
  <section class="mx-auto flex max-w-5xl flex-col gap-y-8">
    <h2 id="section-table" class="text-4xl font-bold">
      歷年首發機型
    </h2>

    <div class="flex flex-wrap gap-4">
      <div class="relative w-full lg:w-1/5">
        <div class="sticky top-4 flex flex-col gap-y-4">
          <h3 class="text-xl font-medium">
            發售年月
          </h3>
          <ul class="menu rounded-box bg-base-200">
            <li>
              <button
                :class="{ active: !selectedDate }"
                type="button"
                @click="selectedDate = null"
              >
                顯示全部
              </button>
            </li>
            <li v-for="(date, index) in releaseDates" :key="date">
              <button
                :class="{ active: selectedDate === date }"
                type="button"
                @click="selectedDate = date"
              >
                {{ formatDateChinese(date) }}
                <div v-if="!index" class="badge badge-primary badge-sm font-bold">New</div>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex min-w-full flex-col sm:mx-0 sm:flex-1 lg:min-w-0 lg:px-8">
        <TablePriceByDate
          v-for="({ date, list }, index) in displayed"
          :key="index"
          :date="date"
          :list="list"
        />
        <span class="text-xs opacity-70">單位：新台幣</span>
      </div>
    </div>
  </section>
</template>
