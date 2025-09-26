/**
 * Hook: Instagram - Clean Architecture
 * Hook específico para manejo de Instagram OAuth y cuentas
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import { InstagramAdapter, InstagramAccount, InstagramPageInfo } from '../../infrastructure/adapters/InstagramAdapter';
import { AuthResult } from '../../domain/entities';

export interface UseInstagramReturn {
  // State
  isLoading: boolean;
  error: string | null;
  accounts: InstagramAccount[];
  pageInfo: InstagramPageInfo | null;

  // Actions
  getAccountsFromFacebook: (facebookPageId: string) => Promise<void>;
  connectViaFacebook: (facebookPageId: string, instagramAccountId: string) => Promise<AuthResult>;
  connectDirect: () => Promise<AuthResult>;
  
  // Utils
  clearError: () => void;
  reset: () => void;
}

export function useInstagram(): UseInstagramReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<InstagramAccount[]>([]);
  const [pageInfo, setPageInfo] = useState<InstagramPageInfo | null>(null);
  
  // Memoized adapter instance - Clean DI
  const adapter = useMemo(() => new InstagramAdapter(), []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setAccounts([]);
    setPageInfo(null);
  }, []);

  const getAccountsFromFacebook = useCallback(async (facebookPageId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await adapter.getAccountsFromFacebook(facebookPageId);
      setAccounts(result.accounts);
      setPageInfo(result.pageInfo);
      console.log('🚀 [useInstagram] Cuentas obtenidas:', result.accounts.length);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener cuentas de Instagram';
      setError(errorMessage);
      console.error('❌ [useInstagram] Error obteniendo cuentas:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [adapter]);

  const connectViaFacebook = useCallback(async (
    facebookPageId: string, 
    instagramAccountId: string
  ): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await adapter.connectViaFacebook(facebookPageId, instagramAccountId);
      
      if (!result.success) {
        setError(result.error || 'Error al conectar Instagram via Facebook');
      } else {
        console.log('🚀 [useInstagram] Instagram conectado exitosamente via Facebook');
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al conectar Instagram';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [adapter]);

  const connectDirect = useCallback(async (): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await adapter.connectDirect();
      
      if (!result.success) {
        setError(result.error || 'Error al conectar Instagram directamente');
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al conectar Instagram';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [adapter]);

  return {
    // State
    isLoading,
    error,
    accounts,
    pageInfo,

    // Actions 
    getAccountsFromFacebook,
    connectViaFacebook,
    connectDirect,

    // Utils
    clearError,
    reset,
  };
}