// shared/infrastructure/http/interfaces.ts
import { RequestConfig, ApiError } from './types';

// 🎯 Interface siguiendo Interface Segregation Principle (ISP)
export interface IHttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
  patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
  delete<T>(url: string, config?: RequestConfig): Promise<T>;
}

export interface IAuthTokenManager {
  getAccessToken(): string | null;
  getRefreshToken(): string | null;
  isTokenExpired(token: string): boolean;
  refreshAccessToken(): Promise<string>;
  clearTokens(): void;
}

export interface IErrorHandler {
  handle(error: ApiError): void;
  isRetryable(error: ApiError): boolean;
}

export interface IInterceptorManager {
  addRequestInterceptor(interceptor: RequestInterceptor): void;
  addResponseInterceptor(interceptor: ResponseInterceptor): void;
}

// Tipos para interceptors
export type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
export type ResponseInterceptor = <T>(response: T) => T | Promise<T>;

// Interface para logging (opcional, para debugging)
export interface ILogger {
  debug(message: string, data?: any): void;
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, data?: any): void;
}
