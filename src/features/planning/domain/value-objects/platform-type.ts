/**
 * Domain Value Object: Platform Types
 * Pure functions for platform-specific logic
 */

export type PlatformType = 'facebook' | 'instagram';
export type ContentType = 'post' | 'reel' | 'story';

/**
 * Business rule: Get available content types per platform
 */
export function getAvailableContentTypes(platform: PlatformType): ContentType[] {
  const platformContentMap: Record<PlatformType, ContentType[]> = {
    'facebook': ['post', 'reel', 'story'],
    'instagram': ['post', 'reel', 'story'],
  };
  return platformContentMap[platform];
}

/**
 * Business rule: Check if platform supports a content type
 */
export function isPlatformContentTypeSupported(platform: PlatformType, contentType: ContentType): boolean {
  return getAvailableContentTypes(platform).includes(contentType);
}

/**
 * Get display name for platform
 */
export function getPlatformDisplayName(platform: PlatformType): string {
  const displayNames: Record<PlatformType, string> = {
    'facebook': 'Facebook',
    'instagram': 'Instagram',
  };
  return displayNames[platform];
}

/**
 * Get platform icon/emoji
 */
export function getPlatformIcon(platform: PlatformType): string {
  const icons: Record<PlatformType, string> = {
    'facebook': '📘',
    'instagram': '📷',
  };
  return icons[platform];
}

/**
 * Get platform brand color
 */
export function getPlatformColor(platform: PlatformType): string {
  const colors: Record<PlatformType, string> = {
    'facebook': '#1877f2',
    'instagram': '#e4405f',
  };
  return colors[platform];
}

/**
 * Business rule: Validate platform list (at least one required)
 */
export function validatePlatforms(platforms: PlatformType[]): { isValid: boolean; error?: string } {
  if (platforms.length === 0) {
    return { isValid: false, error: 'Debe seleccionar al menos una plataforma' };
  }
  return { isValid: true };
}