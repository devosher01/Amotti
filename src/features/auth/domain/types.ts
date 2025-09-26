export const AUTH_TYPES = {
  // Repositories
  AuthRepository: Symbol.for('AuthRepository'),
  
  // Use Cases
  LoginUseCase: Symbol.for('LoginUseCase'),
  LogoutUseCase: Symbol.for('LogoutUseCase'),
  GetCurrentUserUseCase: Symbol.for('GetCurrentUserUseCase'),
} as const;