'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, MapPin, Ruler, TrendingUp, ChevronRight,
  Download, Phone, Share2, CheckCircle2, X, ChevronLeft,
  ArrowUpRight, Building2, Shield, ImageIcon, Star,
  Sparkles, Eye, Calendar, BadgePercent
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { propertiesData } from '@/data/propertyData';
import type { Project } from '@/types/rk-properties';
import Navbar from '@/components/rk-properties/Navbar';
import AnnouncementBanner from '@/components/rk-properties/AnnouncementBanner';
import Footer from '@/components/rk-properties/Footer';
import DarkModeToggle from '@/components/rk-properties/DarkModeToggle';

/* ───────────────────────────── Filter Tabs ───────────────────────────── */
const FILTER_TABS: { label: string; value: Project['type'] | 'All' }[] = [
  { label: 'All Projects', value: 'All' },
  { label: 'Premium Township', value: 'Premium Township' },
  { label: 'Residential', value: 'Residential Project' },
  { label: 'Investment Plots', value: 'Investment Plots' },
  { label: 'Verified Estates', value: 'Verified Estates' },
];

/* ─────────────────────────── Status Badge Config ─────────────────────── */
function getStatusBadge(status: Project['status']) {
  switch (status) {
    case 'Selling Fast':
      return { className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800', dot: 'bg-emerald-500' };
    case 'Pre-launch':
      return { className: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300 border-sky-200 dark:border-sky-800', dot: 'bg-sky-500' };
    case 'Almost Sold Out':
      return { className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800', dot: 'bg-amber-500' };
    case 'Fully Developed':
      return { className: 'bg-gold-100 text-gold-800 dark:bg-gold-900/40 dark:text-gold-200 border-gold-200 dark:border-gold-800', dot: 'bg-gold-500' };
  }
}

/* ─────────────────────────── Project Card ─────────────────────────────── */
function ProjectCard({
  project,
  index,
  onViewDetails,
}: {
  project: Project;
  index: number;
  onViewDetails: (p: Project) => void;
}) {
  const statusStyle = getStatusBadge(project.status);
  const galleryImages = [project.image, ...(project.gallery || [])];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="group overflow-hidden border-gold-200/60 dark:border-gold-800/40 bg-white dark:bg-gray-950 shadow-sm hover:shadow-xl dark:shadow-gold-900/20 transition-all duration-500 card-tilt-hover">
        {/* Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="outline"
              className={`${statusStyle.className} text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} mr-1.5 animate-pulse`} />
              {project.status}
            </Badge>
          </div>
          {/* Tag badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-gold-500/90 text-white text-[9px] font-mono uppercase font-bold tracking-wider backdrop-blur-sm border-0 px-2 py-0.5">
              <Star className="w-2.5 h-2.5 mr-1 fill-current" />
              {project.tag}
            </Badge>
          </div>
          {/* Bottom info on image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white drop-shadow-lg leading-tight">
                {project.name}
              </h3>
              <p className="text-white/80 text-[11px] font-mono mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {project.location.length > 50 ? project.location.slice(0, 50) + '...' : project.location}
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-4 sm:p-5 space-y-3.5">
          {/* Type & Appreciation row */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gold-600 dark:text-gold-400 font-semibold">
              {project.type}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              {project.appreciationRate}% /yr
            </span>
          </div>

          {/* Price & Size */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gold-50 dark:bg-gold-900/20 rounded-lg p-2.5 border border-gold-100 dark:border-gold-800/30">
              <p className="text-[9px] font-mono uppercase tracking-wider text-gold-600 dark:text-gold-500 mb-0.5">Price</p>
              <p className="text-sm font-bold text-gold-800 dark:text-gold-200">{project.price}</p>
            </div>
            <div className="bg-gold-50 dark:bg-gold-900/20 rounded-lg p-2.5 border border-gold-100 dark:border-gold-800/30">
              <p className="text-[9px] font-mono uppercase tracking-wider text-gold-600 dark:text-gold-500 mb-0.5">Size</p>
              <p className="text-sm font-bold text-gold-800 dark:text-gold-200">{project.size}</p>
            </div>
          </div>

          {/* Amenities preview */}
          <div className="space-y-1.5">
            <p className="text-[9px] font-mono uppercase tracking-wider text-gold-600 dark:text-gold-500 font-semibold">Key Amenities</p>
            <div className="flex flex-wrap gap-1.5">
              {project.amenities.slice(0, 4).map((amenity, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[10px] text-gray-600 dark:text-gray-400 bg-gold-50/80 dark:bg-gold-900/15 px-2 py-1 rounded-md border border-gold-100/60 dark:border-gold-800/20"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-gold-500 flex-shrink-0" />
                  {amenity.length > 30 ? amenity.slice(0, 30) + '...' : amenity}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={() => onViewDetails(project)}
            className="w-full bg-gold-800 hover:bg-gold-700 dark:bg-gold-600 dark:hover:bg-gold-500 text-white font-mono text-[11px] uppercase tracking-widest font-bold py-2.5 rounded-xl transition-all submit-glow flex items-center justify-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            View Details
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ──────────────────── Project Detail Expanded View ────────────────────── */
function ProjectDetailView({
  project,
  onClose,
  onDownloadBrochure,
  onBookVisit,
}: {
  project: Project;
  onClose: () => void;
  onDownloadBrochure: (p: Project) => void;
  onBookVisit: (p: Project) => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const statusStyle = getStatusBadge(project.status);
  const allImages = [project.image, ...(project.gallery || [])];

  const prevImage = () => setCurrentImage((c) => (c === 0 ? allImages.length - 1 : c - 1));
  const nextImage = () => setCurrentImage((c) => (c === allImages.length - 1 ? 0 : c + 1));

  const whatsappText = encodeURIComponent(
    `Hi, I'm interested in *${project.name}* (${project.type}) in Vrindavan.\n\nLocation: ${project.location}\nPrice: ${project.price}\nSize: ${project.size}\n\nPlease share more details and available payment plans.`
  );
  const whatsappUrl = `https://wa.me/919115277000?text=${whatsappText}`;

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[92vh] overflow-y-auto p-0 bg-white dark:bg-gray-950 border-gold-200 dark:border-gold-800/40">
        <DialogTitle className="sr-only">{project.name} — Project Details</DialogTitle>
        <DialogDescription className="sr-only">Full details for {project.name} including gallery, amenities, highlights, and ROI projections.</DialogDescription>

        {/* ── Image Gallery ── */}
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-100 dark:bg-gray-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={allImages[currentImage]}
                alt={`${project.name} — Image ${currentImage + 1}`}
                fill
                className="object-cover"
                sizes="95vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Nav arrows */}
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image counter */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-white text-[10px] font-mono flex items-center gap-1.5">
            <ImageIcon className="w-3 h-3" />
            {currentImage + 1} / {allImages.length}
          </div>

          {/* Project name overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className={`${statusStyle.className} text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} mr-1`} />
                {project.status}
              </Badge>
              <Badge className="bg-gold-500/90 text-white text-[9px] font-mono uppercase font-bold tracking-wider border-0 px-2 py-0.5">
                {project.type}
              </Badge>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
              {project.name}
            </h2>
          </div>
        </div>

        {/* ── Thumbnail strip ── */}
        <div className="flex gap-2 px-4 py-3 bg-gold-50/50 dark:bg-gray-900/50 overflow-x-auto">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentImage
                  ? 'border-gold-500 dark:border-gold-400 ring-2 ring-gold-500/30'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: MapPin, label: 'Location', value: project.location },
              { icon: Ruler, label: 'Plot Size', value: project.size },
              { icon: Sparkles, label: 'Price', value: project.price },
              { icon: TrendingUp, label: 'Appreciation', value: `${project.appreciationRate}% p.a.` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-gold-50 dark:bg-gold-900/15 rounded-xl p-3 border border-gold-100 dark:border-gold-800/20">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                  <span className="text-[9px] font-mono uppercase tracking-wider text-gold-600 dark:text-gold-500 font-semibold">{label}</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-gold-800 dark:text-gold-200 leading-snug">{value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif text-lg font-bold text-gold-800 dark:text-gold-200 mb-2">About This Project</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-serif text-lg font-bold text-gold-800 dark:text-gold-200 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-gold-500" />
              Key Highlights
            </h3>
            <div className="space-y-2">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All Amenities */}
          <div>
            <h3 className="font-serif text-lg font-bold text-gold-800 dark:text-gold-200 mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gold-500" />
              Amenities & Infrastructure
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {project.amenities.map((a, i) => (
                <div key={i} className="flex items-center gap-2 bg-gold-50/70 dark:bg-gold-900/10 rounded-lg px-3 py-2 border border-gold-100/60 dark:border-gold-800/15">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ROI Projections */}
          <div>
            <h3 className="font-serif text-lg font-bold text-gold-800 dark:text-gold-200 mb-3 flex items-center gap-2">
              <BadgePercent className="w-4 h-4 text-gold-500" />
              ROI Projections
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-emerald-50 dark:bg-emerald-900/15 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800/20">
                <div className="flex items-center gap-1.5 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">5-Year Projection</span>
                </div>
                <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">{project.roiProjection5Yr}</p>
              </div>
              <div className="bg-gold-50 dark:bg-gold-900/15 rounded-xl p-4 border border-gold-100 dark:border-gold-800/20">
                <div className="flex items-center gap-1.5 mb-2">
                  <TrendingUp className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gold-700 dark:text-gold-400 font-bold">10-Year Projection</span>
                </div>
                <p className="text-sm text-gold-800 dark:text-gold-300 leading-relaxed">{project.roiProjection10Yr}</p>
              </div>
            </div>
          </div>

          {/* Full Details Text */}
          <div>
            <h3 className="font-serif text-lg font-bold text-gold-800 dark:text-gold-200 mb-2">Additional Details</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.details}</p>
          </div>

          {/* ── Action Buttons ── */}
          <div className="section-divider my-4" />
          <div className="grid sm:grid-cols-3 gap-3">
            <Button
              onClick={() => onDownloadBrochure(project)}
              className="bg-gold-800 hover:bg-gold-700 dark:bg-gold-600 dark:hover:bg-gold-500 text-white font-mono text-[11px] uppercase tracking-widest font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Brochure
            </Button>
            <Button
              onClick={() => onBookVisit(project)}
              className="bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-mono text-[11px] uppercase tracking-widest font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Book Site Visit
            </Button>
            <Button
              onClick={() => window.open(whatsappUrl, '_blank')}
              className="bg-[#25D366] hover:bg-[#1DA851] text-white font-mono text-[11px] uppercase tracking-widest font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
            </Button>
          </div>

          {/* Back button */}
          <div className="pt-2">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gold-600 dark:text-gold-400 hover:text-gold-800 dark:hover:text-gold-200 hover:bg-gold-50 dark:hover:bg-gold-900/20 font-mono text-xs uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to All Projects
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ══════════════════════════════ MAIN PAGE ════════════════════════════════ */
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return propertiesData;
    return propertiesData.filter((p) => p.type === activeFilter);
  }, [activeFilter]);

  const handleDownloadBrochure = async (project: Project) => {
    setDownloading(project.id);
    try {
      const res = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project.id }),
      });
      if (!res.ok) throw new Error('Failed to generate brochure');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.name.replace(/\s+/g, '_')}_Brochure.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // fallback: direct whatsapp link
      const whatsappText = encodeURIComponent(
        `Hi, I'd like to receive the brochure for *${project.name}*. Please share it. Thank you!`
      );
      window.open(`https://wa.me/919115277000?text=${whatsappText}`, '_blank');
    } finally {
      setDownloading(null);
    }
  };

  const handleBookVisit = (project: Project) => {
    const text = encodeURIComponent(
      `Hi, I'd like to book a site visit for *${project.name}* (${project.type}).\n\nLocation: ${project.location}\n\nPlease let me know available slots. Thank you!`
    );
    window.open(`https://wa.me/919115277000?text=${text}`, '_blank');
  };

  return (
    <div className="bg-gold-50 dark:bg-[#0F0E0C] text-gold-800 dark:text-gold-200 min-h-screen flex flex-col">
      {/* ── Announcement Banner ── */}
      <AnnouncementBanner />

      {/* ── Navigation ── */}
      <Navbar />

      <main className="flex-1 pt-9">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-900/30 border border-gold-200 dark:border-gold-800/30 text-[10px] font-mono uppercase tracking-widest text-gold-700 dark:text-gold-400 font-bold mb-4">
              <Building2 className="w-3 h-3" />
              MVDA Approved Properties
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gold-800 dark:text-gold-100 leading-tight mb-4">
              Our Projects
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Explore our curated portfolio of MVDA approved, litigation-free properties in Vrindavan&apos;s most sought-after corridors. Each project is handpicked for maximum appreciation potential and spiritual proximity.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8"
          >
            {[
              { value: '4', label: 'Premium Projects' },
              { value: '18-24%', label: 'Avg. Annual Returns' },
              { value: '1,200+', label: 'Happy Investors' },
              { value: '100%', label: 'Litigation Free' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl sm:text-2xl font-serif font-bold text-gold-800 dark:text-gold-200">{s.value}</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-gold-600 dark:text-gold-500">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="section-divider max-w-7xl mx-auto" />

      {/* ── Filter Tabs ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 rounded-xl text-[11px] font-mono uppercase tracking-wider font-semibold transition-all duration-300 ${
                activeFilter === tab.value
                  ? 'bg-gold-800 dark:bg-gold-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gold-200 dark:border-gold-800/30 hover:border-gold-400 dark:hover:border-gold-600 hover:text-gold-700 dark:hover:text-gold-300'
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-[10px] opacity-70">
                ({tab.value === 'All' ? propertiesData.length : propertiesData.filter(p => p.type === tab.value).length})
              </span>
            </button>
          ))}
        </motion.div>
      </section>

      {/* ── Project Cards Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onViewDetails={setSelectedProject}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Building2 className="w-12 h-12 text-gold-300 dark:text-gold-700 mx-auto mb-4" />
              <p className="font-serif text-xl text-gold-700 dark:text-gold-400">No projects found for this filter.</p>
              <button
                onClick={() => setActiveFilter('All')}
                className="mt-4 text-sm font-mono text-gold-600 dark:text-gold-400 hover:text-gold-800 dark:hover:text-gold-200 underline underline-offset-4"
              >
                View all projects
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Detail View Dialog ── */}
      {selectedProject && (
        <ProjectDetailView
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onDownloadBrochure={handleDownloadBrochure}
          onBookVisit={handleBookVisit}
        />
      )}

      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Dark Mode Toggle ── */}
      <DarkModeToggle />
    </div>
  );
}