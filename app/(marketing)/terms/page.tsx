import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms that apply when you use the Karvao India website and our assessment and quotation tools.',
}

export default function TermsPage() {
  return (
    <div className="w-full bg-white">
      <section className="py-16 md:py-20 bg-white border-b border-border">
        <div className="page-container max-w-3xl">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">LEGAL</span>
          <h1 className="text-4xl md:text-[44px] font-black tracking-tight text-navy leading-tight mb-6">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-grey">Last updated: 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="page-container max-w-3xl flex flex-col gap-8 text-[#475569] leading-relaxed">
          <div>
            <h2 className="text-xl font-black text-navy mb-3">Using this site</h2>
            <p>
              This website and its tools, including the Business Score assessment and quotation request form, are provided to help you evaluate and plan digital growth work with Karvao India. The information you receive from the assessment is an estimate based on your answers and is not a guarantee of results.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-black text-navy mb-3">Quotations</h2>
            <p>
              A quotation requested through this site is an estimate. Final scope, pricing and timelines are confirmed in a separate agreement before any work begins.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-black text-navy mb-3">Content</h2>
            <p>
              All content on this site, including copy, design and branding, belongs to Karvao India and may not be copied or reused without permission.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-black text-navy mb-3">Questions</h2>
            <p>
              If you have questions about these terms, email us at{' '}
              <a href="mailto:hello@karvao.in" className="text-blue-bright font-semibold hover:underline">
                hello@karvao.in
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
