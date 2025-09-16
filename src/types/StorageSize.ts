import z from 'zod'

export const storageSizeSchema = z.literal([
  16, 32, 64, 128, 256, 512, 1024, 2048,
])

export type StorageSize = z.infer<typeof storageSizeSchema>
