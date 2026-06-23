import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onScheduleConsult: () => void;
  onOpenBlueprint: () => void;
}

export default function HeroSection({ onExploreProjects, onScheduleConsult, onOpenBlueprint }: HeroSectionProps) {
  const [birds, setBirds] = useState<{ id: number; left: number; top: number; size: number; delay: number }[]>([]);
  const [activeAd, setActiveAd] = useState(0);

  // Generate subtle birds with beautiful fly motions
  useEffect(() => {
    const list = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 80 + 10,
      top: Math.random() * 25 + 10,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 15
    }));
    setBirds(list);
  }, []);

  const stats = [
    { value: "100%", label: "MVDA Approved Plots" },
    { value: "₹450Cr+", label: "Assets Advised & Transacted" },
    { value: "1,200+", label: "NRI & HNIs Advised" },
    { value: "0 Litigation", label: "Pure Clean Registry Guarantee" }
  ];

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex flex-col justify-between bg-gradient-to-b from-[#FCFBF7] via-[#F4EFE6] to-[#FCFBF7] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Cinematic Mist, Sunburst and Sacred Saffron elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-radial from-[#E5E1D8]/45 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-radial from-[#8B735B]/10 to-transparent blur-3xl pointer-events-none" />
      
      {/* Golden Sunrise Glow */}
      <div className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-[80%] h-[350px] bg-gradient-to-b from-[#F4EFE6]/95 via-[#E5E1D8]/40 to-transparent blur-2xl rounded-full pointer-events-none" />

      {/* Floating Particles in Sunrise */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-gold-500/20 animate-pulse"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 90}%`,
              animationDuration: `${Math.random() * 5 + 3}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Cinematic Birds Floating Symbolizing spiritual morning of Vrindavan */}
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
          <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-serif text-[#2D2926] tracking-tight leading-[1.1] mb-6 font-medium">
            Invest Where <span className="text-gold-600 font-serif italic">Faith</span> Meets <br className="hidden sm:inline" />
            <span className="relative inline-block mt-1">
              <span className="relative z-10">Future Wealth</span>
              <span className="absolute left-0 bottom-1 w-full h-[6px] bg-[#E5E1D8]/60 -z-10 rounded-sm" />
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 font-sans max-w-2.5xl mx-auto mb-10 leading-relaxed font-light">
            Secure high-yielding <span className="font-medium text-gray-800">MVDA Approved Plots</span> in Vrindavan's high-appreciation corridors. Tailor-made for NRIs and elite professionals seeking complete legal transparency and spiritual inheritance.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-14">
            <button
              onClick={onExploreProjects}
              id="cta-explore-hero"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2D2926] text-white font-medium hover:bg-gold-700 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
            >
              Explore MVDA Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={onScheduleConsult}
              id="cta-consult-hero"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#2D2926] border border-gold-200/60 shadow-xs hover:border-gold-500 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-medium"
            >
              Book Site Visit
            </button>
          </div>

          {/* Agency Grade Strategic Pitch Ribbon trigger */}
          <div className="flex justify-center mb-4">
            <button
              onClick={onOpenBlueprint}
              className="inline-flex items-center gap-2 text-xs font-mono text-gold-600 hover:text-gold-700 hover:underline cursor-pointer group px-4 py-2 rounded-lg bg-gold-50/50 border border-gold-200/20"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Explore ₹25,00,000+ Agency Strategy & Customer Psychology Blueprint</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
