import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for CineTrack India.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[70vh]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 border-b border-gray-800 pb-4">
        Privacy <span className="text-amber-500">Policy</span>
      </h1>
      
      <div className="space-y-6 text-gray-300 text-base leading-relaxed prose prose-invert max-w-none">
        <p><strong>Last updated: August 17, 2026</strong></p>
        
        <p>
          At CineTrack India, accessible from https://indian-cinema-tracker.vercel.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CineTrack India and how we use it.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Information We Collect</h2>
        <p>
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
        </p>
        <p>
          If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Log Files</h2>
        <p>
          CineTrack India follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Cookies and Web Beacons</h2>
        <p>
          Like any other website, CineTrack India uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Google DoubleClick DART Cookie</h2>
        <p>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Third Party Privacy Policies</h2>
        <p>
          CineTrack India's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
        </p>
      </div>
    </div>
  );
}
