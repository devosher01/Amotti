import { Publication, isOverdue } from '../../domain/entities/publication';
import { 
  PublicationRepositoryPort, 
  ListPublicationsQuery,
  ListPublicationsResponse 
} from '../ports/publication-repository.port';

export interface ListPublicationsDependencies {
  publicationRepository: PublicationRepositoryPort;
}

export interface ListPublicationsResult {
  success: boolean;
  data?: ListPublicationsResponse;
  message: string;
  errors?: string[];
}

export async function listPublicationsUseCase(
  query: ListPublicationsQuery,
  dependencies: ListPublicationsDependencies
): Promise<ListPublicationsResult> {
  try {
    const validationResult = validateListQuery(query);
    if (!validationResult.isValid) {
      return {
        success: false,
        message: 'Invalid query parameters',
        errors: validationResult.errors
      };
    }

    // Apply business logic for query normalization
    const normalizedQuery = normalizeQuery(query);

    // Retrieve publications through repository
    const result = await dependencies.publicationRepository.list(normalizedQuery);

    // Apply post-processing business rules
    const processedResult = applyBusinessRules(result);

    console.log('ESTE ES UN DEBUG DE PUBLICACIONES', processedResult);

    return {
      success: true,
      data: processedResult,
      message: `Found ${processedResult.publications.length} publications`,
    };

  } catch (error) {
    console.error('List publications use case error:', error);
    
    return {
      success: false,
      message: 'Failed to retrieve publications',
      errors: [error instanceof Error ? error.message : 'Unknown error']
    };
  }
}

// Helper Functions
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

function validateListQuery(query: ListPublicationsQuery): ValidationResult {
  const errors: string[] = [];

  // Validate pagination
  if (query.limit !== undefined && query.limit < 1) {
    errors.push('Limit must be greater than 0');
  }
  if (query.limit !== undefined && query.limit > 100) {
    errors.push('Limit cannot exceed 100');
  }
  if (query.offset !== undefined && query.offset < 0) {
    errors.push('Offset cannot be negative');
  }

  // Validate date range
  if (query.startDate && query.endDate && query.startDate > query.endDate) {
    errors.push('Start date cannot be after end date');
  }

  // Validate date range span (business rule: max 1 year)
  if (query.startDate && query.endDate) {
    const oneYear = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
    if (query.endDate.getTime() - query.startDate.getTime() > oneYear) {
      errors.push('Date range cannot exceed 1 year');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function normalizeQuery(query: ListPublicationsQuery): ListPublicationsQuery {
  return {
    ...query,
    limit: query.limit || 50,
    offset: query.offset || 0,
    // Set default date range if not provided (last 30 days)
    startDate: query.startDate || getDefaultStartDate(),
    endDate: query.endDate || new Date(),
  };
}

function getDefaultStartDate(): Date {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return thirtyDaysAgo;
}

function applyBusinessRules(result: ListPublicationsResponse): ListPublicationsResponse {
  // Sort publications by business priority
  const sortedPublications = sortPublicationsByPriority(result.publications);
  
  // Calculate hasMore based on business logic
  const hasMore = result.total > (result.offset + result.publications.length);

  return {
    ...result,
    publications: sortedPublications,
    hasMore
  };
}

function sortPublicationsByPriority(publications: Publication[]): Publication[] {
  return [...publications].sort((a, b) => {
    // Priority 1: Failed publications first (need attention)
    if (a.status === 'failed' && b.status !== 'failed') return -1;
    if (b.status === 'failed' && a.status !== 'failed') return 1;
    
    // Priority 2: Overdue scheduled publications
    if (isOverdue(a) && !isOverdue(b)) return -1;
    if (isOverdue(b) && !isOverdue(a)) return 1;
    
    // Priority 3: Upcoming scheduled publications (by scheduled date)
    if (a.status === 'scheduled' && b.status === 'scheduled') {
      const aScheduled = a.scheduledAt?.getTime() || 0;
      const bScheduled = b.scheduledAt?.getTime() || 0;
      return aScheduled - bScheduled;
    }
    
    // Priority 4: Processing publications
    if (a.status === 'processing' && b.status !== 'processing') return -1;
    if (b.status === 'processing' && a.status !== 'processing') return 1;
    
    // Default: Sort by updated date (most recent first)
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });
}