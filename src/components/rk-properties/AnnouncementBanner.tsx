'use client';

export default function AnnouncementBanner() {
  const text = '✦ 100% MVDA APPROVED • ZERO LITIGATION GUARANTEE • ₹450Cr+ ASSETS TRANSACTED • 1,200+ NRI CLIENTS TRUSTED • FREE DELHI-NCR PICK-UP ✦ 100% MVDA APPROVED • ZERO LITIGATION GUARANTEE • ₹450Cr+ ASSETS TRANSACTED • 1,200+ NRI CLIENTS TRUSTED • FREE DELHI-NCR PICK-UP ✦';

  return (
    <div className="fixed top-0 inset-x-0 z-50 h-9 bg-gradient-to-r from-gold-800 via-gold-900 to-gold-800 overflow-hidden select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center h-full">
        <span className="text-[10px] font-mono text-white/90 uppercase tracking-[0.2em] font-semibold inline-block">
          {text}
        </span>
      </div>
    </div>
  );
}
