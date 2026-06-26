'use client';

import { Users, Building2, TrendingUp, Route, Banknote, ShieldCheck, TreePine, Globe, ArrowRight, Train, Landmark } from 'lucide-react';
import { usePropertyStore } from '@/store/use-property-store';

const reasons = [
  { icon: Users, title: '20M+ Annual Pilgrims', desc: 'Vrindavan attracts over 20 million visitors annually, creating massive demand for hospitality, rental, and residential real estate near temple corridors.' },
  { icon: Building2, title: 'Chandrodaya Temple', desc: 'The upcoming 70-story Vrindavan Chandrodaya Temple will be the world\'s tallest religious structure, anchoring an entire new commercial and residential ecosystem.' },
  { icon: TrendingUp, title: '18–24% Annual Returns', desc: 'Historic compound annual growth rate for MVDA authorized plots along Chhatikara transit core — significantly outperforming metro cities and fixed deposits.' },
  { icon: Route, title: 'Yamuna Expressway', desc: 'Seamless connectivity via Yamuna Expressway and upcoming Rapid Transit links connects Delhi-NCR in under 120 minutes. Semi-highspeed rail approved.' },
  { icon: Banknote, title: '₹2.8L Cr Govt Investment', desc: 'Uttar Pradesh state allocation for Mathura-Vrindavan Master Plan 2031 covering road widening, smart city infrastructure, sewage treatment, and heritage tourism.' },
  { icon: ShieldCheck, title: '100% Tax Exempt', desc: 'Reinvest company surplus funds in approved land parcels and optimize corporate returns. Inherited property enjoys stepped-up cost basis benefits.' },
  { icon: TreePine, title: 'Spiritual Heritage Value', desc: 'Land in Vrindavan holds intrinsic emotional and heritage value that transcends market cycles — a sacred family legacy for generations.' },
  { icon: Globe, title: 'NRI-Friendly Processes', desc: 'Complete remote purchase support via Power of Attorney, video-assisted registry bookings, and dedicated NRI loan products from SBI, HDFC, and ICICI.' },
];

const comparison = [
  { city: 'Vrindavan', returns: '18–24%', safety: 'MVDA + RERA', appreciation: '5Y: 2.5X', rental: 'High (Tourism)', score: '★★★★★' },
  { city: 'Haridwar', returns: '8–12%', safety: 'Partial', appreciation: '5Y: 1.5X', rental: 'Moderate', score: '★★★☆☆' },
  { city: 'Rishikesh', returns: '10–14%', safety: 'Limited', appreciation: '5Y: 1.7X', rental: 'Moderate', score: '★★★☆☆' },
  { city: 'Ayodhya', returns: '12–16%', safety: 'Developing', appreciation: '5Y: 1.9X', rental: 'Growing', score: '★★★★☆' },
  { city: 'Varanasi', returns: '8–11%', safety: 'Established', appreciation: '5Y: 1.4X', rental: 'Moderate', score: '★★★☆☆' },
];

const nriReasons = [
  { title: 'Remote Documentation', desc: 'Buy from anywhere in the world. PoA-assisted registry, video walkthroughs, and digital document verification.', icon: Globe },
  { title: 'Triple-Safety Lock', desc: 'Every title deed undergoes 3-layer legal verification: government API check, physical survey, and judicial review.', icon: ShieldCheck },
  { title: 'Bank Financing', desc: 'Pre-approved for 80% LTV from SBI, HDFC, ICICI. Interest rates 8.35%–9.15% for NRI home loans.', icon: Banknote },
  { title: 'Generational Wealth', desc: 'Stepped-up cost basis on inheritance. Children pay capital gains only on post-inheritance appreciation.', icon: TrendingUp },
];

export default function WhyVrindavanPage() {
  const { openOverlay } = usePropertyStore();

  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gold-800 via-gold-900 to-gold-950 px-6 py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-64 h-64 bg-amber-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <span className="animate-hero-text inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gold-200 text-[10px] font-mono uppercase tracking-widest">
            <Landmark className="w-3 h-3" /> Spiritual Capital
          </span>
          <h1 className="animate-hero-text animate-hero-text-delay-1 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Vrindavan&apos;s Majestic Ascent
          </h1>
          <p className="animate-hero-text animate-hero-text-delay-2 text-gold-200/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            From ancient sacred pilgrimage destination to India&apos;s fastest-growing spiritual real estate corridor. Backed by government mega-development mandates and prime infrastructure investment.
          </p>
        </div>
      </div>

      {/* Key Reasons Grid */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-2 tracking-tight">
          The Vrindavan Advantage
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">
          Eight compelling reasons why investors, NRIs, and business owners are choosing Vrindavan for wealth creation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group p-5 rounded-2xl border border-gold-200/40 dark:border-gold-800/30 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 hover:border-gold-300 dark:hover:border-gold-700"
            >
              <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-900/60 flex items-center justify-center mb-3 group-hover:bg-gold-200 dark:group-hover:bg-gold-800/60 transition-colors">
                <r.icon className="w-5 h-5 text-gold-600 dark:text-gold-400" />
              </div>
              <h3 className="font-serif font-bold text-gold-800 dark:text-gold-100 text-sm mb-1.5">{r.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mx-6" />

      {/* Comparison Table */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-2 tracking-tight">
          Vrindavan vs Other Religious Cities
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">How Vrindavan outperforms other spiritual real estate destinations.</p>
        <div className="overflow-x-auto rounded-2xl border border-gold-200/40 dark:border-gold-800/30">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="bg-gold-50 dark:bg-gray-900 text-gold-700 dark:text-gold-300">
                <th className="text-left px-4 py-3 font-bold uppercase tracking-wider">City</th>
                <th className="text-left px-4 py-3 font-bold uppercase tracking-wider">Returns</th>
                <th className="text-left px-4 py-3 font-bold uppercase tracking-wider">Safety</th>
                <th className="text-left px-4 py-3 font-bold uppercase tracking-wider">5Y Growth</th>
                <th className="text-left px-4 py-3 font-bold uppercase tracking-wider">Rental</th>
                <th className="text-left px-4 py-3 font-bold uppercase tracking-wider">Rating</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((c, i) => (
                <tr
                  key={c.city}
                  className={`border-t border-gold-100 dark:border-gold-800/20 ${
                    i === 0 ? 'bg-gold-50/50 dark:bg-gold-900/10' : ''
                  }`}
                >
                  <td className={`px-4 py-3 font-bold ${i === 0 ? 'text-gold-700 dark:text-gold-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    {c.city} {i === 0 && <span className="ml-1 text-[8px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase">Best</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{c.returns}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{c.safety}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{c.appreciation}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{c.rental}</td>
                  <td className="px-4 py-3 text-amber-500">{c.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section-divider mx-6" />

      {/* Why NRIs Choose Vrindavan */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-2 tracking-tight">
          Why NRIs Choose Vrindavan
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Tailored for global Indian professionals seeking spiritual + financial returns.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {nriReasons.map((r, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gold-200/30 dark:border-gold-800/20">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-900/60 flex items-center justify-center">
                <r.icon className="w-5 h-5 text-gold-600 dark:text-gold-400" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-gold-800 dark:text-gold-100 mb-1">{r.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mx-6" />

      {/* Growth Timeline */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-2 tracking-tight">
          Vrindavan Growth Trajectory
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Key milestones driving exponential appreciation.</p>
        <div className="space-y-6 relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300" />
          {[
            { year: '2020', event: 'Yamuna Expressway full operational — Delhi-NCR under 2hrs', done: true },
            { year: '2022', event: 'UP Govt announces ₹2.8L Cr Mathura-Vrindavan Master Plan 2031', done: true },
            { year: '2024', event: 'Chhatikara corridor records 24% annual land appreciation', done: true },
            { year: '2025', event: 'Chandrodaya Temple construction reaches 40 floors — tourism boom', done: false },
            { year: '2027', event: 'Delhi-Mathura semi-highspeed rail operational — 90 min connectivity', done: false },
            { year: '2030', event: 'Smart city infrastructure complete — projected 4.8X land value growth', done: false },
          ].map((item, i) => (
            <div key={i} className="flex gap-5 items-start relative">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 text-xs font-mono font-bold ${
                item.done
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                  : 'bg-gold-100 dark:bg-gray-800 text-gold-600 dark:text-gold-400 border-2 border-dashed border-gold-300 dark:border-gold-700'
              }`}>
                {item.done ? '✓' : item.year.slice(2)}
              </div>
              <div className="pt-1.5">
                <span className="text-[10px] font-mono text-gold-600 dark:text-gold-400 font-bold uppercase tracking-wider">{item.year}</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-10 bg-gradient-to-r from-gold-800 to-gold-900">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-serif font-bold text-white mb-3">Ready to Invest in Vrindavan?</h3>
          <p className="text-sm text-gold-200/80 mb-6">Schedule a free consultation with our investment advisory team.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => { usePropertyStore.getState().closeOverlay(); setTimeout(() => document.getElementById('contact-experience')?.scrollIntoView({ behavior: 'smooth' }), 400); }}
              className="px-6 py-3 bg-white text-gold-800 text-xs font-mono font-bold uppercase tracking-wider rounded-xl hover:bg-gold-50 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Book Free Consultation <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => openOverlay('premium-projects')}
              className="px-6 py-3 border border-white/30 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all cursor-pointer"
            >
              View Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}