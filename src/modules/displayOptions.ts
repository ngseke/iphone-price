import z from 'zod'

export const displayOptionsSchema = z.object({
  isModelNameAbbreviation: z.boolean(),
  isPriceAbbreviation: z.boolean(),
  isPriceHidden: z.boolean(),
  isTooltipHidden: z.boolean(),
  isTaiwanMinimumWageListShown: z.boolean(),
})

export type DisplayOptions = z.infer<typeof displayOptionsSchema>

export const defaultDisplayOptions: Readonly<DisplayOptions> = {
  isModelNameAbbreviation: false,
  isPriceAbbreviation: false,
  isPriceHidden: false,
  isTooltipHidden: false,
  isTaiwanMinimumWageListShown: false,
}
