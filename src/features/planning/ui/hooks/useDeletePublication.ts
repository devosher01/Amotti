'use client';

import { useState, useCallback } from 'react';
import { 
  deletePublicationUseCase, 
  DeletePublicationResult 
} from '../../application/use-cases/delete-publication.use-case';
import { DeleteCommand } from '../../application/ports/publication-repository.port';
import { usePublicationDependencies } from '../../shared/hooks/usePublicationDependencies';
import { useAuth } from '@/features/authV2/presentation/hooks/useAuth';

export interface DeletePublicationInput {
  id: string;
  reason?: string;
}

export interface UseDeletePublicationReturn {
  deletePublication: (input: DeletePublicationInput) => Promise<DeletePublicationResult>;
  isDeleting: boolean;
  error: string | null;
  clearError: () => void;
}

export function useDeletePublication(): UseDeletePublicationReturn {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dependencies = usePublicationDependencies();

  const deletePublication = useCallback(async (input: DeletePublicationInput): Promise<DeletePublicationResult> => {
    setIsDeleting(true);
    setError(null);

    try {
      const command: DeleteCommand = {
        id: input.id,
        userId: user?.userId!,
        reason: input.reason
      };

      console.log('🗑️ Deleting publication:', command);

      const result = await deletePublicationUseCase(command, dependencies);
      
      if (!result.success) {
        setError(result.message);
      }

      return result;
    } catch (err) {
      console.error('❌ Delete publication hook error:', err);
      const errorResult = {
        success: false,
        message: 'Error inesperado al eliminar la publicación',
        errors: [err instanceof Error ? err.message : 'Unknown error']
      };
      setError(errorResult.message);
      return errorResult;
    } finally {
      setIsDeleting(false);
    }
  }, [user?.userId, dependencies]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    deletePublication,
    isDeleting,
    error,
    clearError
  };
}