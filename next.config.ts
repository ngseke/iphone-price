import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  output: 'export',
  env: {
    BUILT_AT: String(+new Date()),
    COMMIT_HASH: process.env.COMMIT_HASH,
  },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
