'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { oauthQueryKeys } from '@/lib/query/queryKeys';
import { ConnectionsAdapter } from '../../../infrastructure/adapters/ConnectionsAdapter';
import { PlatformConnection, ConnectionId, ConnectionsApiResponse } from '../../../domain/entities';
import { useUser } from '@/features/auth/presentation/contexts/UserContext';

export function useConnectionsQuery(enabled?: boolean) {
  const queryClient = useQueryClient();
  const adapter = new ConnectionsAdapter();
  const { user } = useUser();

  // Auto-enable cuando hay usuario autenticado, a menos que se diga lo contrario
  const shouldEnable = enabled !== undefined ? enabled : !!user;

  const connectionsQuery = useQuery({
    queryKey: oauthQueryKeys.connections(),
    queryFn: async () => {
      try {
        const result = await adapter.getConnections();
        return result;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos - las conexiones no cambian frecuentemente
    gcTime: 10 * 60 * 1000, // 10 minutos en cache
    retry: 2,
    enabled: shouldEnable,
    refetchOnMount: false, // No refetch al montar si ya hay datos frescos
    refetchOnWindowFocus: false,
    refetchOnReconnect: true, // Sí refetch al reconectar
  });

  const deleteConnectionMutation = useMutation({
    mutationFn: (connectionId: ConnectionId) => adapter.deleteConnection(connectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: oauthQueryKeys.connections()
      });
    },
  });

  return {
    connections: connectionsQuery.data || { total: 0, facebook: [], instagram: [] } as ConnectionsApiResponse,
    isLoading: connectionsQuery.isLoading,
    error: connectionsQuery.error?.message || null,
    refetch: connectionsQuery.refetch,
    invalidateConnections: () => {
      queryClient.invalidateQueries({
        queryKey: oauthQueryKeys.connections()
      });
    },
    deleteConnection: deleteConnectionMutation.mutate,
    isDeleting: deleteConnectionMutation.isPending,
  };
}