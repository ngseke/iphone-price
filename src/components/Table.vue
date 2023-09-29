<script setup lang="ts">
import { computed } from 'vue'
import { type IphoneDatasetSource } from '../modules/iphoneDataset'
import { formatDateChinese } from '../modules/date'
import { formatPrice } from '../modules/price'
import TextPriceDifference from './TextPriceDifference.vue'
import { formatIphoneModelAbbreviation } from '../modules/iphoneModel'

const props = defineProps<{
  source?: IphoneDatasetSource[]
}>()

interface Column {
  field: keyof IphoneDatasetSource | 'difference'
  headerName?: string
  align?: 'left' | 'right'
}

const sourceWithDifference = computed(() => {
  return props.source
    ?.map((item, index, list) => {
      const previousItem = list[index - 1]
      const difference = previousItem
        ? item.value - previousItem.value
        : null
      const differencePercent = (previousItem && difference)
        ? difference / previousItem.value
        : null
      return { ...item, difference, differencePercent }
    })
})

const columns: Column[] = [
  { field: 'model', headerName: '型號' },
  { field: 'date', headerName: '日期' },
  { field: 'value', headerName: '價格', align: 'right' },
  { field: 'difference' },
]

</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-sm whitespace-nowrap">
      <thead>
        <tr>
          <template v-for="column in columns" :key="column.field">
            <td
              :class="{
                'text-right': column.align === 'right',
                'text-left': column.align === 'left',
              }"
            >
              {{ column.headerName }}
            </td>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row) in sourceWithDifference" :key="row.model">
          <template v-for="column in columns" :key="column.field">
            <td v-if="column.field === 'model'" class="w-0">
              {{ formatIphoneModelAbbreviation(row[column.field]) }}
            </td>
            <td v-else-if="column.field === 'date'" class="w-0">
              {{ formatDateChinese(row[column.field]) }}
            </td>
            <td
              v-else-if="column.field === 'value'"
              class="text-right font-bold"
            >
              {{ formatPrice(row[column.field]) }}
            </td>
            <td
              v-else-if="column.field === 'difference'"
              class="space-x-1 font-bold"
            >
              <TextPriceDifference
                v-if="row[column.field] != null"
                :value="row[column.field]"
              />
              <span
                v-if="row['differencePercent']"
                class="text-xs text-base-content/80"
              >
                (<span v-if="row['differencePercent'] > 0">+</span>{{ (row['differencePercent'] * 100).toFixed(1) }}%)
              </span>
            </td>
            <td v-else>{{ row[column.field] }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
