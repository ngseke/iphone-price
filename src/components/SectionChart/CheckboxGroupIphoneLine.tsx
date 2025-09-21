import { iphoneLineSchema, type IphoneLine } from '../../types/Iphone'
import { Checkbox } from '../Checkbox'
import { useTranslations } from 'next-intl'

const options = iphoneLineSchema.options

export function CheckboxGroupIphoneLine({
  value,
  onChange,
}: {
  value: IphoneLine[]
  onChange: (value: IphoneLine[]) => void
}) {
  const t = useTranslations('Line')

  return (
    <div className="flex flex-wrap items-start gap-2">
      {options.map((item) => {
        const checked = value.includes(item)
        return (
          <div key={item}>
            <Checkbox
              checked={checked}
              onChange={(checked) => {
                if (checked) {
                  if (!value.includes(item)) onChange([...value, item])
                } else {
                  onChange(value.filter((valueItem) => valueItem !== item))
                }
              }}
              label={
                {
                  'entry-level': t('entry-level'),
                  regular: t('regular'),
                  premium: t('premium'),
                }[item]
              }
            />
          </div>
        )
      })}
    </div>
  )
}
