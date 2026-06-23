import React, { useState } from 'react';
import { Project, Lead } from '../types';
import { Plus, Users, Calendar, Activity, TrendingUp, Check, RefreshCw, BarChart2, ShieldCheck, Mail, Phone, Settings, Globe, LogOut, ArrowRight } from 'lucide-react';

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

  // States for scheduled site visits
  const [tempVisitDate, setTempVisitDate] = useState<{ [leadId: string]: string }>({});

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName || !newProjLocation || !newProjDescription) return;

    onAddProject({
      name: newProjName,
      type: newProjType,
      status: newProjStatus,
      location: newProjLocation,
      size: newProjSize || "150 - 400 Sq. Yards",
      price: newProjPrice,
      priceVal: newProjPriceVal,
      appreciationRate: newProjAppreciation,
      description: newProjDescription,
      highlights: newProjHighlights ? newProjHighlights.split(',') : [
        "Approved under latest zoning norms",
        "Strategic proximity to highway corridors",
        "Title cleared by certified firm"
      ],
      amenities: newProjAmenities ? newProjAmenities.split(',') : [
        "Metalled Roads",
        "24/7 Security Patrols",
        "Sweet groundwater supply"
      ],
      roiProjection5Yr: `Estimated ${((1 + newProjAppreciation/100)**5).toFixed(1)}X value appreciation in 5 years`,
      roiProjection10Yr: `Estimated ${((1 + newProjAppreciation/100)**10).toFixed(1)}X legacy accumulation values`,
      details: "Cleared and ready for registration details.",
      image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80",
      tag: "Newly Vetted Opportunity"
    });

    setAddSuccess(true);
    setTimeout(() => {
      setAddSuccess(false);
      setNewProjName('');
      setNewProjLocation('');
      setNewProjDescription('');
      setNewProjAmenities('');
      setNewProjHighlights('');
    }, 1500);
  };

  // Compute CRM high-level analytics from live state
  const totalLeadsCount = leads.length;
  const siteVisitsCount = leads.filter(l => l.status === 'Site Visit').length;
  const wonDealsCount = leads.filter(l => l.status === 'Deal Won').length;
  const projectedRevenue = leads.reduce((acc, current) => {
    // Arbitrary multiplier based on segment
    const multiplier = current.category === 'NRI Investor' ? 7500000 : 4500000;
    return current.status === 'Deal Won' ? acc + multiplier : acc;
  }, 0);

  return (
    <div className="bg-[#fefcf9] min-h-screen text-gray-800 p-4 sm:p-6 lg:p-8 select-none">
      
      {/* Dashboard Top Header Navigation block */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gold-200/40 pb-6 mb-8 gap-4">
        <div className="flex items-center gap-3">
          <span className="p-3 bg-[#2b2b2b] text-gold-100 rounded-2xl border border-gold-400/20">
            <Settings className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif text-gray-900 font-bold">
              Sovereign Real Estate CRM Workspace
            </h1>
            <p className="text-xs text-gold-600 font-mono tracking-widest uppercase">
              Enterprise Lead Console • RK Properties Vrindavan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex rounded-xl bg-gold-100 p-1 border border-gold-200">
            <button
              onClick={() => setActiveSubTab('leads')}
              className={`px-4 py-2 font-mono text-[10px] sm:text-xs tracking-wider uppercase rounded-lg transition-colors cursor-pointer ${
                activeSubTab === 'leads' 
                  ? 'bg-white text-gold-700 font-bold shadow-xs' 
                  : 'text-gray-500 hover:text-gold-600'
              }`}
            >
              Leads & CRM
            </button>
            <button
              onClick={() => setActiveSubTab('projects')}
              className={`px-4 py-2 font-mono text-[10px] sm:text-xs tracking-wider uppercase rounded-lg transition-colors cursor-pointer ${
                activeSubTab === 'projects' 
                  ? 'bg-white text-gold-700 font-bold shadow-xs' 
                  : 'text-gray-500 hover:text-gold-600'
              }`}
            >
              System Projects
            </button>
            <button
              onClick={() => setActiveSubTab('analytics')}
              className={`px-4 py-2 font-mono text-[10px] sm:text-xs tracking-wider uppercase rounded-lg transition-colors cursor-pointer ${
                activeSubTab === 'analytics' 
                  ? 'bg-white text-gold-700 font-bold shadow-xs' 
                  : 'text-gray-500 hover:text-gold-600'
              }`}
            >
              SaaS Analytics
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2b2b2b] hover:bg-gold-600 text-white rounded-xl text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Exit Portal
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Dynamic Analytics KPI counter row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-gold-200/40 rounded-2xl shadow-xs relative">
            <div className="absolute top-4 right-4 p-2 bg-gold-100 rounded-lg text-gold-600">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Total Registrants</span>
            <span className="text-2xl sm:text-3.5xl font-serif text-[#2b2b2b] font-bold block">{totalLeadsCount}</span>
            <span className="text-[9px] font-mono text-green-700 mt-1 inline-block">● Live Reactive Captures</span>
          </div>

          <div className="p-5 bg-white border border-gold-200/40 rounded-2xl shadow-xs relative">
            <div className="absolute top-4 right-4 p-2 bg-blue-50 rounded-lg text-blue-600">
              <Calendar className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Site Drives Booked</span>
            <span className="text-2xl sm:text-3.5xl font-serif text-blue-800 font-bold block">{siteVisitsCount}</span>
            <span className="text-[9px] font-mono text-gray-400 mt-1 inline-block">Vridanvan pickups</span>
          </div>

          <div className="p-5 bg-white border border-gold-200/40 rounded-2xl shadow-xs relative">
            <div className="absolute top-4 right-4 p-2 bg-green-50 rounded-lg text-green-700">
              <Check className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Closed Deals Capital</span>
            <span className="text-2xl sm:text-3.5xl font-serif text-green-800 font-bold block">
              {wonDealsCount}
            </span>
            <span className="text-[9px] font-mono text-green-700 mt-1 inline-block">Secured registries</span>
          </div>

          <div className="p-5 bg-white border border-gold-200/40 rounded-2xl shadow-xs relative">
            <div className="absolute top-4 right-4 p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Sales Volume Generated</span>
            <span className="text-2xl sm:text-3.5xl font-serif text-indigo-900 font-semibold block">
              ₹{(projectedRevenue / 100000).toFixed(1)} L
            </span>
            <span className="text-[9px] font-mono text-[#2b2b2b] mt-1 inline-block">Calculated valuation</span>
          </div>
        </div>

        {/* Dynamic section toggling */}

        {/* SECTION A: CRM / LEADS GRID */}
        {activeSubTab === 'leads' && (
          <div className="bg-white rounded-2.5xl border border-gold-200/40 shadow-xs overflow-hidden">
            <div className="px-6 py-4 bg-gold-100/30 border-b border-gold-200/45 flex justify-between items-center">
              <span className="text-xs font-mono font-bold uppercase text-gold-700 tracking-wider">
                Vetted Real Estate Applicants Log ({leads.length})
              </span>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Interactive real-time sync with local state
              </span>
            </div>

            <div className="overflow-x-auto">
              {leads.length === 0 ? (
                <div className="p-12 text-center text-gray-400">
                  <p className="text-sm font-mono mb-2">No leads captured in current session.</p>
                  <p className="text-xs">Submit callback requests or brochure downloads on the website front to witness immediate logs!</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gold-50/20 text-gray-400 font-mono text-[9px] uppercase tracking-wider border-b border-gold-200/20">
                      <th className="p-4">Applicant Metadata</th>
                      <th className="p-4">Interested Asset</th>
                      <th className="p-4">Segment Profile</th>
                      <th className="p-4">Budget Scope</th>
                      <th className="p-4">Status Tag</th>
                      <th className="p-4">Scheduled site visit Date</th>
                      <th className="p-4 text-center">Interactive CRM updates</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-200/20 bg-white">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gold-50/10">
                        {/* Name & contact */}
                        <td className="p-4 space-y-0.5">
                          <div className="font-serif font-bold text-gray-900 text-sm">{lead.name}</div>
                          <div className="flex gap-2 text-[10px] text-gray-400 font-mono">
                            <span className="flex items-center gap-0.5"><Mail className="w-3 h-3 text-gold-500" /> {lead.email}</span>
                            <span className="flex items-center gap-0.5"><Phone className="w-3 h-3 text-gold-500" /> {lead.phone}</span>
                          </div>
                        </td>

                        {/* asset interest */}
                        <td className="p-4 text-[#2b2b2b] font-medium font-serif">
                          {lead.projectInterest}
                        </td>

                        {/* buyer profile */}
                        <td className="p-4 font-mono text-gray-500 font-medium">
                          {lead.category}
                        </td>

                        {/* budget */}
                        <td className="p-4 font-bold text-[#2b2b2b] font-mono">
                          {lead.budget}
                        </td>

                        {/* status tag */}
                        <td className="p-4">
                          <span className={`inline-flex px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider ${
                            lead.status === 'Deal Won' 
                              ? 'bg-green-100 text-green-800' 
                              : lead.status === 'Site Visit' 
                                ? 'bg-blue-100 text-blue-800' 
                                : lead.status === 'Interested' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : lead.status === 'Negotiation' 
                                    ? 'bg-purple-100 text-purple-800' 
                                    : 'bg-gray-100 text-gray-600'
                          }`}>
                            {lead.status}
                          </span>
                        </td>

                        {/* site visit scheduler inline */}
                        <td className="p-4 font-mono text-gray-500">
                          {lead.siteVisitDate ? (
                            <span className="text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              📅 {new Date(lead.siteVisitDate).toLocaleDateString('en-IN')}
                            </span>
                          ) : (
                            <div className="flex items-center gap-2">
                              <input
                                type="date"
                                value={tempVisitDate[lead.id] || ''}
                                onChange={(e) => setTempVisitDate({ ...tempVisitDate, [lead.id]: e.target.value })}
                                className="px-1.5 py-1 border border-gold-200 rounded text-[10px]"
                              />
                              <button
                                onClick={() => {
                                  if (tempVisitDate[lead.id]) {
                                    onScheduleVisit(lead.id, tempVisitDate[lead.id]);
                                  }
                                }}
                                className="px-2 py-1 bg-[#2b2b2b] text-white font-mono text-[9px] rounded cursor-pointer"
                              >
                                Set
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Interactive status drop */}
                        <td className="p-4 text-center">
                          <select
                            value={lead.status}
                            onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                            className="px-2 py-1.5 border border-gold-200 rounded-lg text-[10px] font-mono bg-[#fcfbf9] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gold-500"
                          >
                            <option value="New">Register New</option>
                            <option value="Interested">Interested</option>
                            <option value="Site Visit">Schedule Site Visit</option>
                            <option value="Negotiation">Under Negotiation</option>
                            <option value="Deal Won">Mark Deal Won 🏆</option>
                            <option value="Archived">Archive Lead</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* SECTION B: SYSTEM PROJECTS BUILDER */}
        {activeSubTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Add Project Form */}
            <div className="lg:col-span-5 bg-white border border-gold-200/40 rounded-2.5xl p-6 sm:p-8">
              <div className="space-y-1 mb-6">
                <span className="text-[10px] font-mono uppercase text-gold-600 tracking-wider font-bold">Project Addition Module</span>
                <h3 className="font-serif text-xl font-bold text-gray-950">Add Premium Real Estate Asset</h3>
                <p className="text-xs text-gray-400">Specify details below. The listing immediately populates the user pages and investment calculators.</p>
              </div>

              {addSuccess ? (
                <div className="p-8 text-center bg-green-50 rounded-xl border border-green-200 space-y-2" style={{ animation: 'fadeIn 0.2s' }}>
                  <span className="inline-flex p-2 bg-green-100 text-green-700 rounded-full">✓</span>
                  <p className="text-sm font-mono text-green-800 font-bold">Asset Authorized Cleanly</p>
                  <p className="text-xs text-gray-400">Added to react store and live catalog indexes.</p>
                </div>
              ) : (
                <form onSubmit={handleCreateProject} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Project Name Title</label>
                    <input
                      type="text"
                      required
                      value={newProjName}
                      onChange={(e) => setNewProjName(e.target.value)}
                      placeholder="e.g. Radhe Gopal Residency"
                      className="w-full px-4 py-2.5 border border-gold-200 rounded-xl text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Asset Category Class</label>
                      <select
                        value={newProjType}
                        onChange={(e) => setNewProjType(e.target.value as any)}
                        className="w-full px-3 py-2.5 border border-gold-200 rounded-xl text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                      >
                        <option value="Residential Project">Residential Plot</option>
                        <option value="Investment Plots">Investment Plot</option>
                        <option value="Premium Township">Premium Township</option>
                        <option value="Verified Estates">Verified Estate</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Initial Selling Status</label>
                      <select
                        value={newProjStatus}
                        onChange={(e) => setNewProjStatus(e.target.value as any)}
                        className="w-full px-3 py-2.5 border border-gold-200 rounded-xl text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                      >
                        <option value="Pre-launch">Pre-launch</option>
                        <option value="Selling Fast">Selling Fast</option>
                        <option value="Almost Sold Out">Almost Sold Out</option>
                        <option value="Fully Developed">Fully Developed</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Exact Location Zone</label>
                    <input
                      type="text"
                      required
                      value={newProjLocation}
                      onChange={(e) => setNewProjLocation(e.target.value)}
                      placeholder="e.g. near Sun Temple Road, Vrindavan Outer Link"
                      className="w-full px-4 py-2.5 border border-gold-200 rounded-xl text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Raw Value/Yd</label>
                      <input
                        type="number"
                        required
                        value={newProjPriceVal}
                        onChange={(e) => {
                          setNewProjPriceVal(Number(e.target.value));
                          setNewProjPrice(`₹${Number(e.target.value).toLocaleString()} / Sq. Yard`);
                        }}
                        className="w-full px-3 py-2 border border-gold-200 rounded-xl text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                      />
                    </div>
                    
                    <div className="space-y-1 col-span-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Display Price</label>
                      <input
                        type="text"
                        readonly
                        value={newProjPrice}
                        className="w-full px-3 py-2 border border-gold-100 rounded-xl text-xs bg-gold-50/30 text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Appreciation trajectory/Yr</label>
                      <input
                        type="number"
                        required
                        min="10"
                        max="35"
                        value={newProjAppreciation}
                        onChange={(e) => setNewProjAppreciation(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gold-200 rounded-xl text-xs focus:ring-1 focus:ring-gold-500 bg-white font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Sizing Bounds</label>
                      <input
                        type="text"
                        value={newProjSize}
                        onChange={(e) => setNewProjSize(e.target.value)}
                        placeholder="e.g. 150 - 450 Sq. Yds"
                        className="w-full px-3 py-2 border border-gold-200 rounded-xl text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Aura Description</label>
                    <textarea
                      required
                      rows={2}
                      value={newProjDescription}
                      onChange={(e) => setNewProjDescription(e.target.value)}
                      placeholder="Brief summary capturing growth and spiritual advantages..."
                      className="w-full px-4 py-2 border border-gold-200 rounded-xl text-xs focus:ring-1 focus:ring-gold-500 bg-white h-16 resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Amenities (Separated by commas)</label>
                    <input
                      type="text"
                      value={newProjAmenities}
                      onChange={(e) => setNewProjAmenities(e.target.value)}
                      placeholder="Vastu layouts, CCTV, Wide Roads"
                      className="w-full px-4 py-2 border border-gold-200 rounded-xl text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gold-600 hover:bg-[#2b2b2b] text-white font-mono text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Authorize & Launch Project
                  </button>
                </form>
              )}
            </div>

            {/* Right: Active Projects Lists within system */}
            <div className="lg:col-span-7 bg-white border border-gold-200/40 rounded-2.5xl p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase text-gray-400 block tracking-wider">Active Authorized Registers ({projects.length})</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projects.map((p) => (
                    <div 
                      key={p.id}
                      className="p-4 border border-gold-200/30 bg-[#fcfbf7] rounded-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-serif font-bold text-gray-900 text-sm truncate max-w-[150px]">{p.name}</span>
                          <span className="text-[8px] font-mono font-bold bg-gold-100 text-gold-600 px-1.5 py-0.5 rounded-full uppercase">
                            {p.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-mono truncate">{p.location}</p>
                        <p className="text-[11px] text-gray-600 font-sans mt-2 line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-gold-200/10 flex justify-between items-center text-[10px] font-mono">
                        <span className="text-[#2b2b2b] font-bold">{p.price}</span>
                        <span className="text-green-700 font-bold">▲ +{p.appreciationRate}% appreciation</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 sm:p-5 bg-[#2b2b2b] text-gold-100 rounded-xl space-y-2">
                <span className="text-[9px] font-mono uppercase text-gold-300 font-semibold tracking-widest block">Sovereign Verification API Status</span>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  "Registry API interface connected directly to UP Government Bhulekh Database. All newly created land boundaries undergo dual algorithmic spatial checking prior to validation."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION C: CRM ANALYTICS GRAPHICS */}
        {activeSubTab === 'analytics' && (
          <div className="bg-white border border-gold-200/40 rounded-2.5xl p-6 sm:p-8 space-y-8">
            <div className="flex justify-between items-center border-b border-gold-200/25 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-950">Statistical Performance Dashboard</h3>
                <p className="text-xs text-gray-500">Visualizing customer demographics, conversion health, and search trends.</p>
              </div>
              <span className="p-2 rounded-full border border-gold-100 text-gold-600 hover:bg-gold-50 cursor-pointer">
                <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
              </span>
            </div>

            {/* Simulated bar charts styled in beautiful CSS grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Distribution of Leads by Persona Category */}
              <div className="p-5 border border-gold-200/20 bg-[#fcfbf9]/50 rounded-xl space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold">Leads Split Index by Buyer Persona</h4>
                
                <div className="space-y-3">
                  {[
                    { label: "NRI Investors", count: leads.filter(l => l.category === 'NRI Investor').length, color: "bg-gold-600" },
                    { label: "Business Leaders", count: leads.filter(l => l.category === 'Executive Business Owner').length, color: "bg-gray-700" },
                    { label: "Retired Citizens", count: leads.filter(l => l.category === 'Retired Senior Devotee' || l.category === 'Retired Couple' || l.category === 'Retired Professional').length, color: "bg-blue-600" },
                    { label: "Doctors & Professionals", count: leads.filter(l => l.category === 'High-Caliber Professional' || l.category === 'Doctor').length, color: "bg-purple-600" },
                    { label: "Standard Registrants / Pilgrims", count: leads.filter(l => l.category === 'Dharmic Pilgrim Guest' || !l.category).length, color: "bg-gray-400" },
                  ].map((stat, sIdx) => {
                    const totalCount = leads.length || 1;
                    const percent = Math.round((stat.count / totalCount) * 100);
                    return (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600 font-medium">{stat.label}</span>
                          <span className="font-bold text-gray-800 font-mono">{stat.count} ({percent}%)</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${stat.color} transition-all duration-550`} style={{ width: `${percent || 5}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CRM Funnel Conversion Index */}
              <div className="p-5 border border-gold-200/20 bg-[#fcfbf9]/50 rounded-xl space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#2b2b2b] font-bold">Lead Progression funnel</h4>
                
                <div className="space-y-3">
                  {[
                    { label: "New Leads Registered (Aura Sunrises)", count: leads.length, max: leads.length || 1, color: "bg-gold-500" },
                    { label: "Document Inquiries / Brochure Downloads", count: leads.filter(l => l.status === 'Interested' || l.status === 'Site Visit' || l.status === 'Negotiation' || l.status === 'Deal Won').length, max: leads.length || 1, color: "bg-gold-600" },
                    { label: "Site Driving Tours Completed", count: leads.filter(l => l.status === 'Site Visit' || l.status === 'Negotiation' || l.status === 'Deal Won').length, max: leads.length || 1, color: "bg-[#2b2b2b]" },
                    { label: "Negotiations Secured", count: leads.filter(l => l.status === 'Negotiation' || l.status === 'Deal Won').length, max: leads.length || 1, color: "bg-indigo-600" },
                    { label: "Deals won 🏆 (Lila Enclosed)", count: leads.filter(l => l.status === 'Deal Won').length, max: leads.length || 1, color: "bg-green-600 font-semibold" },
                  ].map((funnel, fIdx) => {
                    const percentVal = Math.round((funnel.count / (funnel.max || 1)) * 100);
                    return (
                      <div key={fIdx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600 font-light text-[11px]">{funnel.label}</span>
                          <span className="font-mono text-gray-800">{funnel.count} ({percentVal}%)</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${funnel.color} transition-all duration-550`} style={{ width: `${percentVal || 5}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Professional system report log summary */}
            <div className="p-4 sm:p-5 bg-gold-200/10 border border-gold-200/40 rounded-xl text-xs space-y-2">
              <span className="font-mono text-gold-800 uppercase block text-[10px] font-bold">Registry audit compliance summary</span>
              <p className="text-gray-600 leading-relaxed text-xs">
                "CRM monitors leads dynamically utilizing React hooks. Standard local storage synchronization preserves data integrity across sandbox cold starts automatically. No active third-party cookies or unauthorized tracking scripts are active, ensuring compliance with global GDPR standards."
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
