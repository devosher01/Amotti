/**
 * Application Layer: Repository Port
 * Defines the contract for publication data access
 */

import { Publication } from '../../domain/entities/publication';
import { Content } from '../../domain/value-objects/content';
import { Platform, ContentType } from '../../domain/types/platform';
import { PublicationAction } from '../../domain/types/status';

// Command DTOs
export interface CreatePublicationCommand {
  userId: UserId;
  content: Content;
  platforms: Platform[];
  platformContentTypes: Record<Platform, ContentType>;
  action: PublicationAction;
  scheduledAt?: Date;
}

export interface UpdatePublicationCommand {
  id: PublicationId;
  userId: UserId;
  content?: Content;
  platforms?: Platform[];
  platformContentTypes?: Record<Platform, ContentType>;
  action?: PublicationAction;
  scheduledAt?: Date;
}

export interface DeleteCommand {
  id: PublicationId;
  userId: UserId;
  reason?: string;
}

// Query DTOs
export interface ListPublicationsQuery {
  userId: UserId;
  status?: string;
  platform?: Platform;
  platforms?: Platform | Platform[]; // Para compatibilidad con múltiples plataformas
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  // Parámetros específicos para calendario
  period?: 'day' | 'week' | 'month';
  referenceDate?: string;
  contentType?: string;
}

export interface GetPublicationQuery {
  id: PublicationId;
  userId: UserId;
}

// Response DTOs
export interface ListPublicationsResponse {
  publications: Publication[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

/**
 * Repository Port - Defines data access contract
 */
export interface PublicationRepositoryPort {
  // Queries
  list(query: ListPublicationsQuery): Promise<ListPublicationsResponse>;
  getById(query: GetPublicationQuery): Promise<Publication>;
  
  // Commands - Solo JSON (archivos se suben por separado via assets)
  create(command: CreatePublicationCommand): Promise<Publication>;
  update(command: UpdatePublicationCommand): Promise<Publication>;
  delete(command: DeleteCommand): Promise<void>;
}