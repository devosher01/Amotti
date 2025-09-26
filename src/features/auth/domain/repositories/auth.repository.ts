import type { LoginCredentials, AuthResponse, User } from '../entities/user';

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
  refreshToken(): Promise<AuthResponse>;
}