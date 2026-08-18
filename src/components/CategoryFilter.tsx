'use client';
import { useRouter } from 'next/navigation';

export default function CategoryFilter({ currentCategory }: { currentCategory: string }) {
  const router = useRouter();

  return (
    <select 
      value={currentCategory}
      onChange={(e) => router.push(`/?category=${e.target.value}`)}
      className="bg-gray-900 border border-gray-800 text-white rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer text-sm md:text-base"
    >
      <option value="global">Global Trending</option>
      <option value="hindi">Bollywood (Hindi)</option>
      <option value="telugu">Tollywood (Telugu)</option>
      <option value="tamil">Kollywood (Tamil)</option>
      <option value="malayalam">Mollywood (Malayalam)</option>
      <option value="hollywood">Hollywood (English)</option>
    </select>
  );
}
