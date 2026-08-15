import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllInsights } from '@/lib/insights'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Insights | Karvao India',
  description: 'Practical growth insights for Indian businesses — digital presence, lead generation, conversion, automation and measurement.',
}

export default function InsightsPage() {
  const insights = getAllInsights()

  return (
    <div className="w-full bg-white">
      <section className="py-16 md:py-20 bg-white border-b border-border">
        <div className="page-container max-w-3xl">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">INSIGHTS</span>
          <h1 className="text-4xl md:text-[52px] font-black tracking-tight text-navy leading-tight mb-6">
            Ideas that grow<br />Indian businesses.
          </h1>
          <p className="text-base md:text-lg text-[#475569] leading-relaxed">
            Practical thinking on building digital presence, generating demand, converting leads, automating operations and measuring what matters.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight) => (
              <Link key={insight.slug} href={`/insights/${insight.slug}`} className="border border-border rounded-2xl p-8 flex flex-col gap-5 hover:border-blue-bright/30 hover:shadow-[0_8px_30px_rgba(10,25,49,0.08)] transition-all duration-300 group">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-black tracking-widest text-blue-bright uppercase">{insight.category}</span>
                  <span className="text-xs text-grey font-semibold whitespace-nowrap">{insight.readTime}</span>
                </div>
                <h2 className="text-xl font-extrabold text-navy leading-snug group-hover:text-blue-bright transition-colors">
                  {insight.title}
                </h2>
                <p className="text-sm text-[#475569] leading-relaxed line-clamp-4">{insight.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-blue-bright hover:text-primary-hover transition-colors mt-auto group/link">
                  <span>Read article</span>
                  <span className="inline-block transition-transform group-hover/link:translate-x-1">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 border-t border-[#CCE0FF] bg-blue-surface">
        <div className="page-container text-center">
          <h2 className="text-2xl md:text-3xl font-black text-navy mb-4">Want these ideas applied to your business?</h2>
          <p className="text-[#475569] mb-8 max-w-lg mx-auto">Start with a free Business Score check or get a custom quotation built around your goals.</p>
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
