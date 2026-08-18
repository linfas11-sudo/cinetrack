import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight text-amber-500 hover:text-amber-400">
          CineTrack <span className="text-sm font-normal text-gray-300">India</span>
        </Link>
        <div className="flex items-center gap-6">
          
          <SearchBar />
          
          <Link href="/blog" className="text-sm font-semibold hover:text-amber-500 transition-colors">
            Blog & News
          </Link>
          
          <Link href="/favorites" className="text-sm font-semibold hover:text-amber-500 transition-colors">
            My Tracklist
          </Link>
        </div>
      </div>
    </header>
  );
}
