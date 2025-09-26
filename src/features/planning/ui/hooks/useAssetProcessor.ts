'use client';

import { useCallback } from 'react';
import { useUploadAsset } from './useUploadAsset';
import { usePublicationDependencies } from '../../shared/hooks/usePublicationDependencies';

export interface ProcessedMediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

export interface AssetProcessorInput {
  files: File[];
}

export interface AssetProcessorResult {
  success: boolean;
  mediaUrls: ProcessedMediaItem[];
  error?: string;
}

function isAssetReady(asset: any): boolean {
  return asset &&
    asset.status === 'completed' &&
    asset.urls &&
    (asset.urls.original?.trim() || asset.urls.optimized?.trim());
}


export function useAssetProcessor() {
  const { uploadAsset } = useUploadAsset();
  const dependencies = usePublicationDependencies();

  const processAssets = useCallback(async (input: AssetProcessorInput): Promise<AssetProcessorResult> => {
    const mediaUrls: ProcessedMediaItem[] = [];

    try {
      console.log('📤 Starting file uploads...', { fileCount: input.files.length });

      for (const file of input.files) {
        const assetType = file.type.startsWith('video/') ? 'video' : 'image';

        console.log(`📁 Uploading ${file.name} as ${assetType}...`);

        const uploadResult = await uploadAsset({
          file,
          type: assetType,
          tags: ['publication', assetType]
        });

        if (!uploadResult.success || !uploadResult.assetId) {
          const errorMsg = `Failed to upload ${file.name}: ${uploadResult.message || 'Unknown upload error'}`;
          console.error('❌ Upload failed:', { file: file.name, result: uploadResult });
          return {
            success: false,
            mediaUrls: [],
            error: errorMsg
          };
        }

        const processedAsset = await waitForAssetProcessing(uploadResult.assetId, file.name, dependencies);

        if (!processedAsset.success) {
          return {
            success: false,
            mediaUrls: [],
            error: processedAsset.error
          };
        }

        const finalUrl = processedAsset.asset.urls.optimized?.trim() || processedAsset.asset.urls.original?.trim();

        if (!finalUrl) {
          const errorMsg = `Asset ${file.name} failed to generate URLs after processing`;
          console.error('❌ Empty URL for asset:', processedAsset.asset);
          return {
            success: false,
            mediaUrls: [],
            error: errorMsg
          };
        }

        mediaUrls.push({
          type: assetType,
          url: finalUrl
        });
      }

      console.log('✅ All uploads completed. Media URLs:', mediaUrls);
      return {
        success: true,
        mediaUrls
      };

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown asset processing error';
      console.error('❌ Asset processing failed:', error);
      return {
        success: false,
        mediaUrls: [],
        error: errorMsg
      };
    }
  }, [uploadAsset, dependencies]);

  return { processAssets };
}

async function waitForAssetProcessing(
  assetId: string,
  fileName: string,
  dependencies: any
): Promise<{ success: boolean; asset?: any; error?: string }> {
  let retryCount = 0;
  const maxRetries = 10;
  const retryDelay = 3000;

  while (retryCount < maxRetries) {
    try {
      const asset = await dependencies.assetRepository.getById({ id: assetId });

      console.log(`📋 Attempt ${retryCount + 1}/${maxRetries} - Asset status: ${asset.status}`, {
        id: asset.id,
        status: asset.status,
        hasOriginalUrl: !!asset.urls?.original?.trim(),
        hasOptimizedUrl: !!asset.urls?.optimized?.trim()
      });

      if (isAssetReady(asset)) {
        return { success: true, asset };
      }

      if (retryCount < maxRetries - 1) {
        const remainingTime = (maxRetries - retryCount - 1) * retryDelay / 1000;
        console.log(`⏳ Asset still processing (${asset.status}) - waiting ${retryDelay / 1000}s... (${remainingTime}s remaining)`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }

      retryCount++;
    } catch (error) {
      console.error(`❌ Error getting asset ${assetId} (attempt ${retryCount + 1}):`, error);
      retryCount++;

      if (retryCount >= maxRetries) {
        return {
          success: false,
          error: `Failed to get asset info for ${fileName} after ${maxRetries} attempts. Last error: ${error}`
        };
      }

      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }

  return {
    success: false,
    error: `Asset ${fileName} processing timeout after ${maxRetries} attempts`
  };
}