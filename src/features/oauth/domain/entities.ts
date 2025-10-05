export type AuthSession = {
  sessionId: string;
  userId: string;
  state: string;
};

export type ExternalAccount = {
  id: string;
  name: string;
  displayName?: string;
  category?: string;
  profilePictureUrl?: string;
  followersCount?: number;
  verified?: boolean;
  hasLinkedAccounts?: boolean;
  metadata?: Record<string, any>;
};

// Base connection interface that matches your API response
export interface BaseConnection {
  id: string;
  platform: string;
  connectionType: string;
  accountId: string;
  accountName: string;
  profilePictureUrl: string;
  isActive: boolean;
  createdAt: string;
  lastVerifiedAt: string;
}

// Facebook specific connection
export interface FacebookConnection extends BaseConnection {
  platform: "facebook";
  connectionType: "facebook_page";
}

// Instagram specific connection  
export interface InstagramConnection extends BaseConnection {
  platform: "instagram";
  connectionType: "instagram_business";
  accountUsername: string;
}

// Union type for all platform connections
export type PlatformConnection = FacebookConnection | InstagramConnection;

// API response structure that matches your real response
export interface ConnectionsApiResponse {
  total: number;
  facebook: FacebookConnection[];
  instagram: InstagramConnection[];
}

export type AuthResult = {
  success: boolean;
  authUrl?: string;
  state?: string;
  connectionId?: string;
  message?: string;
  error?: string;
  data?: any;
};

export type AuthenticationUrl = {
  authUrl: string;
  state: string;
};


export type LinkedAccount = {
  id: string;
  username?: string;
  name: string;
  profilePictureUrl?: string;
  followersCount?: number;
};

export type DisconnectionResult = {
  success: boolean;
  message: string;
  data: {
    disconnectedPlatform: string;
    automaticallyDisconnected: string[];
    disconnectedConnectionIds: string[];
  };
};

// Pure domain types - Legacy, now using isActive boolean in new structure
export type ConnectionStatus = 'active' | 'expired' | 'error';
export type PlatformType = string; 
export type DateTimeString = string;
export type UserId = string;
export type SessionId = string;
export type ConnectionId = string;
