import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Our Work – Karvao India',
  description: 'Showcase of successful case studies demonstrating how Karvao India builds, grows, converts, automates, and measures business growth.',
  alternates: { canonical: '/work' },
};

// Fetch case studies at request time (SSG fallback to ISR)
export const revalidate = 60;

export default async function WorkPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { sortOrder: 'asc' },
  });

  const categories = ['All', 'Build', 'Grow', 'Convert', 'Automate', 'Measure'];

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-white border-b border-border">
        <div className="page-container text-center">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">
            WORK
          </span>
          <h1 className="text-[28px] sm:text-4xl md:text-[52px] font-black tracking-tight text-navy leading-tight mb-4 md:mb-6">
            Real results that fuel growth
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            See how we helped businesses across industries build, grow, convert, automate and measure success.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 md:py-8 bg-white">
        <div className="page-container flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-800 hover:bg-blue-100 transition"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-8 md:py-16 bg-white">
        <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="relative group rounded-2xl overflow-hidden border border-[#CCE0FF] bg-white hover:shadow-lg transition-shadow"
            >
              {/* Cover Image */}
              {cs.coverImage && (
                <img
                  src={cs.coverImage}
                  alt={cs.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
              )}
              {/* Overlay Content */}
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-800">
                    {cs.label?.[0] ?? cs.category[0]}
                  </div>
                  <h2 className="text-xl font-black text-navy">{cs.title}</h2>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">{cs.problem}</p>
                <div className="flex items-center gap-2 text-sm font-bold text-navy">
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{cs.metric}</span>
                  <span>{cs.metricLabel}</span>
                </div>
                <Link href={`/work/${cs.id}`} className="self-start mt-2">
                  <Button variant="primary" size="sm">Read case study</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-16 border-t border-[#CCE0FF] bg-blue-surface">
        <div className="page-container text-center">
          <h2 className="text-2xl md:text-3xl font-black text-navy mb-4">
            Ready to build your growth system?
          </h2>
          <p className="text-[#475569] mb-8 max-w-lg mx-auto">
            Start with a free Business Score check or get a custom quotation.
          </p>
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
  );
}
