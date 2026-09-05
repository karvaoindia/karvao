import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Our Services – Karvao India',
  description: 'Explore the five interconnected systems: Build, Grow, Convert, Automate, Measure. Each system offers tailored services to accelerate your business growth.',
  alternates: { canonical: '/services' },
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { sortOrder: 'asc' },
  });

  const categories = ['Build', 'Grow', 'Convert', 'Automate', 'Measure'];
  const servicesByCategory: Record<string, any[]> = {};
  categories.forEach((c) => (servicesByCategory[c] = []));
  services.forEach((s) => {
    const cat = s.category?.charAt(0).toUpperCase() + s.category?.slice(1).toLowerCase();
    if (categories.includes(cat)) servicesByCategory[cat].push(s);
  });

  const [activeCategory, setActiveCategory] = ["Build", null] as any; // placeholder, will be handled client‑side via useState in the component.

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-white border-b border-border">
        <div className="page-container text-center">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">
            SERVICES
          </span>
          <h1 className="text-[28px] sm:text-4xl md:text-[52px] font-black tracking-tight text-navy leading-tight mb-4 md:mb-6">
            Your growth, systematized
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Choose one of our five systems – each a complete suite of services designed to build, grow, convert, automate, and measure your business.
          </p>
        </div>
      </section>

      {/* Tab layout */}
      <section className="py-8 md:py-16 bg-white">
        <div className="page-container flex flex-col lg:flex-row gap-8">
          {/* Left tabs */}
          <div className="w-full lg:w-1/4">
            <ul className="flex flex-col gap-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    className="w-full text-left px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right content */}
          <div className="flex-1">
            {categories.map((cat) => (
              <div key={cat} className={cat === activeCategory ? 'block' : 'hidden'}>
                <h2 className="text-2xl font-black text-navy mb-4">{cat}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {servicesByCategory[cat].map((svc) => (
                    <div key={svc.id} className="p-6 border border-[#CCE0FF] rounded-2xl bg-white hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-4 mb-3">
                        {svc.icon && <img src={svc.icon} alt="" className="w-8 h-8" />}
                        <h3 className="text-xl font-black text-navy">{svc.title}</h3>
                      </div>
                      {svc.subtitle && <p className="text-sm text-[#475569] mb-2">{svc.subtitle}</p>}
                      <p className="text-sm text-[#475569] mb-4">{svc.description}</p>
                      {svc.ctaText && svc.ctaUrl && (
                        <Link href={svc.ctaUrl}>
                          <Button variant="primary" size="sm">{svc.ctaText}</Button>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
            <Link href="/business-score" className="px-6 py-2 bg-white text-navy rounded hover:bg-gray-100 transition">
              Check Business Score
            </Link>
            <Link href="/quotation" className="px-6 py-2 bg-navy text-white rounded hover:bg-blue-800 transition">
              Get a Quotation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
