import { httpClient } from '@/lib/http-client';
import { AssetRepository } from '../../domain/ports';
import { Asset, UploadAssetRequest, ListAssetsQuery, ListAssetsResponse, UploadResult } from '../../domain/entities';

export class HttpAssetAdapter implements AssetRepository {
  
  async upload(request: UploadAssetRequest): Promise<UploadResult> {
    try {
      const formData = new FormData();
      formData.append('file', request.file);
      formData.append('type', request.type);
      request.tags.forEach(tag => formData.append('tags[]', tag));
      formData.append('aspectRatio', request.aspectRatio);
      formData.append('width', request.width.toString());
      formData.append('height', request.height.toString());
      formData.append('crop', request.crop);
      formData.append('gravity', request.gravity);
      
      if (request.bitRate) {
        formData.append('bitRate', request.bitRate);
      }
      
      if (request.quality) {
        formData.append('quality', request.quality.toString());
      }

      const response = await httpClient.post<{ data: Asset }>('/assets/upload', formData);
      console.log('🔍 HTTP Asset Response:', response);
      
      return {
        success: true,
        asset: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al subir archivo'
      };
    }
  }

  async list(query: ListAssetsQuery): Promise<ListAssetsResponse> {
    const params = new URLSearchParams();
    
    if (query.type) params.append('type', query.type);
    if (query.status) params.append('status', query.status);
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.offset) params.append('offset', query.offset.toString());

    const response = await httpClient.get<{
      assets: Asset[];
      total: number;
      limit: number;
      offset: number;
    }>(`/assets?${params.toString()}`);

    return {
      assets: response.assets,
      total: response.total,
      limit: response.limit,
      offset: response.offset,
      hasMore: (response.offset + response.assets.length) < response.total
    };
  }

  async getById(id: string): Promise<Asset> {
    return httpClient.get<Asset>(`/assets/${id}`);
  }

  async delete(id: string): Promise<void> {
    await httpClient.delete(`/assets/${id}`);
  }

  async getUrl(id: string, type: 'original' | 'thumbnail' | 'compressed' | 'optimized'): Promise<string> {
    const response = await httpClient.get<{ url: string }>(`/assets/${id}/url/${type}`);
    return response.url;
  }
}