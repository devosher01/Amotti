
import { httpClient } from '@/lib/http-client';
import { AuthResult } from '../../domain/entities';

export interface InstagramAccount {
  id: string;
  username: string;
  name: string;
  profilePictureUrl: string;
  followersCount: number;
}

export interface InstagramPageInfo {
  id: string;
  name: string;
}

interface InstagramAccountApiResponse {
  id: string;
  username: string;
  name: string;
  profile_picture_url: string;
}

export class InstagramAdapter {
  async getAccountsFromFacebook(facebookPageId: string): Promise<{ accounts: InstagramAccount[]; pageInfo: InstagramPageInfo }> {
    try {
      const data = await httpClient.get<InstagramAccountApiResponse[]>(`/oauth/facebook/instagram-accounts?facebookPageId=${facebookPageId}`);
      
      console.log('🔍 Instagram API Response:', data);

      const accounts: InstagramAccount[] = data.map((account: InstagramAccountApiResponse) => ({
        id: account.id,
        username: account.username,
        name: account.name,
        profilePictureUrl: account.profile_picture_url,
        followersCount: 0, // API no retorna followers count
      }));

      return {
        accounts,
        pageInfo: {
          id: '',
          name: 'Facebook Page'
        },
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error al obtener cuentas de Instagram');
    }
  }

  async connectViaFacebook(facebookPageId: string, instagramAccountId: string): Promise<AuthResult> {
    try {
      const data = await httpClient.post<{ success: boolean; message: string }>('/oauth/instagram/connect', {
        facebookPageId,
        instagramAccountId,
      });
      
      return {
        success: data.success,
        message: data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al conectar Instagram',
      };
    }
  }

  async connectDirect(): Promise<AuthResult> {
    return {
      success: false,
      error: 'La conexión directa de Instagram estará disponible próximamente',
    };
  }

  async getAuthUrl(): Promise<AuthResult> {
    return {
      success: false,
      error: 'La autorización directa de Instagram estará disponible próximamente',
    };
  }
}