import {
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_TC,
  Rubik,
} from 'next/font/google'
import '../globals.css'
import { cn } from '../../modules/cn'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { routing } from '@/src/i18n/routing'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PropsWithChildren } from 'react'

const notoSansTc = Noto_Sans_TC({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
})

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
})

const notoSansKr = Noto_Sans_KR({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
})

const rubik = Rubik({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-rubik',
  subsets: ['latin'],
})

const ogImage = 'https://iphone-price.ngseke.me/og-image.png'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  const title = t('title')
  const description = t('description')

  return {
    title,
    openGraph: {
      title,
      description,
      siteName: title,
      url: 'https://iphone-price.ngseke.me/',
      images: [{ url: ogImage, width: 1320, height: 840 }],
    },
    twitter: {
      title,
      images: [{ url: ogImage }],
      card: 'summary_large_image',
    },
    description,
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<{
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body
        className={cn(
          'font-sans antialiased',
          rubik.variable,
          notoSansTc.variable,
          notoSansJp.variable,
          notoSansKr.variable,
          {
            'font-sans-jp': locale === 'ja',
            'font-sans-kr': locale === 'ko',
          },
        )}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L5XC0FVT2W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L5XC0FVT2W');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4196523767230587"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
