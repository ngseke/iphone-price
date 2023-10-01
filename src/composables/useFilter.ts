import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { type Filter, defaultFilter } from '../modules/filter'

const storageId = 'iphonePriceFilter'

export default function useFilter () {
  const filter = useStorage<Filter>(
    storageId,
    { ...defaultFilter },
    localStorage,
    { mergeDefaults: true }
  )

  const isFilterStorageSizeChanged = computed(() => (
    filter.value.storage !== defaultFilter.storage
  ))

  const isFilterLinesChanged = computed(() => (
    filter.value.lines.length !== defaultFilter.lines.length
  ))

  const isFilterIsPriceAdjustedChanged = computed(() => (
    filter.value.isPriceAdjusted !== defaultFilter.isPriceAdjusted
  ))

  const isFilterYearRangeChanged = computed(() => (
    filter.value.yearRange.join() !== defaultFilter.yearRange.join()
  ))

  const isSomeFilterChanged = computed(() => [
    isFilterStorageSizeChanged.value,
    isFilterLinesChanged.value,
    isFilterIsPriceAdjustedChanged.value,
    isFilterYearRangeChanged.value,
  ].some(Boolean))

  function resetFilter () {
    filter.value = { ...defaultFilter }
  }

  function resetFilterStorageSize () {
    filter.value.storage = defaultFilter.storage
  }

  function resetFilterLines () {
    filter.value.lines = [...defaultFilter.lines]
  }

  function resetFilterIsPriceAdjusted () {
    filter.value.isPriceAdjusted = defaultFilter.isPriceAdjusted
  }

  function resetFilterYearRange () {
    filter.value.yearRange = [...defaultFilter.yearRange]
  }

  return {
    filter,
    isFilterStorageSizeChanged,
    isFilterLinesChanged,
    isFilterIsPriceAdjustedChanged,
    isFilterYearRangeChanged,
    isSomeFilterChanged,

    resetFilter,
    resetFilterStorageSize,
    resetFilterLines,
    resetFilterIsPriceAdjusted,
    resetFilterYearRange,
  }
}
