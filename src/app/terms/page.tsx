import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and Conditions for using CineTrack India.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[70vh]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 border-b border-gray-800 pb-4">
        Terms of <span className="text-amber-500">Service</span>
      </h1>
      
      <div className="space-y-6 text-gray-300 text-base leading-relaxed prose prose-invert max-w-none">
        <p><strong>Last updated: August 17, 2026</strong></p>
        
        <p>
          Welcome to CineTrack India! By accessing this website we assume you accept these terms and conditions. Do not continue to use CineTrack India if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Cookies</h2>
        <p>
          We employ the use of cookies. By accessing CineTrack India, you agreed to use cookies in agreement with our Privacy Policy.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">License</h2>
        <p>
          Unless otherwise stated, CineTrack India and/or its licensors own the intellectual property rights for all material on CineTrack India. All intellectual property rights are reserved. You may access this from CineTrack India for your own personal use subjected to restrictions set in these terms and conditions.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Content Liability</h2>
        <p>
          We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data Source (TMDB)</h2>
        <p>
          This product uses the TMDB API but is not endorsed or certified by TMDB. We do not claim ownership of any movie posters, backdrops, or cast photography displayed on this site.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Affiliate Disclaimer</h2>
        <p>
          Some of the links on this website are affiliate links. This means if you click on the link and purchase the item (such as a movie ticket or a streaming subscription), we will receive an affiliate commission at no extra cost to you.
        </p>
      </div>
    </div>
  );
}
