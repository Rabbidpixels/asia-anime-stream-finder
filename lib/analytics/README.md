# Analytics System

A modular click tracking and analytics system for the Asia Anime Stream Finder.

## Features

- Track clicks on affiliate links, ads, and streaming platform links
- Store click events with timestamps, user agents, and locales
- View analytics in the Admin Panel with charts and tables
- Reset analytics data manually
- Modular architecture for easy integration with external analytics providers

## Usage

### Tracking Clicks

Use the `TrackableLink` component to automatically track clicks:

```tsx
import TrackableLink from '@/components/TrackableLink';

<TrackableLink
  href="https://example.com/affiliate"
  itemId="my_affiliate_link"
  itemType="affiliate_link"
  itemName="My Affiliate Product"
>
  Click Here
</TrackableLink>
```

### Item Types

- `affiliate_link` - For affiliate marketing links
- `ad` - For advertisement banners and promotional content
- `streaming_link` - For links to streaming platforms

### Viewing Analytics

Visit `/[locale]/admin` to view the analytics dashboard with:
- Total click counts by type
- Click trends over time (line chart)
- Top performing items (bar chart)
- Click distribution by type (pie chart)
- Detailed statistics table

### API Endpoints

#### Track a Click
```
POST /api/analytics/track
Body: {
  "itemId": "string",
  "itemType": "affiliate_link" | "ad" | "streaming_link",
  "itemName": "string",
  "locale": "string"
}
```

#### Get Analytics Data
```
GET /api/analytics/data
Returns: {
  "success": true,
  "data": AnalyticsData,
  "summary": AnalyticsSummary
}
```

#### Reset Analytics
```
POST /api/analytics/reset
Returns: {
  "success": true,
  "message": "Analytics data reset successfully"
}
```

## Extending with External Providers

The system is designed to be extended with external analytics providers like Google Analytics, Plausible, or Mixpanel.

### Adding a Provider

1. Create a new provider in `lib/analytics/providers/`:

```typescript
// lib/analytics/providers/googleAnalytics.ts
import type { AnalyticsProvider } from '@/types/analytics';

export const googleAnalyticsProvider: AnalyticsProvider = {
  name: 'Google Analytics',
  enabled: true,
  track: async (event) => {
    // Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        item_id: event.itemId,
        item_type: event.itemType,
        item_name: event.itemName,
      });
    }
  },
};
```

2. Update the tracking service to use providers:

```typescript
// In analyticsService.ts
import { googleAnalyticsProvider } from './providers/googleAnalytics';

const providers: AnalyticsProvider[] = [
  googleAnalyticsProvider,
  // Add more providers here
];

export function trackClick(event: Partial<ClickEvent>): ClickEvent {
  const clickEvent = createClickEvent(event);

  // Track locally
  analyticsData.clicks.push(clickEvent);

  // Track with all enabled providers
  providers.forEach((provider) => {
    if (provider.enabled) {
      provider.track(clickEvent).catch(console.error);
    }
  });

  return clickEvent;
}
```

## Data Storage

Currently, analytics data is stored in-memory for development. For production:

1. **File-based**: Use `fs` to write to JSON files
2. **Database**: Integrate with PostgreSQL, MongoDB, or similar
3. **Cloud**: Use services like Firebase, Supabase, or AWS DynamoDB

### Example: File-based Storage

```typescript
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data/analytics/analytics.json');

async function saveToFile() {
  await fs.writeFile(DATA_PATH, JSON.stringify(analyticsData, null, 2));
}

async function loadFromFile() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    analyticsData = JSON.parse(data);
  } catch (error) {
    // File doesn't exist, use default
  }
}
```

## Privacy Considerations

- User agents and referrers are optional
- No personal identification information is stored
- Complies with privacy-friendly analytics practices
- Consider adding a cookie consent banner for GDPR compliance

## Future Enhancements

- Export analytics to CSV/Excel
- Schedule automatic reports
- Email notifications for milestones
- A/B testing capabilities
- Conversion funnel tracking
- Real-time analytics dashboard
- Geographic tracking (with user consent)
