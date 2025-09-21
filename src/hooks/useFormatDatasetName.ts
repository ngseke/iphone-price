import { useTranslations } from 'next-intl'
import { formatIphoneModel } from '../modules/iphoneModel'
import { IphoneLine, IphoneModel, IphoneSuffix } from '../types/Iphone'

export function useFormatDatasetName() {
  const t = useTranslations('Line')

  function formatDatasetName(name: string) {
    if (name.startsWith('iphone')) return formatIphoneModel(name as IphoneModel)

    try {
      const chunks = name.split(',').map((chunk, index) => {
        if (!index)
          return {
            'entry-level': t('entry-level'),
            regular: t('regular'),
            premium: t('premium'),
          }[chunk as IphoneLine]

        const suffixMap: Record<IphoneSuffix, string> = {
          base: '',
          plus: 'Plus',
          pro: 'Pro',
          'pro-max': 'Pro Max',
          mini: 'mini',
          air: 'Air',
        }

        return suffixMap[chunk as IphoneSuffix]
      })

      return `${chunks[0]} ${chunks[1] ? `(${chunks[1]})` : ''}`
    } catch (e) {
      console.error(e)
      return name
    }
  }

  return {
    formatDatasetName,
  }
}
