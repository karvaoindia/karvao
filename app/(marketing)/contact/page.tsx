import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Contact – Karvao India',
  description: 'Get in touch with Karvao India to start building your growth engine.',
  alternates: { canonical: '/contact' },
};

export const revalidate = 60;

export default async function ContactPage() {
  // Fetch optional content from SiteContent
  const content = await prisma.siteContent.findFirst({ where: { page: 'contact' } });

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-white border-b border-border">
        <div className="page-container text-center">
          <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">
            CONTACT
          </span>
          <h1 className="text-[28px] sm:text-4xl md:text-[52px] font-black tracking-tight text-navy leading-tight mb-4 md:mb-6">
            Let's build something amazing together
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Fill the form below or reach us via phone, email, or WhatsApp.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 md:py-16 bg-white">
        <div className="page-container max-w-3xl mx-auto">
          <form action="/api/contact" method="POST" className="grid grid-cols-1 gap-6">
            <input type="text" name="name" required placeholder="Your Name" className="p-3 border rounded" />
            <input type="email" name="email" required placeholder="Email" className="p-3 border rounded" />
            <input type="tel" name="phone" placeholder="Phone" className="p-3 border rounded" />
            <input type="text" name="company" placeholder="Company" className="p-3 border rounded" />
            <select name="reason" className="p-3 border rounded" defaultValue="">
              <option value="" disabled>Select reason</option>
              <option value="quotation">Quotation Request</option>
              <option value="partnership">Partnership</option>
              <option value="career">Career Inquiry</option>
              <option value="other">Other</option>
            </select>
            <textarea name="message" rows={4} placeholder="Your Message" className="p-3 border rounded" />
            <Button variant="primary" type="submit">Send Message</Button>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-8 md:py-16 bg-blue-surface">
        <div className="page-container flex flex-col md:flex-row justify-center items-center gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-black text-navy">Call Us</h3>
            <p className="text-[#475569]">+91 12345 67890</p>
          </div>
          <div>
            <h3 className="text-lg font-black text-navy">Email Us</h3>
            <p className="text-[#475569]">info@karvao.in</p>
          </div>
          <div>
            <h3 className="text-lg font-black text-navy">Visit Us</h3>
            <p className="text-[#475569]">Bangalore, India</p>
          </div>
        </div>
        {/* Floating WhatsApp CTA */}
        <a
          href="https://wa.me/911234567890"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
          aria-label="WhatsApp Chat"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 2.12.66 4.09 1.79 5.73L2 22l4.45-1.71C8.09 21.34 9.99 22 12 22c5.52 0 10-4.48 10-10s-4.48-10-10-10z"/>
          </svg>
        </a>
      </section>
    </div>
  );
}
