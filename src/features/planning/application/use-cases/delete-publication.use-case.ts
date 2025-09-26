/**
 * Application Layer: Delete Publication Use Case
 * Pure business logic for publication deletion
 */

import { Publication, canDelete } from '../../domain/entities/publication';
import { 
  PublicationRepositoryPort, 
  DeleteCommand,
  GetPublicationQuery 
} from '../ports/publication-repository.port';

// Use Case Dependencies
export interface DeletePublicationDependencies {
  publicationRepository: PublicationRepositoryPort;
}

// Use Case Result
export interface DeletePublicationResult {
  success: boolean;
  message: string;
  errors?: string[];
}

/**
 * Delete Publication Use Case
 * Handles the business logic for deleting publications
 */
export async function deletePublicationUseCase(
  command: DeleteCommand,
  dependencies: DeletePublicationDependencies
): Promise<DeletePublicationResult> {
  try {
    // Get existing publication to validate business rules
    const getQuery: GetPublicationQuery = {
      id: command.id,
      userId: command.userId
    };
    
    const existingPublication = await dependencies.publicationRepository.getById(getQuery);

    // Validate business rules
    const validationResult = validateDeleteCommand(existingPublication);
    if (!validationResult.isValid) {
      return {
        success: false,
        message: 'Cannot delete publication',
        errors: validationResult.errors
      };
    }

    // Apply business logic based on publication status
    const deleteAction = determineDeleteAction(existingPublication);

    // Execute deletion through repository
    await dependencies.publicationRepository.delete(command);

    return {
      success: true,
      message: getDeleteSuccessMessage(deleteAction, existingPublication.status),
    };

  } catch (error) {
    console.error('Delete publication use case error:', error);
    
    return {
      success: false,
      message: 'Failed to delete publication',
      errors: [error instanceof Error ? error.message : 'Unknown error']
    };
  }
}

// Helper Functions
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

type DeleteAction = 'delete' | 'cancel';

function validateDeleteCommand(publication: Publication): ValidationResult {
  const errors: string[] = [];

  // Check if publication can be deleted based on business rules
  if (!canDelete(publication)) {
    errors.push(`Cannot delete publication in status: ${publication.status}`);
  }

  // Special validation for processing publications
  if (publication.status === 'processing') {
    errors.push('Cannot delete publications that are currently being processed');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function determineDeleteAction(publication: Publication): DeleteAction {
  // For scheduled publications, this is more of a cancellation
  if (publication.status === 'scheduled') {
    return 'cancel';
  }
  
  // For all other statuses, it's a proper deletion
  return 'delete';
}

function getDeleteSuccessMessage(action: DeleteAction, status: string): string {
  switch (action) {
    case 'cancel':
      return 'Scheduled publication cancelled successfully';
    case 'delete':
      switch (status) {
        case 'draft':
          return 'Draft publication deleted successfully';
        case 'failed':
          return 'Failed publication deleted successfully';
        case 'cancelled':
          return 'Cancelled publication deleted successfully';
        case 'published':
          return 'Published publication removed from list';
        default:
          return 'Publication deleted successfully';
      }
    default:
      return 'Publication deleted successfully';
  }
}