export interface MediaItem {
  type: 'image' | 'video';
  url?: string;  
  file?: File;  
}

export interface PublicationFormData {
  id: string;
  title: string;
  content: string;
  scheduledTime: Date;
  platforms: string[];
  status: string;
  
  mediaUrls: string[];           
  mediaFiles?: File[];           
  media?: MediaItem[];           
  
  hashtags: string[];
  mentions: string[];
  platformContentTypes?: Record<string, string>;
}
