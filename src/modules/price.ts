export function formatPrice (price: number) {
  const { format } = new Intl.NumberFormat('en-US')
  return format(price)
}

export function formatPriceAbbreviation (price: number) {
  const base = 100
  /**
   * price after removing all digits below 100
   */
  const truncatedPrice = Math.trunc(price / base) * base
  return `${truncatedPrice / 1000}K`
}
