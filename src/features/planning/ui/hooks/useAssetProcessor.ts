'use client';

import { useCallback } from 'react';
import { useUploadAsset } from './useUploadAsset';
import { Asset } from '../../../assets/domain/entities';

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

function isAssetReady(asset: Asset): boolean {
  return asset.status === 'completed' &&
    asset.urls &&
    Boolean(asset.urls.original?.trim() || asset.urls.optimized?.trim());
}


export function useAssetProcessor() {
  const { uploadAsset } = useUploadAsset();

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

        console.log('🔍 Upload result:', uploadResult);

        if (!uploadResult.success || !uploadResult.asset) {
          const errorMsg = `Failed to upload ${file.name}: ${uploadResult.message || 'Unknown upload error'}`;
          console.error('❌ Upload failed:', { file: file.name, result: uploadResult });
          return {
            success: false,
            mediaUrls: [],
            error: errorMsg
          };
        }

        const processedAsset = await waitForAssetProcessing(uploadResult.asset.id, file.name);

        if (!processedAsset.success) {
          return {
            success: false,
            mediaUrls: [],
            error: processedAsset.error
          };
        }

        const finalUrl = processedAsset.asset?.urls.optimized?.trim() || processedAsset.asset?.urls.original?.trim();

        if (!finalUrl) {
          const errorMsg = `Asset ${file.name} failed to generate URLs after processing`;
          console.error('❌ Empty URL for asset:', processedAsset.asset || 'Asset undefined');
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
  }, [uploadAsset]);

  return { processAssets };
}

async function waitForAssetProcessing(
  assetId: string,
  _fileName: string
): Promise<{ success: boolean; asset?: Asset; error?: string }> {
  const maxAttempts = 15;
  const interval = 1000; // 1 segundo
  
  console.log(`🔄 Esperando asset ${assetId}...`);
  
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(`/api/assets/${assetId}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const asset = await response.json();
      console.log(`📊 Intento ${i + 1}: Estado = ${asset.status}`);
      
      if (asset.status === 'completed') {
        console.log('✅ Asset listo!', asset.urls);
        return {
          success: true,
          asset: asset
        };
      } else if (asset.status === 'failed') {
        console.log('❌ Asset falló:', asset.metadata?.error);
        return {
          success: false,
          error: 'Asset processing failed'
        };
      }
      
      // Esperar antes del siguiente intento
      await new Promise(resolve => setTimeout(resolve, interval));
      
    } catch (error) {
      console.error(`❌ Error en intento ${i + 1}:`, error instanceof Error ? error.message : error);
      
      if (i === maxAttempts - 1) {
        return {
          success: false,
          error: 'Network error'
        };
      }
      
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }
  
  return {
    success: false,
    error: `Timeout - No se completó en ${maxAttempts} segundos`
  };
}