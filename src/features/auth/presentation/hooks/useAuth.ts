"use client";
import { useState } from 'react';
import { authContainer } from '../../infrastructure/container';
import { AUTH_TYPES } from '../../domain/types';
import type { LoginUseCase } from '../../application/use-cases/login.use-case';
import type { LogoutUseCase } from '../../application/use-cases/logout.use-case';

export interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginState {
  isLoading: boolean;
  error: string | null;
}

export const useLogin = () => {
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    error: null,
  });

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setState({ isLoading: true, error: null });
    
    try {
      const loginUseCase = authContainer.get<LoginUseCase>(AUTH_TYPES.LoginUseCase);
      await loginUseCase.execute(credentials);
      
      console.log('✅ [Login] Login exitoso, cookies establecidas');
      
      // 🔧 Dar tiempo para que las cookies se establezcan y luego redirigir
      setTimeout(() => {
        console.log('🏠 [Login] Redirigiendo al dashboard...');
        window.location.replace('/');
      }, 200);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error en login';
      setState({ isLoading: false, error: errorMessage });
      throw error;
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return {
    login,
    clearError,
    ...state,
  };
};

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      const logoutUseCase = authContainer.get<LogoutUseCase>(AUTH_TYPES.LogoutUseCase);
      await logoutUseCase.execute();
      
      // El backend limpia las cookies
      // Redirigir al login
      window.location.replace('/login');
    } catch (error) {
      console.error('Error en logout:', error);
      // Incluso si falla, redirigir (el middleware se encargará)
      window.location.replace('/login');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout,
    isLoading,
  };
};
