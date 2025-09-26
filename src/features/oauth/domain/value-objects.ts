// Value objects - 100% agnostic domain logic

import { ConnectionStatus } from './entities';

export const CONNECTION_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  ERROR: 'error',
} as const;

export function isConnectionExpired(connection: { status: ConnectionStatus }): boolean {
  return connection.status === CONNECTION_STATUS.EXPIRED;
}

export function isConnectionActive(connection: { status: ConnectionStatus }): boolean {
  return connection.status === CONNECTION_STATUS.ACTIVE;
}

export function needsRefresh(connection: { status: ConnectionStatus }): boolean {
  return connection.status === CONNECTION_STATUS.EXPIRED || connection.status === CONNECTION_STATUS.ERROR;
}

export function createPopupConfig(width: number = 600, height: number = 600) {
  return {
    width,
    height,
    left: (window.screen.width - width) / 2,
    top: (window.screen.height - height) / 2,
    resizable: 'yes',
    scrollbars: 'yes',
    status: 'yes',
  };
}

export function formatPopupFeatures(config: Record<string, string | number>): string {
  return Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join(',');
}

export function validateAuthSession(session: { sessionId: string; state: string }): boolean {
  return Boolean(session.sessionId && session.state);
}

export function isValidConnection(connection: { id: string; status: ConnectionStatus }): boolean {
  return Boolean(connection.id && isConnectionActive(connection));
}
