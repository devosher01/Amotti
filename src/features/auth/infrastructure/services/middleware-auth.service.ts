
const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000'
  : (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000');

interface RefreshTokenResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}

export class MiddlewareAuthService {
  static async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        method: 'GET',
        headers: {
          'Cookie': `auth_token=${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  static async refreshTokens(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const response = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `rt=${refreshToken}`,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`Refresh failed: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      };
    } catch (error) {
      return { success: false };
    }
  }

  static shouldRefreshToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;
      
      return timeUntilExpiration < 5 * 60 * 1000;
    } catch (error) {
      return false;
    }
  }

  static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const currentTime = Date.now();
      
      return currentTime >= expirationTime;
    } catch (error) {
      return true;
    }
  }

  static getTokenInfo(token: string): { userId?: string; email?: string; exp?: number } | null {
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
}