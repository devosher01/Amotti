import { injectable } from 'inversify';
import type { AuthRepository } from '../../domain/repositories/auth.repository';
import type { LoginCredentials, AuthResponse, User } from '../../domain';
import { httpClient } from '@/lib/http-client';

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return httpClient.post<AuthResponse>('/auth/login', credentials);
  }

  async logout(): Promise<void> {
    return httpClient.post<void>('/auth/logout');
  }

  async getCurrentUser(): Promise<User> {
    return httpClient.get<User>('/auth/me');
  }

  async refreshToken(): Promise<AuthResponse> {
    return httpClient.post<AuthResponse>('/auth/refresh');
  }
}