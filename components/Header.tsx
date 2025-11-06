import Link from 'next/link';

export default function Header() {
  const languages = [
    { code: 'en-us', flag: '🇺🇸', name: 'English (US)' },
    { code: 'en-ca', flag: '🇨🇦', name: 'English (Canada)' },
    { code: 'en-gb', flag: '🇬🇧', name: 'English (UK)' },
    { code: 'eu', flag: '🇪🇺', name: 'European Union' },
    { code: 'hi', flag: '🇮🇳', name: 'Hindi' },
    { code: 'ja', flag: '🇯🇵', name: 'Japanese' },
    { code: 'ko', flag: '🇰🇷', name: 'Korean' },
    { code: 'pt-br', flag: '🇧🇷', name: 'Portuguese (Brazil)' },
    { code: 'zh', flag: '🇨🇳', name: 'Chinese' },
  ];

  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="text-2xl md:text-3xl font-bold mb-3 md:mb-0 hover:opacity-80 transition-opacity">
            Asia Anime Stream Finder
          </Link>

          <nav className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={`/${lang.code}`}
                className="text-xl md:text-2xl hover:scale-110 transition-transform"
                title={lang.name}
              >
                {lang.flag}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
