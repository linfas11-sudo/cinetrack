'use client';
import { useTracklist } from '@/hooks/useTracklist';
import Link from 'next/link';
import { useState } from 'react';

export default function FavoritesPage() {
  const { tracklist, toggleItem, isLoaded } = useTracklist();
  const [activeTab, setActiveTab] = useState<'all' | 'movie' | 'tv' | 'person'>('all');

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading your tracklist...</div>;

  const filteredTracklist = activeTab === 'all' 
    ? tracklist 
    : tracklist.filter(item => item.media_type === activeTab);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-xl tracking-tight">
            My <span className="text-amber-500">Tracklist</span>
          </h1>
          <p className="text-gray-400 text-lg">Your personal collection of movies, series, and favorite actors.</p>
        </div>
        
        {/* Tabs */}
        {tracklist.length > 0 && (
          <div className="flex bg-gray-900 rounded-full p-1 border border-gray-800">
            {['all', 'movie', 'tv', 'person'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                  activeTab === tab 
                    ? 'bg-amber-500 text-gray-950 shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab === 'person' ? 'Actors' : tab === 'tv' ? 'Series' : tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {tracklist.length === 0 ? (
        <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-16 text-center shadow-2xl">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <span className="text-5xl block">🍿</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Your tracklist is empty</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg leading-relaxed">You haven't tracked any movies or actors yet. Search for your favorites and hit the "Track" button to build your collection!</p>
          <Link href="/" className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)] inline-block">
            Discover Content
          </Link>
        </div>
      ) : (
        <>
          {filteredTracklist.length === 0 ? (
            <div className="py-20 text-center text-gray-500 text-lg border-2 border-dashed border-gray-800 rounded-2xl">
              No items found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredTracklist.map((item) => (
                <div key={`${item.media_type}-${item.id}`} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-amber-500 transition-colors group relative">
                  <Link href={`/${item.media_type}/${item.id}`}>
                    <div className="relative h-64 md:h-80 bg-gray-800 overflow-hidden flex items-center justify-center">
                      {(item.poster_path || item.profile_path) ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`}
                          alt={item.title || item.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                      ) : (
                        <div className="text-gray-500 text-sm font-medium">No Image</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-90" />
                    </div>
                  </Link>
                  
                  {/* Remove Button Overlay */}
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleItem(item); }}
                    className="absolute top-3 right-3 bg-red-600/90 hover:bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg backdrop-blur-sm transform hover:scale-110"
                    title="Remove from tracklist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="absolute bottom-0 w-full p-4 z-10 pointer-events-none">
                    <h3 className="font-bold text-gray-50 text-base leading-tight mb-1 drop-shadow-md line-clamp-2">{item.title || item.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gray-800 text-amber-500 border border-gray-700 backdrop-blur-sm">
                        {item.media_type === 'person' ? 'Actor' : item.media_type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
