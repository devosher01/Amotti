'use client';

import { useState, useCallback } from 'react';
import { useFacebookAnalyticsQuery, useFacebookPostsQuery, useRefreshAnalytics } from './queries/useAnalyticsQuery';
import { DateRange } from '../../domain/types';

export interface UseAnalyticsReturn {
  analyticsData: any | null;
  posts: any[];
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

export function useAnalytics(): UseAnalyticsReturn {
  const [enabledAnalytics, setEnabledAnalytics] = useState(false);
  const [enabledPosts, setEnabledPosts] = useState(false);
  const [currentAccountId, setCurrentAccountId] = useState<string | null>(null);
  const [currentDateRange, setCurrentDateRange] = useState<DateRange | null>(null);

  const analyticsQuery = useFacebookAnalyticsQuery(
    currentAccountId || '', 
    currentDateRange || { startDate: '', endDate: '' }, 
    enabledAnalytics
  );
  
  const postsQuery = useFacebookPostsQuery(
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
    refreshMutation.mutate({ accountId, dateRange, platform: 'facebook' });
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
