import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit', display: 'swap' });

export const runtime = 'edge';

export const metadata: Metadata = {
  metadataBase: new URL('https://villageplumbers.co.nz'),
  title: "Village Plumbers NZ | Connect with Local Plumbing Professionals 24/7",
  description: "Connecting homeowners & businesses with available licensed, certificated local plumbing professionals across 16 New Zealand regions. 24/7 emergency response.",
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
    title: "Village Plumbers NZ | Connect with Local Plumbing Professionals 24/7",
    description: "Connecting homeowners & businesses with available licensed local plumbing professionals across New Zealand.",
    url: 'https://villageplumbers.co.nz',
    siteName: "Village Plumbers NZ",
    locale: 'en_NZ',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: "Village Plumbers NZ Logo",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Village Plumbers NZ | Connect with Local Plumbing Professionals",
    description: "Connecting homeowners & businesses with available licensed local plumbing professionals across New Zealand.",
    images: ['/logo.png'],
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
      <body suppressHydrationWarning className="bg-white text-gray-900 antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://villageplumbers.co.nz/#website",
                  "url": "https://villageplumbers.co.nz",
                  "name": "Village Plumbers NZ",
                  "description": "Connecting customers with available local plumbing professionals serving New Zealand.",
                  "inLanguage": "en-NZ"
                },
                {
                  "@type": "Service",
                  "@id": "https://villageplumbers.co.nz/#service",
                  "name": "Local Plumbing Connection Network",
                  "provider": {
                    "@type": "Organization",
                    "name": "Village Plumbers NZ"
                  },
                  "areaServed": "NZ"
                }
              ]
            })
          }}
        />
        
        {/* TOP EMERGENCY BAR */}
        <div className="bg-sky-800 text-white hidden sm:block border-b border-sky-900">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-2 text-xs md:text-sm font-semibold">
                    <div className="flex items-center space-x-2">
                        <span className="animate-pulse">💧</span>
                        <span>Connecting customers with available, certificated local plumbing professionals serving your area</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <a href="tel:0800845524" className="hover:text-sky-200 transition-colors flex items-center gap-2 font-bold">
                            <span>📞</span> 0800 845 524
                        </a>
                    </div>
                </div>
            </div>
        </div>

        {/* MAIN NAVIGATION */}
        <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-xl shadow-slate-900/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            
            <Link href="/" className="flex items-center gap-3 group">
               <div className="relative flex items-center justify-center w-10 h-10 bg-sky-600 rounded-xl shadow-md group-hover:scale-105 transition-all">
                 <span className="text-2xl">🔧</span>
               </div>
               
               <div className="flex flex-col justify-center">
                 <span className="font-extrabold text-xl tracking-tight leading-none text-white">Village Plumbers</span>
                 <span className="font-bold text-xs tracking-[0.2em] text-sky-400 uppercase mt-0.5">New Zealand</span>
               </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 font-medium text-sm text-slate-200">
               <Link href="/" className="hover:text-sky-400 transition-colors">Home</Link>
               <Link href="/about" className="hover:text-sky-400 transition-colors">About</Link>
               <Link href="/#services" className="hover:text-sky-400 transition-colors">25 Core Services</Link>
               <Link href="/#regions" className="hover:text-sky-400 transition-colors">16 Regions</Link>
            </div>
            
            {/* Call to Action */}
            <div className="flex items-center space-x-3 bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-xl shadow-md transition-all">
                <span className="text-xl">📞</span>
                <div>
                    <div className="text-[10px] text-sky-100 font-extrabold uppercase tracking-wider">Connect 24/7</div>
                    <a href="tel:0800845524" className="text-sm font-extrabold text-white">
                        0800 845 524
                    </a>
                </div>
            </div>
            
          </div>
        </header>

        <div className="min-h-screen flex flex-col">
            {children}
            
            <footer className="bg-slate-950 text-white pt-16 pb-16 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* Col 1 */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-xl font-bold">
                             🔧
                           </div>
                           <div className="flex flex-col">
                             <span className="font-extrabold text-xl text-white">Village Plumbers</span>
                             <span className="font-bold text-xs text-sky-400 uppercase tracking-widest">New Zealand</span>
                           </div>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Connecting homeowners and commercial properties with available, licensed, and certificated local plumbing professionals across New Zealand.
                        </p>
                    </div>

                    {/* Col 2 */}
                    <div>
                        <h4 className="text-white font-bold mb-4 text-base">Popular Core Services</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/emergency-plumbing" className="hover:text-sky-400 transition-colors">Emergency Plumber</Link></li>
                            <li><Link href="/blocked-drain-unblocking" className="hover:text-sky-400 transition-colors">Blocked Drain Unblocking</Link></li>
                            <li><Link href="/hot-water-cylinder-installation" className="hover:text-sky-400 transition-colors">Hot Water Cylinder Installation</Link></li>
                            <li><Link href="/gasfitting-repairs" className="hover:text-sky-400 transition-colors">Gasfitting and Gas Repairs</Link></li>
                            <li><Link href="/burst-pipe-repair" className="hover:text-sky-400 transition-colors">Burst Pipe Repair</Link></li>
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div>
                        <h4 className="text-white font-bold mb-4 text-base">Regional Hubs</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/subdomain/auckland" className="hover:text-sky-400">Auckland Region</Link></li>
                            <li><Link href="/subdomain/wellington" className="hover:text-sky-400">Wellington Region</Link></li>
                            <li><Link href="/subdomain/canterbury" className="hover:text-sky-400">Canterbury (Christchurch)</Link></li>
                            <li><Link href="/subdomain/waikato" className="hover:text-sky-400">Waikato (Hamilton)</Link></li>
                            <li><Link href="/subdomain/bay-of-plenty" className="hover:text-sky-400">Bay of Plenty (Tauranga)</Link></li>
                        </ul>
                    </div>

                    {/* Col 4 */}
                    <div>
                        <h4 className="text-white font-bold mb-4 text-base">Connect with Local Trade</h4>
                        <p className="text-slate-400 text-sm mb-4">
                            Looking for a plumber or drainlayer in your local suburb? Call our nationwide connection line.
                        </p>
                        <a href="tel:0800845524" className="inline-block bg-sky-600 hover:bg-sky-500 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-lg">
                            📞 0800 845 524
                        </a>
                    </div>
                </div>
                
                {/* Legal & Lead-Gen Compliance Disclaimer */}
                <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800 text-xs text-slate-500 space-y-2 text-center md:text-left">
                    <p>
                        <strong>Disclaimer:</strong> Village Plumbers NZ is an independent consumer matching and referral platform. We connect customers with available, independent, licensed and certificated plumbing, gasfitting, and drainlaying professionals serving your local area. All trade work in New Zealand is performed independently by qualified practitioners registered with the Plumbers, Gasfitters and Drainlayers Board (PGDB).
                    </p>
                    <p>&copy; {new Date().getFullYear()} Village Plumbers NZ. All rights reserved.</p>
                </div>
            </footer>
        </div>

      </body>
    </html>
  );
}
