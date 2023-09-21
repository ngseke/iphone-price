import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { type DisplayOptions, defaultDisplayOptions } from '../modules/displayOptions'

const storageId = 'iphonePriceDisplayOptions'

export default function useDisplayOptions () {
  const displayOptions = useStorage<DisplayOptions>(
    storageId,
    { ...defaultDisplayOptions },
    localStorage,
    { mergeDefaults: true }
  )

  const isSomeDisplayOptionsChanged = computed(() => {
    const { value } = displayOptions

    return [
      value.isModelNameAbbreviation !== defaultDisplayOptions.isModelNameAbbreviation,
      value.isPriceAbbreviation !== defaultDisplayOptions.isPriceAbbreviation,
      value.isTaiwanMinimumWageListShown !== defaultDisplayOptions.isTaiwanMinimumWageListShown,
    ].some(Boolean)
  })

  function resetDisplayOptions () {
    displayOptions.value = { ...defaultDisplayOptions }
  }

  return {
    displayOptions,
    isSomeDisplayOptionsChanged,
    resetDisplayOptions,
  }
}
