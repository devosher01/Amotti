// shared/infrastructure/http/error-handler.ts
import { IErrorHandler } from './interfaces';
import { ApiError } from './types';

// 🎯 Single Responsibility: Solo maneja errores HTTP
export class HttpErrorHandler implements IErrorHandler {
  handle(error: ApiError): void {
    console.error('🚨 HTTP Error:', {
      status: error.status,
      message: error.message,
      code: error.code,
      details: error.details,
      timestamp: new Date().toISOString(),
    });

    // ✅ Manejar errores específicos
    switch (error.status) {
      case 401:
        this.handleUnauthorized(error);
        break;
      case 403:
        this.handleForbidden(error);
        break;
      case 404:
        this.handleNotFound(error);
        break;
      case 409:
        this.handleConflict(error);
        break;
      case 422:
        this.handleValidationError(error);
        break;
      case 429:
        this.handleRateLimit(error);
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        this.handleServerError(error);
        break;
      default:
        this.handleGenericError(error);
    }
  }

  isRetryable(error: ApiError): boolean {
    // ✅ Códigos de error que permiten retry
    const retryableStatuses = [
      408, // Request Timeout
      429, // Too Many Requests
      500, // Internal Server Error
      502, // Bad Gateway
      503, // Service Unavailable
      504, // Gateway Timeout
    ];
    
    return retryableStatuses.includes(error.status);
  }

  private handleUnauthorized(error: ApiError): void {
    console.warn('🔒 Unauthorized access - token inválido o expirado');
    
    // ✅ Solo redirigir si estamos en el cliente y no es un endpoint de auth
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      
      // No redirigir si ya estamos en login o es un endpoint de auth
      if (!currentPath.includes('/login') && !currentPath.includes('/auth')) {
        console.log('🔄 Redirecting to login...');
        
        // Guardar la URL actual para redirigir después del login
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        
        // Redirigir al login
        window.location.href = '/login';
      }
    }
  }

  private handleForbidden(error: ApiError): void {
    console.warn('🚫 Forbidden access - permisos insuficientes');
    
    // Aquí podrías mostrar un toast o modal
    if (typeof window !== 'undefined') {
      // TODO: Integrar con tu sistema de notificaciones
      console.warn('Usuario sin permisos para esta acción');
    }
  }

  private handleNotFound(error: ApiError): void {
    console.warn('🔍 Resource not found:', error.message);
    
    // Para endpoints específicos, podrías manejar de forma diferente
    if (error.details && typeof error.details === 'object') {
      const details = error.details as any;
      if (details.url?.includes('/publications/')) {
        console.warn('Publicación no encontrada');
      }
    }
  }

  private handleConflict(error: ApiError): void {
    console.warn('⚠️ Conflict - recurso ya existe o está en conflicto');
    
    // Común en operaciones de creación cuando ya existe el recurso
    if (typeof window !== 'undefined') {
      console.warn('Conflicto detectado:', error.message);
    }
  }

  private handleValidationError(error: ApiError): void {
    console.warn('📝 Validation error - datos inválidos');
    
    // Aquí podrías parsear los errores de validación específicos
    if (error.details && typeof error.details === 'object') {
      const details = error.details as any;
      if (details.validationErrors) {
        console.warn('Errores de validación:', details.validationErrors);
      }
    }
  }

  private handleRateLimit(error: ApiError): void {
    console.warn('⏰ Rate limit exceeded - demasiadas peticiones');
    
    // Extraer información del rate limit si está disponible
    if (error.details && typeof error.details === 'object') {
      const details = error.details as any;
      const retryAfter = details.retryAfter || details['retry-after'];
      
      if (retryAfter) {
        console.warn(`Rate limit activo. Retry después de: ${retryAfter} segundos`);
      }
    }
  }

  private handleServerError(error: ApiError): void {
    console.error('🔥 Server error - problema en el backend');
    
    // Log adicional para errores de servidor
    console.error('Detalles del error de servidor:', {
      status: error.status,
      message: error.message,
      details: error.details,
    });
    
    if (typeof window !== 'undefined') {
      // TODO: Mostrar mensaje al usuario sobre error del servidor
      console.error('Error del servidor. Por favor, intenta más tarde.');
    }
  }

  private handleGenericError(error: ApiError): void {
    console.error('⚠️ Generic error:', error.message);
    
    // Para errores de red u otros tipos
    if (error.status === 0) {
      console.error('Error de red - sin conexión o CORS');
      
      if (typeof window !== 'undefined') {
        console.error('Problema de conexión. Verifica tu internet.');
      }
    }
  }

  // Método para registrar métricas de errores (opcional)
  logErrorMetrics(error: ApiError): void {
    // Aquí podrías enviar métricas a un servicio de monitoring
    const metrics = {
      errorCode: error.status,
      errorMessage: error.message,
      timestamp: Date.now(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    };
    
    console.log('📊 Error metrics:', metrics);
    
    // TODO: Enviar a servicio de analytics/monitoring
    // analytics.track('http_error', metrics);
  }

  // Método para crear errores personalizados
  createCustomError(message: string, status: number, code?: string, details?: unknown): ApiError {
    return {
      message,
      status,
      code,
      details,
    };
  }
}
