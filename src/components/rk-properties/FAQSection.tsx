'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { FAQ } from '@/types/rk-properties';
import { sampleFaqs } from '@/data/propertyData';

const CATEGORY_COLORS: Record<string, string> = {
  'Legal/Registry': 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  'Investment': 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
  'Vrindavan Growth': 'bg-violet-100 text-violet-800 hover:bg-violet-200',
  'Project Approvals': 'bg-sky-100 text-sky-800 hover:bg-sky-200',
};

export default function FAQSection() {
  const [activeFaq, setActiveFaq] = useState<string | null>('faq_1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allCategories = useMemo(() => {
    const cats = new Set(sampleFaqs.map((f) => f.category));
    return Array.from(cats);
  }, []);

  const filteredFaqs = useMemo(() => {
    return sampleFaqs.filter((faq: FAQ) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === null || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory((prev) => (prev === cat ? null : cat));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory(null);
  };

  const hasActiveFilters = searchQuery.trim() !== '' || activeCategory !== null;

  return (
    <section
      id="faq-section-anchor"
      data-animate
      className="py-20 bg-gradient-to-b from-white via-gold-50/30 to-white dark:from-gray-950 dark:via-gray-900/30 dark:to-gray-950 border-t border-b border-gold-200/20 dark:border-gold-800/20 select-none"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">
            SOVEREIGN COMPLIANCE DICTIONARY
          </span>
          <h2 className="text-3xl font-serif text-gray-900 dark:text-gold-100 mt-1">
            Registry FAQs &amp; Land Registry Guardrails
          </h2>
        </div>

        {/* Search + Category Filters */}
        <div className="mb-8 space-y-4">
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gold-200/50 dark:border-gold-800/40 text-sm text-gray-900 dark:text-gold-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400/60 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mr-1">
              Filter:
            </span>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer border ${
                  activeCategory === cat
                    ? CATEGORY_COLORS[cat] || 'bg-gray-100 text-gray-700'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border-transparent'
                } ${activeCategory === cat ? 'border-current/20' : ''}`}
              >
                {cat}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer ml-1"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm font-light">No FAQs match your search.</p>
              <button
                onClick={clearFilters}
                className="mt-2 text-gold-600 text-xs font-medium hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}
          {filteredFaqs.map((faq: FAQ) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl bg-white dark:bg-gray-900 overflow-hidden shadow-xs transition-all duration-300 ${
                  isOpen
                    ? 'border-gold-400/60 dark:border-gold-600/50 shadow-sm'
                    : 'border-gold-200/40 dark:border-gold-800/40 hover:border-gold-300/60 dark:hover:border-gold-600/50'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-start sm:items-center gap-3 cursor-pointer hover:bg-gold-50/20 dark:hover:bg-gray-800/20 transition-colors"
                >
                  <span className="font-serif font-bold text-gray-900 dark:text-gold-100 text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gold-600 transition-transform duration-300 shrink-0 mt-0.5 sm:mt-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div className={`faq-answer-wrapper ${isOpen ? 'open' : ''}`}>
                  <div className="faq-answer-inner">
                    <div className="px-5 sm:px-6 pb-5 text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-light border-t border-gold-200/10 dark:border-gold-800/10 pt-4">
                      {/* Category badge */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(faq.category);
                        }}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider mb-3 transition-colors duration-200 cursor-pointer ${
                          CATEGORY_COLORS[faq.category] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {faq.category}
                      </button>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}