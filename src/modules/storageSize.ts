import { type StorageSize } from '../types/StorageSize'

export function formatStorageSize (storageSize: StorageSize) {
  if (storageSize < 1024) return `${storageSize}GB`
  return `${storageSize / 1024}TB`
}
