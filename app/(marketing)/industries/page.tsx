import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description: 'Karvao India works with auto dealers, clinics, restaurants, real estate, retail, education and more.',
}

const industries = [
  {
    id: 'auto',
    label: 'Auto Dealers',
    description: 'Drive more showroom visits and close more deals with targeted digital campaigns and CRM automation.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 17h14v-4H5v4zm0 0a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4zM6 9l2-4h8l2 4H6z" />
      </svg>
    ),
  },
  {
    id: 'healthcare',
    label: 'Clinics & Healthcare',
    description: 'Attract more patients, automate appointment reminders, and build trust through strong digital presence.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2h3a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3zm2 6h4m-2-2v4" />
      </svg>
    ),
  },
  {
    id: 'food',
    label: 'Restaurants & Food',
    description: 'Fill tables, grow delivery orders and build a loyal customer base through social and automation.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2v20M18 8v14M18 4a3 3 0 00-3 3v5a3 3 0 006 0V7a3 3 0 00-3-3zM6 3v8a3 3 0 003 3h0a3 3 0 003-3V3M9 3v8" />
      </svg>
    ),
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    description: 'Generate quality leads, showcase properties online and convert enquiries into site visits automatically.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'retail',
    label: 'Retail & D2C',
    description: 'Build your online store, run performance campaigns and turn one-time buyers into repeat customers.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    id: 'education',
    label: 'Education',
    description: 'Fill seats faster with targeted lead generation, automated follow-ups and strong digital branding.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
]

export default function IndustriesPage() {
  return (
    <div className="w-full bg-white">
      <section className="py-10 md:py-20 bg-white border-b border-border">
        <div className="page-container text-center">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">INDUSTRIES</span>
          <h1 className="text-[28px] sm:text-4xl md:text-[52px] font-black tracking-tight text-navy leading-tight mb-4 md:mb-6">
            Built for your industry.<br className="hidden sm:block" /> Designed for growth.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Whether you run a clinic, a showroom or a restaurant — we understand your customers, your challenges, and what moves the needle.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {industries.map((ind) => (
              <div key={ind.id} className="border border-border rounded-2xl p-5 sm:p-8 flex flex-col gap-4 sm:gap-5 hover:border-blue-bright/30 hover:shadow-[0_8px_30px_rgba(10,25,49,0.08)] transition-all duration-300 group">
                <div className="w-16 h-16 rounded-full bg-[#F0F6FF] border border-[#CCE0FF] flex items-center justify-center text-blue-bright">
                  {ind.icon}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-navy mb-2">{ind.label}</h2>
                  <p className="text-sm text-[#475569] leading-relaxed">{ind.description}</p>
                </div>
                <Link href="/quotation" className="inline-flex items-center gap-1.5 text-xs font-black text-blue-bright hover:text-primary-hover transition-colors mt-auto group/link">
                  <span>Get started</span>
                  <span className="inline-block transition-transform group-hover/link:translate-x-1">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 border-t border-[#CCE0FF] bg-blue-surface">
        <div className="page-container text-center">
          <h2 className="text-2xl md:text-3xl font-black text-navy mb-4">Don&apos;t see your industry?</h2>
          <p className="text-[#475569] mb-8 max-w-lg mx-auto">
            We work with any business that wants to grow. Tell us what you do and we&apos;ll show you how we can help.
          </p>
          <Link href="/quotation" tabIndex={-1}>
            <Button variant="primary">Get a Quotation</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
