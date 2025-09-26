import type { AuthPort } from '../domain/ports';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../domain/entities';

export async function loginUser(
  authPort: AuthPort,
  credentials: LoginCredentials
): Promise<AuthResponse> {
  return authPort.login(credentials);
}

export async function registerUser(
  authPort: AuthPort,
  data: RegisterData
): Promise<AuthResponse> {
  return authPort.register(data);
}

export async function logoutUser(authPort: AuthPort): Promise<void> {
  return authPort.logout();
}

export async function getCurrentUser(authPort: AuthPort): Promise<User> {
  return authPort.getCurrentUser();
}

export async function refreshUserToken(authPort: AuthPort): Promise<AuthResponse> {
  return authPort.refreshToken();
}