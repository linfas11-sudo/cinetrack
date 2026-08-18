import { MetadataRoute } from 'next';
import { getMovies, getSeries, getTrendingActors } from '@/lib/tmdb';
import { blogPosts } from '@/lib/blogData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indian-cinema-tracker.vercel.app';

  // Core static pages
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/favorites`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    }
  ];

  // Blog posts
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Fetch some dynamic items for the sitemap (top 15 of each to seed Google)
  try {
    const [movies, series, actors] = await Promise.all([
      getMovies('all'),
      getSeries('all'),
      getTrendingActors()
    ]);

    const movieRoutes = movies.map((movie) => ({
      url: `${baseUrl}/movie/${movie.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    const seriesRoutes = series.map((show) => ({
      url: `${baseUrl}/tv/${show.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    const actorRoutes = actors.map((actor) => ({
      url: `${baseUrl}/person/${actor.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...routes, ...blogRoutes, ...movieRoutes, ...seriesRoutes, ...actorRoutes];
  } catch (error) {
    // Fallback if TMDB fails during build
    return [...routes, ...blogRoutes];
  }
}
