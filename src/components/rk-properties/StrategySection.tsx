'use client';

import {
  ShieldCheck, FileCheck, Scale, Users, Target,
  TrendingUp, Building2, CheckCircle2, ArrowRight
} from 'lucide-react';
import { usePropertyStore } from '@/store/use-property-store';

const strategyPillars = [
  {
    icon: ShieldCheck,
    title: 'Triple-Safety Title Verification',
    description: 'Every property undergoes a 3-layer legal verification — government land record API cross-check, MVDA zoning compliance audit, and independent title deed scrutiny by certified real estate lawyers. Zero litigation guarantee.',
    highlights: ['Govt API cross-verified', 'MVDA zoning compliant', 'Independent legal audit', '100% litigation-free']
  },
  {
    icon: Users,
    title: 'Segment-Specific Advisory Model',
    description: 'We don\'t use one-size-fits-all sales tactics. Each client segment — NRI investors, retired devotees, business owners, and medical professionals — receives a tailored investment thesis aligned to their financial goals, risk appetite, and spiritual aspirations.',
    highlights: ['NRI-dedicated timezone support', 'Elder-friendly community guidance', 'Corporate surplus reinvestment plans', 'High-net-worth portfolio matching']
  },
  {
    icon: Target,
    title: 'Data-Driven Appreciation Modeling',
    description: 'Our investment projections are built on verified historical data from Mathura-Vrindavan Development Authority records, not speculation. We provide compound growth models benchmarked against gold, FDs, and equity markets so you make informed decisions.',
    highlights: ['18-24% historic CAGR data', 'Benchmarked vs traditional assets', '5-year & 10-year projections', 'Per-project appreciation rates']
  },
  {
    icon: Building2,
    title: 'End-to-End Concierge Service',
    description: 'From your first inquiry to the final registry stamp — we handle documentation, remote Power of Attorney processes for NRIs, site visits with premium transport, and post-purchase plot monitoring with periodic video updates.',
    highlights: ['Remote PoA for NRIs', 'Premium SUV site-visit pickup', 'Temple darshan tour included', 'Post-purchase plot monitoring']
  },
  {
    icon: Scale,
    title: 'Complete Legal Transparency',
    description: 'Every MVDA approval number, RERA registration, and municipal clearance certificate is available for your inspection before any financial commitment. No hidden charges, no ambiguous clauses — just clean, documented transactions.',
    highlights: ['MVDA approval docs on request', 'RERA registered agent', 'Zero hidden costs', 'Bank pre-approved projects']
  },
  {
    icon: TrendingUp,
    title: 'Strategic Corridor Positioning',
    description: 'Our projects are exclusively positioned along Vrindavan\'s highest-growth corridors — Chhatikara transit core, Yamuna Expressway link, and the Chandrodaya Temple development zone. These are the areas seeing maximum infrastructure investment from the UP government.',
    highlights: ['Chhatikara NH-2 corridor', 'Yamuna Expressway connectivity', 'Chandrodaya Temple zone', '₹2.8L Cr govt investment']
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Consultation & Need Analysis',
    description: 'A dedicated advisor understands your investment goals, budget, timeline, and spiritual preferences. NRI clients get timezone-flexible video consultations.',
    icon: '📞'
  },
  {
    step: '02',
    title: 'Curated Property Shortlist',
    description: 'Based on your profile, we present 2-3 MVDA-verified properties with detailed appreciation models, legal documentation previews, and virtual drone walkthroughs.',
    icon: '📋'
  },
  {
    step: '03',
    title: 'Guided Site Visit & Darshan',
    description: 'Experience a premium site tour with complimentary Delhi-NCR pickup, guided temple visits to Bankey Bihari and Prem Mandir, and a meeting with our legal advisory team.',
    icon: '🚗'
  },
  {
    step: '04',
    title: 'Legal Verification & Registry',
    description: 'Our legal team handles 100% of documentation — title verification, stamp duty processing, registry booking, and post-registration title deed delivery to your doorstep.',
    icon: '✅'
  },
  {
    step: '05',
    title: 'Post-Purchase Support',
    description: 'Receive periodic plot monitoring reports, construction guidance if building, and seamless resale or rental management assistance whenever you need it.',
    icon: '🏆'
  }
];

export default function StrategySection() {
  const { scrollToId } = usePropertyStore();

  return (
    <section id="our-strategy" className="py-20 bg-gradient-to-b from-white via-gold-50/40 to-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-animate className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">
            The RK Properties Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 mt-2 tracking-tight">
            Our Strategy: Where <span className="text-gold-600 italic">Trust</span> Drives Returns
          </h2>
          <p className="text-sm text-gray-500 mt-4 leading-relaxed font-light max-w-2xl mx-auto">
            Unlike unorganized local brokers or generic property portals, RK Properties operates on a fundamentally different model — one built on institutional-grade verification, segment-specific advisory, and complete legal transparency at every step.
          </p>
        </div>

        {/* Strategy Pillars Grid */}
        <div data-animate-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {strategyPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                data-animate
                style={{ '--stagger-idx': index } as React.CSSProperties}
                className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-gold-200/40 shadow-xs hover:shadow-[0_0_24px_rgba(212,175,55,0.15)] hover:border-gold-500/60 hover:border-l-2 transition-all duration-300"
              >
                {/* Animated number badge */}
                <span className="absolute top-4 right-5 font-mono text-[11px] font-bold text-gold-400/40 group-hover:text-gold-500/70 transition-colors duration-300">
                  0{index + 1}
                </span>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gold-100 text-gold-700 group-hover:bg-gold-200 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 pr-8">{pillar.title}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-light mb-5">
                  {pillar.description}
                </p>
                <div className="space-y-2">
                  {pillar.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* How It Works - Process Flow */}
        <div className="mb-16">
          <div data-animate className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">
              Transparent Investment Journey
            </span>
            <h2 className="text-3xl font-serif text-gray-900 mt-2 tracking-tight">
              How We Work With You
            </h2>
            <p className="text-xs text-gray-400 mt-2 font-mono">
              From first call to registered title deed — every step documented, every rupee accounted for.
            </p>
          </div>

          {/* Process Steps with Timeline */}
          <div className="relative">
            {/* Desktop horizontal timeline line */}
            <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-gold-300 to-transparent z-0" />

            {/* Mobile/tablet vertical timeline line */}
            <div className="lg:hidden absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-300 via-gold-200 to-transparent z-0" />

            <div data-animate-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 relative z-10">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  data-animate
                  style={{ '--stagger-idx': index } as React.CSSProperties}
                  className="relative p-5 rounded-2xl bg-gradient-to-br from-white to-gold-50/70 border border-gold-200/40 shadow-xs group hover:shadow-md hover:border-gold-500/60 transition-all duration-300"
                >
                  {/* Desktop: step dot on the timeline */}
                  <div className="hidden lg:flex absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gold-600 border-4 border-white shadow-sm z-20 items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Mobile/tablet: step dot on vertical timeline */}
                  <div className="lg:hidden absolute left-[-26px] top-5 w-5 h-5 rounded-full bg-gold-600 border-4 border-gold-50 shadow-sm z-20 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  <span className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-gold-600 text-white font-mono font-bold text-[10px] tracking-wider shadow-sm">
                    STEP {step.step}
                  </span>
                  <div className="text-2xl mb-3 mt-2">{step.icon}</div>
                  <h4 className="font-serif font-bold text-gray-900 text-sm mb-2">{step.title}</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-light">{step.description}</p>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 text-gold-300 z-10">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitive Moat - Why Over Others */}
        <div data-animate="scale-in" className="bg-gold-800 rounded-3xl p-8 sm:p-12 text-gold-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold-300 font-bold block">
                Why RK Properties Over Others
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white mt-2 mb-6 tracking-tight">
                The Competitive Moat That Protects Your Investment
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'vs Local Brokers', text: 'No title verification, no post-purchase support, high fraud risk' },
                  { label: 'vs National Portals', text: 'Generic listings, zero Vrindavan specialization, no spiritual living consultation' },
                  { label: 'vs Unorganized Promoters', text: 'Poor infrastructure delivery, delayed registries, zero legal backup' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="text-gold-400 font-mono text-[10px] uppercase tracking-widest font-bold shrink-0 pt-0.5 w-36 text-right">
                      {item.label}
                    </span>
                    <span className="text-gold-200/50 text-xs leading-relaxed font-light">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gold-700/30 rounded-2xl p-6 sm:p-8 border border-gold-600/30">
              <h4 className="font-mono text-gold-300 uppercase text-xs tracking-widest mb-4 font-semibold">
                RK Properties Advantage
              </h4>
              <div className="space-y-4">
                {[
                  { icon: FileCheck, text: 'Every property MVDA approved with verifiable certificate numbers' },
                  { icon: ShieldCheck, text: 'Triple-safety legal verification by independent law firms' },
                  { icon: Users, text: 'Dedicated NRI timezone-flexible advisory with video consultations' },
                  { icon: TrendingUp, text: 'Historically 18-24% annual appreciation in curated corridors only' },
                  { icon: Building2, text: 'Premium site visits with temple darshan and legal consultation included' },
                  { icon: Scale, text: 'Complete transparency — zero hidden charges, zero ambiguous clauses' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 text-gold-300 shrink-0 mt-0.5" />
                      <span className="text-xs text-gold-100 leading-relaxed">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => scrollToId('contact-experience')}
                className="mt-8 w-full py-3.5 bg-white text-gold-800 font-mono text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gold-100 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Start Your Investment Journey
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}