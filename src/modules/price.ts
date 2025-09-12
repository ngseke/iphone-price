import { type Nullish } from '../types/Nullish'

export function formatPrice(price: Nullish<number>) {
  if (price == null) return null
  return new Intl.NumberFormat('en-US').format(price)
}

export function formatPriceAbbreviation(price: number) {
  const base = 100
  /**
   * price after removing all digits below 100
   */
  const truncatedPrice = Math.trunc(price / base) * base
  return `${String(truncatedPrice / 1000)}K`
}
