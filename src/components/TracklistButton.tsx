'use client';
import { useTracklist } from '@/hooks/useTracklist';
import { MediaItem } from '@/lib/tmdb';
import { useEffect, useState } from 'react';

export default function TracklistButton({ item }: { item: MediaItem }) {
  const { toggleItem, isTracked, isLoaded } = useTracklist();
  const [tracked, setTracked] = useState(false);

  // Sync with localStorage state safely to avoid hydration mismatches
  useEffect(() => {
    if (isLoaded) {
      setTracked(isTracked(item.id, item.media_type));
    }
  }, [isLoaded, isTracked, item.id, item.media_type]);

  const handleClick = () => {
    toggleItem(item);
    setTracked(!tracked);
  };

  // Avoid rendering mismatched HTML on first load
  if (!isLoaded) {
    return (
      <button className="bg-gray-800 text-white border-gray-700 font-bold px-8 py-3.5 rounded-full transition-all border opacity-50 cursor-not-allowed">
        Loading...
      </button>
    );
  }

  return (
    <button 
      onClick={handleClick}
      className={`font-bold px-8 py-3.5 rounded-full transition-all shadow-lg flex items-center gap-2 border ${
        tracked 
          ? 'bg-amber-500 text-gray-950 border-amber-500 hover:bg-amber-400' 
          : 'bg-gray-800 text-white border-gray-700 hover:border-gray-500 hover:bg-gray-700'
      }`}
    >
      {tracked ? '⭐ Saved to Tracklist' : '⭐ Add to Tracklist'}
    </button>
  );
}
