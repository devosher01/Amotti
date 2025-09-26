export type PublicationStatus =
  | 'draft'
  | 'scheduled'
  | 'processing'
  | 'published'
  | 'failed'
  | 'cancelled';

export type PublicationAction =
  | 'draft'
  | 'schedule'
  | 'publish_now';

export const PUBLICATION_STATUSES: readonly PublicationStatus[] = [
  'draft',
  'scheduled',
  'processing',
  'published',
  'failed',
  'cancelled'
] as const;

export const PUBLICATION_ACTIONS: readonly PublicationAction[] = [
  'draft',
  'schedule',
  'publish_now'
] as const;

export function isPublicationStatus(value: string): value is PublicationStatus {
  return PUBLICATION_STATUSES.includes(value as PublicationStatus);
}

export function isPublicationAction(value: string): value is PublicationAction {
  return PUBLICATION_ACTIONS.includes(value as PublicationAction);
}

/**
 * Business rules for status transitions
 */
export function canTransitionTo(from: PublicationStatus, to: PublicationStatus): boolean {
  const validTransitions: Record<PublicationStatus, PublicationStatus[]> = {
    draft: ['scheduled', 'processing', 'cancelled'],
    scheduled: ['processing', 'cancelled', 'draft'],
    processing: ['published', 'failed'],
    published: [], // Terminal state
    failed: ['draft', 'scheduled'], // Can retry
    cancelled: ['draft', 'scheduled'], // Can reactivate
  };

  return validTransitions[from].includes(to);
}

/**
 * Determines if a status allows editing
 */
export function isEditable(status: PublicationStatus): boolean {
  return ['draft', 'scheduled', 'failed', 'cancelled'].includes(status);
}

/**
 * Determines if a status allows deletion
 */
export function isDeletable(status: PublicationStatus): boolean {
  return status !== 'processing';
}