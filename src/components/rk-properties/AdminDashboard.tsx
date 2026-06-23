'use client';

import { useState } from 'react';
import { Project, Lead } from '@/types/rk-properties';
import { Users, Calendar, Activity, TrendingUp, Check, RefreshCw, BarChart2, ShieldCheck, Mail, Phone, ArrowRight, X, Settings, Globe, LogOut, Plus } from 'lucide-react';

interface AdminDashboardProps {
  leads: Lead[];
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onUpdateLeadStatus: (leadId: string, status: Lead['status']) => void;
  onScheduleVisit: (leadId: string, date: string) => void;
  onClose: () => void;
}

export default function AdminDashboard({
  leads,
  projects,
  onAddProject,
  onUpdateLeadStatus,
  onScheduleVisit,
  onClose
}: AdminDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'leads' | 'projects' | 'analytics'>('leads');
  const [visitDateLeadId, setVisitDateLeadId] = useState<string | null>(null);
  const [visitDate, setVisitDate] = useState('');

  // States for adding a new project
  const [newProjName, setNewProjName] = useState('');
  const [newProjType, setNewProjType] = useState<Project['type']>('Residential Project');
  const [newProjStatus, setNewProjStatus] = useState<Project['status']>('Pre-launch');
  const [newProjLocation, setNewProjLocation] = useState('');
  const [newProjSize, setNewProjSize] = useState('');
  const [newProjPrice, setNewProjPrice] = useState('₹28,000 / Sq. Yard');
  const [newProjPriceVal, setNewProjPriceVal] = useState(28000);
  const [newProjAppreciation, setNewProjAppreciation] = useState(18);
  const [newProjDescription, setNewProjDescription] = useState('');
  const [newProjHighlights, setNewProjHighlights] = useState('');
  const [newProjAmenities, setNewProjAmenities] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  const statusColors: Record<string, string> = {
    'New': 'bg-blue-50 text-blue-700 border-blue-200',
    'Interested': 'bg-gold-100 text-gold-700 border-gold-200',
    'Site Visit': 'bg-purple-50 text-purple-700 border-purple-200',
    'Negotiation': 'bg-amber-50 text-amber-700 border-amber-200',
    'Deal Won': 'bg-green-50 text-green-700 border-green-200',
    'Archived': 'bg-gray-100 text-gray-500 border-gray-200'
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProject({
      name: newProjName,
      type: newProjType,
      status: newProjStatus,
      location: newProjLocation,
      size: newProjSize,
      price: newProjPrice,
      priceVal: newProjPriceVal,
      appreciationRate: newProjAppreciation,
      amenities: newProjAmenities.split(',').map(s => s.trim()).filter(Boolean),
      description: newProjDescription,
      highlights: newProjHighlights.split(',').map(s => s.trim()).filter(Boolean),
      roiProjection5Yr: '',
      roiProjection10Yr: '',
      details: '',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      tag: 'New Listing'
    });
    setAddSuccess(true);
    setTimeout(() => {
      setAddSuccess(false);
      setNewProjName('');
      setNewProjLocation('');
      setNewProjSize('');
      setNewProjDescription('');
      setNewProjHighlights('');
      setNewProjAmenities('');
    }, 2000);
  };

  const handleScheduleVisitSubmit = (leadId: string) => {
    if (!visitDate) return;
    onScheduleVisit(leadId, visitDate);
    setVisitDateLeadId(null);
    setVisitDate('');
  };

  // Analytics data
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const dealWon = leads.filter(l => l.status === 'Deal Won').length;
  const totalValue = leads.reduce((sum, l) => {
    const match = l.budget?.match(/[\d.]+/);
    return sum + (match ? parseFloat(match[0]) : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gold-800 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-gold-300" />
          <div>
            <h1 className="font-serif text-lg font-bold">RK Properties — Enterprise CRM Dashboard</h1>
            <p className="text-[10px] font-mono text-gold-300 uppercase tracking-widest">Admin Portal • Lead Pipeline & Asset Management</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gold-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        <div className="bg-white rounded-xl border p-4 shadow-xs">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-mono mb-1">
            <Users className="w-3.5 h-3.5" /> TOTAL LEADS
          </div>
          <span className="text-2xl font-serif font-bold text-gray-900">{totalLeads}</span>
        </div>
        <div className="bg-white rounded-xl border p-4 shadow-xs">
          <div className="flex items-center gap-2 text-blue-500 text-xs font-mono mb-1">
            <Activity className="w-3.5 h-3.5" /> NEW LEADS
          </div>
          <span className="text-2xl font-serif font-bold text-gray-900">{newLeads}</span>
        </div>
        <div className="bg-white rounded-xl border p-4 shadow-xs">
          <div className="flex items-center gap-2 text-green-600 text-xs font-mono mb-1">
            <TrendingUp className="w-3.5 h-3.5" /> DEALS WON
          </div>
          <span className="text-2xl font-serif font-bold text-gray-900">{dealWon}</span>
        </div>
        <div className="bg-white rounded-xl border p-4 shadow-xs">
          <div className="flex items-center gap-2 text-gold-600 text-xs font-mono mb-1">
            <BarChart2 className="w-3.5 h-3.5" /> PIPELINE VALUE
          </div>
          <span className="text-2xl font-serif font-bold text-gray-900">₹{totalValue.toFixed(0)}L</span>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="px-6">
        <div className="flex gap-2 border-b border-gray-200 mb-6">
          {[
            { id: 'leads' as const, label: 'Lead Pipeline', icon: Users },
            { id: 'projects' as const, label: 'Projects Registry', icon: Settings },
            { id: 'analytics' as const, label: 'Performance', icon: BarChart2 }
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveSubTab(t.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 font-medium cursor-pointer transition-all ${
                  activeSubTab === t.id
                    ? 'border-gold-600 text-gold-700 font-bold'
                    : 'border-transparent text-gray-500 hover:text-gold-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Leads Tab */}
      {activeSubTab === 'leads' && (
        <div className="px-6 pb-8">
          <div className="bg-white rounded-2xl border overflow-hidden shadow-xs">
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 sticky top-0">
                  <tr className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                    <th className="p-4">Lead</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Project Interest</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-400 font-mono text-xs">No leads captured yet. Visit the main website to capture leads.</td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="font-serif font-bold text-gray-900">{lead.name}</div>
                          <div className="text-gray-400 font-mono text-[10px] mt-0.5 flex items-center gap-2">
                            <Mail className="w-3 h-3" /> {lead.email}
                          </div>
                          <div className="text-gray-400 font-mono text-[10px] flex items-center gap-2">
                            <Phone className="w-3 h-3" /> {lead.phone}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{lead.category}</td>
                        <td className="p-4 font-medium text-gray-800">{lead.projectInterest}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${statusColors[lead.status] || 'bg-gray-100 text-gray-500'}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400 font-mono text-[10px]">
                          {new Date(lead.date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            {['Interested', 'Site Visit', 'Negotiation', 'Deal Won'].map((s) => (
                              <button
                                key={s}
                                onClick={() => onUpdateLeadStatus(lead.id, s as Lead['status'])}
                                className={`px-2 py-1 rounded text-[9px] font-mono font-bold uppercase cursor-pointer transition-all border ${
                                  lead.status === s ? 'bg-gold-600 text-white border-gold-600' : 'bg-white text-gray-500 border-gray-200 hover:border-gold-300 hover:text-gold-600'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                          {visitDateLeadId === lead.id ? (
                            <div className="flex items-center gap-1 mt-2 animate-fade-in">
                              <input
                                type="date"
                                value={visitDate}
                                onChange={(e) => setVisitDate(e.target.value)}
                                className="px-2 py-1 border rounded text-[10px] font-mono"
                              />
                              <button
                                onClick={() => handleScheduleVisitSubmit(lead.id)}
                                className="p-1 bg-gold-600 text-white rounded cursor-pointer text-[10px]"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => { setVisitDateLeadId(lead.id); setVisitDate(''); }}
                              className="flex items-center gap-1 mt-2 text-[9px] font-mono text-purple-600 hover:text-purple-800 cursor-pointer"
                            >
                              <Calendar className="w-3 h-3" /> Schedule Visit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeSubTab === 'projects' && (
        <div className="px-6 pb-8 space-y-8">
          {/* Add Project Form */}
          <div className="bg-white rounded-2xl border p-6 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-gold-600" />
              Add New Project
            </h3>

            {addSuccess ? (
              <div className="py-8 text-center animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl border border-green-200 text-sm font-mono">
                  <Check className="w-4 h-4" /> Project added successfully!
                </div>
              </div>
            ) : (
              <form onSubmit={handleAddProjectSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">Project Name *</label>
                  <input required value={newProjName} onChange={(e) => setNewProjName(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-gold-500" placeholder="Project name" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">Type</label>
                  <select value={newProjType} onChange={(e) => setNewProjType(e.target.value as Project['type'])} className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-gold-500">
                    {['Residential Project', 'Investment Plots', 'Premium Township', 'Verified Estates'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">Status</label>
                  <select value={newProjStatus} onChange={(e) => setNewProjStatus(e.target.value as Project['status'])} className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-gold-500">
                    {['Pre-launch', 'Selling Fast', 'Almost Sold Out', 'Fully Developed'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">Location</label>
                  <input value={newProjLocation} onChange={(e) => setNewProjLocation(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-gold-500" placeholder="Location" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">Size</label>
                  <input value={newProjSize} onChange={(e) => setNewProjSize(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-gold-500" placeholder="e.g. 100 - 300 Sq. Yards" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">Price / Sq. Yard</label>
                  <input type="number" value={newProjPriceVal} onChange={(e) => { setNewProjPriceVal(Number(e.target.value)); setNewProjPrice(`₹${Number(e.target.value).toLocaleString()} / Sq. Yard`); }} className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-gold-500" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">Appreciation Rate (%)</label>
                  <input type="number" min="1" max="50" value={newProjAppreciation} onChange={(e) => setNewProjAppreciation(Number(e.target.value))} className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-gold-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">Description</label>
                  <textarea value={newProjDescription} onChange={(e) => setNewProjDescription(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-gold-500 h-16 resize-none" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">Highlights (comma separated)</label>
                  <input value={newProjHighlights} onChange={(e) => setNewProjHighlights(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-gold-500" placeholder="Highlight 1, Highlight 2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">Amenities (comma separated)</label>
                  <input value={newProjAmenities} onChange={(e) => setNewProjAmenities(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-gold-500" placeholder="Amenity 1, Amenity 2" />
                </div>
                <div className="sm:col-span-3 flex justify-end">
                  <button type="submit" className="px-6 py-2.5 bg-gold-600 hover:bg-gold-800 text-white font-mono text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Project
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Projects List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border p-5 shadow-xs hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-serif font-bold text-gray-900">{p.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border ${statusColors[p.status] || 'bg-gray-100 text-gray-500'}`}>
                    {p.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 mb-2">
                  <span>{p.type}</span> • <span>{p.location}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gold-700 font-bold">{p.price}</span>
                  <span className="text-green-700 font-bold">+{p.appreciationRate}% / yr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeSubTab === 'analytics' && (
        <div className="px-6 pb-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Distribution */}
            <div className="bg-white rounded-2xl border p-6 shadow-xs">
              <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-gold-600" /> Lead Status Distribution
              </h3>
              <div className="space-y-3">
                {(['New', 'Interested', 'Site Visit', 'Negotiation', 'Deal Won', 'Archived'] as const).map((status) => {
                  const count = leads.filter(l => l.status === status).length;
                  const pct = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
                  return (
                    <div key={status} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-600">{status}</span>
                        <span className="text-gray-400">{count} leads</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gold-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-2xl border p-6 shadow-xs">
              <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-gold-600" /> Lead Category Breakdown
              </h3>
              <div className="space-y-3">
                {Array.from(new Set(leads.map(l => l.category))).map((cat) => {
                  const count = leads.filter(l => l.category === cat).length;
                  return (
                    <div key={cat} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-xs text-gray-700 font-medium">{cat}</span>
                      <span className="px-2 py-0.5 bg-gold-100 text-gold-700 rounded-full text-[10px] font-mono font-bold">{count}</span>
                    </div>
                  );
                })}
                {leads.length === 0 && (
                  <p className="text-xs text-gray-400 font-mono text-center py-4">No lead data available yet.</p>
                )}
              </div>
            </div>

            {/* Project Interest */}
            <div className="bg-white rounded-2xl border p-6 shadow-xs md:col-span-2">
              <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gold-600" /> Project Interest Map
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projects.map((p) => {
                  const count = leads.filter(l => l.projectInterest === p.name).length;
                  return (
                    <div key={p.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-center">
                      <div className="font-serif font-bold text-gray-900 text-sm mb-1">{p.name}</div>
                      <div className="text-2xl font-serif text-gold-600 font-bold">{count}</div>
                      <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Leads</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}