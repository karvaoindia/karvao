'use client'

import React from 'react'

interface SolutionItem {
  id: string
  label: string
  icon: React.ReactNode
  bullets: string[]
}

export const SolutionsSection: React.FC = () => {
  const solutions: SolutionItem[] = [
    {
      id: 'build',
      label: 'Build',
      icon: (
        <svg className="w-5 h-5 text-blue-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      bullets: ['Website Development', 'E-commerce', 'Shopify', 'Branding'],
    },
    {
      id: 'grow',
      label: 'Grow',
      icon: (
        <svg className="w-5 h-5 text-blue-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      bullets: ['SEO', 'Social Media', 'Meta Ads', 'Google Ads'],
    },
    {
      id: 'convert',
      label: 'Convert',
      icon: (
        <svg className="w-5 h-5 text-blue-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bullets: ['CRM', 'Lead Management', 'Conversion Systems', 'Sales Enablement'],
    },
    {
      id: 'automate',
      label: 'Automate',
      icon: (
        <svg className="w-5 h-5 text-blue-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      bullets: ['WhatsApp Automation', 'Workflow Automation', 'Integrations', 'Chatbots'],
    },
    {
      id: 'measure',
      label: 'Measure',
      icon: (
        <svg className="w-5 h-5 text-blue-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      ),
      bullets: ['Analytics', 'Tracking', 'Reporting', 'Dashboards'],
    },
  ]

  return (
    <section className="py-14 md:py-24 bg-white border-t border-border" id="solutions">
      <div className="page-container">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">
            SOLUTIONS
          </span>
          <h2 className="text-[24px] sm:text-3xl md:text-[40px] font-extrabold tracking-tight text-navy leading-tight">
            Everything your business needs to move forward.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {solutions.map((item) => (
            <a
              key={item.id}
              href={`/solutions#${item.id}`}
              className="group relative bg-white border border-border rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:border-blue-bright/25 hover:shadow-[0_8px_32px_rgba(0,102,255,0.08)]"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F0F6FF] text-blue-bright flex items-center justify-center border border-[#CCE0FF]/60 mb-7 group-hover:bg-blue-bright group-hover:text-white group-hover:border-blue-bright transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-extrabold text-navy mb-4">
                  {item.label}
                </h3>
                <ul className="flex flex-col gap-2.5 mb-6">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-[13px] text-[#475569] font-medium leading-normal">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-navy group-hover:text-blue-bright transition-colors">
                <span>Explore</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
