'use client';

import { useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { usePropertyStore, OverlayPageId } from '@/store/use-property-store';

import PremiumProjectsPage from './overlay-pages/PremiumProjectsPage';
import WhyVrindavanPage from './overlay-pages/WhyVrindavanPage';
import LocationPage from './overlay-pages/LocationPage';
import InvestmentCalculatorPage from './overlay-pages/InvestmentCalculatorPage';
import OurStrategyPage from './overlay-pages/OurStrategyPage';
import RegistryFaqsPage from './overlay-pages/RegistryFaqsPage';
import ProjectDetailPage from './overlay-pages/ProjectDetailPage';

const pageTitles: Record<OverlayPageId, { title: string; subtitle: string }> = {
  'premium-projects': { title: 'Premium Projects', subtitle: 'Explore our curated real estate portfolio' },
  'why-vrindavan': { title: 'Why Vrindavan', subtitle: 'Discover the spiritual & investment capital' },
  'location': { title: 'Location & Connectivity', subtitle: 'Strategic corridors with maximum appreciation' },
  'investment-calculator': { title: 'Investment Calculator', subtitle: 'Plan your returns with precision' },
  'our-strategy': { title: 'Our Strategy', subtitle: 'The RK Group difference' },
  'registry-faqs': { title: 'Registry & FAQs', subtitle: 'Everything you need to know' },
  'project-detail': { title: 'Project Details', subtitle: 'Complete project information' },
};

function PageContent({ pageId }: { pageId: OverlayPageId }) {
  switch (pageId) {
    case 'premium-projects': return <PremiumProjectsPage />;
    case 'why-vrindavan': return <WhyVrindavanPage />;
    case 'location': return <LocationPage />;
    case 'investment-calculator': return <InvestmentCalculatorPage />;
    case 'our-strategy': return <OurStrategyPage />;
    case 'registry-faqs': return <RegistryFaqsPage />;
    case 'project-detail': return <ProjectDetailPage />;
    default: return null;
  }
}

export default function OverlayShell() {
  const { activeOverlay, closeOverlay, selectedProjectId, openOverlay } = usePropertyStore();

  const handleBack = useCallback(() => {
    if (activeOverlay === 'project-detail') {
      openOverlay('premium-projects');
    } else {
      closeOverlay();
    }
  }, [activeOverlay, openOverlay, closeOverlay]);

  // ESC to go back
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleBack();
    };
    if (activeOverlay) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeOverlay, handleBack]);

  if (!activeOverlay) return null;

  const { title, subtitle } = pageTitles[activeOverlay];
  const isProjectDetail = activeOverlay === 'project-detail';

  return (
    <div className="animate-fade-in">
      {/* Page header breadcrumb bar */}
      <div className="bg-white dark:bg-gray-950 border-b border-gold-200/50 dark:border-gold-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm font-mono text-gold-700 dark:text-gold-300 hover:text-gold-900 dark:hover:text-gold-100 transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>{isProjectDetail ? 'All Projects' : 'Home'}</span>
              </button>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{title}</span>
            </div>
            {!isProjectDetail && (
              <span className="hidden sm:block text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                {subtitle}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Page content */}
      <main>
        <PageContent pageId={activeOverlay} />
      </main>
    </div>
  );
}