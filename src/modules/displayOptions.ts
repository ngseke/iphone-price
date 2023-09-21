export interface DisplayOptions {
  isModelNameAbbreviation: boolean
  isPriceAbbreviation: boolean
  isTaiwanMinimumWageListShown: boolean
}

export const defaultDisplayOptions: Readonly<DisplayOptions> = {
  isModelNameAbbreviation: false,
  isPriceAbbreviation: false,
  isTaiwanMinimumWageListShown: false,
}
