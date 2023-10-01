export interface DisplayOptions {
  isModelNameAbbreviation: boolean
  isPriceAbbreviation: boolean
  isPriceHidden: boolean
  isTooltipHidden: boolean
  isTaiwanMinimumWageListShown: boolean
}

export const defaultDisplayOptions: Readonly<DisplayOptions> = {
  isModelNameAbbreviation: false,
  isPriceAbbreviation: false,
  isPriceHidden: false,
  isTooltipHidden: false,
  isTaiwanMinimumWageListShown: false,
}
