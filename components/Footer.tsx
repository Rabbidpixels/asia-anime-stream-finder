'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-sm md:text-base order-2 md:order-1">
            {t('copyright')}
          </p>

          {/* Links */}
          <nav className="flex gap-6 order-1 md:order-2">
            <Link
              href="/privacy"
              className="text-sm md:text-base hover:text-purple-400 transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link
              href="/terms"
              className="text-sm md:text-base hover:text-purple-400 transition-colors"
            >
              {t('terms')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
