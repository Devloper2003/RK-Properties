'use client';

import { useAnimatedCounter } from '@/hooks/use-scroll-animations';
import {
  Landmark,
  Building2,
  TrendingUp,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const stats = [
  {
    icon: Landmark,
    suffix: 'L Cr',
    prefix: '₹',
    target: 28,
    displayFn: (n: number) => `₹${(n / 10).toFixed(1)}L Cr`,
    label: 'Planned Smart Regional Investments',
    desc: 'Uttar Pradesh state allocation for Yamuna Expressway tourism corridor expansion schemes.',
  },
  {
    icon: Building2,
    suffix: ' Stories',
    prefix: '',
    target: 70,
    displayFn: (n: number) => `${n} Stories`,
    label: 'Chandrodaya Temple Height',
    desc: 'The upcoming tallest religious skyscraper will anchor future residential expansion rates.',
  },
  {
    icon: TrendingUp,
    suffix: '%',
    prefix: '18–',
    target: 24,
    displayFn: (n: number) => `18–${n}%`,
    label: 'Average Land Appreciation',
    desc: 'Historic compound annual return for MVDA authorized plots along Chhatikara transit core.',
    topBorder: true,
  },
  {
    icon: ShieldCheck,
    suffix: '',
    prefix: '100%',
    target: 0,
    isStatic: true,
    displayFn: () => '100%',
    label: 'Tax Exempt',
    desc: 'Reinvest company surplus funds in approved land parcels and optimize corporate returns.',
    topBorder: true,
  },
] as const;

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const { count, ref } = useAnimatedCounter(
    'isStatic' in stat && stat.isStatic ? 0 : (stat.target as number),
    2000,
    true
  );
  const displayValue =
    'isStatic' in stat && stat.isStatic ? stat.displayFn(0) : stat.displayFn(count);

  return (
    <div
      ref={ref}
      data-animate
      style={{ '--stagger-idx': index } as React.CSSProperties}
      className={`glass group space-y-2 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gold-200/20 hover:border-gold-300/50
        ${'topBorder' in stat && stat.topBorder ? 'border-t border-gold-200/30 pt-8' : ''}`}
    >
      <div className="flex items-center gap-2.5">
        {/* Decorative icon */}
        <span
          className="flex-none p-1.5 rounded-lg bg-gold-100/80 text-gold-600 transition-colors duration-300 group-hover:bg-gold-200/80 group-hover:text-gold-700"
          aria-hidden="true"
        >
          <stat.icon className="w-4 h-4" />
        </span>
        <span className="text-2xl sm:text-3xl font-serif text-gold-600 font-bold tracking-tight">
          {displayValue}
        </span>
      </div>
      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
        {stat.label}
      </span>
      <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
        {stat.desc}
      </p>
    </div>
  );
}

export default function WhyVrindavan() {
  return (
    <section
      id="why-vrindavan"
      className="relative py-20 bg-gradient-to-b from-white via-gold-50 to-white select-none overflow-hidden"
    >
      {/* Decorative gradient orb */}
      <span
        className="pointer-events-none absolute -top-32 right-0 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(244,239,230,0.15) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-0 -left-24 w-[300px] h-[300px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(139,115,91,0.2) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left column — text content */}
          <div
            data-animate="fade-left"
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">
              The Epicenter of Spiritual Sovereignty
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-gold-800 tracking-tight leading-tight">
              Vrindavan&apos;s Majestic Ascent: <br />
              From holy{' '}
              <span className="font-serif italic text-gold-600">Faith</span>{' '}
              to{' '}
              <span className="underline decoration-gold-200 decoration-4">
                Wealth
              </span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              Vrindavan is no longer just an ancient sacred pilgrimage
              destination. Backed by government focus and prime mega-development
              mandates, it represents one of India&apos;s fast-growing regional
              real estate corridors.
            </p>

            {/* Numbered items with staggered animation */}
            <div
              className="space-y-4 pt-2"
              data-animate-stagger
            >
              <div
                data-animate
                style={{ '--stagger-idx': 0 } as React.CSSProperties}
                className="flex gap-4"
              >
                <span className="flex-none p-2.5 bg-gold-100 text-gold-700 h-10 w-10 text-center rounded-xl font-bold font-serif">
                  1
                </span>
                <div>
                  <h4 className="font-serif text-base font-bold text-gray-900">
                    Unrivalled Pilgrimage Volume
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Surpassing 20 million visits per year&mdash;driving immense
                    rental yields and boutique hotel requirements near upcoming
                    corridors.
                  </p>
                </div>
              </div>
              <div
                data-animate
                style={{ '--stagger-idx': 1 } as React.CSSProperties}
                className="flex gap-4"
              >
                <span className="flex-none p-2.5 bg-gold-100 text-gold-700 h-10 w-10 text-center rounded-xl font-bold font-serif">
                  2
                </span>
                <div>
                  <h4 className="font-serif text-base font-bold text-gray-900">
                    High Speed Connectivity
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Seamless connectivity via Yamuna Expressway and upcoming
                    Rapid Transit links connects Delhi-NCR in under 120 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — stats grid */}
          <div
            data-animate="fade-right"
            className="lg:col-span-7"
          >
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-3xl p-4 sm:p-6 border border-gold-200/20"
              data-animate-stagger
            >
              {stats.map((stat, idx) => (
                <StatCard key={stat.label} stat={stat} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}