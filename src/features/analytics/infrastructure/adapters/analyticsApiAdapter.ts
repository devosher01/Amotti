import { FacebookAnalyticsData, FacebookPost, InstagramAnalyticsData, InstagramPost, AnalyticsMetric, Platform } from '../../domain/types';
import { httpClient } from '@/lib/http-client';

interface AnalyticsAdapter {
  getFacebookAnalytics: (accountId: string, startDate: string, endDate: string) => Promise<FacebookAnalyticsData>;
  getFacebookPosts: (accountId: string, limit: number) => Promise<FacebookPost[]>;
  getInstagramAnalytics: (accountId: string, startDate: string, endDate: string) => Promise<InstagramAnalyticsData>;
  getInstagramPosts: (accountId: string, limit: number) => Promise<InstagramPost[]>;
}

export const analyticsApiAdapter: AnalyticsAdapter = {
  async getFacebookAnalytics(accountId, startDate, endDate) {
    const data = await httpClient.get<FacebookAnalyticsData>(
      `/analytics?platform=facebook&accountId=${accountId}&startDate=${startDate}&endDate=${endDate}`
    );
    return {
      metrics: data.metrics,
      posts: [], // Posts are fetched separately
      availableConnections: data.availableConnections,
    };
  },

  async getFacebookPosts(accountId, limit) {
    const data = await httpClient.get<{ posts: FacebookPost[] }>(
      `/analytics/posts?platform=facebook&accountId=${accountId}&limit=${limit}`
    );
    return data.posts;
  },

  async getInstagramAnalytics(accountId, startDate, endDate) {
    const data = await httpClient.get<InstagramAnalyticsData>(
      `/analytics/instagram/analytics?accountId=${accountId}&startDate=${startDate}&endDate=${endDate}`
    );
    return {
      metrics: data.metrics,
      posts: [], // Posts are fetched separately
      availableConnections: data.availableConnections,
    };
  },

  async getInstagramPosts(accountId, limit) {
    const data = await httpClient.get<{ posts: InstagramPost[] }>(
      `/analytics/instagram/posts?accountId=${accountId}&limit=${limit}`
    );
    return data.posts;
  },
};
