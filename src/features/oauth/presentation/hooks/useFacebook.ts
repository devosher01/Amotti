'use client';

import { useState, useCallback, useMemo } from 'react';
import { FacebookAdapter, FacebookPage, FacebookUserInfo } from '../../infrastructure/adapters/FacebookAdapter';
import { AuthResult } from '../../domain/entities';

export interface UseFacebookReturn {
  isLoading: boolean;
  error: string | null;
  pages: FacebookPage[];
  userInfo: FacebookUserInfo | null;
  startOAuth: () => Promise<AuthResult>;
  loadPages: () => Promise<void>;
  connectPage: (pageId: string) => Promise<AuthResult>;
  clearError: () => void;
  reset: () => void;
}

export function useFacebook(): UseFacebookReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<FacebookPage[]>([]);
  const [userInfo, setUserInfo] = useState<FacebookUserInfo | null>(null);

  const adapter = useMemo(() => new FacebookAdapter(), []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setPages([]);
    setUserInfo(null);
  }, []);

  const loadPages = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await adapter.getPages();
      setPages(result.pages);
      setUserInfo(result.userInfo);
      console.log('🚀 [useFacebook] Páginas cargadas:', result.pages.length);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar páginas';
      setError(errorMessage);
      console.error('❌ [useFacebook] Error cargando páginas:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [adapter]);

  const startOAuth = useCallback(async (): Promise<AuthResult> => {
    console.log('🚀 [useFacebook] startOAuth called');
    setIsLoading(true);
    setError(null);

    try {
      console.log('🚀 [useFacebook] Getting auth URL...');
      const result = await adapter.getAuthUrl();
      console.log('🚀 [useFacebook] Auth URL result:', result);

      if (result.success && result.authUrl) {
        console.log('🚀 [useFacebook] Abriendo popup con URL:', result.authUrl);
        
        // Abrir popup inmediatamente y guardar referencia
        let popup: Window;
        try {
          popup = adapter.openAuthPopup(result.authUrl);
          console.log('✅ [useFacebook] Popup abierto correctamente');
        } catch (popupError) {
          console.error('❌ [useFacebook] Error al abrir popup:', popupError);
          setError(popupError instanceof Error ? popupError.message : 'Error al abrir popup de Facebook');
          return { 
            success: false, 
            error: popupError instanceof Error ? popupError.message : 'Error al abrir popup de Facebook'
          };
        }

        // Esperar el resultado del OAuth
        const oauthResult = await new Promise<AuthResult>((resolve) => {
          // Listener para mensajes del popup
          const messageListener = (event: MessageEvent) => {
            console.log('🚀 [useFacebook] Mensaje recibido:', event.data);
            
            if (event.data?.type === 'oauth_success' && event.data?.platform === 'facebook') {
              console.log('✅ [useFacebook] OAuth exitoso, cerrando popup');
              window.removeEventListener('message', messageListener);
              
              // Cerrar popup
              if (popup && !popup.closed) {
                popup.close();
                console.log('✅ [useFacebook] Popup cerrado');
              }
              
              resolve({ success: true, message: 'OAuth completado exitosamente' });
            } else if (event.data?.type === 'oauth_error' && event.data?.platform === 'facebook') {
              console.log('❌ [useFacebook] OAuth error, cerrando popup');
              window.removeEventListener('message', messageListener);
              
              // Cerrar popup
              if (popup && !popup.closed) {
                popup.close();
                console.log('✅ [useFacebook] Popup cerrado tras error');
              }
              
              resolve({ success: false, error: event.data.error || 'Error en OAuth' });
            }
          };

          window.addEventListener('message', messageListener);
          
          // También escuchar si el popup se cierra manualmente
          const checkClosed = setInterval(() => {
            if (popup.closed) {
              console.log('🚀 [useFacebook] Popup cerrado manualmente');
              clearInterval(checkClosed);
              window.removeEventListener('message', messageListener);
              resolve({ success: false, error: 'OAuth cancelado por el usuario' });
            }
          }, 1000);
        });

        if (oauthResult.success) {
          console.log('🚀 [useFacebook] OAuth completado, cargando páginas...');
          await loadPages();
        }

        return oauthResult;
      } else {
        setError(result.error || 'Error al iniciar OAuth de Facebook');
        return result;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [adapter, loadPages]);

  const connectPage = useCallback(async (pageId: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await adapter.connectPage(pageId);

      if (!result.success) {
        setError(result.error || 'Error al conectar página de Facebook');
      } else {
        console.log('🚀 [useFacebook] Página conectada exitosamente:', pageId);
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al conectar página';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [adapter]);

  return {
    isLoading,
    error,
    pages,
    userInfo,
    startOAuth,
    loadPages,
    connectPage,
    clearError,
    reset,
  };
}