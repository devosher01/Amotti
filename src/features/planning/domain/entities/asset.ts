export type AssetType = 'image' | 'video';
export type AssetStatus = 'processing' | 'completed' | 'failed';

export type AssetUrls = {
  original: string;
  optimized?: string;
  thumbnail?: string;
  compressed?: string;
};

export type Asset = {
  id: AssetId;
  userId: UserId;
  type: AssetType;
  status: AssetStatus;
  metadata: {
    size: number;
    mimeType: string;
    originalName: string;
  };
  urls: AssetUrls;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

export function createAsset(
  id: AssetId,
  userId: UserId,
  type: AssetType,
  metadata: Asset['metadata'],
  tags: string[] = []
): Asset {
  const now = new Date();

  return {
    id,
    userId,
    type,
    status: 'processing',
    metadata,
    urls: { original: '' },
    tags,
    createdAt: now,
    updatedAt: now
  };
}

export function fromSnapshot(data: any): Asset {
  return {
    id: data.id,
    userId: data.userId,
    type: data.type,
    status: data.status,
    metadata: data.metadata,
    urls: data.urls,
    tags: data.tags || [],
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt)
  };
}

export function isCompleted(asset: Asset): boolean {
  return asset.status === 'completed';
}

export function isFailed(asset: Asset): boolean {
  return asset.status === 'failed';
}

export function isProcessing(asset: Asset): boolean {
  return asset.status === 'processing';
}

export function getOptimizedUrl(asset: Asset): string {
  return asset.urls.optimized || asset.urls.original;
}

export function getThumbnailUrl(asset: Asset): string {
  return asset.urls.thumbnail || asset.urls.original;
}
