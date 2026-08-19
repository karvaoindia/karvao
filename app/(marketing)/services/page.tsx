import React from 'react'
import { Metadata } from 'next'
import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { ServiceCard, ServiceData } from '@/components/ui/ServiceCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Digital Growth Services & Systems | KARVAO India',
  description:
    'Explore 20 complete digital growth services across Build (Websites, Shopify), Grow (SEO, Ads), Convert (CRM), Automate (WhatsApp), and Measure (Analytics).',
  alternates: {
    canonical: '/services',
  },
}

const SERVICES_DATA: ServiceData[] = [
  // CATEGORY 1: BUILD
  {
    id: 'website-development',
    category: 'BUILD',
    title: 'Website Development',
    description: 'High-performance websites designed to turn visitors into qualified opportunities.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'e-commerce',
    category: 'BUILD',
    title: 'E-commerce',
    description: 'Conversion-focused online stores built for seamless shopping experiences.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    id: 'shopify',
    category: 'BUILD',
    title: 'Shopify',
    description: 'Scalable Shopify stores with clean design, integrations and growth-ready foundations.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: 'branding',
    category: 'BUILD',
    title: 'Branding',
    description: 'Clear visual identities that make businesses recognizable and memorable.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },

  // CATEGORY 2: GROW
  {
    id: 'seo',
    category: 'GROW',
    title: 'SEO',
    description: 'Search strategies designed to improve visibility and attract relevant demand.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 'social-media',
    category: 'GROW',
    title: 'Social Media',
    description: 'Content and social systems designed to build attention, trust and engagement.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
  },
  {
    id: 'meta-ads',
    category: 'GROW',
    title: 'Meta Ads',
    description: 'Performance-focused Meta campaigns built around creative, targeting and measurable outcomes.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
  },
  {
    id: 'google-ads',
    category: 'GROW',
    title: 'Google Ads',
    description: 'Search and performance campaigns designed to capture high-intent demand.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },

  // CATEGORY 3: CONVERT
  {
    id: 'crm',
    category: 'CONVERT',
    title: 'CRM',
    description: 'Centralized customer systems that organize leads, conversations and sales activity.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 'lead-management',
    category: 'CONVERT',
    title: 'Lead Management',
    description: 'Structured lead pipelines that help teams respond, track and follow up consistently.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    id: 'conversion-systems',
    category: 'CONVERT',
    title: 'Conversion Systems',
    description: 'Digital journeys designed to turn attention into enquiries and opportunities.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: 'sales-enablement',
    category: 'CONVERT',
    title: 'Sales Enablement',
    description: 'Tools and systems that help sales teams follow up faster and close more efficiently.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },

  // CATEGORY 4: AUTOMATE
  {
    id: 'whatsapp-automation',
    category: 'AUTOMATE',
    title: 'WhatsApp Automation',
    description: 'Automated WhatsApp journeys for enquiries, follow-ups, qualification and support.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: 'workflow-automation',
    category: 'AUTOMATE',
    title: 'Workflow Automation',
    description: 'Automate repetitive business processes so teams can focus on higher-value work.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    id: 'integrations',
    category: 'AUTOMATE',
    title: 'Integrations',
    description: 'Connect your marketing, sales and business tools into one connected workflow.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V4zm6 7a2 2 0 110-4 2 2 0 010 4zm-6 7a2 2 0 100-4 2 2 0 000 4zM5 11a2 2 0 110-4 2 2 0 010 4z" />
      </svg>
    ),
  },
  {
    id: 'chatbots',
    category: 'AUTOMATE',
    title: 'Chatbots',
    description: 'Intelligent conversational experiences for instant responses, qualification and support.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm4.875 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zM12 15.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },

  // CATEGORY 5: MEASURE
  {
    id: 'analytics',
    category: 'MEASURE',
    title: 'Analytics',
    description: 'Clear visibility into the metrics that matter across your growth systems.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'tracking',
    category: 'MEASURE',
    title: 'Tracking',
    description: 'Reliable event and conversion tracking across your digital touchpoints.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: 'reporting',
    category: 'MEASURE',
    title: 'Reporting',
    description: 'Simple performance reports that turn marketing data into useful decisions.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'dashboards',
    category: 'MEASURE',
    title: 'Dashboards',
    description: 'Centralized dashboards that make business and marketing performance easier to understand.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
]

const CATEGORIES = [
  { key: 'BUILD', label: 'BUILD', subtitle: 'Build the digital foundation your business needs.' },
  { key: 'GROW', label: 'GROW', subtitle: 'Turn attention into qualified demand.' },
  { key: 'CONVERT', label: 'CONVERT', subtitle: 'Turn enquiries into customers.' },
  { key: 'AUTOMATE', label: 'AUTOMATE', subtitle: 'Streamline operations with zero friction.' },
  { key: 'MEASURE', label: 'MEASURE', subtitle: 'Complete clarity on performance & ROI.' },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFF] flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-28 sm:pt-36 pb-20 md:pb-28">
        <div className="page-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Services Page Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 relative">
            {/* Ambient Lighting */}
            <div
              className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full blur-3xl opacity-50 z-0"
              style={{
                background:
                  'radial-gradient(circle at 20% 20%, rgba(18, 100, 255, 0.08), transparent 45%), radial-gradient(circle at 80% 80%, rgba(191, 167, 255, 0.12), transparent 45%)',
              }}
            />

            <div className="relative z-10">
              <span className="text-xs font-black tracking-[0.25em] text-[#1264FF] uppercase block mb-3">
                SERVICES
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1220] leading-tight mb-4">
                Everything you need to build, grow and automate your business.
              </h1>
              <p className="text-sm sm:text-base text-[#475569] font-medium leading-relaxed max-w-2xl mx-auto">
                KARVAO combines websites, performance marketing, CRM systems, automation and analytics into one unified growth engine.
              </p>
            </div>
          </div>

          {/* 5 Categories Sections */}
          <div className="space-y-16 sm:space-y-24">
            {CATEGORIES.map((cat) => {
              const categoryServices = SERVICES_DATA.filter((s) => s.category === cat.key)

              return (
                <section key={cat.key} id={cat.key.toLowerCase()} className="space-y-8">
                  {/* Category Header */}
                  <div className="border-b border-[#1264FF]/12 pb-4">
                    <span className="text-xs font-black tracking-[0.2em] text-[#1264FF] uppercase block mb-1">
                      {cat.label}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0B1220] tracking-tight">
                      {cat.subtitle}
                    </h2>
                  </div>

                  {/* 4 Cards Grid per Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryServices.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-20 sm:mt-28 p-8 sm:p-12 rounded-[28px] bg-gradient-to-br from-[#0B1220] via-[#122240] to-[#0B1220] text-white text-center relative overflow-hidden shadow-xl">
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#1264FF]/20 blur-3xl" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                Ready to build your complete growth engine?
              </h3>
              <p className="text-sm text-white/70 mb-6 leading-relaxed">
                Check your business score or get a custom quotation for your company.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/quotation"
                  className="group inline-flex items-center justify-center gap-2 bg-[#1264FF] hover:bg-[#0F53D6] text-white font-extrabold text-xs sm:text-sm h-11 px-6 rounded-full shadow-lg transition-all"
                >
                  <span>Get a Quotation</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
                <Link
                  href="/business-score"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm h-11 px-6 rounded-full backdrop-blur-md transition-all"
                >
                  <span>Check Your Business Score</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
