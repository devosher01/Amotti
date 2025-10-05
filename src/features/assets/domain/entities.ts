export interface Asset {
  id: string;
  originalName: string;
  type: 'image' | 'video';
  tags: string[];
  size: number;
  mimeType: string;
  aspectRatio: string;
  width: number;
  height: number;
  crop: 'fill' | 'fit' | 'crop' | 'scale' | 'pad';
  gravity: 'center' | 'face' | 'auto';
  status: 'processing' | 'completed' | 'failed';
  urls: {
    original: string;
    thumbnail?: string;
    compressed?: string;
    optimized?: string;
  };
  bitRate?: string;
  quality?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UploadAssetRequest {
  file: File;
  type: 'image' | 'video';
  tags: string[];
  aspectRatio: string;
  width: number;
  height: number;
  crop: 'fill' | 'fit' | 'crop' | 'scale' | 'pad';
  gravity: 'center' | 'face' | 'auto';
  bitRate?: string;
  quality?: number;
}

export interface ListAssetsQuery {
  type?: 'image' | 'video';
  status?: 'processing' | 'completed' | 'failed';
  limit?: number;
  offset?: number;
}

export interface ListAssetsResponse {
  assets: Asset[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface UploadResult {
  success: boolean;
  asset?: Asset;
  error?: string;
}