import { 
  SocialPlatform, 
  TimeRange, 
  MetricType, 
  PostType, 
  GrowthTrend,
  PlatformMetrics,
  PostAnalytics,
  AudienceInsight,
  CompetitorAnalysis,
  HashtagPerformance,
  SocialAnalyticsSummary
} from '../entities/SocialAnalytics';

// Request DTOs
export interface GetAnalyticsQueryDto {
  platforms?: SocialPlatform[];
  timeRange: TimeRange;
  startDate?: string; // ISO date string for custom range
  endDate?: string; // ISO date string for custom range
  metrics?: MetricType[];
  includeCompetitors?: boolean;
  includeHashtags?: boolean;
  includeAudience?: boolean;
}

export interface GetPostAnalyticsQueryDto {
  platform?: SocialPlatform;
  timeRange: TimeRange;
  startDate?: string;
  endDate?: string;
  postTypes?: PostType[];
  sortBy?: 'engagement' | 'reach' | 'likes' | 'comments' | 'publishedAt';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface GetAudienceInsightsQueryDto {
  platform: SocialPlatform;
  timeRange: TimeRange;
  startDate?: string;
  endDate?: string;
  includeInterests?: boolean;
  includeActiveHours?: boolean;
}

export interface AddCompetitorRequestDto {
  platform: SocialPlatform;
  username: string;
  name?: string;
}

export interface UpdateCompetitorRequestDto {
  id: string;
  name?: string;
  isActive?: boolean;
}

export interface GetHashtagAnalyticsQueryDto {
  platform?: SocialPlatform;
  hashtags?: string[];
  timeRange: TimeRange;
  startDate?: string;
  endDate?: string;
  minUsage?: number;
  sortBy?: 'usage' | 'reach' | 'engagement' | 'trend';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}

export interface ExportAnalyticsRequestDto {
  platforms: SocialPlatform[];
  timeRange: TimeRange;
  startDate?: string;
  endDate?: string;
  format: 'pdf' | 'excel' | 'csv';
  includeCharts?: boolean;
  includeComparison?: boolean;
  email?: string; // Para envío por email
}

export interface ConnectSocialAccountRequestDto {
  platform: SocialPlatform;
  accessToken: string;
  accountId?: string;
  accountName?: string;
}

export interface DisconnectSocialAccountRequestDto {
  platform: SocialPlatform;
  accountId?: string;
}

// Response DTOs
export interface PlatformMetricsResponseDto extends PlatformMetrics {
  // Hereda todas las propiedades de PlatformMetrics
  accountInfo?: {
    accountId: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
    verified: boolean;
  };
}

export interface PostAnalyticsResponseDto extends PostAnalytics {
  // Hereda todas las propiedades de PostAnalytics
  url?: string;
  isPromoted?: boolean;
  campaignId?: string;
}

export interface AudienceInsightsResponseDto extends AudienceInsight {
  // Hereda todas las propiedades de AudienceInsight
  growthRate?: number;
  topInterests?: string[];
  peakActivity?: {
    hour: number;
    day: string;
    percentage: number;
  };
}

export interface CompetitorAnalysisResponseDto extends CompetitorAnalysis {
  // Hereda todas las propiedades de CompetitorAnalysis
  isActive: boolean;
  competitorRank?: number;
  lastAnalyzed: string;
}

export interface HashtagPerformanceResponseDto extends HashtagPerformance {
  // Hereda todas las propiedades de HashtagPerformance
  relatedHashtags?: string[];
  recommendedUsage?: string;
  seasonality?: {
    peak: string;
    low: string;
  };
}

export interface AnalyticsSummaryResponseDto extends SocialAnalyticsSummary {
  // Hereda todas las propiedades de SocialAnalyticsSummary
  insights: {
    bestPostingTimes: {
      platform: SocialPlatform;
      time: string;
      day: string;
    }[];
    topHashtags: string[];
    audienceGrowthTrend: GrowthTrend;
    recommendations: string[];
  };
  comparisons: {
    previousPeriod: {
      followers: number;
      engagement: number;
      reach: number;
      growthRate: number;
    };
    industry: {
      avgEngagementRate: number;
      avgFollowers: number;
      position: 'above' | 'below' | 'average';
    };
  };
}

export interface GetAnalyticsResponseDto {
  summary: AnalyticsSummaryResponseDto;
  platforms: PlatformMetricsResponseDto[];
  topPosts: PostAnalyticsResponseDto[];
  audience?: AudienceInsightsResponseDto[];
  competitors?: CompetitorAnalysisResponseDto[];
  hashtags?: HashtagPerformanceResponseDto[];
  dateRange: {
    startDate: string;
    endDate: string;
    duration: number;
  };
  lastUpdated: string;
}

export interface GetPostsAnalyticsResponseDto {
  posts: PostAnalyticsResponseDto[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  summary: {
    totalPosts: number;
    totalEngagement: number;
    avgEngagementRate: number;
    topPerformingPost: PostAnalyticsResponseDto;
  };
}

export interface ConnectedAccountsResponseDto {
  platforms: {
    platform: SocialPlatform;
    isConnected: boolean;
    accounts: {
      id: string;
      username: string;
      displayName: string;
      avatarUrl?: string;
      followers: number;
      verified: boolean;
      connectedAt: string;
      lastSync: string;
    }[];
  }[];
}

export interface ExportAnalyticsResponseDto {
  downloadUrl: string;
  filename: string;
  format: 'pdf' | 'excel' | 'csv';
  size: number;
  expiresAt: string;
  emailSent?: boolean;
}

// Error Response DTOs
export interface AnalyticsErrorResponseDto {
  error: string;
  message: string;
  platform?: SocialPlatform;
  code: string;
  details?: {
    missingPermissions?: string[];
    rateLimitReset?: string;
    quotaExceeded?: boolean;
  };
}

// Analytics Actions DTOs
export interface RefreshAnalyticsDto {
  platforms?: SocialPlatform[];
  forceRefresh?: boolean;
}

export interface ScheduleReportDto {
  name: string;
  platforms: SocialPlatform[];
  frequency: 'daily' | 'weekly' | 'monthly';
  format: 'pdf' | 'excel';
  recipients: string[];
  includeComparison?: boolean;
  customMetrics?: MetricType[];
}

export interface SaveCustomDashboardDto {
  name: string;
  widgets: {
    type: 'metric' | 'chart' | 'table' | 'map';
    position: { x: number; y: number; w: number; h: number };
    config: Record<string, any>;
  }[];
  isDefault?: boolean;
}

// Validation DTOs
export interface ValidateHashtagsDto {
  hashtags: string[];
  platform?: SocialPlatform;
}

export interface ValidateHashtagsResponseDto {
  valid: {
    hashtag: string;
    popularity: 'low' | 'medium' | 'high';
    difficulty: 'easy' | 'medium' | 'hard';
    relatedTags: string[];
  }[];
  invalid: {
    hashtag: string;
    reason: string;
  }[];
}

// Real-time Updates DTOs
export interface AnalyticsUpdateDto {
  platform: SocialPlatform;
  type: 'metric_update' | 'new_post' | 'audience_change';
  data: Record<string, any>;
  timestamp: string;
} 