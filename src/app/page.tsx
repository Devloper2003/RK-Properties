'use client';

import { useEffect } from 'react';

import { usePropertyStore } from '@/store/use-property-store';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';
import { ToastProvider } from '@/components/rk-properties/ToastProvider';

// Public-facing section components (organized by function & role)
import Navbar from '@/components/rk-properties/Navbar';
import HeroSection from '@/components/rk-properties/HeroSection';
import TrustBadges from '@/components/rk-properties/TrustBadges';
import WhyVrindavan from '@/components/rk-properties/WhyVrindavan';
import PropertyShowcaseSection from '@/components/rk-properties/PropertyShowcaseSection';
import InvestmentCalculator from '@/components/rk-properties/InvestmentCalculator';
import StrategySection from '@/components/rk-properties/StrategySection';
import TestimonialsSection from '@/components/rk-properties/TestimonialsSection';
import FAQSection from '@/components/rk-properties/FAQSection';
import ContactSection from '@/components/rk-properties/ContactSection';
import Footer from '@/components/rk-properties/Footer';
import FloatingActions from '@/components/rk-properties/FloatingActions';

export default function Home() {
  const {
    projects,
    mounted,
    setMounted,
    scrollToId,
    addLead
  } = usePropertyStore();

  // Activate scroll-triggered animations
  useScrollAnimations();

  // Initialize on first client render
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  // Loading state
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gold-50 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <span className="font-serif text-2xl text-gold-600 block mb-2">RK PROPERTIES</span>
          <span className="text-xs font-mono text-gray-400">Loading sovereign experience...</span>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="bg-gold-50 text-gold-800 min-h-screen flex flex-col font-sans selection:bg-gold-200 selection:text-gold-900 relative">
        {/* ── Navigation ── */}
        <Navbar />

        {/* ── Hero ── */}
        <HeroSection
          onExploreProjects={() => scrollToId('project-showcase-section')}
          onScheduleConsult={() => scrollToId('contact-experience')}
        />

        {/* ── Trust Badges ── */}
        <TrustBadges />

        {/* ── Section Divider ── */}
        <div className="section-divider max-w-7xl mx-auto my-0" />

        {/* ── Why Vrindavan ── */}
        <WhyVrindavan />

        {/* ── Property Showcase ── */}
        <PropertyShowcaseSection />

        {/* ── Section Divider ── */}
        <div className="section-divider max-w-7xl mx-auto my-0" />

        {/* ── Investment Calculator ── */}
        <section id="calculator-anchor" className="py-20 bg-gradient-to-b from-white via-gold-50/50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InvestmentCalculator initialProjects={projects} />
          </div>
        </section>

        {/* ── Section Divider ── */}
        <div className="section-divider max-w-7xl mx-auto my-0" />

        {/* ── Our Strategy ── */}
        <StrategySection />

        {/* ── Section Divider ── */}
        <div className="section-divider max-w-7xl mx-auto my-0" />

        {/* ── Testimonials ── */}
        <TestimonialsSection />

        {/* ── FAQ ── */}
        <FAQSection />

        {/* ── Contact / Lead Capture ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactSection
              projects={projects}
              onAddLead={addLead}
            />
          </div>
        </section>

        {/* ── Footer ── */}
        <Footer />

        {/* ── Floating Actions (Back to Top, WhatsApp, Scroll Progress) ── */}
        <FloatingActions />
      </div>
    </ToastProvider>
  );
}