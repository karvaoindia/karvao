import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getInsightBySlug, getAllInsights } from '@/lib/insights'
import { Button } from '@/components/ui/Button'

interface InsightsPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllInsights().map((insight) => ({ slug: insight.slug }))
}

export async function generateMetadata({ params }: InsightsPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const insight = getInsightBySlug(slug)
  if (!insight) return {}
  return { title: `${insight.title} | Karvao India`, description: insight.excerpt }
}

export default async function InsightsPostPage({ params }: InsightsPostPageProps) {
  const { slug } = await params
  const insight = getInsightBySlug(slug)
  if (!insight) notFound()

  return (
    <div className="w-full bg-white">
      <section className="py-16 md:py-20 bg-white border-b border-border">
        <div className="page-container max-w-3xl">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-xs font-black text-blue-bright hover:text-primary-hover transition-colors mb-8">
            <span>&larr;</span>
            <span>All Insights</span>
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <span className="text-xs font-black tracking-widest text-blue-bright uppercase">{insight.category}</span>
            <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
            <span className="text-xs font-semibold text-grey">{insight.date}</span>
            <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
            <span className="text-xs font-semibold text-grey">{insight.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-navy leading-tight mb-6">
            {insight.title}
          </h1>
          <p className="text-base md:text-lg text-[#475569] leading-relaxed">{insight.excerpt}</p>
          <p className="text-sm font-bold text-navy mt-8">{insight.author}</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="page-container max-w-3xl flex flex-col gap-10">
          {insight.content.map((block, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              {block.heading && <h2 className="text-2xl md:text-3xl font-black text-navy tracking-tight">{block.heading}</h2>}
              <p className="text-[#475569] leading-relaxed">{block.body}</p>
              {block.bullets && (
                <ul className="flex flex-col gap-3 mt-2">
                  {block.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm font-bold text-navy leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-sm bg-blue-bright flex-shrink-0 mt-2" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-16 border-t border-[#CCE0FF] bg-blue-surface">
        <div className="page-container text-center">
          <h2 className="text-2xl md:text-3xl font-black text-navy mb-4">Put these ideas into action.</h2>
          <p className="text-[#475569] mb-8 max-w-lg mx-auto">Get a free Business Score or a custom quotation tailored to your goals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/business-score" tabIndex={-1}><Button variant="outline">Check Business Score</Button></Link>
            <Link href="/quotation" tabIndex={-1}><Button variant="primary">Get a Quotation</Button></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
