// shared/infrastructure/http/auth-token-manager.ts
import { IAuthTokenManager } from './interfaces';
import { AuthResponse, RefreshResponse } from './types';

// 🔐 Single Responsibility: Solo maneja tokens de autenticación
export class AuthTokenManager implements IAuthTokenManager {
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    // ✅ Con proxy, las cookies se manejan automáticamente
    // Buscar token en localStorage como backup
    const localToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    if (localToken) {
      console.log('💾 Access token obtenido de localStorage');
      return localToken;
    }
    
    // ✅ Si no hay token en localStorage, las cookies HTTP-only se envían automáticamente
    console.log('🍪 Sin token en localStorage - usando cookies HTTP-only automáticas');
    return null; // Las cookies se envían automáticamente
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    // ✅ Primero intentar obtener de cookies
    const cookieToken = this.getTokenFromCookies('refreshToken');
    if (cookieToken) {
      console.log('🍪 Refresh token obtenido de cookies');
      return cookieToken;
    }
    
    // ✅ Fallback a localStorage
    const localToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    if (localToken) {
      console.log('💾 Refresh token obtenido de localStorage');
      return localToken;
    }
    
    console.log('❌ No se encontró refresh token');
    return null;
  }

  private getTokenFromCookies(tokenName: string): string | null {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => 
      cookie.trim().startsWith(`${tokenName}=`)
    );
    
    if (!tokenCookie) return null;
    
    const token = tokenCookie.split('=')[1]?.trim();
    return token || null;
  }

  isTokenExpired(token: string): boolean {
    // ✅ Si es el token dummy de sesión HTTP-only, considerarlo válido
    if (token === 'http-only-session') {
      console.log('✅ Sesión basada en cookies HTTP-only detectada');
      return false;
    }
    
    try {
      // Verificar que el token tenga el formato JWT correcto
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.warn('⚠️ Token no tiene formato JWT válido');
        return true;
      }

      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (!payload.exp) {
        console.warn('⚠️ Token no tiene campo exp');
        return true;
      }
      
      const isExpired = payload.exp < currentTime;
      
      if (isExpired) {
        console.log('⏰ Token expirado');
      } else {
        console.log('✅ Token válido');
      }
      
      return isExpired;
    } catch (error) {
      console.error('🚨 Error parsing token:', error);
      return true; // Si no se puede parsear, considerarlo expirado
    }
  }

  async refreshAccessToken(): Promise<string> {
    console.log('🔄 Iniciando refresh de token...');
    
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken || this.isTokenExpired(refreshToken)) {
      throw new Error('Refresh token is invalid or expired');
    }

    try {
      // 🔄 Llamar al endpoint de refresh con cookies automáticas
      const response = await fetch(`${this.getBaseURL()}/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // ✅ CRÍTICO: Incluir cookies automáticamente
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true', // Para desarrollo con ngrok
        },
      });

      if (!response.ok) {
        console.error('🚨 Refresh falló:', response.status, response.statusText);
        throw new Error(`Failed to refresh token: ${response.status}`);
      }

      const data: RefreshResponse = await response.json();
      
      console.log('✅ Token refreshed successfully');
      
      // ✅ Las cookies se establecen automáticamente por el backend
      // Solo guardamos en localStorage como backup
      if (data.accessToken) {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, data.accessToken);
        console.log('💾 Nuevo token guardado en localStorage como backup');
      }
      
      return data.accessToken;
      
    } catch (error) {
      console.error('🚨 Error en refresh token:', error);
      this.clearTokens(); // Limpiar tokens inválidos
      throw error;
    }
  }

  clearTokens(): void {
    if (typeof window === 'undefined') return;
    
    console.log('🧹 Limpiando todos los tokens...');
    
    // ✅ Limpiar localStorage
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    
    // ✅ Limpiar cookies (si es posible desde frontend)
    // Nota: Esto puede no funcionar si las cookies tienen httpOnly
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
    
    console.log('✅ Tokens limpiados');
  }

  // Método para guardar tokens después del login (opcional, como backup)
  saveTokens(authResponse: AuthResponse): void {
    if (typeof window === 'undefined') return;
    
    console.log('💾 Guardando tokens como backup en localStorage...');
    
    // Guardar en localStorage como backup (las cookies ya las establece el backend)
    if (authResponse.accessToken) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, authResponse.accessToken);
    }
    
    if (authResponse.refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, authResponse.refreshToken);
    }
    
    console.log('✅ Tokens guardados como backup');
  }

  private getBaseURL(): string {
    return '/api'; // ✅ Usar el proxy de Next.js
  }

  // Método para debugging - verificar estado de tokens
  debugTokenState(): void {
    console.log('🔍 Estado actual de tokens:');
    console.log('Access Token (cookies):', this.getTokenFromCookies('accessToken') ? '✅ Disponible' : '❌ No disponible');
    console.log('Access Token (localStorage):', localStorage.getItem(this.ACCESS_TOKEN_KEY) ? '✅ Disponible' : '❌ No disponible');
    console.log('Refresh Token (cookies):', this.getTokenFromCookies('refreshToken') ? '✅ Disponible' : '❌ No disponible');
    console.log('Refresh Token (localStorage):', localStorage.getItem(this.REFRESH_TOKEN_KEY) ? '✅ Disponible' : '❌ No disponible');
    
    const accessToken = this.getAccessToken();
    if (accessToken) {
      console.log('Token válido:', !this.isTokenExpired(accessToken) ? '✅ Sí' : '❌ Expirado');
    }
  }
}
