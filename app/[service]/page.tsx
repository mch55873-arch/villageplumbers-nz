import Link from 'next/link';
import type { Metadata } from 'next';
import servicesData from '../../data/services.json';
import nzDatabase from '../../data/nz_database.json';

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const foundService = servicesData.find(s => s.slug === resolvedParams.service);
  const serviceName = foundService ? foundService.name : resolvedParams.service
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${serviceName} NZ | Village Plumbers 24/7 Service`,
    description: `Professional ${serviceName} across New Zealand. Licensed & certificated NZ plumbers available 24/7 in all 16 regions. Call 0800 845 524.`,
    alternates: {
      canonical: `https://villageplumbers.co.nz/${resolvedParams.service}`,
    },
    openGraph: {
      title: `${serviceName} NZ | Village Plumbers 24/7 Service`,
      description: `Professional ${serviceName} across New Zealand. Licensed & certificated NZ plumbers available 24/7 in all 16 regions.`,
      url: `https://villageplumbers.co.nz/${resolvedParams.service}`,
    }
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const foundService = servicesData.find(s => s.slug === resolvedParams.service);
  const serviceName = foundService ? foundService.name : resolvedParams.service
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const serviceIcon = foundService?.icon || '💧';
  const serviceDesc = foundService?.description || `Expert ${serviceName} service delivered across New Zealand by certified plumbers.`;

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          <Link href="/#services" className="hover:text-sky-600">Services</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{serviceName}</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950 via-slate-900 to-slate-950"></div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
              <span>{serviceIcon}</span>
              <span>24/7 CERTIFIED NEW ZEALAND SERVICE</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
              {serviceName} <span className="text-sky-400">in New Zealand</span>
            </h1>
            
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              {serviceDesc} Available around the clock across all 16 NZ regions with upfront pricing and 100% satisfaction guarantee.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="tel:0800845524" className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-base md:text-lg px-8 py-4 rounded-xl shadow-lg transition-all">
                📞 Call 0800 845 524
              </a>
              <Link href="/#regions" className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-base md:text-lg px-8 py-4 rounded-xl transition-all">
                Find Local Suburb Plumber
              </Link>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="font-extrabold text-slate-900 mb-1">Fast 24/7 Response</h3>
            <p className="text-slate-600 text-sm">Emergency dispatch across all 16 NZ regions anytime, day or night.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-3xl mb-3">📜</div>
            <h3 className="font-extrabold text-slate-900 mb-1">Certificated NZ Plumbers</h3>
            <p className="text-slate-600 text-sm">All work complies with NZ Building Code & PGDB standards.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-3xl mb-3">💵</div>
            <h3 className="font-extrabold text-slate-900 mb-1">Upfront Honest Pricing</h3>
            <p className="text-slate-600 text-sm">No hidden callout surprises. Clear quotes before work begins.</p>
          </div>
        </div>

        {/* Coverage Directory */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 mb-4">
            Available Regions for {serviceName}
          </h2>
          <p className="text-slate-600 text-sm mb-8">
            Click on any region or suburb below to connect with local certificated plumbers equipped for {serviceName.toLowerCase()}.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {nzDatabase.regions.map((region) => (
              <div key={region.code} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <div className="font-bold text-slate-900 text-sm mb-2">{region.name}</div>
                <div className="space-y-1">
                  {region.cities.slice(0, 4).map((city) => (
                    <Link
                      key={city.slug}
                      href={`/subdomain/${city.slug}/${resolvedParams.service}`}
                      className="block text-xs text-sky-600 hover:text-sky-800 hover:underline truncate"
                    >
                      {city.name} {serviceName}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
