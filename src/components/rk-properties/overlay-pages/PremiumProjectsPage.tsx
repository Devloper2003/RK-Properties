'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { MapPin, TrendingUp, ArrowRight, Download, Sparkles } from 'lucide-react';
import { usePropertyStore } from '@/store/use-property-store';
import { propertiesData } from '@/data/propertyData';

const allTypes = ['All', 'Premium Township', 'Residential Project', 'Investment Plots', 'Verified Estates'];

const statusColors: Record<string, string> = {
  'Selling Fast': 'bg-emerald-500 text-white',
  'Pre-launch': 'bg-sky-500 text-white',
  'Almost Sold Out': 'bg-amber-500 text-white',
  'Fully Developed': 'bg-gold-600 text-white',
};

export default function PremiumProjectsPage() {
  const { openOverlay, projects } = usePropertyStore();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p => p.type === activeFilter);
  }, [projects, activeFilter]);

  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gold-800 via-gold-900 to-gold-950 px-6 py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-48 bg-gold-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <span className="animate-hero-text inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gold-200 text-[10px] font-mono uppercase tracking-widest">
            <Sparkles className="w-3 h-3" /> Curated Portfolio
          </span>
          <h1 className="animate-hero-text animate-hero-text-delay-1 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Discover Our Premium Real Estate Collection
          </h1>
          <p className="animate-hero-text animate-hero-text-delay-2 text-gold-200/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Hand-picked MVDA approved properties in Vrindavan&apos;s highest appreciation corridors. Each project undergoes our Triple-Safety Lock verification.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-5 border-b border-gold-200/50 dark:border-gold-800/30 bg-white dark:bg-[#0F0E0C] sticky top-[116px] z-10">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {allTypes.map((t) => (
            <button
              key={t}
              onClick={() => setActiveFilter(t)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === t
                  ? 'bg-gold-800 text-white shadow-md'
                  : 'bg-gold-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gold-100 dark:hover:bg-gray-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <div className="px-6 py-8">
        <p className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">
          {filtered.length} {filtered.length === 1 ? 'Project' : 'Projects'} Found
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gold-200/40 dark:border-gold-800/30 shadow-sm hover:shadow-xl transition-all duration-500 card-tilt-hover"
            >
              {/* Image */}
              <div className="relative h-52 sm:h-60 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider ${statusColors[project.status] || 'bg-gray-500 text-white'}`}>
                    {project.status}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-white/90 dark:bg-gray-900/90 text-gold-700 dark:text-gold-300 uppercase tracking-wider backdrop-blur-sm">
                    {project.type}
                  </span>
                </div>
                {/* Price tag */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md">
                  <span className="text-white font-serif font-bold text-sm">{project.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gold-800 dark:text-gold-100 tracking-tight leading-tight">
                    {project.name}
                  </h3>
                  <span className="flex-shrink-0 ml-3 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> {project.appreciationRate}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-3">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="line-clamp-1">{project.location}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Quick stats */}
                <div className="flex items-center gap-3 mb-5 text-[10px] font-mono text-gray-500 dark:text-gray-400">
                  <span className="px-2 py-1 rounded-md bg-gold-50 dark:bg-gray-800">{project.size}</span>
                  <span className="px-2 py-1 rounded-md bg-gold-50 dark:bg-gray-800">{project.tag}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => openOverlay('project-detail', project.id)}
                    className="flex-1 py-3 px-4 bg-gold-800 hover:bg-gold-700 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={`/api/brochure?projectId=${project.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 border border-gold-200 dark:border-gold-700 text-gold-700 dark:text-gold-300 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all hover:bg-gold-50 dark:hover:bg-gray-800 flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-mono text-sm">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="border-t border-gold-200/50 dark:border-gold-800/30 bg-gold-50/50 dark:bg-gray-900/50 px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { val: '4', label: 'Projects' },
            { val: '100%', label: 'MVDA Approved' },
            { val: '18–24%', label: 'Avg Returns' },
            { val: '₹450Cr+', label: 'Transacted' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-xl sm:text-2xl font-serif font-bold text-gold-700 dark:text-gold-300">{s.val}</div>
              <div className="text-[9px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}