import dayjs from 'dayjs'
import { earliestReleasedAt, latestReleasedAt } from '../databases/iphone'
import { iphoneLineSchema } from '../types/Iphone'
import { storageSizeSchema } from '../types/StorageSize'
import z from 'zod'

export const filterSchema = z.object({
  storage: storageSizeSchema,
  lines: z.array(iphoneLineSchema),
  yearRange: z.tuple([z.number(), z.number()]),
})

export type Filter = z.infer<typeof filterSchema>

export const defaultFilter: Readonly<Filter> = {
  storage: 256,
  lines: ['entry-level', 'regular', 'premium'],
  yearRange: [
    dayjs(earliestReleasedAt, 'YYYY-MM').year(),
    dayjs(latestReleasedAt, 'YYYY-MM').year(),
  ],
}
