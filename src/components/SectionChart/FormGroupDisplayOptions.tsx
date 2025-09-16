import { Control, UseFormWatch, Controller } from 'react-hook-form'
import { FormGroup } from './FormGroup'
import { FormSectionGroup } from './FormSectionGroup'
import { Switch } from '../Switch'
import { DisplayOptions } from '@/src/modules/displayOptions'

export function FormGroupDisplayOptions({
  control,
  watch,
  showReset,
  onReset,
}: {
  control: Control<DisplayOptions>
  watch: UseFormWatch<DisplayOptions>
  showReset: boolean
  onReset?: () => void
}) {
  return (
    <FormSectionGroup showReset={showReset} onReset={onReset} title="顯示方式">
      <FormGroup title="標籤">
        {(
          [
            {
              name: 'isModelNameAbbreviation',
              label: '簡化產品名稱',
              disabled: false,
            },
            { name: 'isPriceHidden', label: '隱藏價格', disabled: false },
            {
              name: 'isPriceAbbreviation',
              label: '簡化價格',
              disabled: watch('isPriceHidden'),
            },
          ] as const
        ).map(({ name, label, disabled }) => (
          <Controller
            key={name}
            control={control}
            name={name}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={field.onChange}
                label={label}
                disabled={disabled}
              />
            )}
          />
        ))}
      </FormGroup>

      <FormGroup title="提示框">
        {([{ name: 'isTooltipHidden', label: '隱藏懸浮提示框' }] as const).map(
          ({ name, label }) => (
            <Controller
              key={name}
              control={control}
              name={name}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={field.onChange}
                  label={label}
                />
              )}
            />
          ),
        )}
      </FormGroup>

      <FormGroup title="其他指標">
        {(
          [
            {
              name: 'isTaiwanMinimumWageListShown',
              label: '顯示台灣基本工資（月薪）',
            },
          ] as const
        ).map(({ name, label }) => (
          <Controller
            key={name}
            control={control}
            name={name}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={field.onChange}
                label={label}
              />
            )}
          />
        ))}
      </FormGroup>
    </FormSectionGroup>
  )
}
