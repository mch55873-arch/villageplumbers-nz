import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import articlesData from '../../../data/articles.json';

export async function generateStaticParams() {
  return (articlesData || []).map((art: any) => ({
    slug: art.slug,
  }));
}

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

// Markdown parser helper for H1, H2, H3, H4, Tables, Ordered/Unordered Lists, Links and Paragraphs
function renderMarkdownContent(content: string) {
  const blocks = content.split(/\n\n+/);

  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // H1 Header
    if (trimmed.startsWith('# ')) {
      return (
        <h1 key={`h1-${idx}`} className="text-3xl md:text-5xl font-black text-slate-900 mt-10 mb-6 leading-tight">
          {trimmed.replace(/^#\s+/, '')}
        </h1>
      );
    }

    // H2 Header
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={`h2-${idx}`} className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-10 mb-4 pt-6 border-t border-slate-200">
          {trimmed.replace(/^##\s+/, '')}
        </h2>
      );
    }

    // H3 Header
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={`h3-${idx}`} className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-3">
          {trimmed.replace(/^###\s+/, '')}
        </h3>
      );
    }

    // H4 Header
    if (trimmed.startsWith('#### ')) {
      return (
        <h4 key={`h4-${idx}`} className="text-lg font-bold text-slate-900 mt-6 mb-2">
          {trimmed.replace(/^####\s+/, '')}
        </h4>
      );
    }

    // Table Parser (| header | header |)
    if (trimmed.includes('|') && trimmed.includes('\n')) {
      const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length >= 2 && lines[0].startsWith('|') && lines[1].includes('---')) {
        const parseRow = (rowStr: string) => 
          rowStr.split('|').map(c => c.trim()).filter((c, i, arr) => !(i === 0 && c === '') && !(i === arr.length - 1 && c === ''));

        const headers = parseRow(lines[0]);
        const dataRows = lines.slice(2).map(parseRow);

        return (
          <div key={`table-${idx}`} className="my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm text-slate-700 border-collapse">
              <thead className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                <tr>
                  {headers.map((h, i) => (
                    <th key={`th-${i}`} className="px-5 py-4 border-b border-slate-800">
                      {renderInlineFormatting(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dataRows.map((row, rIdx) => (
                  <tr key={`tr-${rIdx}`} className={rIdx % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/70 hover:bg-slate-100/70'}>
                    {row.map((cell, cIdx) => (
                      <td key={`td-${cIdx}`} className="px-5 py-3.5 text-slate-800 font-medium">
                        {renderInlineFormatting(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }

    // Ordered / Numbered List (1. Item 1 \n 2. Item 2 OR "1. Step one. 2. Step two.")
    if (/^\d+\.\s/.test(trimmed) || (trimmed.includes('1.') && trimmed.includes('2.') && trimmed.includes('3.'))) {
      let items: string[] = [];
      if (trimmed.includes('\n')) {
        items = trimmed.split('\n').map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
      } else {
        items = trimmed.split(/\s*(?=\d+\.\s*)/).map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
      }

      if (items.length > 1) {
        return (
          <ol key={`ol-${idx}`} className="space-y-3 my-6">
            {items.map((item, i) => (
              <li key={`ol-item-${idx}-${i}`} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  {i + 1}
                </span>
                <span className="text-slate-800 text-base leading-relaxed font-medium">
                  {renderInlineFormatting(item)}
                </span>
              </li>
            ))}
          </ol>
        );
      }
    }

    // Unordered List (- or *)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = trimmed.split(/\n/).map(line => line.replace(/^[-*]\s+/, '').trim());
      return (
        <ul key={`ul-${idx}`} className="space-y-2 my-4 pl-4 border-l-2 border-emerald-400">
          {items.map((item, i) => (
            <li key={`li-${idx}-${i}`} className="text-slate-700 text-base leading-relaxed flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>{renderInlineFormatting(item)}</span>
            </li>
          ))}
        </ul>
      );
    }

    // Standard Paragraph
    return (
      <p key={`p-${idx}`} className="text-slate-700 text-base leading-relaxed my-4">
        {renderInlineFormatting(trimmed)}
      </p>
    );
  });
}

// Inline Markdown formatter for links [text](/url) and bold **text**
function renderInlineFormatting(text: string) {
  const parts: (string | React.ReactNode)[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const label = match[1];
    const url = match[2];

    parts.push(
      <Link 
        key={`link-${match.index}`} 
        href={url} 
        className="text-emerald-600 font-bold hover:underline"
      >
        {label}
      </Link>
    );

    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = (articlesData || []).find((a: any) => a.slug === resolvedParams.slug);

  if (!article) return notFound();

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-8 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{article.title}</span>
        </nav>

        {/* Article Container */}
        <article className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full border border-emerald-200">
            {article.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-500 pb-6 border-b border-slate-100 mb-8">
            <span>🇳🇿 NZ Trade Guide</span>
            <span>•</span>
            <span>{article.wordCount || 1000} Words</span>
            <span>•</span>
            <span>PGDB Verified</span>
          </div>

          <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed italic bg-slate-50 p-6 rounded-2xl border-l-4 border-emerald-400">
            {article.excerpt}
          </p>

          {/* Structured Markdown Body */}
          <div className="prose prose-slate max-w-none">
            {renderMarkdownContent(article.content)}
          </div>

          {/* Internal Links Box */}
          <div className="mt-12 pt-8 border-t border-slate-200 bg-slate-50 p-8 rounded-3xl">
            <h3 className="font-bold text-slate-900 mb-4 text-base">Related Service & Regional Links</h3>
            <div className="flex flex-wrap gap-3">
              {article.serviceLink && (
                <Link href={article.serviceLink} className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm">
                  🔧 {article.serviceName || 'View Service Page'}
                </Link>
              )}
              {article.regionalHub && (
                <Link href={article.regionalHub} className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all">
                  📍 {article.regionalHubName || 'Regional Hub'}
                </Link>
              )}
              {article.locationLinks?.map((loc: any, i: number) => (
                <Link key={i} href={loc.url} className="bg-white border border-slate-300 hover:border-emerald-500 text-slate-800 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all">
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
