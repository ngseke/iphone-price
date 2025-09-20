import type { Metadata } from 'next'
import { Noto_Sans_TC, Rubik } from 'next/font/google'
import '../globals.css'
import { cn } from '../../modules/cn'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { routing } from '@/src/i18n/routing'
import { setRequestLocale } from 'next-intl/server'
import { PropsWithChildren } from 'react'

const notoSansTc = Noto_Sans_TC({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
})

const rubik = Rubik({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-rubik',
  subsets: ['latin'],
})

const title = '台灣 iPhone 價格歷史趨勢'
const description = '透過圖表比較 iPhone 17 和歷代的價格變化'
const ogImage = 'https://iphone-price.ngseke.me/og-image.png'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
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

export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<{
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  setRequestLocale(locale)

  return (
    <html lang="en">
      <body
        className={cn(
          'font-sans antialiased',
          notoSansTc.variable,
          rubik.variable,
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
