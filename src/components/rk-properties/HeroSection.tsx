'use client';

import { useMemo } from 'react';
import { ArrowRight, Phone, ChevronDown } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/use-scroll-animations';
import { useToast } from '@/components/rk-properties/ToastProvider';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onScheduleConsult: () => void;
}

/* ── Small sub-component so each counter gets its own hook instance ── */
function AnimatedStat({ target, suffix, prefix, label }: { target: number; suffix?: string; prefix?: string; label: string }) {
  const { count, ref } = useAnimatedCounter(target, 2200, true);
  const display = target === 0
    ? '0'
    : `${prefix ?? ''}${count.toLocaleString('en-IN')}${suffix ?? ''}`;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="text-2xl sm:text-3xl font-serif text-gold-600 dark:text-gold-400 font-semibold mb-1">
        {display}
      </span>
      <span className="text-[10px] sm:text-xs font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest leading-normal">
        {label}
      </span>
    </div>
  );
}

export default function HeroSection({ onExploreProjects, onScheduleConsult }: HeroSectionProps) {
  const { addToast } = useToast();

  const birds = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: Math.random() * 80 + 10,
    top: Math.random() * 25 + 10,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 15,
  })), []);

  const particles = useMemo(() => Array.from({ length: 15 }).map((_, idx) => ({
    id: idx,
    left: Math.random() * 100,
    top: Math.random() * 90,
    w: Math.random() * 6 + 2,
    h: Math.random() * 6 + 2,
    dur: Math.random() * 5 + 3,
    del: Math.random() * 4,
  })), []);

  const handleBookSiteVisit = () => {
    onScheduleConsult();
    addToast({
      type: 'success',
      title: 'Site Visit Requested',
      message: 'Our concierge team will contact you within 2 hours to plan your Vrindavan site tour.',
    });
  };

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex flex-col justify-between bg-gradient-to-b from-gold-50 via-gold-100 to-gold-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8 noise-overlay">
      {/* ── Ornamental border frame ── */}
      <div className="absolute inset-3 sm:inset-6 border border-gold-300/25 dark:border-gold-700/15 rounded-2xl pointer-events-none z-0" />
      <div className="absolute inset-4 sm:inset-7 border border-gold-200/15 dark:border-gold-800/10 rounded-xl pointer-events-none z-0" />

      {/* ── Enhanced background layers ── */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-radial from-gold-200/45 dark:from-gold-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-radial from-gold-600/10 dark:from-gold-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-[80%] h-[350px] bg-gradient-to-b from-gold-100/95 dark:from-gray-800/50 via-gold-200/40 dark:via-gold-700/10 to-transparent blur-2xl rounded-full pointer-events-none" />
      {/* Extra warm glow layer */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-radial from-gold-300/20 via-gold-100/10 to-transparent blur-[80px] pointer-events-none" />
      {/* Diagonal accent sweep */}
      <div
        className="absolute top-0 right-0 w-[45%] h-full pointer-events-none opacity-[0.04]"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, rgba(180,130,50,0.6) 50%, transparent 70%)',
        }}
      />

      {/* ── Floating Particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-gold-500/20 animate-pulse"
            style={{
              width: `${p.w}px`,
              height: `${p.h}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.del}s`,
            }}
          />
        ))}
      </div>

      {/* ── Cinematic Birds ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {birds.map((b) => (
          <span
            key={b.id}
            className="absolute text-gold-600/10 pointer-events-none select-none italic text-xs tracking-widest font-serif transition-transform duration-1000 animate-pulse"
            style={{
              left: `${b.left}%`,
              top: `${b.top}%`,
              fontSize: `${b.size}px`,
              animationDelay: `${b.delay}s`,
              transform: `translateY(${Math.sin(b.id) * 15}px)`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* ── Main scroll-triggered content ── */}
      <div
        data-animate
        className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center"
      >
        {/* Elite Brand Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100 dark:bg-gold-900/60 border border-gold-200/50 dark:border-gold-700/30 shadow-xs backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-semibold text-gold-700 dark:text-gold-300 tracking-wider uppercase">
              Invest with Absolute Legal Guardians
            </span>
          </div>
        </div>

        {/* Hero Copywriting Block */}
        <div className="text-center max-w-4xl mx-auto select-none">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gold-800 dark:text-gold-100 tracking-tight leading-[1.1] mb-6 font-medium">
            Invest Where <span className="text-gold-600 font-serif italic">Faith</span> Meets
            <br className="hidden sm:inline" />
            <span className="relative inline-block mt-1">
              <span className="relative z-10">Future Wealth</span>
              {/* Gold underline decoration */}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-1 w-[110%] h-[6px] rounded-sm bg-gradient-to-r from-transparent via-gold-400/80 to-transparent" />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0.5 w-[80%] h-[3px] rounded-sm bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 font-sans max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Secure high-yielding <span className="font-medium text-gray-800 dark:text-gold-200">MVDA Approved Plots</span> in
            Vrindavan&apos;s high-appreciation corridors. Tailor-made for NRIs and elite professionals seeking
            complete legal transparency and spiritual inheritance.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <button
              onClick={onExploreProjects}
              className="hero-btn-shimmer w-full sm:w-auto px-8 py-4 rounded-full bg-gold-800 text-white font-medium hover:bg-gold-700 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
            >
              Explore MVDA Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleBookSiteVisit}
              className="hero-btn-shimmer w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-gray-800 text-gold-800 dark:text-gold-200 border border-gold-200/60 dark:border-gold-700/40 shadow-xs hover:border-gold-500 dark:hover:border-gold-600 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-medium"
            >
              <Phone className="w-4 h-4 text-gold-600" />
              Book Site Visit
            </button>
          </div>
        </div>
      </div>

      {/* ── Trust Pillars Bar with Animated Counters ── */}
      <div className="max-w-7xl mx-auto w-full relative z-10 border-t border-gold-200/40 dark:border-gold-800/30 pt-10 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center select-none">
          <AnimatedStat target={100} suffix="%" label="MVDA Approved Plots" />
          <AnimatedStat target={450} prefix="₹" suffix="Cr+" label="Assets Advised & Transacted" />
          <AnimatedStat target={1200} suffix="+" label="NRI & HNIs Advised" />
          <AnimatedStat target={0} label="Pure Clean Registry Guarantee" />
        </div>
        <p className="text-center mt-3 text-[9px] sm:text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          0 Litigation — Clean Title Verified on Every Plot
        </p>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="flex justify-center mt-8 relative z-10">
        <button
          onClick={onExploreProjects}
          className="flex flex-col items-center gap-1.5 text-gold-500/60 hover:text-gold-600 transition-colors cursor-pointer group"
          aria-label="Scroll to explore"
        >
          <span className="text-[9px] font-mono uppercase tracking-widest group-hover:tracking-[0.3em] transition-all">Scroll to Explore</span>
          <ChevronDown className="w-5 h-5 animate-scroll-bounce" />
        </button>
      </div>

      {/* ── Scoped shimmer keyframes ── */}
      <style jsx>{`
        .hero-btn-shimmer {
          position: relative;
          overflow: hidden;
        }
        .hero-btn-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0) 30%,
            rgba(255, 255, 255, 0.25) 50%,
            rgba(255, 255, 255, 0) 70%,
            transparent 100%
          );
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .hero-btn-shimmer:hover::after {
          left: 120%;
        }
      `}</style>
    </section>
  );
}