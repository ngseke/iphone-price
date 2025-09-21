import { FormGroup } from './FormGroup'
import { SliderStorageSize } from './SliderStorageSize'
import { defaultFilter, Filter } from '../../modules/filter'
import { Control, Controller } from 'react-hook-form'
import { FormSectionGroup } from './FormSectionGroup'
import { CheckboxGroupIphoneLine } from './CheckboxGroupIphoneLine'
import { RangeSlider } from '../RangeSlider'
import { useTranslations } from 'next-intl'

export function FormGroupFilter({
  control,
  showReset,
  showStorageSizeReset,
  showLinesReset,
  showYearRangeReset,

  onReset,
  onResetStorageSize,
  onResetLines,
  onResetYearRange,
}: {
  control: Control<Filter>
  showReset: boolean
  showStorageSizeReset: boolean
  showLinesReset: boolean
  showYearRangeReset: boolean

  onReset?: () => void
  onResetStorageSize?: () => void
  onResetLines?: () => void
  onResetYearRange?: () => void
}) {
  const t = useTranslations('Chart')
  return (
    <FormSectionGroup
      showReset={showReset}
      onReset={onReset}
      title={t('section.filter')}
    >
      <FormGroup
        showReset={showStorageSizeReset}
        onReset={onResetStorageSize}
        title={t('filter.storage.label')}
      >
        <Controller
          control={control}
          name="storage"
          render={({ field }) => (
            <SliderStorageSize value={field.value} onChange={field.onChange} />
          )}
        />
      </FormGroup>

      <FormGroup
        showReset={showLinesReset}
        onReset={onResetLines}
        title={t('filter.line.label')}
      >
        <Controller
          control={control}
          name="lines"
          render={({ field }) => (
            <CheckboxGroupIphoneLine
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormGroup>

      <FormGroup
        showReset={showYearRangeReset}
        onReset={onResetYearRange}
        title={t('filter.year.label')}
      >
        <Controller
          control={control}
          name="yearRange"
          render={({ field }) => (
            <RangeSlider
              value={field.value}
              onChange={field.onChange}
              min={defaultFilter.yearRange[0]}
              max={defaultFilter.yearRange[1]}
            />
          )}
        />
      </FormGroup>
    </FormSectionGroup>
  )
}
