import type { LoginCredentials, RegisterData, AuthResponse, User } from './entities';

export interface AuthPort {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(data: RegisterData): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
  refreshToken(): Promise<AuthResponse>;
}