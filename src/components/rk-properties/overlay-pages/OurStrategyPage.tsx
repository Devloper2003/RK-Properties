'use client';

import { ShieldCheck, FileSearch, MapPin, Handshake, Award, Scale, Eye, Lock, ArrowRight, CheckCircle2, Users, Briefcase, Building2 } from 'lucide-react';
import { usePropertyStore } from '@/store/use-property-store';
import { sampleTestimonials } from '@/data/propertyData';

const steps = [
  { num: '01', icon: FileSearch, title: 'Discovery & Needs Assessment', desc: 'We understand your investment goals, budget, timeline, and spiritual or lifestyle preferences. Our advisory team creates a personalized shortlist of matching properties.' },
  { num: '02', icon: ShieldCheck, title: 'Legal Verification & Due Diligence', desc: 'Every property undergoes our Triple-Safety Lock: (1) Government land record API verification, (2) Physical on-ground survey, (3) Judicial title deed review by senior advocates.' },
  { num: '03', icon: MapPin, title: 'Site Visit & Selection', desc: 'Experience the location firsthand with our complimentary site tour. Free Delhi-NCR pick-up, guided tour of corridors, temples, and infrastructure projects.' },
  { num: '04', icon: Handshake, title: 'Registry & Handover', desc: 'Complete transaction support including documentation, stamp duty, registration, and digital title deed delivery. NRI remote PoA process available.' },
];

const guarantees = [
  { icon: ShieldCheck, title: '100% MVDA Approved', desc: 'Every plot is approved under Mathura-Vrindavan Development Authority guidelines with verified zoning compliance.' },
  { icon: Scale, title: '0 Litigation Guarantee', desc: 'Complete legal clearance verified through government APIs, physical surveys, and judicial review. Zero disputes on record.' },
  { icon: Lock, title: 'Triple-Safety Lock Documentation', desc: 'Three-layer verification: API check + physical survey + judicial review. The most thorough due diligence in the region.' },
  { icon: Eye, title: 'Transparent Pricing', desc: 'No hidden charges, no brokerage fees. What you see is exactly what you pay. Complete cost breakdown provided upfront.' },
];

const team = [
  { role: 'Founder & CEO', desc: '15+ years in Vrindavan real estate with deep government and legal network connections.' },
  { role: 'Legal Team', desc: 'Senior advocates specializing in UP land laws, RERA compliance, and NRI property transactions.' },
  { role: 'Investment Advisory', desc: 'Chartered Accountants and financial analysts providing data-driven investment recommendations.' },
  { role: 'Site Management', desc: 'Dedicated on-ground team for property maintenance, security monitoring, and client support.' },
];

export default function OurStrategyPage() {
  const { openOverlay } = usePropertyStore();

  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gold-800 via-gold-900 to-gold-950 px-6 py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <span className="animate-hero-text inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gold-200 text-[10px] font-mono uppercase tracking-widest">
            <Award className="w-3 h-3" /> Excellence
          </span>
          <h1 className="animate-hero-text animate-hero-text-delay-1 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            The RK Properties Difference
          </h1>
          <p className="animate-hero-text animate-hero-text-delay-2 text-gold-200/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            A systematic, legally rigorous approach to real estate investment. Every step designed to protect your capital and maximize returns.
          </p>
        </div>
      </div>

      {/* Process */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-2 tracking-tight">Our Process</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Four systematic steps from discovery to handover.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((s) => (
            <div key={s.num} className="relative p-6 rounded-2xl border border-gold-200/40 dark:border-gold-800/30 bg-white dark:bg-gray-900 group hover:shadow-lg transition-all">
              <div className="absolute top-4 right-4 text-4xl font-serif font-bold text-gold-200 dark:text-gray-800">{s.num}</div>
              <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-900/60 flex items-center justify-center mb-4 group-hover:bg-gold-200 dark:group-hover:bg-gold-800/60 transition-colors">
                <s.icon className="w-5 h-5 text-gold-600 dark:text-gold-400" />
              </div>
              <h3 className="font-serif font-bold text-gold-800 dark:text-gold-100 text-sm mb-2 pr-10">{s.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mx-6" />

      {/* Guarantees */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-2 tracking-tight">Our Guarantees</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Unmatched protection for every investment.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {guarantees.map((g, i) => (
            <div key={i} className="p-5 rounded-2xl bg-gradient-to-br from-gold-50 to-white dark:from-gray-900 dark:to-gray-900 border border-gold-200/40 dark:border-gold-800/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gold-100 dark:bg-gold-900/60 flex items-center justify-center">
                  <g.icon className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                </div>
                <h3 className="font-serif font-bold text-sm text-gold-800 dark:text-gold-100">{g.title}</h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mx-6" />

      {/* About RK Group */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-2 tracking-tight">About RK Group</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">A legacy of trust in Vrindavan real estate.</p>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gold-200/40 dark:border-gold-800/30 p-6 sm:p-8">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { val: '15+', label: 'Years Experience', icon: Briefcase },
              { val: '₹450Cr+', label: 'Assets Transacted', icon: Building2 },
              { val: '1,200+', label: 'Clients Served', icon: Users },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-gold-50 dark:bg-gray-800">
                <s.icon className="w-5 h-5 text-gold-600 dark:text-gold-400 mx-auto mb-2" />
                <p className="text-xl font-serif font-bold text-gold-700 dark:text-gold-300">{s.val}</p>
                <p className="text-[9px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            RK Properties is a division of the RK Group, a well-established business conglomerate with deep roots in Vrindavan&apos;s real estate and commercial landscape. Founded with a singular vision — to bring absolute transparency and legal safety to spiritual real estate investment — RK Properties has become the most trusted name for NRI investors, business owners, and high-net-worth individuals seeking premium land assets in the Mathura-Vrindavan region.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Our team combines decades of local expertise with modern financial analysis tools, providing clients with data-driven investment recommendations backed by comprehensive legal verification. Every property in our portfolio has been personally inspected, legally verified through government land record APIs, and approved by our in-house legal counsel.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-gold-100 dark:bg-gold-900/60 text-gold-700 dark:text-gold-300 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> UP-RERA Registered
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-gold-100 dark:bg-gold-900/60 text-gold-700 dark:text-gold-300 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> MVDA Authorized Agent
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-gold-100 dark:bg-gold-900/60 text-gold-700 dark:text-gold-300 font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> ISO Compliant
            </span>
          </div>
        </div>
      </div>

      <div className="section-divider mx-6" />

      {/* Team */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-2 tracking-tight">Our Expert Team</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Dedicated professionals across every function.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {team.map((t, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gold-200/30 dark:border-gold-800/20">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gold-200 to-gold-100 dark:from-gold-800 dark:to-gold-900 flex items-center justify-center">
                <Users className="w-6 h-6 text-gold-700 dark:text-gold-300" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-gold-800 dark:text-gold-100 mb-1">{t.role}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mx-6" />

      {/* Testimonials */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-2 tracking-tight">Client Testimonials</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">What our investors say about their experience.</p>
        <div className="space-y-4">
          {sampleTestimonials.slice(0, 4).map((t) => (
            <div key={t.id} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gold-200/30 dark:border-gold-800/20">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-serif font-bold text-sm text-gold-800 dark:text-gold-100">{t.name}</p>
                  <p className="text-[10px] font-mono text-gray-400">{t.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{t.appreciationObserved}</p>
                  <p className="text-[9px] font-mono text-gray-400">{t.projectBought}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-10 bg-gradient-to-r from-gold-800 to-gold-900">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-serif font-bold text-white mb-3">Experience the RK Difference</h3>
          <p className="text-sm text-gold-200/80 mb-6">Schedule a complimentary consultation and discover why 1,200+ clients trust us.</p>
          <button
            onClick={() => { usePropertyStore.getState().closeOverlay(); setTimeout(() => document.getElementById('contact-experience')?.scrollIntoView({ behavior: 'smooth' }), 400); }}
            className="px-6 py-3 bg-white text-gold-800 text-xs font-mono font-bold uppercase tracking-wider rounded-xl hover:bg-gold-50 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            Start Your Journey <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}