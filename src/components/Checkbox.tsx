import { Label } from './Label'
import { cn } from '../modules/cn'

export function Checkbox({
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
          'size-5 shrink-0 appearance-none rounded-full border border-base-content/20',
          'checked:border-primary checked:bg-primary',
          'checked:bg-[linear-gradient(-45deg,transparent_65%,theme(colors.primary)_65.99%),linear-gradient(45deg,transparent_75%,theme(colors.primary)_75.99%),linear-gradient(-45deg,theme(colors.primary)_40%,transparent_40.99%),linear-gradient(45deg,theme(colors.primary)_30%,theme(colors.primary-content)_30.99%,theme(colors.primary-content)_40%,transparent_40.99%),linear-gradient(-45deg,theme(colors.primary-content)_50%,theme(colors.primary)_50.99%)]',
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
