export const locales = ['en-us', 'en-ca', 'en-gb', 'eu', 'hi', 'ja', 'ko', 'pt-br', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en-us';

export const localeNames: Record<Locale, string> = {
  'en-us': 'English (US)',
  'en-ca': 'English (Canada)',
  'en-gb': 'English (UK)',
  'eu': 'European Union',
  'hi': 'Hindi',
  'ja': 'Japanese',
  'ko': 'Korean',
  'pt-br': 'Portuguese (Brazil)',
  'zh': 'Chinese',
};

export const localeFlags: Record<Locale, string> = {
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
