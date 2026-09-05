import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Careers – Karvao India',
  description: 'Join the Karvao India team and help shape the future of digital growth for businesses.',
  alternates: { canonical: '/careers' },
};

export const revalidate = 60;

export default async function CareersPage() {
  const jobs = await prisma.jobListing.findMany({
    where: { published: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-white border-b border-border">
        <div className="page-container text-center">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">
            CAREERS
          </span>
          <h1 className="text-[28px] sm:text-4xl md:text-[52px] font-black tracking-tight text-navy leading-tight mb-4 md:mb-6">
            Grow with us
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            We foster a culture of growth, impact, and people‑first values. Explore our open roles.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-8 md:py-16 bg-white">
        <div className="page-container grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-2xl text-center">
            <h3 className="text-xl font-black text-navy mb-2">Growth Mindset</h3>
            <p className="text-sm text-[#475569]">We learn fast, iterate, and celebrate progress.</p>
          </div>
          <div className="p-6 border rounded-2xl text-center">
            <h3 className="text-xl font-black text-navy mb-2">Impact at Scale</h3>
            <p className="text-sm text-[#475569]">Your work reaches thousands of businesses.</p>
          </div>
          <div className="p-6 border rounded-2xl text-center">
            <h3 className="text-xl font-black text-navy mb-2">People First</h3>
            <p className="text-sm text-[#475569]">We prioritize well‑being and collaboration.</p>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-8 md:py-16 bg-white">
        <div className="page-container">
          <h2 className="text-3xl font-black text-navy mb-8 text-center">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded">
                <div>
                  <h3 className="text-xl font-black text-navy">{job.title}</h3>
                  <p className="text-sm text-[#475569]">{job.department} – {job.location}</p>
                </div>
                <Link href={job.applyUrl ?? '#'}>
                  <Button variant="primary" size="sm">Apply</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-16 border-t border-[#CCE0FF] bg-blue-surface">
        <div className="page-container text-center">
          <h2 className="text-2xl md:text-3xl font-black text-navy mb-4">
            Ready to join the growth engine?
          </h2>
          <p className="text-[#475569] mb-8 max-w-lg mx-auto">
            Send us your résumé or reach out directly.
          </p>
          <Link href="mailto:careers@karvao.in" className="px-6 py-2 bg-navy text-white rounded hover:bg-blue-800 transition">
            Email Careers
          </Link>
        </div>
      </section>
    </div>
  );
}
