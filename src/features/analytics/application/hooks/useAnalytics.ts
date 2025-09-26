import { useState, useEffect, useCallback } from 'react';
import { analyticsApiAdapter } from '../../infrastructure/adapters/analyticsApiAdapter';
import { FacebookAnalyticsData, FacebookPost, TimeRange, DateRange } from '../../domain/types';

interface AnalyticsHookResult {
  data: FacebookAnalyticsData | null;
  posts: FacebookPost[];
  loading: boolean;
  error: string | null;
  fetchAnalytics: (accountId: string, dateRange: DateRange) => void;
  fetchPosts: (accountId: string, limit: number) => void;
}

export const useAnalytics = (): AnalyticsHookResult => {
  const [data, setData] = useState<FacebookAnalyticsData | null>(null);
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async (accountId: string, dateRange: DateRange) => {
    setLoading(true);
    setError(null);
    try {
      const analyticsData = await analyticsApiAdapter.getFacebookAnalytics(
        accountId,
        dateRange.startDate,
        dateRange.endDate
      );
      setData(analyticsData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPosts = useCallback(async (accountId: string, limit: number) => {
    setLoading(true);
    setError(null);
    try {
      const postsData = await analyticsApiAdapter.getFacebookPosts(accountId, limit);
      setPosts(postsData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch posts data');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, posts, loading, error, fetchAnalytics, fetchPosts };
};
