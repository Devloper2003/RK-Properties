'use client';

import { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import { useToast } from '@/components/rk-properties/ToastProvider';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({ type: 'error', title: 'Invalid Email', message: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        addToast({ type: 'success', title: 'Subscribed!', message: 'You will receive updates on new MVDA-approved listings and pre-launch pricing.' });
        setEmail('');
      } else {
        addToast({ type: 'error', title: 'Subscription Failed', message: data.error || 'Please try again.' });
      }
    } catch {
      addToast({ type: 'error', title: 'Network Error', message: 'Could not connect. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <Mail className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold">Newsletter</span>
          </div>
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            Stay updated on new MVDA-approved listings and exclusive pre-launch pricing
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full sm:w-auto gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl bg-gold-700/30 border border-gold-600/30 text-white placeholder:text-gray-500 text-xs focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-gold-900 rounded-xl text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-all disabled:opacity-50 flex items-center gap-1.5 shrink-0"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}