/**
 * Domain Business Rules: Publication Validation
 * Pure functions for validating publications
 */

import { Publication, Content, MediaItem, Platform as PlatformType, ContentType } from '../../../publications/domain/entities/publication';
import { requiresMedia } from '../value-objects/content-type';
import { isPublicationEditable } from '../value-objects/publication-status';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface MediaValidationRule {
  maxImages: number;
  maxVideos: number;
  allowedTypes: ('image' | 'video' | 'gif')[];
  allowMixedTypes: boolean;
  requiredAspectRatio?: '9:16' | '1:1' | '4:5';
  maxHorizontalResolution?: number;
}

/**
 * Get validation rules for platform + content type combination
 */
export function getMediaValidationRules(platform: PlatformType, contentType: ContentType): MediaValidationRule {
  const rulesMap: Record<PlatformType, Record<ContentType, MediaValidationRule>> = {
    facebook: {
      post: {
        maxImages: 10,
        maxVideos: 1,
        allowedTypes: ['image', 'video'],
        allowMixedTypes: true
      },
      reel: {
        maxImages: 0,
        maxVideos: 1,
        allowedTypes: ['video'],
        allowMixedTypes: false,
        requiredAspectRatio: '9:16',
        maxHorizontalResolution: 1080
      },
      story: {
        maxImages: 1,
        maxVideos: 1,
        allowedTypes: ['image', 'video'],
        allowMixedTypes: false,
        requiredAspectRatio: '9:16'
      }
    },
    instagram: {
      post: {
        maxImages: 10,
        maxVideos: 1,
        allowedTypes: ['image', 'video'],
        allowMixedTypes: true
      },
      reel: {
        maxImages: 0,
        maxVideos: 1,
        allowedTypes: ['video'],
        allowMixedTypes: false,
        requiredAspectRatio: '9:16',
        maxHorizontalResolution: 1080
      },
      story: {
        maxImages: 1,
        maxVideos: 1,
        allowedTypes: ['image', 'video'],
        allowMixedTypes: false,
        requiredAspectRatio: '9:16'
      }
    }
  };

  return rulesMap[platform][contentType];
}

/**
 * Validate publication content based on business rules
 */
export function validatePublicationContent(content: Content, platforms: readonly PlatformType[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Rule 1: Must have content (text OR media)
  const hasText = content.text.trim().length > 0;
  const hasMedia = content.media && content.media.length > 0;

  if (!hasText && !hasMedia) {
    errors.push('La publicación debe tener texto o archivos multimedia');
  }

  // Rule 2: Validate content per platform
  platforms.forEach(platform => {
    // Validate against each content type for this platform
    // For now, assume 'post' as default content type
    const contentType: ContentType = 'post'; // This would come from platformContentTypes

    // Rule 2a: Some content types require media
    if (requiresMedia(contentType) && !hasMedia) {
      errors.push(`${contentType} en ${platform} requiere archivos multimedia`);
    }

    // Rule 2b: Instagram always requires media
    if (platform === 'instagram' && !hasMedia) {
      errors.push(`Instagram requiere al menos una imagen o video`);
    }

    // Rule 2c: Facebook allows text-only posts
    if (platform === 'facebook' && !hasText && !hasMedia) {
      errors.push(`Facebook requiere al menos texto o multimedia`);
    }
  });

  // Rule 3: Text length validation
  if (hasText) {
    if (content.text.length > 2200) {
      warnings.push('El texto es muy largo, podría ser truncado en algunas plataformas');
    }
    if (content.text.length > 3000) {
      errors.push('El texto excede el límite máximo permitido');
    }
  }

  // Rule 4: Media validation (if media exists)
  if (hasMedia && content.media) {
    const mediaErrors = validateMediaItems(content.media);
    errors.push(...mediaErrors);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate media items
 */
function validateMediaItems(media: readonly MediaItem[]): string[] {
  const errors: string[] = [];

  // Rule: Maximum media items
  if (media.length > 10) {
    errors.push('Máximo 10 archivos multimedia permitidos');
  }

  // Rule: File type validation
  const validTypes = ['image', 'video', 'gif'];
  const invalidMedia = media.filter(item => !validTypes.includes(item.type));
  if (invalidMedia.length > 0) {
    errors.push('Algunos archivos tienen tipos no soportados');
  }

  return errors;
}

/**
 * Business rule: Can publication be updated?
 */
export function canPublicationBeUpdated(publication: Publication): boolean {
  return isPublicationEditable(publication.status);
}

/**
 * Business rule: Is scheduled date required for action?
 */
export function requiresScheduledAt(action: 'draft' | 'schedule' | 'publish_now'): boolean {
  return action === 'schedule';
}

/**
 * Business rule: Validate scheduled date
 */
export function validateScheduledDate(scheduledAt: string): ValidationResult {
  const errors: string[] = [];
  const scheduledDate = new Date(scheduledAt);
  const now = new Date();

  // Rule: Cannot schedule in the past
  if (scheduledDate <= now) {
    errors.push('No se pueden programar publicaciones en fechas pasadas');
  }

  // Rule: Cannot schedule more than 1 year in advance
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  
  if (scheduledDate > oneYearFromNow) {
    errors.push('No se pueden programar publicaciones con más de un año de anticipación');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: []
  };
}