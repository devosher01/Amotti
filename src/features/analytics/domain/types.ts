export type Platform = 'facebook' | 'instagram';

export interface AnalyticsMetric {
  type: string;
  value: number;
  timestamp: string;
}

export interface FacebookPost {
  id: string;
  type: string;
  createdAt: string;
  message: string | null;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  impressions: number;
  impressionsUnique: number;
  clicks: number;
}

export interface FacebookAnalyticsData {
  metrics: AnalyticsMetric[];
  posts: FacebookPost[];
  availableConnections: {
    platform: Platform;
    accountId: string;
    isActive: boolean;
  }[];
}

export interface InstagramPost {
  id: string;
  type: string;
  createdAt: string;
  message: string | null;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  impressions: number;
  impressionsUnique: number;
  clicks: number;
}

export interface InstagramAnalyticsData {
  metrics: AnalyticsMetric[];
  posts: InstagramPost[];
  availableConnections: {
    platform: Platform;
    accountId: string;
    isActive: boolean;
  }[];
}

export type TimeRange = '7d' | '30d' | '90d' | '1y' | 'custom';

export interface DateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}
