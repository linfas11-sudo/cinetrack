const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface MediaItem {
  id: number;
  title?: string;
  name?: string; // TV shows and people use 'name' instead of 'title'
  poster_path?: string;
  profile_path?: string; // People use profile_path
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  first_air_date?: string; // TV shows use first_air_date
  vote_average?: number;
  media_type: 'movie' | 'tv' | 'person';
}

// Helper to get language code based on user filter
const getLangCode = (category: string) => {
  switch(category) {
    case 'hindi': return 'hi';
    case 'telugu': return 'te';
    case 'tamil': return 'ta';
    case 'malayalam': return 'ml';
    case 'hollywood': return 'en';
    default: return '';
  }
};

export async function getMovies(category: string): Promise<MediaItem[]> {
  const lang = getLangCode(category);
  const today = new Date().toISOString().split('T')[0];
  
  // SEO FOCUS: Fetch strictly UPCOMING movies (future release date) or highly anticipated ones.
  const url = lang 
    ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=${lang}&primary_release_date.gte=${today}&sort_by=popularity.desc`
    : `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${today}&sort_by=popularity.desc`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    return (data.results || []).map((item: any) => ({ ...item, media_type: 'movie' })).slice(0, 15);
  } catch (e) {
    return [];
  }
}

export async function getSeries(category: string): Promise<MediaItem[]> {
  const lang = getLangCode(category);
  const url = lang 
    ? `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=${lang}&sort_by=popularity.desc`
    : `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`;
    
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    return (data.results || []).map((item: any) => ({ ...item, media_type: 'tv' })).slice(0, 15);
  } catch (e) {
    return [];
  }
}

export async function getTrendingActors(): Promise<MediaItem[]> {
  // Actors trending globally
  const url = `${BASE_URL}/trending/person/week?api_key=${API_KEY}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    return (data.results || []).map((item: any) => ({ ...item, media_type: 'person' })).slice(0, 15);
  } catch (e) {
    return [];
  }
}

export async function getMovieDetails(id: string) {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) { return null; }
}

export async function getSeriesDetails(id: string) {
  const url = `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) { return null; }
}

export async function getPersonDetails(id: string) {
  const url = `${BASE_URL}/person/${id}?api_key=${API_KEY}&append_to_response=combined_credits`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) { return null; }
}
