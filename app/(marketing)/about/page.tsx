import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'About Us | Digital Growth Partner | KARVAO India',
  description:
    'Karvao India is a digital growth partner for local and regional businesses across India. We combine strategy, technology and execution to build sustainable growth systems.',
  alternates: {
    canonical: '/about',
  },
}

export default async function AboutPage() {
  const contentItems = await prisma.siteContent.findMany({
    where: { section: 'about' },
    select: { key: true, value: true },
  })
  const contentMap = Object.fromEntries(contentItems.map(item => [item.key, item.value]))
  return (
    <div className="w-full bg-white">
      <section className="py-10 md:py-20 bg-white border-b border-border">
        <div className="page-container max-w-3xl">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">ABOUT US</span>
          <h1 className="text-[28px] sm:text-4xl md:text-[52px] font-black tracking-tight text-navy leading-tight mb-4 md:mb-6">
            {contentMap['about_headline'] || 'We grow businesses. Not just their metrics.'}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#475569] leading-relaxed">
            {contentMap['about_subheadline'] || 'Karvao India is a digital growth partner for local and regional businesses across India. We combine strategy, technology and execution to build sustainable growth systems — not one-off campaigns.'}
          </p>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="flex flex-col gap-5 md:gap-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-navy">Our mission</h2>
            <p className="text-[#475569] leading-relaxed">
              Most businesses in India are underserved by digital agencies that either overcharge for basics or deliver vanity metrics without real business impact. We exist to change that — by building complete growth systems that actually move revenue.
            </p>
            <p className="text-[#475569] leading-relaxed">
              We work closely with each client, understand their business model, and deploy the exact combination of website, marketing, CRM, automation and analytics that fits their stage and goals.
            </p>
          </div>
          <div className="rounded-2xl p-10 border border-[#CCE0FF] bg-blue-surface flex flex-col gap-6">
            {[
              { label: 'Founded', value: '2023' },
              { label: 'Headquarters', value: 'India' },
              { label: 'Focus', value: 'SME & Local Businesses' },
              { label: 'Approach', value: 'Full-Stack Digital Growth' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between border-b border-[#CCE0FF] pb-4 last:border-0 last:pb-0">
                <span className="text-xs font-black text-grey uppercase tracking-wider">{item.label}</span>
                <span className="text-sm font-bold text-navy">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 border-t border-[#CCE0FF] bg-blue-surface">
        <div className="page-container text-center">
          <h2 className="text-2xl md:text-3xl font-black text-navy mb-4">Work with us</h2>
          <p className="text-[#475569] mb-8 max-w-lg mx-auto">Ready to build a real growth system for your business?</p>
          <Link href="/quotation" tabIndex={-1}>
            <Button variant="primary">Get a Quotation</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
