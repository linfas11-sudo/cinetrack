export async function getWikipediaBiography(actorName: string): Promise<string | null> {
  try {
    // 1. Search for the exact Wikipedia page title
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(actorName + ' actor')}&utf8=&format=json`;
    const searchRes = await fetch(searchUrl, { next: { revalidate: 86400 } }); // Cache for 24 hours
    const searchData = await searchRes.json();
    
    if (!searchData.query?.search?.length) {
      return null;
    }

    const title = searchData.query.search[0].title;

    // 2. Fetch the summary for that title
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const summaryRes = await fetch(summaryUrl, { next: { revalidate: 86400 } });
    const summaryData = await summaryRes.json();

    if (summaryData.extract) {
      return summaryData.extract;
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch Wikipedia bio:', error);
    return null;
  }
}
