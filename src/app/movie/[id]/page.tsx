import { getMovieDetails } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import Link from "next/link";
import TracklistButton from "@/components/TracklistButton";
import TrailerModal from "@/components/TrailerModal";
import { getTicketBookingLink, getAmazonPrimeLink } from "@/lib/affiliate";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const movie = await getMovieDetails(resolvedParams.id);
  if (!movie) return { title: 'Not Found' };
  
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Upcoming';
  
  // SEO Focus: Extract top 3 actors to include in the metadata so searches for "Actor + Movie" rank #1.
  const topCast = movie.credits?.cast?.slice(0, 3).map((c: any) => c.name).join(", ") || "";
  const castString = topCast ? ` Starring ${topCast}.` : "";
  
  return {
    title: `${movie.title} (${releaseYear}) - Release Date, Cast, Trailer & Where to Watch`,
    description: `Get the latest updates for ${movie.title}.${castString} Discover the release date, full cast, roles, and where to book tickets or watch online.`,
    keywords: `${movie.title}, ${movie.title} release date, ${movie.title} cast, watch ${movie.title}, upcoming movies, ${topCast}`,
    openGraph: {
      images: [`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`],
    },
  };
}

export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const movie = await getMovieDetails(resolvedParams.id);
  
  if (!movie) return notFound();

  const releaseYear = new Date(movie.release_date).getFullYear() || 'TBA';
  const isUpcoming = new Date(movie.release_date) > new Date();

  // Find official YouTube Trailer
  const trailer = movie.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube') || movie.videos?.results?.[0];
  const trailerKey = trailer?.site === 'YouTube' ? trailer.key : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title,
    image: `https://image.tmdb.org/t/p/w1280${movie.poster_path}`,
    description: movie.overview,
    datePublished: movie.release_date,
    director: movie.credits?.crew?.filter((c: any) => c.job === 'Director').map((d: any) => ({
      '@type': 'Person',
      name: d.name
    })),
    actor: movie.credits?.cast?.slice(0, 5).map((a: any) => ({
      '@type': 'Person',
      name: a.name
    }))
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Backdrop Segment */}
      <div className="relative w-full h-[50vh] md:h-[65vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})` }}
        />
        {/* Premium multi-layered gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/60 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 -mt-32 md:-mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          
          {/* Poster Box */}
          <div className="flex-shrink-0 mx-auto md:mx-0 w-48 md:w-72 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            {movie.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto object-cover" />
            ) : (
              <div className="w-full h-96 bg-gray-800 flex items-center justify-center text-gray-500">No Poster</div>
            )}
          </div>
          
          {/* Movie Details */}
          <div className="flex flex-col justify-end mt-4 md:mt-16 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 drop-shadow-xl tracking-tight">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm md:text-base text-gray-300 mb-6">
              <span className="font-semibold text-amber-500">{releaseYear}</span>
              <span>•</span>
              <span>{movie.runtime > 0 ? `${movie.runtime} min` : 'Approx. 140 min'}</span>
              <span>•</span>
              <div className="flex flex-wrap justify-center gap-2">
                {movie.genres?.map((g: any) => (
                  <span key={g.id} className="bg-gray-800/80 px-2 py-0.5 rounded border border-gray-700 text-xs backdrop-blur-sm">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-300 text-base md:text-lg max-w-3xl mb-10 leading-relaxed drop-shadow-md">
              {movie.overview || "No overview available."}
            </p>

              {/* Affiliate / Revenue Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
              {isUpcoming ? (
                <a 
                  href={getTicketBookingLink(movie.title)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-extrabold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center gap-2"
                >
                  🎟️ Book Tickets Now
                </a>
              ) : (
                <a 
                  href={getAmazonPrimeLink(movie.title)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2"
                >
                  ▶️ Watch on Amazon Prime
                </a>
              )}
              <TrailerModal videoKey={trailerKey} />
              <TracklistButton item={{ ...movie, media_type: 'movie' }} />
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-purple-500 w-1 h-6 rounded-full inline-block"></span> 
              Top Cast
            </h2>
            <div className="flex overflow-x-auto gap-6 pb-4 snap-x custom-scrollbar">
              {movie.credits.cast.slice(0, 12).map((actor: any) => (
                <Link href={`/person/${actor.id}`} key={actor.id} className="flex-none w-28 md:w-32 snap-start group text-center">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-3 border-2 border-gray-800 group-hover:border-amber-500 transition-colors mx-auto shadow-lg">
                    {actor.profile_path ? (
                      <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-xs text-gray-500">No Image</div>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-200 truncate group-hover:text-amber-500 transition-colors">{actor.name}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{actor.character}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
