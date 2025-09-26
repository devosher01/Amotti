'use client';

import { useState, useCallback } from 'react';
import { updatePublicationUseCase, UpdatePublicationResult } from '../../application/use-cases/update-publication.use-case';
import { UpdatePublicationCommand } from '../../application/ports/publication-repository.port';
import { usePublicationDependencies } from '../../shared/hooks/usePublicationDependencies';
import { useAuth } from '@/features/authV2/presentation/hooks/useAuth';
import { Platform, ContentType } from '../../domain/types/platform';
import { PublicationAction } from '../../domain/types/status';
import { createContent } from '../../domain/value-objects/content';
import { useCalendarRefetchStore } from '../store/calendarRefetch.store';


export interface UpdatePublicationInput {
  id: string;
  content?: {
    text?: string;
    hashtags?: string[];
    mentions?: string[];
    links?: string[];
    media?: Array<{ id: string; type: 'image' | 'video'; url: string; alt?: string }>;
  };
  platforms?: Platform[];
  platformContentTypes?: Record<Platform, ContentType>;
  action?: PublicationAction;
  scheduledAt?: Date;
}

export interface UseUpdatePublicationReturn {
  updatePublication: (input: UpdatePublicationInput) => Promise<UpdatePublicationResult>;
  isUpdating: boolean;
  error: string | null;
  clearError: () => void;
}


export function useUpdatePublication(): UseUpdatePublicationReturn {
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dependencies = usePublicationDependencies();
  const { triggerCalendarRefetch } = useCalendarRefetchStore();

  const updatePublication = useCallback(async (input: UpdatePublicationInput): Promise<UpdatePublicationResult> => {
    setIsUpdating(true);
    setError(null);

    try {
      const command: UpdatePublicationCommand = {
        id: input.id,
        userId: user?.userId!,
        platforms: input.platforms,
        platformContentTypes: input.platformContentTypes,
        action: input.action,
        scheduledAt: input.scheduledAt
      };

      if (input.content) {
        command.content = createContent({
          text: input.content.text || '',
          hashtags: input.content.hashtags || [],
          mentions: input.content.mentions || [],
          links: input.content.links || [],
          media: input.content.media || []
        });
      }

      const result = await updatePublicationUseCase(command, dependencies);

      if (!result.success) {
        setError(result.message);
      } else {
        console.log('✅ Publication updated successfully!');
        triggerCalendarRefetch();
      }

      return result;
    } catch (err) {
      const errorResult = {
        success: false,
        message: 'Error inesperado al actualizar la publicación',
        errors: [err instanceof Error ? err.message : 'Unknown error']
      };
      setError(errorResult.message);
      return errorResult;
    } finally {
      setIsUpdating(false);
    }
  }, [user?.userId, dependencies, triggerCalendarRefetch]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    updatePublication,
    isUpdating,
    error,
    clearError
  };
}
