/**
 * Domain Layer Exports
 * Clean Architecture - Domain Layer
 */

// Entities (funcional)
export type { Publication, MediaItem } from './entities/publication';
export { createPublication, fromSnapshot, updateContent, updatePlatforms, schedulePublication, publishNow, markAsPublished, markAsFailed, canEdit, canDelete, canSchedule, canPublishNow, isOverdue } from './entities/publication';

// Value Objects (legacy - para compatibilidad con código existente)
// export { PublicationId } from './value-objects/publication-id';
// export { UserId } from './value-objects/user-id';
// export { Content, type ContentProps } from './value-objects/content';

// Types
export { 
  type Platform, 
  type ContentType,
  type FacebookContentType,
  type InstagramContentType,
  PLATFORMS,
  FACEBOOK_CONTENT_TYPES,
  INSTAGRAM_CONTENT_TYPES,
  PLATFORM_CONTENT_TYPES,
  isPlatform,
  isContentTypeForPlatform,
  getContentTypesForPlatform
} from './types/platform';

export {
  type PublicationStatus,
  type PublicationAction,
  PUBLICATION_STATUSES,
  PUBLICATION_ACTIONS,
  isPublicationStatus,
  isPublicationAction,
  canTransitionTo,
  isEditable,
  isDeletable
} from './types/status';