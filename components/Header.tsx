'use client';

import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { locales, localeNames } from '@/lib/i18n/config';

export default function Header() {
  const t = useTranslations('header');
  const currentLocale = useLocale();

  const languages = [
    { locale: 'en', flag: '🇺🇸', name: 'English (US)' },
    { locale: 'en', flag: '🇨🇦', name: 'English (Canada)' },
    { locale: 'en', flag: '🇬🇧', name: 'English (UK)' },
    { locale: 'eu', flag: '🇪🇺', name: 'European Union' },
    { locale: 'hi', flag: '🇮🇳', name: 'Hindi' },
    { locale: 'ja', flag: '🇯🇵', name: 'Japanese' },
    { locale: 'ko', flag: '🇰🇷', name: 'Korean' },
    { locale: 'pt', flag: '🇧🇷', name: 'Portuguese (Brazil)' },
    { locale: 'zh', flag: '🇨🇳', name: 'Chinese' },
  ];

  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="text-2xl md:text-3xl font-bold mb-3 md:mb-0 hover:opacity-80 transition-opacity">
            {t('title')}
          </Link>

          <nav className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
            {languages.map((lang, index) => {
              const isActive = lang.locale === currentLocale;
              return (
                <a
                  key={`${lang.locale}-${index}`}
                  href={`/${lang.locale}`}
                  className={`text-xl md:text-2xl hover:scale-110 transition-transform ${
                    isActive ? 'ring-2 ring-white rounded-full' : ''
                  }`}
                  title={lang.name}
                >
                  {lang.flag}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
