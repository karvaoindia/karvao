import React from 'react'
import { prisma } from '@/lib/prisma'

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-[14px] h-[14px] ${i < rating ? 'text-[#F59E0B]' : 'text-[#E2E8F0]'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export const ClientReviewsSection: React.FC = async () => {
  const [testimonials, contentItems] = await Promise.all([
    prisma.testimonial.findMany({
      orderBy: { sortOrder: 'asc' },
      take: 3,
    }),
    prisma.siteContent.findMany({
      where: { section: 'reviews' },
      select: { key: true, value: true },
    }),
  ])
  const contentMap = Object.fromEntries(contentItems.map(item => [item.key, item.value]))
  return (
    <section className="py-20 md:py-24 bg-blue-surface/50 border-t border-[#CCE0FF]/30">
      <div className="page-container">
        <div className="text-center mb-14">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">
            CLIENT REVIEWS
          </span>
          <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-navy leading-tight">
            {contentMap['reviews_headline'] || 'What our clients say.'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-border rounded-2xl p-8 flex flex-col justify-between shadow-[0_1px_4px_rgba(10,25,49,0.04)] hover:shadow-[0_8px_32px_rgba(10,25,49,0.08)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div>
                <StarRating rating={t.rating} />
                <p className="text-[14px] text-[#475569] leading-relaxed mt-5 mb-7 italic">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3.5 pt-5 border-t border-border/60">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-bright to-blue-medium flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <span className="text-sm font-bold text-navy block">{t.name}</span>
                  <span className="text-[12px] text-grey">{t.role}, {t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
