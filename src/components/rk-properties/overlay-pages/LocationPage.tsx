'use client';

import { MapPin, Clock, Train, Plane, Car, Building2, Landmark, ArrowRight, Navigation } from 'lucide-react';
import { usePropertyStore } from '@/store/use-property-store';

const corridors = [
  {
    name: 'Chhatikara NH-2 Corridor',
    tag: 'Highest Returns',
    desc: 'The central real estate transit corridor of Mathura-Vrindavan. Directly on National Highway 2 with massive daily transit visibility. Fastest appreciation zone at 24% CAGR.',
    features: ['Highway Frontage', 'Commercial Zoning', '24% Annual Returns', 'Immediate Registry'],
    distances: [
      { to: 'Prem Mandir', time: '5 min' },
      { to: 'Chandrodaya Temple', time: '2 min' },
      { to: 'Mathura Junction', time: '15 min' },
    ],
    projects: ['Bankey Bihari Kunj', 'Bankey Bihari Dham'],
    status: 'Active Development',
    statusColor: 'bg-emerald-500',
  },
  {
    name: 'Yamuna Expressway Corridor',
    tag: 'NRI Favourite',
    desc: 'Seamless Delhi-NCR connectivity in under 120 minutes. Ideal for retired professionals and NRIs seeking peaceful spiritual living with world-class infrastructure.',
    features: ['Expressway Access', 'Elder-Friendly', '18% Annual Returns', 'Bio-Metric Security'],
    distances: [
      { to: 'Yamuna Expressway', time: '5 min' },
      { to: 'Delhi-NCR', time: '120 min' },
      { to: 'Banke Bihari Temple', time: '20 min' },
    ],
    projects: ['Bankey Bihari Greens', 'Bankey Bihari Dham'],
    status: 'Rapid Growth',
    statusColor: 'bg-sky-500',
  },
  {
    name: 'Govardhan Parikrama Marg',
    tag: 'Ultra Luxury',
    desc: 'Located on the sacred periphery of Govardhan Parikrama. Extremely rare, highly restricted land parcels with zero structural threats. For the discerning few.',
    features: ['Sacred Views', 'VIP Security', 'Herirloom Value', 'Helipad Access'],
    distances: [
      { to: 'Radhakund', time: '2 min' },
      { to: 'Govardhan Hill', time: '5 min' },
      { to: 'Vrindavan Center', time: '30 min' },
    ],
    projects: ['Braj Lotus Greens', 'Braj Anand Vatika'],
    status: 'Exclusive',
    statusColor: 'bg-gold-600',
  },
];

const connectivity = [
  { icon: Train, label: 'Delhi-NCR', detail: '120 min via Yamuna Expressway', upcoming: '90 min semi-highspeed rail' },
  { icon: Car, label: 'Agra', detail: '60 min via NH-2', upcoming: null },
  { icon: MapPin, label: 'Mathura Junction', detail: '15 min drive', upcoming: null },
  { icon: Plane, label: 'Agra Airport', detail: '45 min drive', upcoming: 'New airport expansion' },
  { icon: Clock, label: 'Delhi Airport', detail: '2.5 hrs via Expressway', upcoming: null },
  { icon: Landmark, label: 'Prem Mandir', detail: '5 min from Chhatikara', upcoming: null },
];

const infrastructure = [
  { name: 'Chandrodaya Temple', desc: '70-story world\'s tallest religious structure — under construction', progress: 55, color: 'from-gold-400 to-gold-600' },
  { name: 'Delhi-Mathura Rail', desc: 'Semi-highspeed rail corridor — ₹12,000 Cr investment approved', progress: 20, color: 'from-sky-400 to-sky-600' },
  { name: 'Smart City Infra', desc: 'Road widening, sewage treatment, heritage tourism development', progress: 40, color: 'from-emerald-400 to-emerald-600' },
  { name: 'Expressway Expansion', desc: 'New interchanges and dedicated freight corridors', progress: 35, color: 'from-amber-400 to-amber-600' },
];

export default function LocationPage() {
  const { openOverlay } = usePropertyStore();

  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gold-800 via-gold-900 to-gold-950 px-6 py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-emerald-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-80 h-48 bg-gold-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <span className="animate-hero-text inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gold-200 text-[10px] font-mono uppercase tracking-widest">
            <Navigation className="w-3 h-3" /> Strategic Advantage
          </span>
          <h1 className="animate-hero-text animate-hero-text-delay-1 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Location & Connectivity
          </h1>
          <p className="animate-hero-text animate-hero-text-delay-2 text-gold-200/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Three premium corridors positioned at the intersection of spiritual heritage and infrastructural growth. Each offering distinct investment advantages.
          </p>
        </div>
      </div>

      {/* Location Corridor Cards */}
      <div className="px-6 py-10 space-y-6">
        {corridors.map((c, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gold-200/40 dark:border-gold-800/30 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="text-xl font-serif font-bold text-gold-800 dark:text-gold-100">{c.name}</h3>
                <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider bg-gold-100 dark:bg-gold-900/60 text-gold-700 dark:text-gold-300">{c.tag}</span>
                <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider text-white" style={{ backgroundColor: 'var(--tw-bg-opacity, inherit)' }}>
                  <span className={`inline-block px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider text-white ${c.statusColor}`}>{c.status}</span>
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 max-w-2xl">{c.desc}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {c.features.map((f, j) => (
                  <div key={j} className="px-3 py-2 rounded-xl bg-gold-50 dark:bg-gray-800 text-xs font-mono text-gold-700 dark:text-gold-300 font-semibold text-center">
                    {f}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                {c.distances.map((d, j) => (
                  <span key={j} className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-gold-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{d.to}</span>
                    <span>— {d.time}</span>
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gold-100 dark:border-gold-800/30">
                <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Projects in this corridor</p>
                <p className="text-xs text-gold-700 dark:text-gold-300 font-medium">{c.projects.join(' • ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-divider mx-6" />

      {/* Connectivity Grid */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-2 tracking-tight">Connectivity Hub</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Well-connected to major cities and transport hubs.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectivity.map((c, i) => (
            <div key={i} className="p-4 rounded-2xl border border-gold-200/40 dark:border-gold-800/30 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-gold-100 dark:bg-gold-900/60 flex items-center justify-center">
                  <c.icon className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                </div>
                <h3 className="font-serif font-bold text-sm text-gold-800 dark:text-gold-100">{c.label}</h3>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">{c.detail}</p>
              {c.upcoming && (
                <p className="text-[10px] text-sky-600 dark:text-sky-400 font-mono mt-1.5 flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> Upcoming: {c.upcoming}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mx-6" />

      {/* Infrastructure Progress */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-2 tracking-tight">Upcoming Infrastructure</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Transformative projects driving land value appreciation.</p>
        <div className="space-y-5">
          {infrastructure.map((inf, i) => (
            <div key={i} className="p-5 rounded-2xl border border-gold-200/40 dark:border-gold-800/30 bg-white dark:bg-gray-900">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif font-bold text-sm text-gold-800 dark:text-gold-100">{inf.name}</h3>
                <span className="text-xs font-mono font-bold text-gold-600 dark:text-gold-400">{inf.progress}%</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{inf.desc}</p>
              <div className="h-2 rounded-full bg-gold-100 dark:bg-gray-800 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${inf.color} transition-all duration-1000`}
                  style={{ width: `${inf.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="px-6 py-10">
        <div className="relative h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-gold-100 to-gold-50 dark:from-gray-900 dark:to-gray-950 border border-gold-200/40 dark:border-gold-800/30 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gold-400 rounded-full blur-2xl" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-400 rounded-full blur-2xl" />
          </div>
          <div className="relative text-center z-10">
            <MapPin className="w-10 h-10 text-gold-600 dark:text-gold-400 mx-auto mb-3" />
            <p className="text-sm font-serif font-bold text-gold-800 dark:text-gold-100">Vrindavan, Mathura District</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Uttar Pradesh, India — 28.6°N 77.7°E</p>
            <p className="text-[10px] font-mono text-gray-400 mt-3">Interactive map coming soon</p>
          </div>
          {/* Pin markers */}
          <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gold-500 rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-sky-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-10 bg-gradient-to-r from-gold-800 to-gold-900">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-serif font-bold text-white mb-3">Visit These Corridors</h3>
          <p className="text-sm text-gold-200/80 mb-6">Experience the locations firsthand with our complimentary site tour. Free Delhi-NCR pick-up included.</p>
          <button
            onClick={() => { usePropertyStore.getState().closeOverlay(); setTimeout(() => document.getElementById('contact-experience')?.scrollIntoView({ behavior: 'smooth' }), 400); }}
            className="px-6 py-3 bg-white text-gold-800 text-xs font-mono font-bold uppercase tracking-wider rounded-xl hover:bg-gold-50 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            Schedule Free Site Tour <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}