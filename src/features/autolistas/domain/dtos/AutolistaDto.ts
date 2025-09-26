// 🎯 AUTOLISTAS - DTOs

import { AutolistaStatus, SocialPlatform, ScheduleType, PostStatus, ContentType } from '../entities/Autolista';

// ==============================
// Request DTOs
// ==============================

export interface CreateAutolistaRequestDto {
  name: string;
  description?: string;
  isCircular: boolean;
  useUrlShortener: boolean;
  platforms: SocialPlatform[];
  schedule: {
    type: ScheduleType;
    times: string[];
    days?: number[];
    timezone: string;
  };
}

export interface UpdateAutolistaRequestDto {
  id: string;
  name?: string;
  description?: string;
  status?: AutolistaStatus;
  isCircular?: boolean;
  useUrlShortener?: boolean;
  platforms?: SocialPlatform[];
  schedule?: {
    type: ScheduleType;
    times: string[];
    days?: number[];
    timezone: string;
  };
}

export interface CreatePostRequestDto {
  autolistaId: string;
  content: string;
  media?: {
    type: ContentType;
    url: string;
    thumbnail?: string;
    alt?: string;
    duration?: number;
  }[];
  platforms?: SocialPlatform[]; // Si no se especifica, usa las de la autolista
  hashtags?: string[];
  mentions?: string[];
  position?: number; // Si no se especifica, se agrega al final
}

export interface UpdatePostRequestDto {
  id: string;
  content?: string;
  media?: {
    type: ContentType;
    url: string;
    thumbnail?: string;
    alt?: string;
    duration?: number;
  }[];
  platforms?: SocialPlatform[];
  status?: PostStatus;
  hashtags?: string[];
  mentions?: string[];
  position?: number;
  isActive?: boolean;
}

export interface BulkCreatePostsRequestDto {
  autolistaId: string;
  posts: {
    content: string;
    media?: {
      type: ContentType;
      url: string;
      thumbnail?: string;
      alt?: string;
    }[];
    hashtags?: string[];
    mentions?: string[];
  }[];
}

export interface ReorderPostsRequestDto {
  autolistaId: string;
  postIds: string[]; // Array ordenado de IDs
}

export interface ImportFromCSVRequestDto {
  autolistaId: string;
  csvData: string;
  separator?: string; // Por defecto ','
  hasHeader?: boolean; // Por defecto true
}

export interface ImportFromRSSRequestDto {
  autolistaId: string;
  rssUrl: string;
  prefix?: string;
  suffix?: string;
  includeOldPosts?: boolean;
  addDisabled?: boolean;
  addToBeginning?: boolean;
}

// ==============================
// Response DTOs
// ==============================

export interface AutolistaResponseDto {
  id: string;
  name: string;
  description?: string;
  status: AutolistaStatus;
  isCircular: boolean;
  useUrlShortener: boolean;
  platforms: SocialPlatform[];
  schedule: {
    type: ScheduleType;
    times: string[];
    days?: number[];
    timezone: string;
  };
  nextExecutionAt?: string; // ISO date string
  totalPosts: number;
  activePosts: number;
  publishedPosts: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface PostResponseDto {
  id: string;
  autolistaId: string;
  position: number;
  content: string;
  media: {
    id: string;
    type: ContentType;
    url: string;
    thumbnail?: string;
    alt?: string;
    duration?: number;
  }[];
  platforms: SocialPlatform[];
  status: PostStatus;
  scheduledAt?: string; // ISO date string
  publishedAt?: string; // ISO date string
  hashtags: string[];
  mentions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AutolistaWithPostsResponseDto extends AutolistaResponseDto {
  posts: PostResponseDto[];
}

export interface AutolistaStatsResponseDto {
  totalAutolistas: number;
  activeAutolistas: number;
  totalPosts: number;
  publishedToday: number;
  scheduledNext24h: number;
  platforms: {
    platform: SocialPlatform;
    count: number;
  }[];
}

export interface GetAutolistasResponseDto {
  autolistas: AutolistaResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetPostsResponseDto {
  posts: PostResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ==============================
// Query DTOs
// ==============================

export interface GetAutolistasQueryDto {
  page?: number;
  limit?: number;
  status?: AutolistaStatus;
  platform?: SocialPlatform;
  search?: string;
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'nextExecution';
  sortOrder?: 'asc' | 'desc';
}

export interface GetPostsQueryDto {
  autolistaId?: string;
  page?: number;
  limit?: number;
  status?: PostStatus;
  platform?: SocialPlatform;
  search?: string;
  sortBy?: 'position' | 'createdAt' | 'scheduledAt' | 'publishedAt';
  sortOrder?: 'asc' | 'desc';
}

// ==============================
// Action DTOs
// ==============================

export interface ToggleAutolistaStatusDto {
  id: string;
  status: AutolistaStatus;
}

export interface TogglePostStatusDto {
  id: string;
  isActive: boolean;
}

export interface ExecuteAutolistaDto {
  id: string;
  force?: boolean; // Forzar ejecución aunque no sea el horario
}

export interface PreviewPostDto {
  content: string;
  media?: {
    type: ContentType;
    url: string;
  }[];
  platforms: SocialPlatform[];
  hashtags?: string[];
  mentions?: string[];
}

// ==============================
// Validation DTOs
// ==============================

export interface ValidateRSSDto {
  rssUrl: string;
}

export interface ValidateRSSResponseDto {
  isValid: boolean;
  feedTitle?: string;
  feedDescription?: string;
  lastUpdated?: string;
  itemCount?: number;
  error?: string;
}

export interface ValidateCSVDto {
  csvData: string;
  separator?: string;
  hasHeader?: boolean;
}

export interface ValidateCSVResponseDto {
  isValid: boolean;
  rowCount?: number;
  columnCount?: number;
  preview?: string[][];
  errors?: string[];
} 