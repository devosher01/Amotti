/**
 * Application Layer: Asset Repository Port
 * Define el contrato para manejo de assets
 */

import { Asset, AssetType } from '../../domain/entities/asset';

// Command DTOs
export interface UploadAssetCommand {
  file: File;
  type: AssetType;
  tags?: string[];
}

export interface GetAssetQuery {
  id: AssetId;
}

// Response DTOs
export interface UploadAssetResponse {
  assetId: AssetId;
  status: 'processing' | 'completed' | 'failed';
}

/**
 * Repository Port - Define contrato de acceso a assets
 */
export interface AssetRepositoryPort {
  // Subir asset
  upload(command: UploadAssetCommand): Promise<UploadAssetResponse>;
  
  // Obtener asset por ID
  getById(query: GetAssetQuery): Promise<Asset>;
}
