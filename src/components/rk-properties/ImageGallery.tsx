'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  initialIndex?: number;
  projectName?: string;
  onClose: () => void;
}

export default function ImageGallery({ images, initialIndex = 0, projectName, onClose }: ImageGalleryProps) {
  const [index, setIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goNext, goPrev]);

  // Prevent body scroll when gallery is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        aria-label="Close gallery"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Project Name */}
      {projectName && (
        <div className="absolute top-5 left-5 z-10">
          <span className="text-white/80 font-serif text-sm font-bold">{projectName}</span>
        </div>
      )}

      <div className="relative max-w-5xl w-full flex flex-col items-center gap-4">
        {/* Image Counter */}
        <div className="flex items-center gap-2 mb-1">
          <Images className="w-4 h-4 text-gold-400" />
          <span className="text-[11px] font-mono text-white/70 uppercase tracking-widest">
            {index + 1} / {images.length}
          </span>
        </div>

        {/* Main Image Container */}
        <div className="relative w-full max-h-[70vh] flex items-center justify-center">
          {/* Prev Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-0 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer -ml-2 sm:-ml-4"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Image */}
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/40"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
          >
            <img
              src={images[index]}
              alt={`Gallery image ${index + 1}`}
              referrerPolicy="no-referrer"
              className="w-full max-h-[65vh] object-contain transition-opacity duration-300"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-0 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer -mr-2 sm:-mr-4"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 max-w-full" style={{ scrollbarWidth: 'none' }}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setIndex(idx); }}
              className={`flex-none w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                idx === index
                  ? 'border-gold-400 shadow-lg shadow-gold-400/20 scale-105'
                  : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/40'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Hint */}
        <span className="text-[9px] font-mono text-white/30 mt-1">
          Use arrow keys to navigate &bull; Press ESC to close
        </span>
      </div>
    </div>
  );
}