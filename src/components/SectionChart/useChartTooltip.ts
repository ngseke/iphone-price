import {
  type TooltipComponentFormatterCallbackParams,
  type TooltipComponentOption,
} from 'echarts'
import { formatPrice } from '../../modules/price'
import { formatDateChinese } from '../../modules/date'

function extractData(param: TooltipComponentFormatterCallbackParams) {
  if (
    Array.isArray(param) ||
    typeof param.value !== 'object' ||
    param.value instanceof Date ||
    (param.value && 'selected' in param.value)
  )
    throw new TypeError()

  const x = param.encode?.x[0] ?? 0
  const dimensionNameX = param.dimensionNames?.[x] as 'value'
  const date = Array.isArray(param.value)
    ? param.value[x]
    : param.value?.[dimensionNameX]

  const y = param.encode?.y[0] ?? 0
  const dimensionNameY = param.dimensionNames?.[y] as 'value'
  const value = Array.isArray(param.value)
    ? param.value[y]
    : param.value?.[dimensionNameY]

  return {
    date: Number(date),
    value: Number(value),
  }
}

export function useChartTooltip() {
  const tooltip: TooltipComponentOption = {
    trigger: 'axis',
    className:
      '!p-2 !font-sans !text-base-content !bg-base-200 !border-none !shadow-xl !rounded-lg',
    formatter(params) {
      if (!Array.isArray(params)) return ''

      const { date } = extractData(params[0])
      const formattedDate = formatDateChinese(date)

      return `
        <div class="flex flex-col gap-2">
          <div class="font-bold">
            ${formattedDate}
          </div>
          <ul class="flex flex-col gap-2 text-xs">
            ${params
              .map((param) => {
                const { name } = param
                const markerElement = param.marker as string

                const { value } = extractData(param)
                const formattedPrice = formatPrice(value)

                return `
                <li class="flex justify-between gap-2">
                  <span>
                    ${markerElement} ${name}
                  </span>
                  <span class="font-bold">
                    ${String(formattedPrice)}
                  </span>
                </li>
              `
              })
              .join('')}
          </ul>
        </div>
      `
    },
  }

  return { tooltip }
}
