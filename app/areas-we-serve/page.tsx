import Link from 'next/link';
import Image from 'next/image';
import nzDatabase from '../../data/nz_database.json';

export const metadata = {
  title: "Areas We Serve | Village Plumbers NZ",
  description: "Explore all 16 New Zealand regions and 256 local suburbs covered by Village Plumbers NZ.",
  alternates: {
    canonical: 'https://villageplumbers.co.nz/areas-we-serve',
  },
  openGraph: {
    title: "Areas We Serve | Village Plumbers NZ",
    description: "Explore all 16 New Zealand regions and 256 local suburbs covered by Village Plumbers NZ.",
    url: 'https://villageplumbers.co.nz/areas-we-serve',
  }
};

export default function AreasWeServePage() {
  const regions = nzDatabase.regions || [];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      
      {/* Hero */}
      <section className="relative bg-slate-950 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/media__1783510889843.jpg" 
            alt="Areas We Serve" 
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-wider mb-4 block">
            VILLAGE PLUMBERS NEW ZEALAND
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white">
            Areas We Serve
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Local plumbing, gasfitting, and drainlaying dispatch across all 16 New Zealand regions and 256 local suburbs.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-slate-100 border-b border-slate-200 py-3.5 px-4 text-xs font-semibold text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-bold">Areas We Serve</span>
        </div>
      </div>

      {/* Regions Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions.map((reg: any) => {
            const regSlug = reg.code || reg.slug;
            const cities = reg.cities || reg.suburbs || [];
            return (
              <div key={regSlug} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <h2 className="text-2xl font-black text-slate-900 mb-2">
                  <Link href={`/subdomain/${regSlug}`} className="hover:text-emerald-600 transition-colors">
                    📍 {reg.name}
                  </Link>
                </h2>
                <p className="text-slate-500 text-xs mb-6 font-semibold">
                  {cities.length} Suburbs & Local Towns Covered
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {cities.map((city: any) => {
                    const citySlug = city.subdomain || city.slug;
                    return (
                      <Link 
                        key={citySlug} 
                        href={`/subdomain/${citySlug}`}
                        className="text-xs bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 px-3 py-1 rounded-lg transition-all font-medium"
                      >
                        {city.name}
                      </Link>
                    );
                  })}
                </div>

                <Link 
                  href={`/subdomain/${regSlug}`}
                  className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs hover:gap-2 transition-all"
                >
                  View {reg.name} Region Hub →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
