export default function ResultsGrid() {
  // Placeholder data for demonstration
  const placeholderResults = [
    {
      id: 1,
      title: 'Sample Anime 1',
      platforms: ['Crunchyroll', 'Netflix'],
      image: '/placeholder-anime.jpg',
    },
    {
      id: 2,
      title: 'Sample Anime 2',
      platforms: ['Hulu', 'Funimation'],
      image: '/placeholder-anime.jpg',
    },
    {
      id: 3,
      title: 'Sample Anime 3',
      platforms: ['Amazon Prime', 'Crunchyroll'],
      image: '/placeholder-anime.jpg',
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-8 md:py-12 min-h-[400px]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Search Results
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderResults.map((result) => (
            <div
              key={result.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white font-semibold">Anime Thumbnail</span>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {result.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {result.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full text-sm font-medium"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
          <p>Use the search above to find anime streaming information</p>
        </div>
      </div>
    </section>
  );
}
