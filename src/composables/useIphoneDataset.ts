import { type MaybeRef, computed, unref, ref } from 'vue'
import { iphoneList } from '../databases/iphone'
import { generateIphoneDataset, type GenerateDatasetOptions } from '../modules/iphoneDataset'

export default function useIphoneDataset ({ options }: {
  options: MaybeRef<GenerateDatasetOptions>
}) {
  const iphoneDataset = computed(() => (
    generateIphoneDataset(iphoneList, unref(options))
  ))

  const selectedDatasetName = ref<string | null>(null)
  const selectedDataset = computed(() => (
    iphoneDataset.value
      .find(dataset => dataset.name === selectedDatasetName.value)
  ))

  const iphoneDatasetNames = computed(() => (
    iphoneDataset.value.map(dataset => dataset.name)
  ))

  return {
    iphoneDataset,
    iphoneDatasetNames,
    selectedDatasetName,
    selectedDataset,
  }
}
