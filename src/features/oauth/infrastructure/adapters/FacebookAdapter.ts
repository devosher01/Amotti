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
  facebookPageId?: string;
  id: string;
  name: string;
  category: string;
  profilePictureUrl: string;
  followersCount: number;
  verified?: boolean;
  hasInstagram?: boolean;
  pageAccessToken: string;
}

interface FacebookPagesApiResponse {
  success: boolean;
  pages: FacebookPageApiResponse[];
  userInfo: FacebookUserInfo;
  message?: string;
}

export class FacebookAdapter {

  async getAuthUrl(): Promise<AuthResult> {
    try {
      const data = await httpClient.get<AuthResult>('/facebook/auth-url');
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener URL de Facebook',
      };
    }
  }


  async getPages(): Promise<{ pages: FacebookPage[]; userInfo: FacebookUserInfo }> {
    try {
      const data = await httpClient.get<FacebookPagesApiResponse>('/facebook/pages');

      if (!data.success) {
        throw new Error(data.message || 'Error al obtener páginas de Facebook');
      }

      const pages: FacebookPage[] = data.pages.map((page: FacebookPageApiResponse) => ({
        id: page.facebookPageId || page.id,
        name: page.name,
        category: page.category,
        profilePictureUrl: page.profilePictureUrl,
        followersCount: page.followersCount,
        verified: page.verified || false,
        hasInstagram: page.hasInstagram || false,
        pageAccessToken: page.pageAccessToken,
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
      const data = await httpClient.post<AuthResult>('/facebook/connect', {
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

  async openAuthPopup(url: string): Promise<void> {
    const width = 600;
    const height = 700;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    const popup = window.open(
      url,
      'facebook_oauth',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );

    if (!popup) {
      throw new Error('No se pudo abrir la ventana popup para Facebook. Verifica que no esté bloqueada por el navegador.');
    }
  }
}