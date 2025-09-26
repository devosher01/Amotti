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

export type PlatformConnection = {
  id: string;
  platform: string;
  status: ConnectionStatus;
  tokenInfo: {
    expiresAt?: string;
    timeRemaining: string;
    needsRefresh: boolean;
  };
  createdAt: string;
  updatedAt: string;
  pageInfo: {
    id: string;
    name: string;
    category: string;
    profilePictureUrl?: string;
    followersCount?: number;
    verified: boolean;
  };
};

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

export type ConnectionsData = {
  connections: PlatformConnection[];
  total: number;
  stats: {
    active: number;
    expired: number;
    platforms: string[];
  };
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

// Pure domain types
export type ConnectionStatus = 'active' | 'expired' | 'error';
export type PlatformType = string; 
export type DateTimeString = string;
export type UserId = string;
export type SessionId = string;
export type ConnectionId = string;
