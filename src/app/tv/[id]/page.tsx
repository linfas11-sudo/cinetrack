import { getSeriesDetails } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import Link from "next/link";
import TracklistButton from "@/components/TracklistButton";
import TrailerModal from "@/components/TrailerModal";
import { getNetflixLink } from "@/lib/affiliate";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const series = await getSeriesDetails(resolvedParams.id);
  if (!series) return { title: 'Not Found' };
  
  const releaseYear = series.first_air_date ? new Date(series.first_air_date).getFullYear() : 'Upcoming';
  
  const topCast = series.credits?.cast?.slice(0, 3).map((c: any) => c.name).join(", ") || "";
  const castString = topCast ? ` Starring ${topCast}.` : "";
  
  return {
    title: `${series.name} (${releaseYear}) - Web Series Details, Cast & Episodes`,
    description: `Get the latest updates for ${series.name}.${castString} Discover the cast, seasons, episodes, and where to watch online.`,
    keywords: `${series.name}, ${series.name} web series, ${series.name} cast, watch ${series.name}, indian web series, ${topCast}`,
    openGraph: {
      images: [`https://image.tmdb.org/t/p/w1280${series.backdrop_path}`],
    },
  };
}

export default async function SeriesDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const series = await getSeriesDetails(resolvedParams.id);
  
  if (!series) return notFound();

  const releaseYear = series.first_air_date ? new Date(series.first_air_date).getFullYear() : 'TBA';
  const isUpcoming = series.first_air_date ? new Date(series.first_air_date) > new Date() : false;

  // Find official YouTube Trailer
  const trailer = series.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube') || series.videos?.results?.[0];
  const trailerKey = trailer?.site === 'YouTube' ? trailer.key : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TVSeries',
    name: series.name,
    image: `https://image.tmdb.org/t/p/w1280${series.poster_path}`,
    description: series.overview,
    startDate: series.first_air_date,
    numberOfSeasons: series.number_of_seasons,
    numberOfEpisodes: series.number_of_episodes,
    actor: series.credits?.cast?.slice(0, 5).map((a: any) => ({
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
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path || series.poster_path})` }}
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
            {series.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={series.name} className="w-full h-auto object-cover" />
            ) : (
              <div className="w-full h-96 bg-gray-800 flex items-center justify-center text-gray-500">No Poster</div>
            )}
          </div>
          
          {/* Series Details */}
          <div className="flex flex-col justify-end mt-4 md:mt-16 text-center md:text-left">
            <span className="text-amber-500 font-bold tracking-widest text-sm uppercase mb-2">Web Series • {series.number_of_seasons} Seasons</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 drop-shadow-xl tracking-tight">
              {series.name}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm md:text-base text-gray-300 mb-6">
              <span className="font-semibold">{releaseYear}</span>
              <span>•</span>
              <div className="flex flex-wrap justify-center gap-2">
                {series.genres?.map((g: any) => (
                  <span key={g.id} className="bg-gray-800/80 px-2 py-0.5 rounded border border-gray-700 text-xs backdrop-blur-sm">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-300 text-base md:text-lg max-w-3xl mb-10 leading-relaxed drop-shadow-md">
              {series.overview || "No overview available."}
            </p>

            {/* Affiliate / Revenue Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
              {isUpcoming ? (
                <a 
                  href={getNetflixLink(series.name)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-pink-600 hover:bg-pink-500 text-white font-extrabold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(219,39,119,0.4)] flex items-center gap-2"
                >
                  🔔 Remind Me (Affiliate)
                </a>
              ) : (
                <a 
                  href={getNetflixLink(series.name)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-500 text-white font-extrabold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center gap-2"
                >
                  ▶️ Watch on Netflix
                </a>
              )}
              <TrailerModal videoKey={trailerKey} />
              <TracklistButton item={{ ...series, media_type: 'tv' }} />
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {series.credits?.cast && series.credits.cast.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-purple-500 w-1 h-6 rounded-full inline-block"></span> 
              Top Cast
            </h2>
            <div className="flex overflow-x-auto gap-6 pb-4 snap-x custom-scrollbar">
              {series.credits.cast.slice(0, 12).map((actor: any) => (
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
