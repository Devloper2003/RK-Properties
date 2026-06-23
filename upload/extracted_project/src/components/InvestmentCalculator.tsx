import React, { useState, useEffect } from 'react';
import { HelpCircle, Coins, Landmark, TrendingUp, Sparkles, Building } from 'lucide-react';
import { Project } from '../types';
import { propertiesData } from '../data/propertyData';

interface InvestmentCalculatorProps {
  initialProjects?: Project[];
}

export default function InvestmentCalculator({ initialProjects = propertiesData }: InvestmentCalculatorProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjects[0].id);
  const [plotSize, setPlotSize] = useState<number>(150); // in Sq. Yards
  const [customPriceVal, setCustomPriceVal] = useState<number>(30000);
  const [customRate, setCustomRate] = useState<number>(18);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Derive current values based on selection
  const currentProject = initialProjects.find(p => p.id === selectedProjectId);
  const currentPricePerYard = isCustom ? customPriceVal : (currentProject?.priceVal || 25000);
  const currentRate = isCustom ? customRate : (currentProject?.appreciationRate || 18);

  const principal = plotSize * currentPricePerYard;

  // Year projections compound calculation
  const calculateCompound = (principalAmount: number, annualRate: number, years: number) => {
    return Math.round(principalAmount * Math.pow(1 + annualRate / 100, years));
  };

  const get5YearReturn = () => calculateCompound(principal, currentRate, 5);
  const get10YearReturn = () => calculateCompound(principal, currentRate, 10);

  // Asset comparison metrics (at Year 5)
  // traditional benchmarks in India: FD @ 7%, Gold @ 10%, Mutual Funds @ 13.5%
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
    <div id="calculator-section" className="bg-white rounded-3xl border border-gold-200/50 p-6 md:p-10 shadow-lg relative overflow-hidden select-none">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-b from-[#eddcb9]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Setup Sliders */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-700 text-[10px] font-mono uppercase tracking-widest mb-3">
              <Coins className="w-3 h-3 text-gold-600" />
              Dynamic Wealth Engineer
            </div>
            <h3 className="text-2.5xl font-serif text-[#2D2926] tracking-tight">
              Pre-evaluate Your Vrindavan Legacy Yield
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-lg">
              Compare appreciation parameters of MVDA projects against traditional physical assets. Move sliders to simulate real-world outcomes.
            </p>
          </div>

          {/* Project preset selector */}
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
                      ? 'border-gold-600 bg-gold-100/40 text-gold-800 font-medium'
                      : 'border-gray-200 hover:border-gold-200 text-gray-600 bg-[#FCFBF7]'
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
                    ? 'border-gold-600 bg-gold-100/40 text-gold-800 font-medium'
                    : 'border-gray-200 hover:border-gold-200 text-gray-600 bg-[#FCFBF7]'
                }`}
              >
                <div className="font-serif font-bold text-sm">✦ Create Custom Asset Parameters</div>
                <p className="text-[10px] text-gray-500 mt-0.5">Define your own purchase price value and appreciation trajectory</p>
              </button>
            </div>
          </div>

          {/* Core Input Sliders */}
          <div className="space-y-6">
            {/* Plot size custom slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-gray-500 font-bold uppercase tracking-wider">Step 2: Plot Area Size</span>
                <span className="text-gold-700 font-bold text-sm">{plotSize} Sq. Yards</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="10"
                value={plotSize}
                onChange={(e) => setPlotSize(Number(e.target.value))}
                className="w-full h-1.5 bg-gold-100 rounded-lg appearance-none cursor-pointer accent-gold-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>100 Sq. Yds (approx. 900 Sq.Ft)</span>
                <span>1,000 Sq. Yds (villas)</span>
              </div>
            </div>

            {/* Custom inputs if custom toggle is active */}
            {isCustom && (
              <div className="grid grid-cols-2 gap-4 pt-1 border-t border-gold-200/20" style={{ animation: 'fadeIn 0.2s ease-out' }}>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-gray-500">
                    <span>Price / Sq. Yard</span>
                    <span className="text-gold-700 font-bold">₹{customPriceVal.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="60000"
                    step="500"
                    value={customPriceVal}
                    onChange={(e) => setCustomPriceVal(Number(e.target.value))}
                    className="w-full h-1 bg-gold-100 rounded-lg appearance-none cursor-pointer accent-gold-600"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-gray-500">
                    <span>Appreciation rate</span>
                    <span className="text-gold-700 font-bold">+{customRate}% / Yr</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="35"
                    step="1"
                    value={customRate}
                    onChange={(e) => setCustomRate(Number(e.target.value))}
                    className="w-full h-1 bg-gold-100 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Principal Outlay display */}
          <div className="bg-[#F4EFE6]/40 border border-gold-200/40 rounded-2xl p-4 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Principal Net Outlay</span>
              <span className="text-xs text-gray-500 font-mono">({plotSize} Yds × ₹{currentPricePerYard.toLocaleString()})</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-serif text-[#2D2926] font-bold block">
                {formatRawCurrency(principal)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Projections and comparisons visualization */}
        <div className="lg:col-span-6 bg-[#FCFBF7]/80 rounded-2.5xl border border-gold-200/30 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400">Projected Estate Accumulation</h4>
            
            {/* Year cards with large returns */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-gold-200/20 shadow-xs relative">
                <span className="text-[10px] font-mono text-gold-600 font-bold uppercase tracking-wider block mb-1">5 Year Projection</span>
                <span className="text-xl sm:text-2.5xl font-serif text-[#2D2926] font-bold block">
                  {formatCurrency(get5YearReturn())}
                </span>
                <span className="text-[10px] text-green-700 font-mono font-medium mt-1 inline-block">
                  ✦ {((get5YearReturn() / principal) - 1).toFixed(1)}X Net Growth
                </span>
              </div>

              <div className="p-4 bg-gold-50 border border-gold-400/30 rounded-xl shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-radial from-gold-500/10 to-transparent pointer-events-none" />
                <span className="text-[10px] font-mono text-gold-700 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-600" />
                  10 Year Legacy Value
                </span>
                <span className="text-xl sm:text-2.5xl font-serif text-gold-700 font-bold block">
                  {formatCurrency(get10YearReturn())}
                </span>
                <span className="text-[10px] text-green-700 font-mono font-bold mt-1 inline-block">
                  ✦ {((get10YearReturn() / principal) - 1).toFixed(1)}X High Return
                </span>
              </div>
            </div>

            {/* Asset Performance Comparator (Bar grid representation using raw Tailwind blocks) */}
            <div className="space-y-4 pt-4 border-t border-gold-200/20">
              <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider block">
                5-Year Asset Growth Comparison (Vrindavan Land vs Others)
              </span>

              <div className="space-y-3">
                {/* 1. Indian Bank FD */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-gray-400" />
                      Traditional Bank FD (7%)
                    </span>
                    <span className="font-mono text-gray-600 font-medium">{formatCurrency(compFD)}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gray-400 h-full rounded-full transition-all duration-550" 
                      style={{ width: `${Math.max(15, (compFD / compRealEstate) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* 2. Physical Gold */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                      Physical Gold Accumulation (10.5%)
                    </span>
                    <span className="font-mono text-gray-600 font-medium">{formatCurrency(compGold)}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-400 h-full rounded-full transition-all duration-550" 
                      style={{ width: `${Math.max(15, (compGold / compRealEstate) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* 3. Equities / Mutual Funds */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                      SENSEX Mutual Funds Index (14%)
                    </span>
                    <span className="font-mono text-gray-600 font-medium">{formatCurrency(compMF)}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-400 h-full rounded-full transition-all duration-550" 
                      style={{ width: `${Math.max(15, (compMF / compRealEstate) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* 4. RK Properties Plot (Sovereign Lands) */}
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
                      className="bg-gold-500 h-full rounded-full transition-all duration-550" 
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 leading-normal mt-6 font-mono border-t border-gold-200/10 pt-3 flex items-center gap-1.5">
            <span>ℹ</span>
            <span>Historical figures of Vrindavan plots outperform traditional Indian banking models. Calculations assume steady annual compounded yields.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
