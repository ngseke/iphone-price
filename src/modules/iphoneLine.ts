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

export const iphoneLines: Record<IphoneLine, { tags: string[] }> = {
  'entry-level': {
    tags: getTagsByIphoneLine('entry-level'),
  },
  regular: {
    tags: getTagsByIphoneLine('regular'),
  },
  premium: {
    tags: getTagsByIphoneLine('premium'),
  },
}
