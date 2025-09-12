import { getFilteredIphoneListByLine } from '../databases/iphone'
import { type IphoneLine } from '../types/Iphone'
import { formatIphoneModelAbbreviation } from './iphoneModel'

function getTagsByIphoneLine(line: IphoneLine) {
  return [
    ...new Set(
      getFilteredIphoneListByLine(line).map((iphone) =>
        formatIphoneModelAbbreviation(iphone.model),
      ),
    ),
  ]
}

export const iphoneLines: Record<
  IphoneLine,
  {
    name: string
    tags: string[]
  }
> = {
  'entry-level': {
    name: '入門級',
    tags: getTagsByIphoneLine('entry-level'),
  },
  regular: {
    name: '高階級',
    tags: getTagsByIphoneLine('regular'),
  },
  premium: {
    name: '旗艦級',
    tags: getTagsByIphoneLine('premium'),
  },
}
