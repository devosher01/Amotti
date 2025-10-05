import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from './useAuth';
import { loginSchema, type LoginFormData } from '../schemas/loginSchema';
import type { LoginError } from '../types/loginTypes';

interface UseLoginFormProps {
  onSuccess?: (credentials: { email: string; password: string }) => Promise<void>;
  onError?: (error: LoginError) => void;
}

export const useLoginForm = ({ onSuccess, onError }: UseLoginFormProps = {}) => {
  const { isLoading } = useLogin();
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'osjahego2004@gmail.com',
      password: 'Oscargomez1+',
      rememberDevice: true,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const credentials = {
        email: data.email.trim(),
        password: data.password,
      };
      
      await onSuccess?.(credentials);
      
    } catch (error: unknown) {
      const loginError = error as LoginError;
      onError?.(loginError);
      
      const isCredentialsError = loginError?.response?.status === 401 ||
        loginError?.message?.toLowerCase().includes('credencial') ||
        loginError?.message?.toLowerCase().includes('password') ||
        loginError?.message?.toLowerCase().includes('email');
      
      if (isCredentialsError) {
        form.setError('email', {
          message: 'Credenciales inválidas. Verifique su email y contraseña.'
        });
      } else {
        form.setError('root', {
          message: loginError?.message || 'Error del servidor'
        });
      }
    }
  });

  // Auto-submit cuando el componente se monta
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     handleSubmit();
  //   }, 500); // Espera 500ms para que los campos se llenen visualmente

  //   return () => clearTimeout(timer);
  // }, [handleSubmit]);

  return {
    ...form,
    handleSubmit,
    isLoading,
  };
};