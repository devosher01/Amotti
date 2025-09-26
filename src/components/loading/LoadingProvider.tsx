'use client';

import React, { useEffect } from 'react';
import { useSimpleLoading } from '@/hooks/useSimpleLoading';
import { useUser } from '@/features/auth/presentation/contexts/UserContext';
import { useConnectionsQuery } from '@/features/oauth/presentation/hooks/queries/useConnectionsQuery';
import { useFacebookAnalyticsQuery, useFacebookPostsQuery, useInstagramAnalyticsQuery, useInstagramPostsQuery } from '@/features/analytics/presentation/hooks/queries/useAnalyticsQuery';
import moment from 'moment';

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const { registerLoader, setLoading } = useSimpleLoading();
  const { user, isLoading: userLoading } = useUser();
  const connections = useConnectionsQuery(!!user);

  const defaultDateRange = React.useMemo(() => ({
    startDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD')
  }), []);

  const facebookConnection = connections.connections.find(conn => conn.platform === 'facebook' && conn.status === 'active');
  const instagramConnection = connections.connections.find(conn => conn.platform === 'instagram' && conn.status === 'active');

  const facebookAnalytics = useFacebookAnalyticsQuery(
    facebookConnection?.pageInfo?.id || '',
    defaultDateRange,
    !!facebookConnection?.pageInfo?.id && !connections.isLoading
  );
  
  const facebookPosts = useFacebookPostsQuery(
    facebookConnection?.pageInfo?.id || '',
    10,
    !!facebookConnection?.pageInfo?.id && !connections.isLoading
  );

  const instagramAnalytics = useInstagramAnalyticsQuery(
    instagramConnection?.pageInfo?.id || '',
    defaultDateRange,
    !!instagramConnection?.pageInfo?.id && !connections.isLoading
  );
  
  const instagramPosts = useInstagramPostsQuery(
    instagramConnection?.pageInfo?.id || '',
    10,
    !!instagramConnection?.pageInfo?.id && !connections.isLoading
  );

  useEffect(() => {
    registerLoader('user', { 
      priority: 'critical', 
      required: true, 
      name: 'Usuario' 
    });
    
    registerLoader('connections', { 
      priority: 'high', 
      required: true, 
      name: 'Conexiones' 
    });
    
    // Comentado para no esperar las analíticas para mostrar el contenido
    // registerLoader('facebook-analytics', { 
    //   priority: 'high', 
    //   required: true, 
    //   name: 'Analíticas Facebook' 
    // });
    
    // Comentado para no esperar las analíticas para mostrar el contenido
    // registerLoader('instagram-analytics', { 
    //   priority: 'high', 
    //   required: true, 
    //   name: 'Analíticas Instagram' 
    // });
    
  }, []);

  useEffect(() => {
    setLoading('user', userLoading);
  }, [userLoading, setLoading]);

  useEffect(() => {
    if (user) {
      setLoading('connections', connections.isLoading);
    }
  }, [user, connections.isLoading, setLoading]);

  // Comentado para no esperar las analíticas para mostrar el contenido
  // useEffect(() => {
  //   if (facebookConnection) {
  //     const isLoadingAnalytics = facebookAnalytics.isLoading || facebookPosts.isLoading;
  //     setLoading('facebook-analytics', isLoadingAnalytics);
  //   }
  // }, [facebookConnection, facebookAnalytics.isLoading, facebookPosts.isLoading, setLoading]);

  // Comentado para no esperar las analíticas para mostrar el contenido
  // useEffect(() => {
  //   if (instagramConnection) {
  //     const isLoadingAnalytics = instagramAnalytics.isLoading || instagramPosts.isLoading;
  //     setLoading('instagram-analytics', isLoadingAnalytics);
  //   }
  // }, [instagramConnection, instagramAnalytics.isLoading, instagramPosts.isLoading, setLoading]);

  return (
    <>
      {children}
      {/* {process.env.NODE_ENV === 'development' && <LoadingDebug />} */}
    </>
  );
}

function LoadingDebug() {
  const { state } = useSimpleLoading();
  
  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '12px',
      borderRadius: '6px',
      fontSize: '11px',
      zIndex: 9999,
      minWidth: '180px'
    }}>
      <div><strong>Loading Status</strong></div>
      <div>Global: {state.isGlobalLoading ? '🔄' : '✅'}</div>
      <div>Total: {state.total}</div>
      <div>Active: {state.loading}</div>
      <div>Critical: {state.critical}</div>
    </div>
  );
}

export function useAddLoader() {
  const { registerLoader, setLoading } = useSimpleLoading();

  const addLoader = (key: string, name: string, required = false) => {
    registerLoader(key, { 
      priority: required ? 'high' : 'medium', 
      required, 
      name 
    });
    return {
      start: () => setLoading(key, true),
      finish: () => setLoading(key, false),
    };
  };

  return addLoader;
}