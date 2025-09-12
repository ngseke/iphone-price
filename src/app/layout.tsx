import type { Metadata } from 'next'
import { Noto_Sans_TC, Rubik } from 'next/font/google'
import './globals.css'
import { cn } from '../modules/cn'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'font-sans antialiased',
          notoSansTc.variable,
          rubik.variable,
        )}
      >
        {children}
      </body>
    </html>
  )
}
