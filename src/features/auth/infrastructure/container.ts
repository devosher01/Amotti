import 'reflect-metadata';
import { Container } from 'inversify';
import { AUTH_TYPES } from '../domain/types';

// Domain interfaces
import type { AuthRepository } from '../domain/repositories/auth.repository';

// Infrastructure implementations  
import { AuthRepositoryImpl } from './repositories/auth.repository.impl';

// Application use cases
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { LogoutUseCase } from '../application/use-cases/logout.use-case';
import { GetCurrentUserUseCase } from '../application/use-cases/get-current-user.use-case';

const authContainer = new Container();

// Bind repositories (interfaces -> implementations)
authContainer.bind<AuthRepository>(AUTH_TYPES.AuthRepository).to(AuthRepositoryImpl);

// Bind use cases
authContainer.bind<LoginUseCase>(AUTH_TYPES.LoginUseCase).to(LoginUseCase);
authContainer.bind<LogoutUseCase>(AUTH_TYPES.LogoutUseCase).to(LogoutUseCase);  
authContainer.bind<GetCurrentUserUseCase>(AUTH_TYPES.GetCurrentUserUseCase).to(GetCurrentUserUseCase);

export { authContainer };