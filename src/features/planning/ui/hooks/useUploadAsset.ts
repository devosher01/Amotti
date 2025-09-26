import { useState, useCallback } from 'react';
import { uploadAssetUseCase, UploadAssetResult } from '../../application/use-cases/upload-asset.use-case';
import { UploadAssetCommand } from '../../application/ports/asset-repository.port';
import { usePublicationDependencies } from '../../shared/hooks/usePublicationDependencies';
import { createAssetApiAdapter } from '../../services/adapters/asset-api-adapter';
import { httpClient } from '../../../../lib/http-client';
import { AssetType } from '../../domain/entities/asset';

export interface UploadAssetInput {
  file: File;
  type: AssetType;
  tags?: string[];
}

export interface UseUploadAssetReturn {
  uploadAsset: (input: UploadAssetInput) => Promise<UploadAssetResult>;
  isUploading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useUploadAsset(): UseUploadAssetReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const dependencies = {
    assetRepository: createAssetApiAdapter(httpClient)
  };

  const uploadAsset = useCallback(async (input: UploadAssetInput): Promise<UploadAssetResult> => {
    setIsUploading(true);
    setError(null);

    try {
      const command: UploadAssetCommand = {
        file: input.file,
        type: input.type,
        tags: input.tags
      };

      const result = await uploadAssetUseCase(command, dependencies);
      
      if (!result.success) {
        setError(result.message);
      }

      return result;
    } catch (err) {
      const errorResult = {
        success: false,
        message: 'Error inesperado al subir asset',
        errors: [err instanceof Error ? err.message : 'Unknown error']
      };
      setError(errorResult.message);
      return errorResult;
    } finally {
      setIsUploading(false);
    }
  }, [dependencies]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    uploadAsset,
    isUploading,
    error,
    clearError
  };
}
