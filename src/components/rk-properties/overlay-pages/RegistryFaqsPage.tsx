'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { sampleFaqs } from '@/data/propertyData';
import { usePropertyStore } from '@/store/use-property-store';

const categories = ['All', 'Legal/Registry', 'Investment', 'Vrindavan Growth', 'Project Approvals'];

export default function RegistryFaqsPage() {
  const { closeOverlay } = usePropertyStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let faqs = sampleFaqs;
    if (activeCategory !== 'All') {
      faqs = faqs.filter(f => f.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      faqs = faqs.filter(f =>
        f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      );
    }
    return faqs;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gold-800 via-gold-900 to-gold-950 px-6 py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <span className="animate-hero-text inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gold-200 text-[10px] font-mono uppercase tracking-widest">
            <HelpCircle className="w-3 h-3" /> Knowledge Base
          </span>
          <h1 className="animate-hero-text animate-hero-text-delay-1 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Registry & Legal FAQs
          </h1>
          <p className="animate-hero-text animate-hero-text-delay-2 text-gold-200/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Comprehensive answers to every question about property registration, legal verification, NRI processes, and investment in Vrindavan.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="px-6 py-5 border-b border-gold-200/50 dark:border-gold-800/30 bg-white dark:bg-[#0F0E0C] sticky top-[116px] z-10">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold-200 dark:border-gold-700 bg-gold-50/50 dark:bg-gray-800 text-sm text-gold-800 dark:text-gold-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
        </div>
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === c
                  ? 'bg-gold-800 text-white shadow-md'
                  : 'bg-gold-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gold-100 dark:hover:bg-gray-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="px-6 py-8">
        <p className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">
          {filtered.length} {filtered.length === 1 ? 'Question' : 'Questions'} Found
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <HelpCircle className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
            <p className="text-gray-400 font-mono text-sm">No questions match your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-3 text-xs font-mono text-gold-600 dark:text-gold-400 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? 'border-gold-300 dark:border-gold-700 bg-white dark:bg-gray-900 shadow-md'
                      : 'border-gold-200/40 dark:border-gold-800/30 bg-white dark:bg-gray-900 hover:border-gold-300 dark:hover:border-gold-700'
                  }`}
                >
                  <button
                    onClick={() => setExpandedId(isOpen ? null : faq.id)}
                    className="w-full flex items-start gap-3 p-5 text-left cursor-pointer"
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 transition-colors ${
                      isOpen ? 'bg-gold-600 text-white' : 'bg-gold-100 dark:bg-gray-800 text-gold-600 dark:text-gold-400'
                    }`}>
                      <HelpCircle className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gold-800 dark:text-gold-100 leading-snug">{faq.question}</p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pl-14">
                      <div className="pt-2 border-t border-gold-100 dark:border-gold-800/30">
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                        <span className="inline-block mt-3 px-2.5 py-1 rounded-lg bg-gold-50 dark:bg-gray-800 text-[10px] font-mono text-gold-600 dark:text-gold-400 uppercase tracking-wider font-semibold">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Still Have Questions */}
      <div className="px-6 py-10 bg-gradient-to-r from-gold-800 to-gold-900">
        <div className="max-w-xl mx-auto text-center">
          <MessageSquare className="w-10 h-10 text-gold-300 mx-auto mb-4" />
          <h3 className="text-2xl font-serif font-bold text-white mb-3">Still Have Questions?</h3>
          <p className="text-sm text-gold-200/80 mb-6">
            Our legal and investment advisory team is available 7 days a week to answer your specific questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => { closeOverlay(); setTimeout(() => document.getElementById('contact-experience')?.scrollIntoView({ behavior: 'smooth' }), 400); }}
              className="px-6 py-3 bg-white text-gold-800 text-xs font-mono font-bold uppercase tracking-wider rounded-xl hover:bg-gold-50 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              Ask an Expert <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20have%20a%20question%20about%20RK%20Properties"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl hover:bg-emerald-500 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}