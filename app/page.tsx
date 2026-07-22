import Link from 'next/link';
import Image from 'next/image';
import servicesData from '../data/services.json';
import nzDatabase from '../data/nz_database.json';
import articlesData from '../data/articles.json';

export const runtime = 'edge';

export const metadata = {
  title: "Village Plumbers NZ | Emergency Plumbing, Gasfitting & Drainlaying New Zealand",
  description: "Connect with available, independent, certificated local plumbing, gasfitting, and drainlaying professionals across New Zealand. Available 24/7 for burst pipes, blocked drains, and hot water repairs.",
  alternates: {
    canonical: 'https://villageplumbers.co.nz',
  },
  openGraph: {
    title: "Village Plumbers NZ | Emergency Plumbing, Gasfitting & Drainlaying New Zealand",
    description: "Connect with available, independent, certificated local plumbing, gasfitting, and drainlaying professionals across New Zealand.",
    url: 'https://villageplumbers.co.nz',
  }
};

export default function HomePage() {
  const coreServices = servicesData.filter((s: any) => s.isCore);
  const regions = nzDatabase.regions || [];
  const recentArticles = (articlesData || []).slice(0, 4);

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      
      {/* 1. HERO SECTION (With Right Form) */}
      <section className="relative min-h-[650px] flex items-center bg-slate-950 overflow-hidden py-16 px-4">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/media__1783510889843.jpg"
            alt="Emergency Plumbing New Zealand"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/65"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                24/7 Nationwide Plumbing & Drainlaying Network
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Emergency Plumbing, Gasfitting & Drainlaying <span className="text-emerald-400">New Zealand</span>
              </h1>

              <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
                Connect fast with available, independent, certificated local plumbing professionals serving your area. 24/7 emergency response for burst pipes, blocked drains, hot water cylinders, and gas leaks.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a 
                  href="tel:0800845524" 
                  className="inline-flex items-center gap-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 px-8 py-4 rounded-xl font-black text-lg transition-all shadow-lg shadow-emerald-400/20"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  0800 845 524
                </a>

                <a 
                  href="#contact-form" 
                  className="inline-flex items-center gap-2 bg-slate-800/90 hover:bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                >
                  Get Free Quote
                </a>
              </div>

              {/* Rating Badge */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 max-w-sm">
                <div className="flex text-amber-400 text-lg">
                  ★★★★★
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Rated 5.0 / 5.0 by NZ Homeowners</p>
                  <p className="text-slate-400 text-xs">Fast dispatch & transparent pricing</p>
                </div>
              </div>

            </div>

            {/* Right Lead Capture Form */}
            <div id="contact-form" className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
                <h2 className="text-2xl font-black text-slate-900 mb-1">Get Free Quote</h2>
                <p className="text-slate-500 text-sm mb-6">Fill out the form below to connect with local trade specialists.</p>

                <form className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Full Name *" 
                      required 
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div>
                    <input 
                      type="email" 
                      placeholder="Email Address *" 
                      required 
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number *" 
                      required 
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div>
                    <textarea 
                      rows={3} 
                      placeholder="How can we help you? (e.g. Burst Pipe, Blocked Drain) *" 
                      required 
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm resize-none"
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      required 
                      className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed cursor-pointer">
                      I acknowledge and agree to be connected with available independent certificated plumbing professionals serving my area under PGDB rules.
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black py-4 rounded-xl text-base transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Get Free Quote →
                  </button>
                </form>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-around text-xs text-slate-600 font-bold">
                  <span className="flex items-center gap-1 text-emerald-600">🛡️ Licensed</span>
                  <span className="flex items-center gap-1 text-emerald-600">🔒 Insured</span>
                  <span className="flex items-center gap-1 text-emerald-600">⚡ 24/7 Emergency Service</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-slate-900 text-white border-y border-slate-800 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-black text-emerald-400">20+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Years Network Experience</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-emerald-400">10,000+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Jobs Completed</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-emerald-400">5.0★</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Customer Rated</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-emerald-400">30 Min</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Fast Emergency Dispatch</div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SPECIALISTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <Image 
                src="/images/plumber_hands.jpg"
                alt="Certificated NZ Plumbers"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="text-emerald-600 font-extrabold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              About Village Plumbers NZ
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-6">
              Your Trusted Plumbing & Drainlaying Network in New Zealand
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-base">
              Village Plumbers connects New Zealand homeowners, landlords, and commercial property managers with registered, certificated plumbing, gasfitting, and drainlaying professionals.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6 text-base">
              Whether you are dealing with a midnight burst pipe, a stubborn main drain blockage, or installing a high-efficiency heat pump water heater, our network ensures rapid dispatch and transparent pricing.
            </p>

            <ul className="space-y-3 mb-8 text-sm font-semibold text-slate-800">
              <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Registered under NZ Plumbers, Gasfitters & Drainlayers Board (PGDB) rules</li>
              <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Upfront fixed quotes before work commences</li>
              <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Full coverage across 16 Regions and 256 NZ Suburbs</li>
            </ul>

            <Link href="/about" className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-8 py-3.5 rounded-xl transition-all shadow-md">
              Learn More About Us →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. OUR CORE SERVICES GRID */}
      <section id="core-services" className="bg-slate-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 font-extrabold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Core Trade Services
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
              Our Core Plumbing & Drainlaying Services in New Zealand
            </h2>
            <p className="text-slate-600 text-base">
              High-demand services available 24/7 across all major cities and suburbs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {coreServices.slice(0, 6).map((service: any) => (
              <div 
                key={service.slug}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-2xl mb-6">
                    💧
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    <Link href={`/${service.slug}`} className="hover:text-emerald-600 transition-colors">
                      {service.name}
                    </Link>
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <Link 
                  href={`/${service.slug}`}
                  className="inline-flex items-center gap-1 text-emerald-600 font-bold text-sm hover:gap-2 transition-all"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>

          {/* Sub-services Badges */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-8 flex flex-wrap gap-2 justify-center">
            {coreServices.slice(6).map((service: any) => (
              <Link 
                key={service.slug}
                href={`/${service.slug}`}
                className="text-xs bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 font-semibold px-3 py-1.5 rounded-lg transition-all"
              >
                ✓ {service.name}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/#core-services" 
              className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-8 py-4 rounded-xl text-base transition-all shadow-md"
            >
              View All 25 Core Services →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <span className="text-emerald-600 font-extrabold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-8">
              Why Choose Village Plumbers New Zealand?
            </h2>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4 items-start bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl shrink-0">
                  ⚡
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Fast 24/7 Response</h3>
                  <p className="text-slate-600 text-sm">Emergency dispatch for burst pipes, sewage backups, and gas leaks at any hour.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl shrink-0">
                  📜
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">PGDB Certificated Professionals</h3>
                  <p className="text-slate-600 text-sm">Connecting you with licensed, independent trade specialists for guaranteed compliance.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl shrink-0">
                  💵
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Upfront Transparent Pricing</h3>
                  <p className="text-slate-600 text-sm">Clear cost breakdown before work starts so there are no unexpected bills.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <Image 
                src="/images/media__1784480302622.jpg"
                alt="Emergency Plumber Repair Work"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS / REVIEWS SECTION */}
      <section className="bg-slate-950 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-400/20">
              Customer Feedback
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4">
              What New Zealand Residents Say About Us
            </h2>
            <p className="text-slate-400 text-base">Real experiences from homeowners across Auckland, Wellington, Canterbury & Waikato.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
              <div className="flex text-amber-400 text-lg mb-4">★★★★★</div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "A pipe burst under our kitchen floor at 2am. Village Plumbers connected us with a local plumber who arrived within 35 minutes!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 font-bold flex items-center justify-center text-sm">
                  MD
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Mark Davis</h4>
                  <p className="text-xs text-slate-400">Ponsonby, Auckland</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
              <div className="flex text-amber-400 text-lg mb-4">★★★★★</div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "Our hot water cylinder stopped heating on a cold winter weekend. The technician replaced the thermostat quickly with zero fuss."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 font-bold flex items-center justify-center text-sm">
                  SK
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Sarah Jenkins</h4>
                  <p className="text-xs text-slate-400">Merivale, Christchurch</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
              <div className="flex text-amber-400 text-lg mb-4">★★★★★</div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "Extremely professional drain unblocking service. They used a CCTV camera to show us the tree roots inside the sewer line."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 font-bold flex items-center justify-center text-sm">
                  TW
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Tom Williams</h4>
                  <p className="text-xs text-slate-400">Karori, Wellington</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION WITH IMAGE */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <span className="text-emerald-600 font-extrabold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-8">
              New Zealand Plumbing FAQs
            </h2>

            <div className="space-y-4">
              <details className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group">
                <summary className="font-bold text-slate-900 cursor-pointer flex justify-between items-center text-base">
                  What should I do immediately after a pipe bursts?
                  <span className="text-emerald-500 font-extrabold group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  Turn off your main water valve (Toby) at the street boundary immediately, isolate your main switchboard if water is near electrical fittings, and call our 24/7 line at 0800 845 524.
                </p>
              </details>

              <details className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group">
                <summary className="font-bold text-slate-900 cursor-pointer flex justify-between items-center text-base">
                  How fast can a local plumber arrive?
                  <span className="text-emerald-500 font-extrabold group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  For emergency dispatches (burst pipes, gas leaks, sewage backups), available local trade specialists aim to arrive within 30 to 60 minutes.
                </p>
              </details>

              <details className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group">
                <summary className="font-bold text-slate-900 cursor-pointer flex justify-between items-center text-base">
                  Are connected plumbers PGDB certificated?
                  <span className="text-emerald-500 font-extrabold group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  Yes. All connected tradespeople carry official registrations with the Plumbers, Gasfitters and Drainlayers Board (PGDB) for complete compliance.
                </p>
              </details>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[420px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <Image 
                src="/images/media__1784480302623.jpg"
                alt="24/7 Emergency Plumbing Dispatch"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 8. AREAS WE SERVE REGIONS GRID */}
      <section className="bg-slate-950 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-400/20">
            Nationwide Coverage
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4">
            Plumbing Services Across New Zealand & Surrounding Suburbs
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto mb-12">
            Select your region below to browse local suburb pages and available trade specialists.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {regions.map((reg: any) => (
              <Link 
                key={reg.slug}
                href={`/subdomain/${reg.slug}`}
                className="bg-slate-900 hover:bg-emerald-400 hover:text-slate-950 border border-slate-800 p-4 rounded-xl font-bold text-sm transition-all text-center"
              >
                📍 {reg.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BLOG ARTICLES CARDS */}
      {recentArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 font-extrabold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Knowledge Base
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
              Plumbing & Maintenance Tips & Resources
            </h2>
            <p className="text-slate-600 text-base">Expert advice written for New Zealand homeowners and landlords.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {recentArticles.map((art: any, idx: number) => (
              <article key={art.slug || `art-${idx}`} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <h3 className="font-bold text-slate-900 mt-3 mb-2 text-base line-clamp-2 hover:text-emerald-600">
                    <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-3 mb-4 leading-relaxed">{art.excerpt}</p>
                </div>
                <Link href={`/blog/${art.slug}`} className="text-emerald-600 font-bold text-xs hover:underline">
                  Read Article →
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all">
              View All 24 Articles →
            </Link>
          </div>
        </section>
      )}

      {/* 10. BOTTOM EMERGENCY CTA BANNER */}
      <section className="bg-emerald-400 text-slate-950 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-1">Need Emergency Plumbing Assistance Right Now?</h2>
            <p className="text-slate-900 font-medium text-sm">Call 0800 845 524 for immediate dispatch across all NZ regions.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <a href="tel:0800845524" className="bg-slate-950 hover:bg-slate-900 text-white font-black px-8 py-4 rounded-xl text-base transition-all shadow-lg">
              📞 Call 0800 845 524
            </a>
            <a href="#contact-form" className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-4 rounded-xl text-base transition-all">
              Get Free Quote
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
