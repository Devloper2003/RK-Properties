'use client';

import { ShieldCheck, FileCheck, Award } from 'lucide-react';

const badges = [
  {
    icon: ShieldCheck,
    label: 'UP-RERA AGENT',
  },
  {
    icon: FileCheck,
    label: 'MVDA REGULATED',
  },
  {
    icon: Award,
    label: '100% CLEAR REGISTRIES',
    span: true,
  },
] as const;

export default function TrustBadges() {
  return (
    <section
      data-animate
      className="relative bg-gradient-to-r from-gold-50/40 via-gold-100/20 to-gold-50/40 dark:from-gray-900/40 dark:via-gray-800/20 dark:to-gray-900/40 py-10 border-t border-b border-gold-200/20 dark:border-gold-800/20 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold mb-1">
              SOVEREIGN RECOGNITION &amp; SHIELD
            </p>
            <h3 className="text-sm font-serif text-gray-500 dark:text-gray-400 italic max-w-xl">
              &quot;RK Properties guarantees absolute legal custody. Every land
              title listed under our banner undergoes triple check clearance
              procedures backed by government land record APIs.&quot;
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className={`group relative flex items-center gap-3 bg-white dark:bg-gray-900 px-5 py-3.5 rounded-xl border border-gold-200/40 dark:border-gold-700/30 shadow-xs
                  transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-gold-200/30 dark:hover:shadow-gold-900/30 hover:border-gold-300/60 dark:hover:border-gold-600/50
                  ${badge.span ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                {/* Subtle glow behind card on hover */}
                <span
                  className="pointer-events-none absolute -inset-1 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 50%, rgba(212,175,55,0.12) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                {/* Gold accent bar on left */}
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[3px] rounded-r-full bg-gradient-to-b from-gold-500 via-gold-600 to-gold-700"
                  aria-hidden="true"
                />

                <badge.icon className="w-6 h-6 text-gold-600 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-gold-800 dark:text-gold-300">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}