import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  ShieldCheck, 
  Building, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  Menu, 
  X, 
  Users, 
  Award, 
  FileCheck, 
  Sparkles, 
  Lock, 
  Briefcase 
} from 'lucide-react';

// Types & Data
import { Project, Lead } from './types';
import { propertiesData, sampleFaqs, sampleTestimonials } from './data/propertyData';

// Components
import HeroSection from './components/HeroSection';
import StrategicBlueprint from './components/StrategicBlueprint';
import InvestmentCalculator from './components/InvestmentCalculator';
import PropertyShowcase from './components/PropertyShowcase';
import ContactSection from './components/ContactSection';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  // Navigation & UI Modes
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isBlueprintOpen, setIsBlueprintOpen] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<string | null>("faq_1");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Dynamic State Engine (Leads & Projects)
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>(propertiesData);
  const [selectedProjectForContact, setSelectedProjectForContact] = useState<string>('');

  // Pre-populate some reactive leads if storage is empty, else read from localStorage
  useEffect(() => {
    const cachedLeads = localStorage.getItem('rk_leads_v1');
    const cachedProjects = localStorage.getItem('rk_projects_v1');

    if (cachedLeads) {
      setLeads(JSON.parse(cachedLeads));
    } else {
      // Populating initial realistic sandbox leads
      const initialLeads: Lead[] = [
        {
          id: "lead_101",
          name: "Rajesh Singhania",
          email: "rajesh@singhaniagroup.org",
          phone: "+1 650 338 9012",
          projectInterest: "Krishna Radhika Enclave",
          category: "NRI Investor",
          status: "Interested",
          date: new Date().toISOString(),
          budget: "₹80L - ₹1.5Cr",
          notes: "Initial registration from London. Requesting MVDA registry details."
        },
        {
          id: "lead_102",
          name: "Dr. Ananya Goel",
          email: "ananya.goel@apollo.com",
          phone: "+91 98112 00412",
          projectInterest: "Yamuna Devotee Gated Heights",
          category: "High-Caliber Professional",
          status: "Site Visit",
          date: new Date().toISOString(),
          budget: "₹45L - ₹90L",
          siteVisitDate: "2026-06-28",
          notes: "Cardiologist in Delhi. Wants a premium quiet setting for family parents."
        },
        {
          id: "lead_110",
          name: "Sohan Lal Varma",
          email: "sohan.varma@gmail.com",
          phone: "+91 88002 99112",
          projectInterest: "Chhatikara Prime Meadows",
          category: "Retired Senior Devotee",
          status: "Negotiation",
          date: new Date().toISOString(),
          budget: "₹30L - ₹50L",
          notes: "Retired railway head. Wants turn-key cottage options."
        }
      ];
      setLeads(initialLeads);
      localStorage.setItem('rk_leads_v1', JSON.stringify(initialLeads));
    }

    if (cachedProjects) {
      setProjects(JSON.parse(cachedProjects));
    }
  }, []);

  // Save states to localstorage on changes
  const saveLeadsToStorage = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem('rk_leads_v1', JSON.stringify(updatedLeads));
  };

  const saveProjectsToStorage = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('rk_projects_v1', JSON.stringify(updatedProjects));
  };

  // Lead Actions
  const handleAddLead = (leadData: Omit<Lead, 'id' | 'date'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead_${Math.floor(Math.random() * 89999 + 10000)}`,
      date: new Date().toISOString()
    };
    const updated = [newLead, ...leads];
    saveLeadsToStorage(updated);
  };

  const handleUpdateLeadStatus = (leadId: string, status: Lead['status']) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status } : l);
    saveLeadsToStorage(updated);
  };

  const handleScheduleVisit = (leadId: string, date: string) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status: 'Site Visit' as const, siteVisitDate: date } : l);
    saveLeadsToStorage(updated);
  };

  // Project Actions
  const handleAddProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj_${projects.length + 1}`
    };
    const updated = [newProject, ...projects];
    saveProjectsToStorage(updated);
  };

  // Trigger scroll helper
  const scrollToId = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Trigger site-visit booking selection
  const handleBookProject = (projectName: string) => {
    setSelectedProjectForContact(projectName);
    scrollToId('contact-experience');
  };

  // Filtering projects list
  const filteredProjects = selectedCategoryFilter === "All"
    ? projects
    : projects.filter(p => p.type === selectedCategoryFilter || (selectedCategoryFilter === "Plots" && (p.type === "Investment Plots" || p.type === "Residential Project")));

  // Render Admin Dashboard exclusively if active
  if (isAdminMode) {
    return (
      <AdminDashboard
        leads={leads}
        projects={projects}
        onAddProject={handleAddProject}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        onScheduleVisit={handleScheduleVisit}
        onClose={() => setIsAdminMode(false)}
      />
    );
  }

  return (
    <div className="bg-[#FCFBF7] text-[#2D2926] min-h-screen font-sans selection:bg-gold-200 selection:text-gold-900 relative">
      
      {/* 1. Dynamic Luxury Navigation Header */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-[#FCFBF7]/90 backdrop-blur-md border-b border-gold-200/20 shadow-xs select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Typographic Elegant Brand Signature */}
            <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2D2926]">
                RK PROPERTIES
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-gold-600 font-semibold mt-px">
                Trust • Transparency • Value — RK Group
              </span>
            </div>

            {/* Desktop Center Links */}
            <div className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-wider font-semibold text-gray-600">
              <button onClick={() => scrollToId('project-showcase-section')} className="hover:text-gold-600 cursor-pointer transition-colors">
                Premium Projects
              </button>
              <button onClick={() => scrollToId('why-vrindavan')} className="hover:text-gold-600 cursor-pointer transition-colors">
                Why Vrindavan
              </button>
              <button onClick={() => scrollToId('calculator-anchor')} className="hover:text-[#2D2926] hover:underline cursor-pointer transition-colors flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-gold-600" /> Investment Calculator
              </button>
              <button onClick={() => scrollToId('faq-section-anchor')} className="hover:text-gold-600 cursor-pointer transition-colors">
                Registry FAQs
              </button>
            </div>

            {/* Premium action widgets (Blueprint & Admin Dashboard gateways) */}
            <div className="hidden md:flex items-center gap-3">
              {/* Stakeholder Strategy Blueprint Trigger */}
              <button 
                onClick={() => setIsBlueprintOpen(true)}
                className="px-4 py-2 text-[10px] font-mono uppercase font-bold tracking-widest text-[#2D2926] rounded-xl hover:bg-gold-100 border border-gold-200/40 cursor-pointer transition-all flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5" />
                Strategy Briefing
              </button>

              {/* CRM Portal access (with lock representation) */}
              <button
                onClick={() => setIsAdminMode(true)}
                className="px-4 py-2 bg-[#2D2926] hover:bg-gold-600 text-white text-[10px] font-mono uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                title="Open Corporate Admin Panel"
              >
                <Lock className="w-3 h-3 text-gold-200" />
                Admin CRM
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setIsBlueprintOpen(true)}
                className="p-1.5 rounded-lg border border-gold-200/50 text-gold-700"
                title="Briefing Outline"
              >
                <Compass className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsAdminMode(true)}
                className="p-1.5 rounded-lg bg-gray-900 text-white"
                title="Admin Dashboard"
              >
                <Lock className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu slide */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gold-100 p-4 space-y-3 font-mono text-xs uppercase tracking-wider">
            <button onClick={() => scrollToId('project-showcase-section')} className="block w-full text-left py-2 text-gray-600">
              Premium Projects
            </button>
            <button onClick={() => scrollToId('why-vrindavan')} className="block w-full text-left py-2 text-gray-600">
              Why Vrindavan
            </button>
            <button onClick={() => scrollToId('calculator-anchor')} className="block w-full text-left py-2 text-gray-600">
              Investment Calculator
            </button>
            <button onClick={() => scrollToId('faq-section-anchor')} className="block w-full text-left py-2 text-gray-600">
              Registry FAQs
            </button>
            <button onClick={() => { scrollToId('contact-experience'); }} className="block w-full text-left py-2 bg-gold-100 text-gold-700 font-bold px-3 rounded-lg text-center">
              Book Site Tour Package
            </button>
          </div>
        )}
      </nav>

      {/* 2. Cinematic Dawn Hero Section */}
      <HeroSection 
        onExploreProjects={() => scrollToId('project-showcase-section')}
        onScheduleConsult={() => scrollToId('contact-experience')}
        onOpenBlueprint={() => setIsBlueprintOpen(true)}
      />

      {/* 3. Pure Luxury Trust & RERA Certified Badges */}
      <section className="bg-gradient-to-r from-gold-50/40 via-gold-100/20 to-gold-50/40 py-10 border-t border-b border-gold-200/20 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold mb-1">
                SOVEREIGN RECOGNITION & SHIELD
              </p>
              <h3 className="text-sm font-serif text-gray-500 italic max-w-xl">
                "RK Properties guarantees absolute legal custody. Every land title listed under our banner undergoes triple check clearance procedures back by government land record APIs."
              </h3>
            </div>
            
            {/* Badges block */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gold-200/40 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">UP-RERA AGENT</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gold-200/40 shadow-2xs">
                <FileCheck className="w-5 h-5 text-gold-600 shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">MVDA REGULATED</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gold-200/40 shadow-2xs col-span-2 sm:col-span-1">
                <Award className="w-5 h-5 text-gold-600 shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">100% CLEAR registries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Immersive Spiritual Core narrative: WHY VRINDAVAN */}
      <section id="why-vrindavan" className="py-20 bg-gradient-to-b from-white via-[#fcfbf9] to-white select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">
                The Epicenter of Spiritual Sovereignty
              </span>
              <h2 className="text-3xl sm:text-4.5xl font-serif text-[#2D2926] tracking-tight leading-tight">
                Vrindavan’s Majestic Ascent: <br />
                From holy <span className="font-serif italic text-gold-600">Faith</span> to <span className="underline decoration-gold-200 decoration-4">Wealth</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Vrindavan is no longer just an ancient sacred pilgrimage destination. Backed by government focus and prime mega-development mandates, it represents one of India's fast-growing regional real estate corridors.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex gap-4">
                  <span className="flex-none p-2.5 bg-gold-100 text-gold-700 h-10 w-10 text-center rounded-xl font-bold font-serif">1</span>
                  <div>
                    <h4 className="font-serif text-base font-bold text-gray-900">Unrivalled Pilgrimage Volume</h4>
                    <p className="text-xs text-gray-500 mt-1">Surpassing 20 million visits per year—driving immense rental yields and boutique hotel requirements near upcoming corridors.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex-none p-2.5 bg-gold-100 text-gold-700 h-10 w-10 text-center rounded-xl font-bold font-serif">2</span>
                  <div>
                    <h4 className="font-serif text-base font-bold text-gray-900">High Speed Connectivity</h4>
                    <p className="text-xs text-gray-500 mt-1">Seamless connectivity via Yamuna Expressway and upcoming Rapid Transit links connects Delhi-NCR in under 120 minutes.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphic feature layout showing real regional statistics */}
            <div className="lg:col-span-7 bg-[#F4EFE6]/40 border border-gold-300/30 rounded-3xl p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 gap-8 shadow-xs">
              <div className="space-y-2">
                <span className="text-3xl sm:text-4xl font-serif text-gold-600 font-bold block">₹2.8L Cr</span>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block">Planned Smart Regional Investments</span>
                <p className="text-xs text-gray-400 font-light mt-1">Uttar Pradesh state allocation for Yamuna Expressway tourism corridor expansion schemes.</p>
              </div>

              <div className="space-y-2">
                <span className="text-3xl sm:text-4xl font-serif text-gold-600 font-bold block">70 Stories</span>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block">Chandrodaya Temple Height</span>
                <p className="text-xs text-gray-400 font-light mt-1">The upcoming tallest religious skyscraper will anchor future residential expansion rates.</p>
              </div>

              <div className="space-y-2 border-t border-gold-200/10 pt-6">
                <span className="text-3xl sm:text-4xl font-serif text-gold-600 font-bold block">18–24%</span>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block">Average Land Appreciation</span>
                <p className="text-xs text-gray-400 font-light mt-1">Historic compound annual return for MVDA authorized plots along Chhatikara transit core.</p>
              </div>

              <div className="space-y-2 border-t border-gold-200/10 pt-6">
                <span className="text-3xl sm:text-4xl font-serif text-gold-600 font-bold block">100% Tax Exempt</span>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block">Capital Gain options</span>
                <p className="text-xs text-gray-400 font-light mt-1">Reinvest company surplus funds in approved land parcels and optimize corporate returns.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PORTFOLIO SHOWCASE: MVDA Approved Projects */}
      <section id="project-showcase-section" className="py-20 bg-white select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">
                Exclusive Hand-picked land registers
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 tracking-tight font-medium mt-1">
                Featured MVDA Authorized Real Estates
              </h2>
            </div>

            {/* Dynamic filter selectors */}
            <div className="flex flex-wrap gap-2 bg-gold-50 p-1 rounded-xl border border-gold-200/50">
              {[
                { label: "Show All", val: "All" },
                { label: "Elite Townships", val: "Premium Township" },
                { label: "Residential Plots", val: "Residential Project" },
                { label: "Investment Plots", val: "Investment Plots" }
              ].map((filter) => (
                <button
                  key={filter.val}
                  onClick={() => setSelectedCategoryFilter(filter.val)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono tracking-wider uppercase cursor-pointer transition-all ${
                    selectedCategoryFilter === filter.val 
                      ? 'bg-white text-gold-700 shadow-xs font-bold' 
                      : 'text-gray-500 hover:text-gold-600'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <PropertyShowcase 
            projects={filteredProjects}
            onAddLead={handleAddLead}
            onBookProject={handleBookProject}
          />

        </div>
      </section>

      {/* 6. CALCULATOR PORTAL: expected capital yield tool */}
      <section id="calculator-anchor" className="py-20 bg-gradient-to-b from-white via-[#fdfbf8] to-white border-t border-gold-200/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <InvestmentCalculator initialProjects={projects} />

        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS / EXPERIENCES */}
      <section className="py-20 bg-white select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">Verifiable Client Chronology</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 mt-1 tracking-tight">Voices of Devotional Wisdom</h2>
            <p className="text-xs text-gray-500 mt-2 font-mono">Durable legacies constructed alongside India's distinguished families.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleTestimonials.map((t) => (
              <div 
                key={t.id}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white to-[#F4EFE6]/70 border border-[#E5E1D8] flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div>
                  <span className="text-3xl font-serif text-[#8B735B]/30 block mb-2">“</span>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light italic mb-6">
                    {t.quote}
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-[#E5E1D8]/40 pt-4 mt-2">
                  <div className="h-10 w-10 rounded-full bg-gold-100 flex items-center justify-center font-serif text-gold-700 font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <h5 className="font-serif text-sm font-bold text-[#2D2926]">{t.name}</h5>
                    <p className="text-[10px] text-gray-400 font-mono">{t.role}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      <span className="text-[8px] font-mono bg-gold-200/30 text-gold-700 px-1.5 py-0.5 rounded">
                        🏠 {t.projectBought}
                      </span>
                      <span className="text-[8px] font-mono bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded">
                        📈 {t.appreciationObserved}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SOVEREIGN REGISTRY & LAND LAW FAQS */}
      <section id="faq-section-anchor" className="py-20 bg-gradient-to-b from-white via-[#fdfcf9] to-white border-t border-b border-gold-200/20 select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">SOVEREIGN COMPLIANCE DICTIONARY</span>
            <h2 className="text-3xl font-serif text-gray-900 mt-1">Registry FAQs & Land Registry Guardrails</h2>
          </div>

          <div className="space-y-4">
            {sampleFaqs.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="border border-gold-200/40 rounded-2xl bg-white overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center cursor-pointer hover:bg-gold-50/20"
                  >
                    <span className="font-serif font-bold text-gray-900 text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gold-600 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 text-xs text-gray-600 leading-relaxed font-light border-t border-gold-200/10 pt-4">
                      <p>{faq.answer}</p>
                      <div className="mt-3 text-[10px] text-gold-600 font-mono font-bold uppercase tracking-widest">
                        Category Focus: {faq.category}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. SECURE SITE-VISIT BOOKING CAPTURE EXPERIENCE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ContactSection 
            projects={projects}
            onAddLead={handleAddLead}
            selectedProjectName={selectedProjectForContact}
          />

        </div>
      </section>

      {/* 10. ELITE DIGITAL BRAND FOOTER */}
      <footer className="bg-gradient-to-br from-[#2D2926] via-[#24211F] to-[#1B1917] text-gold-100/80 pt-16 pb-12 select-none border-t border-[#8B735B]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-[#5E5852]/30 pb-12 mb-12">
            
            {/* Column 1: signature brand metadata */}
            <div className="md:col-span-4 space-y-4">
              <span className="text-xl font-serif font-bold text-white tracking-tight">RK PROPERTIES</span>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                A majestic synthesis of absolute title security, professional real estate consulting services, and sacred living opportunities in Vrindavan Dham. Built on three core pillars: Trust, Transparency, and Value.
              </p>
              <div className="text-[10px] font-mono text-gold-400">
                <span>RERA ID: UPRERAAGT11245 (Approved Uttar Pradesh State Category)</span>
              </div>
            </div>

            {/* Column 2: links */}
            <div className="md:col-span-2 space-y-3 font-mono text-xs uppercase tracking-wider">
              <span className="text-white block font-bold mb-1">Dham Assets</span>
              <button onClick={() => scrollToId('project-showcase-section')} className="block text-gray-400 hover:text-white cursor-pointer text-left">Gated Townships</button>
              <button onClick={() => scrollToId('project-showcase-section')} className="block text-gray-400 hover:text-white cursor-pointer text-left">Residential Plots</button>
              <button onClick={() => scrollToId('project-showcase-section')} className="block text-gray-400 hover:text-white cursor-pointer text-left">Investment Meadow</button>
            </div>

            {/* Column 3: links */}
            <div className="md:col-span-2 space-y-3 font-mono text-xs uppercase tracking-wider">
              <span className="text-white block font-bold mb-1">Verify Compliance</span>
              <button onClick={() => setIsBlueprintOpen(true)} className="block text-gray-400 hover:text-white cursor-pointer text-left">Consumer Moat</button>
              <button onClick={() => scrollToId('faq-section-anchor')} className="block text-gray-400 hover:text-white cursor-pointer text-left">Legal FAQ Registry</button>
              <button onClick={() => setIsAdminMode(true)} className="block text-gray-400 hover:text-white cursor-pointer text-left">Authorized CRM</button>
            </div>

            {/* Column 4: physical listings coordination */}
            <div className="md:col-span-4 space-y-3 text-xs leading-relaxed text-gray-400">
              <span className="text-white font-mono uppercase tracking-wider font-bold block mb-1">Corporate Headquarters</span>
              <p>Chhatikara-Vrindavan Link Road, directly near Prem Mandir Perimeter gate, Vrindavan, Mathura District, Uttar Pradesh - 281121</p>
              <p className="font-mono text-[11px] text-white">Representative Desk: listing.services@rkproperties.in</p>
            </div>

          </div>

          {/* Statutory footer lists and legal declarations */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-gray-500 gap-4">
            <span className="text-center sm:text-left">© 2026 RK Properties Ltd. All rights reserved globally. RERA agent compliance assured.</span>
            <div className="flex gap-4">
              <span>DISCLAIMER: All land boundaries undergo statutory approvals. Historical ROI figures are for forecasting models only.</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Immersive Strategic Blueprint slide-out panel */}
      <StrategicBlueprint 
        isOpen={isBlueprintOpen} 
        onClose={() => setIsBlueprintOpen(false)} 
      />

    </div>
  );
}
