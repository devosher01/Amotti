// Clean OAuth Feature - Domain Agnostic Export

// Domain exports
export * from './domain/entities';
export * from './domain/value-objects';

// Application exports (use cases and ports)
export * from './application/ports';
export * from './application/use-cases/initiate-oauth.use-case';
export * from './application/use-cases/get-platform-pages.use-case';
export * from './application/use-cases/connect-platform-page.use-case';
export * from './application/use-cases/get-linked-accounts.use-case';
export * from './application/use-cases/connect-linked-account.use-case';
export * from './application/use-cases/manage-connections.use-case';

// Presentation hooks exports (NEW)
export * from './presentation/hooks';

// Infrastructure exports
export { HttpAuthAdapter } from './infrastructure/adapters/HttpAuthAdapter';

// UI Components exports (pure UI only)
export { SocialPlatformCard } from './presentation/components/SocialPlatformCard';
export { AccountSelectionModal } from './presentation/components/FacebookPageSelectionModal';
export { FacebookDisconnectWarningModal } from './presentation/components/FacebookDisconnectWarningModal';
export { InstagramAccountSelectionModal } from './presentation/components/InstagramAccountSelectionModal';
export { InstagramConnectionModal } from './presentation/components/InstagramConnectionModal';
