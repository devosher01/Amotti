import { 
  Publication,
  updateContent,
  updatePlatforms,
  canEdit,
  canSchedule,
  canPublishNow,
  schedulePublication,
  publishNow,
  markAsDraft
} from '../../domain/entities/publication';
import { Content } from '../../domain/value-objects/content';
import { 
  PublicationRepositoryPort, 
  UpdatePublicationCommand,
  GetPublicationQuery 
} from '../ports/publication-repository.port';

export interface UpdatePublicationDependencies {
  publicationRepository: PublicationRepositoryPort;
}

export interface UpdatePublicationResult {
  success: boolean;
  publication?: Publication;
  message: string;
  errors?: string[];
}

export async function updatePublicationUseCase(
  command: UpdatePublicationCommand,
  dependencies: UpdatePublicationDependencies
): Promise<UpdatePublicationResult> {
  try {
    const validationResult = validateUpdateCommandBasic(command);
    if (!validationResult.isValid) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.errors
      };
    }

    const savedPublication = await dependencies.publicationRepository.update(command);

    return {
      success: true,
      publication: savedPublication,
      message: getUpdateSuccessMessage(command.action),
    };

  } catch (error) {
    console.error('Update publication use case error:', error);
    
    return {
      success: false,
      message: 'Failed to update publication',
      errors: [error instanceof Error ? error.message : 'Unknown error']
    };
  }
}

// Helper Functions
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// 🎯 Validación básica sin necesidad de obtener la publicación existente
function validateUpdateCommandBasic(command: UpdatePublicationCommand): ValidationResult {
  const errors: string[] = [];

  // Validar que tenga ID
  if (!command.id) {
    errors.push('Publication ID is required');
  }

  // Validar platforms si se proporcionan
  if (command.platforms && command.platforms.length === 0) {
    errors.push('At least one platform must be selected');
  }

  // Validar content types para cada platform si se proporcionan
  if (command.platforms && command.platformContentTypes) {
    for (const platform of command.platforms) {
      if (!command.platformContentTypes[platform]) {
        errors.push(`Content type not specified for platform: ${platform}`);
      }
    }
  }

  // Validar scheduling básico
  if (command.action === 'schedule' || command.scheduledAt) {
    if (command.scheduledAt && command.scheduledAt <= new Date()) {
      errors.push('Scheduled date must be in the future');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// 🗂️ Mantener función original para casos que SÍ necesiten validación completa
function validateUpdateCommand(
  command: UpdatePublicationCommand, 
  existingPublication: Publication
): ValidationResult {
  const errors: string[] = [];

  // Check if publication can be edited
  if (!canEdit(existingPublication)) {
    errors.push(`Cannot edit publication in status: ${existingPublication.status}`);
  }

  // Validate platforms if provided
  if (command.platforms && command.platforms.length === 0) {
    errors.push('At least one platform must be selected');
  }

  // Validate content types for each platform if platforms provided
  if (command.platforms && command.platformContentTypes) {
    for (const platform of command.platforms) {
      if (!command.platformContentTypes[platform]) {
        errors.push(`Content type not specified for platform: ${platform}`);
      }
    }
  }

  // Validate scheduling
  if (command.action === 'schedule') {
    if (!command.scheduledAt) {
      errors.push('Scheduled date is required for scheduled publications');
    } else if (command.scheduledAt <= new Date()) {
      errors.push('Scheduled date must be in the future');
    }
  }

  // Validate action-specific business rules
  if (command.action) {
    const actionValidation = validateActionForPublication(command.action, existingPublication);
    if (!actionValidation.isValid) {
      errors.push(...actionValidation.errors);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function validateActionForPublication(
  action: string, 
  publication: Publication
): ValidationResult {
  const errors: string[] = [];

  switch (action) {
    case 'schedule':
      if (!canSchedule(publication)) {
        errors.push(`Cannot schedule publication in status: ${publication.status}`);
      }
      break;
    case 'publish_now':
      if (!canPublishNow(publication)) {
        errors.push(`Cannot publish publication in status: ${publication.status}`);
      }
      break;
    case 'draft':
      // Always allowed if publication can be edited
      break;
    default:
      errors.push(`Unknown action: ${action}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function applyActionToPublication(
  publication: Publication, 
  command: UpdatePublicationCommand
): Publication {
  switch (command.action) {
    case 'schedule':
      if (command.scheduledAt) {
        return schedulePublication(publication, command.scheduledAt);
      }
      return publication;
    case 'publish_now':
      return publishNow(publication);
    case 'draft':
      return markAsDraft(publication);
    default:
      return publication;
  }
}

function getUpdateSuccessMessage(action?: string): string {
  switch (action) {
    case 'schedule':
      return 'Publication scheduled successfully';
    case 'publish_now':
      return 'Publication is being processed';
    case 'draft':
      return 'Publication moved to draft';
    default:
      return 'Publication updated successfully';
  }
}