import { useTranslations } from 'next-intl'
import { StyledLink } from '../StyledLink'

interface LinkItem {
  name: string
  url: string
}

export function DataSource() {
  const t = useTranslations('DataSource')

  const list: LinkItem[] = [
    {
      name: t('links.appleTaiwan'),
      url: 'https://www.apple.com/tw/',
    },
    {
      name: t('links.apple'),
      url: 'https://www.apple.com/',
    },
    {
      name: t('links.iphoneTimeline'),
      url: 'https://zh.wikipedia.org/wiki/Template:Timeline_of_iPhone_models',
    },
    {
      name: t('links.taiwanMinimumWage'),
      url: 'https://zh.wikipedia.org/zh-tw/%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B%E5%9F%BA%E6%9C%AC%E5%B7%A5%E8%B3%87',
    },
  ]

  return (
    <div className="">
      <h2 className="pb-4 font-semibold">{t('title')}</h2>

      <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm">
        {list.map((item, index) => (
          <li key={index}>
            <StyledLink
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {item.name}
            </StyledLink>
          </li>
        ))}
      </ol>
    </div>
  )
}
