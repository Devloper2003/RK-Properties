'use client';

import { usePropertyStore } from '@/store/use-property-store';

export default function Footer() {
  const { scrollToId, setIsBlueprintOpen } = usePropertyStore();

  return (
    <footer className="bg-gradient-to-br from-gold-800 via-gold-900 to-gold-900 text-gold-100/80 pt-16 pb-12 select-none border-t border-gold-600/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-gold-700/30 pb-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xl font-serif font-bold text-white tracking-tight">RK PROPERTIES</span>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              A majestic synthesis of absolute title security, professional real estate consulting services, and sacred living opportunities in Vrindavan Dham. Built on three core pillars: Trust, Transparency, and Value.
            </p>
            <div className="text-[10px] font-mono text-gold-400">
              <span>RERA ID: UPRERAAGT11245 (Approved Uttar Pradesh State Category)</span>
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs uppercase tracking-wider">
            <span className="text-white block font-bold mb-1">Dham Assets</span>
            <button onClick={() => scrollToId('project-showcase-section')} className="block text-gray-400 hover:text-white cursor-pointer text-left">Gated Townships</button>
            <button onClick={() => scrollToId('project-showcase-section')} className="block text-gray-400 hover:text-white cursor-pointer text-left">Residential Plots</button>
            <button onClick={() => scrollToId('project-showcase-section')} className="block text-gray-400 hover:text-white cursor-pointer text-left">Investment Meadow</button>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs uppercase tracking-wider">
            <span className="text-white block font-bold mb-1">Verify Compliance</span>
            <button onClick={() => setIsBlueprintOpen(true)} className="block text-gray-400 hover:text-white cursor-pointer text-left">Consumer Moat</button>
            <button onClick={() => scrollToId('faq-section-anchor')} className="block text-gray-400 hover:text-white cursor-pointer text-left">Legal FAQ Registry</button>
            <button onClick={() => scrollToId('contact-experience')} className="block text-gray-400 hover:text-white cursor-pointer text-left">Book Site Visit</button>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-3 text-xs leading-relaxed text-gray-400">
            <span className="text-white font-mono uppercase tracking-wider font-bold block mb-1">Corporate Headquarters</span>
            <p>Chhatikara-Vrindavan Link Road, directly near Prem Mandir Perimeter gate, Vrindavan, Mathura District, Uttar Pradesh - 281121</p>
            <p className="font-mono text-[11px] text-white">Representative Desk: listing.services@rkproperties.in</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-gray-500 gap-4">
          <span className="text-center sm:text-left">&copy; 2026 RK Properties Ltd. All rights reserved globally. RERA agent compliance assured.</span>
          <div className="flex gap-4">
            <span>DISCLAIMER: All land boundaries undergo statutory approvals. Historical ROI figures are for forecasting models only.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}