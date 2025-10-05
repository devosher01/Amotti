import { Platform, TimeRange } from './types';

// Endpoints relativos (sin base URL ya que httpClient ya tiene /api)
export const endpoints = {
  // General endpoints
  metrics: (platform: Platform, days: TimeRange) => 
    `/metrics?platform=${platform}&days=${days}`,
  
  posts: (platform: Platform, limit: number) => 
    `/posts?platform=${platform}&limit=${limit}`,
  
  // Platform-specific endpoints
  facebook: {
    metrics: (days: TimeRange) => `/facebook/metrics?days=${days}`,
    posts: (limit: number) => `/facebook/posts?limit=${limit}`,
  },
  
  instagram: {
    metrics: (days: TimeRange) => `/instagram/metrics?days=${days}`,
    posts: (limit: number) => `/instagram/posts?limit=${limit}`,
  },
} as const;