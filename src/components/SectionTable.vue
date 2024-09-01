<script setup lang="ts">
import groupBy from 'lodash-es/groupBy'
import { iphoneList } from '../databases/iphone'
import dayjs from 'dayjs'
import { formatDateChinese } from '../modules/date'
import { computed, ref } from 'vue'
import { uniq } from 'lodash-es'
import { type Iphone, type IphoneModel } from '../types/Iphone'
import { type StorageSize } from '../types/StorageSize'
import { formatPrice } from '../modules/price'
import { formatStorageSize } from '../modules/storageSize'
import { formatIphoneModel } from '../modules/iphoneModel'

const groups = groupBy(
  iphoneList.filter(iphone => iphone.isInitialRelease),
  'releasedAt'
)

const releaseDates = Object.keys(groups)
  .sort((a, b) => +dayjs(b) - +dayjs(a))

const selectedDate = ref(releaseDates[0])
const selectedGroup = computed(() => groups[selectedDate.value])

const columns = computed(() => (
  uniq(selectedGroup.value.map(iphone => iphone.storage))
    .sort((a, b) => a - b)
))

const rows = computed(() => {
  const map: Partial<Record<IphoneModel, Partial<Record<StorageSize, Iphone>>>> = {}
  selectedGroup.value?.forEach(iphone => {
    map[iphone.model] ??= {}
    ;(map[iphone.model] as Record<StorageSize, Iphone>)[iphone.storage] = iphone
  })
  return Object.values(map)
})
</script>

<template>
  <section class="mx-auto flex max-w-5xl flex-col gap-y-8">
    <h2 class="text-3xl font-bold">
      歷年發售機型
    </h2>

    <div class="flex flex-wrap gap-4">
      <div class="relative w-full lg:w-1/5">
        <div class="sticky top-4 flex flex-col gap-y-4">
          <h3 class="text-xl font-medium">
            發售年月
          </h3>
          <ul class="menu rounded-box bg-base-200">
            <li v-for="date in releaseDates" :key="date">
              <button
                :class="{ active: selectedDate === date }"
                type="button"
                @click="selectedDate = date"
              >
                {{ formatDateChinese(date) }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="min-w-full sm:mx-0 sm:flex-1 lg:min-w-0">
        <div class="flex w-full flex-col items-start space-y-8 overflow-x-auto lg:sticky lg:top-8 lg:px-8">
          <div class="w-full min-w-[36rem]">
            <div class="overflow-x-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th>型號</th>
                    <th v-for="column in columns" :key="column">
                      {{ formatStorageSize(column) }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, key) in rows" :key="key" class="hover">
                    <td>{{ formatIphoneModel(Object.values(row)[0]?.model) }}</td>
                    <td v-for="column in columns" :key="column">
                      <span class="font-rubik text-lg font-bold">
                        {{ formatPrice(row[column]?.price.twd) }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
