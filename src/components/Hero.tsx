'use client'

function TextVerticalScrolling({
  char,
  index,
}: {
  char: string
  index: number
}) {
  return (
    <span
      aria-hidden
      className="inline-block animate-[fade-in-up_500ms_ease-out_forwards] align-middle opacity-0 will-change-transform"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {char}
    </span>
  )
}

export function Hero({
  onClickViewChart,
  onClickViewTable,
}: {
  onClickViewChart?: () => void
  onClickViewTable?: () => void
}) {
  return (
    <div className="relative grid w-full place-items-center bg-[#020202] bg-[linear-gradient(rgba(16,16,16,1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,16,16,1)_1px,transparent_1px)] bg-[length:1rem_1rem] py-8 sm:min-h-screen  sm:py-0">
      <div className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-1 p-4 pt-28">
        <div className="flex-1 space-y-8">
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={onClickViewChart}
              className="rounded-full border border-primary bg-primary/10 px-4 py-1 text-sm font-medium duration-300 hover:brightness-125"
            >
              更新 iPhone 17 價格
            </button>

            <h1 className="items-center text-3xl font-extrabold sm:text-6xl sm:leading-tight">
              台灣 iPhone 價格
              <br />
              {'歷史趨勢'.split('').map((c, i) => (
                <TextVerticalScrolling key={i} char={c} index={i} />
              ))}
              <span className="relative mb-1 ml-2 inline-block rounded-full align-middle leading-[0] after:absolute after:inset-0 after:scale-y-75 after:bg-primary/50 after:blur-xl sm:mb-3 sm:ml-3" />
            </h1>
          </div>

          <p className="text-base-content/70 text-center">
            透過圖表比較歷代 <b>iPhone</b> 的價格變化
          </p>
        </div>

        <div className="mt-8 flex w-full justify-center gap-4">
          <button
            type="button"
            onClick={onClickViewChart}
            className="btn btn-primary"
          >
            <span className="ml-2">查看圖表</span>
          </button>
          <button
            type="button"
            onClick={onClickViewTable}
            className="btn btn-outline"
          >
            <span className="ml-2">查看表格</span>
          </button>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={onClickViewChart}
            className="hidden p-6 text-4xl duration-300 hover:brightness-125 sm:block"
            aria-label="Scroll to chart"
          >
            <div className="animate-bounce opacity-90" />
          </button>
        </div>
      </div>
    </div>
  )
}
