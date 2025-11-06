import { format, subDays, parseISO } from 'date-fns';
import type {
  ClickEvent,
  ClickStats,
  AnalyticsSummary,
  AnalyticsData,
  TrackableItemType,
} from '@/types/analytics';

// In-memory storage (for development)
// In production, this should be replaced with a database
let analyticsData: AnalyticsData = {
  clicks: [],
  stats: {},
  summary: {
    totalClicks: 0,
    totalAffiliateClicks: 0,
    totalAdClicks: 0,
    totalStreamingLinkClicks: 0,
    topItems: [],
    clickTrend: [],
  },
  lastUpdated: new Date().toISOString(),
};

// Initialize with sample data for demonstration
function initializeSampleData() {
  if (analyticsData.clicks.length === 0) {
    const sampleData: ClickEvent[] = [
      {
        id: '1',
        itemId: 'crunchyroll_link',
        itemType: 'streaming_link',
        itemName: 'Crunchyroll',
        timestamp: subDays(new Date(), 5).toISOString(),
        locale: 'en',
      },
      {
        id: '2',
        itemId: 'netflix_link',
        itemType: 'streaming_link',
        itemName: 'Netflix',
        timestamp: subDays(new Date(), 4).toISOString(),
        locale: 'en',
      },
      {
        id: '3',
        itemId: 'crunchyroll_link',
        itemType: 'streaming_link',
        itemName: 'Crunchyroll',
        timestamp: subDays(new Date(), 3).toISOString(),
        locale: 'ja',
      },
      {
        id: '4',
        itemId: 'affiliate_banner_1',
        itemType: 'ad',
        itemName: 'Anime Merchandise Banner',
        timestamp: subDays(new Date(), 2).toISOString(),
        locale: 'en',
      },
      {
        id: '5',
        itemId: 'amazon_affiliate',
        itemType: 'affiliate_link',
        itemName: 'Amazon Anime Products',
        timestamp: subDays(new Date(), 1).toISOString(),
        locale: 'en',
      },
      {
        id: '6',
        itemId: 'crunchyroll_link',
        itemType: 'streaming_link',
        itemName: 'Crunchyroll',
        timestamp: new Date().toISOString(),
        locale: 'ko',
      },
    ];

    sampleData.forEach((event) => trackClick(event));
  }
}

// Calculate statistics from click events
function calculateStats(): void {
  const stats: Record<string, ClickStats> = {};
  const clicksByDate: Record<string, number> = {};

  // Process each click
  analyticsData.clicks.forEach((click) => {
    const { itemId, itemType, itemName, timestamp, locale } = click;

    // Initialize stats for this item if not exists
    if (!stats[itemId]) {
      stats[itemId] = {
        itemId,
        itemType,
        itemName,
        totalClicks: 0,
        clicksByDate: {},
        clicksByLocale: {},
      };
    }

    // Update item stats
    stats[itemId].totalClicks++;
    const dateKey = format(parseISO(timestamp), 'yyyy-MM-dd');
    stats[itemId].clicksByDate[dateKey] =
      (stats[itemId].clicksByDate[dateKey] || 0) + 1;

    if (locale) {
      stats[itemId].clicksByLocale[locale] =
        (stats[itemId].clicksByLocale[locale] || 0) + 1;
    }

    // Track first and last click
    if (!stats[itemId].firstClick || timestamp < stats[itemId].firstClick!) {
      stats[itemId].firstClick = timestamp;
    }
    if (!stats[itemId].lastClick || timestamp > stats[itemId].lastClick!) {
      stats[itemId].lastClick = timestamp;
    }

    // Update global date tracking
    clicksByDate[dateKey] = (clicksByDate[dateKey] || 0) + 1;
  });

  // Calculate summary
  const summary: AnalyticsSummary = {
    totalClicks: analyticsData.clicks.length,
    totalAffiliateClicks: analyticsData.clicks.filter(
      (c) => c.itemType === 'affiliate_link'
    ).length,
    totalAdClicks: analyticsData.clicks.filter((c) => c.itemType === 'ad')
      .length,
    totalStreamingLinkClicks: analyticsData.clicks.filter(
      (c) => c.itemType === 'streaming_link'
    ).length,
    topItems: Object.values(stats)
      .sort((a, b) => b.totalClicks - a.totalClicks)
      .slice(0, 10)
      .map((stat) => ({
        itemId: stat.itemId,
        itemName: stat.itemName,
        itemType: stat.itemType,
        clicks: stat.totalClicks,
      })),
    clickTrend: Object.entries(clicksByDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, clicks]) => ({ date, clicks })),
  };

  analyticsData.stats = stats;
  analyticsData.summary = summary;
  analyticsData.lastUpdated = new Date().toISOString();
}

// Track a new click
export function trackClick(event: Partial<ClickEvent>): ClickEvent {
  const clickEvent: ClickEvent = {
    id: event.id || `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    itemId: event.itemId || '',
    itemType: event.itemType || 'streaming_link',
    itemName: event.itemName || '',
    timestamp: event.timestamp || new Date().toISOString(),
    userAgent: event.userAgent,
    referrer: event.referrer,
    locale: event.locale,
  };

  analyticsData.clicks.push(clickEvent);
  calculateStats();

  return clickEvent;
}

// Get all analytics data
export function getAnalyticsData(): AnalyticsData {
  initializeSampleData();
  return analyticsData;
}

// Get stats for a specific item
export function getItemStats(itemId: string): ClickStats | undefined {
  initializeSampleData();
  return analyticsData.stats[itemId];
}

// Get summary statistics
export function getSummary(): AnalyticsSummary {
  initializeSampleData();
  return analyticsData.summary;
}

// Get clicks filtered by type
export function getClicksByType(type: TrackableItemType): ClickEvent[] {
  initializeSampleData();
  return analyticsData.clicks.filter((click) => click.itemType === type);
}

// Get clicks for date range
export function getClicksInRange(startDate: Date, endDate: Date): ClickEvent[] {
  initializeSampleData();
  return analyticsData.clicks.filter((click) => {
    const clickDate = parseISO(click.timestamp);
    return clickDate >= startDate && clickDate <= endDate;
  });
}

// Reset all analytics data
export function resetAnalytics(): void {
  analyticsData = {
    clicks: [],
    stats: {},
    summary: {
      totalClicks: 0,
      totalAffiliateClicks: 0,
      totalAdClicks: 0,
      totalStreamingLinkClicks: 0,
      topItems: [],
      clickTrend: [],
    },
    lastUpdated: new Date().toISOString(),
  };
}

// Export analytics data (for backup or download)
export function exportAnalytics(): string {
  initializeSampleData();
  return JSON.stringify(analyticsData, null, 2);
}

// Import analytics data (for restore)
export function importAnalytics(data: string): boolean {
  try {
    const imported = JSON.parse(data) as AnalyticsData;
    analyticsData = imported;
    calculateStats();
    return true;
  } catch (error) {
    console.error('Failed to import analytics data:', error);
    return false;
  }
}
