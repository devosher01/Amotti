/**
 * Analytics Presentation Hooks - Export Index
 * Clean Architecture: Presentation Layer Hooks
 */

// Core hooks
export { useAnalytics } from './useAnalytics';
export { useInstagramAnalytics } from './useInstagramAnalytics';

// Query hooks
export { 
  useFacebookAnalyticsQuery, 
  useFacebookPostsQuery, 
  useInstagramAnalyticsQuery,
  useInstagramPostsQuery,
  useRefreshAnalytics,
  analyticsQueryKeys 
} from './queries/useAnalyticsQuery';

// Types
export type { UseAnalyticsReturn } from './useAnalytics';
export type { UseInstagramAnalyticsReturn } from './useInstagramAnalytics';
