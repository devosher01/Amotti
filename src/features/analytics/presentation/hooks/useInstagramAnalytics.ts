'use client';

import { useState, useCallback } from 'react';
import { useInstagramAnalyticsQuery, useInstagramPostsQuery, useRefreshAnalytics } from './queries/useAnalyticsQuery';
import { DateRange, InstagramAnalyticsData, InstagramPost } from '../../domain/types';

export interface UseInstagramAnalyticsReturn {
  analyticsData: InstagramAnalyticsData | null;
  posts: InstagramPost[];
  isLoadingAnalytics: boolean;
  isLoadingPosts: boolean;
  isLoading: boolean;
  analyticsError: string | null;
  postsError: string | null;
  error: string | null;
  fetchAnalytics: (accountId: string, dateRange: DateRange) => void;
  fetchPosts: (accountId: string, limit: number) => void;
  refreshData: (accountId: string, dateRange: DateRange) => void;
}

export function useInstagramAnalytics(): UseInstagramAnalyticsReturn {
  const [enabledAnalytics, setEnabledAnalytics] = useState(false);
  const [enabledPosts, setEnabledPosts] = useState(false);
  const [currentAccountId, setCurrentAccountId] = useState<string | null>(null);
  const [currentDateRange, setCurrentDateRange] = useState<DateRange | null>(null);

  const analyticsQuery = useInstagramAnalyticsQuery(
    currentAccountId || '', 
    currentDateRange || { startDate: '', endDate: '' }, 
    enabledAnalytics
  );
  
  const postsQuery = useInstagramPostsQuery(
    currentAccountId || '', 
    10, 
    enabledPosts
  );

  const refreshMutation = useRefreshAnalytics();

  const fetchAnalytics = useCallback((accountId: string, dateRange: DateRange) => {
    setCurrentAccountId(accountId);
    setCurrentDateRange(dateRange);
    setEnabledAnalytics(true);
  }, []);

  const fetchPosts = useCallback((accountId: string, limit: number) => {
    setCurrentAccountId(accountId);
    setEnabledPosts(true);
  }, []);

  const refreshData = useCallback((accountId: string, dateRange: DateRange) => {
    refreshMutation.mutate({ accountId, dateRange, platform: 'instagram' });
  }, [refreshMutation]);

  const isLoading = analyticsQuery.isLoading || postsQuery.isLoading;
  const error = analyticsQuery.error?.message || postsQuery.error?.message || null;

  return {
    analyticsData: analyticsQuery.data || null,
    posts: postsQuery.data || [],
    isLoadingAnalytics: analyticsQuery.isLoading,
    isLoadingPosts: postsQuery.isLoading,
    isLoading,
    analyticsError: analyticsQuery.error?.message || null,
    postsError: postsQuery.error?.message || null,
    error,
    fetchAnalytics,
    fetchPosts,
    refreshData,
  };
}
