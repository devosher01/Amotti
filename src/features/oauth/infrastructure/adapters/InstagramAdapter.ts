
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
  profilePictureUrl: string;
  followersCount: number;
}

interface InstagramAccountsApiResponse {
  success: boolean;
  instagramAccounts: InstagramAccountApiResponse[];
  pageInfo: InstagramPageInfo;
  message?: string;
}

export class InstagramAdapter {
  async getAccountsFromFacebook(facebookPageId: string): Promise<{ accounts: InstagramAccount[]; pageInfo: InstagramPageInfo }> {
    try {
      const data = await httpClient.get<InstagramAccountsApiResponse>(`/facebook/instagram-accounts?facebookPageId=${facebookPageId}`);
      
      if (!data.success) {
        throw new Error(data.message || 'Error al obtener cuentas de Instagram');
      }

      const accounts: InstagramAccount[] = data.instagramAccounts.map((account: InstagramAccountApiResponse) => ({
        id: account.id,
        username: account.username,
        name: account.name,
        profilePictureUrl: account.profilePictureUrl,
        followersCount: account.followersCount,
      }));

      return {
        accounts,
        pageInfo: data.pageInfo,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error al obtener cuentas de Instagram');
    }
  }

  async connectViaFacebook(facebookPageId: string, instagramAccountId: string): Promise<AuthResult> {
    try {
      const data = await httpClient.post<AuthResult>('/instagram/connect-via-facebook', {
        facebookPageId,
        instagramAccountId,
      });
      return data;
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