export function formatPrice (price: number) {
  const { format } = new Intl.NumberFormat('en-US')
  return format(price)
}

export function formatPriceAbbreviation (price: number) {
  return `${price / 1000}K`
}
