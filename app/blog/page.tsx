import Link from 'next/link';
import articlesData from '../../data/articles.json';

export const metadata = {
  title: "Blog & Plumbing Guides | Village Plumbers NZ",
  description: 'Technical insights, maintenance guides, and compliance advice for New Zealand homeowners and businesses.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: "Blog & Plumbing Guides | Village Plumbers NZ",
    description: 'Technical insights, maintenance guides, and compliance advice for New Zealand homeowners and businesses.',
    url: 'https://villageplumbers.co.nz/blog',
  }
};

export default function BlogPage() {
  const posts = articlesData || [];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pb-20">
      
      {/* Hero Banner */}
      <section className="relative py-20 px-4 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-sky-500/20 text-sky-300 px-4 py-1 rounded-full text-xs font-bold mb-4 border border-sky-400/30">
            🇳🇿 NZ PLUMBING & DRAINLAYING KNOWLEDGE BASE
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Blog & Technical Guides
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Practical advice, maintenance tips, and PGDB compliance information for New Zealand homeowners.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider bg-sky-100 text-sky-800 px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-4 mb-2 hover:text-sky-600">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-sky-600 font-bold">
                  <Link href={`/blog/${post.slug}`}>Read Full Guide →</Link>
                  <span className="text-slate-400 font-normal">{post.wordCount} words</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center max-w-2xl mx-auto">
            <div className="text-5xl mb-4">📰</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Plumbing Guides Coming Soon</h2>
            <p className="text-slate-600 text-sm mb-6">
              Our team is preparing expert NZ plumbing, gasfitting, and drainlaying guides. Check back soon or browse our 25 Core Services.
            </p>
            <Link href="/#core-services" className="inline-block bg-sky-600 hover:bg-sky-500 text-white font-bold px-6 py-3 rounded-xl transition-all">
              Browse 25 Core Services
            </Link>
          </div>
        )}
      </section>

    </div>
  );
}
