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
    const result = await httpClient.get('/auth/me') as any;

    const user: User = {
      userId: result.id,
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      role: result.role,
      emailVerified: result.emailVerified,
      profilePicture: result.image,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    return user;
  },

  async refreshToken(): Promise<AuthResponse> {
    return httpClient.post('/auth/refresh');
  },
};