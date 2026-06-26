'use client';

import { sampleTestimonials } from '@/data/propertyData';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">Verifiable Client Chronology</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 mt-1 tracking-tight">Voices of Devotional Wisdom</h2>
          <p className="text-xs text-gray-500 mt-2 font-mono">Durable legacies constructed alongside India&apos;s distinguished families.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white to-gold-100/70 border border-gold-200 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div>
                <span className="text-3xl font-serif text-gold-600/30 block mb-2">&ldquo;</span>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light italic mb-6">
                  {t.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-gold-200/40 pt-4 mt-2">
                <div className="h-10 w-10 rounded-full bg-gold-100 flex items-center justify-center font-serif text-gold-700 font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <h5 className="font-serif text-sm font-bold text-gold-800">{t.name}</h5>
                  <p className="text-[10px] text-gray-400 font-mono">{t.role}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    <span className="text-[8px] font-mono bg-gold-200/30 text-gold-700 px-1.5 py-0.5 rounded">
                      {t.projectBought}
                    </span>
                    <span className="text-[8px] font-mono bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded">
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