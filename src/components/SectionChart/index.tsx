'use client'

import { useChartType } from '@/src/components/SectionChart/useChartType'
import { useFilterForm as useFilter } from './useFilter'
import { useIphoneDataset } from './useIphoneDataset'
import { ComponentProps, forwardRef } from 'react'
import { chartTypeOptions } from '@/src/modules/chartType'
import { cn } from '@/src/modules/cn'
import { FormSectionGroup } from './FormSectionGroup'
import TabsChartType from './TabsChartType'
import { FormGroupFilter } from './FormGroupFilter'
import { taiwanMinimumWageList } from '@/src/databases/taiwanMinimumWage'
import dynamic from 'next/dynamic'
import { Button } from '../Button'
import {
  IconArrowLeft,
  IconInfoSquareRoundedFilled,
  IconLoader,
} from '@tabler/icons-react'
import { Select } from '../Select'
import { FormGroupDisplayOptions } from './FormGroupDisplayOptions'
import { useDisplayOptions } from './useDisplayOptions'
import { DatasetTable } from './DatasetTable'
import TabsCurrency from './TabsCurrency'
import { useCurrency } from './useCurrency'
import { FormGroup } from './FormGroup'
import { useTranslations } from 'next-intl'
import { CurrencyNote } from '../CurrencyNote'
import { useFormatDatasetName } from '@/src/hooks/useFormatDatasetName'

const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center rounded-lg bg-base-200/30 text-sm text-base-content/70">
      <IconLoader className="animate-spin" />
    </div>
  ),
})

export const SectionChart = forwardRef<HTMLElement>(
  function SectionChart(_, ref) {
    const t = useTranslations('Chart')

    const [chartType, setChartType] = useChartType()
    const { currency, setCurrency } = useCurrency()

    const {
      form,
      isFilterStorageSizeChanged,
      isFilterLinesChanged,
      isFilterYearRangeChanged,
      isSomeFilterChanged,
      resetFilter,
      resetFilterStorageSize,
      resetFilterLines,
      resetFilterYearRange,
    } = useFilter()

    const { watch, control } = form

    const {
      displayOptionsForm,
      isSomeDisplayOptionsChanged,
      resetDisplayOptions,
    } = useDisplayOptions()

    const {
      iphoneDataset,
      iphoneDatasetNames,
      selectedDatasetName,
      setSelectedDatasetName,
      selectedDataset,
    } = useIphoneDataset({
      options: {
        currency,
        storage: watch('storage'),
        lines: watch('lines'),
        groupBy: chartTypeOptions[chartType].groupBy,
        showAllRelease: chartType === 'priceAdjustment',
        yearRange: watch('yearRange'),
      },
    })

    const shouldShowTable = Boolean(selectedDataset)

    const hideIsTaiwanMinimumWageListShownSwitch = currency !== 'twd'

    const chartProps: ComponentProps<typeof Chart> = {
      iphoneDataset,
      selectedDataset,
      taiwanMinimumWageList,
      selectedSeriesName: selectedDatasetName,
      onChangeSelectedSeriesName: setSelectedDatasetName,

      modelNameAbbreviation: displayOptionsForm.watch(
        'isModelNameAbbreviation',
      ),
      priceAbbreviation: displayOptionsForm.watch('isPriceAbbreviation'),
      hidePrice: displayOptionsForm.watch('isPriceHidden'),
      showTaiwanMinimumWageList:
        displayOptionsForm.watch('isTaiwanMinimumWageListShown') &&
        !hideIsTaiwanMinimumWageListShownSwitch,
      hideTooltip: displayOptionsForm.watch('isTooltipHidden'),

      onReset: resetFilter,
    }

    const { formatDatasetName } = useFormatDatasetName()

    return (
      <section ref={ref} className="flex flex-wrap gap-y-8">
        <div className="-mx-4 min-w-full sm:mx-0 sm:flex-1 xl:min-w-0">
          <div className="relative flex w-full flex-col items-start gap-8 overflow-x-auto overflow-y-hidden lg:sticky lg:top-8 lg:px-4">
            <div
              className={cn(
                'absolute left-4 top-4 z-10 delay-300 duration-300',
                {
                  'opacity-0 pointer-events-none delay-0 duration-200':
                    !shouldShowTable,
                },
              )}
            >
              <Button
                onClick={() => {
                  setSelectedDatasetName(null)
                }}
                disabled={!shouldShowTable}
              >
                <IconArrowLeft size={20} stroke={2.5} />
                {t('button.back')}
              </Button>
            </div>
            <div className="aspect-video w-full min-w-[50rem] overflow-x-auto overflow-y-hidden duration-300">
              <Chart {...chartProps} />
            </div>

            <div className="flex w-full items-center justify-between px-4">
              <CurrencyNote currency={currency} />
            </div>
          </div>
        </div>

        <div className="relative w-full xl:w-1/3">
          {shouldShowTable && (
            <div className="inset-0 z-50 bg-base-100 sm:absolute">
              <div className="sticky top-0 flex flex-col gap-y-4 py-6">
                <Select
                  value={selectedDatasetName}
                  onChange={setSelectedDatasetName}
                  items={iphoneDatasetNames.map((name) => ({
                    label: formatDatasetName(name),
                    value: name,
                  }))}
                  label={t('table.viewSeries')}
                />

                <DatasetTable source={selectedDataset?.source} />
                {selectedDataset?.source.length === 1 && (
                  <div className="flex items-center gap-1 text-xs text-base-content/60">
                    <IconInfoSquareRoundedFilled size={18} />
                    {t('table.noPriceAdjustment')}
                  </div>
                )}
              </div>
            </div>
          )}

          <div
            className={cn(
              'flex-col gap-y-4 transition duration-150',
              shouldShowTable ? 'hidden sm:invisible sm:flex' : 'flex',
            )}
          >
            <FormSectionGroup title={t('section.dataset')}>
              <FormGroup title={t('filter.currency.label')}>
                <TabsCurrency value={currency} onChange={setCurrency} />
              </FormGroup>
              <FormGroup title={t('filter.chartType.label')}>
                <TabsChartType value={chartType} onChange={setChartType} />
              </FormGroup>
            </FormSectionGroup>

            <FormGroupFilter
              control={control}
              showLinesReset={isFilterLinesChanged}
              showReset={isSomeFilterChanged}
              showStorageSizeReset={isFilterStorageSizeChanged}
              showYearRangeReset={isFilterYearRangeChanged}
              onReset={resetFilter}
              onResetLines={resetFilterLines}
              onResetStorageSize={resetFilterStorageSize}
              onResetYearRange={resetFilterYearRange}
            />

            <FormGroupDisplayOptions
              control={displayOptionsForm.control}
              watch={displayOptionsForm.watch}
              showReset={isSomeDisplayOptionsChanged}
              onReset={resetDisplayOptions}
              hideIsTaiwanMinimumWageListShownSwitch={
                hideIsTaiwanMinimumWageListShownSwitch
              }
            />
          </div>
        </div>
      </section>
    )
  },
)
