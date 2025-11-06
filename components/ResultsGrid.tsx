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

        {/* Results Grid - Card Tiles */}
        {!loading && !error && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {results.map((anime, index) => (
              <div
                key={anime.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700"
              >
                {/* Anime Image */}
                <div className="relative aspect-[2/3] bg-gradient-to-br from-purple-400 to-pink-400 overflow-hidden">
                  <Image
                    src={anime.imageUrl}
                    alt={anime.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    priority={index < 6}
                    loading={index < 6 ? 'eager' : 'lazy'}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                  />
                  {/* Rating Badge */}
                  {anime.rating > 0 && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                      ⭐ {anime.rating.toFixed(1)}
                    </div>
                  )}
                </div>

                {/* Info Section Below Image */}
                <div className="p-3">
                  {/* Title */}
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-[2.5rem]">
                    {anime.title}
                  </h3>

                  {/* Streaming Platforms as Icon Badges */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Stream on:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {anime.streamingPlatforms.slice(0, 4).map((platform) => {
                        // Platform-specific colors
                        const platformColors: Record<string, string> = {
                          'Crunchyroll': 'bg-orange-500 hover:bg-orange-600',
                          'Netflix': 'bg-red-600 hover:bg-red-700',
                          'Hulu': 'bg-green-500 hover:bg-green-600',
                          'Funimation': 'bg-purple-600 hover:bg-purple-700',
                          'Disney+': 'bg-blue-600 hover:bg-blue-700',
                        };
                        const colorClass = platformColors[platform.name] || 'bg-gray-600 hover:bg-gray-700';

                        return (
                          <span
                            key={platform.name}
                            className={`${colorClass} text-white px-2 py-1 rounded-md text-xs font-semibold transition-colors duration-200 cursor-pointer shadow-sm`}
                            title={platform.name}
                          >
                            {platform.name}
                          </span>
                        );
                      })}
                      {anime.streamingPlatforms.length > 4 && (
                        <span className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-semibold">
                          +{anime.streamingPlatforms.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
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
