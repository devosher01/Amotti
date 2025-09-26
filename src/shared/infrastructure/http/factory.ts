// shared/infrastructure/http/factory.ts
import { HttpClient } from './http-client';
import { AuthTokenManager } from './auth-token-manager';
import { HttpErrorHandler } from './error-handler';
import { HttpClientConfig } from './types';

// 🏭 Factory Pattern para crear instancias configuradas
export class HttpClientFactory {
  
  static createDefault(): HttpClient {
    console.log('🏭 Creando HttpClient default...');
    return new HttpClient();
  }

  static createWithAuth(): HttpClient {
    console.log('🏭 Creando HttpClient con autenticación...');
    
    const authManager = new AuthTokenManager();
    const errorHandler = new HttpErrorHandler();
    
    return new HttpClient(
      {
        withCredentials: true, // ✅ CRÍTICO: Habilitar cookies automáticamente
      },
      authManager,
      errorHandler
    );
  }

  static createForDevelopment(): HttpClient {
    console.log('🏭 Creando HttpClient para desarrollo...');
    
    const config: Partial<HttpClientConfig> = {
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
      timeout: 60000, // Más tiempo en desarrollo para debugging
      withCredentials: true,
      defaultHeaders: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'X-Development-Mode': 'true',
      },
      retryConfig: {
        attempts: 1, // Menos reintentos en desarrollo para debugging rápido
        delay: 500,
        backoff: 'linear',
      },
    };

    const authManager = new AuthTokenManager();
    const errorHandler = new HttpErrorHandler();

    return new HttpClient(config, authManager, errorHandler);
  }

  static createForProduction(): HttpClient {
    console.log('🏭 Creando HttpClient para producción...');
    
    const config: Partial<HttpClientConfig> = {
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
      timeout: 15000, // Timeout más agresivo en producción
      withCredentials: true,
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      retryConfig: {
        attempts: 3,
        delay: 1000,
        backoff: 'exponential',
      },
    };

    const authManager = new AuthTokenManager();
    const errorHandler = new HttpErrorHandler();

    return new HttpClient(config, authManager, errorHandler);
  }

  static createForTesting(): HttpClient {
    console.log('🏭 Creando HttpClient para testing...');
    
    const config: Partial<HttpClientConfig> = {
      baseURL: 'http://localhost:3000', // Siempre local para tests
      timeout: 5000, // Timeout rápido para tests
      withCredentials: false, // No cookies en tests por defecto
      defaultHeaders: {
        'Content-Type': 'application/json',
        'X-Test-Mode': 'true',
      },
      retryConfig: {
        attempts: 1, // Sin reintentos en tests
        delay: 0,
        backoff: 'linear',
      },
    };

    const authManager = new AuthTokenManager();
    const errorHandler = new HttpErrorHandler();

    return new HttpClient(config, authManager, errorHandler);
  }

  // Factory para casos específicos con configuración custom
  static createCustom(
    config: Partial<HttpClientConfig>,
    authManager?: AuthTokenManager,
    errorHandler?: HttpErrorHandler
  ): HttpClient {
    console.log('🏭 Creando HttpClient personalizado...');
    
    return new HttpClient(
      config,
      authManager || new AuthTokenManager(),
      errorHandler || new HttpErrorHandler()
    );
  }

  // Factory para debugging - con logs extra verbosos
  static createDebug(): HttpClient {
    console.log('🏭 Creando HttpClient para debugging...');
    
    const config: Partial<HttpClientConfig> = {
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
      timeout: 30000,
      withCredentials: true,
      defaultHeaders: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'X-Debug-Mode': 'true',
      },
      retryConfig: {
        attempts: 1, // Sin reintentos para debugging más claro
        delay: 0,
        backoff: 'linear',
      },
    };

    const authManager = new AuthTokenManager();
    const errorHandler = new HttpErrorHandler();

    const client = new HttpClient(config, authManager, errorHandler);
    
    // Agregar interceptors de debugging extra
    client.addRequestInterceptor(async (requestConfig) => {
      console.log('🔍 DEBUG - Request Config:', {
        headers: requestConfig.headers,
        withCredentials: requestConfig.withCredentials,
        timeout: requestConfig.timeout,
      });
      return requestConfig;
    });

    client.addResponseInterceptor(async (response) => {
      console.log('🔍 DEBUG - Response:', response);
      return response;
    });

    return client;
  }

  // Método para obtener configuración según el entorno
  static getEnvironmentConfig(): Partial<HttpClientConfig> {
    const isProduction = process.env.NODE_ENV === 'production';
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isProduction) {
      return {
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
        timeout: 15000,
        retryConfig: { attempts: 3, delay: 1000, backoff: 'exponential' },
      };
    }
    
    if (isDevelopment) {
      return {
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
        timeout: 60000,
        retryConfig: { attempts: 1, delay: 500, backoff: 'linear' },
        defaultHeaders: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'X-Development-Mode': 'true',
        },
      };
    }
    
    // Test environment
    return {
      baseURL: 'http://localhost:3000',
      timeout: 5000,
      retryConfig: { attempts: 1, delay: 0, backoff: 'linear' },
    };
  }
}
