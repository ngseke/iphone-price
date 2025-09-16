import { useMemo, useState } from 'react'
import { iphoneList } from '../../databases/iphone'
import {
  generateIphoneDataset,
  type GenerateDatasetOptions,
} from '../../modules/iphoneDataset'

export function useIphoneDataset({
  options,
}: {
  options: GenerateDatasetOptions
}) {
  const iphoneDataset = useMemo(
    () => generateIphoneDataset(iphoneList, options),
    [options],
  )

  const [selectedDatasetName, setSelectedDatasetName] = useState<string | null>(
    null,
  )
  const selectedDataset = useMemo(
    () => iphoneDataset.find((dataset) => dataset.name === selectedDatasetName),
    [iphoneDataset, selectedDatasetName],
  )

  const iphoneDatasetNames = useMemo(
    () => iphoneDataset.map((dataset) => dataset.name),
    [iphoneDataset],
  )

  return {
    iphoneDataset,
    iphoneDatasetNames,
    selectedDatasetName,
    setSelectedDatasetName,
    selectedDataset,
  }
}
