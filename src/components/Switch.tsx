import { Label } from './Label'
import { cn } from '../modules/cn'

export function Switch({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked?: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
}) {
  return (
    <Label active={checked} disabled={disabled} label={label}>
      <input
        type="checkbox"
        className={cn(
          'h-5 w-8 shrink-0 cursor-pointer appearance-none rounded-[1.9rem] border border-current bg-current text-base-content/50 duration-200',
          '[box-shadow:var(--calculated-offset)_0_0_2px_var(--tglbg)_inset,0_0_0_2px_var(--tglbg)_inset,var(--handle-border)]',
          '[--calculated-offset:calc(var(--offset)*-1)] [--offset:0.75rem] [--tglbg:theme(colors.base-100)]',
          '[--handle-border:0_0] checked:text-primary checked:[--calculated-offset:var(--offset)]',
          'disabled:cursor-not-allowed disabled:border-base-content disabled:bg-transparent disabled:opacity-30 disabled:[--handle-border:0_0_0_3px_theme(colors.base-content)_inset,_var(--calculated-offset)_0_0_3px_theme(colors.base-content)_inset]',
        )}
        disabled={disabled}
        checked={checked}
        onChange={(event) => {
          onChange(event.target.checked)
        }}
      />
    </Label>
  )
}
