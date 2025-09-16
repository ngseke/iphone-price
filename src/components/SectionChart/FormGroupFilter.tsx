import { FormGroup } from './FormGroup'
import { SliderStorageSize } from './SliderStorageSize'
import { defaultFilter, Filter } from '../../modules/filter'
import { Control, Controller } from 'react-hook-form'
import { FormSectionGroup } from './FormSectionGroup'
import { CheckboxGroupIphoneLine } from './CheckboxGroupIphoneLine'
import { RangeSlider } from '../RangeSlider'

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
  return (
    <FormSectionGroup showReset={showReset} onReset={onReset} title="篩選條件">
      <FormGroup
        showReset={showStorageSizeReset}
        onReset={onResetStorageSize}
        title="儲存空間"
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
        title="產品線"
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
        title="發售年份"
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
