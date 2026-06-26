'use client';

import { useState } from 'react';
import { ShieldCheck, Download, Eye, MapPin, CheckCircle2, Sparkles, X, Share2, Images } from 'lucide-react';
import { Project, Lead } from '@/types/rk-properties';
import { useToast } from '@/components/rk-properties/ToastProvider';
import { usePropertyStore } from '@/store/use-property-store';
import ImageGallery from '@/components/rk-properties/ImageGallery';

interface PropertyShowcaseProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'date'>) => void;
  onBookProject: (projectName: string) => void;
  projects?: Project[];
  compareIds?: string[];
  onToggleCompare?: (id: string) => void;
}

function PropertyImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-64 overflow-hidden bg-gold-100 dark:bg-gray-800">
      {!loaded && <div className="absolute inset-0 skeleton-shimmer" />}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

export default function PropertyShowcase({ onAddLead, onBookProject, projects = [], compareIds = [], onToggleCompare }: PropertyShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [brochureProject, setBrochureProject] = useState<Project | null>(null);
  const [brochureName, setBrochureName] = useState('');
  const [brochurePhone, setBrochurePhone] = useState('');
  const [brochureEmail, setBrochureEmail] = useState('');
  const [brochurePersona, setBrochurePersona] = useState('NRI Investor');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const { addToast } = useToast();
  const { addRecentlyViewed } = usePropertyStore();
  const [galleryImages, setGalleryImages] = useState<string[] | null>(null);
  const [galleryName, setGalleryName] = useState('');

  const openGallery = (project: Project) => {
    setGalleryName(project.name);
    setGalleryImages([project.image, ...(project.gallery || [])]);
  };

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brochureName || !brochurePhone || !brochureEmail || !brochureProject) return;

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
    addToast({
      type: 'success',
      title: 'Brochure Requested!',
      message: `Your ${brochureProject.name} dossier is being prepared and will download shortly.`,
    });

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
${brochureProject.highlights.map((h: string) => `- ${h}`).join('\n')}

INVESTMENT PROJECTIONS:
- 5 Year Timeline: ${brochureProject.roiProjection5Yr}
- 10 Year Legacy: ${brochureProject.roiProjection10Yr}

AMENITIES SECURED:
${brochureProject.amenities.map((a: string) => `[✓] ${a}`).join('\n')}

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

      setTimeout(() => {
        setBrochureProject(null);
        setDownloadSuccess(false);
        setBrochureName('');
        setBrochurePhone('');
        setBrochureEmail('');
      }, 1000);
    }, 1500);
  };

  const handleGetBrochureFromModal = (project: Project) => {
    setSelectedProject(null);
    setBrochureProject(project);
    addToast({
      type: 'info',
      title: 'Fill in your details',
      message: 'Complete the form to receive your verified property dossier.',
    });
  };

  const handleShareWhatsApp = (project: Project) => {
    const message = `Namaste! I found this MVDA-approved property on RK Properties:\n\n📍 ${project.name}\n💰 ${project.price}\n📍 ${project.location}\n📈 +${project.appreciationRate}% annual appreciation\n\nView details: ${window.location.href}`;
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encoded}`;

    if (navigator.share) {
      navigator.share({
        title: `${project.name} - RK Properties`,
        text: message,
        url: window.location.href,
      }).catch(() => {
        window.open(whatsappUrl, '_blank');
      });
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'Selling Fast': return 'bg-red-50 text-red-600 border-red-200';
      case 'Pre-launch': return 'bg-sky-50 text-sky-600 border-sky-200';
      case 'Almost Sold Out': return 'bg-amber-50 text-amber-600 border-amber-200';
      default: return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  return (
    <div className="space-y-12 select-none">
      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-animate-stagger>
        {projects.map((p, idx) => (
          <div
            key={p.id}
            id={`project-card-${p.id}`}
            data-animate
            style={{ '--stagger-idx': idx } as React.CSSProperties}
            className="group relative bg-gold-50 dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/40 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-gold-500/70 dark:hover:border-gold-600/60 transition-all duration-500 flex flex-col justify-between"
          >
            {/* Image with skeleton loading */}
            <div className="relative">
              <PropertyImage src={p.image} alt={p.name} />

              {/* Bottom gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

              {/* Compare Checkbox */}
              {onToggleCompare && (
                <label
                  className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg border border-gold-200 dark:border-gold-700/40 shadow-xs cursor-pointer hover:border-gold-400 dark:hover:border-gold-600 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={compareIds.includes(p.id)}
                    onChange={() => onToggleCompare(p.id)}
                    disabled={!compareIds.includes(p.id) && compareIds.length >= 3}
                    className="w-3.5 h-3.5 rounded accent-gold-700 cursor-pointer"
                  />
                  <span className="text-[9px] font-mono font-bold text-gold-700 dark:text-gold-300 uppercase tracking-wider">Compare</span>
                </label>
              )}

              {/* MVDA Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 dark:bg-gray-900/95 border border-gold-200 dark:border-gold-700/40 backdrop-blur-md rounded-full shadow-xs z-10">
                <ShieldCheck className="w-4 h-4 text-gold-600" />
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-gold-700 dark:text-gold-300">
                  MVDA APPROVED
                </span>
              </div>

              {/* Tag */}
              <div className="absolute bottom-4 left-4 px-2.5 py-1 bg-gold-600/90 dark:bg-gold-700/90 backdrop-blur-sm text-white font-mono text-[9px] font-bold uppercase tracking-widest rounded-lg z-10">
                {p.tag}
              </div>

              {/* Status badge */}
              <div className={`absolute top-4 right-4 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full border z-10 ${getStatusClasses(p.status)}`}>
                {p.status}
              </div>

              {/* Pre-launch NEW ribbon */}
              {p.status === 'Pre-launch' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
                  <div className="relative px-3 py-0.5 bg-gold-500 text-white font-mono text-[8px] font-bold uppercase tracking-widest rounded-b-lg shadow-md">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    NEW
                    <span className="absolute -top-0 left-0 w-full h-0.5 bg-gold-300/60" />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 dark:text-gold-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-tight">
                    {p.name}
                  </h4>
                </div>

                <div className="flex justify-between items-center mb-3 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span className="truncate max-w-[200px] sm:max-w-none">{p.location}</span>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <span className="text-[9px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Starting from</span>
                    <span className="text-gold-800 dark:text-gold-200 font-serif font-semibold text-lg">
                      {p.price.split(' ')[0]} <span className="text-xs text-gray-500 font-mono">/ yd</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light line-clamp-2 mb-5">
                  {p.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6 border-b border-gold-200/20 dark:border-gold-800/20 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 block">Available Sizes</span>
                    <span className="text-xs font-medium text-gray-800 dark:text-gray-300">{p.size}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Appreciation Velocity</span>
                    <span className="text-xs font-bold text-green-700 flex items-center gap-1 font-mono">
                      ▲ +{p.appreciationRate}% / Yr
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => { setSelectedProject(p); addRecentlyViewed(p.id); }}
                  className="flex-1 py-3 px-4 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 border border-gold-200 dark:border-gold-800/40 hover:border-gold-500 dark:hover:border-gold-600 hover:bg-gold-50/20 dark:hover:bg-gray-800/20 cursor-pointer transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Technical Details
                </button>

                <button
                  onClick={() => setBrochureProject(p)}
                  className="py-3 px-4 rounded-xl border border-gold-200/40 dark:border-gold-800/40 hover:border-gold-500 dark:hover:border-gold-600 bg-gold-50/20 dark:bg-gray-800/20 hover:bg-gold-50 dark:hover:bg-gray-800 text-gold-700 dark:text-gold-300 cursor-pointer transition-all duration-200"
                  title="Download Instant PDF Brochure"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleShareWhatsApp(p)}
                  className="py-3 px-3.5 rounded-xl border border-green-200/40 hover:border-green-400 bg-green-50/20 hover:bg-green-50 text-green-700 cursor-pointer transition-all duration-200"
                  title="Share on WhatsApp"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => usePropertyStore.getState().openOverlay('project-detail', p.id)}
                  className="py-3 px-5 rounded-xl border-2 border-gold-600 dark:border-gold-500 text-gold-700 dark:text-gold-300 text-xs uppercase font-semibold font-mono tracking-wider cursor-pointer transition-all duration-200 hover:bg-gold-50 dark:hover:bg-gold-900/40 flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>

                <button
                  onClick={() => onBookProject(p.name)}
                  className="py-3 px-5 rounded-xl bg-gradient-to-r from-gold-800 to-gold-700 hover:from-gold-600 hover:to-gold-500 text-white text-xs uppercase font-semibold font-mono tracking-wider cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Book Plot
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-gray-900/40 dark:bg-gray-950/80 backdrop-blur-sm flex justify-center items-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedProject(null); }}
        >
          <div className="bg-gold-50 dark:bg-gray-950 w-full max-w-3xl rounded-2xl border border-gold-200 dark:border-gold-800 overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-fade-in">
            <div className="relative h-48 sm:h-56">
              <img
                src={selectedProject.image}
                className="w-full h-full object-cover cursor-pointer"
                alt={selectedProject.name}
                onClick={() => openGallery(selectedProject)}
              />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 cursor-pointer text-lg"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="px-3 py-1 bg-white/95 text-gold-700 font-mono text-[10px] font-bold rounded-full border border-gold-200">
                  MVDA APPROVED ID: MVDA-VRN-{selectedProject.id.toUpperCase()}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold mt-1">
                  {selectedProject.name}
                </h3>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div>
                <h5 className="text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Corporate Property Description</h5>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light">{selectedProject.description}</p>
              </div>

              <div className="bg-gold-50/55 dark:bg-gold-900/30 border border-gold-200/40 dark:border-gold-800/40 p-4 sm:p-5 rounded-2xl">
                <h5 className="text-[10px] font-mono uppercase tracking-widest text-gold-700 dark:text-gold-300 font-bold mb-3">Sovereign Protection Highlights</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-300 font-light">
                  {selectedProject.highlights.map((h, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500">Pristine Infrastructures Secured</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 border border-gold-200/40 dark:border-gold-700/40 text-[11px] font-medium text-gray-700 dark:text-gray-300"
                    >
                      ✦ {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gold-200/20 dark:border-gold-800/20 pt-4">
                <div>
                  <h6 className="text-[10px] font-mono uppercase tracking-widest text-gold-800 dark:text-gold-200 font-bold">5 Year Yield Trajectory</h6>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{selectedProject.roiProjection5Yr}</p>
                </div>
                <div>
                  <h6 className="text-[10px] font-mono uppercase tracking-widest text-gold-700 font-bold">10 Year Legacy Protection</h6>
                  <p className="text-xs text-gray-500 mt-1">{selectedProject.roiProjection10Yr}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gold-200/20 dark:border-gold-800/20 p-4 sm:px-6 bg-gold-200/10 dark:bg-gray-900/50 flex justify-end gap-3 bg-gold-50 dark:bg-gray-950">
              <button
                onClick={() => openGallery(selectedProject)}
                className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl border border-gold-200 dark:border-gold-700/40 text-xs font-mono font-semibold uppercase tracking-wider text-gold-700 dark:text-gold-300 hover:bg-gold-50 dark:hover:bg-gray-800 cursor-pointer transition-all"
              >
                <Images className="w-3.5 h-3.5" />
                Photo Gallery
              </button>
              <button
                onClick={() => handleGetBrochureFromModal(selectedProject)}
                className="py-2.5 px-4 rounded-xl border border-gold-200 dark:border-gold-700/40 text-xs font-mono font-semibold uppercase tracking-wider text-gold-700 dark:text-gold-300 hover:bg-gold-50 dark:hover:bg-gray-800 cursor-pointer transition-all"
              >
                Get Brochure PDF
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onBookProject(selectedProject.name);
                }}
                className="py-2.5 px-5 rounded-xl bg-gold-800 hover:bg-gold-600 text-white text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer transition-all"
              >
                Inquire & Schedule Visit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Brochure Download Modal */}
      {brochureProject && (
        <div
          className="fixed inset-0 z-50 bg-gray-900/60 dark:bg-gray-950/80 backdrop-blur-sm flex justify-center items-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setBrochureProject(null); }}
        >
          <div className="bg-gold-50 dark:bg-gray-950 w-full max-w-md rounded-2xl border border-gold-200 dark:border-gold-800 p-6 sm:p-8 relative shadow-2xl animate-fade-in">
            <button
              onClick={() => setBrochureProject(null)}
              className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gold-300 cursor-pointer text-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <span className="inline-flex p-3 bg-gold-100 dark:bg-gold-900 rounded-full border border-gold-200 dark:border-gold-700/40 text-gold-700 dark:text-gold-300 mb-2">
                <Download className="w-6 h-6 animate-bounce" />
              </span>
              <h4 className="font-serif text-xl font-bold text-gray-900 dark:text-gold-100">
                Download Official Brochure
              </h4>
              <p className="text-xs text-gold-600 font-mono uppercase tracking-wider">
                {brochureProject.name}
              </p>
              <p className="text-xs text-gray-400">
                Specify registry details below. The digital dossier is instant and legally protected.
              </p>
            </div>

            {downloadSuccess ? (
              <div className="space-y-3 py-6 text-center animate-fade-in">
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
                    className="w-full px-4 py-3 rounded-xl border border-gold-200 dark:border-gold-800/40 text-xs focus:ring-1 focus:ring-gold-500 bg-white dark:bg-gray-800 dark:text-gold-100"
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
                    className="w-full px-4 py-3 rounded-xl border border-gold-200 dark:border-gold-800/40 text-xs focus:ring-1 focus:ring-gold-500 bg-white dark:bg-gray-800 dark:text-gold-100"
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
                    className="w-full px-4 py-3 rounded-xl border border-gold-200 dark:border-gold-800/40 text-xs focus:ring-1 focus:ring-gold-500 bg-white dark:bg-gray-800 dark:text-gold-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Buyer Profile Classification</label>
                  <select
                    value={brochurePersona}
                    onChange={(e) => setBrochurePersona(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gold-200 dark:border-gold-800/40 text-xs focus:ring-1 focus:ring-gold-500 bg-white dark:bg-gray-800 dark:text-gold-100"
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
                  className="w-full py-4 rounded-xl bg-gold-600 hover:bg-gold-800 text-white font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Download className="w-4 h-4" />
                  Request Verified Download
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      {/* Image Gallery Lightbox */}
      {galleryImages && (
        <ImageGallery
          images={galleryImages}
          projectName={galleryName}
          onClose={() => setGalleryImages(null)}
        />
      )}
    </div>
  );
}