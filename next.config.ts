import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  env: {
    BUILT_AT: String(+new Date()),
    COMMIT_HASH: process.env.COMMIT_HASH,
  },
}

export default nextConfig
