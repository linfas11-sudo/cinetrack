import { getPersonDetails } from "@/lib/tmdb";
import { getWikipediaBiography } from "@/lib/wikipedia";
import { notFound } from "next/navigation";
import Link from "next/link";
import TracklistButton from "@/components/TracklistButton";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const person = await getPersonDetails(resolvedParams.id);
  if (!person) return { title: 'Not Found' };
  
  return {
    title: `${person.name} - Upcoming Movies, Series, and Full Profile`,
    description: `See what ${person.name} is working on next. Explore their upcoming movies, recent roles, and full biography.`,
    keywords: `${person.name}, ${person.name} upcoming movies, ${person.name} next movie, ${person.name} biography, cast`,
  };
}

export default async function PersonDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const person = await getPersonDetails(resolvedParams.id);
  
  if (!person) return notFound();

  // Sort credits by popularity for "Known For"
  const knownFor = person.combined_credits?.cast
    ?.sort((a: any, b: any) => b.vote_count - a.vote_count)
    .slice(0, 10) || [];
    
  // SEO FOCUS: Extract Upcoming Roles!
  const today = new Date();
  const upcomingRoles = person.combined_credits?.cast?.filter((item: any) => {
    const date = item.release_date || item.first_air_date;
    if (!date) return true; // TBA dates are usually upcoming
    return new Date(date) > today;
  }).sort((a: any, b: any) => {
     // Sort TBA to the end, nearest dates first
     const dateA = a.release_date || a.first_air_date;
     const dateB = b.release_date || b.first_air_date;
     if (!dateA) return 1;
     if (!dateB) return -1;
     return new Date(dateA).getTime() - new Date(dateB).getTime();
  }).slice(0, 10) || [];

  // SEO FOCUS: Long-tail content injection via Wikipedia
  let finalBiography = person.biography;
  let bioSource = 'tmdb';
  
  if (!finalBiography || finalBiography.length < 50) {
    const wikiBio = await getWikipediaBiography(person.name);
    if (wikiBio) {
      finalBiography = wikiBio;
      bioSource = 'wikipedia';
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    image: person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : undefined,
    description: finalBiography,
    birthDate: person.birthday,
    birthPlace: person.place_of_birth,
    knowsAbout: person.known_for_department,
    url: `https://cinetrackindia.com/person/${person.id}`
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Main Content Area */}
      <div className="container mx-auto px-4 pt-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          
          {/* Profile Photo */}
          <div className="flex-shrink-0 mx-auto md:mx-0 w-48 md:w-72 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            {person.profile_path ? (
              <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} className="w-full h-auto object-cover" />
            ) : (
              <div className="w-full h-96 bg-gray-800 flex items-center justify-center text-gray-500">No Photo</div>
            )}
          </div>
          
          {/* Person Details */}
          <div className="flex flex-col justify-start text-center md:text-left pt-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 drop-shadow-xl tracking-tight">
              {person.name}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm md:text-base text-gray-300 mb-6">
              <span className="font-semibold text-amber-500">{person.known_for_department}</span>
              {person.place_of_birth && (
                <>
                  <span>•</span>
                  <span>{person.place_of_birth}</span>
                </>
              )}
            </div>

            <p className="text-gray-300 text-base md:text-lg max-w-3xl mb-4 leading-relaxed">
              {finalBiography ? finalBiography.split('\n\n')[0] : "No biography available."}
            </p>
            {bioSource === 'wikipedia' && (
              <p className="text-xs text-gray-500 mb-8 max-w-3xl">
                Source: <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(person.name)}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 underline">Wikipedia</a> (Licensed under CC BY-SA 4.0)
              </p>
            )}
            {bioSource === 'tmdb' && (
              <div className="mb-8" />
            )}

            {/* Favorite Button */}
            <div className="flex justify-center md:justify-start mb-8">
              <TracklistButton item={{ ...person, media_type: 'person' }} />
            </div>
          </div>
        </div>

        {/* Upcoming Roles Section (SEO Focus) */}
        {upcomingRoles.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-red-500 w-1 h-6 rounded-full inline-block"></span> 
              {person.name}'s Upcoming Movies & Roles
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x custom-scrollbar">
              {upcomingRoles.map((item: any) => {
                const title = item.title || item.name;
                const date = item.release_date || item.first_air_date;
                const year = date ? new Date(date).getFullYear() : 'TBA';
                return (
                  <Link href={`/${item.media_type}/${item.id}`} key={`upcoming-${item.id}`} className="flex-none w-36 md:w-48 bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-red-900/50 hover:border-red-500 transition-colors group snap-start relative">
                    <div className="relative h-52 md:h-72 bg-gray-800 overflow-hidden flex items-center justify-center">
                      {item.poster_path ? (
                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="text-gray-500 text-xs md:text-sm text-center px-2">No Image</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
                    </div>
                    <div className="absolute bottom-0 w-full p-3 z-10">
                      <h3 className="font-bold text-gray-100 text-sm truncate drop-shadow-md">{title}</h3>
                      <p className="text-xs text-red-400 mt-0.5 font-semibold drop-shadow-md">Role: {item.character || 'TBA'}</p>
                      <p className="text-xs text-gray-400 mt-0.5 drop-shadow-md">Releasing: {year}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Known For Section */}
        {knownFor.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-amber-500 w-1 h-6 rounded-full inline-block"></span> 
              Best Movies Featuring {person.name}
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x custom-scrollbar">
              {knownFor.map((item: any) => {
                const title = item.title || item.name;
                const date = item.release_date || item.first_air_date;
                const year = date ? new Date(date).getFullYear() : 'TBA';
                return (
                  <Link href={`/${item.media_type}/${item.id}`} key={item.id} className="flex-none w-36 md:w-48 bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-amber-500 transition-colors group snap-start relative">
                    <div className="relative h-52 md:h-72 bg-gray-800 overflow-hidden flex items-center justify-center">
                      {item.poster_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt={title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-gray-500 text-xs md:text-sm text-center px-2">No Image</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
                    </div>
                    <div className="absolute bottom-0 w-full p-3 z-10">
                      <h3 className="font-bold text-gray-100 text-sm truncate drop-shadow-md">{title}</h3>
                      <p className="text-xs text-amber-500 mt-0.5 font-semibold drop-shadow-md">{year}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
