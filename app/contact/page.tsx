import Link from 'next/link';
import QuoteForm from '@/components/QuoteForm';
import Image from 'next/image';

export const metadata = {
  title: "Contact Us | Village Plumbers NZ",
  description: "Contact Village Plumbers NZ for emergency plumbing, gasfitting & drainlaying. Call 0800 845 524 for 24/7 service.",
  alternates: {
    canonical: 'https://villageplumbers.co.nz/contact',
  },
  openGraph: {
    title: "Contact Us | Village Plumbers NZ",
    description: "Contact Village Plumbers NZ for emergency plumbing, gasfitting & drainlaying.",
    url: 'https://villageplumbers.co.nz/contact',
  }
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      
      {/* Hero */}
      <section className="relative bg-slate-950 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/media__1783510889843.jpg" 
            alt="Contact Us" 
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-wider mb-4 block">
            VILLAGE PLUMBERS NEW ZEALAND
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Need emergency plumbing or a free quote? Connect with available local trade specialists serving your area 24/7.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-slate-100 border-b border-slate-200 py-3.5 px-4 text-xs font-semibold text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-bold">Contact Us</span>
        </div>
      </div>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl shrink-0">
                    📞
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">24/7 Phone Dispatch</h3>
                    <a href="tel:0800845524" className="text-emerald-600 font-black text-lg hover:underline">
                      0800 845 524
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Email Inquiries</h3>
                    <a href="mailto:contact@villageplumbers.co.nz" className="text-slate-600 text-sm hover:underline">
                      contact@villageplumbers.co.nz
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Coverage Area</h3>
                    <p className="text-slate-600 text-sm">All 16 Regions & 256 Suburbs across New Zealand</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <QuoteForm buttonText="Send Inquiry →" />
          </div>

        </div>
      </section>

    </div>
  );
}
