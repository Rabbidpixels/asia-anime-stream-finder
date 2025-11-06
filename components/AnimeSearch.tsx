'use client';

import { useState } from 'react';
import SearchArea from '@/components/SearchArea';
import ResultsGrid from '@/components/ResultsGrid';
import type { Anime } from '@/types/anime';
import { searchAnime } from '@/lib/services/animeApi';

export default function AnimeSearch() {
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const searchResults = await searchAnime(query);
      setResults(searchResults.data);

      if (searchResults.data.length === 0) {
        setError('No anime found matching your search. Try a different query.');
      }
    } catch (err) {
      setError('Failed to search anime. Please try again later.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchArea onSearch={handleSearch} loading={loading} />
      <ResultsGrid
        results={results}
        loading={loading}
        error={error}
        hasSearched={hasSearched}
      />
    </>
  );
}
