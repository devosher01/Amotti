import { injectable, inject } from 'inversify';
import type { AuthRepository } from '../../domain/repositories/auth.repository';
import type { LoginCredentials, AuthResponse } from '../../domain';
import { AUTH_TYPES } from '../../domain/types';

@injectable()
export class LoginUseCase {
  constructor(
    @inject(AUTH_TYPES.AuthRepository) private authRepository: AuthRepository
  ) {}

  async execute(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.authRepository.login(credentials);
  }
}