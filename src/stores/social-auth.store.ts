import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface SocialConnection {
  id: string;
  platform: string;
  platformDisplayName: string;
  status: 'active' | 'expired' | 'error' | 'revoked';
  isActive: boolean;
  isTokenExpired: boolean;
  permissions: string[];
  accounts: Array<{
    id: string;
    name: string;
    type: 'page' | 'profile';
    metadata?: Record<string, unknown>;
  }>;
  tokenInfo: {
    expiresAt: string;
    needsRefresh: boolean;
    timeRemaining?: string;
  };
  lastUsedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface OAuthSession {
  sessionId: string;
  platform: string;
  authorizationUrl: string;
  expiresIn: number;
  createdAt: number;
}

export interface SocialAuthState {
  connections: SocialConnection[];
  loading: boolean;
  error: string | null;
  oauthSession: OAuthSession | null;
  isConnecting: boolean;
  selectedPlatform: string | null;
}

export interface SocialAuthActions {
  setConnections: (connections: SocialConnection[]) => void;
  addConnection: (connection: SocialConnection) => void;
  removeConnection: (connectionId: string) => void;
  updateConnection: (connectionId: string, updates: Partial<SocialConnection>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setOAuthSession: (session: OAuthSession | null) => void;
  setConnecting: (isConnecting: boolean, platform?: string) => void;
  reset: () => void;
  
  // Computed selectors
  getConnectionByPlatform: (platform: string) => SocialConnection | undefined;
  isConnected: (platform: string) => boolean;
  getActiveConnections: () => SocialConnection[];
  getConnectionStats: () => {
    total: number;
    active: number;
    expired: number;
    connectedPlatforms: string[];
  };
}

type SocialAuthStore = SocialAuthState & SocialAuthActions;

const initialState: SocialAuthState = {
  connections: [],
  loading: false,
  error: null,
  oauthSession: null,
  isConnecting: false,
  selectedPlatform: null,
};

export const useSocialAuthStore = create<SocialAuthStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Actions
      setConnections: (connections) =>
        set(() => ({ connections }), false, 'setConnections'),

      addConnection: (connection) =>
        set(
          (state) => ({
            connections: [
              ...state.connections.filter(c => c.platform !== connection.platform),
              connection,
            ],
          }),
          false,
          'addConnection'
        ),

      removeConnection: (connectionId) =>
        set(
          (state) => ({
            connections: state.connections.filter(c => c.id !== connectionId),
          }),
          false,
          'removeConnection'
        ),

      updateConnection: (connectionId, updates) =>
        set(
          (state) => ({
            connections: state.connections.map(c =>
              c.id === connectionId ? { ...c, ...updates } : c
            ),
          }),
          false,
          'updateConnection'
        ),

      setLoading: (loading) =>
        set(() => ({ loading }), false, 'setLoading'),

      setError: (error) =>
        set(() => ({ error }), false, 'setError'),

      setOAuthSession: (oauthSession) =>
        set(() => ({ oauthSession }), false, 'setOAuthSession'),

      setConnecting: (isConnecting, platform) =>
        set(
          () => ({
            isConnecting,
            selectedPlatform: platform || null,
          }),
          false,
          'setConnecting'
        ),

      reset: () =>
        set(() => initialState, false, 'reset'),

      // Selectors
      getConnectionByPlatform: (platform) => {
        const { connections } = get();
        return connections.find(c => c.platform === platform && c.isActive);
      },

      isConnected: (platform) => {
        const { connections } = get();
        return connections.some(c => c.platform === platform && c.isActive);
      },

      getActiveConnections: () => {
        const { connections } = get();
        return connections.filter(c => c.isActive);
      },

      getConnectionStats: () => {
        const { connections } = get();
        const active = connections.filter(c => c.isActive);
        const expired = connections.filter(c => c.isTokenExpired);
        
        return {
          total: connections.length,
          active: active.length,
          expired: expired.length,
          connectedPlatforms: active.map(c => c.platform),
        };
      },
    }),
    {
      name: 'social-auth-store',
      partialize: (state) => ({
        connections: state.connections,
      }),
    }
  )
);