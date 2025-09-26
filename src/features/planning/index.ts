/**
 * Planning Feature Exports
 * Clean Architecture Implementation
 */

// Domain exports
export type { Publication } from './domain/entities/publication';
export type { Content, MediaItem } from './domain/value-objects/content';
export type { Platform, ContentType } from './domain/types/platform';
export type { PublicationStatus, PublicationAction } from './domain/types/status';

// Application exports
export type { 
  CreatePublicationCommand, 
  UpdatePublicationCommand, 
  ListPublicationsQuery,
  PublicationRepositoryPort 
} from './application/ports/publication-repository.port';

export { 
  createPublicationUseCase,
  updatePublicationUseCase,
  listPublicationsUseCase,
  deletePublicationUseCase
} from './application/use-cases/index';

// UI exports
export {
  useCreatePublication,
  useUpdatePublication,
  useListPublications,
  useDeletePublication,

  useUploadAsset
} from './ui/hooks';

export type {
  CreatePublicationInput,
  UpdatePublicationInput,
} from './ui/hooks';

// Services exports (for advanced usage)
export { createPublicationApiAdapter } from './services/adapters/publication-api-adapter';
export { createAssetApiAdapter } from './services/adapters/asset-api-adapter';
export { usePublicationDependencies } from './shared/hooks/usePublicationDependencies';