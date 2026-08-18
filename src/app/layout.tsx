import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://indian-cinema-tracker.vercel.app'),
  title: {
    default: "CineTrack India - Upcoming Indian Movies & Web Series",
    template: "%s | CineTrack India",
  },
  description: "Track upcoming Indian movies, web series, Bollywood, Tollywood, OTT releases, and your favorite actors.",
  keywords: ["Indian movies", "upcoming Bollywood movies", "upcoming Tollywood movies", "Indian web series", "OTT releases India"],
  openGraph: {
    title: "CineTrack India - Upcoming Indian Movies & Web Series",
    description: "Track upcoming Indian movies, web series, Bollywood, Tollywood, OTT releases, and your favorite actors.",
    url: '/',
    siteName: 'CineTrack India',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CineTrack India - Upcoming Indian Movies & Web Series",
    description: "Track upcoming Indian movies, web series, Bollywood, Tollywood, OTT releases, and your favorite actors.",
  },
  verification: {
    google: "C2i5nyJkRB2wkzue1UMMxN63iCINbHhZslDIuRZBi5M",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
