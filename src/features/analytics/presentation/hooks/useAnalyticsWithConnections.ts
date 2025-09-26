'use client';

import { useMemo } from 'react';
import { useConnectionsQuery } from '@/features/oauth/presentation/hooks/queries/useConnectionsQuery';
import { useFacebookAnalyticsQuery, useFacebookPostsQuery } from './queries/useAnalyticsQuery';
import { useInstagramAnalyticsQuery, useInstagramPostsQuery } from './queries/useAnalyticsQuery';
import { DateRange } from '../../domain/types';

interface UseAnalyticsWithConnectionsProps {
  dateRange: DateRange;
  postsLimit?: number;
}

export function useAnalyticsWithConnections({ 
  dateRange, 
  postsLimit = 10 
}: UseAnalyticsWithConnectionsProps) {
  const { connections, isLoading: connectionsLoading } = useConnectionsQuery();

  // Extraer conexiones activas
  const facebookConnection = useMemo(() => 
    connections.find(conn => conn.platform === 'facebook' && conn.status === 'active'),
    [connections]
  );

  const instagramConnection = useMemo(() => 
    connections.find(conn => conn.platform === 'instagram' && conn.status === 'active'),
    [connections]
  );

  // Queries de Facebook (solo si hay conexión)
  const facebookAnalytics = useFacebookAnalyticsQuery(
    facebookConnection?.pageInfo?.id || '',
    dateRange,
    !!facebookConnection?.pageInfo?.id && !connectionsLoading
  );

  const facebookPosts = useFacebookPostsQuery(
    facebookConnection?.pageInfo?.id || '',
    postsLimit,
    !!facebookConnection?.pageInfo?.id && !connectionsLoading
  );

  // Queries de Instagram (solo si hay conexión)
  const instagramAnalytics = useInstagramAnalyticsQuery(
    instagramConnection?.pageInfo?.id || '',
    dateRange,
    !!instagramConnection?.pageInfo?.id && !connectionsLoading
  );

  const instagramPosts = useInstagramPostsQuery(
    instagramConnection?.pageInfo?.id || '',
    postsLimit,
    !!instagramConnection?.pageInfo?.id && !connectionsLoading
  );

  return {
    // Connections info
    connections,
    facebookConnection,
    instagramConnection,
    connectionsLoading,

    // Facebook data
    facebookAnalytics: {
      data: facebookAnalytics.data || null,
      isLoading: facebookAnalytics.isLoading,
      error: facebookAnalytics.error?.message || null,
      refetch: facebookAnalytics.refetch,
    },
    facebookPosts: {
      data: facebookPosts.data || [],
      isLoading: facebookPosts.isLoading,
      error: facebookPosts.error?.message || null,
      refetch: facebookPosts.refetch,
    },

    // Instagram data
    instagramAnalytics: {
      data: instagramAnalytics.data || null,
      isLoading: instagramAnalytics.isLoading,
      error: instagramAnalytics.error?.message || null,
      refetch: instagramAnalytics.refetch,
    },
    instagramPosts: {
      data: instagramPosts.data || [],
      isLoading: instagramPosts.isLoading,
      error: instagramPosts.error?.message || null,
      refetch: instagramPosts.refetch,
    },

    // Global states
    isLoading: connectionsLoading || 
               facebookAnalytics.isLoading || 
               facebookPosts.isLoading ||
               instagramAnalytics.isLoading || 
               instagramPosts.isLoading,
    
    hasAnyConnection: !!facebookConnection || !!instagramConnection,
  };
}
