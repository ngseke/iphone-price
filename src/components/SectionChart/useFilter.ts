import { defaultFilter } from '../../modules/filter'
import { useForm } from 'react-hook-form'

export function useFilterForm() {
  const form = useForm({
    defaultValues: structuredClone(defaultFilter),
  })

  const { reset, setValue, watch } = form

  const isFilterStorageSizeChanged = watch('storage') !== defaultFilter.storage

  const isFilterLinesChanged =
    watch('lines').length !== defaultFilter.lines.length

  const isFilterYearRangeChanged =
    watch('yearRange').join() !== defaultFilter.yearRange.join()

  const isSomeFilterChanged = [
    isFilterStorageSizeChanged,
    isFilterLinesChanged,
    isFilterYearRangeChanged,
  ].some(Boolean)

  function resetFilter() {
    reset(structuredClone(defaultFilter))
  }

  function resetFilterStorageSize() {
    setValue('storage', defaultFilter.storage)
  }

  function resetFilterLines() {
    setValue('lines', structuredClone(defaultFilter.lines))
  }

  function resetFilterYearRange() {
    setValue('yearRange', structuredClone(defaultFilter.yearRange))
  }

  return {
    form,

    isFilterStorageSizeChanged,
    isFilterLinesChanged,
    isFilterYearRangeChanged,

    isSomeFilterChanged,

    resetFilter,
    resetFilterStorageSize,
    resetFilterLines,
    resetFilterYearRange,
  }
}
