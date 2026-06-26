'use client';

import { ShieldCheck, FileCheck, Award } from 'lucide-react';

export default function TrustBadges() {
  return (
    <section className="bg-gradient-to-r from-gold-50/40 via-gold-100/20 to-gold-50/40 py-10 border-t border-b border-gold-200/20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold mb-1">
              SOVEREIGN RECOGNITION &amp; SHIELD
            </p>
            <h3 className="text-sm font-serif text-gray-500 italic max-w-xl">
              &quot;RK Properties guarantees absolute legal custody. Every land title listed under our banner undergoes triple check clearance procedures backed by government land record APIs.&quot;
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gold-200/40 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0" />
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold">UP-RERA AGENT</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gold-200/40 shadow-xs">
              <FileCheck className="w-5 h-5 text-gold-600 shrink-0" />
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold">MVDA REGULATED</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gold-200/40 shadow-xs col-span-2 sm:col-span-1">
              <Award className="w-5 h-5 text-gold-600 shrink-0" />
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold">100% CLEAR REGISTRIES</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}