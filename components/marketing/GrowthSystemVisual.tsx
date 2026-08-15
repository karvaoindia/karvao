'use client'

import React from 'react'

export const GrowthSystemVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[500px] h-[500px] mx-auto select-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#B3CFE5" />
          </marker>
        </defs>

        <path d="M 34 50 C 5 150, 5 350, 34 460" stroke="#0066FF" strokeWidth="2" strokeDasharray="5,4" strokeOpacity="0.5" fill="none" />
        <path d="M 60 50 Q 210 50 380 250" stroke="#B3CFE5" strokeWidth="2" strokeDasharray="5,4" fill="none" markerEnd="url(#arrow)" />
        <path d="M 60 155 Q 210 155 380 250" stroke="#B3CFE5" strokeWidth="2" strokeDasharray="5,4" fill="none" markerEnd="url(#arrow)" />
        <path d="M 60 250 L 380 250" stroke="#B3CFE5" strokeWidth="2" strokeDasharray="5,4" fill="none" markerEnd="url(#arrow)" />
        <path d="M 60 355 Q 210 355 380 250" stroke="#B3CFE5" strokeWidth="2" strokeDasharray="5,4" fill="none" markerEnd="url(#arrow)" />
        <path d="M 60 460 Q 210 460 380 250" stroke="#B3CFE5" strokeWidth="2" strokeDasharray="5,4" fill="none" markerEnd="url(#arrow)" />
      </svg>

      {/* Node 1: BUILD */}
      <div className="absolute top-[28px] left-[14px] flex items-center gap-3 animate-[slideUpFade_2s_ease-out_0.3s_both]">
        <div className="w-11 h-11 rounded-full bg-white border border-border shadow-sm flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-blue-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-black tracking-wider text-navy leading-none">BUILD</span>
          <span className="text-[9px] text-grey font-bold leading-none mt-1 whitespace-nowrap">Digital Presence</span>
        </div>
      </div>

      {/* Node 2: ATTRACT */}
      <div className="absolute top-[133px] left-[14px] flex items-center gap-3 animate-[slideUpFade_2s_ease-out_1.1s_both]">
        <div className="w-11 h-11 rounded-full bg-white border border-border shadow-sm flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-blue-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-black tracking-wider text-navy leading-none">ATTRACT</span>
          <span className="text-[9px] text-grey font-bold leading-none mt-1 whitespace-nowrap">Generate Demand</span>
        </div>
      </div>

      {/* Node 3: CONVERT */}
      <div className="absolute top-[228px] left-[14px] flex items-center gap-3 animate-[slideUpFade_2s_ease-out_1.9s_both]">
        <div className="w-11 h-11 rounded-full bg-white border border-border shadow-sm flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-blue-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-black tracking-wider text-navy leading-none">CONVERT</span>
          <span className="text-[9px] text-grey font-bold leading-none mt-1 whitespace-nowrap">Turn Leads into Customers</span>
        </div>
      </div>

      {/* Node 4: AUTOMATE */}
      <div className="absolute top-[333px] left-[14px] flex items-center gap-3 animate-[slideUpFade_2s_ease-out_2.7s_both]">
        <div className="w-11 h-11 rounded-full bg-white border border-border shadow-sm flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-blue-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-black tracking-wider text-navy leading-none">AUTOMATE</span>
          <span className="text-[9px] text-grey font-bold leading-none mt-1 whitespace-nowrap">Streamline Operations</span>
        </div>
      </div>

      {/* Node 5: MEASURE */}
      <div className="absolute top-[438px] left-[14px] flex items-center gap-3 animate-[slideUpFade_2s_ease-out_3.5s_both]">
        <div className="w-11 h-11 rounded-full bg-white border border-border shadow-sm flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-blue-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
          </svg>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-black tracking-wider text-navy leading-none">MEASURE</span>
          <span className="text-[9px] text-grey font-bold leading-none mt-1 whitespace-nowrap">Track &amp; Improve</span>
        </div>
      </div>

      {/* Right Central Node: GROWTH */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[320px] w-36 h-36 rounded-full bg-[#F0F6FF] border-2 border-blue-bright/20 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(0,102,255,0.12)] animate-[fadeIn_2s_ease-out_4.2s_both]">
        <svg className="w-7 h-7 text-blue-bright mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <span className="text-xs font-black tracking-widest text-navy leading-none">GROWTH</span>
        <span className="text-[8px] font-bold text-blue-medium uppercase tracking-tight mt-1 leading-normal max-w-[80px]">Sustainable &amp; Scalable</span>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9) translateY(-50%); }
          to { opacity: 1; transform: scale(1) translateY(-50%); }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
