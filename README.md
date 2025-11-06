# Asia Anime Stream Finder

A modern web application built with Next.js and Tailwind CSS to help users find where to stream their favorite anime across multiple platforms.

## Features

- 🎨 Clean, responsive design with Tailwind CSS
- 🌍 Multi-language support (US, Canada, UK, EU, India, Japan, Korea, Brazil, China)
- 🔍 Real-time anime search with Jikan API integration
- 📊 Display anime info: title, image, rating, genres, streaming platforms, languages
- ⚡ Loading and error states for better UX
- 💾 Fallback to local JSON data when API is unavailable
- 📱 Mobile-friendly interface
- 🎭 Dark mode support
- 👨‍💼 Admin panel (in development)
- 🔌 Extensible API architecture for future integrations

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Package Manager**: npm
- **API**: Jikan API (MyAnimeList unofficial API)
- **Data Fallback**: Local JSON file

## Project Structure

```
animestreamfinder/
├── app/
│   ├── admin/              # Admin panel pages
│   ├── [locale]/           # Language-specific routes (prepared)
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles with Tailwind
├── components/
│   ├── Header.tsx          # Header with language selector
│   ├── Banner.tsx          # Hero banner
│   ├── SearchArea.tsx      # Search input component
│   ├── ResultsGrid.tsx     # Results display grid
│   ├── AnimeSearch.tsx     # Search state management
│   └── Footer.tsx          # Footer with copyright
├── lib/
│   ├── services/           # API and service layer
│   │   ├── animeApi.ts     # Anime API integration
│   │   └── apiConfig.ts    # API configuration manager
│   └── i18n/               # Internationalization setup
│       ├── config.ts       # Locale configuration
│       └── translations/   # Translation files
├── types/
│   └── anime.ts            # TypeScript type definitions
├── data/
│   └── fallback-anime.json # Local fallback anime data
└── public/                 # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rabbidpixels/asia-anime-stream-finder.git
cd asia-anime-stream-finder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
The default configuration uses the free Jikan API (no API key required). You can customize settings in `.env.local`:
- `NEXT_PUBLIC_JIKAN_API_URL`: Jikan API endpoint (default: https://api.jikan.moe/v4)
- `NEXT_PUBLIC_USE_FALLBACK_DATA`: Set to `true` to use local JSON instead of API

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The application uses a flexible API architecture that supports multiple data sources:

### Primary API: Jikan API
- **Free** unofficial MyAnimeList API
- **No API key required**
- Rate limit: 1 request per second (automatically handled)
- Documentation: https://docs.api.jikan.moe/

### Fallback System
If the API is unavailable, the app automatically falls back to local JSON data containing popular anime titles.

### Adding Custom APIs
The architecture is designed for extensibility. Future APIs can be added through:
1. Update `lib/services/apiConfig.ts` to add new API configurations
2. Implement API-specific transformers in `lib/services/animeApi.ts`
3. Configure through the Admin Panel (coming soon)

### Supported Data Fields
- Anime title (English & Japanese)
- Cover image
- Rating/score
- Episode count
- Genres
- Streaming platforms (with regional availability)
- Available languages
- Synopsis

## Roadmap

- [x] Implement anime search API integration with Jikan
- [x] Add loading and error states
- [x] Create fallback data system
- [ ] Complete multi-language routing
- [ ] Build admin panel functionality for API management
- [ ] Add user authentication
- [ ] Implement favorites/watchlist feature
- [ ] Add streaming platform filters
- [ ] Integrate real-time streaming availability API
- [ ] Add pagination for search results
- [ ] Implement anime detail pages

## License

© 2025 Rabbid Pixel LLC. All rights reserved.

## Contributing

This is a private project. For inquiries, please contact Rabbid Pixel LLC.
