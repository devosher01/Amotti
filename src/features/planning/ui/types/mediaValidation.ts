export interface MediaFile {
  id: string;
  file: File;
  type: 'image' | 'video' | 'gif' | 'document';
  url?: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
  duration?: number; // Para videos en segundos
}

export interface ValidationRule {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  platform: string;
  contentType: string;
  field: 'media' | 'content' | 'aspect_ratio' | 'resolution' | 'count' | 'mixing';
}

export interface PlatformContentTypeRules {
  maxVideos: number;
  maxImages: number;
  allowedTypes: ('image' | 'video' | 'gif' | 'document')[];
  allowMixedTypes: boolean;
  requiredAspectRatio?: number; // 9:16 = 0.5625
  maxHorizontalResolution?: number;
  minAspectRatio?: number;
  maxAspectRatio?: number;
}

export interface MediaValidationResult {
  isValid: boolean;
  errors: ValidationRule[];
  warnings: ValidationRule[];
  info: ValidationRule[];
  validatedFiles: MediaFile[];
}

export interface ContentValidationContext {
  platform: string;
  contentType: string;
  mediaFiles: MediaFile[];
  content: string;
}