'use client';

import { usePropertyStore } from '@/store/use-property-store';
import PropertyShowcase from '@/components/rk-properties/PropertyShowcase';

export default function PropertyShowcaseSection() {
  const { projects, selectedCategoryFilter, setSelectedCategoryFilter, addLead, setSelectedProjectForContact, scrollToId } = usePropertyStore();

  const filteredProjects = selectedCategoryFilter === 'All'
    ? projects
    : projects.filter(p => p.type === selectedCategoryFilter || (selectedCategoryFilter === 'Plots' && (p.type === 'Investment Plots' || p.type === 'Residential Project')));

  const handleBookProject = (projectName: string) => {
    setSelectedProjectForContact(projectName);
    scrollToId('contact-experience');
  };

  const filters = [
    { label: 'Show All', val: 'All' },
    { label: 'Elite Townships', val: 'Premium Township' },
    { label: 'Residential Plots', val: 'Residential Project' },
    { label: 'Investment Plots', val: 'Investment Plots' }
  ];

  return (
    <section id="project-showcase-section" className="py-20 bg-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">
              Exclusive Hand-picked Land Registers
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 tracking-tight font-medium mt-1">
              Featured MVDA Authorized Real Estates
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 bg-gold-50 p-1 rounded-xl border border-gold-200/50">
            {filters.map((filter) => (
              <button
                key={filter.val}
                onClick={() => setSelectedCategoryFilter(filter.val)}
                className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono tracking-wider uppercase cursor-pointer transition-all ${
                  selectedCategoryFilter === filter.val
                    ? 'bg-white text-gold-700 shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gold-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <PropertyShowcase
          projects={filteredProjects}
          onAddLead={addLead}
          onBookProject={handleBookProject}
        />
      </div>
    </section>
  );
}