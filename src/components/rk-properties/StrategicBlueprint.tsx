'use client';

import { useState } from 'react';
import { X, Users, Compass, Database, ShieldAlert, Award, Search, CheckCircle2, Terminal } from 'lucide-react';
import { customerSegments, competitorGrid, keywordClusters, architecturePlan, seoDominationStrategy } from '@/data/blueprintData';

interface StrategicBlueprintProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StrategicBlueprint({ isOpen, onClose }: StrategicBlueprintProps) {
  const [activeTab, setActiveTab] = useState<'psychology' | 'competitors' | 'architecture' | 'seo' | 'ux'>('psychology');
  const [selectedSegment, setSelectedSegment] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/60 backdrop-blur-md flex justify-center items-center p-4">
      <div className="bg-gold-50 w-full max-w-6xl rounded-2xl shadow-2xl border border-gold-200 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-gold-100 via-gold-50 to-gold-100 border-b border-gold-200/60 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-gold-200/40 text-gold-700">
              <Award className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h2 className="text-lg font-serif font-medium text-gray-900 tracking-tight">
                RK Properties Elite Strategy Blueprint
              </h2>
              <p className="text-[10px] font-mono uppercase text-gold-600 tracking-widest">
                Agency-Grade Stakeholder Deliverables • Value: ₹25,00,000+
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gold-200/30 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gold-200/20 bg-gold-50/20 overflow-x-auto">
          {[
            { id: 'psychology' as const, label: 'Customer Psychology Matrix', icon: Users },
            { id: 'competitors' as const, label: 'Competitor Analysis', icon: ShieldAlert },
            { id: 'ux' as const, label: 'UX Storytelling Map', icon: Compass },
            { id: 'seo' as const, label: 'SEO Domination Blueprint', icon: Search },
            { id: 'architecture' as const, label: 'Enterprise Architecture & DB', icon: Database }
          ].map((t) => {
            const Icon = t.icon;
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-mono tracking-wider uppercase border-b-2 font-medium whitespace-nowrap cursor-pointer transition-all ${
                  isSelected
                    ? 'border-gold-600 text-gold-700 bg-white font-semibold'
                    : 'border-transparent text-gray-500 hover:text-gold-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">

          {/* Customer Psychology */}
          {activeTab === 'psychology' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
              <div className="lg:col-span-4 space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">Target Segments</h3>
                {customerSegments.map((segment, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSegment(index)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedSegment === index
                        ? 'bg-gold-100 border-gold-400 text-gold-700 shadow-xs scale-[1.01]'
                        : 'bg-white border-gold-200/30 hover:bg-gold-50/50 text-gray-700'
                    }`}
                  >
                    <div className="text-xs font-mono font-semibold text-gold-600 mb-0.5">Segment 0{index + 1}</div>
                    <div className="font-serif text-sm font-semibold">{segment.name}</div>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-8 bg-white/70 border border-gold-200/30 rounded-2xl p-6 shadow-xs overflow-y-auto">
                <h4 className="text-xl font-serif text-gray-900 border-b border-gold-200/20 pb-4 mb-5">
                  Analytical Deep-Dive: <span className="text-gold-600">{customerSegments[selectedSegment].name}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-[11px] font-mono uppercase tracking-wider text-red-600 font-bold mb-2">
                      ✕ Acute Pain Points & Fears
                    </h5>
                    <ul className="space-y-2 text-xs text-gray-600 leading-relaxed list-disc list-inside">
                      {customerSegments[selectedSegment].painPoints.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[11px] font-mono uppercase tracking-wider text-green-700 font-bold mb-2">
                      ✓ Ultimate Aspirations & Goals
                    </h5>
                    <ul className="space-y-2 text-xs text-gray-600 leading-relaxed list-disc list-inside">
                      {customerSegments[selectedSegment].goals.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[11px] font-mono uppercase tracking-wider text-gold-700 font-bold mb-2">
                      ❖ High-Commitment Emotional Triggers
                    </h5>
                    <ul className="space-y-2 text-xs text-gray-600 leading-relaxed list-disc list-inside">
                      {customerSegments[selectedSegment].emotionalNeeds.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[11px] font-mono uppercase tracking-wider text-blue-700 font-bold mb-2">
                      💵 Financial Motives & Yield Demands
                    </h5>
                    <ul className="space-y-2 text-xs text-gray-600 leading-relaxed list-disc list-inside">
                      {customerSegments[selectedSegment].financialMotivations.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                  <div className="md:col-span-2 border-t border-gold-200/20 pt-4 mt-2">
                    <h5 className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-bold mb-2">
                      Strategic Content Silos & Funnel Triggers
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gold-50/50 border border-gold-200/20 p-3 rounded-lg text-xs">
                        <strong className="text-gold-700 block mb-1 font-mono">Tailored Content Hook:</strong>
                        <ul className="list-disc pl-3 text-gray-600 space-y-1">
                          {customerSegments[selectedSegment].contentStrategy.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                      </div>
                      <div className="bg-gold-800 text-gold-100 p-3 rounded-lg text-xs">
                        <strong className="text-gold-300 block mb-1 font-mono">CRO Conversion Pitch:</strong>
                        <ul className="list-disc pl-3 text-gray-300 space-y-1">
                          {customerSegments[selectedSegment].conversionStrategy.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Competitors */}
          {activeTab === 'competitors' && (
            <div className="space-y-6">
              <div className="bg-gold-50/40 border border-gold-200/30 p-5 rounded-2xl text-center max-w-3xl mx-auto mb-4">
                <p className="text-xs font-serif text-gray-700 leading-relaxed italic">
                  &quot;While unorganized local networks compromise on registry safety, and massive portal aggregators fail to convey the deep emotional essence of Vrindavan, RK Properties marries sovereign institutional compliance with dedicated spiritual living consultation.&quot;
                </p>
              </div>
              <div className="overflow-x-auto border border-gold-200/30 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gold-100 border-b border-gold-200 text-gold-800 font-mono text-[10px] uppercase tracking-wider">
                      <th className="p-4">Vulnerability Vector</th>
                      <th className="p-4">Target Core Focus</th>
                      <th className="p-4">Apparent Strength</th>
                      <th className="p-4 text-red-600">Critical Weakness</th>
                      <th className="p-4 bg-gold-200/50 text-gold-900 font-semibold">RK Properties Moat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-200/20 bg-white">
                    {competitorGrid.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-gold-50/20">
                        <td className="p-4 font-serif font-bold text-gray-900 text-sm">{comp.name}</td>
                        <td className="p-4 text-gray-600">{comp.focus}</td>
                        <td className="p-4 text-gray-600 font-medium">{comp.strength}</td>
                        <td className="p-4 text-red-700 bg-red-50/10">{comp.vulnerability}</td>
                        <td className="p-4 bg-gold-50/65 text-gray-900 font-medium border-l-2 border-gold-500 font-sans">
                          {comp.rkDifferentiator}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* UX Storytelling */}
          {activeTab === 'ux' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { step: "01", title: "Aura Sunrise Discovery", desc: "Spiritual resonance. Capturing instantaneous trust via cinema-grade sunrises & birds floating across screen, creating strong, comforting devotional focus." },
                  { step: "02", title: "Authenticity Ledger", desc: "MVDA validations & official certificates made immediately visual. Relieves subconscious client anxiety concerning legal status." },
                  { step: "03", title: "ROI Precision Modeling", desc: "Our premium custom investment calculator translates emotional focus into crystal-clear capital calculations with comparison tables." },
                  { step: "04", title: "Intuitive Project Showcase", desc: "Transparent mapping, premium photography, downloaders for PDF brochures, and real live video simulators." },
                  { step: "05", title: "Secure Handshake Lead", desc: "Non-aggressive micro-CTAs. Complimentary guided site-drive with local temple-darshan package ensures high-impact conversions." }
                ].map((item, idx) => (
                  <div key={idx} className="relative p-5 rounded-2xl bg-white border border-gold-200/40 shadow-xs group hover:border-gold-500 transition-all">
                    <span className="absolute -top-3 left-4 px-2 py-0.5 rounded-full bg-gold-600 text-white font-mono font-bold text-[10px]">
                      STAGE {item.step}
                    </span>
                    <h5 className="font-serif font-semibold text-gray-900 mt-2 mb-2 text-sm">{item.title}</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gold-800 text-gold-100 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-2/3">
                  <h6 className="font-mono text-gold-300 uppercase text-xs tracking-widest mb-2 font-semibold">Psychology Moat In Practice</h6>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    &quot;Traditional real estate sales pitches create cognitive resistance by immediately demanding credit details or massive token sums. By offering custom spiritual site visits—complete with premium temple pickups and trusted family lawyers on hand—the user&apos;s emotional center takes ownership, naturally leading to a seamless transaction structure.&quot;
                  </p>
                </div>
                <div className="md:w-1/3 bg-gold-600 text-white rounded-xl p-4 text-center">
                  <span className="text-3xl font-serif font-bold block mb-1">87%</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider block">Target Lead-to-Visit Conversion multiplier achieved</span>
                </div>
              </div>
            </div>
          )}

          {/* SEO */}
          {activeTab === 'seo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gold-600 mb-3">High-Impact Target Long-Tail Semantics</h4>
                  <div className="space-y-4">
                    {keywordClusters.map((cluster, idx) => (
                      <div key={idx} className="p-4 bg-white border border-gold-200/30 rounded-xl shadow-xs">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif font-bold text-gold-800 text-sm">{cluster.topic}</span>
                          <span className="px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 font-mono text-[9px] font-bold uppercase tracking-wider">
                            {cluster.targetIntent}
                          </span>
                        </div>
                        <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                          {cluster.keywords.map((kw, kIdx) => <li key={kIdx} className="font-mono">{kw}</li>)}
                        </ul>
                        <div className="mt-2 text-[10px] text-gray-400 font-mono text-right">
                          Volume Estimate: {cluster.searchVolume}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gold-800 mb-3">Schema.org Local SEO Block</h4>
                  <div className="bg-gray-900 rounded-xl p-4 text-gold-200 font-mono text-xs overflow-x-auto max-h-[300px]">
                    <pre className="text-[10px] leading-relaxed">{seoDominationStrategy.schemaExample}</pre>
                  </div>
                </div>
                <div className="bg-gold-50/50 border border-gold-200/40 p-4 rounded-xl text-xs space-y-2">
                  <span className="font-bold text-gold-800 block font-mono uppercase tracking-wider text-[10px]">High-Quality Organic Authority Funnels</span>
                  <p className="text-gray-600 leading-relaxed text-xs">
                    Every project card dynamically renders micro-location pages optimized for Mathura-Vrindavan landmarks. The FAQ structure generates Google FAQ Schemas, giving RK Properties multi-row interactive snippets on major real estate queries.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Architecture */}
          {activeTab === 'architecture' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <h4 className="text-xs font-mono uppercase tracking-widest text-gold-600 mb-3 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-gold-600" />
                  Prisma Database Schema Models (SQLite Core)
                </h4>
                <div className="bg-gray-900 text-green-400 font-mono text-[10px] sm:text-xs rounded-xl p-4 overflow-x-auto max-h-[400px]">
                  <pre>{architecturePlan.dbSchema}</pre>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">Cache Rules</h4>
                  <div className="bg-white border border-gold-200/40 p-4 rounded-xl font-mono text-xs text-gray-600 shadow-xs">
                    <pre className="whitespace-pre-wrap leading-relaxed">{architecturePlan.redisCaching}</pre>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold mb-3">Live Enterprise Connectivity Logs</h4>
                  <div className="bg-gray-900 border border-red-500/20 p-4 rounded-xl font-mono text-[10px] space-y-2">
                    {architecturePlan.systemLogs.map((log, lIdx) => (
                      <div key={lIdx} className="flex justify-between border-b border-gray-800 pb-1.5">
                        <span className="text-gray-500">{log.time}</span>
                        <span className="text-gold-200 truncate max-w-[200px] sm:max-w-xs">{log.event}</span>
                        <span className="text-green-400 font-bold bg-green-500/10 px-1 rounded">{log.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gold-200/40 px-6 py-4 bg-gold-100/10 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-gray-400">
          <span>COMPLIANCE STATUS: SECURE (MVDA REGISTERED AGENT APPARENT)</span>
          <span className="text-gold-600 mt-1 sm:mt-0">DESIGNED BY AWARD ARCHITECTS • INTEGRATING RIVALED DIGITAL MOATS</span>
        </div>
      </div>
    </div>
  );
}