'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Configuración estratégica por tipo de dato
            staleTime: 2 * 60 * 1000, // 2 minutos por defecto
            gcTime: 10 * 60 * 1000, // 10 minutos en cache
            retry: (failureCount, error: any) => {
              // No reintentar errores de autenticación
              if (error?.status === 401 || error?.status === 403) {
                return false;
              }
              // Máximo 2 reintentos para otros errores
              return failureCount < 2;
            },
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            // Evitar refetch innecesario al montar
            refetchOnMount: false,
          },
          mutations: {
            retry: (failureCount, error: any) => {
              // No reintentar mutaciones de autenticación
              if (error?.status === 401 || error?.status === 403) {
                return false;
              }
              return failureCount < 1; // Solo 1 reintento para mutaciones
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
} 