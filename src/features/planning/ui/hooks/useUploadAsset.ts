import { useCallback } from 'react';
import { useAssets } from '../../../assets';
import { AssetType } from '../../domain/entities/asset';

export interface UploadAssetInput {
  file: File;
  type: AssetType;
  tags?: string[];
  aspectRatio?: string;
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'crop' | 'scale' | 'pad';
  gravity?: 'center' | 'face' | 'auto';
  bitRate?: string;
  quality?: number;
}

export interface UploadAssetResult {
  success: boolean;
  message: string;
  asset?: any;
  errors?: string[];
}

export interface UseUploadAssetReturn {
  uploadAsset: (input: UploadAssetInput) => Promise<UploadAssetResult>;
  isUploading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useUploadAsset(): UseUploadAssetReturn {
  const { uploadAsset: uploadAssetNew, isLoading, error, clearError } = useAssets();

  const uploadAsset = useCallback(async (input: UploadAssetInput): Promise<UploadAssetResult> => {
    try {
      // Valores por defecto inteligentes basados en el tipo
      const isVideo = input.type === 'video';
      
      const defaultAspectRatio = input.aspectRatio || (isVideo ? '9:16' : '1:1');
      const defaultWidth = input.width || 1080;
      const defaultHeight = input.height || (defaultAspectRatio === '9:16' ? 1920 : 1080);
      
      const result = await uploadAssetNew({
        file: input.file,
        type: input.type as 'image' | 'video',
        tags: input.tags || [],
        aspectRatio: defaultAspectRatio,
        width: defaultWidth,
        height: defaultHeight,
        crop: input.crop || 'fill',
        gravity: input.gravity || 'center',
        bitRate: input.bitRate || (isVideo ? '1000k' : undefined),
        quality: input.quality || 80
      });

      return {
        success: result.success,
        message: result.success ? 'Asset subido exitosamente' : (result.error || 'Error al subir asset'),
        asset: result.asset,
        errors: result.error ? [result.error] : undefined
      };
    } catch (err) {
      return {
        success: false,
        message: 'Error inesperado al subir asset',
        errors: [err instanceof Error ? err.message : 'Unknown error']
      };
    }
  }, [uploadAssetNew]);

  return {
    uploadAsset,
    isUploading: isLoading,
    error,
    clearError
  };
}
