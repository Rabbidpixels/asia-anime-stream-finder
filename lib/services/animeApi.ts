import type {
  Anime,
  AnimeSearchResult,
  JikanResponse,
  JikanAnime,
  StreamingPlatform,
} from '@/types/anime';
import fallbackData from '@/data/fallback-anime.json';

// Rate limiting to respect Jikan API limits (1 request per second)
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second

async function rateLimitedFetch(url: string): Promise<Response> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve =>
      setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest)
    );
  }

  lastRequestTime = Date.now();
  return fetch(url);
}

// Transform Jikan API data to our internal format
function transformJikanAnime(jikanAnime: JikanAnime): Anime {
  // Collect all genres including demographics and themes
  const genres: string[] = [
    ...(jikanAnime.genres?.map(g => g.name) || []),
    ...(jikanAnime.demographics?.map(d => d.name) || []),
    ...(jikanAnime.themes?.map(t => t.name) || []),
  ];

  // For now, we'll use placeholder streaming platforms since Jikan doesn't provide this
  // In the future, this can be enhanced with a separate streaming database
  const streamingPlatforms: StreamingPlatform[] = generatePlaceholderPlatforms(jikanAnime.title);

  return {
    id: jikanAnime.mal_id,
    title: jikanAnime.title,
    titleJapanese: jikanAnime.title_japanese,
    imageUrl: jikanAnime.images.jpg.large_image_url || jikanAnime.images.jpg.image_url,
    synopsis: jikanAnime.synopsis || 'No synopsis available.',
    rating: jikanAnime.score || 0,
    episodes: jikanAnime.episodes || 0,
    status: jikanAnime.status,
    year: jikanAnime.year || 0,
    genres,
    streamingPlatforms,
    languages: ['Japanese', 'English'], // Default languages
  };
}

// Generate placeholder streaming platforms based on popularity
function generatePlaceholderPlatforms(title: string): StreamingPlatform[] {
  // Common platforms for most anime
  const commonPlatforms: StreamingPlatform[] = [
    {
      name: 'Crunchyroll',
      url: 'https://www.crunchyroll.com',
      regions: ['US', 'CA', 'GB', 'EU'],
    },
  ];

  // Randomly add more platforms to simulate variety
  const additionalPlatforms: StreamingPlatform[] = [
    {
      name: 'Netflix',
      url: 'https://www.netflix.com',
      regions: ['US', 'CA', 'GB', 'EU', 'JP', 'BR', 'IN'],
    },
    {
      name: 'Hulu',
      url: 'https://www.hulu.com',
      regions: ['US'],
    },
    {
      name: 'Funimation',
      url: 'https://www.funimation.com',
      regions: ['US', 'CA', 'GB', 'BR'],
    },
  ];

  // Use title hash to deterministically select platforms
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const platformCount = (hash % 2) + 1; // 1 or 2 additional platforms

  return [
    ...commonPlatforms,
    ...additionalPlatforms.slice(0, platformCount),
  ];
}

// Search anime using Jikan API
async function searchJikanAPI(query: string): Promise<AnimeSearchResult> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_JIKAN_API_URL || 'https://api.jikan.moe/v4';
    // Get more results to account for filtering
    const url = `${apiUrl}/anime?q=${encodeURIComponent(query)}&limit=25&sfw=true`;

    const response = await rateLimitedFetch(url);

    if (!response.ok) {
      throw new Error(`Jikan API error: ${response.status}`);
    }

    const data: JikanResponse = await response.json();

    // Filter to only show main anime titles (excludes individual episodes, music videos, seasons)
    const allowedTypes = ['TV', 'Movie', 'OVA', 'Special', 'ONA'];
    const queryLower = query.toLowerCase();

    const filteredData = data.data.filter(anime => {
      if (!allowedTypes.includes(anime.type || '')) return false;

      const title = anime.title.toLowerCase();
      const japaneseTitle = (anime.title_japanese || '').toLowerCase();

      // Only include if the FULL search query is in the title (exact phrase match)
      const hasExactMatch = title.includes(queryLower) || japaneseTitle.includes(queryLower);
      if (!hasExactMatch) return false;

      // Exclude season-specific entries (e.g., "Season 2", "Part 2", "2nd Season")
      const seasonPatterns = [
        /season \d+/i,
        /\d+(st|nd|rd|th) season/i,
        /part \d+/i,
        /cour \d+/i,
        /: \d+/,  // e.g., "Title: 2"
      ];

      return !seasonPatterns.some(pattern => pattern.test(title));
    });

    // Transform and limit to 12 results
    const transformedData = filteredData
      .slice(0, 12)
      .map(transformJikanAnime);

    return {
      data: transformedData,
      total: filteredData.length,
      hasMore: filteredData.length > 12,
    };
  } catch (error) {
    console.error('Jikan API search failed:', error);
    throw error;
  }
}

// Search using fallback JSON data
function searchFallbackData(query: string): AnimeSearchResult {
  const lowercaseQuery = query.toLowerCase();

  // Only match if the FULL search query is in the title (exact phrase match)
  const filteredAnime = fallbackData.anime.filter(
    (anime) =>
      anime.title.toLowerCase().includes(lowercaseQuery) ||
      anime.titleJapanese?.toLowerCase().includes(lowercaseQuery)
  );

  return {
    data: filteredAnime,
    total: filteredAnime.length,
    hasMore: false,
  };
}

// Main search function with automatic fallback
export async function searchAnime(query: string): Promise<AnimeSearchResult> {
  if (!query.trim()) {
    return {
      data: [],
      total: 0,
      hasMore: false,
    };
  }

  // Check if fallback mode is forced
  const useFallback = process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true';

  if (useFallback) {
    console.log('Using fallback data (forced by environment variable)');
    return searchFallbackData(query);
  }

  // Try Jikan API first, fallback to local data on error
  try {
    console.log('Searching Jikan API for:', query);
    return await searchJikanAPI(query);
  } catch (error) {
    console.warn('Jikan API failed, using fallback data:', error);
    return searchFallbackData(query);
  }
}

// Get all anime from fallback data (useful for browsing)
export function getAllAnime(): Anime[] {
  return fallbackData.anime;
}

// Get anime by ID from fallback data
export function getAnimeById(id: number): Anime | undefined {
  return fallbackData.anime.find((anime) => anime.id === id);
}
