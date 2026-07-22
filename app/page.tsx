import Link from 'next/link';
import nzDatabase from '../data/nz_database.json';
import servicesData from '../data/services.json';

export default function Home() {
  const totalSuburbs = nzDatabase.regions.reduce((acc, r) => acc + r.cities.length, 0);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-900 to-slate-950"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/30 text-sky-300 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-6">
              <span>🇳🇿</span>
              <span>NATIONWIDE NEW ZEALAND PLUMBING NETWORK</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Plumbing & Gasfitting</span> Services
            </h1>
            
            <p className="text-slate-300 text-lg md:text-xl font-light mb-8 leading-relaxed">
              Village Plumbers connects you with certified, certificated plumbers across all <strong className="text-white font-semibold">{nzDatabase.regions.length} NZ Regions</strong> and <strong className="text-white font-semibold">{totalSuburbs} Suburbs</strong>. Fast 24/7 emergency response for burst pipes, unblocking drains, and hot water cylinder repairs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:0800845524" className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl shadow-sky-600/30 transition-all hover:-translate-y-0.5">
                📞 Call 0800 845 524
              </a>
              <a href="#services" className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-lg px-8 py-4 rounded-xl transition-all">
                Browse 65 Services
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-12 pt-8 border-t border-slate-800">
              <div>
                <div className="text-2xl md:text-3xl font-black text-sky-400">16</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">NZ Regions</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-sky-400">256</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Suburbs Covered</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-sky-400">65</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Specialist Services</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 65 Plumbing Services Section */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-sky-600 text-sm font-black uppercase tracking-widest mb-2">Our Solutions</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            65 Comprehensive Plumbing & Gasfitting Services
          </h2>
          <p className="text-slate-600 mt-3">
            From emergency repairs to green energy heat pump cylinder installations, our certificated plumbers handle all domestic and commercial requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-500/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2 bg-sky-50 rounded-xl">{service.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                  {service.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
                <span>View Service Details</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 16 NZ Regions & Suburbs Directory Section */}
      <section id="regions" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-sky-400 text-sm font-black uppercase tracking-widest mb-2">Nationwide Coverage</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              16 New Zealand Regions & 256 Suburbs
            </h2>
            <p className="text-slate-400 mt-3">
              Select your region or suburb to find available certificated plumbers in your immediate local area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nzDatabase.regions.map((region) => (
              <div key={region.code} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60">
                <h3 className="text-xl font-bold text-sky-400 mb-4 pb-2 border-b border-slate-700 flex items-center justify-between">
                  <span>{region.name}</span>
                  <span className="text-xs bg-sky-950 text-sky-300 font-semibold px-2 py-0.5 rounded border border-sky-800">
                    {region.cities.length} Suburbs
                  </span>
                </h3>
                
                <ul className="space-y-1.5">
                  {region.cities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/subdomain/${city.slug}`}
                        className="text-slate-300 hover:text-white text-sm flex items-center justify-between py-1 px-2 rounded hover:bg-slate-700/50 transition-colors"
                      >
                        <span>{city.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{city.zip}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA Banner */}
      <section className="bg-sky-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center md:flex md:items-center md:justify-between">
          <div className="mb-6 md:mb-0 text-left">
            <h3 className="text-2xl md:text-3xl font-extrabold">Need Emergency Plumbing in New Zealand Right Now?</h3>
            <p className="text-sky-100 mt-1">Burst pipe, blocked toilet, or no hot water? We are on call 24 hours a day, 7 days a week.</p>
          </div>
          <a
            href="tel:0800845524"
            className="inline-block bg-white text-sky-900 hover:bg-slate-100 font-extrabold text-lg px-8 py-4 rounded-xl shadow-xl transition-all"
          >
            📞 0800 845 524
          </a>
        </div>
      </section>
    </div>
  );
}
