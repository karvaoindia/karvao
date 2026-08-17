import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Karvao India — reach out by email or start with a free Business Score assessment or a quotation.',
}

export default function ContactPage() {
  return (
    <div className="w-full bg-white">
      <section className="py-16 md:py-20 bg-white border-b border-border">
        <div className="page-container max-w-3xl">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">CONTACT US</span>
          <h1 className="text-4xl md:text-[52px] font-black tracking-tight text-navy leading-tight mb-6">
            Let&apos;s talk about your growth.
          </h1>
          <p className="text-base md:text-lg text-[#475569] leading-relaxed">
            Tell us about your business and where you want it to go. The fastest way to get a tailored answer from us is to start with a Business Score assessment or request a quotation — both take a few minutes and route straight to our team.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl p-8 border border-border flex flex-col gap-3">
            <h2 className="text-lg font-black text-navy">Email</h2>
            <a href="mailto:hello@karvao.in" className="text-blue-bright font-semibold hover:underline">
              hello@karvao.in
            </a>
            <p className="text-sm text-[#475569]">For general enquiries, partnerships and press.</p>
          </div>
          <div className="rounded-2xl p-8 border border-[#CCE0FF] bg-blue-surface flex flex-col gap-4">
            <h2 className="text-lg font-black text-navy">Start a project</h2>
            <p className="text-sm text-[#475569]">Get a free assessment of your business, or request a quotation directly.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/business-score" tabIndex={-1}>
                <Button variant="primary" size="sm">Get Your Business Score</Button>
              </Link>
              <Link href="/quotation" tabIndex={-1}>
                <Button variant="outline" size="sm">Get a Quotation</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
