/**
 * Domain Types: Social Media Platforms
 * Defines supported platforms and their content types
 */

export type Platform = 'facebook' | 'instagram';

export type FacebookContentType = 'post' | 'reel' | 'story';
export type InstagramContentType = 'post' | 'reel' | 'story';

export type ContentType = FacebookContentType | InstagramContentType;

export const PLATFORMS: readonly Platform[] = ['facebook', 'instagram'] as const;

export const FACEBOOK_CONTENT_TYPES: readonly FacebookContentType[] = ['post', 'reel', 'story'] as const;
export const INSTAGRAM_CONTENT_TYPES: readonly InstagramContentType[] = ['post', 'reel', 'story'] as const;

export const PLATFORM_CONTENT_TYPES: Record<Platform, readonly ContentType[]> = {
  facebook: FACEBOOK_CONTENT_TYPES,
  instagram: INSTAGRAM_CONTENT_TYPES,
} as const;

export function isPlatform(value: string): value is Platform {
  return PLATFORMS.includes(value as Platform);
}

export function isContentTypeForPlatform(platform: Platform, contentType: string): contentType is ContentType {
  return PLATFORM_CONTENT_TYPES[platform].includes(contentType as ContentType);
}

export function getContentTypesForPlatform(platform: Platform): readonly ContentType[] {
  return PLATFORM_CONTENT_TYPES[platform];
}