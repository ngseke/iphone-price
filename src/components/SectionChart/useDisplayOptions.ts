import { defaultDisplayOptions } from '@/src/modules/displayOptions'
import { useForm } from 'react-hook-form'
import { isEqual } from 'lodash-es'

export function useDisplayOptions() {
  const displayOptionsForm = useForm({
    defaultValues: structuredClone(defaultDisplayOptions),
  })

  const { reset, watch } = displayOptionsForm

  const isSomeDisplayOptionsChanged = !isEqual(watch(), defaultDisplayOptions)

  function resetDisplayOptions() {
    reset(structuredClone(defaultDisplayOptions))
  }

  return {
    displayOptionsForm,
    isSomeDisplayOptionsChanged,
    resetDisplayOptions,
  }
}
