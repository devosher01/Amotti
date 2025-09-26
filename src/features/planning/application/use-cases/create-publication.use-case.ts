import { Publication } from '../../domain/entities/publication';
import {
  PublicationRepositoryPort,
  CreatePublicationCommand
} from '../ports/publication-repository.port';

// Use Case Dependencies
export interface CreatePublicationDependencies {
  publicationRepository: PublicationRepositoryPort;
}

export interface CreatePublicationResult {
  success: boolean;
  publication?: Publication;
  message: string;
  errors?: string[];
}

export async function createPublicationUseCase(
  command: CreatePublicationCommand,
  dependencies: CreatePublicationDependencies
): Promise<CreatePublicationResult> {
  try {
    // Validate business rules
    const validationResult = validateCreateCommand(command);
    if (!validationResult.isValid) {
      console.error('❌ Validation failed:', validationResult.errors);
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.errors
      };
    }

    // Persist through repository - El backend genera el ID automáticamente
    const savedPublication = await dependencies.publicationRepository.create(command);

    return {
      success: true,
      publication: savedPublication,
      message: getSuccessMessage(command.action),
    };

  } catch (error) {
    console.error('Create publication use case error:', error);

    return {
      success: false,
      message: 'Failed to create publication',
      errors: [error instanceof Error ? error.message : 'Unknown error']
    };
  }
}

// Helper Functions
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

function validateCreateCommand(command: CreatePublicationCommand): ValidationResult {
  const errors: string[] = [];

  console.log('🔍 Validating command:', {
    platforms: command.platforms,
    platformContentTypes: command.platformContentTypes,
    action: command.action,
    hasContent: !!command.content,
    hasScheduledAt: !!command.scheduledAt
  });

  // Validate platforms
  if (!command.platforms || command.platforms.length === 0) {
    console.log('❌ Platform validation failed: no platforms');
    errors.push('At least one platform must be selected');
  }

  // Validate content types for each platform
  if (command.platforms) {
    for (const platform of command.platforms) {
      if (!command.platformContentTypes || !command.platformContentTypes[platform]) {
        console.log(`❌ Content type validation failed for platform: ${platform}`, command.platformContentTypes);
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

  // Validate content
  const content = command.content;
  console.log('🔍 Content validation:', { hasContent: !!content, content });
  
  if (!content) {
    console.log('❌ Content validation failed: no content');
    errors.push('Content is required');
  } else {
    // El content viene del hook como un objeto plano con la estructura correcta
    const contentData = content as unknown as { text?: string };
    console.log('🔍 Content data:', { hasText: !!contentData.text, textLength: contentData.text?.length });
    
    if (!contentData.text || contentData.text.trim().length === 0) {
      console.log('❌ Content validation failed: empty text');
      errors.push('Publication content cannot be empty');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function mapActionToStatus(action: string): 'draft' | 'scheduled' | 'processing' {
  switch (action) {
    case 'draft':
      return 'draft';
    case 'schedule':
      return 'scheduled';
    case 'publish_now':
      return 'processing';
    default:
      return 'draft';
  }
}

function getSuccessMessage(action: string): string {
  switch (action) {
    case 'draft':
      return 'Publication saved as draft';
    case 'schedule':
      return 'Publication scheduled successfully';
    case 'publish_now':
      return 'Publication is being processed';
    default:
      return 'Publication created successfully';
  }
}
