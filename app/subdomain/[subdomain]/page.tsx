import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import nzDatabase from '../../../data/nz_database.json';
import servicesData from '../../../data/services.json';

function isServiceApplicableForRegion(service: any, region: any): boolean {
  if (service.tier === 'core' || service.isCore) return true;
  if (service.tier === 'secondary' || service.targetTag === 'major_cities_only') {
    return !!region.isMajorCity;
  }
  if (service.tier === 'regional') {
    if (service.targetTag === 'cold_only') return !!region.isColdRegion;
    if (service.targetTag === 'rural_only') return !!region.isRural;
    if (service.targetTag === 'industrial_only') return !!region.isIndustrial;
    if (service.targetTag === 'specialist_only') return false; // No automatic nationwide pages
  }
  return false;
}

export async function generateMetadata({ params }: { params: Promise<{ subdomain: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain.toLowerCase();

  // Region Subdomain
  const regionData = nzDatabase.regions.find(r => r.code === subdomain);
  if (regionData) {
    return {
      title: `Find Plumbers in ${regionData.name} Region | Village Plumbers NZ`,
      description: `Connect with available independent plumbers & drainlayers in ${regionData.name}. 24/7 assistance across all suburbs. Call 0800 845 524.`,
      alternates: { canonical: `https://${regionData.code}.villageplumbers.co.nz/` },
      openGraph: {
        title: `Find Plumbers in ${regionData.name} Region | Village Plumbers NZ`,
        description: `Connect with available independent plumbers & drainlayers in ${regionData.name}. 24/7 assistance across all suburbs.`,
        url: `https://${regionData.code}.villageplumbers.co.nz/`,
      }
    };
  }

  // Suburb Subdomain
  for (const reg of nzDatabase.regions) {
    const cityData = reg.cities.find(c => c.subdomain === subdomain || c.slug === subdomain);
    if (cityData) {
      return {
        title: `Plumbing Services in ${cityData.name}, ${reg.name} | Village Plumbers NZ`,
        description: `Need plumbing help in ${cityData.name}, ${reg.name} (${cityData.zip})? Connect with available local trade professionals 24/7. Call 0800 845 524.`,
        alternates: { canonical: `https://${cityData.subdomain}.villageplumbers.co.nz/` },
        openGraph: {
          title: `Plumbing Services in ${cityData.name}, ${reg.name} | Village Plumbers NZ`,
          description: `Need plumbing help in ${cityData.name}, ${reg.name} (${cityData.zip})? Connect with available local trade professionals 24/7.`,
          url: `https://${cityData.subdomain}.villageplumbers.co.nz/`,
        }
      };
    }
  }

  return {
    title: `Plumbing Services in ${subdomain} | Village Plumbers NZ`,
    description: `Connect with local plumbing professionals serving ${subdomain}, NZ.`
  };
}

export default async function SubdomainPage({ params }: { params: Promise<{ subdomain: string }> }) {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain.toLowerCase();

  // 1. Region Subdomain
  const regionData = nzDatabase.regions.find(r => r.code === subdomain);

  if (regionData) {
    const coreServices = servicesData.filter(s => s.tier === 'core');
    const secondaryServices = servicesData.filter(s => s.tier === 'secondary' && isServiceApplicableForRegion(s, regionData));
    const regionalServices = servicesData.filter(s => s.tier === 'regional' && isServiceApplicableForRegion(s, regionData));

    return (
      <div className="min-h-screen bg-slate-50">
        
        {/* Navigation Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <nav className="text-xs text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-sky-600">NZ Plumbing</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{regionData.name} Regional Hub</span>
          </nav>
        </div>

        {/* Hero Header */}
        <section className="relative bg-slate-900 text-white py-16 px-4 mt-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block bg-sky-500/20 text-sky-300 px-4 py-1 rounded-full text-xs font-bold mb-4 border border-sky-400/30">
              🇳🇿 REGIONAL HUB - {regionData.name.toUpperCase()}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Plumbing Services in <span className="text-sky-400">{regionData.name} Region</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Connecting customers with available, independent, certificated local plumbing professionals serving all {regionData.cities.length} suburbs in {regionData.name}.
            </p>
            <a href="tel:0800845524" className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-lg px-8 py-4 rounded-xl shadow-lg inline-block">
              📞 Call {regionData.name} Connection Line: 0800 845 524
            </a>
          </div>
        </section>

        {/* Cities & Suburbs Grid */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
            Cities & Towns Served in {regionData.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {regionData.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/subdomain/${city.subdomain}`}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-sky-500 shadow-sm transition-all group"
              >
                <div className="font-bold text-slate-900 group-hover:text-sky-600 text-base">{city.name}</div>
                <div className="text-xs text-sky-600 font-mono mt-1">{city.subdomain}.villageplumbers.co.nz</div>
                <div className="text-xs text-slate-400 mt-0.5">Postcode: {city.zip}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* 25 Core Services Section */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
            25 Core Service Pages in {regionData.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreServices.map((service) => (
              <Link
                key={service.slug}
                href={`/subdomain/${regionData.code}/${service.slug}`}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all flex items-start gap-4"
              >
                <span className="text-3xl">{service.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-900 hover:text-sky-600 text-base">{service.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Secondary Services (Major Cities) */}
        {secondaryServices.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
              Major City Secondary Services in {regionData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {secondaryServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/subdomain/${regionData.code}/${service.slug}`}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all flex items-start gap-4"
                >
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 hover:text-sky-600 text-base">{service.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{service.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Regional Services */}
        {regionalServices.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-20">
            <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
              Regional Specialist Services in {regionData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {regionalServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/subdomain/${regionData.code}/${service.slug}`}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all flex items-start gap-4"
                >
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 hover:text-sky-600 text-base">{service.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{service.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // 2. Suburb / City Subdomain
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
    const coreServices = servicesData.filter(s => s.tier === 'core');
    const secondaryServices = servicesData.filter(s => s.tier === 'secondary' && isServiceApplicableForRegion(s, parentRegion));
    const regionalServices = servicesData.filter(s => s.tier === 'regional' && isServiceApplicableForRegion(s, parentRegion));
    const nearbyLocations = parentRegion.cities.filter(c => c.subdomain !== foundCity?.subdomain);

    return (
      <div className="min-h-screen bg-slate-50">
        
        {/* Navigation Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <nav className="text-xs text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-sky-600">NZ Plumbing</Link>
            <span>/</span>
            <Link href={`/subdomain/${parentRegion.code}`} className="hover:text-sky-600">{parentRegion.name} Regional Hub</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{foundCity.name} Page</span>
          </nav>
        </div>

        {/* Hero Header */}
        <section className="relative bg-slate-900 text-white py-16 px-4 mt-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block bg-sky-500/20 text-sky-300 px-4 py-1 rounded-full text-xs font-bold mb-4 border border-sky-400/30">
              📍 CITY / TOWN PAGE - {foundCity.name.toUpperCase()} ({foundCity.zip})
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Plumbers in <span className="text-sky-400">{foundCity.name}</span>, {parentRegion.name}
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Connect with available independent plumbers serving {foundCity.name}, {parentRegion.name} ({foundCity.zip}). Fast response for leaks, unblocking drains & hot water.
            </p>
            <a href="tel:0800845524" className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-lg px-8 py-4 rounded-xl shadow-lg inline-block">
              📞 Direct {foundCity.name} Line: 0800 845 524
            </a>
          </div>
        </section>

        {/* 25 Core Service Pages */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
            25 Core Service Pages in {foundCity.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreServices.map((service) => (
              <Link
                key={service.slug}
                href={`/subdomain/${foundCity?.subdomain}/${service.slug}`}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all flex items-start gap-4"
              >
                <span className="text-3xl">{service.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-900 hover:text-sky-600">{service.name} in {foundCity?.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Secondary Services */}
        {secondaryServices.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
              Major City Secondary Services in {foundCity.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {secondaryServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/subdomain/${foundCity?.subdomain}/${service.slug}`}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all flex items-start gap-4"
                >
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 hover:text-sky-600">{service.name} in {foundCity?.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{service.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Regional Services */}
        {regionalServices.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
              Regional Specialist Services in {foundCity.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {regionalServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/subdomain/${foundCity?.subdomain}/${service.slug}`}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all flex items-start gap-4"
                >
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 hover:text-sky-600">{service.name} in {foundCity?.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{service.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Nearby Locations */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <span>📍</span> Nearby Locations in {parentRegion.name}
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Connect with plumbing professionals in nearby towns and suburbs across {parentRegion.name}:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {nearbyLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/subdomain/${loc.subdomain}`}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-sky-500 text-slate-900 font-bold text-sm block hover:text-sky-600"
                >
                  <div className="text-base">{loc.name}</div>
                  <div className="text-xs text-sky-600 font-mono mt-0.5">{loc.subdomain}.villageplumbers.co.nz</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    );
  }

  return notFound();
}
