'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '@/types/rk-properties';
import { sampleFaqs } from '@/data/propertyData';

export default function FAQSection() {
  const [activeFaq, setActiveFaq] = useState<string | null>("faq_1");

  return (
    <section id="faq-section-anchor" className="py-20 bg-gradient-to-b from-white via-gold-50/30 to-white border-t border-b border-gold-200/20 select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">SOVEREIGN COMPLIANCE DICTIONARY</span>
          <h2 className="text-3xl font-serif text-gray-900 mt-1">Registry FAQs &amp; Land Registry Guardrails</h2>
        </div>

        <div className="space-y-4">
          {sampleFaqs.map((faq: FAQ) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-gold-200/40 rounded-2xl bg-white overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center cursor-pointer hover:bg-gold-50/20"
                >
                  <span className="font-serif font-bold text-gray-900 text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gold-600 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-xs text-gray-600 leading-relaxed font-light border-t border-gold-200/10 pt-4 animate-fade-in">
                    <p>{faq.answer}</p>
                    <div className="mt-3 text-[10px] text-gold-600 font-mono font-bold uppercase tracking-widest">
                      Category Focus: {faq.category}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}