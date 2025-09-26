'use client';

import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/features/auth/presentation/contexts/UserContext';
import { ConnectionsAdapter } from '@/features/oauth/infrastructure/adapters/ConnectionsAdapter';
import { oauthQueryKeys } from '@/lib/query/queryKeys';
import { analyticsQueryKeys } from '@/features/analytics/presentation/hooks/queries/useAnalyticsQuery';
import { analyticsApiAdapter } from '@/features/analytics/infrastructure/adapters/analyticsApiAdapter';
import moment from 'moment';

interface DataPrefetchProviderProps {
  children: React.ReactNode;
}

export function DataPrefetchProvider({ children }: DataPrefetchProviderProps) {
  const queryClient = useQueryClient();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const prefetchCriticalData = async () => {
      try {
        // 1. Prefetch connections (datos críticos)
        const connectionAdapter = new ConnectionsAdapter();
        
        await queryClient.prefetchQuery({
          queryKey: oauthQueryKeys.connections(),
          queryFn: () => connectionAdapter.getConnections(),
          staleTime: 5 * 60 * 1000, // 5 minutos
        });

        // 2. Una vez que tenemos las conexiones, prefetch analytics si es necesario
        const connections = queryClient.getQueryData(oauthQueryKeys.connections()) as any[];
        
        if (connections && connections.length > 0) {
          const defaultDateRange = {
            startDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD')
          };

          // Prefetch analytics para cada conexión activa
          const prefetchPromises = connections
            .filter(conn => conn.status === 'active')
            .map(async (connection) => {
              const accountId = connection.pageInfo?.id;
              if (!accountId) return;

              if (connection.platform === 'facebook') {
                // Prefetch Facebook analytics y posts
                await Promise.all([
                  queryClient.prefetchQuery({
                    queryKey: analyticsQueryKeys.facebook.analytics(accountId, defaultDateRange),
                    queryFn: () => analyticsApiAdapter.getFacebookAnalytics(
                      accountId, 
                      defaultDateRange.startDate, 
                      defaultDateRange.endDate
                    ),
                    staleTime: 2 * 60 * 1000, // 2 minutos para analytics
                  }),
                  queryClient.prefetchQuery({
                    queryKey: analyticsQueryKeys.facebook.posts(accountId, 10),
                    queryFn: () => analyticsApiAdapter.getFacebookPosts(accountId, 10),
                    staleTime: 3 * 60 * 1000, // 3 minutos para posts
                  })
                ]);
              } else if (connection.platform === 'instagram') {
                // Prefetch Instagram analytics y posts
                await Promise.all([
                  queryClient.prefetchQuery({
                    queryKey: analyticsQueryKeys.instagram.analytics(accountId, defaultDateRange),
                    queryFn: () => analyticsApiAdapter.getInstagramAnalytics(
                      accountId, 
                      defaultDateRange.startDate, 
                      defaultDateRange.endDate
                    ),
                    staleTime: 2 * 60 * 1000,
                  }),
                  queryClient.prefetchQuery({
                    queryKey: analyticsQueryKeys.instagram.posts(accountId, 10),
                    queryFn: () => analyticsApiAdapter.getInstagramPosts(accountId, 10),
                    staleTime: 3 * 60 * 1000,
                  })
                ]);
              }
            });

          await Promise.all(prefetchPromises);
        }
      } catch (error) {
        console.error('Error prefetching data:', error);
        // No hacemos nada más - TanStack Query manejará los errores en los componentes
      }
    };

    // Prefetch después de un pequeño delay para no bloquear el render inicial
    const timer = setTimeout(prefetchCriticalData, 100);
    
    return () => clearTimeout(timer);
  }, [user, queryClient]);

  return <>{children}</>;
}

// Hook para prefetch manual en navegación
export function usePrefetchAnalytics() {
  const queryClient = useQueryClient();

  const prefetchFacebookAnalytics = (accountId: string, dateRange: any) => {
    queryClient.prefetchQuery({
      queryKey: analyticsQueryKeys.facebook.analytics(accountId, dateRange),
      queryFn: () => analyticsApiAdapter.getFacebookAnalytics(
        accountId, 
        dateRange.startDate, 
        dateRange.endDate
      ),
      staleTime: 2 * 60 * 1000,
    });
  };

  const prefetchInstagramAnalytics = (accountId: string, dateRange: any) => {
    queryClient.prefetchQuery({
      queryKey: analyticsQueryKeys.instagram.analytics(accountId, dateRange),
      queryFn: () => analyticsApiAdapter.getInstagramAnalytics(
        accountId, 
        dateRange.startDate, 
        dateRange.endDate
      ),
      staleTime: 2 * 60 * 1000,
    });
  };

  return {
    prefetchFacebookAnalytics,
    prefetchInstagramAnalytics,
  };
}
