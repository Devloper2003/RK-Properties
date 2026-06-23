import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Download, Eye, MapPin, Compass, Briefcase, ChevronRight, CheckCircle2, Sparkles, PhoneCall } from 'lucide-react';
import { Project, Lead } from '../types';
import { propertiesData } from '../data/propertyData';

interface PropertyShowcaseProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'date'>) => void;
  onBookProject: (projectName: string) => void;
  projects?: Project[];
}

export default function PropertyShowcase({ onAddLead, onBookProject, projects = propertiesData }: PropertyShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [brochureProject, setBrochureProject] = useState<Project | null>(null);

  // Form states for instant dynamic brochure download capture
  const [brochureName, setBrochureName] = useState('');
  const [brochurePhone, setBrochurePhone] = useState('');
  const [brochureEmail, setBrochureEmail] = useState('');
  const [brochurePersona, setBrochurePersona] = useState('NRI Investor');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brochureName || !brochurePhone || !brochureEmail || !brochureProject) return;

    // Capture Lead in State Engine
    onAddLead({
      name: brochureName,
      email: brochureEmail,
      phone: brochurePhone,
      projectInterest: brochureProject.name,
      category: brochurePersona,
      status: 'Interested',
      budget: '₹20L - ₹50L',
      notes: "Downloaded dynamic PDF brochure via showcase page."
    });

    setDownloadSuccess(true);

    // Simulate custom browser safe text/voucher document creation & trigger elegant download
    setTimeout(() => {
      const dateStr = new Date().toLocaleDateString('en-IN');
      const content = `
============================================================
              RK PROPERTIES VIRTUAL BROCHURE
============================================================
Project: ${brochureProject.name}
Zoning: Mathura-Vrindavan Development Authority Approved
Location: ${brochureProject.location}
Appreciation Vector: +${brochureProject.appreciationRate}% / Annum (Compounded)
============================================================
Issued To: ${brochureName}
Registered Email: ${brochureEmail}
Registered Phone: ${brochurePhone}
Date of Registry Verification: ${dateStr}
============================================================

PROJECT OVERVIEW:
${brochureProject.description}

HIGHLIGHTS:
${brochureProject.highlights.map(h => `- ${h}`).join('\n')}

INVESTMENT PROJECTIONS:
- 5 Year Timeline: ${brochureProject.roiProjection5Yr}
- 10 Year Legacy: ${brochureProject.roiProjection10Yr}

AMENITIES SECURED:
${brochureProject.amenities.map(a => `[✓] ${a}`).join('\n')}

============================================================
        CONTACT OUR DEDICATED SOVEREIGN PROPERTY DESK
              Email: listings@rkproperties.in
============================================================
      `;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `RK_Properties_${brochureProject.name.replace(/\s+/g, '_')}_Brochure.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean setup states
      setTimeout(() => {
        setBrochureProject(null);
        setDownloadSuccess(false);
        setBrochureName('');
        setBrochurePhone('');
        setBrochureEmail('');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="space-y-12 select-none">
      
      {/* Property Cards Deck */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <div 
            key={p.id}
            id={`project-card-${p.id}`}
            className="group relative bg-[#FCFBF7] border border-gold-200/40 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-gold-500/70 transition-all duration-350 flex flex-col justify-between"
          >
            {/* Project Image Panel */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={p.image} 
                alt={p.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
              />
              {/* Approval Ledger Status Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 border border-gold-200 backdrop-blur-md rounded-full shadow-xs">
                <ShieldCheck className="w-4 h-4 text-gold-600" />
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-gold-700">
                  MVDA APPROVED
                </span>
              </div>

              {/* Action tags */}
              <div className="absolute bottom-4 left-4 items-center px-2.5 py-1 bg-gold-600 text-white font-mono text-[9px] font-bold uppercase tracking-widest rounded-lg">
                {p.tag}
              </div>

              {/* Selling Status overlay Badge */}
              <div className={`absolute top-4 right-4 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full border ${
                p.status === 'Selling Fast' 
                  ? 'bg-red-50 text-red-600 border-red-200' 
                  : p.status === 'Pre-launch' 
                    ? 'bg-blue-5 text-blue-600 border-blue-200' 
                    : p.status === 'Almost Sold Out' 
                      ? 'bg-amber-50 text-amber-600 border-amber-200' 
                      : 'bg-green-50 text-green-700 border-green-200'
              }`}>
                {p.status}
              </div>
            </div>

            {/* Project Core Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-gold-700 transition-colors">
                    {p.name}
                  </h4>
                  <span className="text-[#2D2926] font-serif font-semibold text-lg whitespace-nowrap">
                    {p.price.split(' ')[0]} <span className="text-xs text-gray-500 font-mono">/ yd</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono mb-4">
                  <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span className="truncate">{p.location}</span>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed font-light line-clamp-3 mb-6">
                  {p.description}
                </p>

                {/* Grid items */}
                <div className="grid grid-cols-2 gap-4 mb-6 border-b border-gold-200/20 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Available Sizes</span>
                    <span className="text-xs font-medium text-gray-800">{p.size}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Appreciation Velocity</span>
                    <span className="text-xs font-bold text-green-700 flex items-center gap-1 font-mono">
                      ▲ +{p.appreciationRate}% / Yr
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Actions Ribbon */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedProject(p)}
                  className="flex-1 py-3 px-4 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider text-gray-700 border border-gold-200 hover:border-gold-500 hover:bg-gold-50/20 cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Technical Details
                </button>

                <button
                  onClick={() => setBrochureProject(p)}
                  className="py-3 px-4 rounded-xl border border-gold-200/40 hover:border-gold-500 bg-gold-50/20 hover:bg-gold-50 text-gold-700 cursor-pointer transition-all"
                  title="Download Instant PDF Brochure"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onBookProject(p.name)}
                  className="py-3 px-4 rounded-xl bg-[#2D2926] hover:bg-gold-600 text-white text-xs uppercase font-semibold font-mono tracking-wider cursor-pointer transition-all"
                >
                  Book Plot
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 1. Modal: Detailed Project Inspection */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-[#FCFBF7] w-full max-w-3xl rounded-2xl border border-gold-200 overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            {/* Header image overlay */}
            <div className="relative h-48 sm:h-56">
              <img 
                src={selectedProject.image} 
                className="w-full h-full object-cover" 
                alt={selectedProject.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="px-3 py-1 bg-white/95 text-gold-700 font-mono text-[10px] font-bold rounded-full border border-gold-200">
                  MVDA APPROVED ID: MVDA-VRN-{selectedProject.id.toUpperCase()}
                </span>
                <h3 className="text-2xl sm:text-3.5xl font-serif text-white font-bold mt-1">
                  {selectedProject.name}
                </h3>
              </div>
            </div>

            {/* Detailed Body Scroll */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div>
                <h5 className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">Corporate Property Description</h5>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">{selectedProject.description}</p>
              </div>

              {/* Bullet Highlights */}
              <div className="bg-gold-50/55 border border-gold-200/40 p-4 sm:p-5 rounded-2xl">
                <h5 className="text-[10px] font-mono uppercase tracking-widest text-gold-700 font-bold mb-3">Sovereign Protection Highlights</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600 font-light">
                  {selectedProject.highlights.map((h, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Master Amenities */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Pristine Infrastructures Secured</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.amenities.map((amenity, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-full bg-white border border-gold-200/40 text-[11px] font-medium text-gray-700"
                    >
                      ✦ {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projections Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gold-200/20 pt-4">
                <div>
                  <h6 className="text-[10px] font-mono uppercase tracking-widest text-[#2D2926] font-bold">5 Year Yield Trajectory</h6>
                  <p className="text-xs text-gray-500 mt-1">{selectedProject.roiProjection5Yr}</p>
                </div>
                <div>
                  <h6 className="text-[10px] font-mono uppercase tracking-widest text-gold-700 font-bold">10 Year Legacy Protection</h6>
                  <p className="text-xs text-gray-500 mt-1">{selectedProject.roiProjection10Yr}</p>
                </div>
              </div>
            </div>

            {/* Footer triggers */}
            <div className="border-t border-gold-200/20 p-4 sm:px-6 bg-gold-200/10 flex justify-end gap-3 bg-[#FCFBF7]">
              <button 
                onClick={() => {
                  setSelectedProject(null);
                  setBrochureProject(selectedProject);
                }}
                className="py-2.5 px-4 rounded-xl border border-gold-200 text-xs font-mono font-semibold uppercase tracking-wider text-gold-700 hover:bg-gold-50 cursor-pointer transition-all"
              >
                Get Brochure PDF
              </button>
              <button 
                onClick={() => {
                  setSelectedProject(null);
                  onBookProject(selectedProject.name);
                }}
                className="py-2.5 px-5 rounded-xl bg-[#2D2926] hover:bg-gold-600 text-white text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer transition-all"
              >
                Inquire & Schedule Driving Visit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Capture Panel for Brochure Downloads */}
      {brochureProject && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-xs flex justify-center items-center p-4">
          <div className="bg-[#FCFBF7] w-full max-w-md rounded-2xl border border-gold-200 p-6 sm:p-8 relative shadow-2xl">
            <button 
              onClick={() => setBrochureProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 cursor-pointer"
            >
              ✕
            </button>
            
            <div className="text-center space-y-2 mb-6">
              <span className="inline-flex p-3 bg-gold-100 rounded-full border border-gold-200 text-gold-700 mb-2">
                <Download className="w-6 h-6 animate-bounce" />
              </span>
              <h4 className="font-serif text-xl font-bold text-gray-900">
                Download Official Brochure
              </h4>
              <p className="text-xs text-gold-600 font-mono uppercase tracking-wider">
                {brochureProject.name}
              </p>
              <p className="text-xs text-gray-400">
                Specify registry details below. The digital dossier is instant and legally protected under statutory compliance.
              </p>
            </div>

            {downloadSuccess ? (
              <div className="space-y-3 py-6 text-center" style={{ animation: 'fadeIn 0.2s' }}>
                <span className="inline-flex items-center justify-center p-3 rounded-full bg-green-100 text-green-700 border border-green-200 animate-pulse">
                  <CheckCircle2 className="w-8 h-8" />
                </span>
                <p className="text-sm font-mono text-green-800 font-bold">Verifying Registry Data...</p>
                <p className="text-xs text-gray-400">Generating compiled dossier voucher. File download begins immediately.</p>
              </div>
            ) : (
              <form onSubmit={handleBrochureSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={brochureName}
                    onChange={(e) => setBrochureName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-gold-200 text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Contact Mobile Number</label>
                  <input 
                    type="tel" 
                    required
                    value={brochurePhone}
                    onChange={(e) => setBrochurePhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-gold-200 text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={brochureEmail}
                    onChange={(e) => setBrochureEmail(e.target.value)}
                    placeholder="e.g. consult@nrigroup.com"
                    className="w-full px-4 py-3 rounded-xl border border-gold-200 text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Buyer Profile Classification</label>
                  <select 
                    value={brochurePersona}
                    onChange={(e) => setBrochurePersona(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gold-200 text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                  >
                    <option value="NRI Investor">NRI (Non-Resident Indian)</option>
                    <option value="Executive Business Owner">Business Owner & Entrepreneur</option>
                    <option value="Retired Senior Devotee">Retired Senior Citizen</option>
                    <option value="High-Caliber Professional">Doctor / CA Specialist</option>
                    <option value="Dharmic Pilgrim Guest">Vrindavan Visitor / Pilgrim</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4.5 rounded-xl bg-gold-600 hover:bg-[#2D2926] text-white font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Download className="w-4 h-4" />
                  Request Verified Download
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
