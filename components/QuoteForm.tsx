'use client';

import React, { useState } from 'react';

interface QuoteFormProps {
  defaultLocation?: string;
  defaultService?: string;
  buttonText?: string;
  className?: string;
}

export default function QuoteForm({
  defaultLocation = '',
  defaultService = '',
  buttonText = 'Request Instant Dispatch →',
  className = '',
}: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    location: defaultLocation,
    service: defaultService,
    consent: true,
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          location: formData.location || defaultLocation || 'New Zealand',
          service: formData.service || defaultService || 'General Plumbing',
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setSuccessMessage(data.message || 'Thank you! Your quote request has been received.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          location: defaultLocation,
          service: defaultService,
          consent: true,
          honeypot: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit quote request. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Network error occurred. Please call 0800 845 524 directly.');
    }
  };

  return (
    <div id="quote-form" className={`bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl text-white shadow-2xl ${className}`}>
      <h3 className="text-xl font-black mb-2 text-white flex items-center gap-2">
        <span>⚡</span> Get Free Emergency Quote
      </h3>
      <p className="text-slate-400 text-xs mb-6">
        No callout fee on approved work. Average dispatch time: 30 minutes.
      </p>

      {status === 'success' ? (
        <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 p-6 rounded-2xl text-center space-y-3">
          <div className="text-3xl">✅</div>
          <h4 className="font-bold text-lg text-emerald-400">Request Sent!</h4>
          <p className="text-xs text-emerald-300">{successMessage}</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all"
          >
            Send Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field for anti-spam */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {status === 'error' && (
            <div className="bg-red-950/80 border border-red-500/50 text-red-200 p-4 rounded-xl text-xs">
              ⚠️ {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Smith"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="021 123 4567"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.co.nz"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Suburb or City"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Trade Service</label>
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                placeholder="Emergency Plumbing, Gas, Drains"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Describe Issue (Optional)</label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. Burst water pipe in kitchen, water turned off at main valve..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all"
            ></textarea>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-0.5 rounded border-slate-700 text-emerald-400 focus:ring-emerald-400"
            />
            <label htmlFor="consent" className="text-[11px] text-slate-400 leading-tight">
              I consent to being contacted by an independent certificated local trade practitioner under PGDB rules.
            </label>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-emerald-400 hover:bg-emerald-300 disabled:bg-slate-700 text-slate-950 font-black py-4 rounded-xl text-base transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Request...
              </>
            ) : (
              buttonText
            )}
          </button>
        </form>
      )}
    </div>
  );
}
