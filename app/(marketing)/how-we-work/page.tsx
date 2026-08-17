import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'How We Work',
  description: "A look at Karvao India's process — from diagnosis to a running growth system, and how we keep it improving every month.",
}

const steps = [
  {
    number: '01',
    title: 'Diagnose',
    description: 'We start with our Business Score assessment to understand where your digital presence, brand, acquisition, conversion, automation and measurement stand today.',
  },
  {
    number: '02',
    title: 'Design',
    description: "Based on your score and goals, we design a growth system tailored to your business stage — not a generic package. You get a clear quotation before anything starts.",
  },
  {
    number: '03',
    title: 'Build',
    description: 'Our team builds the foundation — website, brand assets, CRM and tracking — so every following step has something solid to run on.',
  },
  {
    number: '04',
    title: 'Run',
    description: 'We launch acquisition campaigns, automation workflows and conversion systems, and start routing every lead through a system you can see into.',
  },
  {
    number: '05',
    title: 'Report & Improve',
    description: 'Every month you get a report on what moved — leads, conversion, revenue — and we adjust the system based on what the data shows.',
  },
]

export default function HowWeWorkPage() {
  return (
    <div className="w-full bg-white">
      <section className="py-16 md:py-20 bg-white border-b border-border">
        <div className="page-container max-w-3xl">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">HOW WE WORK</span>
          <h1 className="text-4xl md:text-[52px] font-black tracking-tight text-navy leading-tight mb-6">
            A growth system, not a project.
          </h1>
          <p className="text-base md:text-lg text-[#475569] leading-relaxed">
            We follow the same five-step process with every client — a clear path from where your business stands today to a growth system that keeps compounding.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="page-container max-w-3xl flex flex-col gap-10">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6 items-start">
              <span className="text-3xl font-black text-blue-light shrink-0 w-16">{step.number}</span>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-navy mb-2">{step.title}</h2>
                <p className="text-[#475569] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-16 border-t border-[#CCE0FF] bg-blue-surface">
        <div className="page-container text-center">
          <h2 className="text-2xl md:text-3xl font-black text-navy mb-4">See where your business stands</h2>
          <p className="text-[#475569] mb-8 max-w-lg mx-auto">Start with a free Business Score assessment — it takes a few minutes and shows you exactly where to focus first.</p>
          <Link href="/business-score" tabIndex={-1}>
            <Button variant="primary">Get Your Business Score</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
