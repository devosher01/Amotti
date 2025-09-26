// shared/infrastructure/http/types.ts

export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
  signal?: AbortSignal;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
}

export interface RetryConfig {
  attempts: number;
  delay: number;
  backoff: 'linear' | 'exponential';
}

export interface HttpClientConfig {
  baseURL: string;
  timeout: number;
  defaultHeaders: Record<string, string>;
  withCredentials: boolean;
  retryConfig: RetryConfig;
}

// Response types para tu backend
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface RefreshResponse {
  accessToken: string;
}

// Tipos para debugging y logs
export interface RequestLog {
  method: string;
  url: string;
  headers: Record<string, string>;
  timestamp: number;
  withCredentials: boolean;
}

export interface ResponseLog {
  status: number;
  ok: boolean;
  url: string;
  headers: Record<string, string>;
  timestamp: number;
}
