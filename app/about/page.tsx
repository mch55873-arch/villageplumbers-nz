import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "About Us | Village Plumbers NZ",
  description: "Learn more about Village Plumbers NZ, connecting customers with independent, certificated local plumbing professionals across 16 New Zealand regions.",
  alternates: {
    canonical: 'https://villageplumbers.co.nz/about',
  },
  openGraph: {
    title: "About Us | Village Plumbers NZ",
    description: "Learn more about Village Plumbers NZ, connecting customers with independent, certificated local plumbing professionals across 16 New Zealand regions.",
    url: 'https://villageplumbers.co.nz/about',
  }
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative bg-slate-950 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/media__1783510889843.jpg" 
            alt="About Village Plumbers NZ" 
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="text-xs font-semibold text-slate-400 mb-6">
              <Link href="/" className="hover:text-emerald-400">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-emerald-400">About Us</span>
            </nav>

            <span className="inline-block bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              PLUMBING EXPERTS NETWORK
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
              About Village Plumbers NZ
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Your trusted plumbing, gasfitting, and drainlaying network serving all 16 New Zealand regions with certificated trade specialists and 24/7 response.
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="tel:0800845524" 
                className="inline-flex items-center gap-3 bg-emerald-400 text-slate-950 px-8 py-4 rounded-xl font-black text-lg hover:bg-emerald-300 transition shadow-xl"
              >
                📞 0800 845 524
              </a>
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-white text-slate-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="bg-emerald-400 py-8 px-4 border-y border-emerald-500">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-slate-950">
          <div>
            <div className="text-4xl font-black mb-1">25+</div>
            <div className="text-xs uppercase font-extrabold tracking-wider opacity-80">Core Services</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-1">16</div>
            <div className="text-xs uppercase font-extrabold tracking-wider opacity-80">Regions Covered</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-1">5.0★</div>
            <div className="text-xs uppercase font-extrabold tracking-wider opacity-80">Rating</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-1">24/7</div>
            <div className="text-xs uppercase font-extrabold tracking-wider opacity-80">Available</div>
          </div>
        </div>
      </section>

      {/* 3. Story / Mission */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6">
            <span className="text-emerald-600 font-extrabold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-6">
              Connecting New Zealanders With Licensed Trade Professionals
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Village Plumbers NZ was established to solve a critical issue faced by homeowners: finding fast, qualified, and compliant plumbing, gasfitting, and drainlaying professionals during emergencies.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              All independent trade partners connected through our platform adhere strictly to PGDB (Plumbers, Gasfitters and Drainlayers Board) licensing standards, ensuring safety, reliability, and full Building Code compliance.
            </p>
            <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold mb-2 text-emerald-400">PGDB Compliance Commitment</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We operate as an independent referral network. All sanitary plumbing, gasfitting, and subterranean drainlaying work is executed by fully registered practitioners holding valid NZ licences.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <Image 
                src="/images/media__1784480302622.jpg" 
                alt="NZ Plumbing Experts" 
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
