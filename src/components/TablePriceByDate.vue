<script setup lang="ts">
import { formatDateChinese } from '../modules/date'
import { computed } from 'vue'
import { uniq } from 'lodash-es'
import { type Iphone, type IphoneModel } from '../types/Iphone'
import { type StorageSize } from '../types/StorageSize'
import { formatPrice } from '../modules/price'
import { formatStorageSize } from '../modules/storageSize'
import { formatIphoneModel } from '../modules/iphoneModel'
import AdjustedPrice from './AdjustedPrice.vue'
import { type Nullish } from '../types/Nullish'
import { findAdjustedList } from '../databases/iphone'

const props = defineProps<{
  date: Nullish<string>
  list: Nullish <Iphone[]>
}>()

const columns = computed(() => (
  uniq(props.list?.map(iphone => iphone.storage))
    .sort((a, b) => a - b)
))

const rows = computed(() => {
  const map: Partial<Record<IphoneModel, Partial<Record<StorageSize, Iphone>>>> = {}
  props.list?.forEach(iphone => {
    map[iphone.model] ??= {}
    ;(map[iphone.model] as Record<StorageSize, Iphone>)[iphone.storage] = iphone
  })
  return Object.values(map)
})
</script>

<template>
  <div class="flex w-full flex-col items-start gap-4">
    <h3 class="text-xl font-medium">
      {{ formatDateChinese(date) }}
    </h3>
    <div class="w-full min-w-0">
      <div class="overflow-x-auto overflow-y-hidden pb-6">
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
              <td class="font-bold">
                <a
                  class="underline decoration-neutral-500 hover:decoration-neutral-400"
                  :href="Object.values(row)[0].url"
                  target="_blank"
                >
                  {{ formatIphoneModel(Object.values(row)[0]?.model) }}
                </a>
              </td>
              <td v-for="column in columns" :key="column" class="align-top">
                <div class="flex flex-col items-start">
                  <span class="font-rubik text-lg font-bold">
                    {{ formatPrice(row[column]?.price.twd) }}
                  </span>

                  <AdjustedPrice
                    v-for="(iphone, index) in findAdjustedList(column, Object.values(row)[0]?.model)"
                    :key="index"
                    :original="
                      findAdjustedList(column, Object.values(row)[0]?.model)?.[index - 1]?.price.twd ??
                        row[column]?.price.twd
                    "
                    :releasedAt="iphone.releasedAt"
                    :value="iphone?.price.twd"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
