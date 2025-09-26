// shared/infrastructure/http/index.ts
// ✅ Barrel export siguiendo Clean Architecture
export * from './interfaces';
export * from './types';
export * from './http-client';
export * from './auth-token-manager';
export * from './error-handler';
export * from './factory';

// ✅ Instancia singleton para usar en toda la app
import { HttpClientFactory } from './factory';

// Singleton principal - se crea una vez y se reutiliza
export const httpClient = HttpClientFactory.createWithAuth();

// ✅ Para casos específicos o testing
export const createHttpClient = HttpClientFactory.createDefault;
export const createDevHttpClient = HttpClientFactory.createForDevelopment;
export const createProdHttpClient = HttpClientFactory.createForProduction;
export const createTestHttpClient = HttpClientFactory.createForTesting;
export const createDebugHttpClient = HttpClientFactory.createDebug;
export const createCustomHttpClient = HttpClientFactory.createCustom;

// ✅ Configuraciones predefinidas
export const HTTP_CONFIG = {
  DEVELOPMENT: HttpClientFactory.getEnvironmentConfig(),
  PRODUCTION: HttpClientFactory.getEnvironmentConfig(),
} as const;

// ✅ Constantes útiles para endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    REGISTER: '/auth/register',
  },
  
  // Publications endpoints
  PUBLICATIONS: {
    BASE: '/publications',
    BY_ID: (id: string) => `/publications/${id}`,
    PUBLISH: (id: string) => `/publications/${id}/publish`,
    SCHEDULE: (id: string) => `/publications/${id}/schedule`,
    CANCEL: (id: string) => `/publications/${id}/cancel`,
    ANALYTICS: (id: string) => `/publications/${id}/analytics`,
  },
  
  // Social Media endpoints
  SOCIAL: {
    PLATFORMS: '/social/platforms',
    CONNECT: (platform: string) => `/social/${platform}/connect`,
    DISCONNECT: (platform: string) => `/social/${platform}/disconnect`,
    STATUS: (platform: string) => `/social/${platform}/status`,
  },
  
  // User endpoints
  USER: {
    PROFILE: '/user/profile',
    SETTINGS: '/user/settings',
    PREFERENCES: '/user/preferences',
  },
} as const;

// ✅ Tipos de response comunes
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
};

export type LoginRequest = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type LoginResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

// ✅ Utility function para verificar si hay conexión
export async function checkConnection(): Promise<boolean> {
  try {
    await httpClient.get('/health');
    return true;
  } catch {
    return false;
  }
}

// ✅ Utility function para login manual (para testing)
export async function loginWithCredentials(
  email: string, 
  password: string
): Promise<LoginResponse> {
  return httpClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
    email,
    password,
  });
}

// ✅ Utility function para logout manual
export async function logout(): Promise<void> {
  try {
    await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  } catch (error) {
    console.warn('Error en logout, pero limpiando tokens localmente:', error);
  } finally {
    // Siempre limpiar tokens localmente
    httpClient.clearAuthentication();
  }
}
