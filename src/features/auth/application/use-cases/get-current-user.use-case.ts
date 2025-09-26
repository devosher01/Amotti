import { injectable, inject } from 'inversify';
import type { AuthRepository } from '../../domain/repositories/auth.repository';
import type { User } from '../../domain';
import { AUTH_TYPES } from '../../domain/types';

@injectable()
export class GetCurrentUserUseCase {
  constructor(
    @inject(AUTH_TYPES.AuthRepository) private authRepository: AuthRepository
  ) {}

  async execute(): Promise<User> {
    return this.authRepository.getCurrentUser();
  }
}