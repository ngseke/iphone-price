import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { Home } from './Home'

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)

  setRequestLocale(locale)

  return <Home />
}
