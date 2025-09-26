import { PlatformContentTypeRules } from '../types/mediaValidation';

// Constantes para aspect ratios
export const ASPECT_RATIOS = {
  VERTICAL_STORY: 9 / 16, // 0.5625 (9:16)
  SQUARE: 1,
  LANDSCAPE: 16 / 9,
} as const;

// Reglas de validación por plataforma y tipo de contenido
export const MEDIA_VALIDATION_RULES: Record<string, Record<string, PlatformContentTypeRules>> = {
  facebook: {
    post: {
      maxVideos: 1, // Máximo 1 video
      maxImages: Infinity, // Facebook permite múltiples imágenes en posts
      allowedTypes: ['image', 'video', 'gif', 'document'],
      allowMixedTypes: false, // No se pueden mezclar imágenes, GIFs, videos o documentos
      maxHorizontalResolution: undefined,
    },
    reel: {
      maxVideos: 1, // Máximo 1 video
      maxImages: 0, // Imágenes no soportadas
      allowedTypes: ['video'],
      allowMixedTypes: false, // No se pueden mezclar imágenes, GIFs, videos o documentos
      requiredAspectRatio: ASPECT_RATIOS.VERTICAL_STORY, // Relación de aspecto obligatoria: 9:16
      maxHorizontalResolution: 1920, // Resolución máxima horizontal: 1920 px
    },
    story: {
      maxVideos: Infinity, // Permite más de un video
      maxImages: Infinity,
      allowedTypes: ['image', 'video', 'gif', 'document'],
      allowMixedTypes: true, // Stories pueden mezclar tipos
      requiredAspectRatio: ASPECT_RATIOS.VERTICAL_STORY, // Requiere relación de aspecto 9:16
      maxHorizontalResolution: 1920, // Resolución máxima horizontal: 1920 px
    },
  },
  instagram: {
    post: {
      maxVideos: 1, // Máximo 1 video
      maxImages: Infinity, // Posts de Instagram pueden tener múltiples imágenes (carrusel)
      allowedTypes: ['image', 'video', 'gif', 'document'],
      allowMixedTypes: false, // No se pueden mezclar imágenes, GIFs, videos o documentos
      maxHorizontalResolution: undefined,
    },
    reel: {
      maxVideos: 1, // Máximo 1 video
      maxImages: 0, // Imágenes no soportadas
      allowedTypes: ['video'],
      allowMixedTypes: false, // No se pueden mezclar imágenes, GIFs, videos o documentos
      requiredAspectRatio: ASPECT_RATIOS.VERTICAL_STORY, // Relación de aspecto obligatoria: 9:16
      maxHorizontalResolution: undefined,
    },
    story: {
      maxVideos: Infinity, // Permiten más de un video
      maxImages: Infinity,
      allowedTypes: ['image', 'video', 'gif', 'document'],
      allowMixedTypes: true, // Stories pueden mezclar tipos
      requiredAspectRatio: ASPECT_RATIOS.VERTICAL_STORY, // Requieren relación de aspecto 9:16
      maxHorizontalResolution: 1920, // Resolución máxima horizontal: 1920 px
    },
  },
};

// Mensajes de validación localizados
export const VALIDATION_MESSAGES = {
  MAX_VIDEOS_EXCEEDED: (platform: string, contentType: string, max: number) =>
    `${platform.toUpperCase()} ${contentType.toUpperCase()}: Máximo ${max} video${max > 1 ? 's' : ''}.`,
  
  MAX_IMAGES_EXCEEDED: (platform: string, contentType: string, max: number) =>
    `${platform.toUpperCase()} ${contentType.toUpperCase()}: Máximo ${max} imagen${max > 1 ? 'es' : ''}.`,
  
  IMAGES_NOT_SUPPORTED: (platform: string, contentType: string) =>
    `${platform.toUpperCase()} ${contentType.toUpperCase()}: Imágenes no soportadas.`,
  
  MIXED_TYPES_NOT_ALLOWED: (platform: string, contentType: string) =>
    `${platform.toUpperCase()} ${contentType.toUpperCase()}: No se pueden mezclar imágenes, GIFs, videos o documentos.`,
  
  ASPECT_RATIO_REQUIRED: (platform: string, contentType: string, ratio: string) =>
    `${platform.toUpperCase()} ${contentType.toUpperCase()}: Relación de aspecto obligatoria: ${ratio}.`,
  
  MAX_RESOLUTION_EXCEEDED: (platform: string, contentType: string, maxRes: number) =>
    `${platform.toUpperCase()} ${contentType.toUpperCase()}: Resolución máxima horizontal: ${maxRes} px.`,
  
  INVALID_FILE_TYPE: (platform: string, contentType: string, allowedTypes: string[]) =>
    `${platform.toUpperCase()} ${contentType.toUpperCase()}: Solo se permiten archivos de tipo: ${allowedTypes.join(', ')}.`,

  // Mensajes específicos de contenido requerido por plataforma
  FACEBOOK_CONTENT_REQUIRED: (contentType: string) =>
    `${contentType.toUpperCase()}: Se requiere al menos un carácter de texto o un recurso visual.`,
  
  INSTAGRAM_MEDIA_REQUIRED: (contentType: string) =>
    `${contentType.toUpperCase()}: Se debe incluir al menos 1 imagen o vídeo.`,
} as const;

// Utilidad para formatear aspect ratios para mensajes
export const formatAspectRatio = (ratio: number): string => {
  if (ratio === ASPECT_RATIOS.VERTICAL_STORY) return '9:16';
  if (ratio === ASPECT_RATIOS.SQUARE) return '1:1';
  if (ratio === ASPECT_RATIOS.LANDSCAPE) return '16:9';
  return `${Math.round(1/ratio)}:${Math.round(ratio)}`;
};

// Utilidad para obtener reglas de una plataforma y tipo de contenido
export const getValidationRules = (platform: string, contentType: string): PlatformContentTypeRules | null => {
  return MEDIA_VALIDATION_RULES[platform]?.[contentType] || null;
};