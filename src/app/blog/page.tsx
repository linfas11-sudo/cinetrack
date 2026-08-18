import { blogPosts } from '@/lib/blogData';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & News - Indian Cinema Updates',
  description: 'Read the latest original articles, analysis, and reviews about Bollywood, Tollywood, and Indian OTT platforms.',
};

export default function BlogIndexPage() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-xl tracking-tight">
          CineTrack <span className="text-amber-500">Blog</span>
        </h1>
        <p className="text-gray-400 text-lg">Original analysis, reviews, and news from the world of Indian Cinema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:border-amber-500 transition-colors group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
            </div>
            <div className="p-6">
              <p className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-2">{post.date}</p>
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <span className="text-amber-500 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Article &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
