import { Asset, UploadAssetRequest, ListAssetsQuery, ListAssetsResponse, UploadResult } from './entities';

export interface AssetRepository {
  upload(request: UploadAssetRequest): Promise<UploadResult>;
  list(query: ListAssetsQuery): Promise<ListAssetsResponse>;
  getById(id: string): Promise<Asset>;
  delete(id: string): Promise<void>;
  getUrl(id: string, type: 'original' | 'thumbnail' | 'compressed' | 'optimized'): Promise<string>;
}