import { iphoneLineSchema, type IphoneLine } from '../../types/Iphone'
import { iphoneLines } from '../../modules/iphoneLine'
import { Checkbox } from '../Checkbox'

const options = iphoneLineSchema.options

export function CheckboxGroupIphoneLine({
  value,
  onChange,
}: {
  value: IphoneLine[]
  onChange: (value: IphoneLine[]) => void
}) {
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
              label={iphoneLines[item].name}
            />
          </div>
        )
      })}
    </div>
  )
}
