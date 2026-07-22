import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import nzDatabase from '../../../data/nz_database.json';
import servicesData from '../../../data/services.json';

export async function generateStaticParams() {
  // Pre-render main 16 regions. All 256 city subdomains render dynamically on-demand!
  return (nzDatabase.regions || [])
    .map((reg: any) => reg.code || reg.slug)
    .filter((code: any) => typeof code === 'string' && code.trim().length > 0)
    .map((code: string) => ({ subdomain: code }));
}

export async function generateMetadata({ params }: { params: Promise<{ subdomain: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  let locName = resolvedParams.subdomain
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const region = nzDatabase.regions.find((r: any) => r.code === resolvedParams.subdomain || r.slug === resolvedParams.subdomain);
  if (region) locName = region.name;

  return {
    title: `Plumbing, Gasfitting & Drainlaying in ${locName} | Village Plumbers NZ`,
    description: `Connect with available independent certificated local plumbing & drainlaying professionals serving ${locName} and surrounding areas 24/7. Call 0800 845 524.`,
    alternates: {
      canonical: `https://${resolvedParams.subdomain}.villageplumbers.co.nz`,
    },
    openGraph: {
      title: `Plumbing, Gasfitting & Drainlaying in ${locName} | Village Plumbers NZ`,
      description: `Connect with available independent certificated local plumbing & drainlaying professionals serving ${locName}.`,
      url: `https://${resolvedParams.subdomain}.villageplumbers.co.nz`,
    }
  };
}

export default async function SubdomainPage({ params }: { params: Promise<{ subdomain: string }> }) {
  const resolvedParams = await params;
  
  // Find location details
  let locName = '';
  let isRegion = false;
  let isMajorCity = false;
  let isColdRegion = false;
  let isRural = false;
  let isIndustrial = false;
  let nearbySuburbs: any[] = [];

  const region = nzDatabase.regions.find((r: any) => r.code === resolvedParams.subdomain || r.slug === resolvedParams.subdomain);

  if (region) {
    locName = region.name;
    isRegion = true;
    isMajorCity = region.isMajorCity || false;
    isColdRegion = region.isColdRegion || false;
    isRural = region.isRural || false;
    isIndustrial = region.isIndustrial || false;
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
      isMajorCity = foundParentReg.isMajorCity || false;
      isColdRegion = foundParentReg.isColdRegion || false;
      isRural = foundParentReg.isRural || false;
      isIndustrial = foundParentReg.isIndustrial || false;
      nearbySuburbs = foundParentReg.suburbs?.filter((s: any) => s.slug !== foundSub.slug) || [];
    } else {
      locName = resolvedParams.subdomain
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
  }

  // Filter 3-Tier Services
  const availableServices = servicesData.filter((service: any) => {
    if (service.isCore) return true;
    if (service.isMajorCity && !isMajorCity) return false;
    if (service.isColdRegion && !isColdRegion) return false;
    if (service.isRural && !isRural) return false;
    if (service.isIndustrial && !isIndustrial) return false;
    return true;
  });

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      
      {/* 1. HERO SECTION (Matching Annandale/Burke Layout) */}
      <section className="relative bg-slate-950 text-white min-h-[650px] flex items-center py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/media__1783510889843.jpg" 
            alt={`Plumbing Services in ${locName}`}
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
                <Link href="/areas-we-serve" className="hover:text-emerald-400">Areas We Serve</Link>
                <span className="text-slate-600">/</span>
                <span className="text-emerald-400 font-bold">{locName}</span>
              </nav>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                <span className="inline-flex items-center bg-emerald-500 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
                  ⚡ 30–45 min Fast Arrival
                </span>
                <span className="inline-flex items-center bg-slate-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-slate-700">
                  📍 Local {locName} Trades
                </span>
                <span className="inline-flex items-center bg-slate-800 text-amber-400 text-xs font-bold px-3.5 py-1.5 rounded-full border border-slate-700">
                  ★ Rated 5.0 / 5.0
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Emergency Plumbing, Gasfitting & Drainlaying <span className="text-emerald-400">in {locName}</span>
              </h1>

              <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
                Village Plumbers connects {locName} residents with available, independent, certificated local plumbing professionals serving your area 24/7.
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
                <span>🛡️ PGDB Licensed & Insured</span>
                <span>⚡ 24/7 Emergency Service</span>
              </div>
            </div>

            {/* Right Quote Form */}
            <div id="quote-form" className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 text-slate-900">
                <h2 className="text-2xl font-black mb-1">Get Free Quote in {locName}</h2>
                <p className="text-slate-500 text-sm mb-6">Fast response from local certificated trade specialists.</p>

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
                    placeholder={`Describe your issue in ${locName}... *`}
                    required 
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all text-sm resize-none"
                  ></textarea>

                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="terms-loc" 
                      required 
                      className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="terms-loc" className="text-xs text-slate-500 leading-relaxed cursor-pointer">
                      I agree to be connected with available independent certificated plumbing professionals in {locName} under PGDB compliance rules.
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black py-4 rounded-xl text-base transition-all shadow-md"
                  >
                    Get Free Quote →
                  </button>
                </form>
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
            <div className="text-3xl md:text-4xl font-black text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">PGDB Certificated</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-emerald-400">5.0★</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Local {locName} Rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-emerald-400">24/7</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Emergency Service</div>
          </div>
        </div>
      </section>

      {/* 3. AVAILABLE SERVICES IN LOCATION GRID */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-extrabold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Available Services
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
            Services Available in {locName}
          </h2>
          <p className="text-slate-600 text-base">
            Browse trade services offered by independent certificated practitioners in {locName}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableServices.map((service: any) => (
            <article 
              key={service.slug} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-200 flex flex-col justify-between"
            >
              <Link href={`/subdomain/${resolvedParams.subdomain}/${service.slug}`} className="block">
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <Image 
                    src="/images/media__1784480302620.jpg" 
                    alt={`${service.name} in ${locName}`} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  <span className="absolute top-4 right-4 bg-emerald-500 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    24/7 Service
                  </span>

                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-emerald-400 rounded-2xl flex items-center justify-center shadow-lg text-slate-950 font-black text-xl">
                      💧
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {service.name} in {locName}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <span className="inline-flex items-center text-emerald-600 font-extrabold text-sm group-hover:gap-2 transition-all">
                    Learn More →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* 4. NEARBY LOCATIONS LINKS */}
      {nearbySuburbs.length > 0 && (
        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Nearby Suburbs & Surrounding Areas
            </h2>
            <p className="text-slate-400 text-sm mb-8">
              We also connect homeowners in adjacent locations near {locName}.
            </p>

            <div className="flex flex-wrap gap-2.5 justify-center">
              {nearbySuburbs.map((sub: any) => (
                <Link 
                  key={sub.slug}
                  href={`/subdomain/${sub.slug}`}
                  className="bg-slate-800 hover:bg-emerald-400 hover:text-slate-950 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                >
                  📍 {sub.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. BOTTOM CTA BANNER */}
      <section className="bg-emerald-400 text-slate-950 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-1">Need Emergency Plumbing in {locName}?</h2>
            <p className="text-slate-900 font-medium text-sm">Call 0800 845 524 for immediate local dispatch.</p>
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
