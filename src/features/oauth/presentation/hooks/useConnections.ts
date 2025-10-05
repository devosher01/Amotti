'use client';

import { useConnectionsQuery } from './queries/useConnectionsQuery';
import { DisconnectionResult, ConnectionId, ConnectionsApiResponse } from '../../domain/entities';

export interface UseConnectionsReturn {
  connections: ConnectionsApiResponse;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  invalidateConnections: () => void;
  deleteConnection: (connectionId: ConnectionId) => Promise<DisconnectionResult>;
}

export function useConnections(enabled: boolean = true): UseConnectionsReturn {
  const query = useConnectionsQuery(enabled);

  const deleteConnectionWrapper = async (connectionId: ConnectionId): Promise<DisconnectionResult> => {
    return new Promise((resolve) => {
      query.deleteConnection(connectionId, {
        onSuccess: (result) => resolve(result),
        onError: (error) => resolve({
          success: false,
          message: error.message,
          data: { disconnectedPlatform: '', automaticallyDisconnected: [], disconnectedConnectionIds: [] }
        })
      });
    });
  };

  return {
    connections: query.connections,
    isLoading: query.isLoading,
    error: query.error,
    refetch: async () => {
      await query.refetch();
    },
    invalidateConnections: () => {
      query.invalidateConnections();
    },
    deleteConnection: deleteConnectionWrapper,
  };
}