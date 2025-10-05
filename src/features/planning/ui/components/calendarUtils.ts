/**
 * Utilidades compartidas para el calendario de publicaciones
 */

import { CalendarEventInput } from '../../infrastructure/mappers/publication-calendar.mapper';

// Re-export for convenience
export type { CalendarEventInput };

// Tipos compartidos
export type PublicationStatus = 'PUBLISHED' | 'SCHEDULED' | 'PROCESSING' | 'DRAFT' | 'ERROR' | 'FAILED' | 'PARTIAL_SUCCESS' | 'CANCELLED' | 'FROM_AUTOLIST';
export type ContentType = 'post' | 'reel' | 'story';
export type Platform = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok' | 'youtube';

// Mapeo de colores por estado
export const STATUS_COLORS: Record<PublicationStatus, string> = {
  PUBLISHED: 'rgb(82, 199, 159)',
  SCHEDULED: 'rgb(104, 143, 164)',
  PROCESSING: 'rgb(255, 152, 0)',
  DRAFT: 'rgb(72, 76, 79)',
  FAILED: 'rgb(234, 39, 39)',
  ERROR: 'rgb(234, 39, 39)',
  PARTIAL_SUCCESS: 'rgb(255, 193, 7)',
  CANCELLED: 'rgb(117, 117, 117)',
  FROM_AUTOLIST: 'rgb(114, 201, 218)'
};

// Mapeo de textos por estado
export const STATUS_TEXTS: Record<PublicationStatus, string> = {
  PUBLISHED: 'Publicado / Enviado',
  SCHEDULED: 'Pendiente',
  PROCESSING: 'Procesando',
  DRAFT: 'Borrador',
  FAILED: 'Con errores',
  ERROR: 'Con errores',
  PARTIAL_SUCCESS: 'Éxito parcial',
  CANCELLED: 'Cancelada',
  FROM_AUTOLIST: 'Desde autolista'
};

// Mapeo de colores por plataforma
export const PLATFORM_COLORS: Record<Platform, string> = {
  facebook: '#1877F2',
  instagram: '#E4405F',
  twitter: '#1DA1F2',
  linkedin: '#0A66C2',
  tiktok: '#000000',
  youtube: '#FF0000'
};

// Utilidades para plataformas
export function normalizePlatforms(platforms: string[] | string): string[] {
  const platformsArray = Array.isArray(platforms) ? platforms : [platforms];
  return platformsArray.map(p => p.toLowerCase());
}

export function getPrimaryPlatform(platforms: string[] | string): string {
  const normalized = normalizePlatforms(platforms);
  return normalized[0] || 'facebook';
}

// Utilidades para estado
export function getStatusInfo(status: string): { text: string; color: string } {
  const normalizedStatus = status.toUpperCase() as PublicationStatus;
  return {
    text: STATUS_TEXTS[normalizedStatus] || STATUS_TEXTS.SCHEDULED,
    color: STATUS_COLORS[normalizedStatus] || STATUS_COLORS.SCHEDULED
  };
}

// Utilidades para contenido
export function getContentTypeLabel(type: string): string {
  switch (type) {
    case 'post': return 'Post';
    case 'reel': return 'Reel';
    case 'story': return 'Story';
    default: return 'Post';
  }
}

// Utilidades para fechas
export function formatEventDate(date: Date): string {
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
}

export function formatEventTime(date: Date): string {
  return date.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

export function extractEventData(event: any) {
  // FullCalendar almacena propiedades personalizadas en extendedProps
  const extendedProps = event.extendedProps || {};
  
  const platforms = normalizePlatforms(extendedProps.platforms || event.platforms || ['facebook']);
  const primaryPlatform = platforms[0];
  const status = extendedProps.status || event.status || 'DRAFT';
  const contentType = 'post'; // Default content type
  const hasImage = extendedProps.hasImage ?? event.hasImage ?? false;
  const imageUrl = extendedProps.imageUrl || event.imageUrl || null;
  const fullText = extendedProps.fullText || event.fullText || event.title || '';
  const mediaCount = extendedProps.mediaCount || event.mediaCount || 0;

  console.log('EXTRAER EVENT DATA:', { 
    platforms,
    primaryPlatform,
    status,
    contentType,
    hasImage,
    imageUrl,
    fullText,
    mediaCount
  });

  return {
    platforms,
    primaryPlatform,
    status,
    contentType,
    hasImage,
    imageUrl,
    fullText,
    mediaCount
  };
}
