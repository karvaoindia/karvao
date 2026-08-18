import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Our Solutions',
  description: "Build, Grow, Convert, Automate and Measure — Karvao India's complete digital growth system for businesses.",
}

const solutions = [
  {
    id: 'build',
    label: 'Build',
    tagline: 'Digital Presence',
    description: 'Your business needs a strong digital foundation — a website that converts, a brand that stands out, and an e-commerce setup that works 24/7.',
    bullets: ['Website Development', 'E-commerce & Shopify', 'Branding & Identity', 'Landing Pages'],
  },
  {
    id: 'grow',
    label: 'Grow',
    tagline: 'Generate Demand',
    description: 'Get in front of the right customers at the right time. We run performance campaigns across search, social and display to fill your pipeline.',
    bullets: ['SEO & Content', 'Social Media Marketing', 'Meta & Google Ads', 'Influencer Campaigns'],
  },
  {
    id: 'convert',
    label: 'Convert',
    tagline: 'Turn Leads into Customers',
    description: 'Traffic without conversion is wasted money. We set up systems that nurture leads, track every touchpoint and close more deals.',
    bullets: ['CRM Setup & Management', 'Lead Management', 'Conversion Systems', 'Sales Enablement'],
  },
  {
    id: 'automate',
    label: 'Automate',
    tagline: 'Streamline Operations',
    description: 'Stop doing things manually. We automate your follow-ups, workflows and customer touchpoints so your team can focus on what matters.',
    bullets: ['WhatsApp Automation', 'Workflow Automation', 'Tool Integrations', 'AI Chatbots'],
  },
  {
    id: 'measure',
    label: 'Measure',
    tagline: 'Track & Improve',
    description: "You can't improve what you don't measure. We set up dashboards and reporting that give you clear visibility into what's working.",
    bullets: ['Analytics Setup', 'Conversion Tracking', 'Monthly Reporting', 'Growth Dashboards'],
  },
]

export default function SolutionsPage() {
  return (
    <div className="w-full bg-white">
      <section className="py-10 md:py-20 bg-white border-b border-border">
        <div className="page-container text-center">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">SOLUTIONS</span>
          <h1 className="text-[28px] sm:text-4xl md:text-[52px] font-black tracking-tight text-navy leading-tight mb-4 md:mb-6">
            Everything your business<br className="hidden sm:block" /> needs to move forward.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Five interconnected systems that work together to build, grow, and scale your business — not five disconnected services.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-white">
        <div className="page-container flex flex-col gap-10 md:gap-16">
          {solutions.map((sol, idx) => (
            <div key={sol.id} id={sol.id} className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div className="flex flex-col gap-4 md:gap-5">
                <span className="text-xs font-black tracking-widest text-blue-bright uppercase">{sol.tagline}</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy tracking-tight">{sol.label}</h2>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">{sol.description}</p>
                <ul className="flex flex-col gap-2.5 mt-2">
                  {sol.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm font-bold text-navy">
                      <span className="w-1.5 h-1.5 rounded-sm bg-blue-bright flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link href="/quotation" tabIndex={-1} className="self-start mt-2">
                  <Button variant="primary" size="sm">Get started</Button>
                </Link>
              </div>

              <div className="rounded-2xl p-10 flex items-center justify-center min-h-[220px] border border-[#CCE0FF] bg-blue-surface">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-white border border-[#CCE0FF] flex items-center justify-center shadow-sm mx-auto mb-4">
                    <span className="text-3xl font-black text-blue-bright">{sol.label[0]}</span>
                  </div>
                  <span className="text-sm font-black tracking-wider text-navy uppercase">{sol.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-16 border-t border-[#CCE0FF] bg-blue-surface">
        <div className="page-container text-center">
          <h2 className="text-2xl md:text-3xl font-black text-navy mb-4">Ready to build your growth system?</h2>
          <p className="text-[#475569] mb-8 max-w-lg mx-auto">Start with a free Business Score check or get a custom quotation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/business-score" tabIndex={-1}>
              <Button variant="outline">Check Business Score</Button>
            </Link>
            <Link href="/quotation" tabIndex={-1}>
              <Button variant="primary">Get a Quotation</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
