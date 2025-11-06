# Asia Anime Stream Finder

A modern web application built with Next.js and Tailwind CSS to help users find where to stream their favorite anime across multiple platforms.

## Features

- 🎨 Clean, responsive design with Tailwind CSS
- 🌍 Multi-language support (US, Canada, UK, EU, India, Japan, Korea, Brazil, China)
- 🔍 Anime search functionality
- 📱 Mobile-friendly interface
- 🎭 Dark mode support
- 👨‍💼 Admin panel (in development)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Package Manager**: npm

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
│   └── Footer.tsx          # Footer with copyright
├── lib/
│   └── i18n/               # Internationalization setup
│       ├── config.ts       # Locale configuration
│       └── translations/   # Translation files
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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Roadmap

- [ ] Implement anime search API integration
- [ ] Complete multi-language routing
- [ ] Build admin panel functionality
- [ ] Add user authentication
- [ ] Implement favorites/watchlist feature
- [ ] Add streaming platform filters
- [ ] Integrate anime database

## License

© 2025 Rabbid Pixel LLC. All rights reserved.

## Contributing

This is a private project. For inquiries, please contact Rabbid Pixel LLC.
