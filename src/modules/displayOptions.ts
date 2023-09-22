export interface DisplayOptions {
  isModelNameAbbreviation: boolean
  isPriceAbbreviation: boolean
  isPriceHidden: boolean
  isTaiwanMinimumWageListShown: boolean
}

export const defaultDisplayOptions: Readonly<DisplayOptions> = {
  isModelNameAbbreviation: false,
  isPriceAbbreviation: false,
  isPriceHidden: false,
  isTaiwanMinimumWageListShown: false,
}
