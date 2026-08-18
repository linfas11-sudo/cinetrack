'use server';

import { MediaItem } from "@/lib/tmdb";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function searchTMDB(query: string): Promise<MediaItem[]> {
  if (!query) return [];
  
  // search/multi searches for movies, tv shows, and people simultaneously
  const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    // Filter out people without images to keep the UI looking premium
    const filteredResults = data.results.filter((item: any) => {
      if (item.media_type === 'person' && !item.profile_path) return false;
      return true;
    });

    return filteredResults.slice(0, 8); // Return top 8 results for the dropdown
  } catch (error) {
    console.error("Search API Error:", error);
    return [];
  }
}
