'use client';

import { useState } from 'react';

interface SearchAreaProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export default function SearchArea({ onSearch, loading = false }: SearchAreaProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for anime titles..."
            disabled={loading}
            className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 dark:focus:border-purple-400 dark:bg-gray-800 dark:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
    </section>
  );
}
