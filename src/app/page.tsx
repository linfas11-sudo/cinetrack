import { getMovies, getSeries, getTrendingActors, MediaItem } from "@/lib/tmdb";
import CategoryFilter from "@/components/CategoryFilter";
import HeroCarousel from "@/components/HeroCarousel";
import Link from "next/link";

function MediaCard({ item }: { item: MediaItem }) {
  const isPerson = item.media_type === 'person';
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const imagePath = isPerson ? item.profile_path : item.poster_path;
  
  // Format year
  const year = date ? new Date(date).getFullYear() : 'TBA';

  return (
    <Link href={`/${item.media_type}/${item.id}`} className="flex-none w-36 md:w-48 bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-amber-500 transition-colors group snap-start relative">
      <div className="relative h-52 md:h-72 bg-gray-800 overflow-hidden flex items-center justify-center">
        {imagePath ? (
          <img 
            src={`https://image.tmdb.org/t/p/w500${imagePath}`}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-gray-500 text-xs md:text-sm text-center px-2">No Image</div>
        )}
        {/* Subtle premium gradient on cards */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
      </div>
      <div className="absolute bottom-0 w-full p-3 z-10">
        <h3 className="font-bold text-gray-100 text-sm truncate drop-shadow-md">{title}</h3>
        {!isPerson && <p className="text-xs text-amber-500 mt-0.5 font-semibold drop-shadow-md">{year}</p>}
        {isPerson && <p className="text-xs text-purple-400 mt-0.5 drop-shadow-md">Trending Actor</p>}
      </div>
    </Link>
  );
}

export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category || 'global';
  
  // Fetch everything at once!
  const [movies, series, actors] = await Promise.all([
    getMovies(category),
    getSeries(category),
    getTrendingActors()
  ]);

  return (
    <div className="container mx-auto px-4 py-6 overflow-hidden">
      
      {/* Premium Cinematic Hero Section */}
      <HeroCarousel items={movies.slice(0, 5)} />

      {/* Filter Row */}
      <div className="flex justify-end mb-6">
        <CategoryFilter currentCategory={category} />
      </div>

      {/* Movies Row */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="bg-amber-500 w-1 h-6 rounded-full inline-block"></span> 
          Upcoming Movies
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x custom-scrollbar">
          {movies.map(m => <MediaCard key={m.id} item={m} />)}
        </div>
      </section>

      {/* Web Series Row */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="bg-blue-500 w-1 h-6 rounded-full inline-block"></span> 
          Top Web Series
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x custom-scrollbar">
          {series.map(s => <MediaCard key={s.id} item={s} />)}
        </div>
      </section>

      {/* Actors Row */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="bg-purple-500 w-1 h-6 rounded-full inline-block"></span> 
          Trending Actors & Actresses
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x custom-scrollbar">
          {actors.map(a => <MediaCard key={a.id} item={a} />)}
        </div>
      </section>

    </div>
  );
}
