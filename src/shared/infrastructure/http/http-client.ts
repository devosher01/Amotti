// // shared/infrastructure/http/http-client.ts
// import { 
//   IHttpClient, 
//   IAuthTokenManager, 
//   IErrorHandler,
//   RequestInterceptor,
//   ResponseInterceptor 
// } from './interfaces';
// import { RequestConfig, ApiError, HttpClientConfig, RequestLog, ResponseLog } from './types';
// import { AuthTokenManager } from './auth-token-manager';
// import { HttpErrorHandler } from './error-handler';

// // 🚀 HTTP Client robusto siguiendo principios SOLID
// export class HttpClient implements IHttpClient {
//   private readonly config: HttpClientConfig;
//   private readonly authManager: IAuthTokenManager;
//   private readonly errorHandler: IErrorHandler;
//   private readonly requestInterceptors: RequestInterceptor[] = [];
//   private readonly responseInterceptors: ResponseInterceptor[] = [];

//   constructor(
//     config: Partial<HttpClientConfig> = {},
//     authManager?: IAuthTokenManager,
//     errorHandler?: IErrorHandler
//   ) {
//     // ✅ Dependency Injection con defaults
//     this.config = {
//       baseURL: '/api', // ✅ Usar el proxy de Next.js
//       timeout: 30000,
//       withCredentials: false, // ✅ No necesario - mismo dominio
//       defaultHeaders: {
//         'Content-Type': 'application/json',
//         // ✅ Headers específicos para tu backend
//         'ngrok-skip-browser-warning': 'true', // Para desarrollo con ngrok
//         'Accept': 'application/json',
//       },
//       retryConfig: {
//         attempts: 3,
//         delay: 1000,
//         backoff: 'exponential',
//       },
//       ...config,
//     };

//     this.authManager = authManager || new AuthTokenManager();
//     this.errorHandler = errorHandler || new HttpErrorHandler();

//     this.setupDefaultInterceptors();
    
//     console.log('🚀 HttpClient inicializado:', {
//       baseURL: this.config.baseURL,
//       withCredentials: this.config.withCredentials,
//       timeout: this.config.timeout,
//     });
//   }

//   private setupDefaultInterceptors(): void {
//     // 🔑 Request interceptor para autenticación
//     this.addRequestInterceptor(async (config) => {
//       const token = this.authManager.getAccessToken();
      
//       // ✅ Solo agregar Authorization header si hay token JWT válido
//       if (token && !this.authManager.isTokenExpired(token)) {
//         config.headers = {
//           ...config.headers,
//           Authorization: `Bearer ${token}`,
//         };
        
//         console.log('🔑 Token JWT agregado al request');
//       } else {
//         console.log('🍪 Usando cookies HTTP-only para autenticación (sin Authorization header)');
//       }

//       this.logRequest(config);
//       return config;
//     });

//     // 🔄 Response interceptor para logging
//     this.addResponseInterceptor(async (response) => {
//       // Este se ejecuta después de procesar la response
//       return response;
//     });
//   }

//   addRequestInterceptor(interceptor: RequestInterceptor): void {
//     this.requestInterceptors.push(interceptor);
//   }

//   addResponseInterceptor(interceptor: ResponseInterceptor): void {
//     this.responseInterceptors.push(interceptor);
//   }

//   async get<T>(url: string, config?: RequestConfig): Promise<T> {
//     return this.request<T>('GET', url, undefined, config);
//   }

//   async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
//     return this.request<T>('POST', url, data, config);
//   }

//   async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
//     return this.request<T>('PUT', url, data, config);
//   }

//   async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
//     return this.request<T>('PATCH', url, data, config);
//   }

//   async delete<T>(url: string, config?: RequestConfig): Promise<T> {
//     return this.request<T>('DELETE', url, undefined, config);
//   }

//   private async request<T>(
//     method: string,
//     url: string,
//     data?: unknown,
//     config?: RequestConfig
//   ): Promise<T> {
//     const fullUrl = url.startsWith('http') ? url : `${this.config.baseURL}${url}`;
    
//     let requestConfig: RequestConfig = {
//       ...config,
//       headers: {
//         ...this.config.defaultHeaders,
//         ...config?.headers,
//       },
//       timeout: config?.timeout || this.config.timeout,
//       withCredentials: config?.withCredentials ?? this.config.withCredentials,
//     };

//     // ✅ Aplicar request interceptors
//     for (const interceptor of this.requestInterceptors) {
//       requestConfig = await interceptor(requestConfig);
//     }

//     return this.executeWithRetry(() => 
//       this.executeRequest<T>(method, fullUrl, data, requestConfig)
//     );
//   }

//   private async executeRequest<T>(
//     method: string,
//     url: string,
//     data?: unknown,
//     config?: RequestConfig
//   ): Promise<T> {
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => {
//       console.warn('⏰ Request timeout después de', config?.timeout || this.config.timeout, 'ms');
//       controller.abort();
//     }, config?.timeout || this.config.timeout);

//     try {
//       const fetchConfig: RequestInit = {
//         method,
//         headers: config?.headers,
//         body: data ? JSON.stringify(data) : undefined,
//         credentials: 'same-origin', // ✅ Mismo dominio - cookies automáticas
//         signal: config?.signal || controller.signal,
//       };

//       console.log('🌐 Enviando request:', {
//         method,
//         url,
//         withCredentials: config?.withCredentials,
//         hasAuth: config?.headers?.Authorization ? '✅' : '❌',
//       });

//       const response = await fetch(url, fetchConfig);

//       clearTimeout(timeoutId);

//       const responseLog: ResponseLog = {
//         status: response.status,
//         ok: response.ok,
//         url: response.url,
//         headers: Object.fromEntries(response.headers.entries()),
//         timestamp: Date.now(),
//       };

//       this.logResponse(responseLog);

//       if (!response.ok) {
//         const errorData = await this.extractErrorData(response);
//         const apiError: ApiError = {
//           message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
//           status: response.status,
//           code: errorData.code,
//           details: errorData,
//         };

//         // ✅ Intentar refresh token automáticamente para 401
//         if (response.status === 401 && !url.includes('/auth/refresh') && !url.includes('/auth/login')) {
//           console.log('🔄 Detectado 401, intentando refresh token...');
//           return this.handleTokenRefresh<T>(method, url, data, config);
//         }

//         this.errorHandler.handle(apiError);
//         throw apiError;
//       }

//       let result: T;
      
//       // Verificar si la response tiene contenido
//       const contentType = response.headers.get('content-type');
//       if (contentType?.includes('application/json')) {
//         result = await response.json();
//       } else {
//         // Para responses sin contenido (ej: 204 No Content)
//         result = {} as T;
//       }

//       // ✅ Aplicar response interceptors
//       let processedResult = result;
//       for (const interceptor of this.responseInterceptors) {
//         processedResult = await interceptor(processedResult);
//       }

//       console.log('✅ Request exitoso:', {
//         status: response.status,
//         url: response.url,
//       });

//       return processedResult;

//     } catch (error) {
//       clearTimeout(timeoutId);

//       if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
//         throw error;
//       }

//       // Manejar errores de AbortController
//       if (error instanceof Error && error.name === 'AbortError') {
//         const timeoutError: ApiError = {
//           message: 'Request timeout',
//           status: 408,
//           details: { type: 'timeout', originalError: error },
//         };
        
//         this.errorHandler.handle(timeoutError);
//         throw timeoutError;
//       }

//       const apiError: ApiError = {
//         message: error instanceof Error ? error.message : 'Network error',
//         status: 0,
//         details: { type: 'network', originalError: error },
//       };

//       this.errorHandler.handle(apiError);
//       throw apiError;
//     }
//   }

//   private async handleTokenRefresh<T>(
//     method: string,
//     url: string,
//     data?: unknown,
//     config?: RequestConfig
//   ): Promise<T> {
//     try {
//       console.log('🔄 Iniciando proceso de refresh token...');
      
//       const newToken = await this.authManager.refreshAccessToken();
      
//       console.log('✅ Token refreshed successfully, reintentando request original...');
      
//       // ✅ Retry original request with new token
//       const newConfig: RequestConfig = {
//         ...config,
//         headers: {
//           ...config?.headers,
//           Authorization: `Bearer ${newToken}`,
//         },
//       };

//       return this.executeRequest<T>(method, url, data, newConfig);
      
//     } catch (refreshError) {
//       console.error('🚨 Token refresh failed:', refreshError);
      
//       // ✅ Si el refresh falla, limpiar tokens y lanzar error
//       const unauthorizedError: ApiError = {
//         message: 'Authentication expired and refresh failed',
//         status: 401,
//         code: 'REFRESH_FAILED',
//         details: refreshError,
//       };
      
//       this.errorHandler.handle(unauthorizedError);
//       throw unauthorizedError;
//     }
//   }

//   private async executeWithRetry<T>(operation: () => Promise<T>): Promise<T> {
//     const { attempts, delay, backoff } = this.config.retryConfig;
//     let lastError: ApiError;

//     for (let attempt = 1; attempt <= attempts; attempt++) {
//       try {
//         return await operation();
//       } catch (error) {
//         lastError = error as ApiError;

//         // No reintentar si es el último intento o si el error no es retriable
//         if (attempt === attempts || !this.errorHandler.isRetryable(lastError)) {
//           throw lastError;
//         }

//         const waitTime = backoff === 'exponential' 
//           ? delay * Math.pow(2, attempt - 1)
//           : delay * attempt;

//         console.warn(`🔄 Retry attempt ${attempt}/${attempts} en ${waitTime}ms. Error:`, lastError.message);
//         await this.sleep(waitTime);
//       }
//     }

//     throw lastError!;
//   }

//   private async extractErrorData(response: Response): Promise<any> {
//     try {
//       const contentType = response.headers.get('content-type');
//       if (contentType?.includes('application/json')) {
//         return await response.json();
//       }
      
//       const textResponse = await response.text();
//       return { message: textResponse || 'Unknown error' };
//     } catch {
//       return { message: `HTTP ${response.status}: ${response.statusText}` };
//     }
//   }

//   private sleep(ms: number): Promise<void> {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

//   private logRequest(config: RequestConfig): void {
//     const log: RequestLog = {
//       method: 'REQUEST',
//       url: 'Request enviado',
//       headers: config.headers || {},
//       timestamp: Date.now(),
//       withCredentials: config.withCredentials || false,
//     };

//     console.log('📤 HTTP Request:', log);
//   }

//   private logResponse(response: ResponseLog): void {
//     console.log('📥 HTTP Response:', response);
//   }

//   // Método público para debugging
//   debugTokenState(): void {
//     if (this.authManager instanceof AuthTokenManager) {
//       this.authManager.debugTokenState();
//     } else {
//       console.log('🔍 Token debug no disponible con este auth manager');
//     }
//   }

//   // Método para limpiar tokens manualmente
//   clearAuthentication(): void {
//     this.authManager.clearTokens();
//     console.log('🧹 Autenticación limpiada manualmente');
//   }
// }
