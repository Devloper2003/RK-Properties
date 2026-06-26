'use client';

import { Star, BadgeCheck } from 'lucide-react';
import { sampleTestimonials } from '@/data/propertyData';

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5 fill-gold-500 text-gold-500"
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section data-animate className="py-20 bg-white select-none relative overflow-hidden">
      {/* Subtle radial glow behind testimonial grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-radial from-gold-200/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">Verifiable Client Chronology</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 mt-1 tracking-tight">Voices of Devotional Wisdom</h2>
          <p className="text-xs text-gray-500 mt-2 font-mono">Durable legacies constructed alongside India&apos;s distinguished families.</p>
        </div>

        {/* Aggregate Rating Badge */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-gold-50 border border-gold-200/60 shadow-xs">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
              ))}
            </div>
            <span className="text-sm font-serif font-bold text-gold-800">4.9</span>
            <span className="text-[10px] font-mono text-gray-400">/ 5 Average</span>
            <span className="w-px h-4 bg-gold-200" />
            <BadgeCheck className="w-3.5 h-3.5 text-green-600" />
            <span className="text-[10px] font-mono text-gray-500">{sampleTestimonials.length} Verified Reviews</span>
          </div>
        </div>

        <div data-animate-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sampleTestimonials.map((t, idx) => (
            <div
              key={t.id}
              data-animate
              style={{ '--stagger-idx': idx } as React.CSSProperties}
              className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white to-gold-100/70 border border-gold-200 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group"
            >
              {/* Gold accent line on the left */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-500 via-gold-600 to-gold-500 rounded-l-3xl" />

              {/* Verified Purchase badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 border border-green-200/50 z-10">
                <BadgeCheck className="w-3 h-3 text-green-600" />
                <span className="text-[8px] font-mono font-bold text-green-700 uppercase tracking-wider">Verified</span>
              </div>

              {/* Decorative large quotation mark */}
              <span className="absolute -top-2 left-4 text-7xl font-serif text-gold-300/40 leading-none select-none pointer-events-none group-hover:text-gold-300/60 transition-colors duration-300">
                &ldquo;
              </span>

              <div className="relative z-10">
                <StarRating />
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light italic mt-4 mb-6 pl-2">
                  {t.quote}
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-3 border-t border-gold-200/40 pt-4 mt-2">
                <div className="h-10 w-10 rounded-full bg-gold-100 flex items-center justify-center font-serif text-gold-700 font-bold text-sm shrink-0">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <h5 className="font-serif text-sm font-bold text-gold-800 truncate">{t.name}</h5>
                  <p className="text-[10px] text-gray-400 font-mono truncate">{t.role}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    <span className="text-[8px] font-mono bg-gold-200/30 text-gold-700 px-1.5 py-0.5 rounded truncate max-w-[160px]">
                      {t.projectBought}
                    </span>
                    <span className="text-[8px] font-mono bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(34,197,94,0.2)] whitespace-nowrap">
                      {t.appreciationObserved}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}