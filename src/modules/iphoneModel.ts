import { type IphoneModel } from '../types/Iphone'

export function formatIphoneModel (model: IphoneModel) {
  let output: string = String(model)
  const rules = [
    ['-', ' '],
    ['iphone', 'iPhone'],
    ['pro', 'Pro'],
    ['max', 'Max'],
    ['plus', 'Plus'],
    [/(\d{1,2}\w{2}) gen/g, '($1 generation)'],
  ] as const

  rules.forEach(([searchValue, replaceValue]) => {
    output = output.replaceAll(searchValue, replaceValue)
  })

  return output
}

export function formatIphoneModelAbbreviation (model: IphoneModel) {
  let output: string = String(model)
  const rules = [
    ['-', ' '],
    ['iphone ', ''],
    ['pro', 'Pro'],
    ['max', 'Max'],
    ['plus', 'Plus'],
    [/(\d{1,2}\w{2}) gen/g, '($1)'],
  ] as const

  rules.forEach(([searchValue, replaceValue]) => {
    output = output.replaceAll(searchValue, replaceValue)
  })

  return output
}
