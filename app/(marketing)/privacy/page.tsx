import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Karvao India collects, uses and protects the information you share with us.',
}

export default function PrivacyPage() {
  return (
    <div className="w-full bg-white">
      <section className="py-16 md:py-20 bg-white border-b border-border">
        <div className="page-container max-w-3xl">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">LEGAL</span>
          <h1 className="text-4xl md:text-[44px] font-black tracking-tight text-navy leading-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-sm text-grey">Last updated: 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="page-container max-w-3xl flex flex-col gap-8 text-[#475569] leading-relaxed">
          <div>
            <h2 className="text-xl font-black text-navy mb-3">Information we collect</h2>
            <p>
              When you use our Business Score assessment, request a quotation, or contact us, we collect the details you provide directly — such as your name, email, phone number, company and answers to assessment questions. We do not collect this information through any other means.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-black text-navy mb-3">How we use it</h2>
            <p>
              We use the information you share to generate your assessment report, respond to quotation requests, and follow up about your project. We do not sell your information to third parties.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-black text-navy mb-3">How we store it</h2>
            <p>
              Your information is stored securely in our database and is only accessible to our team. Assessment reports are accessible via a unique link and are not indexed publicly.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-black text-navy mb-3">Your rights</h2>
            <p>
              You can ask us to update or delete your information at any time by emailing{' '}
              <a href="mailto:hello@karvao.in" className="text-blue-bright font-semibold hover:underline">
                hello@karvao.in
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
