export type Platform = 'facebook' | 'instagram';
export type TimeRange = 7 | 30;

// API Response structures matching Analytics API V2
export interface AnalyticsResponse {
  platform: Platform;
  period: {
    days: number;
    startDate: string;    // ISO 8601
    endDate: string;      // ISO 8601
  };
  metrics: Array<{
    type: string;         // e.g., "reach", "page_follows", "likes"
    value: number;
  }>;
  summary: {
    totalPosts: number;
    avgEngagement: number;
    topPostType: string;  // "photo" | "video" | "text" | "carousel"
  };
}

export interface PostsResponse {
  platform: Platform;
  posts: Array<{
    id: string;
    platform: Platform;
    type: 'photo' | 'video' | 'text' | 'carousel' | 'reel' | 'story';
    message: string;
    createdAt: string;    // ISO 8601
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
    impressions: number;
    clicks?: number;      // Instagram only
  }>;
  total: number;
}

// Individual post type
export interface Post {
  id: string;
  platform: Platform;
  type: 'photo' | 'video' | 'text' | 'carousel' | 'reel' | 'story';
  message: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  impressions: number;
  clicks?: number;
}

// Metric type
export interface Metric {
  type: string;
  value: number;
}

// Summary type
export interface Summary {
  totalPosts: number;
  avgEngagement: number;
  topPostType: string;
}