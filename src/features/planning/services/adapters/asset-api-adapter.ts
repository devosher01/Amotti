/**
 * Services Layer: Asset API Adapter
 * Implementa el puerto de assets usando HTTP client
 */

import { HttpClient } from '../../../../lib/http-client';
import { AssetRepositoryPort, UploadAssetCommand, GetAssetQuery, UploadAssetResponse } from '../../application/ports/asset-repository.port';
import { Asset, fromSnapshot } from '../../domain/entities/asset';

export function createAssetApiAdapter(httpClient: HttpClient): AssetRepositoryPort {
  return {

    async upload(command: UploadAssetCommand): Promise<UploadAssetResponse> {
      // Crear FormData para subir archivo
      const formData = new FormData();
      formData.append('file', command.file);
      formData.append('type', command.type);
      
      if (command.tags && command.tags.length > 0) {
        formData.append('tags', command.tags.join(','));
      }

      // Usar httpClient - ahora maneja FormData correctamente
      const result = await httpClient.post<any>('/assets/upload', formData);
      
      return {
        assetId: result.data.assetId,
        status: result.data.status
      };
    },

    async getById(query: GetAssetQuery): Promise<Asset> {
      const result = await httpClient.get<any>(`/assets/${query.id}`);
      return fromSnapshot(result);
    }

  };
}
