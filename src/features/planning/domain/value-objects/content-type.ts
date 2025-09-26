/**
 * Domain Value Object: Content Types
 * Pure functions for content type business logic
 */

export type ContentType = 'post' | 'reel' | 'story';

/**
 * Get display name for content type
 */
export function getContentTypeDisplayName(contentType: ContentType): string {
  const displayNames: Record<ContentType, string> = {
    'post': 'Post Normal',
    'reel': 'Reel/Video Vertical',
    'story': 'Historia Temporal'
  };
  return displayNames[contentType];
}

/**
 * Get content type description
 */
export function getContentTypeDescription(contentType: ContentType): string {
  const descriptions: Record<ContentType, string> = {
    'post': 'Publicación tradicional que aparece en el feed principal',
    'reel': 'Video vertical de corta duración (formato TikTok)',
    'story': 'Contenido temporal que desaparece después de 24 horas'
  };
  return descriptions[contentType];
}

/**
 * Business rule: Check if content type requires media
 */
export function requiresMedia(contentType: ContentType): boolean {
  return contentType === 'reel' || contentType === 'story';
}

/**
 * Business rule: Check if content type requires vertical video
 */
export function requiresVerticalVideo(contentType: ContentType): boolean {
  return contentType === 'reel' || contentType === 'story';
}

/**
 * Business rule: Check if content type allows text-only
 */
export function allowsTextOnly(contentType: ContentType): boolean {
  return contentType === 'post';
}

/**
 * Business rule: Get recommended aspect ratio
 */
export function getRecommendedAspectRatio(contentType: ContentType): string {
  const aspectRatios: Record<ContentType, string> = {
    'post': '1:1 o 4:5',
    'reel': '9:16',
    'story': '9:16'
  };
  return aspectRatios[contentType];
}

/**
 * Business rule: Get maximum video duration in seconds
 */
export function getMaxVideoDuration(contentType: ContentType): number | null {
  const maxDurations: Record<ContentType, number | null> = {
    'post': 240, // 4 minutes
    'reel': 90,  // 1.5 minutes
    'story': 15  // 15 seconds
  };
  return maxDurations[contentType];
}

/**
 * Business rule: Get content type icon
 */
export function getContentTypeIcon(contentType: ContentType): string {
  const icons: Record<ContentType, string> = {
    'post': '📝',
    'reel': '🎬',
    'story': '⏰'
  };
  return icons[contentType];
}