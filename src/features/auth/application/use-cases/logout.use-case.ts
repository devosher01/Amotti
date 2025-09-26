import { injectable, inject } from 'inversify';
import type { AuthRepository } from '../../domain/repositories/auth.repository';
import { AUTH_TYPES } from '../../domain/types';

@injectable()
export class LogoutUseCase {
  constructor(
    @inject(AUTH_TYPES.AuthRepository) private authRepository: AuthRepository
  ) {}

  async execute(): Promise<void> {
    return this.authRepository.logout();
  }
}