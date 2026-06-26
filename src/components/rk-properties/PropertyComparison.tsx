'use client';

import { X, GitCompareArrows } from 'lucide-react';
import { Project } from '@/types/rk-properties';

interface PropertyComparisonProps {
  projects: Project[];
  selectedIds: string[];
  onClose: () => void;
  onClear: () => void;
  onRemove: (id: string) => void;
}

const COMPARISON_ROWS = [
  { label: 'Price / Sq. Yard', key: 'price' as const, render: (p: Project) => p.price },
  { label: 'Appreciation Rate', key: 'appreciationRate' as const, render: (p: Project) => <span className="text-green-700 font-bold">▲ +{p.appreciationRate}% / Yr</span> },
  { label: 'Available Sizes', key: 'size' as const, render: (p: Project) => p.size },
  { label: 'Location', key: 'location' as const, render: (p: Project) => p.location },
  { label: 'Status', key: 'status' as const, render: (p: Project) => {
    const colors: Record<string, string> = {
      'Selling Fast': 'text-red-600',
      'Pre-launch': 'text-sky-600',
      'Almost Sold Out': 'text-amber-600',
      'Fully Developed': 'text-green-700',
    };
    return <span className={colors[p.status] || 'text-gray-700'}>{p.status}</span>;
  }},
  { label: 'Type', key: 'type' as const, render: (p: Project) => p.type },
  { label: '5-Year ROI', key: 'roiProjection5Yr' as const, render: (p: Project) => p.roiProjection5Yr },
  { label: '10-Year ROI', key: 'roiProjection10Yr' as const, render: (p: Project) => p.roiProjection10Yr },
  { label: 'Amenities', key: 'amenities' as const, render: (p: Project) => (
    <ul className="space-y-1">
      {p.amenities.map((a, i) => (
        <li key={i} className="text-[10px] text-gray-600 flex items-start gap-1.5">
          <span className="text-gold-500 shrink-0 mt-0.5">✦</span>
          <span>{a}</span>
        </li>
      ))}
    </ul>
  )},
];

export default function PropertyComparison({ projects, selectedIds, onClose, onClear, onRemove }: PropertyComparisonProps) {
  const selectedProjects = projects.filter(p => selectedIds.includes(p.id));

  if (selectedProjects.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-gray-900/50 dark:bg-gray-950/80 backdrop-blur-sm flex justify-center items-start sm:items-center p-3 sm:p-6 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-gold-50 dark:bg-gray-900 w-full max-w-6xl rounded-2xl border border-gold-200 dark:border-gold-800 shadow-2xl animate-fade-in my-4 sm:my-0">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gold-200 dark:border-gold-800 bg-white/60 dark:bg-gray-800/60 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <GitCompareArrows className="w-5 h-5 text-gold-700" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 dark:text-gold-100">
              Property Comparison
            </h3>
            <span className="px-2.5 py-0.5 bg-gold-100 dark:bg-gold-900 text-gold-800 dark:text-gold-200 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full border border-gold-200 dark:border-gold-800">
              {selectedProjects.length} Properties
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClear}
              className="px-3 py-1.5 text-xs font-mono text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-lg transition-all cursor-pointer"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto p-4 sm:p-6">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 pb-4 pr-4 w-40 sticky left-0 bg-gold-50 dark:bg-gray-900">
                  Attribute
                </th>
                {selectedProjects.map(p => (
                  <th key={p.id} className="text-left pb-4 px-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-serif text-sm sm:text-base font-bold text-gray-900 dark:text-gold-100 leading-tight">{p.name}</span>
                      <button
                        onClick={() => onRemove(p.id)}
                        className="self-start text-[10px] font-mono text-red-400 hover:text-red-600 cursor-pointer underline underline-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={row.key} className={idx % 2 === 0 ? 'bg-white/40 dark:bg-gray-800/40' : 'bg-gold-50/40 dark:bg-gray-900/40'}>
                  <td className="text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 py-3 px-3 pr-4 font-bold sticky left-0 bg-inherit">
                    {row.label}
                  </td>
                  {selectedProjects.map(p => (
                    <td key={p.id} className="py-3 px-3 text-xs text-gray-700 dark:text-gray-300 align-top leading-relaxed">
                      {row.render(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}