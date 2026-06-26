'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Phone, Sparkles, Menu, X, MapPin,
  Calculator, BookOpen, HelpCircle, Building2,
  ShieldCheck, ChevronDown
} from 'lucide-react';
import { usePropertyStore } from '@/store/use-property-store';
import { useScrolledPast } from '@/hooks/use-scroll-animations';

const navLinks = [
  { label: 'Premium Projects', sectionId: 'project-showcase-section' },
  { label: 'Why Vrindavan', sectionId: 'why-vrindavan' },
  { label: 'Location', sectionId: 'location-corridor' },
  { label: 'Investment Calculator', sectionId: 'calculator-anchor' },
  { label: 'Our Strategy', sectionId: 'our-strategy' },
  { label: 'Registry FAQs', sectionId: 'faq-section-anchor' },
];

export default function Navbar() {
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    scrollToId
  } = usePropertyStore();

  const scrolled = useScrolledPast(80);
  const [activeSection, setActiveSection] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track which section is currently visible
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.15, 0.5], rootMargin: '-80px 0px -40% 0px' }
    );

    const ids = navLinks.map(l => l.sectionId);
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el && observerRef.current) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleNavClick = useCallback((sectionId: string) => {
    scrollToId(sectionId);
    setMobileMenuOpen(false);
  }, [scrollToId, setMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-9 inset-x-0 z-40 transition-all duration-500 select-none ${
          scrolled
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-lg dark:border-b dark:border-gold-700/30'
            : 'bg-gold-50/80 dark:bg-gold-900/80 backdrop-blur-md shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-gold-800 dark:text-gold-100">
                  RK PROPERTIES
                </span>
                <span className={`text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-gold-600 dark:text-gold-400 font-semibold mt-px transition-all duration-500 ${scrolled ? 'text-[7px] sm:text-[8px]' : ''}`}>
                  Trust &bull; Transparency &bull; Value &mdash; RK Group
                </span>
              </div>
              <div className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gold-100/80 border border-gold-200/50 transition-all duration-300 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <ShieldCheck className="w-3 h-3 text-gold-600" />
                <span className="text-[8px] font-mono font-bold text-gold-700 uppercase tracking-wider">RERA</span>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider font-semibold text-gray-600 dark:text-gray-400">
              {navLinks.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <button
                    key={link.sectionId}
                    onClick={() => handleNavClick(link.sectionId)}
                    className={`relative cursor-pointer transition-all duration-300 pb-0.5 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-gold-700 dark:text-gold-400'
                        : 'hover:text-gold-600 dark:hover:text-gold-400'
                    }`}
                  >
                    {link.sectionId === 'calculator-anchor' && (
                      <Sparkles className="w-3 h-3 text-gold-600" />
                    )}
                    {link.label}
                    {/* Active indicator dot */}
                    <span
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-600 dark:bg-gold-400 transition-all duration-300 ${
                        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Action widgets */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => handleNavClick('contact-experience')}
                className="px-4 py-2 bg-gold-800 hover:bg-gold-600 text-white text-[10px] font-mono uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-md"
              >
                <Phone className="w-3.5 h-3.5 text-gold-200" />
                Book Site Tour
              </button>
            </div>

            {/* Scrolled gold gradient bottom border */}
            <div className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 dark:via-gold-600 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

            {/* Mobile menu toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => handleNavClick('contact-experience')}
                className="p-1.5 rounded-lg bg-gold-800 text-white shadow-sm"
                aria-label="Book site tour"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gold-400 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay + panel */}
      {mobileMenuOpen && (
        <>
          {/* Dark overlay */}
          <div
            className="lg:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu panel */}
          <div className="lg:hidden fixed top-20 inset-x-0 z-30 bg-white/98 dark:bg-gray-950/98 backdrop-blur-lg border-b border-gold-100 dark:border-gold-800/30 shadow-lg p-5 space-y-1 font-mono text-xs uppercase tracking-wider animate-fade-in">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <button
                  key={link.sectionId}
                  onClick={() => handleNavClick(link.sectionId)}
                  className={`flex items-center gap-2.5 w-full text-left py-2.5 px-3 rounded-lg cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-gold-100 dark:bg-gold-900 text-gold-700 dark:text-gold-300 font-bold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gold-50 dark:hover:bg-gray-900 hover:text-gold-600 dark:hover:text-gold-400'
                  }`}
                >
                  {link.sectionId === 'calculator-anchor' ? (
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                  ) : (
                    <span className="w-3.5 h-3.5 flex items-center justify-center">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-gold-600' : 'bg-gray-300'}`} />
                    </span>
                  )}
                  {link.label}
                </button>
              );
            })}
            <div className="pt-3 border-t border-gold-100 dark:border-gold-800/30 mt-2">
              <button
                onClick={() => handleNavClick('contact-experience')}
                className="w-full py-2.5 bg-gold-800 text-white font-bold px-3 rounded-xl text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-gold-200" />
                Book Site Tour Package
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}