import { IconRestore } from '@tabler/icons-react'
import { Button } from '../Button'

export function CardNoResult({ onReset }: { onReset?: () => void }) {
  return (
    <div className="flex size-full items-center justify-center ">
      <div className="flex w-96 max-w-full flex-col gap-2 rounded-xl bg-base-200 p-8 shadow-xl">
        <div className="text-xl font-semibold">沒有符合的產品</div>
        <p>請嘗試調整篩選條件</p>
        <div className="flex justify-end">
          <Button onClick={onReset}>
            <IconRestore />
            重置篩選條件
          </Button>
        </div>
      </div>
    </div>
  )
}
