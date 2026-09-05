import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Our Solutions – Karvao India',
  description: 'The five‑system growth engine: Build, Grow, Convert, Automate, Measure – all working together.',
  alternates: { canonical: '/solutions' },
};

export const revalidate = 60;

export default async function SolutionsPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { sortOrder: 'asc' },
  });

  const systemOrder = ['Build', 'Grow', 'Convert', 'Automate', 'Measure'];

  const getServiceByCategory = (cat: string) =>
    services.filter((s) => s.category?.toLowerCase() === cat.toLowerCase());

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-white border-b border-border">
        <div className="page-container text-center">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">
            SOLUTIONS
          </span>
          <h1 className="text-[28px] sm:text-4xl md:text-[52px] font-black tracking-tight text-navy leading-tight mb-4 md:mb-6">
            Five systems. One growth engine.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Build, Grow, Convert, Automate, Measure – all interconnected to drive sustainable growth.
          </p>
        </div>
      </section>

      {/* System sections */}
      <section className="py-8 md:py-16 bg-white">
        <div className="page-container flex flex-col gap-16">
          {systemOrder.map((system, idx) => {
            const svcList = getServiceByCategory(system);
            const isEven = idx % 2 === 0;
            return (
              <div
                key={system}
                id={system.toLowerCase()}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                {/* Text side */}
                <div className={isEven ? '' : 'md:order-2'}>
                  <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-2">
                    {system.toUpperCase()}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">{system}</h2>
                  <p className="text-sm text-[#475569] mb-4 max-w-lg">
                    {/* Placeholder description – could be pulled from SiteContent later */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. {system} provides the foundational elements to accelerate your business.
                  </p>
                  <ul className="flex flex-col gap-2 mb-4">
                    {svcList.map((svc) => (
                      <li key={svc.id} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-bright" />
                        {svc.title}
                      </li>
                    ))}
                  </ul>
                  <Link href="/quotation" tabIndex={-1}>
                    <Button variant="primary" size="sm">Get started</Button>
                  </Link>
                </div>
                {/* Visual side */}
                <div className="flex items-center justify-center min-h-[220px] border border-[#CCE0FF] bg-blue-surface rounded-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white border border-[#CCE0FF] flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-black text-blue-bright">{system[0]}</span>
                    </div>
                    <span className="text-sm font-black tracking-wider text-navy uppercase">{system}</span>
                  </div>
                </div>
              </div>
            );
          })}
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
