export type TrackableItemType = 'affiliate_link' | 'ad' | 'streaming_link';

export interface ClickEvent {
  id: string;
  itemId: string;
  itemType: TrackableItemType;
  itemName: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
  locale?: string;
}

export interface ClickStats {
  itemId: string;
  itemType: TrackableItemType;
  itemName: string;
  totalClicks: number;
  firstClick?: string;
  lastClick?: string;
  clicksByDate: Record<string, number>;
  clicksByLocale: Record<string, number>;
}

export interface AnalyticsSummary {
  totalClicks: number;
  totalAffiliateClicks: number;
  totalAdClicks: number;
  totalStreamingLinkClicks: number;
  topItems: Array<{
    itemId: string;
    itemName: string;
    itemType: TrackableItemType;
    clicks: number;
  }>;
  clickTrend: Array<{
    date: string;
    clicks: number;
  }>;
}

export interface AnalyticsData {
  clicks: ClickEvent[];
  stats: Record<string, ClickStats>;
  summary: AnalyticsSummary;
  lastUpdated: string;
}

// Configuration for future analytics integrations
export interface AnalyticsProvider {
  name: string;
  enabled: boolean;
  track: (event: ClickEvent) => Promise<void>;
}

export interface AnalyticsConfig {
  providers: AnalyticsProvider[];
  enableLocalTracking: boolean;
  retentionDays: number;
}
