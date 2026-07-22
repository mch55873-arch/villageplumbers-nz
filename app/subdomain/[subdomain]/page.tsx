import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import nzDatabase from '../../../data/nz_database.json';
import servicesData from '../../../data/services.json';

export async function generateMetadata({ params }: { params: Promise<{ subdomain: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain.toLowerCase();

  // Region Subdomain (e.g. 'auckland', 'wellington')
  const regionData = nzDatabase.regions.find(r => r.code === subdomain);
  if (regionData) {
    return {
      title: `24/7 Plumbers in ${regionData.name} Region | Village Plumbers NZ`,
      description: `Emergency plumbers and certificated drainlayers in ${regionData.name}. 24/7 fast response across all suburbs. Call 0800 845 524.`,
      alternates: { canonical: `https://${regionData.code}.villageplumbers.co.nz/` },
      openGraph: {
        title: `24/7 Plumbers in ${regionData.name} Region | Village Plumbers NZ`,
        description: `Emergency plumbers and certificated drainlayers in ${regionData.name}. 24/7 fast response across all suburbs.`,
        url: `https://${regionData.code}.villageplumbers.co.nz/`,
      }
    };
  }

  // Suburb search across regions
  for (const reg of nzDatabase.regions) {
    const cityData = reg.cities.find(c => c.slug === subdomain);
    if (cityData) {
      return {
        title: `Plumber in ${cityData.name}, ${reg.name} | Village Plumbers NZ`,
        description: `Need a plumber in ${cityData.name} (${cityData.zip})? Certificated local NZ plumbers available 24/7 for emergency plumbing, blocked drains & hot water.`,
        alternates: { canonical: `https://${cityData.slug}.villageplumbers.co.nz/` },
        openGraph: {
          title: `Plumber in ${cityData.name}, ${reg.name} | Village Plumbers NZ`,
          description: `Need a plumber in ${cityData.name} (${cityData.zip})? Certificated local NZ plumbers available 24/7.`,
          url: `https://${cityData.slug}.villageplumbers.co.nz/`,
        }
      };
    }
  }

  return {
    title: `Plumbing Services in ${subdomain} | Village Plumbers NZ`,
    description: `Emergency plumbing, drain clearing & gasfitting in ${subdomain}, NZ.`
  };
}

export default async function SubdomainPage({ params }: { params: Promise<{ subdomain: string }> }) {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain.toLowerCase();

  // 1. Is it a Region Subdomain? (e.g. 'auckland', 'wellington')
  const regionData = nzDatabase.regions.find(r => r.code === subdomain);

  if (regionData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <section className="relative bg-slate-900 text-white py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block bg-sky-500/20 text-sky-300 px-4 py-1 rounded-full text-xs font-bold mb-4 border border-sky-400/30">
              🇳🇿 {regionData.name.toUpperCase()} REGIONAL PLUMBING HEADQUARTERS
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              24/7 Emergency Plumbers in <span className="text-sky-400">{regionData.name}</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Certificated NZ plumbers covering all {regionData.cities.length} suburbs in the {regionData.name} region. Immediate dispatch for leaks, hot water & drain blockages.
            </p>
            <a href="tel:0800845524" className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-lg px-8 py-4 rounded-xl shadow-lg inline-block">
              📞 Call {regionData.name} Hotline: 0800 845 524
            </a>
          </div>
        </section>

        {/* Suburbs List */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
            Suburbs Served in {regionData.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {regionData.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/subdomain/${city.slug}`}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-sky-500 shadow-sm transition-all group"
              >
                <div className="font-bold text-slate-900 group-hover:text-sky-600 text-base">{city.name}</div>
                <div className="text-xs text-slate-400 mt-1">Postcode: {city.zip}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Services in Region */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
            65 Plumbing Services Available in {regionData.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                href={`/subdomain/${regionData.code}/${service.slug}`}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all flex items-start gap-4"
              >
                <span className="text-3xl">{service.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-900 hover:text-sky-600">{service.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // 2. Is it a Suburb Subdomain? (e.g. 'ponsonby', 'te-aro')
  let foundCity = null;
  let parentRegion = null;

  for (const reg of nzDatabase.regions) {
    const city = reg.cities.find(c => c.slug === subdomain);
    if (city) {
      foundCity = city;
      parentRegion = reg;
      break;
    }
  }

  if (foundCity && parentRegion) {
    return (
      <div className="min-h-screen bg-slate-50">
        <section className="relative bg-slate-900 text-white py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block bg-sky-500/20 text-sky-300 px-4 py-1 rounded-full text-xs font-bold mb-4 border border-sky-400/30">
              📍 LOCAL {foundCity.name.toUpperCase()} PLUMBING SERVICE ({foundCity.zip})
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Plumbers in <span className="text-sky-400">{foundCity.name}</span>, {parentRegion.name}
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Local certified plumbers stationed in {foundCity.name} ({foundCity.zip}). 24/7 rapid dispatch for emergency plumbing, unblocking drains, gasfitting & hot water repairs.
            </p>
            <a href="tel:0800845524" className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-lg px-8 py-4 rounded-xl shadow-lg inline-block">
              📞 Direct {foundCity.name} Line: 0800 845 524
            </a>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
            Services Available in {foundCity.name} ({parentRegion.name})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                href={`/subdomain/${foundCity?.slug}/${service.slug}`}
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
      </div>
    );
  }

  return notFound();
}
