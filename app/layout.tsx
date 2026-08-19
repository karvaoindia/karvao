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
    default: 'Karvao India | Digital Growth Partner for Indian Businesses',
    template: '%s | Karvao India',
  },
  description:
    'Karvao India is a full-stack digital growth partner helping businesses build websites, run performance ads, manage CRM pipelines, automate workflows, and scale revenue.',
  keywords: [
    'Digital Growth Partner India',
    'Website Development India',
    'Shopify Development India',
    'Performance Marketing Agency',
    'Meta Ads & Google Ads India',
    'WhatsApp Automation India',
    'CRM Lead Management',
    'Karvao Growth Systems',
  ],
  metadataBase: new URL('https://karvao.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Karvao India | Digital Growth Partner for Indian Businesses',
    description:
      'Build your digital foundation, generate qualified demand, automate operations and measure real revenue growth with Karvao.',
    url: 'https://karvao.in',
    siteName: 'Karvao India',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karvao India | Digital Growth Partner',
    description: 'Digital presence, performance marketing, CRM, automation and analytics built for Indian businesses.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1264FF',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://karvao.in/#organization',
      name: 'Karvao India',
      url: 'https://karvao.in',
      logo: 'https://karvao.in/favicon.ico',
      description: 'Digital growth partner for Indian businesses — providing website development, performance marketing, CRM, automation and analytics.',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://karvao.in/#website',
      url: 'https://karvao.in',
      name: 'Karvao India',
      publisher: {
        '@id': 'https://karvao.in/#organization',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${sansFont.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 selection:bg-[#EAF2FF] selection:text-[#1264FF] font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
