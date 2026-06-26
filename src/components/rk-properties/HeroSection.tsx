'use client';

import { useMemo } from 'react';
import { ArrowRight, Phone } from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onScheduleConsult: () => void;
}

export default function HeroSection({ onExploreProjects, onScheduleConsult }: HeroSectionProps) {
  const birds = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: Math.random() * 80 + 10,
    top: Math.random() * 25 + 10,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 15
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

  const stats = [
    { value: "100%", label: "MVDA Approved Plots" },
    { value: "₹450Cr+", label: "Assets Advised & Transacted" },
    { value: "1,200+", label: "NRI & HNIs Advised" },
    { value: "0 Litigation", label: "Pure Clean Registry Guarantee" }
  ];

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex flex-col justify-between bg-gradient-to-b from-gold-50 via-gold-100 to-gold-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-radial from-gold-200/45 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-radial from-gold-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-[80%] h-[350px] bg-gradient-to-b from-gold-100/95 via-gold-200/40 to-transparent blur-2xl rounded-full pointer-events-none" />

      {/* Floating Particles */}
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

      {/* Cinematic Birds */}
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
              transform: `translateY(${Math.sin(b.id) * 15}px)`
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
        {/* Elite Brand Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100 border border-gold-200/50 shadow-xs backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-semibold text-gold-700 tracking-wider uppercase">
              Invest with Absolute Legal Guardians
            </span>
          </div>
        </div>

        {/* Hero Copywriting Block */}
        <div className="text-center max-w-4xl mx-auto select-none">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gold-800 tracking-tight leading-[1.1] mb-6 font-medium">
            Invest Where <span className="text-gold-600 font-serif italic">Faith</span> Meets <br className="hidden sm:inline" />
            <span className="relative inline-block mt-1">
              <span className="relative z-10">Future Wealth</span>
              <span className="absolute left-0 bottom-1 w-full h-[6px] bg-gold-200/60 -z-10 rounded-sm" />
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 font-sans max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Secure high-yielding <span className="font-medium text-gray-800">MVDA Approved Plots</span> in Vrindavan&apos;s high-appreciation corridors. Tailor-made for NRIs and elite professionals seeking complete legal transparency and spiritual inheritance.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <button
              onClick={onExploreProjects}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-800 text-white font-medium hover:bg-gold-700 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
            >
              Explore MVDA Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onScheduleConsult}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-gold-800 border border-gold-200/60 shadow-xs hover:border-gold-500 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-medium"
            >
              <Phone className="w-4 h-4 text-gold-600" />
              Book Site Visit
            </button>
          </div>
        </div>
      </div>

      {/* Trust Pillars Bar */}
      <div className="max-w-7xl mx-auto w-full relative z-10 border-t border-gold-200/40 pt-10 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center select-none">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-serif text-gold-600 font-semibold mb-1">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-widest leading-normal">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}