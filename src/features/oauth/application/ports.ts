import {
  ExternalAccount,
  PlatformConnection,
  AuthResult,
  ConnectionsData,
  LinkedAccount,
  DisconnectionResult,
  ConnectionId,
  PlatformType,
} from '../domain/entities';

export interface AuthenticationService {
  getAuthUrl(platformKey: PlatformType): Promise<AuthResult>;
  getPages(platformKey: PlatformType): Promise<{ pages: ExternalAccount[]; userInfo: any }>;
  connectPage(platformKey: PlatformType, selectedPageId: string): Promise<AuthResult>;
  getLinkedAccounts(platformKey: PlatformType, pageId: string): Promise<{ accounts: LinkedAccount[]; pageInfo: any }>;
  connectLinkedAccount(primaryPlatform: PlatformType, linkedPlatform: PlatformType, pageId: string, linkedAccountId: string): Promise<AuthResult>;
}

export interface ConnectionsStorageService {
  getConnections(filters?: {
    platform?: PlatformType;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ConnectionsData>;
  getConnection(connectionId: ConnectionId): Promise<PlatformConnection | null>;
  deleteConnection(connectionId: ConnectionId): Promise<DisconnectionResult>;
  refreshConnection(connectionId: ConnectionId): Promise<AuthResult>;
}

export interface PopupService {
  openAuthPopup(url: string, windowName?: string): Promise<void>;
  closePopup(): void;
}

export interface NotificationService {
  showSuccess(message: string): void;
  showError(message: string): void;
  showInfo(message: string): void;
}
