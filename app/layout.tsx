import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit', display: 'swap' });

export const runtime = 'edge';

export const metadata: Metadata = {
  metadataBase: new URL('https://villageplumbers.co.nz'),
  title: "Village Plumbers NZ | 24/7 Emergency Plumbing & Drainlaying",
  description: "Certified New Zealand plumbers available 24/7 across all 16 regions. Emergency plumbing, blocked drain clearing, hot water cylinder repairs & gasfitting.",
  keywords: ["Plumber NZ", "Emergency Plumber New Zealand", "Blocked Drain Unblocking", "Hot Water Cylinder Repair", "Gas Fitter NZ", "Local Plumber Near Me"],
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
    title: "Village Plumbers NZ | 24/7 Emergency Plumbing & Drainlaying",
    description: "Certified New Zealand plumbers available 24/7 across all 16 regions.",
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
    title: "Village Plumbers NZ | 24/7 Emergency Plumbing",
    description: "Certified New Zealand plumbers available 24/7 across all 16 regions.",
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
                  "@type": ["Organization", "Plumber"],
                  "@id": "https://villageplumbers.co.nz/#organization",
                  "name": "Village Plumbers NZ",
                  "url": "https://villageplumbers.co.nz",
                  "logo": {
                    "@type": "ImageObject",
                    "@id": "https://villageplumbers.co.nz/#logo",
                    "url": "https://villageplumbers.co.nz/logo.png",
                    "caption": "Village Plumbers NZ",
                    "inLanguage": "en-NZ"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+64-800-845-524",
                    "contactType": "customer service",
                    "areaServed": "NZ",
                    "availableLanguage": "English"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://villageplumbers.co.nz/#website",
                  "url": "https://villageplumbers.co.nz",
                  "name": "Village Plumbers NZ",
                  "publisher": {
                    "@id": "https://villageplumbers.co.nz/#organization"
                  },
                  "inLanguage": "en-NZ"
                },
                {
                  "@type": ["LocalBusiness", "Plumber"],
                  "@id": "https://villageplumbers.co.nz/#localbusiness",
                  "name": "Village Plumbers NZ",
                  "description": "24/7 Certified Plumbing, Gasfitting & Drainlaying Services Across New Zealand.",
                  "url": "https://villageplumbers.co.nz",
                  "telephone": "0800 845 524",
                  "priceRange": "$$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Nationwide Service",
                    "addressLocality": "Auckland",
                    "addressRegion": "Auckland",
                    "postalCode": "1010",
                    "addressCountry": "NZ"
                  }
                }
              ]
            })
          }}
        />
        
        {/* TOP EMERGENCY BAR */}
        <div className="bg-sky-700 text-white hidden sm:block border-b border-sky-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-2 text-xs md:text-sm font-bold">
                    <div className="flex items-center space-x-2">
                        <span className="animate-pulse">💧</span>
                        <span>24/7 Emergency Plumbing, Gasfitting & Drainlaying - Licensed & Certificated NZ Plumbers</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <a href="tel:0800845524" className="hover:text-sky-200 transition-colors flex items-center gap-2">
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
               <Link href="/about" className="hover:text-sky-400 transition-colors">About Us</Link>
               <Link href="/#services" className="hover:text-sky-400 transition-colors">65 Services</Link>
               <Link href="/#regions" className="hover:text-sky-400 transition-colors">16 Regions</Link>
               <Link href="/blog" className="hover:text-sky-400 transition-colors">Blog</Link>
            </div>
            
            {/* Call to Action */}
            <div className="flex items-center space-x-3 bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-xl shadow-md transition-all">
                <span className="text-xl">📞</span>
                <div>
                    <div className="text-[10px] text-sky-100 font-extrabold uppercase tracking-wider">24/7 Hotline</div>
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
                            Certified plumbing, gasfitting, and drainlaying across 16 NZ regions and all major suburbs. 24/7 emergency service guaranteed.
                        </p>
                    </div>

                    {/* Col 2 */}
                    <div>
                        <h4 className="text-white font-bold mb-4 text-base">Popular Services</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/emergency-plumbing" className="hover:text-sky-400 transition-colors">Emergency Plumbing</Link></li>
                            <li><Link href="/blocked-drain-unblocking" className="hover:text-sky-400 transition-colors">Blocked Drain Unblocking</Link></li>
                            <li><Link href="/hot-water-cylinder-repair" className="hover:text-sky-400 transition-colors">Hot Water Cylinder Repair</Link></li>
                            <li><Link href="/gas-fitting-repairs" className="hover:text-sky-400 transition-colors">Gas Fitting & Gas Repairs</Link></li>
                            <li><Link href="/burst-pipe-repair" className="hover:text-sky-400 transition-colors">Burst Pipe Repairs</Link></li>
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div>
                        <h4 className="text-white font-bold mb-4 text-base">Key Regions</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><span className="text-sky-400">■</span> Auckland Region</li>
                            <li><span className="text-sky-400">■</span> Wellington Region</li>
                            <li><span className="text-sky-400">■</span> Canterbury (Christchurch)</li>
                            <li><span className="text-sky-400">■</span> Waikato (Hamilton)</li>
                            <li><span className="text-sky-400">■</span> Bay of Plenty (Tauranga)</li>
                        </ul>
                    </div>

                    {/* Col 4 */}
                    <div>
                        <h4 className="text-white font-bold mb-4 text-base">24/7 Emergency Support</h4>
                        <p className="text-slate-400 text-sm mb-4">
                            Facing a plumbing emergency in NZ? Call our nationwide toll-free hotline right now.
                        </p>
                        <a href="tel:0800845524" className="inline-block bg-sky-600 hover:bg-sky-500 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-lg">
                            📞 0800 845 524
                        </a>
                    </div>
                </div>
                
                <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
                    &copy; {new Date().getFullYear()} Village Plumbers NZ. All rights reserved. Registered Certified Plumbers, Gasfitters & Drainlayers.
                </div>
            </footer>
        </div>

      </body>
    </html>
  );
}
