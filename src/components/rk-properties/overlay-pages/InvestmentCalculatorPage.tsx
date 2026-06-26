'use client';

import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, IndianRupee, Home, Percent, ArrowRight } from 'lucide-react';
import { usePropertyStore } from '@/store/use-property-store';

const horizons = [
  { label: '5 Years', value: 5 },
  { label: '10 Years', value: 10 },
  { label: '15 Years', value: 15 },
];

export default function InvestmentCalculatorPage() {
  const { projects } = usePropertyStore();
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [plotSize, setPlotSize] = useState(200);
  const [horizon, setHorizon] = useState(5);
  const [downPayment, setDownPayment] = useState(30);

  const project = useMemo(() => projects.find(p => p.id === projectId), [projects, projectId]);

  const calculations = useMemo(() => {
    if (!project) return null;
    const pricePerSqYard = project.priceVal;
    const totalCost = pricePerSqYard * plotSize;
    const downAmount = totalCost * (downPayment / 100);
    const loanAmount = totalCost - downAmount;
    const rate = project.appreciationRate / 100;
    const years = horizon;
    const futureValue = totalCost * Math.pow(1 + rate, years);
    const totalReturn = futureValue - totalCost;
    const roiPercent = ((futureValue / totalCost - 1) * 100).toFixed(1);
    const loanRate = 0.0875; // ~8.75% interest
    const emiMonths = years * 12;
    const emi = loanAmount > 0 ? (loanAmount * loanRate * Math.pow(1 + loanRate, emiMonths)) / (Math.pow(1 + loanRate, emiMonths) - 1) : 0;
    const monthlyRental = totalCost * 0.003; // ~3.6% annual rental yield

    return {
      totalCost: Math.round(totalCost),
      downAmount: Math.round(downAmount),
      loanAmount: Math.round(loanAmount),
      futureValue: Math.round(futureValue),
      totalReturn: Math.round(totalReturn),
      roiPercent,
      emi: Math.round(emi),
      monthlyRental: Math.round(monthlyRental),
      multiplier: (futureValue / totalCost).toFixed(1),
    };
  }, [project, plotSize, horizon, downPayment]);

  if (!project || !calculations) return null;

  const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');

  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gold-800 via-gold-900 to-gold-950 px-6 py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <span className="animate-hero-text inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gold-200 text-[10px] font-mono uppercase tracking-widest">
            <Calculator className="w-3 h-3" /> Financial Planning
          </span>
          <h1 className="animate-hero-text animate-hero-text-delay-1 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Investment Calculator
          </h1>
          <p className="animate-hero-text animate-hero-text-delay-2 text-gold-200/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Model your potential returns based on historical appreciation data. Plan your investment with confidence.
          </p>
        </div>
      </div>

      <div className="px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gold-200/40 dark:border-gold-800/30 p-6">
              <h3 className="text-sm font-serif font-bold text-gold-800 dark:text-gold-100 mb-5 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-gold-600" /> Investment Parameters
              </h3>

              {/* Project Select */}
              <div className="mb-5">
                <label className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 block">Select Project</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gold-200 dark:border-gold-700 bg-gold-50/50 dark:bg-gray-800 text-sm text-gold-800 dark:text-gold-100 font-medium focus:outline-none focus:ring-2 focus:ring-gold-400 cursor-pointer"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name} — {p.price}</option>
                  ))}
                </select>
              </div>

              {/* Plot Size */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">Plot Size</label>
                  <span className="text-sm font-mono font-bold text-gold-700 dark:text-gold-300">{plotSize} Sq. Yards</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={600}
                  step={10}
                  value={plotSize}
                  onChange={(e) => setPlotSize(Number(e.target.value))}
                  className="w-full gold-track cursor-pointer"
                  style={{ '--track-fill': `${((plotSize - 100) / 500) * 100}%` } as React.CSSProperties}
                />
                <div className="flex justify-between text-[9px] font-mono text-gray-400 mt-1">
                  <span>100</span><span>600</span>
                </div>
              </div>

              {/* Investment Horizon */}
              <div className="mb-5">
                <label className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 block">Investment Horizon</label>
                <div className="flex gap-2">
                  {horizons.map(h => (
                    <button
                      key={h.value}
                      onClick={() => setHorizon(h.value)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        horizon === h.value
                          ? 'bg-gold-800 text-white shadow-md'
                          : 'bg-gold-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gold-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">Down Payment</label>
                  <span className="text-sm font-mono font-bold text-gold-700 dark:text-gold-300">{downPayment}%</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={100}
                  step={5}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full gold-track cursor-pointer"
                  style={{ '--track-fill': `${((downPayment - 20) / 80) * 100}%` } as React.CSSProperties}
                />
                <div className="flex justify-between text-[9px] font-mono text-gray-400 mt-1">
                  <span>20%</span><span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-3 space-y-5">
            {/* Main Result */}
            <div className="bg-gradient-to-br from-gold-800 to-gold-900 rounded-2xl p-6 sm:p-8 text-white gold-glow-border">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold-300/80 mb-1">Projected Value in {horizon} Years</p>
              <p className="text-3xl sm:text-4xl font-serif font-bold mb-1">{fmt(calculations.futureValue)}</p>
              <p className="text-sm text-gold-200/70 font-mono">
                <span className="text-emerald-400 font-bold">{calculations.multiplier}X</span> growth on {fmt(calculations.totalCost)} investment
              </p>
              <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-emerald-400 transition-all duration-700"
                  style={{ width: `${Math.min(parseFloat(calculations.multiplier) / 6 * 100, 100)}%` }}
                />
              </div>
              <p className="text-[10px] font-mono text-gold-300/60 mt-1">
                Based on {project.appreciationRate}% historical CAGR
              </p>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gold-200/40 dark:border-gold-800/30 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <IndianRupee className="w-4 h-4 text-gold-600" />
                  <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">Total Investment</span>
                </div>
                <p className="text-lg font-serif font-bold text-gold-800 dark:text-gold-100">{fmt(calculations.totalCost)}</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gold-200/40 dark:border-gold-800/30 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">Total Returns</span>
                </div>
                <p className="text-lg font-serif font-bold text-emerald-600 dark:text-emerald-400">+{fmt(calculations.totalReturn)}</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gold-200/40 dark:border-gold-800/30 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-4 h-4 text-gold-600" />
                  <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">ROI</span>
                </div>
                <p className="text-lg font-serif font-bold text-gold-700 dark:text-gold-300">{calculations.roiPercent}%</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gold-200/40 dark:border-gold-800/30 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-4 h-4 text-gold-600" />
                  <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">Est. Monthly EMI</span>
                </div>
                <p className="text-lg font-serif font-bold text-gold-800 dark:text-gold-100">{fmt(calculations.emi)}</p>
              </div>
            </div>

            {/* Rental Yield */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gold-200/40 dark:border-gold-800/30 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Est. Monthly Rental Yield</p>
                  <p className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-100">{fmt(calculations.monthlyRental)}<span className="text-sm font-mono text-gray-400 ml-2">/month</span></p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">~3.6% annual yield</p>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed">
              * Calculations are based on historical appreciation data and are indicative only. Actual returns may vary based on market conditions, location, and project-specific factors. This is not financial advice. Please consult a certified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-10 bg-gradient-to-r from-gold-800 to-gold-900">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-serif font-bold text-white mb-3">Get Personalized Advice</h3>
          <p className="text-sm text-gold-200/80 mb-6">Our investment advisory team can create a customized financial model for your specific needs.</p>
          <button
            onClick={() => { usePropertyStore.getState().closeOverlay(); setTimeout(() => document.getElementById('contact-experience')?.scrollIntoView({ behavior: 'smooth' }), 400); }}
            className="px-6 py-3 bg-white text-gold-800 text-xs font-mono font-bold uppercase tracking-wider rounded-xl hover:bg-gold-50 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            Free Consultation <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}