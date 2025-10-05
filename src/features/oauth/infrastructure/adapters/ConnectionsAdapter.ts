
import { httpClient } from '@/lib/http-client';
import { PlatformConnection, DisconnectionResult, ConnectionId, ConnectionsApiResponse } from '../../domain/entities';

export class ConnectionsAdapter {
  // Main method that returns the full API response structure
  async getConnections(): Promise<ConnectionsApiResponse> {
    try {
      const result = await httpClient.get<ConnectionsApiResponse>('/connections');
      return result;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error al cargar conexiones');
    }
  }

  // Helper method if you need a flat array of connections
  async getConnectionsFlat(): Promise<PlatformConnection[]> {
    try {
      const result = await this.getConnections();
      
      // Transform the grouped response into a flat array
      const connections: PlatformConnection[] = [
        ...result.facebook || [],
        ...result.instagram || []
      ];
      
      return connections;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error al cargar conexiones');
    }
  }

  async deleteConnection(connectionId: ConnectionId): Promise<DisconnectionResult> {
    try {
      const result = await httpClient.delete<DisconnectionResult>(`/connections/${connectionId}`);
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