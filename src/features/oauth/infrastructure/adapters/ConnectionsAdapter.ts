
import { httpClient } from '@/lib/http-client';
import { PlatformConnection, DisconnectionResult, ConnectionId } from '../../domain/entities';

interface ConnectionsApiResponse {
  success: boolean;
  data: { connections: PlatformConnection[] };
}

export class ConnectionsAdapter {
  async getConnections(): Promise<PlatformConnection[]> {
    try {
      const result = await httpClient.get<ConnectionsApiResponse>('/social-connections');
      return result.data?.connections || [];
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error al cargar conexiones');
    }
  }

  async deleteConnection(connectionId: ConnectionId): Promise<DisconnectionResult> {
    try {
      const result = await httpClient.delete<DisconnectionResult>(`/social-connections/${connectionId}`);
      return result;
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al eliminar conexión',
        data: { disconnectedPlatform: '', automaticallyDisconnected: [], disconnectedConnectionIds: [] },
      };
    }
  }

}