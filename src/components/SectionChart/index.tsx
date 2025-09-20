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
import { IconArrowLeft, IconInfoSquareRoundedFilled } from '@tabler/icons-react'
import { Select } from '../Select'
import { formatDatasetName } from '@/src/modules/iphoneDataset'
import { FormGroupDisplayOptions } from './FormGroupDisplayOptions'
import { useDisplayOptions } from './useDisplayOptions'
import { DatasetTable } from './DatasetTable'
import TabsCurrency from './TabsCurrency'
import { useCurrency } from './useCurrency'
import { FormGroup } from './FormGroup'

const Chart = dynamic(() => import('./Chart'), { ssr: false })

export const SectionChart = forwardRef<HTMLElement>(
  function SectionChart(_, ref) {
    const [chartType, setChartType] = useChartType()
    const { currency, setCurrency, formattedCurrency } = useCurrency()

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
      showTaiwanMinimumWageList: displayOptionsForm.watch(
        'isTaiwanMinimumWageListShown',
      ),
      hideTooltip: displayOptionsForm.watch('isTooltipHidden'),

      onReset: resetFilter,
    }

    return (
      <section ref={ref} className="flex flex-wrap gap-y-8">
        <div className="-mx-4 min-w-full sm:mx-0 sm:flex-1 lg:min-w-0">
          <div className="relative flex w-full flex-col items-start gap-8 overflow-auto overflow-y-hidden lg:sticky lg:top-8 lg:px-4">
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
                返回
              </Button>
            </div>
            <div className="h-96 w-full min-w-[36rem] overflow-auto duration-300 sm:h-[32rem]">
              <Chart {...chartProps} />
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <span className="text-xs opacity-70">
                單位：{formattedCurrency}
              </span>
            </div>
          </div>
        </div>

        <div className="relative w-full lg:w-1/3">
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
                  label="查看系列"
                />

                <DatasetTable source={selectedDataset?.source} />
                {selectedDataset?.source.length === 1 && (
                  <div className="flex items-center gap-1 text-xs text-base-content/60">
                    <IconInfoSquareRoundedFilled size={18} />
                    此系列未調整過價格
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
            <FormSectionGroup title="資料集">
              <FormGroup title="幣別">
                <TabsCurrency value={currency} onChange={setCurrency} />
              </FormGroup>
              <FormGroup title="圖表類型">
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
            />
          </div>
        </div>
      </section>
    )
  },
)
