import Link from 'next/link';
import nzDatabase from '../data/nz_database.json';
import servicesData from '../data/services.json';

export default function Home() {
  const totalSuburbs = nzDatabase.regions.reduce((acc, r) => acc + r.cities.length, 0);
  const coreServices = servicesData.filter(s => s.isCore);
  const specialistServices = servicesData.filter(s => !s.isCore);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-900 to-slate-950"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/30 text-sky-300 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-6">
              <span>🇳🇿</span>
              <span>NEW ZEALAND LOCAL PLUMBING REFERRAL NETWORK</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6">
              Find & Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Local Plumbing</span> Professionals
            </h1>
            
            <p className="text-slate-300 text-lg md:text-xl font-light mb-8 leading-relaxed">
              Village Plumbers connects customers with available, independent, certificated plumbing and drainlaying professionals serving all <strong className="text-white font-semibold">{nzDatabase.regions.length} NZ Regions</strong> and <strong className="text-white font-semibold">{totalSuburbs} Suburbs</strong>. Fast 24/7 assistance for emergency leaks, unblocking drains, and hot water repairs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:0800845524" className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl shadow-sky-600/30 transition-all hover:-translate-y-0.5">
                📞 Call Connection Hotline: 0800 845 524
              </a>
              <a href="#core-services" className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-lg px-8 py-4 rounded-xl transition-all">
                Browse 25 Core Services
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
                <div className="text-2xl md:text-3xl font-black text-sky-400">25</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Core Services</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 25 Core High-Intent Services Section */}
      <section id="core-services" className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-sky-600 text-sm font-black uppercase tracking-widest mb-2">Commercial Intent Backbone</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            25 Core Plumbing, Gasfitting & Drainlaying Services
          </h2>
          <p className="text-slate-600 mt-3">
            High-demand services available for connection across all New Zealand regions and suburbs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreServices.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-500/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2 bg-sky-50 rounded-xl">{service.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 px-2.5 py-1 rounded-full">
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
                <span>Find Local Specialists</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Specialist Location-Restricted Services Section */}
      <section className="py-16 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Targeted Solutions</div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Regional & Specialist Services
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Specialized services tailored for specific cold climate, rural, and industrial areas across New Zealand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialistServices.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-400 transition-all flex items-start gap-4"
              >
                <span className="text-3xl shrink-0">{service.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">{service.name}</h3>
                  <p className="text-slate-600 text-xs line-clamp-2">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 16 NZ Regions & Suburbs Directory Section */}
      <section id="regions" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-sky-400 text-sm font-black uppercase tracking-widest mb-2">Nationwide Network</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              16 New Zealand Regions & 256 Suburbs
            </h2>
            <p className="text-slate-400 mt-3">
              Select your region or suburb to find available local plumbing professionals serving your location.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nzDatabase.regions.map((region) => (
              <div key={region.code} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60">
                <h3 className="text-xl font-bold text-sky-400 mb-4 pb-2 border-b border-slate-700 flex items-center justify-between">
                  <Link href={`/subdomain/${region.code}`} className="hover:underline">{region.name}</Link>
                  <span className="text-xs bg-sky-950 text-sky-300 font-semibold px-2 py-0.5 rounded border border-sky-800">
                    {region.cities.length} Suburbs
                  </span>
                </h3>
                
                <ul className="space-y-1.5">
                  {region.cities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/subdomain/${city.subdomain}`}
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
            <h3 className="text-2xl md:text-3xl font-extrabold">Need Help Finding a Local Plumber Right Now?</h3>
            <p className="text-sky-100 mt-1">Connect with available independent plumbing professionals serving your area 24/7.</p>
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
