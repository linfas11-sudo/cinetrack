import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about CineTrack India and our mission to provide the best tracking experience for Indian cinema.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[70vh]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 border-b border-gray-800 pb-4">
        About <span className="text-amber-500">Us</span>
      </h1>
      
      <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
        <p>
          Welcome to <strong className="text-white">CineTrack India</strong>, your ultimate destination for everything related to Indian cinema and web series.
        </p>
        
        <p>
          We created this platform because we understand how hard it can be to keep track of the rapidly growing entertainment industry in India. From massive Bollywood blockbusters to gripping regional cinema in Tollywood, Kollywood, and Mollywood, to the booming OTT web series market—we wanted one centralized hub where fans could track it all.
        </p>
        
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our Mission</h2>
        <p>
          Our mission is simple: To provide movie enthusiasts with real-time updates, release dates, cast information, and official trailers in one sleek, easy-to-use platform. We believe that tracking your favorite actors and upcoming movies should be as entertaining as watching them.
        </p>
        
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data & Accuracy</h2>
        <p>
          We pull our comprehensive database using the TMDB (The Movie Database) API, ensuring that our catalog is constantly updated by a global community of movie lovers.
        </p>
      </div>
    </div>
  );
}
