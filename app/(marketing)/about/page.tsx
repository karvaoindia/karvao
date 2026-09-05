import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'About Karvao India – Digital Growth Partner',
  description: "Learn about Karvao India's mission, approach, and why we are the trusted partner for building, growing, converting, automating, and measuring business growth.",
  alternates: { canonical: '/about' },
};

export const revalidate = 60;

export default async function AboutPage() {
  // Pull content from SiteContent (placeholder for now)
  const aboutContent = await prisma.siteContent.findFirst({
    where: { page: 'about' },
  });

  const headline = aboutContent?.title ?? 'Empowering Your Business Growth';
  const subhead =
    aboutContent?.subtitle ??
    "We build, grow, convert, automate and measure – all under one seamless system.";
  const description =
    aboutContent?.body ??
    "Karvao India is a full‑stack digital growth partner. From stunning websites to data‑driven automation, we craft solutions that scale with your ambitions.";

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-white border-b border-border">
        <div className="page-container text-center">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">
            ABOUT
          </span>
          <h1 className="text-[28px] sm:text-4xl md:text-[52px] font-black tracking-tight text-navy leading-tight mb-4 md:mb-6">
            {headline}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            {subhead}
          </p>
        </div>
      </section>

      {/* Company Info Panel */}
      <section className="py-8 md:py-16 bg-white">
        <div className="page-container flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="flex-1">
            <p className="text-sm md:text-base text-[#475569] leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
          <div className="flex-1 bg-blue-surface p-8 rounded-2xl border border-[#CCE0FF]">
            <h2 className="text-2xl font-black text-navy mb-4">Our Approach</h2>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-bright" />
                Build solid digital foundations
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-bright" />
                Grow demand with data‑driven campaigns
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-bright" />
                Convert leads through automated funnels
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-bright" />
                Automate operations for efficiency
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-bright" />
                Measure impact with real‑time dashboards
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call‑to‑Action */}
      <section className="py-14 md:py-16 border-t border-[#CCE0FF] bg-blue-surface">
        <div className="page-container text-center">
          <h2 className="text-2xl md:text-3xl font-black text-navy mb-4">
            Ready to start your growth engine?
          </h2>
          <p className="text-[#475569] mb-8 max-w-lg mx-auto">
            Get a free Business Score or request a custom quotation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/business-score" className="px-6 py-2 bg-white text-navy rounded hover:bg-gray-100 transition">
              Check Business Score
            </a>
            <a href="/quotation" className="px-6 py-2 bg-navy text-white rounded hover:bg-blue-800 transition">
              Get a Quotation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
