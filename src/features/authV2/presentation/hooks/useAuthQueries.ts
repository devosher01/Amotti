"use client";
// Hooks de TanStack Query para autenticación
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpAuthAdapter } from '../../infrastructure/adapters/http-auth.adapter';
import { authQueryKeys } from '../../infrastructure/query-keys';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../../application/auth.service';
import type { LoginCredentials, RegisterData } from '../../domain/entities';

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: authQueryKeys.currentUser(),
    queryFn: () => getCurrentUser(httpAuthAdapter),
    retry: false,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      loginUser(httpAuthAdapter, credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(authQueryKeys.currentUser(), data.user);
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: RegisterData) =>
      registerUser(httpAuthAdapter, data),
    onSuccess: (data) => {
      queryClient.setQueryData(authQueryKeys.currentUser(), data.user);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => logoutUser(httpAuthAdapter),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authQueryKeys.all });
    },
  });
}