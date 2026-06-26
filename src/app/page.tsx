'use client';

import { useEffect } from 'react';

import { usePropertyStore } from '@/store/use-property-store';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';
import { ToastProvider } from '@/components/rk-properties/ToastProvider';

// Public-facing section components (organized by function & role)
import AnnouncementBanner from '@/components/rk-properties/AnnouncementBanner';
import Navbar from '@/components/rk-properties/Navbar';
import HeroSection from '@/components/rk-properties/HeroSection';
import TrustBadges from '@/components/rk-properties/TrustBadges';
import WhyVrindavan from '@/components/rk-properties/WhyVrindavan';
import PropertyShowcaseSection from '@/components/rk-properties/PropertyShowcaseSection';
import InvestmentCalculator from '@/components/rk-properties/InvestmentCalculator';
import UrgencySection from '@/components/rk-properties/UrgencySection';
import LocationCorridorSection from '@/components/rk-properties/LocationCorridorSection';
import StrategySection from '@/components/rk-properties/StrategySection';
import TestimonialsSection from '@/components/rk-properties/TestimonialsSection';
import FAQSection from '@/components/rk-properties/FAQSection';
import ContactSection from '@/components/rk-properties/ContactSection';
import Footer from '@/components/rk-properties/Footer';
import FloatingActions from '@/components/rk-properties/FloatingActions';
import DarkModeToggle from '@/components/rk-properties/DarkModeToggle';
import RecentlyViewedStrip from '@/components/rk-properties/RecentlyViewedStrip';
import CookieConsent from '@/components/rk-properties/CookieConsent';
import OverlayShell from '@/components/rk-properties/OverlayShell';

export default function Home() {
  const {
    projects,
    mounted,
    setMounted,
    scrollToId,
    addLead,
    activeOverlay,
  } = usePropertyStore();

  // Activate scroll-triggered animations
  useScrollAnimations(mounted, activeOverlay);

  // Initialize on first client render
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  // Loading state
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gold-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-6 animate-fade-in">
          {/* Brand */}
          <div className="space-y-2">
            <span className="font-serif text-3xl text-gold-600 block tracking-tight">RK PROPERTIES</span>
            <span className="block w-16 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
          </div>
          {/* Skeleton lines */}
          <div className="space-y-2.5 max-w-xs mx-auto">
            <div className="h-3 w-full rounded-full skeleton-shimmer" />
            <div className="h-3 w-3/4 rounded-full skeleton-shimmer" />
            <div className="h-3 w-1/2 rounded-full skeleton-shimmer" />
          </div>
          <span className="text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest animate-pulse">
            Loading sovereign experience...
          </span>
        </div>
      </div>
    );
  }

  const isOnPage = activeOverlay !== null;

  return (
    <ToastProvider>
      <div className="bg-gold-50 dark:bg-[#0F0E0C] text-gold-800 dark:text-gold-200 min-h-screen flex flex-col font-sans selection:bg-gold-200 selection:text-gold-900 relative pt-9">
        {/* ── Announcement Banner (all pages) ── */}
        <AnnouncementBanner />

        {/* ── Navigation ── */}
        <Navbar />

        {/* ── Page Content (when an overlay page is active) ── */}
        {isOnPage ? (
          <>
            <div className="flex-1 mt-20">
              <OverlayShell />
            </div>
          </>
        ) : (
          <>
            {/* ── Hero ── */}
            <HeroSection
              onExploreProjects={() => usePropertyStore.getState().openOverlay('premium-projects')}
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

            {/* ── Urgency / Scarcity ── */}
            <UrgencySection />

            {/* ── Section Divider ── */}
            <div className="section-divider max-w-7xl mx-auto my-0" />

            {/* ── Investment Calculator ── */}
            <section id="calculator-anchor" className="py-20 bg-gradient-to-b from-white dark:from-gray-950 via-gold-50/50 dark:via-gray-900/30 to-white dark:to-gray-950">
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
            <section id="contact-experience" className="py-20 bg-white dark:bg-gray-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ContactSection
                  projects={projects}
                  onAddLead={addLead}
                />
              </div>
            </section>

            {/* ── Location Corridor ── */}
            <LocationCorridorSection />

            {/* ── Recently Viewed ── */}
            <RecentlyViewedStrip />
          </>
        )}

        {/* ── Footer (always visible) ── */}
        <Footer />

        {/* ── Floating Actions (Back to Top, WhatsApp, Scroll Progress) ── */}
        <FloatingActions />

        {/* ── Dark Mode Toggle ── */}
        <DarkModeToggle />

        {/* ── Cookie Consent ── */}
        <CookieConsent />
      </div>
    </ToastProvider>
  );
}