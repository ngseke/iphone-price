import { type StorageSize } from '../types/StorageSize'

export function formatStorageSize(storageSize: StorageSize) {
  if (storageSize < 1024) return `${String(storageSize)}GB`
  return `${String(storageSize / 1024)}TB`
}
