'use client';

import { useState, useCallback } from 'react';
import { HttpAssetAdapter } from '../../infrastructure/adapters/http-asset.adapter';
import { Asset, UploadAssetRequest, ListAssetsQuery, UploadResult } from '../../domain/entities';

const assetAdapter = new HttpAssetAdapter();

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAsset = useCallback(async (request: UploadAssetRequest): Promise<UploadResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await assetAdapter.upload(request);
      
      if (result.success && result.asset) {
        setAssets(prev => [result.asset!, ...prev]);
      } else {
        setError(result.error || 'Error al subir archivo');
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error inesperado';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadAssets = useCallback(async (query: ListAssetsQuery = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await assetAdapter.list(query);
      setAssets(response.assets);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar assets';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteAsset = useCallback(async (id: string) => {
    try {
      await assetAdapter.delete(id);
      setAssets(prev => prev.filter(asset => asset.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar asset';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    assets,
    isLoading,
    error,
    uploadAsset,
    loadAssets,
    deleteAsset,
    clearError
  };
}