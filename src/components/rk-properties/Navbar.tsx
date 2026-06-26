'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import {
  Phone, Menu, X, Home,
  ShieldCheck, LayoutGrid, MapPin,
  TrendingUp, BookOpen, HelpCircle, Calculator
} from 'lucide-react';
import { usePropertyStore, OverlayPageId } from '@/store/use-property-store';
import { useScrolledPast } from '@/hooks/use-scroll-animations';

const navLinks: { label: string; overlayId: OverlayPageId; icon?: React.ElementType }[] = [
  { label: 'All Projects', overlayId: 'premium-projects', icon: LayoutGrid },
  { label: 'Why Vrindavan', overlayId: 'why-vrindavan', icon: TrendingUp },
  { label: 'Location', overlayId: 'location', icon: MapPin },
  { label: 'Investment Calculator', overlayId: 'investment-calculator', icon: Calculator },
  { label: 'Our Strategy', overlayId: 'our-strategy', icon: BookOpen },
  { label: 'Registry FAQs', overlayId: 'registry-faqs', icon: HelpCircle },
];

export default function Navbar() {
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    activeOverlay,
    openOverlay,
    closeOverlay,
  } = usePropertyStore();

  const scrolled = useScrolledPast(80);

  const handleNavClick = useCallback((overlayId: OverlayPageId) => {
    if (activeOverlay === overlayId) {
      // If already on this page, go home
      closeOverlay();
    } else {
      openOverlay(overlayId);
    }
    setMobileMenuOpen(false);
  }, [activeOverlay, openOverlay, closeOverlay, setMobileMenuOpen]);

  const handleHomeClick = useCallback(() => {
    if (activeOverlay) {
      closeOverlay();
    }
    setMobileMenuOpen(false);
  }, [activeOverlay, closeOverlay, setMobileMenuOpen]);

  const handleBookTour = useCallback(() => {
    setMobileMenuOpen(false);
    // If on an overlay page, go home first then scroll to contact
    if (activeOverlay) {
      closeOverlay();
      setTimeout(() => {
        document.getElementById('contact-experience')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById('contact-experience')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [setMobileMenuOpen, activeOverlay, closeOverlay]);

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
            <button
              onClick={handleHomeClick}
              className="flex items-center gap-3 cursor-pointer"
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
            </button>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-mono uppercase tracking-wider font-semibold text-gray-600 dark:text-gray-400">
              {/* Home link - visible when on an overlay page */}
              {activeOverlay && (
                <button
                  onClick={handleHomeClick}
                  className="relative cursor-pointer transition-all duration-300 pb-0.5 flex items-center gap-1.5 text-gold-800 dark:text-gold-200 font-bold"
                >
                  <Home className="w-3.5 h-3.5" />
                  Home
                </button>
              )}

              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeOverlay === link.overlayId;
                return (
                  <button
                    key={link.overlayId}
                    onClick={() => handleNavClick(link.overlayId)}
                    className={`relative cursor-pointer transition-all duration-300 pb-0.5 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-gold-800 dark:text-gold-200 font-bold'
                        : 'hover:text-gold-600 dark:hover:text-gold-400'
                    }`}
                  >
                    {Icon && <Icon className={`w-3 h-3 ${isActive ? 'text-gold-700 dark:text-gold-300' : 'text-gold-600'}`} />}
                    {link.label}
                    {/* Active underline indicator */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold-600 dark:bg-gold-400 rounded-full" />
                    )}
                    {link.overlayId === 'premium-projects' && !isActive && (
                      <span className="absolute -top-1.5 -right-2.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action widgets */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handleBookTour}
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
                onClick={handleBookTour}
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
          <div className="lg:hidden fixed top-20 inset-x-0 z-30 bg-white/98 dark:bg-gray-950/98 border-b border-gold-100 dark:border-gold-800/30 shadow-lg p-5 space-y-1 font-mono text-xs uppercase tracking-wider animate-fade-in">
            {/* Home link in mobile menu */}
            {activeOverlay && (
              <button
                onClick={handleHomeClick}
                className="flex items-center gap-2.5 w-full text-left py-2.5 px-3 rounded-lg cursor-pointer transition-colors text-gold-800 dark:text-gold-200 font-bold bg-gold-50 dark:bg-gold-900/30"
              >
                <Home className="w-3.5 h-3.5" />
                Home
              </button>
            )}

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeOverlay === link.overlayId;
              return (
                <button
                  key={link.overlayId}
                  onClick={() => handleNavClick(link.overlayId)}
                  className={`flex items-center gap-2.5 w-full text-left py-2.5 px-3 rounded-lg cursor-pointer transition-colors ${
                    isActive
                      ? 'text-gold-800 dark:text-gold-200 font-bold bg-gold-50 dark:bg-gold-900/30'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gold-50 dark:hover:bg-gray-900 hover:text-gold-600 dark:hover:text-gold-400'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold-700 dark:text-gold-300' : 'text-gold-600'}`} />}
                  {link.label}
                  {isActive && <span className="ml-auto text-[9px] text-gold-600 dark:text-gold-400">●</span>}
                </button>
              );
            })}
            <div className="pt-3 border-t border-gold-100 dark:border-gold-800/30 mt-2">
              <button
                onClick={handleBookTour}
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