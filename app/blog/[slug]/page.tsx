import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import articlesData from '../../../data/articles.json';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const foundArticle = (articlesData || []).find((a: any) => a.slug === resolvedParams.slug);

  if (!foundArticle) {
    return {
      title: "Article Not Found | Village Plumbers NZ",
      description: "The requested article could not be found."
    };
  }

  return {
    title: `${foundArticle.title} | Village Plumbers NZ`,
    description: foundArticle.excerpt,
    alternates: {
      canonical: `https://villageplumbers.co.nz/blog/${foundArticle.slug}`,
    },
    openGraph: {
      title: `${foundArticle.title} | Village Plumbers NZ`,
      description: foundArticle.excerpt,
      url: `https://villageplumbers.co.nz/blog/${foundArticle.slug}`,
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = (articlesData || []).find((a: any) => a.slug === resolvedParams.slug);

  if (!article) return notFound();

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-sky-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{article.title}</span>
        </nav>

        {/* Article Container */}
        <article className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-extrabold uppercase tracking-wider bg-sky-100 text-sky-800 px-3 py-1 rounded-full">
            {article.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-lg text-slate-600 font-medium mb-8 pb-6 border-b border-slate-100 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
            {article.content.split('\n\n').map((paragraph: string, idx: number) => {
              if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-2xl font-bold text-slate-900 mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
              }
              return <p key={idx}>{paragraph}</p>;
            })}
          </div>

          {/* Internal Links Box */}
          <div className="mt-12 pt-8 border-t border-slate-200 bg-slate-50 p-6 rounded-2xl">
            <h3 className="font-bold text-slate-900 mb-3 text-base">Related Service & Locations</h3>
            <div className="flex flex-wrap gap-3">
              {article.serviceLink && (
                <Link href={article.serviceLink} className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-all">
                  🔧 {article.serviceName || 'View Service Page'}
                </Link>
              )}
              {article.regionalHub && (
                <Link href={article.regionalHub} className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-all">
                  📍 {article.regionalHubName || 'Regional Hub'}
                </Link>
              )}
              {article.locationLinks?.map((loc: any, i: number) => (
                <Link key={i} href={loc.url} className="bg-white border border-slate-300 hover:border-sky-500 text-slate-800 font-semibold text-xs px-3.5 py-2 rounded-lg transition-all">
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>

        </article>

      </div>
    </div>
  );
}
