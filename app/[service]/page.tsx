import Link from 'next/link';
import type { Metadata } from 'next';
import servicesData from '../../data/services.json';
import nzDatabase from '../../data/nz_database.json';

export async function generateStaticParams() {
  return servicesData.map((service: any) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const foundService = servicesData.find(s => s.slug === resolvedParams.service);
  const serviceName = foundService ? foundService.name : resolvedParams.service
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${serviceName} NZ | Find Local Plumbing Specialists`,
    description: `Connect with available independent plumbing & drainlaying professionals for ${serviceName} across New Zealand. Call 0800 845 524.`,
    alternates: {
      canonical: `https://villageplumbers.co.nz/${resolvedParams.service}`,
    },
    openGraph: {
      title: `${serviceName} NZ | Find Local Plumbing Specialists`,
      description: `Connect with available independent plumbing & drainlaying professionals for ${serviceName} across New Zealand.`,
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
  const serviceDesc = foundService?.description || `Find local plumbing professionals serving your area for ${serviceName}.`;

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-emerald-600">Services</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{serviceName}</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950"></div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
              <span>{serviceIcon}</span>
              <span>LOCAL SERVICE REFERRAL NETWORK</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
              {serviceName} New Zealand
            </h1>

            <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
              {serviceDesc}
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="tel:0800845524" 
                className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-8 py-4 rounded-xl text-base transition-all shadow-lg"
              >
                📞 Call 0800 845 524
              </a>
              <Link 
                href="/contact" 
                className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-4 rounded-xl text-base transition-all"
              >
                Request Free Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Regions Coverage for this Service */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 mb-6">
            Available Regions for {serviceName}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {nzDatabase.regions.map((reg: any) => (
              <Link 
                key={reg.slug}
                href={`/subdomain/${reg.slug}/${resolvedParams.service}`}
                className="bg-slate-50 hover:bg-emerald-100 hover:text-emerald-900 p-4 rounded-xl font-bold text-xs transition-all text-center border border-slate-200"
              >
                📍 {reg.name} {serviceName}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
