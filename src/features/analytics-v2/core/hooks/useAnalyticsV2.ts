'use client';

import { useQuery } from '@tanstack/react-query';
import { analyticsV2Service } from '../api/client';
import { Platform, TimeRange, AnalyticsResponse, PostsResponse } from '../api/types';

// Query Keys para Analytics V2
export const analyticsV2QueryKeys = {
  all: ['analytics-v2'] as const,
  
  metrics: (platform: Platform, days: TimeRange) => 
    [...analyticsV2QueryKeys.all, 'metrics', platform, days] as const,
    
  posts: (platform: Platform, limit: number) => 
    [...analyticsV2QueryKeys.all, 'posts', platform, limit] as const,
    
  // Platform-specific
  facebook: {
    metrics: (days: TimeRange) => 
      [...analyticsV2QueryKeys.all, 'facebook', 'metrics', days] as const,
    posts: (limit: number) => 
      [...analyticsV2QueryKeys.all, 'facebook', 'posts', limit] as const,
  },
  
  instagram: {
    metrics: (days: TimeRange) => 
      [...analyticsV2QueryKeys.all, 'instagram', 'metrics', days] as const,
    posts: (limit: number) => 
      [...analyticsV2QueryKeys.all, 'instagram', 'posts', limit] as const,
  },
} as const;

// Hook principal para métricas
export function useAnalyticsMetrics(
  platform: Platform, 
  days: TimeRange, 
  enabled: boolean = true
) {
  return useQuery({
    queryKey: analyticsV2QueryKeys.metrics(platform, days),
    queryFn: () => analyticsV2Service.getMetrics(platform, days),
    enabled,
    staleTime: 5 * 60 * 1000,  // 5 minutos
    gcTime: 10 * 60 * 1000,    // 10 minutos
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook principal para posts
export function useAnalyticsPosts(
  platform: Platform, 
  limit: number, 
  enabled: boolean = true
) {
  return useQuery({
    queryKey: analyticsV2QueryKeys.posts(platform, limit),
    queryFn: () => analyticsV2Service.getPosts(platform, limit),
    enabled,
    staleTime: 5 * 60 * 1000,  // 5 minutos
    gcTime: 10 * 60 * 1000,    // 10 minutos
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook específico para Facebook
export function useFacebookAnalytics(days: TimeRange, enabled: boolean = true) {
  const metricsQuery = useQuery({
    queryKey: analyticsV2QueryKeys.facebook.metrics(days),
    queryFn: () => analyticsV2Service.getFacebookMetrics(days),
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const postsQuery = useQuery({
    queryKey: analyticsV2QueryKeys.facebook.posts(10),
    queryFn: () => analyticsV2Service.getFacebookPosts(10),
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    metrics: {
      data: metricsQuery.data,
      isLoading: metricsQuery.isLoading,
      error: metricsQuery.error,
      refetch: metricsQuery.refetch,
    },
    posts: {
      data: postsQuery.data,
      isLoading: postsQuery.isLoading,
      error: postsQuery.error,
      refetch: postsQuery.refetch,
    },
    isLoading: metricsQuery.isLoading || postsQuery.isLoading,
    error: metricsQuery.error || postsQuery.error,
  };
}

// Hook específico para Instagram
export function useInstagramAnalytics(days: TimeRange, enabled: boolean = true) {
  const metricsQuery = useQuery({
    queryKey: analyticsV2QueryKeys.instagram.metrics(days),
    queryFn: () => analyticsV2Service.getInstagramMetrics(days),
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const postsQuery = useQuery({
    queryKey: analyticsV2QueryKeys.instagram.posts(10),
    queryFn: () => analyticsV2Service.getInstagramPosts(10),
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    metrics: {
      data: metricsQuery.data,
      isLoading: metricsQuery.isLoading,
      error: metricsQuery.error,
      refetch: metricsQuery.refetch,
    },
    posts: {
      data: postsQuery.data,
      isLoading: postsQuery.isLoading,
      error: postsQuery.error,
      refetch: postsQuery.refetch,
    },
    isLoading: metricsQuery.isLoading || postsQuery.isLoading,
    error: metricsQuery.error || postsQuery.error,
  };
}