// 🎯 AUTOLISTAS - Domain Entities

export enum AutolistaStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  DRAFT = 'draft',
  COMPLETED = 'completed',
}

export enum PostStatus {
  PENDING = 'pending',
  PUBLISHED = 'published',
  FAILED = 'failed',
  PAUSED = 'paused',
}

export enum SocialPlatform {
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  LINKEDIN = 'linkedin',
  TIKTOK = 'tiktok',
  YOUTUBE = 'youtube',
}

export enum ContentType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  LINK = 'link',
  CAROUSEL = 'carousel',
}

export enum ScheduleType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  CUSTOM = 'custom',
}

export interface ScheduleConfig {
  type: ScheduleType;
  times: string[]; // ["09:00", "14:00", "18:00"]
  days?: number[]; // [1,2,3,4,5] para lunes-viernes
  timezone: string;
}

export interface PostMedia {
  id: string;
  type: ContentType;
  url: string;
  thumbnail?: string;
  alt?: string;
  duration?: number; // Para videos
}

export interface AutolistaPost {
  id: string;
  autolistaId: string;
  position: number;
  content: string;
  media: PostMedia[];
  platforms: SocialPlatform[];
  status: PostStatus;
  scheduledAt?: Date;
  publishedAt?: Date;
  hashtags: string[];
  mentions: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Autolista {
  id: string;
  name: string;
  description?: string;
  status: AutolistaStatus;
  isCircular: boolean; // Si se repite en loop
  useUrlShortener: boolean;
  platforms: SocialPlatform[];
  schedule: ScheduleConfig;
  posts: AutolistaPost[];
  nextExecutionAt?: Date;
  totalPosts: number;
  activePosts: number;
  publishedPosts: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface AutolistaStats {
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

// Value Objects
export class PostContent {
  constructor(
    public readonly text: string,
    public readonly hashtags: string[] = [],
    public readonly mentions: string[] = []
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.text || this.text.trim().length === 0) {
      throw new Error('El contenido del post no puede estar vacío');
    }
    
    if (this.text.length > 2800) {
      throw new Error('El contenido del post excede el límite de caracteres');
    }
  }

  get fullContent(): string {
    const hashtagsText = this.hashtags.length > 0 ? ' ' + this.hashtags.map(tag => `#${tag}`).join(' ') : '';
    const mentionsText = this.mentions.length > 0 ? ' ' + this.mentions.map(mention => `@${mention}`).join(' ') : '';
    return this.text + hashtagsText + mentionsText;
  }

  get characterCount(): number {
    return this.fullContent.length;
  }
}

export class TimeSlot {
  constructor(
    public readonly hour: number,
    public readonly minute: number = 0
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.hour < 0 || this.hour > 23) {
      throw new Error('La hora debe estar entre 0 y 23');
    }
    
    if (this.minute < 0 || this.minute > 59) {
      throw new Error('Los minutos deben estar entre 0 y 59');
    }
  }

  get time24h(): string {
    return `${this.hour.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')}`;
  }

  get time12h(): string {
    const period = this.hour >= 12 ? 'PM' : 'AM';
    const hour12 = this.hour === 0 ? 12 : this.hour > 12 ? this.hour - 12 : this.hour;
    return `${hour12}:${this.minute.toString().padStart(2, '0')} ${period}`;
  }
} 