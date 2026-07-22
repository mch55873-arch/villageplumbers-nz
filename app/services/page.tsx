import Link from 'next/link';
import Image from 'next/image';
import servicesData from '../../data/services.json';

export const metadata = {
  title: "All Plumbing Services New Zealand | Village Plumbers NZ",
  description: "Browse all 25 core plumbing, gasfitting, and drainlaying services available across New Zealand. Available 24/7 for residential & commercial properties.",
  alternates: {
    canonical: 'https://villageplumbers.co.nz/services',
  },
  openGraph: {
    title: "All Plumbing Services New Zealand | Village Plumbers NZ",
    description: "Browse all 25 core plumbing, gasfitting, and drainlaying services available across New Zealand.",
    url: 'https://villageplumbers.co.nz/services',
  }
};

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      
      {/* 1. Page Hero Section */}
      <section className="relative bg-slate-950 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/media__1783510889843.jpg" 
            alt="Services" 
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
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Professional plumbing, gasfitting, and drainlaying services across New Zealand. Browse our complete range of 25 core services below.
          </p>
        </div>
      </section>

      {/* 2. Breadcrumbs Bar */}
      <div className="bg-slate-100 border-b border-slate-200 py-3.5 px-4 text-xs font-semibold text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-bold">Services</span>
        </div>
      </div>

      {/* 3. Services Grid (Matching Reference Card Layout 1-to-1) */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service: any) => (
            <article 
              key={service.slug} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-200 flex flex-col justify-between"
            >
              <Link href={`/${service.slug}`} className="block">
                {/* Image Header with Gradient Overlay */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <Image 
                    src="/images/media__1784480302620.jpg" 
                    alt={service.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Emergency Service Badge */}
                  <span className="absolute top-4 right-4 bg-emerald-500 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    24/7 Service
                  </span>

                  {/* Floating Icon Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-emerald-400 rounded-2xl flex items-center justify-center shadow-lg text-slate-950 font-black text-xl">
                      💧
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {service.name}
                  </h2>
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

      {/* 4. Bottom Emergency Phone CTA Section */}
      <section className="bg-emerald-400 text-slate-950 py-12 px-4 border-t border-emerald-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-1">Need Emergency Plumbing Assistance?</h2>
            <p className="text-slate-900 font-medium text-sm">Call 0800 845 524 for immediate dispatch across all NZ regions.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <a href="tel:0800845524" className="bg-slate-950 hover:bg-slate-900 text-white font-black px-8 py-4 rounded-xl text-base transition-all shadow-lg">
              📞 Call 0800 845 524
            </a>
            <Link href="/#contact-form" className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-4 rounded-xl text-base transition-all">
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
