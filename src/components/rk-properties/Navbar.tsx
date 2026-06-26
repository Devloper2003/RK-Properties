'use client';

import {
  Phone, Sparkles, Menu, X
} from 'lucide-react';
import { usePropertyStore } from '@/store/use-property-store';

export default function Navbar() {
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    scrollToId
  } = usePropertyStore();

  return (
    <nav className="fixed top-0 inset-x-0 z-40 bg-gold-50/90 backdrop-blur-md border-b border-gold-200/20 shadow-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand */}
          <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-gold-800">
              RK PROPERTIES
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-gold-600 font-semibold mt-px">
              Trust &bull; Transparency &bull; Value &mdash; RK Group
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-wider font-semibold text-gray-600">
            <button onClick={() => scrollToId('project-showcase-section')} className="hover:text-gold-600 cursor-pointer transition-colors">
              Premium Projects
            </button>
            <button onClick={() => scrollToId('why-vrindavan')} className="hover:text-gold-600 cursor-pointer transition-colors">
              Why Vrindavan
            </button>
            <button onClick={() => scrollToId('calculator-anchor')} className="hover:text-gold-800 hover:underline cursor-pointer transition-colors flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-gold-600" /> Investment Calculator
            </button>
            <button onClick={() => scrollToId('our-strategy')} className="hover:text-gold-600 cursor-pointer transition-colors">
              Our Strategy
            </button>
            <button onClick={() => scrollToId('faq-section-anchor')} className="hover:text-gold-600 cursor-pointer transition-colors">
              Registry FAQs
            </button>
          </div>

          {/* Action widgets */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollToId('contact-experience')}
              className="px-4 py-2 bg-gold-800 hover:bg-gold-600 text-white text-[10px] font-mono uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-gold-200" />
              Book Site Tour
            </button>
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => scrollToId('contact-experience')}
              className="p-1.5 rounded-lg bg-gold-800 text-white"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gold-100 p-4 space-y-3 font-mono text-xs uppercase tracking-wider animate-fade-in">
          <button onClick={() => scrollToId('project-showcase-section')} className="block w-full text-left py-2 text-gray-600 cursor-pointer">
            Premium Projects
          </button>
          <button onClick={() => scrollToId('why-vrindavan')} className="block w-full text-left py-2 text-gray-600 cursor-pointer">
            Why Vrindavan
          </button>
          <button onClick={() => scrollToId('calculator-anchor')} className="block w-full text-left py-2 text-gray-600 cursor-pointer">
            Investment Calculator
          </button>
          <button onClick={() => scrollToId('our-strategy')} className="block w-full text-left py-2 text-gray-600 cursor-pointer">
            Our Strategy
          </button>
          <button onClick={() => scrollToId('faq-section-anchor')} className="block w-full text-left py-2 text-gray-600 cursor-pointer">
            Registry FAQs
          </button>
          <button onClick={() => scrollToId('contact-experience')} className="block w-full text-left py-2 bg-gold-100 text-gold-700 font-bold px-3 rounded-lg text-center cursor-pointer flex items-center justify-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            Book Site Tour Package
          </button>
        </div>
      )}
    </nav>
  );
}