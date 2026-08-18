import React from 'react'
import Link from 'next/link'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-12 pb-10 md:pt-20 md:pb-14">
      <div className="page-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14 lg:gap-10">
        {/* Branding & Socials */}
        <div className="flex flex-col gap-7 lg:col-span-1">
          <Link href="/" className="flex flex-col items-start self-start" aria-label="Karvao India Homepage">
            <span className="text-2xl font-black text-white tracking-tight leading-none">
              KARVAO
            </span>
            <span className="text-[8px] font-bold text-blue-light uppercase tracking-[0.28em] leading-none mt-0.5">
              INDIA
            </span>
          </Link>
          <p className="text-sm text-[#94A3B8] max-w-sm leading-relaxed">
            Digital growth partner for businesses. We build, attract, convert, automate and measure growth — all under one system.
          </p>
          <div className="flex items-center gap-3 mt-1">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 hover:border-white/20 transition-all" aria-label="LinkedIn Profile">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 hover:border-white/20 transition-all" aria-label="Instagram Profile">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 hover:border-white/20 transition-all" aria-label="WhatsApp Contact">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.638-1.023-5.117-2.887-6.981-1.862-1.865-4.343-2.891-6.985-2.892-5.439 0-9.865 4.423-9.869 9.867-.001 1.748.469 3.453 1.36 4.965l-.995 3.633 3.717-.975zm12.39-7.39c-.273-.137-1.616-.797-1.867-.889-.25-.09-.432-.136-.614.137-.182.273-.705.889-.864 1.072-.158.182-.317.205-.59.069-.272-.137-1.15-.424-2.19-1.353-.809-.721-1.355-1.613-1.514-1.886-.159-.273-.017-.42.12-.556.123-.122.273-.318.41-.477.136-.159.182-.272.272-.455.09-.181.045-.34-.023-.477-.068-.136-.614-1.477-.84-2.022-.221-.532-.443-.46-.614-.469-.159-.008-.341-.01-.523-.01-.182 0-.477.068-.727.341-.25.272-.954.932-.954 2.273 0 1.341.977 2.636 1.114 2.818.137.182 1.923 2.937 4.659 4.116.65.281 1.157.449 1.553.574.654.208 1.25.178 1.72.108.524-.078 1.616-.66 1.843-1.297.227-.636.227-1.182.159-1.296-.068-.113-.25-.181-.523-.318z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 hover:border-white/20 transition-all" aria-label="YouTube Channel">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.872.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Company Column */}
        <div className="flex flex-col gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#64748B]">
            Company
          </span>
          <nav className="flex flex-col gap-1 text-sm text-[#94A3B8]">
            <Link href="/about" className="hover:text-white py-1.5 transition-colors">About Us</Link>
            <Link href="/how-we-work" className="hover:text-white py-1.5 transition-colors">How We Work</Link>
            <Link href="/insights" className="hover:text-white py-1.5 transition-colors">Insights</Link>
            <Link href="/careers" className="hover:text-white py-1.5 transition-colors">Careers</Link>
            <Link href="/contact" className="hover:text-white py-1.5 transition-colors">Contact Us</Link>
          </nav>
        </div>

        {/* Solutions Column */}
        <div className="flex flex-col gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#64748B]">
            Solutions
          </span>
          <nav className="flex flex-col gap-1 text-sm text-[#94A3B8]">
            <Link href="/solutions#build" className="hover:text-white py-1.5 transition-colors">Build</Link>
            <Link href="/solutions#grow" className="hover:text-white py-1.5 transition-colors">Grow</Link>
            <Link href="/solutions#convert" className="hover:text-white py-1.5 transition-colors">Convert</Link>
            <Link href="/solutions#automate" className="hover:text-white py-1.5 transition-colors">Automate</Link>
            <Link href="/solutions#measure" className="hover:text-white py-1.5 transition-colors">Measure</Link>
          </nav>
        </div>

        {/* Industries Column */}
        <div className="flex flex-col gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#64748B]">
            Industries
          </span>
          <nav className="flex flex-col gap-1 text-sm text-[#94A3B8]">
            <Link href="/industries" className="hover:text-white py-1.5 transition-colors">Auto Dealers</Link>
            <Link href="/industries" className="hover:text-white py-1.5 transition-colors">Clinics & Healthcare</Link>
            <Link href="/industries" className="hover:text-white py-1.5 transition-colors">Restaurants & Food</Link>
            <Link href="/industries" className="hover:text-white py-1.5 transition-colors">Real Estate</Link>
            <Link href="/industries" className="hover:text-white py-1.5 transition-colors">Retail & D2C</Link>
            <Link href="/industries" className="hover:text-white py-1.5 transition-colors">Education</Link>
          </nav>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="page-container mt-8 md:mt-14 pt-5 md:pt-7 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-xs text-[#64748B]">
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
        </div>
        <span>
          &copy; {new Date().getFullYear()} Karvao India. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
