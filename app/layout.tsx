import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Karvao India | Digital Growth Partner for Businesses',
    template: '%s | Karvao India',
  },
  description: 'We help businesses build their digital presence, generate demand, improve conversions, automate operations and measure growth.',
  metadataBase: new URL('https://karvao.in'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#059669',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${sansFont.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
        {children}
      </body>
    </html>
  )
}
