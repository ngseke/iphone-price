declare module 'csstype' {
  type Properties = Record<`--${string}`, string | number>
}
