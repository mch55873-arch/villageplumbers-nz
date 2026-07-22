import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from 'next';
import nzDatabase from "../../../../data/nz_database.json";
import servicesData from "../../../../data/services.json";

export async function generateMetadata({ params }: { params: Promise<{ subdomain: string, service: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain.toLowerCase();
  
  const serviceData = servicesData.find(s => s.slug === resolvedParams.service);
  const serviceName = serviceData ? serviceData.name : resolvedParams.service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Region Subdomain (e.g. 'auckland')
  const regionData = nzDatabase.regions.find(r => r.code === subdomain);
  if (regionData) {
    return {
      title: `${serviceName} in ${regionData.name} Region | Village Plumbers NZ`,
      description: `Need ${serviceName} in ${regionData.name}? Certified 24/7 plumbers & drainlayers available across all suburbs in ${regionData.name}. Call 0800 845 524.`,
      alternates: { canonical: `https://${regionData.code}.villageplumbers.co.nz/${resolvedParams.service}` },
      openGraph: {
        title: `${serviceName} in ${regionData.name} Region | Village Plumbers NZ`,
        description: `Need ${serviceName} in ${regionData.name}? Certified 24/7 plumbers & drainlayers available across all suburbs in ${regionData.name}.`,
        url: `https://${regionData.code}.villageplumbers.co.nz/${resolvedParams.service}`,
      }
    };
  }

  // Suburb Subdomain (e.g. 'ponsonby-auckland' or 'ponsonby')
  for (const reg of nzDatabase.regions) {
    const cityData = reg.cities.find(c => c.subdomain === subdomain || c.slug === subdomain);
    if (cityData) {
      return {
        title: `${serviceName} in ${cityData.name}, ${reg.name} (${cityData.zip}) | Village Plumbers`,
        description: `24/7 ${serviceName} experts in ${cityData.name}, ${reg.name} (${cityData.zip}). Fast response local certificated plumbers. Call 0800 845 524.`,
        alternates: { canonical: `https://${cityData.subdomain}.villageplumbers.co.nz/${resolvedParams.service}` },
        openGraph: {
          title: `${serviceName} in ${cityData.name}, ${reg.name} (${cityData.zip}) | Village Plumbers`,
          description: `24/7 ${serviceName} experts in ${cityData.name}, ${reg.name} (${cityData.zip}). Fast response local certificated plumbers.`,
          url: `https://${cityData.subdomain}.villageplumbers.co.nz/${resolvedParams.service}`,
        }
      };
    }
  }

  return {
    title: `${serviceName} in ${subdomain} | Village Plumbers NZ`,
    description: `24/7 Emergency ${serviceName} service in ${subdomain}, NZ.`
  };
}

export default async function SubdomainServicePage({ params }: { params: Promise<{ subdomain: string, service: string }> }) {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain.toLowerCase();

  const serviceData = servicesData.find(s => s.slug === resolvedParams.service);
  const serviceName = serviceData ? serviceData.name : resolvedParams.service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const serviceIcon = serviceData?.icon || '💧';
  const serviceDesc = serviceData?.description || `Professional ${serviceName} service delivered by certificated local plumbers.`;

  // 1. Is it a Region Subdomain?
  const regionData = nzDatabase.regions.find(r => r.code === subdomain);
  if (regionData) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          
          <nav className="text-xs text-slate-500 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-sky-600">Home</Link>
            <span>/</span>
            <Link href={`/subdomain/${regionData.code}`} className="hover:text-sky-600">{regionData.name}</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{serviceName}</span>
          </nav>

          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
                <span>{serviceIcon}</span>
                <span>{regionData.name.toUpperCase()} REGIONAL SERVICE</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                {serviceName} in <span className="text-sky-400">{regionData.name} Region</span>
              </h1>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {serviceDesc} Serving all {regionData.cities.length} suburbs in {regionData.name} with 24/7 emergency dispatch.
              </p>

              <a href="tel:0800845524" className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-lg px-8 py-4 rounded-xl shadow-lg inline-block">
                📞 Call {regionData.name} Line: 0800 845 524
              </a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Suburbs Covered for {serviceName} in {regionData.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {regionData.cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/subdomain/${city.subdomain}/${resolvedParams.service}`}
                  className="bg-slate-50 p-3 rounded-xl border border-slate-200 hover:border-sky-500 text-slate-900 font-bold text-sm block hover:text-sky-600"
                >
                  {city.name} {serviceName}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 2. Is it a Suburb Subdomain?
  let foundCity = null;
  let parentRegion = null;

  for (const reg of nzDatabase.regions) {
    const city = reg.cities.find(c => c.subdomain === subdomain || c.slug === subdomain);
    if (city) {
      foundCity = city;
      parentRegion = reg;
      break;
    }
  }

  if (foundCity && parentRegion) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          
          <nav className="text-xs text-slate-500 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-sky-600">Home</Link>
            <span>/</span>
            <Link href={`/subdomain/${foundCity.subdomain}`} className="hover:text-sky-600">{foundCity.name}</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{serviceName}</span>
          </nav>

          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
                <span>{serviceIcon}</span>
                <span>LOCAL {foundCity.name.toUpperCase()} ({foundCity.zip}) SPECIALIST</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                {serviceName} in <span className="text-sky-400">{foundCity.name}</span>, {parentRegion.name}
              </h1>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {serviceDesc} Certificated local plumbers stationed in {foundCity.name}, {parentRegion.name} ({foundCity.zip}) ready for immediate response.
              </p>

              <a href="tel:0800845524" className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-lg px-8 py-4 rounded-xl shadow-lg inline-block">
                📞 Call {foundCity.name} Plumber: 0800 845 524
              </a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Other Plumbers & Services in {foundCity.name} ({parentRegion.name})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {servicesData.slice(0, 12).map((srv) => (
                <Link
                  key={srv.slug}
                  href={`/subdomain/${foundCity?.subdomain}/${srv.slug}`}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-sky-500 flex items-center gap-3 text-slate-900 hover:text-sky-600 font-bold text-sm"
                >
                  <span className="text-xl">{srv.icon}</span>
                  <span>{srv.name} in {foundCity?.name}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return notFound();
}
