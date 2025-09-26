/**
 * OAuth Presentation Hooks - Export Index
 * Clean Architecture: Presentation Layer Hooks
 */

// Platform-specific hooks
export { useFacebook } from './useFacebook';
export { useInstagram } from './useInstagram';

// Core hooks
export { useConnections } from './useConnections';

// Types
export type { UseFacebookReturn } from './useFacebook';
export type { UseInstagramReturn } from './useInstagram';
export type { UseConnectionsReturn,  } from './useConnections';