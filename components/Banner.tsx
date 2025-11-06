'use client';

import { useTranslations } from 'next-intl';

export default function Banner() {
  const t = useTranslations('banner');

  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          {t('subtitle')}
        </p>
      </div>
    </section>
  );
}
