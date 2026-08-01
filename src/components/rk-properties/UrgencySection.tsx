'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { usePropertyStore } from '@/store/use-property-store';

interface AvailabilityItem {
  projectId: string;
  name: string;
  totalPlots: number;
  remaining: number;
  type: 'Selling Fast' | 'Almost Sold Out' | 'Pre-launch' | 'MVDA Approved' | 'New Launch';
}

const HARD_CODED_AVAILABILITY: AvailabilityItem[] = [
  { projectId: 'bbk', name: 'Bankey Bihari Kunj', totalPlots: 120, remaining: 34, type: 'MVDA Approved' },
  { projectId: 'bbg', name: 'Bankey Bihari Greens', totalPlots: 80, remaining: 65, type: 'New Launch' },
  { projectId: 'bav', name: 'Braj Anand Vatika', totalPlots: 60, remaining: 48, type: 'New Launch' },
  { projectId: 'bbd', name: 'Bankey Bihari Dham', totalPlots: 90, remaining: 22, type: 'MVDA Approved' },
  { projectId: 'blg', name: 'Braj Lotus Greens', totalPlots: 50, remaining: 42, type: 'New Launch' },
];

function useCountdown(targetDate: Date) {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      setDays(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    };
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return days;
}

export default function UrgencySection() {
  const { scrollToId } = usePropertyStore();
  const [priceRevisionDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 15);
    return d;
  });
  const daysLeft = useCountdown(priceRevisionDate);

  const getBarColor = (type: string, soldPercent: number) => {
    if (soldPercent >= 80) return 'from-red-500 to-red-400';
    if (soldPercent >= 50) return 'from-amber-500 to-amber-400';
    return 'from-gold-500 to-gold-400';
  };

  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'Almost Sold Out': return 'bg-red-50 text-red-600 border-red-200';
      case 'Selling Fast': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'MVDA Approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'New Launch': return 'bg-violet-50 text-violet-700 border-violet-200';
      default: return 'bg-sky-50 text-sky-600 border-sky-200';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white dark:from-gray-950 to-gold-50 dark:to-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-animate className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/50 rounded-full mb-4">
            <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-600">Limited Availability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-gold-100 font-bold tracking-tight">
            Plots Are Disappearing Fast
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto font-light leading-relaxed">
            Vrindavan&apos;s most sought-after MVDA-approved estates are seeing unprecedented demand.
            Secure your plot before the next price revision.
          </p>
        </div>

        {/* Availability Bars */}
        <div data-animate-stagger className="space-y-5 mb-12">
          {HARD_CODED_AVAILABILITY.map((item, idx) => {
            const soldPercent = Math.round(((item.totalPlots - item.remaining) / item.totalPlots) * 100);
            return (
              <div
                key={item.projectId}
                data-animate
                style={{ '--stagger-idx': idx } as React.CSSProperties}
                className="bg-white dark:bg-gray-900 border border-gold-200/50 dark:border-gold-800/40 rounded-2xl p-5 sm:p-6 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-gray-900 dark:text-gold-100">{item.name}</h4>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${getBadgeClass(item.type)}`}>
                      {item.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-200">{item.remaining}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono"> / {item.totalPlots} Plots Remaining</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full h-3 bg-gold-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${getBarColor(item.type, soldPercent)} transition-all duration-1000 ease-out`}
                    style={{ width: `${soldPercent}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] font-mono text-gray-400">{soldPercent}% Sold</span>
                  <span className="text-[10px] font-mono text-gray-400">{item.remaining} Available</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Countdown + CTA */}
        <div data-animate className="bg-gold-800 rounded-2xl p-6 sm:p-8 text-center shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-gold-300" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold-300 font-bold">
              Next Price Revision In
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="text-5xl sm:text-6xl font-serif font-bold text-white">{daysLeft}</span>
            <span className="text-xl font-serif text-gold-300 self-end mb-2">Days</span>
          </div>
          <p className="text-xs text-gold-200/70 font-mono mb-6 max-w-md mx-auto">
            Historical data shows 12-18% price escalation at each revision cycle.
            Lock in current pre-revision rates today.
          </p>
          <button
            onClick={() => scrollToId('contact-experience')}
            className="relative inline-flex items-center gap-2 px-8 py-4 bg-white text-gold-800 rounded-xl font-mono text-sm font-bold uppercase tracking-wider hover:bg-gold-50 cursor-pointer transition-all shadow-lg hover:shadow-xl animate-pulse-slow"
          >
            <AlertTriangle className="w-4 h-4" />
            Book Before Sold Out
            <span className="absolute inset-0 rounded-xl ring-2 ring-gold-300/50 animate-ping-slow pointer-events-none" />
          </button>
        </div>
      </div>
    </section>
  );
}