'use client';

import { useState } from 'react';

export default function SearchArea() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
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
            className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 dark:focus:border-purple-400 dark:bg-gray-800 dark:text-white transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
