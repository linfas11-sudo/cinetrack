import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the CineTrack India team for support, partnerships, or general inquiries.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[70vh]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 border-b border-gray-800 pb-4">
        Contact <span className="text-amber-500">Us</span>
      </h1>
      
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">We'd love to hear from you!</h2>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          Whether you have a question about a feature, want to report a bug, or are interested in advertising and partnership opportunities, our team is ready to answer all your questions.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
              📧
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Email Support</h3>
              <p className="text-gray-400">For general inquiries and support:</p>
              <a href="mailto:support@cinetrackindia.com" className="text-amber-500 hover:text-amber-400 font-semibold text-lg">
                support@cinetrackindia.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
              🤝
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Business & Partnerships</h3>
              <p className="text-gray-400">For advertising and business proposals:</p>
              <a href="mailto:business@cinetrackindia.com" className="text-amber-500 hover:text-amber-400 font-semibold text-lg">
                business@cinetrackindia.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            Please allow up to 48 hours for a response from our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
