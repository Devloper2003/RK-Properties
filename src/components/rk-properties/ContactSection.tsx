'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, CalendarRange, Send, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Project, Lead } from '@/types/rk-properties';
import { usePropertyStore } from '@/store/use-property-store';
import { useToast } from '@/components/rk-properties/ToastProvider';

interface ContactSectionProps {
  projects?: Project[];
  onAddLead: (lead: Omit<Lead, 'id' | 'date'>) => void;
}

const budgetOptions = [
  { label: '₹35L – ₹50L', value: '₹35L - ₹50L' },
  { label: '₹50L – ₹70L', value: '₹50L - ₹70L' },
  { label: '₹70L – ₹90L', value: '₹70L - ₹90L' },
  { label: '₹90L+', value: '₹90L+' },
];

export default function ContactSection({
  projects = [],
  onAddLead
}: ContactSectionProps) {
  const { selectedProjectForContact } = usePropertyStore();
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectInterest, setProjectInterest] = useState(selectedProjectForContact || projects[0]?.name || '');
  const [category, setCategory] = useState('NRI Investor');
  const [siteVisitDate, setSiteVisitDate] = useState('');
  const [notes, setNotes] = useState('');
  const [budget, setBudget] = useState('₹35L - ₹50L');
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (selectedProjectForContact) {
      setProjectInterest(selectedProjectForContact);
    }
  }, [selectedProjectForContact]);

  const validatePhone = (value: string): boolean => {
    const digitsOnly = value.replace(/\D/g, '');
    return digitsOnly.length >= 10;
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (value && !validatePhone(value)) {
      setPhoneError('Please enter a valid 10+ digit Indian mobile number');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid 10+ digit Indian mobile number');
      return;
    }

    onAddLead({
      name,
      email,
      phone,
      projectInterest,
      category,
      status: siteVisitDate ? 'Site Visit' : 'New',
      budget,
      notes: notes || "Direct website contact form inquiry.",
      siteVisitDate: siteVisitDate || undefined
    });

    // Show toast notification
    addToast({
      type: 'success',
      title: 'Tour Reservation Confirmed!',
      message: `Thank you, ${name}. Our concierge will contact you within 2 hours with a detailed itinerary.`,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setSiteVisitDate('');
      setNotes('');
      setBudget('₹35L - ₹50L');
    }, 2000);
  };

  return (
    <section
      id="contact-experience"
      data-animate
      className="relative group overflow-hidden bg-white rounded-3xl border border-gold-200/50 p-6 sm:p-10 shadow-lg select-none"
    >
      <div className="absolute inset-0 bg-radial from-gold-50/10 via-white to-white pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-gradient-to-t from-gold-300/10 to-transparent blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Left Side */}
        <div data-animate="fade-left" className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/60 border border-gold-200/30 text-gold-700 font-mono text-[10px] uppercase tracking-widest">
              <CalendarRange className="w-3 h-3 text-gold-600 animate-pulse" />
              Sovereign Site Tour Package
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif text-gold-800 tracking-tight leading-none font-medium">
              Schedule Your Guided <br />
              <span className="text-gold-600 italic">Vrindavan Darshan</span> Site-Tours
            </h3>

            <p className="text-xs text-gray-500 leading-relaxed max-w-sm font-light">
              We believe a property purchase in Vrindavan is a divine homecoming. RK Properties offers exclusive premium tour packages for NRI and elite domestic families to inspect the physical plots and immerse in the rich spiritual vibes.
            </p>
          </div>

          {/* VIP Perks Card */}
          <div className="bg-gold-50/60 border border-gold-200/40 p-5 rounded-2xl space-y-4 shadow-xs">
            <span className="text-[10px] font-mono text-gold-700 font-bold uppercase tracking-wider block">
              ✦ Included VIP Devotional Tour Plan
            </span>

            <div className="space-y-3 text-xs text-gray-600 font-light">
              <div className="flex gap-2.5 items-start">
                <span className="p-1 rounded-md bg-white text-gold-600 font-bold">✓</span>
                <p><strong>Complimentary Delhi-NCR pick-up:</strong> Chauffeur-driven premium SUVs from IGI Airport or your residence straight to Vrindavan.</p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="p-1 rounded-md bg-white text-gold-600 font-bold">✓</span>
                <p><strong>Guided Mandir Darshans:</strong> Private access guidance to elite temples including Sri Bankey Bihari, Prem Mandir and Nidhivan.</p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="p-1 rounded-md bg-white text-gold-600 font-bold">✓</span>
                <p><strong>Corporate Legal advisory:</strong> Direct consultation table with our certified real estate lawyers with 100% title transparency.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-gold-200/20 text-xs font-mono text-gray-500 justify-between items-start">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold-600" />
              <span>Sovereign Desk: +91 91152 77000</span>
            </div>
            <div className="flex items-center gap-2 font-light">
              <Mail className="w-4 h-4 text-gold-600" />
              <span>listings@rkproperties.in</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div data-animate="fade-right" className="lg:col-span-7 bg-gold-50/60 border border-gold-200/30 p-6 sm:p-8 rounded-3xl shadow-xs">
          {submitted ? (
            <div className="py-20 text-center space-y-4 animate-fade-in">
              <span className="inline-flex p-4 rounded-full bg-green-100 text-green-700 border border-green-200 animate-pulse mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </span>
              <h4 className="font-serif text-2xl font-bold text-gray-900">Spiritual Tour Reservation Received!</h4>
              <p className="text-xs text-gold-600 font-mono uppercase tracking-wider">Verification Code: RKP-VIP-{Math.floor(Math.random() * 90000 + 10000)}</p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-gray-900">{name}</strong>. Our custom real estate concierges are preparing your detailed portfolio. Lead logs compiled instantly to the Enterprise Dashboard page.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 rounded-xl border border-gold-200 text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Mobile Contact Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="e.g. +91 99000 88000"
                      className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:ring-gold-500 bg-white ${phoneError ? 'border-red-400 focus:ring-red-400' : 'border-gold-200'}`}
                    />
                    {phoneError && (
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-red-500 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {phoneError}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. contact@wealthy.com"
                    className="w-full px-4 py-3 rounded-xl border border-gold-200 text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Buyer Persona Classification</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-gold-200 text-xs focus:ring-1 focus:ring-gold-500 bg-white"
                  >
                    <option value="NRI Investor">NRI (Non-Resident Indian)</option>
                    <option value="Executive Business Owner">Corporate Business Leader</option>
                    <option value="Retired Senior Devotee">Retired Senior Devotee</option>
                    <option value="High-Caliber Professional">Doctor / Specialist Advisor</option>
                    <option value="Dharmic Pilgrim Guest">Dharmic Pilgrim Guest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Asset Target Interest</label>
                  <select
                    value={projectInterest}
                    onChange={(e) => setProjectInterest(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-gold-200 text-xs focus:ring-1 focus:ring-gold-500 bg-white font-serif font-medium"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.name}>{p.name} (₹{p.priceVal.toLocaleString()}/Yd)</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block flex justify-between">
                    <span>Preferred site visit date</span>
                    <span className="text-gold-600 font-bold lowercase italic">(optional)</span>
                  </label>
                  <input
                    type="date"
                    value={siteVisitDate}
                    onChange={(e) => setSiteVisitDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gold-200 text-xs focus:ring-1 focus:ring-gold-500 bg-white font-mono"
                  />
                </div>
              </div>

              {/* Budget Range Selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Investment Budget Range</label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBudget(opt.value)}
                      className={`px-3 py-2 rounded-lg text-[11px] font-mono border cursor-pointer transition-all duration-200 ${
                        budget === opt.value
                          ? 'bg-gold-600 text-white border-gold-600 shadow-sm'
                          : 'bg-white text-gray-600 border-gold-200 hover:border-gold-400 hover:bg-gold-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Special Directives / Questions</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about specific legal approvals, registration questions, or timezone callbacks..."
                  className="w-full px-4 py-3 border border-gold-200 rounded-xl text-xs focus:ring-1 focus:ring-gold-500 bg-white h-16 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!!phoneError}
                className="submit-glow w-full py-4 bg-gold-600 hover:bg-gold-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-mono text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Send className="w-3.5 h-3.5" />
                Reserve Guided Visit & Pick-up
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-gray-400 text-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
                <span>Zero spam guarantee. Your details are secured under double encryption frameworks.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}