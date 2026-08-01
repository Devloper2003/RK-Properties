'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Ruler,
  IndianRupee,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Shield,
  Zap,
  Droplets,
  TreePine,
  Lock,
  Wifi,
  Sun,
  Home,
  Landmark,
  Eye,
  Car,
  ShoppingBag,
  Users,
  Building2,
  FileCheck,
  Banknote,
  Phone,
  Download,
  MessageCircle,
  ArrowLeft,
  Sparkles,
  BarChart3,
  Clock,
  CircleDollarSign,
} from 'lucide-react';
import { usePropertyStore } from '@/store/use-property-store';
import type { Project } from '@/types/rk-properties';

/* ─── Status badge config ─── */
const statusConfig: Record<string, { bg: string; label: string }> = {
  'Selling Fast': { bg: 'bg-emerald-500', label: 'Selling Fast' },
  'Pre-launch': { bg: 'bg-sky-500', label: 'Pre-launch' },
  'Almost Sold Out': { bg: 'bg-amber-500', label: 'Almost Sold Out' },
  'Fully Developed': { bg: 'bg-[#D4AF37]', label: 'Fully Developed' },
  'MVDA Approved': { bg: 'bg-emerald-600', label: 'MVDA Approved' },
  'New Launch': { bg: 'bg-violet-500', label: 'New Launch' },
};

/* ─── Amenity icon mapping ─── */
function getAmenityIcon(amenity: string) {
  const a = amenity.toLowerCase();
  if (a.includes('security') || a.includes('cctv') || a.includes('biometric')) return Shield;
  if (a.includes('solar') || a.includes('power') || a.includes('electric') || a.includes('cable')) return Zap;
  if (a.includes('water') || a.includes('sewer') || a.includes('rain') || a.includes('drain')) return Droplets;
  if (a.includes('tree') || a.includes('garden') || a.includes('green') || a.includes('landscape') || a.includes('plantation')) return TreePine;
  if (a.includes('lock') || a.includes('gate') || a.includes('walled') || a.includes('boundary')) return Lock;
  if (a.includes('broadband') || a.includes('fiber') || a.includes('wifi') || a.includes('internet')) return Wifi;
  if (a.includes('temple') || a.includes('spiritual') || a.includes('bhajan') || a.includes('meditation')) return Sun;
  if (a.includes('club') || a.includes('amenity') || a.includes('recreation') || a.includes('play')) return Home;
  if (a.includes('bank') || a.includes('financ') || a.includes('loan')) return Banknote;
  if (a.includes('road') || a.includes('highway') || a.includes('connect') || a.includes('transit')) return Car;
  if (a.includes('market') || a.includes('commercial') || a.includes('shop') || a.includes('frontage')) return ShoppingBag;
  if (a.includes('vip') || a.includes('helipad') || a.includes('elite') || a.includes('private')) return Users;
  if (a.includes('building') || a.includes('floor') || a.includes('story')) return Building2;
  if (a.includes('vastu') || a.includes('vedic') || a.includes('approval') || a.includes('approved')) return Landmark;
  if (a.includes('view') || a.includes('overlook') || a.includes('sacred')) return Eye;
  if (a.includes('medical') || a.includes('doctor') || a.includes('care') || a.includes('ayurvedic')) return FileCheck;
  if (a.includes('organic') || a.includes('farm')) return TreePine;
  if (a.includes('senior') || a.includes('elder') || a.includes('retired')) return Users;
  return Sparkles;
}

/* ─── Parse ROI text for visual bar ─── */
function parseRoiMultiplier(text: string): number {
  const match = text.match(/([\d.]+)\s*X/i);
  if (match) return parseFloat(match[1]);
  return 1;
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function ProjectDetailPage() {
  const { selectedProjectId, projects, openOverlay, closeOverlay, setSelectedProjectForContact } = usePropertyStore();
  const [activeImage, setActiveImage] = useState(0);

  const project = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) ?? null,
    [projects, selectedProjectId],
  );

  /* Build gallery array: main image first, then gallery */
  const allImages = useMemo(() => {
    if (!project) return [];
    return [project.image, ...(project.gallery ?? [])];
  }, [project]);

  /* Reset active image when project changes */
  const currentImage = allImages[activeImage] ?? '';

  /* ─── Not Found ─── */
  if (!project || !selectedProjectId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gold-100 dark:bg-gold-900/40 flex items-center justify-center mb-6">
          <Building2 className="w-10 h-10 text-gold-600 dark:text-gold-300" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-3">
          Project Not Found
        </h2>
        <p className="text-gold-600 dark:text-gold-300 mb-8 max-w-md">
          The project you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <button
          onClick={() => openOverlay('premium-projects')}
          className="px-6 py-3 bg-[#D4AF37] text-white font-medium rounded-xl hover:bg-[#B8972E] transition-colors cursor-pointer"
        >
          Browse All Projects
        </button>
      </div>
    );
  }

  const status = statusConfig[project.status] ?? { bg: 'bg-gray-500', label: project.status };
  const roi5 = parseRoiMultiplier(project.roiProjection5Yr);
  const roi10 = parseRoiMultiplier(project.roiProjection10Yr);

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleBookVisit = () => {
    setSelectedProjectForContact(project.name);
    closeOverlay();
  };

  const whatsappMessage = encodeURIComponent(
    `Hi RK Properties! I'm interested in "${project.name}" at ${project.location}. Could you share more details?`,
  );
  const whatsappUrl = `https://wa.me/919115277000?text=${whatsappMessage}`;

  return (
    <div className="w-full">
      {/* ═══════ SECTION 1: HERO IMAGE GALLERY ═══════ */}
      <section className="relative w-full">
        {/* Main Hero Image */}
        <div className="relative w-full h-[350px] sm:h-[400px] lg:h-[450px] overflow-hidden bg-gold-900/10 dark:bg-gold-900/20">
          <Image
            src={currentImage}
            alt={`${project.name} - Image ${activeImage + 1}`}
            fill
            className="object-cover transition-opacity duration-500"
            priority
            sizes="(max-width: 768px) 100vw, 78vw"
          />

          {/* Dark gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

          {/* Status Badge (top-left) */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`${status.bg} text-white text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg`}>
              {status.label}
            </span>
          </div>

          {/* Type Badge (below status) */}
          <div className="absolute top-[52px] left-4 z-10">
            <span className="bg-[#D4AF37]/20 dark:bg-[#D4AF37]/25 text-[#D4AF37] text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-[#D4AF37]/30">
              {project.type}
            </span>
          </div>

          {/* Image Counter (top-right) */}
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-black/60 backdrop-blur-md text-white text-xs font-mono px-3 py-1.5 rounded-lg">
              {activeImage + 1} / {allImages.length}
            </span>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div className="w-full bg-gold-100/50 dark:bg-gold-900/20 border-b border-gold-200/50 dark:border-gold-800/30">
          <div className="flex gap-2 p-3 overflow-x-auto">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  idx === activeImage
                    ? 'ring-2 ring-[#D4AF37] scale-105 shadow-md'
                    : 'ring-1 ring-gold-200/60 dark:ring-gold-700/40 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 2: PROJECT TITLE & QUICK STATS ═══════ */}
      <section className="px-4 sm:px-6 lg:px-10 py-8">
        {/* Project Name */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gold-800 dark:text-gold-100 tracking-tight leading-tight">
          {project.name}
        </h1>

        {/* Tag Line */}
        <p className="mt-2 text-base sm:text-lg italic text-[#D4AF37] font-serif">
          {project.tag}
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {/* Location */}
          <div className="group flex items-start gap-3 p-4 rounded-xl border border-gold-200/70 dark:border-gold-800/30 bg-white dark:bg-gold-900/10 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-md">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 flex items-center justify-center">
              <MapPin className="w-4.5 h-4.5 text-[#D4AF37]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-wider text-gold-600/70 dark:text-gold-300/60 mb-0.5">Location</p>
              <p className="text-sm font-medium text-gold-800 dark:text-gold-100 leading-snug line-clamp-2">{project.location}</p>
            </div>
          </div>

          {/* Size */}
          <div className="group flex items-start gap-3 p-4 rounded-xl border border-gold-200/70 dark:border-gold-800/30 bg-white dark:bg-gold-900/10 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-md">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 flex items-center justify-center">
              <Ruler className="w-4.5 h-4.5 text-[#D4AF37]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-wider text-gold-600/70 dark:text-gold-300/60 mb-0.5">Plot Size</p>
              <p className="text-sm font-medium text-gold-800 dark:text-gold-100 leading-snug">{project.size}</p>
            </div>
          </div>

          {/* Price */}
          <div className="group flex items-start gap-3 p-4 rounded-xl border border-gold-200/70 dark:border-gold-800/30 bg-white dark:bg-gold-900/10 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-md">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 flex items-center justify-center">
              <IndianRupee className="w-4.5 h-4.5 text-[#D4AF37]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-wider text-gold-600/70 dark:text-gold-300/60 mb-0.5">Price</p>
              <p className="text-sm font-medium text-gold-800 dark:text-gold-100 leading-snug">{project.price}</p>
            </div>
          </div>

          {/* Appreciation */}
          <div className="group flex items-start gap-3 p-4 rounded-xl border border-gold-200/70 dark:border-gold-800/30 bg-white dark:bg-gold-900/10 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-md">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5 text-[#D4AF37]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-wider text-gold-600/70 dark:text-gold-300/60 mb-0.5">Appreciation</p>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 leading-snug">{project.appreciationRate}% p.a.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 sm:mx-10" />

      {/* ═══════ SECTION 3: ABOUT THIS PROJECT ═══════ */}
      <section className="px-4 sm:px-6 lg:px-10 py-8">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-1">
          About This Project
        </h2>
        <div className="w-12 h-0.5 bg-[#D4AF37] rounded-full mb-6" />

        <p className="text-gold-700 dark:text-gold-300 leading-relaxed text-[15px] sm:text-base">
          {project.description}
        </p>

        {/* Key Highlights */}
        {project.highlights.length > 0 && (
          <div className="mt-8">
            <h3 className="text-base sm:text-lg font-serif font-semibold text-gold-800 dark:text-gold-100 mb-4 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-[#D4AF37]" />
              Key Highlights
            </h3>
            <ul className="space-y-3">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm sm:text-[15px] text-gold-700 dark:text-gold-300 leading-relaxed">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <div className="section-divider mx-6 sm:mx-10" />

      {/* ═══════ SECTION 4: AMENITIES ═══════ */}
      <section className="px-4 sm:px-6 lg:px-10 py-8">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-1">
          Amenities & Features
        </h2>
        <div className="w-12 h-0.5 bg-[#D4AF37] rounded-full mb-6" />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {project.amenities.map((amenity, idx) => {
            const IconComp = getAmenityIcon(amenity);
            return (
              <div
                key={idx}
                className="group flex items-center gap-3 p-4 rounded-xl border border-gold-200/50 dark:border-gold-800/25 bg-white dark:bg-gold-900/10 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/30 hover:shadow-sm transition-all duration-300 cursor-default"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 flex items-center justify-center group-hover:bg-[#D4AF37]/20 dark:group-hover:bg-[#D4AF37]/25 transition-colors">
                  <IconComp className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <span className="text-sm font-medium text-gold-700 dark:text-gold-200 leading-snug">
                  {amenity}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="section-divider mx-6 sm:mx-10" />

      {/* ═══════ SECTION 5: ROI PROJECTIONS ═══════ */}
      <section className="px-4 sm:px-6 lg:px-10 py-8">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-1">
          ROI Projections
        </h2>
        <div className="w-12 h-0.5 bg-[#D4AF37] rounded-full mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* 5-Year Card */}
          <div className="gold-glow-border rounded-2xl border border-[#D4AF37]/30 dark:border-[#D4AF37]/20 p-5 sm:p-6 bg-white dark:bg-gold-900/10">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-base font-serif font-bold text-gold-800 dark:text-gold-100">
                5-Year Projection
              </h3>
            </div>

            {/* Visual Bar */}
            <div className="mb-4">
              <div className="flex items-end justify-between mb-2">
                <span className="text-xs font-mono text-gold-600/60 dark:text-gold-300/50 uppercase tracking-wider">Growth</span>
                <span className="text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400">
                  {roi5}X
                </span>
              </div>
              <div className="h-3 rounded-full bg-gold-100 dark:bg-gold-900/30 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-emerald-500 transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min((roi5 / 6) * 100, 100)}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-gold-600 dark:text-gold-300 leading-relaxed">
              {project.roiProjection5Yr}
            </p>
          </div>

          {/* 10-Year Card */}
          <div className="gold-glow-border rounded-2xl border border-[#D4AF37]/30 dark:border-[#D4AF37]/20 p-5 sm:p-6 bg-white dark:bg-gold-900/10">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-base font-serif font-bold text-gold-800 dark:text-gold-100">
                10-Year Projection
              </h3>
            </div>

            {/* Visual Bar */}
            <div className="mb-4">
              <div className="flex items-end justify-between mb-2">
                <span className="text-xs font-mono text-gold-600/60 dark:text-gold-300/50 uppercase tracking-wider">Growth</span>
                <span className="text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400">
                  {roi10}X
                </span>
              </div>
              <div className="h-3 rounded-full bg-gold-100 dark:bg-gold-900/30 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-emerald-500 transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min((roi10 / 6) * 100, 100)}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-gold-600 dark:text-gold-300 leading-relaxed">
              {project.roiProjection10Yr}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-[11px] font-mono text-gold-600/50 dark:text-gold-300/40 leading-relaxed text-center">
          * Projections are based on historical data, infrastructure development plans, and regional growth trends. Actual returns may vary. This is not financial advice.
        </p>
      </section>

      <div className="section-divider mx-6 sm:mx-10" />

      {/* ═══════ SECTION 6: ADDITIONAL DETAILS ═══════ */}
      <section className="px-4 sm:px-6 lg:px-10 py-8">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-1">
          Additional Details
        </h2>
        <div className="w-12 h-0.5 bg-[#D4AF37] rounded-full mb-6" />

        <p className="text-sm sm:text-[15px] text-gold-700 dark:text-gold-300 leading-relaxed mb-8">
          {project.details}
        </p>

        {/* Legal Info Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: FileCheck, label: 'MVDA Approved', desc: 'Full regulatory compliance' },
            { icon: Shield, label: 'Clear Registry', desc: 'Litigation-free title deed' },
            { icon: Banknote, label: 'Bank Financing', desc: 'Up to 80% LTV available' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-4 rounded-xl border border-emerald-200/60 dark:border-emerald-800/30 bg-emerald-50/50 dark:bg-emerald-900/10"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">{item.label}</p>
                <p className="text-xs text-emerald-600/70 dark:text-emerald-400/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mx-6 sm:mx-10" />

      {/* ═══════ SECTION 7: CTA SECTION ═══════ */}
      <section className="px-4 sm:px-6 lg:px-10 py-8 pb-10">
        <div className="rounded-2xl border border-[#D4AF37]/30 dark:border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 dark:from-[#D4AF37]/10 dark:via-transparent dark:to-[#D4AF37]/10 p-6 sm:p-8 text-center">
          {/* Heading */}
          <div className="mb-6">
            <CircleDollarSign className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gold-800 dark:text-gold-100 mb-2">
              Interested in {project.name}?
            </h2>
            <p className="text-sm text-gold-600 dark:text-gold-300 max-w-lg mx-auto">
              Schedule a free site visit, download the detailed brochure, or connect with us instantly on WhatsApp.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Book a Site Visit */}
            <button
              onClick={handleBookVisit}
              className="submit-glow w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4AF37] hover:bg-[#B8972E] text-white font-semibold rounded-xl transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#D4AF37]/25 active:scale-[0.98]"
            >
              <Phone className="w-4.5 h-4.5" />
              Book a Site Visit
            </button>

            {/* Download Brochure */}
            <a
              href={`/api/brochure?projectId=${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-[#D4AF37]/40 dark:border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 dark:hover:bg-[#D4AF37]/10 font-semibold rounded-xl transition-all duration-300 cursor-pointer hover:border-[#D4AF37] active:scale-[0.98]"
            >
              <Download className="w-4.5 h-4.5" />
              Download Brochure
            </a>

            {/* WhatsApp Us */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]"
            >
              <MessageCircle className="w-4.5 h-4.5" />
              WhatsApp Us
            </a>
          </div>

          {/* Back to All Projects */}
          <button
            onClick={() => openOverlay('premium-projects')}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-gold-600/70 dark:text-gold-300/60 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to All Projects
          </button>
        </div>
      </section>
    </div>
  );
}