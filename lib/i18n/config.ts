export const locales = ['en', 'ja', 'ko', 'pt', 'zh', 'hi', 'eu'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Map display locales to actual locale codes
export const localeRoutes = {
  'en-us': 'en',
  'en-ca': 'en',
  'en-gb': 'en',
  'eu': 'eu',
  'hi': 'hi',
  'ja': 'ja',
  'ko': 'ko',
  'pt-br': 'pt',
  'zh': 'zh',
} as const;

export const localeNames: Record<Locale, string> = {
  'en': 'English',
  'eu': 'European Union',
  'hi': 'Hindi',
  'ja': 'Japanese',
  'ko': 'Korean',
  'pt': 'Portuguese',
  'zh': 'Chinese',
};

export const localeFlags: Record<string, string> = {
  'en-us': '🇺🇸',
  'en-ca': '🇨🇦',
  'en-gb': '🇬🇧',
  'eu': '🇪🇺',
  'hi': '🇮🇳',
  'ja': '🇯🇵',
  'ko': '🇰🇷',
  'pt-br': '🇧🇷',
  'zh': '🇨🇳',
};

export const flagLocaleMap = {
  '🇺🇸': 'en',
  '🇨🇦': 'en',
  '🇬🇧': 'en',
  '🇪🇺': 'eu',
  '🇮🇳': 'hi',
  '🇯🇵': 'ja',
  '🇰🇷': 'ko',
  '🇧🇷': 'pt',
  '🇨🇳': 'zh',
} as const;
