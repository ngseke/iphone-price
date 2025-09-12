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

export const metadata: Metadata = {
  title: '2025 年台灣 iPhone 價格歷史趨勢可視化',
  description: '',
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
