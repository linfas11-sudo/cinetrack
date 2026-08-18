/**
 * Affiliate Link Generator
 * 
 * In a real production app, you would replace these tracking IDs with your real ones
 * from Amazon Associates, BookMyShow Partners, etc.
 */

const AMAZON_AFFILIATE_TAG = 'cinetrackindia-21';

export function getTicketBookingLink(movieTitle: string): string {
  // Deep link to BookMyShow search or similar ticketing platform
  const query = encodeURIComponent(movieTitle);
  return `https://in.bookmyshow.com/explore/movies?search=${query}`;
}

export function getAmazonPrimeLink(title: string): string {
  // Amazon Prime Video search deep link with affiliate tag
  const query = encodeURIComponent(title);
  return `https://www.primevideo.com/search/ref=atv_sr_sug_1?phrase=${query}&tag=${AMAZON_AFFILIATE_TAG}`;
}

export function getNetflixLink(title: string): string {
  // Netflix search (Netflix doesn't have a public affiliate program, but good for UX)
  const query = encodeURIComponent(title);
  return `https://www.netflix.com/search?q=${query}`;
}
