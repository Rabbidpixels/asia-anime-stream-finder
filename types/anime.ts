export interface StreamingPlatform {
  name: string;
  url: string;
  regions: string[];
}

export interface Anime {
  id: number;
  title: string;
  titleJapanese?: string;
  imageUrl: string;
  synopsis: string;
  rating: number;
  episodes: number;
  status: string;
  year: number;
  genres: string[];
  streamingPlatforms: StreamingPlatform[];
  languages: string[];
}

export interface AnimeSearchResult {
  data: Anime[];
  total: number;
  hasMore: boolean;
}

// Jikan API response types
export interface JikanAnime {
  mal_id: number;
  title: string;
  title_japanese?: string;
  type?: string; // TV, Movie, OVA, Special, ONA, Music
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string;
  score: number;
  episodes: number;
  status: string;
  year: number;
  genres: Array<{ mal_id: number; name: string }>;
  demographics?: Array<{ mal_id: number; name: string }>;
  themes?: Array<{ mal_id: number; name: string }>;
}

export interface JikanResponse {
  data: JikanAnime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

// API configuration types
export interface APIConfig {
  name: string;
  baseUrl: string;
  apiKey?: string;
  enabled: boolean;
  rateLimitMs?: number;
}

export type APISource = 'jikan' | 'fallback' | 'custom';
