import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

// Generate static params for SEO and fast loading
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);
  if (!post) return { title: 'Not Found' };
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) return notFound();

  return (
    <article className="min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative w-full h-[40vh] md:h-[50vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-900/30" />
        
        <div className="absolute bottom-0 w-full">
          <div className="container mx-auto px-4 pb-12">
            <Link href="/blog" className="text-amber-500 font-semibold mb-6 inline-flex items-center gap-2 hover:text-amber-400">
              &larr; Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-xl tracking-tight max-w-4xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-300 text-sm md:text-base">
              <span className="font-medium bg-gray-800/80 px-3 py-1 rounded-full backdrop-blur-sm border border-gray-700">By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 pt-12">
        <div 
          className="prose prose-invert prose-lg max-w-3xl mx-auto prose-headings:text-white prose-a:text-amber-500 hover:prose-a:text-amber-400 prose-img:rounded-xl leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 mb-6">Did you enjoy this article? Share it with other movie lovers!</p>
          <div className="flex justify-center gap-4">
            <button className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold py-2 px-6 rounded-full transition-colors">
              Twitter
            </button>
            <button className="bg-[#4267B2] hover:bg-[#365899] text-white font-bold py-2 px-6 rounded-full transition-colors">
              Facebook
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
