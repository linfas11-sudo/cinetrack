'use client';
import { MediaItem } from "@/lib/tmdb";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroCarousel({ items }: { items: MediaItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, [items]);

  if (!items || items.length === 0) return null;
  const current = items[currentIndex];
  const title = current.title || current.name;

  return (
    <div className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] rounded-2xl overflow-hidden mb-12 shadow-2xl group border border-gray-800">
      {/* Background Image with smooth crossfade */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
        style={{ 
          backgroundImage: `url(https://image.tmdb.org/t/p/original${current.backdrop_path || current.poster_path})` 
        }}
      />
      
      {/* Premium Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/60 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
        <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-500 border border-amber-500/30 text-xs font-bold rounded-full mb-4 uppercase tracking-widest backdrop-blur-sm">
          #{currentIndex + 1} Trending
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-xl">
          {title}
        </h1>
        <p className="text-gray-300 text-sm md:text-lg mb-8 line-clamp-2 md:line-clamp-3 drop-shadow-md">
          {current.overview || "Click to view full details, cast, and release dates."}
        </p>
        <div className="flex gap-4">
          <Link 
            href={`/${current.media_type}/${current.id}`}
            className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold px-8 py-3 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-10">
        {items.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-amber-500' : 'w-2 bg-gray-500/50 hover:bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
}
