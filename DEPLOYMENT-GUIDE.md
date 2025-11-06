# Deployment Guide - Asia Anime Stream Finder

## Prerequisites
- ✅ Vercel CLI installed (v48.8.2)
- ✅ GitHub repository: https://github.com/Rabbidpixels/asia-anime-stream-finder.git
- ✅ Production build tested and passing
- ⚠️ Vercel account required

## Option 1: Deploy via Vercel CLI (Recommended)

### Step 1: Authenticate with Vercel
```bash
vercel login
```
This will open your browser for authentication.

### Step 2: Deploy to Production
```bash
vercel --prod
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Select your account/team
- **Link to existing project?** No (first time) or Yes (if project exists)
- **Project name?** asia-anime-stream-finder (or your preferred name)
- **Directory?** ./ (press Enter)
- **Override settings?** No

### Step 3: Set Environment Variables (Optional)
After deployment, set environment variables in Vercel Dashboard:

```bash
vercel env add NEXT_PUBLIC_BASE_URL production
# Enter: https://your-domain.vercel.app
```

## Option 2: Deploy via Vercel Dashboard (Easiest)

### Step 1: Import from GitHub
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Connect your GitHub account if not already connected
4. Select repository: `Rabbidpixels/asia-anime-stream-finder`

### Step 2: Configure Project
**Project Settings:**
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** ./
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** .next (auto-detected)
- **Install Command:** `npm install` (auto-detected)

**Environment Variables (Optional):**
```
NEXT_PUBLIC_BASE_URL = https://your-project.vercel.app
```

### Step 3: Deploy
Click **"Deploy"** button and wait for deployment to complete (~2-3 minutes)

## Post-Deployment Steps

### 1. Verify Deployment
After deployment completes, Vercel will provide a production URL:
```
https://asia-anime-stream-finder.vercel.app
```

### 2. Test Production Environment
Visit these URLs to verify all features work:

**Language Routes:**
- https://your-domain.vercel.app/en (English)
- https://your-domain.vercel.app/ja (Japanese)
- https://your-domain.vercel.app/ko (Korean)
- https://your-domain.vercel.app/pt (Portuguese)
- https://your-domain.vercel.app/zh (Chinese)
- https://your-domain.vercel.app/hi (Hindi)
- https://your-domain.vercel.app/eu (European Union)

**Key Pages:**
- `/[locale]/admin` - Analytics Dashboard
- `/[locale]/privacy` - Privacy Policy
- `/[locale]/terms` - Terms of Use

**API Endpoints:**
- `/api/analytics/data` - Analytics data
- `/api/analytics/track` - Click tracking

### 3. Update Environment Variables
In Vercel Dashboard, add/update environment variables:

1. Go to Project Settings > Environment Variables
2. Add `NEXT_PUBLIC_BASE_URL` with your production domain
3. Optionally add `NEXT_PUBLIC_USE_FALLBACK_DATA=false` to use live API

### 4. Custom Domain (Optional)
To add a custom domain:
1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_BASE_URL` to match custom domain

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:
- **Main branch** → Production deployment
- **Other branches** → Preview deployments

To manually trigger deployment:
```bash
git push origin main
```

## Monitoring & Analytics

### Vercel Analytics
Enable in Project Settings > Analytics for:
- Page views
- Real User Monitoring (RUM)
- Core Web Vitals

### Built-in Analytics
Access at: `https://your-domain.vercel.app/[locale]/admin`
- Click tracking
- Performance metrics
- Top performing items

## Troubleshooting

### Build Failures
If build fails, check:
1. Vercel build logs for specific errors
2. Run `npm run build` locally to reproduce
3. Ensure all dependencies are in `package.json`
4. Check TypeScript errors

### Middleware Warning
You may see:
```
⚠ The "middleware" file convention is deprecated
```
This is expected and doesn't affect functionality. Will be migrated to proxy in future Next.js versions.

### MetadataBase Warnings
These will resolve automatically once `NEXT_PUBLIC_BASE_URL` is set in production.

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Edge caching
- ✅ Image optimization
- ✅ Compression
- ✅ SSL certificate

## Rollback
To rollback to a previous deployment:
1. Go to Vercel Dashboard > Deployments
2. Find the working deployment
3. Click "..." menu > "Promote to Production"

## Support Resources
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Project Issues: https://github.com/Rabbidpixels/asia-anime-stream-finder/issues

---

## Quick Deploy Command
```bash
# After vercel login:
vercel --prod
```

## Deployment Checklist
- [ ] Authenticate with Vercel (`vercel login`)
- [ ] Deploy to production (`vercel --prod`)
- [ ] Verify all 7 language routes work
- [ ] Test search functionality
- [ ] Check analytics dashboard
- [ ] Verify footer branding displays correctly
- [ ] Test privacy and terms pages
- [ ] Set production environment variables
- [ ] Configure custom domain (optional)
- [ ] Enable Vercel Analytics (optional)

---
**Status:** Ready for deployment ✅
**Build:** Passing ✅
**Last Updated:** 2025-11-05
