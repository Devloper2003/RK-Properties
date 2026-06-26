'use client';

import {
  MapPin, Train, Plane, Building2, Landmark,
  Star, ChevronRight, Clock, Navigation
} from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/use-scroll-animations';

const landmarks = [
  {
    icon: Landmark,
    name: 'Prem Mandir',
    distance: '2 min drive',
    description: 'Iconic white marble temple with evening light & sound show',
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200/50',
  },
  {
    icon: Star,
    name: 'Bankey Bihari Temple',
    distance: '5 min drive',
    description: 'Ancient Thakur Ji temple, heart of Vrindavan devotion',
    color: 'from-gold-600 to-gold-700',
    bgLight: 'bg-gold-50',
    textColor: 'text-gold-700',
    borderColor: 'border-gold-200/50',
  },
  {
    icon: Building2,
    name: 'Chandrodaya Temple',
    distance: '8 min drive',
    description: 'World\'s tallest 70-story religious skyscraper (under construction)',
    color: 'from-gold-500 to-gold-600',
    bgLight: 'bg-gold-100',
    textColor: 'text-gold-700',
    borderColor: 'border-gold-200/50',
  },
  {
    icon: Navigation,
    name: 'Yamuna Expressway',
    distance: '15 min to access',
    description: 'Direct 165km highway to Delhi-NCR, 6-lane access controlled',
    color: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200/50',
  },
  {
    icon: Train,
    name: 'Mathura Junction',
    distance: '20 min drive',
    description: 'Broad gauge railway, upcoming Delhi-Mathura semi-highspeed rail',
    color: 'from-sky-500 to-blue-500',
    bgLight: 'bg-sky-50',
    textColor: 'text-sky-700',
    borderColor: 'border-sky-200/50',
  },
  {
    icon: Plane,
    name: 'IGI Airport Delhi',
    distance: '2 hrs via expressway',
    description: 'International airport — NRI pickup service available on request',
    color: 'from-violet-500 to-purple-500',
    bgLight: 'bg-violet-50',
    textColor: 'text-violet-700',
    borderColor: 'border-violet-200/50',
  },
];

const connectivityScores = [
  { label: 'Temple Corridor Proximity', score: 100, color: 'bg-gold-500' },
  { label: 'Delhi-NCR Highway Access', score: 95, color: 'bg-emerald-500' },
  { label: 'National Highway Network', score: 90, color: 'bg-emerald-500' },
  { label: 'Railway Connectivity', score: 80, color: 'bg-gold-500' },
];

function AnimatedBar({ score, color, label, delay }: { score: number; color: string; label: string; delay: number }) {
  const { count, ref } = useAnimatedCounter(score, 1800, true);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
          {label}
        </span>
        <span className="text-[11px] font-mono text-gold-700 font-bold">
          {count}%
        </span>
      </div>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{
            width: `${count}%`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function LocationCorridorSection() {
  return (
    <section
      id="location-corridor"
      className="py-20 bg-gradient-to-b from-gold-50 via-white to-gold-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-animate className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">
            Prime Geographic Positioning
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-gold-100 mt-2 tracking-tight">
            Strategic Location <span className="text-gold-600 italic">Advantage</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed font-light max-w-2xl mx-auto">
            Every RK Properties project is strategically positioned in Vrindavan&apos;s highest-appreciation corridors — walking distance from sacred temples and minutes from national highways.
          </p>
        </div>

        {/* Landmark Cards Grid */}
        <div data-animate-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {landmarks.map((lm, idx) => {
            const Icon = lm.icon;
            return (
              <div
                key={lm.name}
                data-animate
                style={{ '--stagger-idx': idx } as React.CSSProperties}
                className={`group relative p-5 rounded-2xl bg-white dark:bg-gray-900 border ${lm.borderColor} dark:border-gold-800/40 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                {/* Gradient accent top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${lm.color}`} />

                <div className="flex items-start gap-4 mt-1">
                  <div className={`p-2.5 rounded-xl ${lm.bgLight} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 ${lm.textColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-gray-900 dark:text-gold-100 text-sm">{lm.name}</h4>
                    <div className="flex items-center gap-1.5 mt-1 mb-2">
                      <Clock className="w-3 h-3 text-gold-600" />
                      <span className={`text-[11px] font-mono font-bold ${lm.textColor}`}>
                        {lm.distance}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                      {lm.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gold-600 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Connectivity Score */}
        <div data-animate className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-5 h-5 text-gold-600" />
              <h3 className="font-serif font-bold text-gray-900 dark:text-gold-100 text-base">
                Connectivity Score
              </h3>
              <span className="text-[9px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider ml-auto">
                From RK Properties Project Zones
              </span>
            </div>
            <div className="space-y-4">
              {connectivityScores.map((cs, idx) => (
                <AnimatedBar
                  key={cs.label}
                  label={cs.label}
                  score={cs.score}
                  color={cs.color}
                  delay={idx * 200}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}