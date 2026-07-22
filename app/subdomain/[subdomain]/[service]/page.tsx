import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import nzDatabase from '../../../../data/nz_database.json';
import servicesData from '../../../../data/services.json';

export async function generateStaticParams() {
  const params: Array<{ subdomain: string; service: string }> = [];

  // Pre-render main 16 regions for core services to stay under Cloudflare Pages 20,000 files limit.
  // All 256 city subdomains and additional services render dynamically on-demand via Next.js ISR/Edge!
  const mainRegions = (nzDatabase.regions || [])
    .map((reg: any) => reg.code || reg.slug)
    .filter((code: any) => typeof code === 'string' && code.trim().length > 0);

  const coreServices = (servicesData || [])
    .filter((s: any) => s && s.isCore && typeof s.slug === 'string')
    .map((s: any) => s.slug);

  mainRegions.forEach((subdomain) => {
    coreServices.forEach((service) => {
      params.push({
        subdomain: String(subdomain),
        service: String(service),
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ subdomain: string, service: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  let locName = resolvedParams.subdomain
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const region = nzDatabase.regions.find((r: any) => r.code === resolvedParams.subdomain || r.slug === resolvedParams.subdomain);
  if (region) locName = region.name;

  const foundService = servicesData.find(s => s.slug === resolvedParams.service);
  const serviceName = foundService ? foundService.name : resolvedParams.service
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${serviceName} in ${locName} | Village Plumbers NZ`,
    description: `Connect with available independent certificated local trade specialists for ${serviceName} in ${locName}. 24/7 emergency dispatch. Call 0800 845 524.`,
    alternates: {
      canonical: `https://${resolvedParams.subdomain}.villageplumbers.co.nz/${resolvedParams.service}`,
    },
    openGraph: {
      title: `${serviceName} in ${locName} | Village Plumbers NZ`,
      description: `Connect with available independent certificated local trade specialists for ${serviceName} in ${locName}.`,
      url: `https://${resolvedParams.subdomain}.villageplumbers.co.nz/${resolvedParams.service}`,
    }
  };
}

export default async function SubdomainServicePage({ params }: { params: Promise<{ subdomain: string, service: string }> }) {
  const resolvedParams = await params;

  let locName = '';
  let nearbySuburbs: any[] = [];
  const region = nzDatabase.regions.find((r: any) => r.code === resolvedParams.subdomain || r.slug === resolvedParams.subdomain);

  if (region) {
    locName = region.name;
    nearbySuburbs = region.suburbs || [];
  } else {
    let foundSub: any = null;
    let foundParentReg: any = null;

    for (const r of nzDatabase.regions) {
      const sub = r.suburbs?.find((s: any) => s.slug === resolvedParams.subdomain);
      if (sub) {
        foundSub = sub;
        foundParentReg = r;
        break;
      }
    }

    if (foundSub) {
      locName = `${foundSub.name}, ${foundParentReg.name}`;
      nearbySuburbs = foundParentReg.suburbs?.filter((s: any) => s.slug !== foundSub.slug) || [];
    } else {
      locName = resolvedParams.subdomain
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
  }

  const foundService = servicesData.find(s => s.slug === resolvedParams.service);
  const serviceName = foundService ? foundService.name : resolvedParams.service
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const serviceDesc = foundService?.description || `Professional ${serviceName} services available in ${locName}.`;

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-950 text-white min-h-[600px] flex items-center py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/media__1783510889843.jpg" 
            alt={`${serviceName} in ${locName}`}
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/65"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              {/* Breadcrumb */}
              <nav className="text-xs font-semibold text-slate-400 mb-6 flex items-center gap-2 flex-wrap">
                <Link href="/" className="hover:text-emerald-400">Home</Link>
                <span className="text-slate-600">/</span>
                <Link href={`/subdomain/${resolvedParams.subdomain}`} className="hover:text-emerald-400">{locName}</Link>
                <span className="text-slate-600">/</span>
                <span className="text-emerald-400 font-bold">{serviceName}</span>
              </nav>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                <span className="inline-flex items-center bg-emerald-500 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
                  ⚡ 24/7 Local Service
                </span>
                <span className="inline-flex items-center bg-slate-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-slate-700">
                  📍 {locName} Area
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                {serviceName} <span className="text-emerald-400">in {locName}</span>
              </h1>

              <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
                {serviceDesc} Connect with available independent certificated local trade specialists serving {locName} 24/7.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a 
                  href="tel:0800845524" 
                  className="inline-flex items-center gap-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 px-8 py-4 rounded-xl font-black text-lg transition-all shadow-lg"
                >
                  📞 0800 845 524
                </a>
                <a 
                  href="#quote-form" 
                  className="inline-flex items-center bg-slate-800/90 hover:bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                >
                  Get Free Quote
                </a>
              </div>

              <div className="flex items-center gap-6 text-xs text-slate-400 font-semibold">
                <span>🛡️ PGDB Licensed Practitioners</span>
                <span>⚡ Upfront Quotes</span>
              </div>
            </div>

            {/* Right Quote Form */}
            <div id="quote-form" className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 text-slate-900">
                <h2 className="text-2xl font-black mb-1">Get Free Quote for {serviceName}</h2>
                <p className="text-slate-500 text-sm mb-6">Serving {locName} and nearby suburbs.</p>

                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Full Name *" 
                    required 
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address *" 
                    required 
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number *" 
                    required 
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                  />
                  <textarea 
                    rows={3} 
                    placeholder={`Describe your ${serviceName} job in ${locName}... *`}
                    required 
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all text-sm resize-none"
                  ></textarea>

                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="terms-sub-serv" 
                      required 
                      className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="terms-sub-serv" className="text-xs text-slate-500 leading-relaxed cursor-pointer">
                      I agree to be connected with available independent certificated plumbing professionals in {locName} under PGDB rules.
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black py-4 rounded-xl text-base transition-all shadow-md"
                  >
                    Request {serviceName} Quote →
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. NEARBY LOCATIONS LINKS */}
      {nearbySuburbs.length > 0 && (
        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              {serviceName} in Nearby Suburbs
            </h2>
            <p className="text-slate-400 text-sm mb-8">
              Select an adjacent location to request {serviceName} nearby.
            </p>

            <div className="flex flex-wrap gap-2.5 justify-center">
              {nearbySuburbs.map((sub: any) => (
                <Link 
                  key={sub.slug}
                  href={`/subdomain/${sub.slug}/${resolvedParams.service}`}
                  className="bg-slate-800 hover:bg-emerald-400 hover:text-slate-950 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                >
                  📍 {sub.name} {serviceName}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. BOTTOM CTA BANNER */}
      <section className="bg-emerald-400 text-slate-950 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-1">Need {serviceName} in {locName}?</h2>
            <p className="text-slate-900 font-medium text-sm">Call 0800 845 524 for immediate local trade dispatch.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <a href="tel:0800845524" className="bg-slate-950 hover:bg-slate-900 text-white font-black px-8 py-4 rounded-xl text-base transition-all shadow-lg">
              📞 Call 0800 845 524
            </a>
            <a href="#quote-form" className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-4 rounded-xl text-base transition-all">
              Get Free Quote
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
