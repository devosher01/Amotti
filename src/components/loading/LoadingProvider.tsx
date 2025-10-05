'use client';

import React, { useEffect } from 'react';
import { useSimpleLoading } from '@/hooks/useSimpleLoading';
import { useUser } from '@/features/auth/presentation/contexts/UserContext';
import { useConnectionsQuery } from '@/features/oauth/presentation/hooks/queries/useConnectionsQuery';
import { useFacebookAnalyticsQuery, useFacebookPostsQuery, useInstagramAnalyticsQuery, useInstagramPostsQuery } from '@/features/analytics/presentation/hooks/queries/useAnalyticsQuery';
import { PlatformConnection } from '@/features/oauth/domain/entities';
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

  // Get flat array of all connections
  const allConnections = React.useMemo(() => {
    if (!connections.connections) return [];
    
    // Handle both old array format and new API response format
    if (Array.isArray(connections.connections)) {
      return connections.connections;
    } else {
      // New ConnectionsApiResponse format
      return [
        ...(connections.connections.facebook || []),
        ...(connections.connections.instagram || [])
      ];
    }
  }, [connections.connections]);

  const facebookConnection = allConnections.find((conn: PlatformConnection) => conn.platform === 'facebook' && conn.isActive);
  const instagramConnection = allConnections.find((conn: PlatformConnection) => conn.platform === 'instagram' && conn.isActive);

  const facebookAnalytics = useFacebookAnalyticsQuery(
    facebookConnection?.accountId || '',
    defaultDateRange,
    !!facebookConnection?.accountId && !connections.isLoading
  );
  
  const facebookPosts = useFacebookPostsQuery(
    facebookConnection?.accountId || '',
    10,
    !!facebookConnection?.accountId && !connections.isLoading
  );

  const instagramAnalytics = useInstagramAnalyticsQuery(
    instagramConnection?.accountId || '',
    defaultDateRange,
    !!instagramConnection?.accountId && !connections.isLoading
  );
  
  const instagramPosts = useInstagramPostsQuery(
    instagramConnection?.accountId || '',
    10,
    !!instagramConnection?.accountId && !connections.isLoading
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
    } else {
      // Si no hay usuario, marcar como no loading para no bloquear
      setLoading('connections', false);
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
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [debugInfo, setDebugInfo] = React.useState<any[]>([]);
  
  // Obtener información detallada del SimpleLoadingManager
  React.useEffect(() => {
    const getDebugInfo = () => {
      try {
        // Acceder al manager directamente para obtener información detallada
        const manager = (window as any).simpleLoadingManager;
        
        if (manager && manager.getDebugInfo) {
          const states = manager.getDebugInfo();
          setDebugInfo(states);
        }
      } catch (error) {
        console.warn('No se pudo obtener debug info:', error);
      }
    };

    getDebugInfo();
    const interval = setInterval(getDebugInfo, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const getStatusIcon = (isLoading: boolean) => isLoading ? '🔄' : '✅';
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#ff4444';
      case 'high': return '#ff8800';
      case 'medium': return '#ffaa00';
      case 'low': return '#44ff44';
      default: return '#888888';
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const activeLoaders = debugInfo.filter(item => item.isLoading);
  const completedLoaders = debugInfo.filter(item => !item.isLoading);
  const criticalLoaders = debugInfo.filter(item => item.required && item.isLoading);

  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      background: 'rgba(0,0,0,0.95)',
      color: 'white',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '12px',
      zIndex: 9999,
      minWidth: '280px',
      maxWidth: '400px',
      fontFamily: 'Monaco, Consolas, monospace',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        paddingBottom: '8px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
          🚀 Loading Debug
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '10px'
          }}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {/* Summary Stats */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Estado Global:</span>
          <span style={{ color: state.isGlobalLoading ? '#ff8800' : '#44ff44' }}>
            {getStatusIcon(state.isGlobalLoading)} {state.isGlobalLoading ? 'Cargando' : 'Listo'}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Total Loaders:</span>
          <span style={{ color: '#888888' }}>{state.total}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Activos:</span>
          <span style={{ color: state.loading > 0 ? '#ff8800' : '#44ff44' }}>
            {state.loading} / {state.total}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Críticos:</span>
          <span style={{ color: state.critical > 0 ? '#ff4444' : '#44ff44' }}>
            {state.critical}
          </span>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
          {/* Critical Loaders - LO QUE ESTÁ BLOQUEANDO */}
          {criticalLoaders.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#ff4444' }}>
                🚨 BLOQUEANDO LA UI ({criticalLoaders.length})
              </div>
              {criticalLoaders.map((loader) => (
                <div key={loader.key} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 8px',
                  margin: '2px 0',
                  background: 'rgba(255,68,68,0.15)',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,68,68,0.3)',
                  borderLeft: '3px solid #ff4444'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#ff4444', fontSize: '14px' }}>🚨</span>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#ff4444' }}>{loader.name}</div>
                      <div style={{ fontSize: '10px', color: '#888888' }}>
                        {loader.key} • {loader.priority} • {formatDuration(loader.duration)}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '10px', color: '#ff4444', fontWeight: 'bold' }}>
                    CRÍTICO
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Active Loaders - LO QUE ESTÁ CARGANDO */}
          {activeLoaders.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#ff8800' }}>
                🔄 Cargando ({activeLoaders.length})
              </div>
              {activeLoaders.map((loader) => (
                <div key={loader.key} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '4px 8px',
                  margin: '2px 0',
                  background: 'rgba(255,136,0,0.1)',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,136,0,0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: getPriorityColor(loader.priority) }}>●</span>
                    <div>
                      <div>{loader.name}</div>
                      <div style={{ fontSize: '10px', color: '#888888' }}>
                        {loader.key} • {formatDuration(loader.duration)}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '10px', color: '#888888' }}>
                    {loader.priority}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Completed Loaders - LO QUE YA TERMINÓ */}
          {completedLoaders.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#44ff44' }}>
                ✅ Completados ({completedLoaders.length})
              </div>
              {completedLoaders.slice(0, 3).map((loader) => (
                <div key={loader.key} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '4px 8px',
                  margin: '2px 0',
                  background: 'rgba(68,255,68,0.1)',
                  borderRadius: '4px',
                  border: '1px solid rgba(68,255,68,0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: getPriorityColor(loader.priority) }}>●</span>
                    <div>
                      <div>{loader.name}</div>
                      <div style={{ fontSize: '10px', color: '#888888' }}>
                        {loader.key} • {formatDuration(loader.duration)}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '10px', color: '#888888' }}>
                    {loader.priority}
                  </div>
                </div>
              ))}
              {completedLoaders.length > 3 && (
                <div style={{ fontSize: '10px', color: '#888888', textAlign: 'center', marginTop: '4px' }}>
                  +{completedLoaders.length - 3} más completados...
                </div>
              )}
            </div>
          )}

          {/* Debug Info */}
          <div style={{
            marginTop: '12px',
            padding: '8px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '6px',
            fontSize: '10px',
            color: '#888888'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>🔍 Debug Info</div>
            <div>Total loaders: {debugInfo.length}</div>
            <div>Activos: {activeLoaders.length}</div>
            <div>Críticos: {criticalLoaders.length}</div>
            <div>Completados: {completedLoaders.length}</div>
            {criticalLoaders.length > 0 && (
              <div style={{ marginTop: '4px', padding: '4px', background: 'rgba(255,68,68,0.1)', borderRadius: '4px' }}>
                <div style={{ color: '#ff4444', fontWeight: 'bold' }}>⚠️ PROBLEMA DETECTADO</div>
                <div>Los loaders críticos están bloqueando la UI</div>
                <div>Revisa: {criticalLoaders.map(l => l.name).join(', ')}</div>
              </div>
            )}
          </div>
        </div>
      )}
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