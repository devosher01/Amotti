/**
 * TanStack Query Client Configuration
 * Global configuration for all queries and mutations
 */

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache Strategy
      staleTime: 5 * 60 * 1000,        // 5 minutes - considera data fresh
      gcTime: 10 * 60 * 1000,          // 10 minutes - garbage collection
      
      // Network Strategy  
      retry: 1,                         // Solo 1 retry en caso de error
      retryDelay: 1000,                // 1 segundo entre retries
      
      // Background Behavior
      refetchOnWindowFocus: false,      // No refetch al cambiar ventana
      refetchOnMount: false,            // No refetch al montar si hay cache fresh
      refetchOnReconnect: true,         // Sí refetch cuando se reconecta internet
      
      // Loading States
      throwOnError: false,              // Maneja errores en el hook, no globally
    },
    mutations: {
      retry: 0,                         // No retries en mutations
      throwOnError: false,              // Maneja errores localmente
    },
  },
});