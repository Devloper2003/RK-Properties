'use client';

import { ArrowUp, MessageCircle } from 'lucide-react';
import { useScrolledPast, useScrollProgress } from '@/hooks/use-scroll-animations';
import { usePropertyStore } from '@/store/use-property-store';

export default function FloatingActions() {
  const scrolled = useScrolledPast(500);
  const progress = useScrollProgress();
  const { scrollToId } = usePropertyStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      'Namaste! I am interested in MVDA-approved plots in Vrindavan. Please share details about available investment opportunities.'
    );
    window.open(`https://wa.me/919115277000?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div
          className="h-full bg-gradient-to-r from-gold-500 via-gold-600 to-gold-700 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-gold-800 text-white shadow-xl hover:bg-gold-600 hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
          scrolled
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>

      {/* WhatsApp CTA */}
      <button
        onClick={openWhatsApp}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
      >
        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">WhatsApp Us</span>
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
      </button>
    </>
  );
}