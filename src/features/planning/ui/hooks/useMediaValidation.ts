import { useMemo } from 'react';
import { 
  MediaFile, 
  ValidationRule, 
  MediaValidationResult, 
  ContentValidationContext 
} from '../types/mediaValidation';
import { 
  getValidationRules, 
  VALIDATION_MESSAGES,
  formatAspectRatio
} from '../constants/mediaValidationRules';

export const useMediaValidation = (context: ContentValidationContext): MediaValidationResult => {
  
  const validationResult = useMemo(() => {
    const { platform, contentType, mediaFiles } = context;
    
    // Si no hay plataforma o tipo de contenido, no validar
    if (!platform || !contentType) {
      return {
        isValid: true,
        errors: [],
        warnings: [],
        info: [],
        validatedFiles: mediaFiles,
      };
    }

    const rules = getValidationRules(platform, contentType);
    
    // Si no hay reglas para esta combinación, es válido
    if (!rules) {
      return {
        isValid: true,
        errors: [],
        warnings: [],
        info: [],
        validatedFiles: mediaFiles,
      };
    }

    const errors: ValidationRule[] = [];
    const warnings: ValidationRule[] = [];
    const info: ValidationRule[] = [];

    // Contar tipos de archivos
    const imageCount = mediaFiles.filter(file => file.type === 'image').length;
    const videoCount = mediaFiles.filter(file => file.type === 'video').length;

    // Validar límites de archivos
    if (imageCount > rules.maxImages) {
      errors.push({
        id: 'too-many-images',
        type: 'error',
        message: `Máximo ${rules.maxImages} imágenes permitidas`,
        platform,
        contentType,
        field: 'count'
      });
    }

    if (videoCount > rules.maxVideos) {
      errors.push({
        id: 'too-many-videos', 
        type: 'error',
        message: `Máximo ${rules.maxVideos} videos permitidos`,
        platform,
        contentType,
        field: 'count'
      });
    }

    // Validar tipos mezclados
    if (!rules.allowMixedTypes && imageCount > 0 && videoCount > 0) {
      errors.push({
        id: 'mixed-types',
        type: 'error',
        message: 'No se pueden mezclar imágenes y videos',
        platform,
        contentType,
        field: 'mixing'
      });
    }

    // Validar cada archivo
    mediaFiles.forEach((file, index) => {
      // Validar tipo permitido
      if (!rules.allowedTypes.includes(file.type)) {
        errors.push({
          id: `invalid-type-${index}`,
          type: 'error',
          message: `Tipo de archivo ${file.type} no permitido`,
          platform,
          contentType,
          field: 'media'
        });
      }

      // Validar tamaño (máximo 100MB)
      const maxSizeBytes = 100 * 1024 * 1024; // 100MB
      if (file.size > maxSizeBytes) {
        errors.push({
          id: `size-${index}`,
          type: 'error',
          message: 'Archivo demasiado grande (máximo 100MB)',
          platform,
          contentType,
          field: 'media'
        });
      }
    });

    // Sugerencias para Instagram
    if (platform === 'instagram' && mediaFiles.length === 0) {
      info.push({
        id: 'instagram-media-suggestion',
        type: 'info',
        message: 'Instagram funciona mejor con contenido visual',
        platform,
        contentType,
        field: 'media'
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      info,
      validatedFiles: mediaFiles,
    };

  }, [context.platform, context.contentType, context.mediaFiles]);

  return validationResult;
};