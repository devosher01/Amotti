export interface EventType {
  id?: string;
  title: string;
  start?: Date;
  end?: Date;
  allDay?: boolean;
  color?: string;
  description?: string;
  location?: string;
  participants?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SocialMediaPostType {
  id: string;
  title: string;
  content: string;
  scheduledTime: Date;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published' | 'library' | 'review';
  mediaUrls: string[];
  // Campos adicionales para el calendario (opcionales para compatibilidad)
  hashtags?: string[];
  mentions?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CalendarView {
  type: 'month' | 'week' | 'day';
  title: string;
  value: string;
}

export interface CalendarFilters {
  showAllDay: boolean;
  showEvents: boolean;
  colors: string[];
} 