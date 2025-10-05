/**
 * Utilidades de autenticación para middleware y validaciones
 */

/**
 * Rutas públicas que NO requieren autenticación
 */
const PUBLIC_ROUTES = [
  // Rutas estáticas y API
  '/api',
  '/_next',
  '/favicon.ico',
  '/manifest.json',
  '/images',
  '/public',
];

/**
 * Rutas de autenticación (si ya está logueado, redirigir a dashboard)
 */
const AUTH_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
];

/**
 * Rutas protegidas que requieren autenticación
 */
const PROTECTED_ROUTES = [
  '/planificacion',
  '/perfil',
  '/configuracion',
  '/usuarios',
  '/analytics',
  '/aigencia',
  '/analitica',
];

/**
 * Verificar si una ruta es pública (estática)
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => 
    pathname.startsWith(route)
  );
}

/**
 * Verificar si una ruta es de autenticación
 */
export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
}

/**
 * Verificar si una ruta está protegida
 */
export function isProtectedRoute(pathname: string): boolean {
  // La ruta raíz está protegida (es el dashboard)
  if (pathname === '/') {
    return true;
  }
  
  return PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route)
  );
}

/**
 * Obtener URL de redirección después del login
 */
export function getRedirectUrl(searchParams: URLSearchParams): string {
  const redirect = searchParams.get('redirect');
  
  // Validar que la URL de redirección es segura
  if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
    // No redirigir a rutas de auth
    if (isAuthRoute(redirect)) {
      return '/';
    }
    return redirect;
  }
  
  return '/';
}

/**
 * Verificar si el token está próximo a expirar
 */
export function shouldRefreshToken(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    
    // Renovar si quedan menos de 5 minutos
    return timeUntilExpiration < 5 * 60 * 1000;
  } catch (error) {
    return false;
  }
}

/**
 * Verificar si un token JWT es válido (formato)
 */
export function isValidJWTFormat(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Verificar que se puede decodificar el payload
    JSON.parse(atob(parts[1]));
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Extraer información del token sin validar la firma
 */
export function extractTokenInfo(token: string): { userId?: string; email?: string; exp?: number } | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      userId: payload.userId || payload.sub,
      email: payload.email,
      exp: payload.exp,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Construir URL de login con redirección
 */
export function buildLoginUrl(currentPath: string, baseUrl: string): string {
  const loginUrl = new URL('/login', baseUrl);
  
  // Solo agregar redirect si no es una ruta de auth
  if (currentPath !== '/login' && !isAuthRoute(currentPath)) {
    loginUrl.searchParams.set('redirect', currentPath);
  }
  
  return loginUrl.toString();
}

/**
 * Constantes de rutas
 */
export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
} as const;

/**
 * Configuración de cookies
 */
export const COOKIE_CONFIG = {
  AUTH_TOKEN: {
    name: 'accessToken',
    maxAge: 24 * 60 * 60, // 24 horas
  },
  REFRESH_TOKEN: {
    name: 'refreshToken',
    maxAge: 7 * 24 * 60 * 60, // 7 días
  },
} as const;