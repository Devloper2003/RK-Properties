'use client';

import { useState } from 'react';
import { Coins, Landmark, TrendingUp, Sparkles, Building, HelpCircle } from 'lucide-react';
import { Project } from '@/types/rk-properties';
import { propertiesData } from '@/data/propertyData';

interface InvestmentCalculatorProps {
  initialProjects?: Project[];
}

export default function InvestmentCalculator({ initialProjects = propertiesData }: InvestmentCalculatorProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [plotSize, setPlotSize] = useState<number>(150);
  const [customPriceVal, setCustomPriceVal] = useState<number>(30000);
  const [customRate, setCustomRate] = useState<number>(18);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const effectiveProjectId = selectedProjectId || initialProjects[0]?.id || '';
  const currentProject = initialProjects.find(p => p.id === effectiveProjectId);
  const currentPricePerYard = isCustom ? customPriceVal : (currentProject?.priceVal || 25000);
  const currentRate = isCustom ? customRate : (currentProject?.appreciationRate || 18);

  const principal = plotSize * currentPricePerYard;

  const calculateCompound = (principalAmount: number, annualRate: number, years: number) => {
    return Math.round(principalAmount * Math.pow(1 + annualRate / 100, years));
  };

  const get5YearReturn = () => calculateCompound(principal, currentRate, 5);
  const get10YearReturn = () => calculateCompound(principal, currentRate, 10);

  const compFD = calculateCompound(principal, 7, 5);
  const compGold = calculateCompound(principal, 10.5, 5);
  const compMF = calculateCompound(principal, 14, 5);
  const compRealEstate = get5YearReturn();

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} L`;
  };

  const formatRawCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div id="calculator-section" className="bg-white dark:bg-gray-900 rounded-3xl border border-gold-200/50 dark:border-gold-800/40 p-6 md:p-10 shadow-lg relative overflow-hidden select-none">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-b from-gold-300/15 to-transparent blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-700 text-[10px] font-mono uppercase tracking-widest mb-3">
              <Coins className="w-3 h-3 text-gold-600" />
              Dynamic Wealth Engineer
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-gold-800 dark:text-gold-100 tracking-tight">
              Pre-evaluate Your Vrindavan Legacy Yield
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-lg">
              Compare appreciation parameters of MVDA projects against traditional physical assets. Move sliders to simulate real-world outcomes.
            </p>
          </div>

          {/* Project selector */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 block">
              Step 1: Select Property Asset Preset
            </label>
            <div className="grid grid-cols-2 gap-3">
              {initialProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProjectId(p.id);
                    setIsCustom(false);
                  }}
                  className={`p-3 text-left rounded-xl border text-xs cursor-pointer transition-all ${
                    !isCustom && selectedProjectId === p.id
                      ? 'border-gold-600 bg-gold-100/40 dark:bg-gold-900/40 text-gold-800 dark:text-gold-200 font-medium'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gold-200 text-gray-600 dark:text-gray-400 bg-gold-50 dark:bg-gray-800'
                  }`}
                >
                  <div className="font-serif font-bold text-sm truncate">{p.name}</div>
                  <div className="flex justify-between items-center text-[10px] mt-1 font-mono text-gray-500">
                    <span>{p.price}</span>
                    <span className="text-gold-600 font-bold">+{p.appreciationRate}% / yr</span>
                  </div>
                </button>
              ))}

              <button
                onClick={() => setIsCustom(true)}
                className={`p-3 text-left rounded-xl border text-xs cursor-pointer transition-all col-span-2 ${
                  isCustom
                    ? 'border-gold-600 bg-gold-100/40 dark:bg-gold-900/40 text-gold-800 dark:text-gold-200 font-medium'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gold-200 text-gray-600 dark:text-gray-400 bg-gold-50 dark:bg-gray-800'
                }`}
              >
                <div className="font-serif font-bold text-sm">✦ Create Custom Asset Parameters</div>
                <p className="text-[10px] text-gray-500 mt-0.5">Define your own purchase price value and appreciation trajectory</p>
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Step 2: Plot Area Size</span>
                <span className="text-gold-700 dark:text-gold-300 font-bold text-sm">{plotSize} Sq. Yards</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="10"
                value={plotSize}
                onChange={(e) => setPlotSize(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                <span>100 Sq. Yds (approx. 900 Sq.Ft)</span>
                <span>1,000 Sq. Yds (villas)</span>
              </div>
            </div>

            {isCustom && (
              <div className="grid grid-cols-2 gap-4 pt-1 border-t border-gold-200/20 dark:border-gold-800/20 animate-fade-in">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-gray-500 dark:text-gray-400">
                    <span>Price / Sq. Yard</span>
                    <span className="text-gold-700 dark:text-gold-300 font-bold">₹{customPriceVal.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="60000"
                    step="500"
                    value={customPriceVal}
                    onChange={(e) => setCustomPriceVal(Number(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-gray-500 dark:text-gray-400">
                    <span>Appreciation rate</span>
                    <span className="text-gold-700 dark:text-gold-300 font-bold">+{customRate}% / Yr</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="35"
                    step="1"
                    value={customRate}
                    onChange={(e) => setCustomRate(Number(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Principal */}
          <div className="bg-gold-100/40 dark:bg-gold-900/30 border border-gold-200/40 dark:border-gold-800/30 rounded-2xl p-4 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Principal Net Outlay</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">({plotSize} Yds × ₹{currentPricePerYard.toLocaleString()})</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-serif text-gold-800 dark:text-gold-100 font-bold block">
                {formatRawCurrency(principal)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-6 bg-gold-50/80 dark:bg-gray-900/50 rounded-3xl border border-gold-200/30 dark:border-gold-800/30 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500">Projected Estate Accumulation</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gold-200/20 dark:border-gold-800/30 shadow-xs relative">
                <span className="text-[10px] font-mono text-gold-600 dark:text-gold-400 font-bold uppercase tracking-wider block mb-1">5 Year Projection</span>
                <span className="text-xl sm:text-2xl font-serif text-gold-800 dark:text-gold-100 font-bold block">
                  {formatCurrency(get5YearReturn())}
                </span>
                <span className="text-[10px] text-green-700 font-mono font-medium mt-1 inline-block">
                  ✦ {((get5YearReturn() / principal) - 1).toFixed(1)}X Net Growth
                </span>
              </div>

              <div className="p-4 bg-gold-50 dark:bg-gold-900/40 border border-gold-500/30 dark:border-gold-700/30 rounded-xl shadow-xs relative overflow-hidden">
                <span className="text-[10px] font-mono text-gold-700 dark:text-gold-300 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-600" />
                  10 Year Legacy Value
                </span>
                <span className="text-xl sm:text-2xl font-serif text-gold-700 dark:text-gold-300 font-bold block">
                  {formatCurrency(get10YearReturn())}
                </span>
                <span className="text-[10px] text-green-700 font-mono font-bold mt-1 inline-block">
                  ✦ {((get10YearReturn() / principal) - 1).toFixed(1)}X High Return
                </span>
              </div>
            </div>

            {/* Comparison Bars */}
            <div className="space-y-4 pt-4 border-t border-gold-200/20">
              <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                5-Year Asset Growth Comparison
              </span>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-gray-400" />
                      Traditional Bank FD (7%)
                    </span>
                    <span className="font-mono text-gray-600 font-medium">{formatCurrency(compFD)}</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gray-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(15, (compFD / compRealEstate) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                      Physical Gold (10.5%)
                    </span>
                    <span className="font-mono text-gray-600 font-medium">{formatCurrency(compGold)}</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(15, (compGold / compRealEstate) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                      SENSEX Mutual Funds (14%)
                    </span>
                    <span className="font-mono text-gray-600 font-medium">{formatCurrency(compMF)}</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(15, (compMF / compRealEstate) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1 bg-gold-100/30 p-2.5 rounded-xl border border-gold-200/30">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gold-800 font-bold flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-gold-600" />
                      RK Properties Plot (+{currentRate}%)
                    </span>
                    <span className="font-mono text-gold-700 font-bold">{formatCurrency(compRealEstate)}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gold-500 h-full rounded-full transition-all duration-500"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-normal mt-6 font-mono border-t border-gold-200/10 dark:border-gold-800/10 pt-3 flex items-center gap-1.5">
            <span>ℹ</span>
            <span>Historical figures of Vrindavan plots outperform traditional Indian banking models. Calculations assume steady annual compounded yields.</span>
          </p>
        </div>
      </div>
    </div>
  );
}