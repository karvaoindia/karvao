import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers',
  description: "Karvao India isn't hiring for open roles right now, but we're always glad to hear from people who want to build growth systems with us.",
}

export default function CareersPage() {
  return (
    <div className="w-full bg-white">
      <section className="py-16 md:py-20 bg-white border-b border-border">
        <div className="page-container max-w-3xl">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">CAREERS</span>
          <h1 className="text-4xl md:text-[52px] font-black tracking-tight text-navy leading-tight mb-6">
            Build growth systems with us.
          </h1>
          <p className="text-base md:text-lg text-[#475569] leading-relaxed">
            We&apos;re a small team working across strategy, technology and execution to help businesses grow. There are no open roles listed right now, but we&apos;re always glad to hear from people who care about doing this work well.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="page-container max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-black text-navy mb-4">Interested in working with us?</h2>
          <p className="text-[#475569] leading-relaxed mb-4">
            Send us a note with a bit about yourself and what you&apos;d want to work on at{' '}
            <a href="mailto:hello@karvao.in" className="text-blue-bright font-semibold hover:underline">
              hello@karvao.in
            </a>
            . We keep every message on file and reach out when something fits.
          </p>
        </div>
      </section>
    </div>
  )
}
