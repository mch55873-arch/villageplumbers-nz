import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from 'next';
import nzDatabase from "../../../../data/nz_database.json";
import servicesData from "../../../../data/services.json";

function isServiceApplicableForRegion(service: any, region: any): boolean {
  if (service.isCore) return true;
  if (!service.targetTag || service.targetTag === 'all') return true;
  if (service.targetTag === 'cold_only' && region.isColdRegion) return true;
  if (service.targetTag === 'rural_only' && region.isRural) return true;
  if (service.targetTag === 'industrial_only' && region.isIndustrial) return true;
  return false;
}

export async function generateMetadata({ params }: { params: Promise<{ subdomain: string, service: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain.toLowerCase();
  
  const serviceData = servicesData.find(s => s.slug === resolvedParams.service);
  const serviceName = serviceData ? serviceData.name : resolvedParams.service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Region Subdomain
  const regionData = nzDatabase.regions.find(r => r.code === subdomain);
  if (regionData && serviceData && isServiceApplicableForRegion(serviceData, regionData)) {
    return {
      title: `${serviceName} in ${regionData.name} Region | Village Plumbers NZ`,
      description: `Connect with local plumbing specialists for ${serviceName} in ${regionData.name}. 24/7 connection line: 0800 845 524.`,
      alternates: { canonical: `https://${regionData.code}.villageplumbers.co.nz/${resolvedParams.service}` },
      openGraph: {
        title: `${serviceName} in ${regionData.name} Region | Village Plumbers NZ`,
        description: `Connect with local plumbing specialists for ${serviceName} in ${regionData.name}.`,
        url: `https://${regionData.code}.villageplumbers.co.nz/${resolvedParams.service}`,
      }
    };
  }

  // Suburb Subdomain
  for (const reg of nzDatabase.regions) {
    const cityData = reg.cities.find(c => c.subdomain === subdomain || c.slug === subdomain);
    if (cityData && serviceData && isServiceApplicableForRegion(serviceData, reg)) {
      return {
        title: `${serviceName} in ${cityData.name}, ${reg.name} (${cityData.zip}) | Village Plumbers`,
        description: `Connect with available independent trade professionals for ${serviceName} in ${cityData.name}, ${reg.name} (${cityData.zip}). Call 0800 845 524.`,
        alternates: { canonical: `https://${cityData.subdomain}.villageplumbers.co.nz/${resolvedParams.service}` },
        openGraph: {
          title: `${serviceName} in ${cityData.name}, ${reg.name} (${cityData.zip}) | Village Plumbers`,
          description: `Connect with available independent trade professionals for ${serviceName} in ${cityData.name}, ${reg.name} (${cityData.zip}).`,
          url: `https://${cityData.subdomain}.villageplumbers.co.nz/${resolvedParams.service}`,
        }
      };
    }
  }

  return {
    title: `${serviceName} in ${subdomain} | Village Plumbers NZ`,
    description: `Connect with local trade professionals for ${serviceName} in ${subdomain}, NZ.`
  };
}

export default async function SubdomainServicePage({ params }: { params: Promise<{ subdomain: string, service: string }> }) {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain.toLowerCase();

  const serviceData = servicesData.find(s => s.slug === resolvedParams.service);
  if (!serviceData) return notFound();

  const serviceName = serviceData.name;
  const serviceIcon = serviceData.icon || '💧';
  const serviceDesc = serviceData.description || `Connect with local trade professionals serving your area for ${serviceName}.`;

  // 1. Is it a Region Subdomain? (e.g. 'auckland')
  const regionData = nzDatabase.regions.find(r => r.code === subdomain);
  if (regionData) {
    if (!isServiceApplicableForRegion(serviceData, regionData)) return notFound();

    const coreServices = servicesData.filter(s => s.isCore && s.slug !== serviceData.slug);
    const specialistServices = servicesData.filter(s => !s.isCore && s.slug !== serviceData.slug && isServiceApplicableForRegion(s, regionData));

    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          
          <nav className="text-xs text-slate-500 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-sky-600">NZ Plumbing</Link>
            <span>/</span>
            <Link href={`/subdomain/${regionData.code}`} className="hover:text-sky-600">{regionData.name} Region Hub</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{serviceName}</span>
          </nav>

          {/* Hero Header */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
                <span>{serviceIcon}</span>
                <span>{regionData.name.toUpperCase()} REGIONAL HUB</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                {serviceName} in <span className="text-sky-400">{regionData.name} Region</span>
              </h1>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {serviceDesc} Connect with available independent trade professionals serving all {regionData.cities.length} suburbs in {regionData.name}.
              </p>

              <a href="tel:0800845524" className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-lg px-8 py-4 rounded-xl shadow-lg inline-block">
                📞 Call Connection Line: 0800 845 524
              </a>
            </div>
          </div>

          {/* Core Services Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Core Service Pages in {regionData.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {coreServices.map((srv) => (
                <Link
                  key={srv.slug}
                  href={`/subdomain/${regionData.code}/${srv.slug}`}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-sky-500 flex items-center gap-3 text-slate-900 hover:text-sky-600 font-bold text-sm"
                >
                  <span className="text-xl">{srv.icon}</span>
                  <span>{srv.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Relevant Specialist Pages */}
          {specialistServices.length > 0 && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Relevant Specialist Pages in {regionData.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {specialistServices.map((srv) => (
                  <Link
                    key={srv.slug}
                    href={`/subdomain/${regionData.code}/${srv.slug}`}
                    className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-sky-500 flex items-center gap-3 text-slate-900 hover:text-sky-600 font-bold text-sm"
                  >
                    <span className="text-xl">{srv.icon}</span>
                    <span>{srv.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Locations / Suburbs */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Nearby Suburbs & Locations in {regionData.name}
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

  // 2. Is it a Suburb Subdomain? (e.g. 'ponsonby-auckland')
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
    if (!isServiceApplicableForRegion(serviceData, parentRegion)) return notFound();

    const coreServices = servicesData.filter(s => s.isCore && s.slug !== serviceData.slug);
    const specialistServices = servicesData.filter(s => !s.isCore && s.slug !== serviceData.slug && isServiceApplicableForRegion(s, parentRegion));
    const nearbyLocations = parentRegion.cities.filter(c => c.subdomain !== foundCity?.subdomain);

    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Exact Architecture Breadcrumb */}
          <nav className="text-xs text-slate-500 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-sky-600">NZ Plumbing</Link>
            <span>/</span>
            <Link href={`/subdomain/${parentRegion.code}`} className="hover:text-sky-600">{parentRegion.name} Regional Hub</Link>
            <span>/</span>
            <Link href={`/subdomain/${foundCity.subdomain}`} className="hover:text-sky-600">{foundCity.name} Page</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{serviceName}</span>
          </nav>

          {/* Hero Header */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
                <span>{serviceIcon}</span>
                <span>CITY / TOWN PAGE - {foundCity.name.toUpperCase()} ({foundCity.zip})</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                {serviceName} in <span className="text-sky-400">{foundCity.name}</span>, {parentRegion.name}
              </h1>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {serviceDesc} Connect with available independent plumbing & drainlaying professionals serving {foundCity.name}, {parentRegion.name} ({foundCity.zip}).
              </p>

              <a href="tel:0800845524" className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-lg px-8 py-4 rounded-xl shadow-lg inline-block">
                📞 Connect Line: 0800 845 524
              </a>
            </div>
          </div>

          {/* Core Service Pages */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Core Service Pages in {foundCity.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {coreServices.map((srv) => (
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

          {/* Relevant Specialist Pages */}
          {specialistServices.length > 0 && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Relevant Specialist Pages in {foundCity.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {specialistServices.map((srv) => (
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
          )}

          {/* Nearby Locations (Matching Architecture Diagram!) */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>📍</span> Nearby Locations in {parentRegion.name}
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Also connecting {serviceName.toLowerCase()} professionals in neighboring suburbs:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {nearbyLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/subdomain/${loc.subdomain}/${resolvedParams.service}`}
                  className="bg-slate-50 p-3 rounded-xl border border-slate-200 hover:border-sky-500 text-slate-900 font-bold text-sm block hover:text-sky-600"
                >
                  {loc.name} {serviceName}
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
