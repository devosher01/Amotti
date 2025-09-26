import { useState, useCallback } from 'react';
import { createPublicationUseCase, CreatePublicationResult } from '../../application/use-cases/create-publication.use-case';
import { CreatePublicationCommand } from '../../application/ports/publication-repository.port';
import { usePublicationDependencies } from '../../shared/hooks/usePublicationDependencies';
import { useAuth } from '@/features/authV2/presentation/hooks/useAuth';
import { Platform, ContentType } from '../../domain/types/platform';
import { Content } from '../../domain/value-objects/content';
import { useAssetProcessor } from './useAssetProcessor';
import { useCalendarRefetchStore } from '../store/calendarRefetch.store';

export interface CreatePublicationInput {
  content: {
    text: string;
    hashtags?: string[];
    mentions?: string[];
    links?: string[];
    media?: Array<{ type: 'image' | 'video'; url: string; alt?: string }>;
  };
  platforms: Platform[];
  platformContentTypes: Record<Platform, ContentType>;
  action: 'draft' | 'schedule' | 'publish_now';
  scheduledAt?: Date;
  hasFiles?: boolean;
  files?: File[];
}

export interface UseCreatePublicationReturn {
  createPublication: (input: CreatePublicationInput) => Promise<CreatePublicationResult>;
  isCreating: boolean;
  error: string | null;
  clearError: () => void;
}

export function useCreatePublication(): UseCreatePublicationReturn {
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dependencies = usePublicationDependencies();
  const { processAssets } = useAssetProcessor();
  const { triggerCalendarRefetch } = useCalendarRefetchStore();

  const createPublication = useCallback(async (input: CreatePublicationInput): Promise<CreatePublicationResult> => {
    setIsCreating(true);
    setError(null);

    try {
      let mediaUrls: Array<{ type: 'image' | 'video'; url: string; alt?: string }> = [];

      if (input.hasFiles && input.files && input.files.length > 0) {
        const assetResult = await processAssets({ files: input.files });
        
        if (!assetResult.success) {
          throw new Error(assetResult.error || 'Failed to process assets');
        }
        
        mediaUrls = assetResult.mediaUrls;
      } else {
        mediaUrls = input.content.media || [];
      }

      const command: CreatePublicationCommand = {
        userId: user?.userId as unknown as UserId,
        content: {
          ...input.content,
          media: mediaUrls
        } as unknown as Content,
        platforms: input.platforms,
        platformContentTypes: input.platformContentTypes,
        action: input.action,
        scheduledAt: input.scheduledAt
      };

      const result = await createPublicationUseCase(command, dependencies);

      if (!result.success) {
        console.error('❌ Publication creation failed:', result);
        setError(result.message);
      } else {
        triggerCalendarRefetch();
      }

      return result;
    } catch (err) {
      const errorResult = {
        success: false,
        message: 'Error inesperado al crear la publicación',
        errors: [err instanceof Error ? err.message : 'Unknown error']
      };
      setError(errorResult.message);
      return errorResult;
    } finally {
      setIsCreating(false);
    }
  }, [user?.userId, dependencies, processAssets, triggerCalendarRefetch]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    createPublication,
    isCreating,
    error,
    clearError
  };
}
