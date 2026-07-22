import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit', display: 'swap' });

export const runtime = 'edge';

export const metadata: Metadata = {
  metadataBase: new URL('https://villageplumbers.co.nz'),
  title: "Village Plumbers NZ | Emergency Plumbing, Gasfitting & Drainlaying",
  description: "Connect with available, independent, certificated local plumbing professionals across 16 New Zealand regions. Available 24/7.",
  keywords: ["Plumber NZ", "Find Local Plumber", "Emergency Plumbing New Zealand", "Blocked Drain Unblocking", "Hot Water Cylinder Repair"],
  publisher: "Village Plumbers NZ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Village Plumbers NZ | Emergency Plumbing, Gasfitting & Drainlaying",
    description: "Connect with available, independent, certificated local plumbing professionals across 16 New Zealand regions.",
    url: 'https://villageplumbers.co.nz',
    siteName: "Village Plumbers NZ",
    locale: 'en_NZ',
    type: 'website',
  },
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="bg-slate-50 text-slate-900 antialiased font-sans flex flex-col min-h-screen">
        
        {/* TOP BAR (Reference Site Design) */}
        <div className="bg-sky-500 text-slate-950 font-bold text-xs md:text-sm py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-4">
              <span>📍 Serving All 16 New Zealand Regions</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">⚡ 24/7 Emergency Trade Dispatch</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="mailto:contact@villageplumbers.co.nz" className="hover:underline hidden sm:inline">
                ✉️ contact@villageplumbers.co.nz
              </a>
              <a href="tel:0800845524" className="hover:underline flex items-center gap-1 font-extrabold text-slate-950">
                📞 0800 845 524
              </a>
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION */}
        <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-xl border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl shadow-md shadow-sky-500/20">
                💧
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tight text-white">
                Village Plumbers <span className="text-sky-400">NZ</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
              <Link href="/" className="text-sky-400 hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="text-slate-300 hover:text-sky-400 transition-colors">About Us</Link>
              <Link href="/#core-services" className="text-slate-300 hover:text-sky-400 transition-colors">Services</Link>
              <Link href="/blog" className="text-slate-300 hover:text-sky-400 transition-colors">Blog & Guides</Link>
              <Link href="/#contact-form" className="text-slate-300 hover:text-sky-400 transition-colors">Contact Us</Link>
            </nav>

            {/* Header Call Button (Reference Site Design) */}
            <div className="flex items-center gap-3">
              <a 
                href="tel:0800845524"
                className="bg-white text-slate-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-sky-400 hover:text-slate-950 transition-all flex items-center gap-2 shadow-sm"
              >
                <span>📞</span>
                <div className="text-left leading-tight hidden sm:block">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Call 24/7</div>
                  <div className="font-extrabold text-xs">0800 845 524</div>
                </div>
              </a>
            </div>

          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* FOOTER (Reference Site Design) */}
        <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800 text-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              
              {/* Col 1: About */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-bold text-slate-950 text-base">
                    💧
                  </div>
                  <span className="text-xl font-black text-white">
                    Village Plumbers <span className="text-sky-400">NZ</span>
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Connecting customers with available, independent, certificated local plumbing, gasfitting, and drainlaying professionals serving your area under PGDB rules.
                </p>
                <div className="text-xs text-slate-400 font-bold">
                  📞 24/7 Dispatch: 0800 845 524
                </div>
              </div>

              {/* Col 2: Quick Links */}
              <div>
                <h4 className="text-base font-bold text-white mb-4 border-b border-slate-800 pb-2">Navigation</h4>
                <ul className="space-y-2.5 text-xs text-slate-400">
                  <li><Link href="/" className="hover:text-sky-400 transition-colors">Home Page</Link></li>
                  <li><Link href="/about" className="hover:text-sky-400 transition-colors">About Village Plumbers</Link></li>
                  <li><Link href="/#core-services" className="hover:text-sky-400 transition-colors">25 Core Services</Link></li>
                  <li><Link href="/blog" className="hover:text-sky-400 transition-colors">Plumbing Blog & Guides</Link></li>
                  <li><Link href="/#contact-form" className="hover:text-sky-400 transition-colors">Get Free Quote</Link></li>
                </ul>
              </div>

              {/* Col 3: Popular Services */}
              <div>
                <h4 className="text-base font-bold text-white mb-4 border-b border-slate-800 pb-2">Popular Services</h4>
                <ul className="space-y-2.5 text-xs text-slate-400">
                  <li><Link href="/emergency-plumbing" className="hover:text-sky-400 transition-colors">Emergency Plumber</Link></li>
                  <li><Link href="/blocked-drain-unblocking" className="hover:text-sky-400 transition-colors">Blocked Drain Unblocking</Link></li>
                  <li><Link href="/hot-water-cylinder-repair" className="hover:text-sky-400 transition-colors">Hot Water Cylinder Repair</Link></li>
                  <li><Link href="/gasfitting-repairs" className="hover:text-sky-400 transition-colors">Gasfitting & Repairs</Link></li>
                  <li><Link href="/burst-pipe-repair" className="hover:text-sky-400 transition-colors">Burst Pipe Repair</Link></li>
                </ul>
              </div>

              {/* Col 4: PGDB Disclaimer */}
              <div>
                <h4 className="text-base font-bold text-white mb-4 border-b border-slate-800 pb-2">Legal & Compliance</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  We are a lead generation network. We connect customers with independent certificated trade practitioners registered with the Plumbers, Gasfitters and Drainlayers Board (PGDB).
                </p>
                <div className="text-[11px] bg-slate-900 border border-slate-800 p-3 rounded-xl text-slate-400">
                  🛡️ Registered & Certificated Trades Network
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
              <p>© {new Date().getFullYear()} Village Plumbers NZ. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/about" className="hover:text-slate-300">About</Link>
                <Link href="/blog" className="hover:text-slate-300">Blog</Link>
                <Link href="/#contact-form" className="hover:text-slate-300">Contact</Link>
              </div>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
