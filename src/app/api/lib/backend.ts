// Configuración centralizada para todas las APIs
export const API_CONFIG = {
  // URL del backend
  BACKEND_BASE_URL: 'http://localhost:3000',
  
  // Headers comunes para todas las peticiones
  COMMON_HEADERS: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  },
  
  // Endpoints del backend
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout', 
      ME: '/auth/me',
      REFRESH: '/auth/refresh'
    },
    USER: {
      PROFILE: '/user/profile'
    }
  }
} as const;

// Función helper para construir URLs completas
export const buildBackendUrl = (endpoint: string): string => {
  return `${API_CONFIG.BACKEND_BASE_URL}${endpoint}`;
};

// Función helper para crear headers con cookies automáticamente
export const createBackendHeaders = (authToken?: string, refreshToken?: string, body?: any) => {
  const headers: Record<string, string> = {
    // Solo agregar Content-Type si no es FormData
    ...(body instanceof FormData ? {} : API_CONFIG.COMMON_HEADERS)
  };

  // Si tenemos auth token, agregarlo al Authorization header
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  // Las cookies se envían automáticamente en el header Cookie
  const cookies: string[] = [];
  if (authToken) {
    cookies.push(`auth_token=${authToken}`);
  }
  if (refreshToken) {
    cookies.push(`rt=${refreshToken}`);
  }
  
  if (cookies.length > 0) {
    headers['Cookie'] = cookies.join('; ');
  }

  return headers;
};

// Función helper para limpiar cookies de respuesta (solo para Next.js API routes)
export const clearAuthCookies = (response: any) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 0,
    path: '/'
  };

  // En Next.js API routes, response.cookies.set está disponible
  response.cookies?.set('auth_token', '', cookieOptions);
  response.cookies?.set('rt', '', cookieOptions);
};

// Tipos para las respuestas del backend
export interface BackendResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Función helper para hacer fetch al backend con manejo de errores
export const fetchBackend = async <T = any>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    authToken?: string;
    refreshToken?: string;
  } = {}
): Promise<{
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}> => {
  const {
    method = 'GET',
    body,
    authToken,
    refreshToken
  } = options;

  try {
    const url = buildBackendUrl(endpoint);
    const headers = createBackendHeaders(authToken, refreshToken, body);
    const response = await fetch(url, {
      method,
      headers,
      ...(body && method !== 'GET' ? { 
        body: body instanceof FormData ? body : JSON.stringify(body)
      } : {})
    });

    const responseText = await response.text();

    let data: T | undefined;
    try {
      data = responseText ? JSON.parse(responseText) : undefined;
    } catch (parseError) {
      // Failed to parse JSON, using text response
    }

    return {
      ok: response.ok,
      status: response.status,
      data,
      error: !response.ok ? responseText || `HTTP ${response.status}` : undefined
    };

  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
};
