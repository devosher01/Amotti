// Adaptador HTTP que implementa el puerto de autenticación
import { httpClient } from '@/lib/http-client';
import type { AuthPort } from '../../domain/ports';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../../domain/entities';

export const httpAuthAdapter: AuthPort = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return httpClient.post('/auth/login', credentials);
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    return httpClient.post('/auth/register', data);
  },

  async logout(): Promise<void> {
    return httpClient.post('/auth/logout');
  },

  async getCurrentUser(): Promise<User> {
    return httpClient.get('/auth/me');
  },

  async refreshToken(): Promise<AuthResponse> {
    return httpClient.post('/auth/refresh');
  },
};