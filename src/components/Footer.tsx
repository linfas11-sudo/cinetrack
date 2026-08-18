import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8 border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} CineTrack India. All rights reserved.</p>
        <p className="text-xs max-w-xl mx-auto text-gray-500">
          Movie and series data provided by the TMDB API. This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
        <div className="mt-4 flex justify-center space-x-6 text-sm font-medium">
          <Link href="/about" className="hover:text-amber-500 transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
