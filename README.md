# 🎬 Asia Anime Stream Finder

A modern, multi-language anime streaming platform finder built with Next.js 16, featuring real-time search, click analytics, and comprehensive SEO optimization.

**Live Demo:** [Coming Soon - Deploy to Vercel]

## ✨ Features

### 🌍 Multi-Language Support
- **7 Languages:** English, Japanese, Korean, Portuguese, Chinese, Hindi, European Union
- **9 Flag Emojis:** 🇺🇸 🇨🇦 🇬🇧 🇪🇺 🇮🇳 🇯🇵 🇰🇷 🇧🇷 🇨🇳
- Seamless language switching with next-intl
- Localized content including Privacy Policy and Terms of Use

### 🔍 Smart Search
- **Jikan API Integration:** Real-time anime database from MyAnimeList
- **Automatic Fallback:** Local JSON data when API is unavailable
- **Rate Limiting:** Respects API limits (1 req/sec)
- Loading states, error handling, and empty states
- Display anime title, image, rating, genres, streaming platforms

### 📊 Analytics Dashboard
- **Click Tracking:** Monitor affiliate links, ads, and streaming platform clicks
- **Visual Charts:** Line charts, bar charts, and pie charts using Recharts
- **Performance Metrics:** Top performing items and click trends
- **Manual Reset:** Clear analytics data with confirmation
- **API Caching:** Optimized with 60s revalidation

### 🚀 Performance Optimized
- **Image Optimization:** AVIF/WebP formats with Next.js Image
- **Font Optimization:** Inter font with next/font/google
- **Code Splitting:** Dynamic imports for heavy components
- **Lazy Loading:** Priority loading for above-the-fold images
- **Package Optimization:** Optimized imports for lucide-react and recharts

### 📱 SEO & Accessibility
- **Dynamic Meta Tags:** Per-language titles, descriptions, and keywords
- **Open Graph & Twitter Cards:** Social media preview images (1200x630)
- **Sitemap.xml:** All locales and routes
- **Robots.txt:** Proper crawling rules
- **PWA Ready:** Web manifest and dynamic favicon generation
- **Responsive Design:** Mobile-first approach with Tailwind CSS

### 📄 Legal Compliance
- **Privacy Policy:** GDPR-compliant privacy information
- **Terms of Use:** Clear terms and conditions
- **Markdown-Based:** Easy to edit and maintain
- **Multi-Language:** Available in all 7 languages

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + @tailwindcss/typography
- **Internationalization:** next-intl
- **Charts:** Recharts
- **API:** Jikan API (MyAnimeList)
- **Markdown:** react-markdown
- **Deployment:** Vercel
- **Version Control:** Git & GitHub

## 📁 Project Structure

```
animestreamfinder/
├── app/
│   ├── [locale]/              # Localized routes
│   │   ├── admin/             # Analytics dashboard
│   │   ├── privacy/           # Privacy policy page
│   │   ├── terms/             # Terms of use page
│   │   ├── layout.tsx         # Locale-specific layout with metadata
│   │   └── page.tsx           # Homepage with search
│   ├── api/
│   │   └── analytics/         # Analytics API routes
│   ├── apple-icon.tsx         # Dynamic Apple icon
│   ├── icon.tsx               # Dynamic favicon
│   ├── opengraph-image.tsx    # Social preview image
│   ├── robots.ts              # Robots.txt generation
│   ├── sitemap.ts             # Sitemap generation
│   ├── layout.tsx             # Root layout with fonts
│   └── globals.css            # Global styles
├── components/
│   ├── admin/                 # Admin dashboard components
│   ├── AnimeSearch.tsx        # Search container
│   ├── Banner.tsx             # Hero banner
│   ├── Footer.tsx             # Footer with policy links
│   ├── Header.tsx             # Header with language flags
│   ├── ResultsGrid.tsx        # Anime results display
│   ├── SearchArea.tsx         # Search input
│   └── TrackableLink.tsx      # Click tracking wrapper
├── data/
│   ├── fallback-anime.json    # Fallback anime data
│   └── legal/                 # Legal content (markdown)
├── lib/
│   ├── analytics/             # Analytics service
│   ├── i18n/                  # i18n configuration
│   ├── legal/                 # Legal content service
│   └── services/              # API services
├── messages/                  # Translation files (en, ja, ko, pt, zh, hi, eu)
├── public/                    # Static assets
├── types/                     # TypeScript type definitions
├── .env.local.example         # Environment variable template
├── QA-CHECKLIST.md           # Quality assurance checklist
├── DEPLOYMENT-GUIDE.md       # Deployment instructions
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rabbidpixels/asia-anime-stream-finder.git
   cd asia-anime-stream-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file** (optional)
   ```bash
   cp .env.local.example .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000/en
   ```

## 📝 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Base URL for production (set in Vercel for production)
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Force fallback mode (optional, for testing)
# NEXT_PUBLIC_USE_FALLBACK_DATA=true

# API Configuration (optional)
# NEXT_PUBLIC_JIKAN_API_URL=https://api.jikan.moe/v4
```

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🌐 Language Routes

- **English:** `/en` (Default) - 🇺🇸 🇨🇦 🇬🇧
- **European Union:** `/eu` - 🇪🇺
- **Hindi:** `/hi` - 🇮🇳
- **Japanese:** `/ja` - 🇯🇵
- **Korean:** `/ko` - 🇰🇷
- **Portuguese:** `/pt` - 🇧🇷
- **Chinese:** `/zh` - 🇨🇳

## 📊 Admin Panel

Access the analytics dashboard at: `/[locale]/admin`

Example: `http://localhost:3000/en/admin`

### Features:
- Click tracking statistics
- Visual charts (line, bar, pie)
- Top performing items
- Click trend over time
- Manual data reset

## 🚀 Deployment

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for detailed deployment instructions.

### Quick Deploy to Vercel

**Option 1: GitHub Integration (Recommended)**
1. Go to https://vercel.com/new
2. Import `Rabbidpixels/asia-anime-stream-finder`
3. Click Deploy

**Option 2: Vercel CLI**
```bash
vercel login
vercel --prod
```

## 🧪 Testing

### Production Build
```bash
npm run build
npm start
```

### Test Language Routes
- http://localhost:3000/en
- http://localhost:3000/ja
- http://localhost:3000/ko
- http://localhost:3000/pt
- http://localhost:3000/zh
- http://localhost:3000/hi
- http://localhost:3000/eu

### Test API Fallback
Enable fallback mode in `.env.local`:
```env
NEXT_PUBLIC_USE_FALLBACK_DATA=true
```

## 📋 Features Checklist

- ✅ Multi-language support (7 languages)
- ✅ Real-time anime search with Jikan API
- ✅ Automatic API fallback system
- ✅ Click analytics dashboard
- ✅ SEO optimization (meta tags, sitemap, robots.txt)
- ✅ Performance optimization (images, fonts, code splitting)
- ✅ Privacy Policy and Terms pages
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Production build passing
- ✅ Deployment ready

## 🎯 Roadmap

### Completed
- ✅ Multi-language routing and translations
- ✅ Anime search with API integration
- ✅ Analytics dashboard with charts
- ✅ SEO optimization
- ✅ Legal pages (Privacy & Terms)
- ✅ Performance optimizations

### Planned Features
- [ ] Banner content editor in Admin Panel
- [ ] Ad management interface
- [ ] Database integration for analytics persistence
- [ ] User authentication for admin access
- [ ] Advanced filtering and sorting
- [ ] Streaming availability by region
- [ ] User favorites and watchlist
- [ ] Email notifications for new anime

## 📄 License

Created by **Rabbid Pixel LLC © 2025**

## 🤝 Contributing

This is a private project. For issues or feature requests, please contact Rabbid Pixel LLC.

## 📞 Support

- **GitHub:** https://github.com/Rabbidpixels/asia-anime-stream-finder
- **Issues:** https://github.com/Rabbidpixels/asia-anime-stream-finder/issues

## 🙏 Acknowledgments

- **Jikan API:** Free MyAnimeList API
- **Next.js:** React framework
- **Vercel:** Hosting platform
- **Tailwind CSS:** Utility-first CSS framework
- **Recharts:** Charting library
- **next-intl:** Internationalization library

---

**Built with ❤️ by Rabbid Pixel LLC**

🤖 *This project was developed with assistance from [Claude Code](https://claude.com/claude-code)*
