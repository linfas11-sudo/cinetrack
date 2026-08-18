'use client';

import { useState } from 'react';

export default function TrailerModal({ videoKey }: { videoKey: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!videoKey) return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-gray-800/80 hover:bg-gray-700 text-white font-bold px-6 py-3.5 rounded-full transition-all hover:scale-105 border border-gray-600 backdrop-blur-sm shadow-lg flex items-center gap-2"
      >
        🎬 Watch Trailer
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
