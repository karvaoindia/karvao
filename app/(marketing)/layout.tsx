import React from 'react'
import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { MobileStickyCTA } from '@/components/marketing/MobileStickyCTA'
import { ScrollRestoration } from '@/components/marketing/ScrollRestoration'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      {/* Accessibility skip navigation target */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Header />
      
      <main id="main-content" className="flex-grow pt-20">
        {children}
      </main>
      
      <Footer />
      <MobileStickyCTA />
    </div>
  )
}
