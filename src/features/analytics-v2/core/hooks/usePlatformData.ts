'use client';

import { useMemo } from 'react';
import { Platform, TimeRange } from '../api/types';
import { useFacebookAnalytics, useInstagramAnalytics } from './useAnalyticsV2';
import { useFiltersStore } from '../store/filtersStore';

interface UsePlatformDataProps {
  platform: Platform;
  days: TimeRange;
  enabled?: boolean;
}

export function usePlatformData({ platform, days, enabled = true }: UsePlatformDataProps) {
  const facebookData = useFacebookAnalytics(days, enabled && platform === 'facebook');
  const instagramData = useInstagramAnalytics(days, enabled && platform === 'instagram');

  return useMemo(() => {
    if (platform === 'facebook') {
      return {
        platform: 'facebook' as const,
        metrics: facebookData.metrics,
        posts: facebookData.posts,
        isLoading: facebookData.isLoading,
        error: facebookData.error,
      };
    }

    return {
      platform: 'instagram' as const,
      metrics: instagramData.metrics,
      posts: instagramData.posts,
      isLoading: instagramData.isLoading,
      error: instagramData.error,
    };
  }, [platform, facebookData, instagramData]);
}

// Hook que integra con el store de filtros
export function useCurrentPlatformData() {
  const { platform, timeRange } = useFiltersStore();
  
  return usePlatformData({
    platform,
    days: timeRange,
    enabled: true,
  });
}