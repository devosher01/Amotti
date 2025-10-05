import { httpClient } from '@/lib/http-client';
import { AuthResult } from '../../domain/entities';

export interface FacebookPage {
  id: string;
  name: string;
  category: string;
  profilePictureUrl: string;
  followersCount: number;
  verified: boolean;
  hasInstagram: boolean;
  pageAccessToken: string;
}

export interface FacebookUserInfo {
  id: string;
  name: string;
  email: string;
}

interface FacebookPageApiResponse {
  id: string;
  name: string;
  category: string;
}

interface FacebookPagesApiResponse {
  success: boolean;
  pages: FacebookPageApiResponse[];
  userInfo: FacebookUserInfo;
}

export class FacebookAdapter {

  async getAuthUrl(): Promise<AuthResult> {
    try {
      const data = await httpClient.get<any>('/oauth/facebook/auth-url');
      console.log('🚀 [FacebookAdapter] Raw API response:', data);

      // If the response has authUrl, it's successful
      if (data.authUrl) {
        return {
          success: true,
          authUrl: data.authUrl,
          state: data.state
        };
      }

      // If it has success property, use it as is
      if (typeof data.success === 'boolean') {
        return data;
      }

      // Otherwise it's an error
      return {
        success: false,
        error: 'Respuesta inválida del servidor',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener URL de Facebook',
      };
    }
  }


  async getPages(): Promise<{ pages: FacebookPage[]; userInfo: FacebookUserInfo }> {
    try {
      const data = await httpClient.get<FacebookPagesApiResponse>('/oauth/facebook/pages');

      const pages: FacebookPage[] = data.pages.map((page: FacebookPageApiResponse) => ({
        id: page.id,
        name: page.name,
        category: page.category,
        profilePictureUrl: `https://graph.facebook.com/${page.id}/picture?type=large`,
        followersCount: 0,
        verified: false,
        hasInstagram: false,
        pageAccessToken: '',
      }));

      return {
        pages,
        userInfo: data.userInfo,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error al obtener páginas de Facebook');
    }
  }

  async connectPage(pageId: string): Promise<AuthResult> {
    try {
      const data = await httpClient.post<AuthResult>('/oauth/facebook/connect', {
        selectedPageId: pageId,
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al conectar página de Facebook',
      };
    }
  }

  openAuthPopup(url: string): Window {
    console.log('🚀 [FacebookAdapter] openAuthPopup called with URL:', url);

    const width = 600;
    const height = 700;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    console.log('🚀 [FacebookAdapter] Opening popup with params:', { width, height, left, top });

    const popup = window.open(
      url,
      'facebook_oauth',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );

    console.log('🚀 [FacebookAdapter] Popup object:', popup);

    if (!popup) {
      console.error('❌ [FacebookAdapter] Popup was null');
      throw new Error('No se pudo abrir la ventana popup para Facebook. Verifica que no esté bloqueada por el navegador.');
    } else {
      console.log('✅ [FacebookAdapter] Popup opened successfully');
    }

    return popup;
  }
}