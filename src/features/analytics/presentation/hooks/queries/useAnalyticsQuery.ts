'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { analyticsApiAdapter } from '../../../infrastructure/adapters/analyticsApiAdapter';
import { FacebookAnalyticsData, FacebookPost, InstagramAnalyticsData, InstagramPost, DateRange } from '../../../domain/types';

// Query Keys para Analytics
export const analyticsQueryKeys = {
  all: ['analytics'] as const,
  facebook: {
    analytics: (accountId: string, dateRange: DateRange) => 
      [...analyticsQueryKeys.all, 'facebook', 'analytics', accountId, dateRange] as const,
    posts: (accountId: string, limit: number) => 
      [...analyticsQueryKeys.all, 'facebook', 'posts', accountId, limit] as const,
  },
  instagram: {
    analytics: (accountId: string, dateRange: DateRange) => 
      [...analyticsQueryKeys.all, 'instagram', 'analytics', accountId, dateRange] as const,
    posts: (accountId: string, limit: number) => 
      [...analyticsQueryKeys.all, 'instagram', 'posts', accountId, limit] as const,
  },
} as const;

// Hook para obtener analytics de Facebook
export function useFacebookAnalyticsQuery(accountId: string, dateRange: DateRange, enabled: boolean = true) {
  return useQuery({
    queryKey: analyticsQueryKeys.facebook.analytics(accountId, dateRange),
    queryFn: () => analyticsApiAdapter.getFacebookAnalytics(accountId, dateRange.startDate, dateRange.endDate),
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    enabled: enabled && !!accountId && !!dateRange.startDate && !!dateRange.endDate,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

// Hook para obtener posts de Facebook
export function useFacebookPostsQuery(accountId: string, limit: number, enabled: boolean = true) {
  return useQuery({
    queryKey: analyticsQueryKeys.facebook.posts(accountId, limit),
    queryFn: () => analyticsApiAdapter.getFacebookPosts(accountId, limit),
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    enabled: enabled && !!accountId && limit > 0,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

// Hook para obtener analytics de Instagram
export function useInstagramAnalyticsQuery(accountId: string, dateRange: DateRange, enabled: boolean = true) {
  return useQuery({
    queryKey: analyticsQueryKeys.instagram.analytics(accountId, dateRange),
    queryFn: () => analyticsApiAdapter.getInstagramAnalytics(accountId, dateRange.startDate, dateRange.endDate),
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    enabled: enabled && !!accountId && !!dateRange.startDate && !!dateRange.endDate,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

// Hook para obtener posts de Instagram
export function useInstagramPostsQuery(accountId: string, limit: number, enabled: boolean = true) {
  return useQuery({
    queryKey: analyticsQueryKeys.instagram.posts(accountId, limit),
    queryFn: () => analyticsApiAdapter.getInstagramPosts(accountId, limit),
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    enabled: enabled && !!accountId && limit > 0,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

// Hook para refrescar analytics
export function useRefreshAnalytics() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ accountId, dateRange, platform }: { accountId: string; dateRange: DateRange; platform: 'facebook' | 'instagram' }) => {
      // Invalidar y refetch ambas queries según la plataforma
      if (platform === 'facebook') {
        await Promise.all([
          queryClient.invalidateQueries({ 
            queryKey: analyticsQueryKeys.facebook.analytics(accountId, dateRange) 
          }),
          queryClient.invalidateQueries({ 
            queryKey: analyticsQueryKeys.facebook.posts(accountId, 10) 
          })
        ]);
      } else {
        await Promise.all([
          queryClient.invalidateQueries({ 
            queryKey: analyticsQueryKeys.instagram.analytics(accountId, dateRange) 
          }),
          queryClient.invalidateQueries({ 
            queryKey: analyticsQueryKeys.instagram.posts(accountId, 10) 
          })
        ]);
      }
    },
    onSuccess: () => {
      console.log('🚀 Analytics refreshed successfully');
    },
    onError: (error) => {
      console.error('❌ Error refreshing analytics:', error);
    },
  });
}
