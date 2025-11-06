'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Anime } from '@/types/anime';

interface ResultsGridProps {
  results: Anime[];
  loading?: boolean;
  error?: string | null;
  hasSearched?: boolean;
}

export default function ResultsGrid({
  results,
  loading = false,
  error = null,
  hasSearched = false,
}: ResultsGridProps) {
  const t = useTranslations('search');
  const tAnime = useTranslations('anime');

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-8 md:py-12 min-h-[400px]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          {t('resultsTitle')}
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('loading')}</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg max-w-2xl mx-auto">
            <p className="font-semibold">{t('errorTitle')}</p>
            <p>{error}</p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((anime, index) => (
              <div
                key={anime.id}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Anime Image */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-400 to-pink-400 overflow-hidden">
                  <Image
                    src={anime.imageUrl}
                    alt={anime.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 4}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                  />
                  {/* Rating Badge */}
                  {anime.rating > 0 && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md font-semibold text-sm shadow-lg">
                      ⭐ {anime.rating.toFixed(1)}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
                    {anime.title}
                  </h3>

                  {/* Year and Episodes */}
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {anime.year > 0 && <span>{anime.year}</span>}
                    {anime.episodes > 0 && (
                      <>
                        <span>•</span>
                        <span>{anime.episodes} {tAnime('episodes')}</span>
                      </>
                    )}
                  </div>

                  {/* Genres */}
                  {anime.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {anime.genres.slice(0, 3).map((genre) => (
                        <span
                          key={genre}
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Streaming Platforms */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">
                      {tAnime('availableOn')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {anime.streamingPlatforms.slice(0, 3).map((platform) => (
                        <span
                          key={platform.name}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full text-xs font-medium"
                        >
                          {platform.name}
                        </span>
                      ))}
                      {anime.streamingPlatforms.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                          +{anime.streamingPlatforms.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  {anime.languages.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {tAnime('languages')} {anime.languages.slice(0, 3).join(', ')}
                        {anime.languages.length > 3 && ` +${anime.languages.length - 3}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && !hasSearched && (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-semibold mb-2">{t('emptyStateTitle')}</p>
            <p>{t('emptyStateSubtitle')}</p>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && hasSearched && results.length === 0 && (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-xl font-semibold mb-2">{t('noResultsTitle')}</p>
            <p>{t('noResultsSubtitle')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
