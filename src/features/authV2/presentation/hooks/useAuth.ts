"use client";
import { useCurrentUserQuery, useLoginMutation, useLogoutMutation, useRegisterMutation } from './useAuthQueries';
import type { LoginCredentials, RegisterData } from '../../domain/entities';

export function useAuth() {
  const { data: user, isLoading, error } = useCurrentUserQuery();
  
  
  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
  };
}

export function useLogin() {
  const loginMutation = useLoginMutation();
  
  const login = async (credentials: LoginCredentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      window.location.replace('/');
      
    } catch (error) {
      console.error('❌ [Login] Error:', error);
      throw error;
    }
  };

  return {
    login,
    isLoading: loginMutation.isPending,
    error: loginMutation.error?.message || null,
    clearError: loginMutation.reset,
  };
}

export function useRegister() {
  const registerMutation = useRegisterMutation();
  
  const register = async (data: RegisterData) => {
    try {
      await registerMutation.mutateAsync(data);
    } catch (error) {
      throw error;
    }
  };

  return {
    register,
    isLoading: registerMutation.isPending,
    error: registerMutation.error?.message || null,
    clearError: registerMutation.reset,
  };
}

export function useLogout() {
  const logoutMutation = useLogoutMutation();
  
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      
      
      window.location.replace('/login');
    } catch (error) {
      window.location.replace('/login');
    }
  };

  return {
    logout,
    isLoading: logoutMutation.isPending,
  };
}