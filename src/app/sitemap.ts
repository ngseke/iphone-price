import { MetadataRoute } from 'next'
import { getPathname } from '../i18n/navigation'

const host = 'https://iphone-price.ngseke.me'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await Promise.resolve()

  return [
    {
      url: host,
      lastModified: new Date(),
      alternates: {
        languages: {
          'zh-Hant': host + getPathname({ locale: 'zh-Hant', href: '/' }),
          en: host + getPathname({ locale: 'en', href: '/' }),
        },
      },
    },
  ]
}
