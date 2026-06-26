'use client';

import { Instagram, Youtube, Facebook, Linkedin, ArrowUp, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { usePropertyStore } from '@/store/use-property-store';
import NewsletterSection from '@/components/rk-properties/NewsletterSection';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  const { scrollToId } = usePropertyStore();

  return (
    <footer className="mt-auto bg-gradient-to-br from-gold-800 via-gold-900 to-gold-900 text-gold-100/80 pt-0 pb-12 select-none">
      {/* Decorative gold gradient line at the top */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      {/* Decorative mandala ornament */}
      <div className="flex justify-center -mt-4 relative z-10">
        <div className="w-8 h-8 rounded-full bg-gold-800 border-2 border-gold-500/40 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold-500/60">
            <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="currentColor" opacity="0.6"/>
            <circle cx="8" cy="8" r="2" fill="currentColor"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-gold-700/30 pb-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="text-xl font-serif font-bold text-white tracking-tight block hover:text-gold-300 transition-colors">RK PROPERTIES</Link>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              A majestic synthesis of absolute title security, professional real estate consulting services, and sacred living opportunities in Vrindavan Dham. Built on three core pillars: Trust, Transparency, and Value.
            </p>
            <div className="text-[10px] font-mono text-gold-400">
              <span>RERA ID: UPRERAAGT11245 (Approved Uttar Pradesh State Category)</span>
            </div>

            {/* Connect With Us */}
            <div className="pt-2">
              <span className="text-white font-mono uppercase tracking-wider font-bold text-xs block mb-3">Connect with us</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-gold-700/30 border border-gold-600/20 flex items-center justify-center text-gold-400 hover:text-white hover:bg-gold-600/50 hover:border-gold-500/40 transition-all duration-200 cursor-pointer"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs uppercase tracking-wider">
            <span className="text-white block font-bold mb-1">Dham Assets</span>
            <button onClick={() => scrollToId('project-showcase-section')} className="block text-gray-400 hover:text-gold-300 cursor-pointer text-left transition-colors duration-200">Gated Townships</button>
            <button onClick={() => scrollToId('project-showcase-section')} className="block text-gray-400 hover:text-gold-300 cursor-pointer text-left transition-colors duration-200">Residential Plots</button>
            <button onClick={() => scrollToId('project-showcase-section')} className="block text-gray-400 hover:text-gold-300 cursor-pointer text-left transition-colors duration-200">Investment Meadow</button>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs uppercase tracking-wider">
            <span className="text-white block font-bold mb-1">Quick Links</span>
            <button onClick={() => scrollToId('our-strategy')} className="block text-gray-400 hover:text-gold-300 cursor-pointer text-left transition-colors duration-200">Our Strategy</button>
            <button onClick={() => scrollToId('faq-section-anchor')} className="block text-gray-400 hover:text-gold-300 cursor-pointer text-left transition-colors duration-200">Legal FAQ Registry</button>
            <button onClick={() => scrollToId('contact-experience')} className="block text-gray-400 hover:text-gold-300 cursor-pointer text-left transition-colors duration-200">Book Site Visit</button>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-3 text-xs leading-relaxed text-gray-400">
            <span className="text-white font-mono uppercase tracking-wider font-bold block mb-1">Corporate Headquarters</span>
            <p>Chhatikara-Vrindavan Link Road, directly near Prem Mandir Perimeter gate, Vrindavan, Mathura District, Uttar Pradesh - 281121</p>
            <p className="font-mono text-[11px] text-white">Representative Desk: listing.services@rkproperties.in</p>
          </div>
        </div>

        {/* Newsletter */}
        <NewsletterSection />

        {/* Certified by RERA */}
        <div className="flex items-center justify-center gap-2 mb-6 animate-breathe">
          <ShieldCheck className="w-4 h-4 text-gold-500" />
          <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest">Certified by RERA Uttar Pradesh &middot; UPRERAAGT11245</span>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-gray-500 gap-4">
          <span className="text-center sm:text-left">&copy; 2026 RK Properties Ltd. All rights reserved globally. RERA agent compliance assured.</span>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">DISCLAIMER: All land boundaries undergo statutory approvals. Historical ROI figures are for forecasting models only.</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              <ArrowUp className="w-3 h-3" />
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}