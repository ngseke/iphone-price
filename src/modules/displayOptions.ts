export interface DisplayOptions {
  isModelNameAbbreviation: boolean
  isPriceAbbreviation: boolean
  isShowTaiwanMinimumWageList: boolean
}

export const defaultDisplayOptions: Readonly<DisplayOptions> = {
  isModelNameAbbreviation: false,
  isPriceAbbreviation: false,
  isShowTaiwanMinimumWageList: false,
}
