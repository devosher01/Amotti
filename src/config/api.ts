const BASE_URL = '/api';

export const API_CONFIG = {
  BASE_URL,
  TIMEOUT: 60000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
} as const;

export const getApiUrl = (endpoint: string): string => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_CONFIG.BASE_URL}${path}`;
};