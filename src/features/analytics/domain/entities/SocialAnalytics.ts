// Enums para tipos de datos de analíticas
export enum SocialPlatform {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  YOUTUBE = 'youtube',
  TIKTOK = 'tiktok',
}

export enum MetricType {
  FOLLOWERS = 'followers',
  LIKES = 'likes',
  COMMENTS = 'comments',
  SHARES = 'shares',
  REACH = 'reach',
  IMPRESSIONS = 'impressions',
  ENGAGEMENT_RATE = 'engagement_rate',
  CLICKS = 'clicks',
  SAVES = 'saves',
  VIEWS = 'views',
}

export enum TimeRange {
  LAST_7_DAYS = '7d',
  LAST_30_DAYS = '30d',
  LAST_90_DAYS = '90d',
  LAST_YEAR = '1y',
  CUSTOM = 'custom',
}

export enum PostType {
  IMAGE = 'image',
  VIDEO = 'video',
  CAROUSEL = 'carousel',
  STORY = 'story',
  REEL = 'reel',
  LIVE = 'live',
  TEXT = 'text',
}

export enum GrowthTrend {
  INCREASING = 'increasing',
  DECREASING = 'decreasing',
  STABLE = 'stable',
}

// Interfaces para métricas de redes sociales
export interface SocialMetric {
  type: MetricType;
  current: number;
  previous: number;
  growth: number;
  growthPercentage: number;
  trend: GrowthTrend;
}

export interface PlatformMetrics {
  platform: SocialPlatform;
  isConnected: boolean;
  lastUpdated: string;
  metrics: {
    followers: SocialMetric;
    engagement: SocialMetric;
    reach: SocialMetric;
    impressions: SocialMetric;
    posts: SocialMetric;
  };
  topContent: PostAnalytics[];
}

export interface PostAnalytics {
  id: string;
  platform: SocialPlatform;
  type: PostType;
  title: string;
  content: string;
  publishedAt: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    clicks: number;
    saves: number;
    reach: number;
    impressions: number;
    engagementRate: number;
  };
  hashtags: string[];
  mentions: string[];
}

export interface AudienceInsight {
  platform: SocialPlatform;
  demographics: {
    ageGroups: {
      range: string;
      percentage: number;
      count: number;
    }[];
    genders: {
      type: 'male' | 'female' | 'other';
      percentage: number;
      count: number;
    }[];
    locations: {
      country: string;
      city?: string;
      percentage: number;
      count: number;
    }[];
    languages: {
      code: string;
      name: string;
      percentage: number;
      count: number;
    }[];
  };
  interests: {
    category: string;
    percentage: number;
    count: number;
  }[];
  activeHours: {
    hour: number;
    day: string;
    activity: number;
  }[];
}

export interface CompetitorAnalysis {
  id: string;
  name: string;
  username: string;
  platform: SocialPlatform;
  avatarUrl?: string;
  metrics: {
    followers: number;
    following: number;
    posts: number;
    engagementRate: number;
    avgLikes: number;
    avgComments: number;
  };
  growth: {
    followersGrowth: number;
    engagementGrowth: number;
  };
  topHashtags: string[];
  lastUpdated: string;
}

export interface HashtagPerformance {
  hashtag: string;
  platform: SocialPlatform;
  usage: number;
  reach: number;
  impressions: number;
  engagementRate: number;
  trend: GrowthTrend;
  posts: PostAnalytics[];
}

export interface SocialAnalyticsSummary {
  totalFollowers: number;
  totalEngagement: number;
  totalReach: number;
  totalPosts: number;
  avgEngagementRate: number;
  bestPerformingPlatform: SocialPlatform;
  worstPerformingPlatform: SocialPlatform;
  overallGrowth: number;
  lastUpdated: string;
}

// Value Objects
export class DateRange {
  constructor(
    public readonly startDate: Date,
    public readonly endDate: Date
  ) {
    if (startDate > endDate) {
      throw new Error('Start date cannot be after end date');
    }
  }

  static fromTimeRange(range: TimeRange): DateRange {
    const endDate = new Date();
    let startDate: Date;

    switch (range) {
      case TimeRange.LAST_7_DAYS:
        startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case TimeRange.LAST_30_DAYS:
        startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case TimeRange.LAST_90_DAYS:
        startDate = new Date(endDate.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case TimeRange.LAST_YEAR:
        startDate = new Date(endDate.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        throw new Error('Invalid time range for automatic date calculation');
    }

    return new DateRange(startDate, endDate);
  }

  getDurationInDays(): number {
    return Math.ceil((this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  contains(date: Date): boolean {
    return date >= this.startDate && date <= this.endDate;
  }

  toString(): string {
    return `${this.startDate.toISOString().split('T')[0]} to ${this.endDate.toISOString().split('T')[0]}`;
  }
}

export class EngagementRate {
  constructor(private readonly value: number) {
    if (value < 0 || value > 100) {
      throw new Error('Engagement rate must be between 0 and 100');
    }
  }

  get percentage(): number {
    return this.value;
  }

  get decimal(): number {
    return this.value / 100;
  }

  get formatted(): string {
    return `${this.value.toFixed(2)}%`;
  }

  isGood(): boolean {
    return this.value >= 3;
  }

  isExcellent(): boolean {
    return this.value >= 6;
  }

  static calculate(engagement: number, reach: number): EngagementRate {
    if (reach === 0) return new EngagementRate(0);
    return new EngagementRate((engagement / reach) * 100);
  }
} 