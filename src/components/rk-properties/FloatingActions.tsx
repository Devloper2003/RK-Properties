'use client';

import { useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import { useScrolledPast, useScrollProgress } from '@/hooks/use-scroll-animations';
import { usePropertyStore } from '@/store/use-property-store';

function CircularProgress({ progress }: { progress: number }) {
  const size = 52;
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="absolute inset-0 -rotate-90"
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* Background track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={strokeWidth}
      />
      {/* Progress arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-[stroke-dashoffset] duration-150 ease-out"
      />
    </svg>
  );
}

export default function FloatingActions() {
  const scrolled = useScrolledPast(500);
  const progress = useScrollProgress();
  const { scrollToId } = usePropertyStore();

  const displayPercent = useMemo(() => Math.round(progress), [progress]);

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

      {/* Back to Top with Circular Progress */}
      <button
        onClick={scrollToTop}
        aria-label={`Back to top — ${displayPercent}% scrolled`}
        className={`fixed bottom-6 right-6 z-50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
          scrolled
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="relative w-[52px] h-[52px] rounded-full bg-gold-800 hover:bg-gold-600 transition-colors flex items-center justify-center">
          <CircularProgress progress={progress} />
          <span className="relative z-10 text-white font-mono text-[11px] font-bold leading-none">
            {displayPercent}
          </span>
        </div>
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