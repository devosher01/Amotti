/**
 * Application Layer: Upload Asset Use Case
 * Maneja la lógica de subida de assets
 */

import { Asset } from '../../domain/entities/asset';
import { AssetRepositoryPort, UploadAssetCommand, UploadAssetResponse } from '../ports/asset-repository.port';

// Use Case Dependencies
export interface UploadAssetDependencies {
  assetRepository: AssetRepositoryPort;
}

// Use Case Result
export interface UploadAssetResult {
  success: boolean;
  asset?: Asset;
  assetId?: string;
  message: string;
  errors?: string[];
}

/**
 * Upload Asset Use Case
 * Sube un archivo y devuelve el ID para usar en publicaciones
 */
export async function uploadAssetUseCase(
  command: UploadAssetCommand,
  dependencies: UploadAssetDependencies
): Promise<UploadAssetResult> {
  try {
    // Validar archivo
    const validationResult = validateUploadCommand(command);
    if (!validationResult.isValid) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.errors
      };
    }

    // Subir archivo
    const uploadResponse = await dependencies.assetRepository.upload(command);

    // Si es processing, devolver el ID para polling
    if (uploadResponse.status === 'processing') {
      return {
        success: true,
        assetId: uploadResponse.assetId,
        message: 'Asset upload initiated'
      };
    }

    // Si ya está completado, obtener el asset completo
    const asset = await dependencies.assetRepository.getById({ id: uploadResponse.assetId });

    return {
      success: true,
      asset,
      assetId: uploadResponse.assetId,
      message: 'Asset uploaded successfully'
    };

  } catch (error) {
    console.error('Upload asset use case error:', error);
    
    return {
      success: false,
      message: 'Failed to upload asset',
      errors: [error instanceof Error ? error.message : 'Unknown error']
    };
  }
}

// Helper Functions
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

function validateUploadCommand(command: UploadAssetCommand): ValidationResult {
  const errors: string[] = [];

  // Validar archivo
  if (!command.file) {
    errors.push('File is required');
  } else {
    // Validar tamaño (50MB max)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (command.file.size > maxSize) {
      errors.push('File size cannot exceed 50MB');
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/mov', 'video/quicktime'];
    if (!allowedTypes.includes(command.file.type)) {
      errors.push(`File type "${command.file.type}" not supported. Allowed types: ${allowedTypes.join(', ')}`);
    }
  }

  // Validar tipo
  if (!command.type || !['image', 'video'].includes(command.type)) {
    errors.push('Valid asset type is required (image or video)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
