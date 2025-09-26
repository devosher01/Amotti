/**
 * Domain Value Object: Publication Status
 * Pure functions for publication status logic
 */

export type PublicationStatus = 
  | 'draft' 
  | 'scheduled' 
  | 'processing'
  | 'published' 
  | 'error'
  | 'cancelled';

/**
 * Business rule: Determine if a publication can be edited
 */
export function isPublicationEditable(status: PublicationStatus): boolean {
  return status === 'draft' || status === 'scheduled';
}

/**
 * Business rule: Determine if a publication can be moved (drag & drop)
 */
export function isPublicationMovable(status: PublicationStatus): boolean {
  return status === 'draft' || status === 'scheduled';
}

/**
 * Business rule: Determine if a publication is in progress
 */
export function isPublicationInProgress(status: PublicationStatus): boolean {
  return status === 'processing';
}

/**
 * Business rule: Determine if a publication is completed
 */
export function isPublicationCompleted(status: PublicationStatus): boolean {
  return status === 'published' || status === 'error' || status === 'cancelled';
}

/**
 * Get display text for status (UI concern but based on domain)
 */
export function getStatusDisplayText(status: PublicationStatus): string {
  const statusMap: Record<PublicationStatus, string> = {
    'draft': '📝 Borrador',
    'scheduled': '⏰ Programado',
    'processing': '⚡ Publicando...',
    'published': '✅ Publicado',
    'error': '❌ Error',
    'cancelled': '⏸️ Cancelado'
  };
  return statusMap[status];
}

/**
 * Get CSS color class for status
 */
export function getStatusColor(status: PublicationStatus): 'gray' | 'blue' | 'yellow' | 'green' | 'red' | 'orange' {
  const colorMap: Record<PublicationStatus, 'gray' | 'blue' | 'yellow' | 'green' | 'red' | 'orange'> = {
    'draft': 'gray',
    'scheduled': 'blue',
    'processing': 'yellow',
    'published': 'green',
    'error': 'red',
    'cancelled': 'orange'
  };
  return colorMap[status];
}

/**
 * Business rule: Get immovable reason message
 */
export function getImmovableReason(status: PublicationStatus): string | null {
  const immovableReasons: Partial<Record<PublicationStatus, string>> = {
    'published': 'Esta publicación ya fue publicada y no puede ser modificada',
    'processing': 'Esta publicación está siendo procesada y no puede ser modificada',
    'error': 'Esta publicación falló y debe ser revisada antes de moverla',
    'cancelled': 'Esta publicación fue cancelada y no puede ser modificada'
  };

  return immovableReasons[status] || null;
}