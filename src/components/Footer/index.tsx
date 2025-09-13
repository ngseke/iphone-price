'use client'

import Link from 'next/link'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { IconBrandGithubFilled } from '@tabler/icons-react'
import { StyledLink } from '../StyledLink'

dayjs.extend(localizedFormat)

interface LinkItem {
  name: string
  url: string
}

const githubUrl = 'https://github.com/ngseke/iphone-price'

const links: LinkItem[] = [
  { name: 'GitHub', url: githubUrl },
  { name: 'Issues', url: `${githubUrl}/issues` },
]

const builtAt = process.env.BUILT_AT ?? ''
const commitHash = process.env.COMMIT_HASH ?? ''

export default function Footer() {
  const formattedBuiltAt = dayjs(+builtAt).format('YYYY/MM/DD')
  const commitUrl = `${githubUrl}/tree/${commitHash}`

  return (
    <footer className="grid w-full grid-flow-dense place-items-center gap-6 rounded bg-base-200 p-8 text-center text-sm text-base-content">
      <nav className="flex items-center gap-4">
        <Link
          href={githubUrl}
          className="underline"
          aria-label="GitHub repository"
        >
          <IconBrandGithubFilled size={18} />
        </Link>

        {links.map((link, i) => (
          <StyledLink key={i} href={link.url} className="underline">
            {link.name}
          </StyledLink>
        ))}
      </nav>

      <aside>
        <p className="font-mono text-xs font-medium">
          Made with <span title="IPA">🍺</span> by{' '}
          <StyledLink className="underline" href="https://ngseke.me/">
            ngseke
          </StyledLink>
          . Last update: {formattedBuiltAt} (
          <StyledLink className="underline" href={commitUrl}>
            {commitHash}
          </StyledLink>
          )
        </p>
      </aside>
    </footer>
  )
}
