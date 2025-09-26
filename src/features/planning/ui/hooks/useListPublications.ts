'use client';

import { useState, useCallback, useEffect } from 'react';
import { Platform } from '../../domain/types/platform';
import { Publication } from '../../domain/entities/publication';
import { listPublicationsUseCase } from '../../application/use-cases/list-publications.use-case';
import { ListPublicationsQuery } from '../../application/ports/publication-repository.port';
import { usePublicationDependencies } from '../../shared/hooks/usePublicationDependencies';
import { useAuth } from '@/features/authV2/presentation/hooks/useAuth';

export interface ListPublicationsInput {
  status?: string;
  platform?: Platform;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  autoFetch?: boolean;
}

export interface UseListPublicationsReturn {
  publications: Publication[];
  total: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchPublications: (input?: ListPublicationsInput) => Promise<void>;
  refetch: () => Promise<void>;
  clearError: () => void;
}

export function useListPublications(initialInput?: ListPublicationsInput): UseListPublicationsReturn {
  const { user } = useAuth();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [lastQuery, setLastQuery] = useState<ListPublicationsInput | undefined>(initialInput);

  const dependencies = usePublicationDependencies();

  const fetchPublications = useCallback(async (input?: ListPublicationsInput) => {
    if (!user?.userId) {
      setError('Usuario no autenticado');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const query: ListPublicationsQuery = {
        userId: user.userId,
        status: input?.status,
        platform: input?.platform,
        startDate: input?.startDate,
        endDate: input?.endDate,
        limit: input?.limit || 50,
        offset: input?.offset || 0
      };

      const result = await listPublicationsUseCase(query, dependencies);

      console.log('ESTE ES UN DEBUG de list publications desde el hook', result);

      if (result.success && result.data) {
        setPublications(result.data.publications);
        setTotal(result.data.total);
        setHasMore(result.data.hasMore);
        setLastQuery(input);
      } else {
        setError(result.message);
        setPublications([]);
        setTotal(0);
        setHasMore(false);
      }
    } catch (err) {
      console.error('❌ List publications hook error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error inesperado al cargar publicaciones';
      setError(errorMessage);
      setPublications([]);
      setTotal(0);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [user?.userId, dependencies]);

  const refetch = useCallback(async () => {
    await fetchPublications(lastQuery);
  }, [fetchPublications, lastQuery]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (initialInput?.autoFetch !== false && user?.userId) {
      fetchPublications(initialInput);
    }
  }, [user?.userId]);

  return {
    publications,
    total,
    isLoading,
    error,
    hasMore,
    fetchPublications,
    refetch,
    clearError
  };
}