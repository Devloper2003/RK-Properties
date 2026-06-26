'use client';

import { useState, useCallback } from 'react';
import { GitCompareArrows } from 'lucide-react';
import { usePropertyStore } from '@/store/use-property-store';
import PropertyShowcase from '@/components/rk-properties/PropertyShowcase';
import PropertyComparison from '@/components/rk-properties/PropertyComparison';

export default function PropertyShowcaseSection() {
  const { projects, selectedCategoryFilter, setSelectedCategoryFilter, addLead, setSelectedProjectForContact, scrollToId } = usePropertyStore();
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const filteredProjects = selectedCategoryFilter === 'All'
    ? projects
    : projects.filter(p => p.type === selectedCategoryFilter);

  const toggleCompare = useCallback((id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareIds([]);
    setShowComparison(false);
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareIds(prev => {
      const next = prev.filter(x => x !== id);
      if (next.length === 0) setShowComparison(false);
      return next;
    });
  }, []);

  const handleBookProject = (projectName: string) => {
    setSelectedProjectForContact(projectName);
    scrollToId('contact-experience');
  };

  const filters = [
    { label: 'Show All', val: 'All' },
    { label: 'Elite Townships', val: 'Premium Township' },
    { label: 'Residential Plots', val: 'Residential Project' },
    { label: 'Investment Plots', val: 'Investment Plots' },
    { label: 'Verified Estates', val: 'Verified Estates' }
  ];

  return (
    <section id="project-showcase-section" className="py-20 bg-white dark:bg-gray-950 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-animate="reveal-up" className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">
              Exclusive Hand-picked Land Registers
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-gold-100 tracking-tight font-medium mt-1">
              Featured MVDA Authorized Real Estates
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-2">
              Showing <span className="text-gold-700 font-bold">{filteredProjects.length}</span> of <span className="text-gold-700 font-bold">{projects.length}</span> Premium Estates
            </p>
          </div>

          <div className="flex flex-wrap gap-2 bg-gold-50 dark:bg-gray-900 p-1.5 rounded-xl border border-gold-200/50 dark:border-gold-800/40 shadow-xs">
            {filters.map((filter) => (
              <button
                key={filter.val}
                onClick={() => setSelectedCategoryFilter(filter.val)}
                className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono tracking-wider uppercase cursor-pointer transition-all duration-200 ${
                  selectedCategoryFilter === filter.val
                    ? 'bg-white dark:bg-gray-800 text-gold-700 dark:text-gold-400 shadow-xs font-bold border border-gold-300/50 dark:border-gold-600/50'
                    : 'text-gray-500 dark:text-gray-500 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Compare Button */}
        {compareIds.length > 0 && (
          <div className="mb-6 flex items-center justify-between bg-white dark:bg-gray-900 border border-gold-300 dark:border-gold-800/40 rounded-xl px-4 py-3 shadow-sm animate-fade-in">
            <span className="text-xs font-mono text-gold-700 dark:text-gold-300">
              <span className="font-bold">{compareIds.length}</span> property{compareIds.length > 1 ? 'ies' : 'y'} selected for comparison
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={clearCompare}
                className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-lg transition-all cursor-pointer"
              >
                Clear Selection
              </button>
              <button
                onClick={() => setShowComparison(true)}
                disabled={compareIds.length < 2}
                className="flex items-center gap-1.5 px-4 py-1.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-gold-800 text-white hover:bg-gold-600"
              >
                <GitCompareArrows className="w-3.5 h-3.5" />
                Compare ({compareIds.length})
              </button>
            </div>
          </div>
        )}

        <PropertyShowcase
          projects={filteredProjects}
          onAddLead={addLead}
          onBookProject={handleBookProject}
          compareIds={compareIds}
          onToggleCompare={toggleCompare}
        />
      </div>

      {/* Comparison Modal */}
      {showComparison && (
        <PropertyComparison
          projects={projects}
          selectedIds={compareIds}
          onClose={() => setShowComparison(false)}
          onClear={clearCompare}
          onRemove={removeFromCompare}
        />
      )}
    </section>
  );
}