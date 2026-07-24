'use client';

import { useMemo, useEffect, useState } from 'react';
import { ArrowRight, Phone, ChevronDown, Sparkles } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/use-scroll-animations';
import { useToast } from '@/components/rk-properties/ToastProvider';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onScheduleConsult: () => void;
}

function AnimatedStat({ target, suffix, prefix, label, delay }: { target: number; suffix?: string; prefix?: string; label: string; delay?: number }) {
  const { count, ref } = useAnimatedCounter(target, 2200, true);
  const display = target === 0
    ? '0'
    : `${prefix ?? ''}${count.toLocaleString('en-IN')}${suffix ?? ''}`;

  return (
    <div
      ref={ref}
      className="stat-card flex flex-col items-center text-center px-4 py-5"
      style={{ animationDelay: `${delay ?? 0}ms` }}
    >
      <span className="text-2xl sm:text-3xl font-serif text-gradient-gold font-semibold mb-1.5">
        {display}
      </span>
      <span className="text-[10px] sm:text-xs font-mono text-white/50 uppercase tracking-widest leading-normal">
        {label}
      </span>
    </div>
  );
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-[2px] h-[1em] bg-gold-500 ml-0.5 animate-pulse align-middle" style={{ opacity: displayed.length < text.length ? 1 : 0 }} />
    </span>
  );
}

const HERO_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80';

export default function HeroSection({ onExploreProjects, onScheduleConsult }: HeroSectionProps) {
  const { addToast } = useToast();
  const [loaded, setLoaded] = useState(false);

  const particles = useMemo(() => Array.from({ length: 12 }).map((_, idx) => ({
    id: idx,
    left: Math.random() * 100,
    top: Math.random() * 90,
    w: Math.random() * 4 + 1,
    h: Math.random() * 4 + 1,
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
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#0a0a0f]">
      {/* Background Image with Slow Zoom */}
      <div className="absolute inset-0 z-0">
        {!loaded && <div className="absolute inset-0 bg-[#0a0a0f]" />}
        <img
          src={HERO_IMAGE}
          alt="Luxury property in Vrindavan"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          referrerPolicy="no-referrer"
          style={{ animation: 'heroSlowZoom 25s ease-in-out infinite alternate' }}
        />
        <div className="video-overlay absolute inset-0 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/80 via-transparent to-[#0a0a0f]/60 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/30 to-[#0a0a0f]/50 z-[3]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-[4]">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-gold-500/15 animate-pulse"
            style={{
              width: `${p.w}px`, height: `${p.h}px`,
              left: `${p.left}%`, top: `${p.top}%`,
              animationDuration: `${p.dur}s`, animationDelay: `${p.del}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-[4] overflow-hidden">
        <div className="animate-gentle-float absolute top-[15%] left-[8%] w-20 h-20 rounded-full bg-gold-500/5 blur-2xl" />
        <div className="animate-gentle-float absolute bottom-[30%] right-[10%] w-32 h-32 rounded-full bg-gold-500/5 blur-3xl" style={{ animationDelay: '2s' }} />
        <div className="animate-float-up absolute top-[25%] right-[15%] text-gold-500/20 text-2xl select-none" style={{ animationDelay: '1s' }}>✦</div>
        <div className="animate-float-up absolute top-[40%] left-[12%] text-gold-500/15 text-lg select-none" style={{ animationDelay: '3s' }}>✦</div>
        <div className="animate-gentle-float absolute top-[60%] left-[5%] text-gold-500/10 text-sm select-none" style={{ animationDelay: '1.5s' }}>✧</div>
      </div>

      {/* Noise Texture */}
      <div className="noise-overlay absolute inset-0 z-[5] pointer-events-none" />

      {/* Main Content */}
      <div data-animate="reveal-up" className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex justify-start mb-8 animate-hero-text">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.06] border border-gold-500/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-ping" />
              <span className="text-[10px] sm:text-xs font-mono font-semibold text-gold-400 tracking-wider uppercase">
                MVDA Approved • Zero Litigation
              </span>
            </div>
          </div>

          <div className="animate-hero-text animate-hero-text-delay-1 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.05] mb-6 font-medium">
              <span className="text-gradient-gold">Discover Sacred</span>
              <br />
              <span className="text-white">Luxury Living in </span>
              <span className="relative inline-block">
                <span className="text-gradient-gold">Vrindavan</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-500 to-gold-500/60 rounded-full" />
              </span>
            </h1>
          </div>

          <div className="animate-hero-text animate-hero-text-delay-2 mb-10">
            <p className="text-base sm:text-lg md:text-xl text-white/60 font-sans max-w-2xl leading-relaxed font-light">
              <TypewriterText text="Secure high-yielding MVDA Approved Plots in Vrindavan's high-appreciation corridors. Tailor-made for NRIs and elite professionals." delay={600} />
            </p>
          </div>

          <div className="animate-hero-text animate-hero-text-delay-3 flex flex-col sm:flex-row items-start gap-4 max-w-lg">
            <button
              onClick={onExploreProjects}
              className="btn-luxury w-full sm:w-auto px-8 py-4 rounded-full text-white font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4" />
              Explore Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleBookSiteVisit}
              className="btn-luxury-outline w-full sm:w-auto px-8 py-4 rounded-full font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <Phone className="w-4 h-4" />
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Floating Glassmorphism Stat Cards */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4" data-animate-stagger>
            <div data-animate style={{ '--stagger-idx': 0 } as React.CSSProperties}>
              <AnimatedStat target={20} suffix="M+" label="Annual Visitors" delay={0} />
            </div>
            <div data-animate style={{ '--stagger-idx': 1 } as React.CSSProperties}>
              <AnimatedStat target={24} suffix="%" label="CAGR Growth" delay={100} />
            </div>
            <div data-animate style={{ '--stagger-idx': 2 } as React.CSSProperties}>
              <AnimatedStat target={4} suffix="" label="Premium Projects" delay={200} />
            </div>
            <div data-animate style={{ '--stagger-idx': 3 } as React.CSSProperties}>
              <AnimatedStat target={100} suffix="%" label="MVDA Approved" delay={300} />
            </div>
          </div>
          <p className="text-center mt-3 text-[9px] sm:text-[10px] font-mono text-white/30 uppercase tracking-widest">
            0 Litigation — Clean Title Verified on Every Plot
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center pb-6 relative z-10">
        <button
          onClick={onExploreProjects}
          className="flex flex-col items-center gap-1.5 text-gold-500/50 hover:text-gold-400 transition-colors cursor-pointer group"
          aria-label="Scroll to explore"
        >
          <span className="text-[9px] font-mono uppercase tracking-widest group-hover:tracking-[0.3em] transition-all">Scroll to Explore</span>
          <ChevronDown className="w-5 h-5 animate-scroll-bounce" />
        </button>
      </div>
    </section>
  );
}
