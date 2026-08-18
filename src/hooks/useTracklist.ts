'use client';
import { useState, useEffect } from 'react';
import { MediaItem } from '@/lib/tmdb';

export function useTracklist() {
  const [tracklist, setTracklist] = useState<MediaItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cinetrack_favorites');
    if (stored) {
      try {
        setTracklist(JSON.parse(stored));
      } catch (e) { console.error(e); }
    }
    setIsLoaded(true);
  }, []);

  const toggleItem = (item: MediaItem) => {
    setTracklist((prev) => {
      const exists = prev.some((i) => i.id === item.id && i.media_type === item.media_type);
      let newList;
      if (exists) {
        newList = prev.filter((i) => !(i.id === item.id && i.media_type === item.media_type));
      } else {
        newList = [...prev, item];
      }
      localStorage.setItem('cinetrack_favorites', JSON.stringify(newList));
      return newList;
    });
  };

  const isTracked = (id: number, media_type: string) => {
    return tracklist.some((i) => i.id === id && i.media_type === media_type);
  };

  return { tracklist, toggleItem, isTracked, isLoaded };
}
