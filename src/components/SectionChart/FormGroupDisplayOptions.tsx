import { Control, UseFormWatch, Controller } from 'react-hook-form'
import { FormGroup } from './FormGroup'
import { FormSectionGroup } from './FormSectionGroup'
import { Switch } from '../Switch'
import { DisplayOptions } from '@/src/modules/displayOptions'
import { useTranslations } from 'next-intl'

export function FormGroupDisplayOptions({
  control,
  watch,
  showReset,
  onReset,
  hideIsTaiwanMinimumWageListShownSwitch,
}: {
  control: Control<DisplayOptions>
  watch: UseFormWatch<DisplayOptions>
  showReset: boolean
  onReset?: () => void
  hideIsTaiwanMinimumWageListShownSwitch?: boolean
}) {
  const t = useTranslations('Chart')

  return (
    <FormSectionGroup
      showReset={showReset}
      onReset={onReset}
      title={t('section.display')}
    >
      <FormGroup title={t('filter.display.chartLabel')}>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {(
            [
              {
                name: 'isModelNameAbbreviation',
                label: t('filter.display.isModelNameAbbreviation'),
                disabled: false,
              },
              {
                name: 'isPriceHidden',
                label: t('filter.display.isPriceHidden'),
                disabled: false,
              },
              {
                name: 'isPriceAbbreviation',
                label: t('filter.display.isPriceAbbreviation'),
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
        </div>
      </FormGroup>

      <FormGroup title={t('filter.display.tooltip')}>
        {(
          [
            {
              name: 'isTooltipHidden',
              label: t('filter.display.isTooltipHidden'),
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

      {!hideIsTaiwanMinimumWageListShownSwitch && (
        <FormGroup title={t('filter.display.otherMetrics')}>
          {(
            [
              {
                name: 'isTaiwanMinimumWageListShown',
                label: t('filter.display.isTaiwanMinimumWageListShown'),
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
      )}
    </FormSectionGroup>
  )
}
