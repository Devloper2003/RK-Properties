'use client';

import { Eye } from 'lucide-react';
import { usePropertyStore } from '@/store/use-property-store';
import { Project } from '@/types/rk-properties';

export default function RecentlyViewedStrip() {
  const { projects, recentlyViewed, scrollToId, setSelectedCategoryFilter } = usePropertyStore();

  const viewedProjects = recentlyViewed
    .map(id => projects.find(p => p.id === id))
    .filter((p): p is Project => !!p);

  if (viewedProjects.length === 0) return null;

  const handleCardClick = (projectId: string) => {
    setSelectedCategoryFilter('All');
    // Find the project card element and scroll to it
    const cardEl = document.getElementById(`project-card-${projectId}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      scrollToId('project-showcase-section');
    }
  };

  return (
    <div data-animate className="py-6 bg-gradient-to-r from-gold-50 via-white to-gold-50 border-t border-b border-gold-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-3.5 h-3.5 text-gold-600" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-gold-700 font-bold">
            ✦ Recently Viewed
          </span>
          <span className="text-[9px] font-mono text-gray-400">
            — Click to revisit
          </span>
        </div>

        {/* Scrollable strip */}
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {viewedProjects.map((p) => (
            <button
              key={p.id}
              onClick={() => handleCardClick(p.id)}
              className="flex-none w-[220px] sm:w-[240px] group rounded-2xl bg-white border border-gold-200/40 shadow-xs hover:shadow-lg hover:border-gold-400/60 transition-all duration-300 overflow-hidden cursor-pointer text-left"
            >
              <div className="relative h-28 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[9px] font-mono font-bold text-white/90 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-md">
                    {p.status}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h5 className="font-serif font-bold text-gray-900 text-xs truncate group-hover:text-gold-600 transition-colors">
                  {p.name}
                </h5>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] font-mono text-gold-700 font-bold">
                    {p.price.split(' ')[0]}
                  </span>
                  <span className="text-[9px] font-mono text-green-700 font-semibold">
                    ▲ +{p.appreciationRate}%
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}