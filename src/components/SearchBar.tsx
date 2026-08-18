'use client';
import { useState, useEffect, useRef } from 'react';
import { searchTMDB } from '@/app/actions/search';
import { MediaItem } from '@/lib/tmdb';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MediaItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounced live search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const data = await searchTMDB(query);
      setResults(data);
      setIsOpen(true);
      setIsLoading(false);
    }, 300); // Wait 300ms after user stops typing to fetch

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="relative hidden md:block w-64 lg:w-96">
      
      {/* Search Input */}
      <div className="relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setIsOpen(true) }}
          placeholder="Search movies, actors, series..." 
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-700 text-white placeholder-gray-400 transition-all shadow-inner"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>
      
      {/* Premium Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full mt-3 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-50">
          {isLoading && <div className="p-6 text-center text-gray-400 text-sm animate-pulse">Searching the database...</div>}
          
          {!isLoading && results.length === 0 && (
            <div className="p-6 text-center text-gray-400 text-sm">No results found for "{query}".</div>
          )}
          
          {!isLoading && results.length > 0 && (
            <ul className="max-h-96 overflow-y-auto custom-scrollbar">
              {results.map((item) => {
                const year = (item.release_date || item.first_air_date) ? new Date(item.release_date || item.first_air_date as string).getFullYear() : '';
                return (
                  <li key={item.id} className="border-b border-gray-800 last:border-0">
                    <Link 
                      href={`/${item.media_type}/${item.id}`}
                      onClick={() => { setIsOpen(false); setQuery(''); }}
                      className="flex items-center gap-4 p-3 hover:bg-gray-800 transition-colors group"
                    >
                      <div className="w-12 h-16 bg-gray-950 rounded overflow-hidden flex-shrink-0 border border-gray-700 group-hover:border-amber-500 transition-colors">
                        {(item.poster_path || item.profile_path) ? (
                           <img src={`https://image.tmdb.org/t/p/w92${item.poster_path || item.profile_path}`} alt="" className="w-full h-full object-cover" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-600">N/A</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-200 truncate group-hover:text-amber-500 transition-colors">{item.title || item.name}</p>
                        <p className="text-xs text-gray-500 capitalize flex items-center gap-1 mt-0.5">
                          {item.media_type === 'movie' ? '🎬 Movie' : item.media_type === 'tv' ? '📺 TV Series' : '👤 Person'}
                          {year && <span>• {year}</span>}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
