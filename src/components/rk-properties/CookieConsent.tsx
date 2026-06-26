'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, X, Cookie } from 'lucide-react';

const STORAGE_KEY = 'rk_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      // Show after a short delay for a smooth entrance
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'all');
    setDismissed(true);
    setTimeout(() => setVisible(false), 400);
  };

  const handleEssential = () => {
    localStorage.setItem(STORAGE_KEY, 'essential');
    setDismissed(true);
    setTimeout(() => setVisible(false), 400);
  };

  const handleDismiss = () => {
    setDismissed(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-30 transition-all duration-500 ${
        dismissed ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 pb-6 pt-2">
        <div className="glass rounded-2xl border border-gold-200/50 shadow-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Icon */}
          <div className="flex-none p-2.5 rounded-xl bg-gold-100 text-gold-700 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-serif font-bold text-gray-900 text-sm mb-0.5">
              Your Privacy Matters to Us
            </h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-light">
              We use cookies to enhance your browsing experience and analyze site traffic.
              By continuing, you agree to our privacy practices. No personal data is shared with third parties.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 shrink-0 sm:flex-col sm:gap-2">
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-gold-800 hover:bg-gold-600 text-white text-[10px] font-mono uppercase font-bold tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Accept All
            </button>
            <button
              onClick={handleEssential}
              className="px-3 py-2 text-gray-500 hover:text-gray-700 text-[10px] font-mono uppercase tracking-wider hover:bg-gray-50 rounded-lg transition-all cursor-pointer whitespace-nowrap"
            >
              Essential Only
            </button>
          </div>

          {/* Close */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 rounded-full text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer sm:static sm:p-0 sm:text-gray-400"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}