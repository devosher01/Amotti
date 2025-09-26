/**
 * Media Viewer Types
 */

export type MediaType = 'image' | 'video';

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  thumbnail?: string;
  alt?: string;
  title?: string;
  duration?: number; // Para videos en segundos
}

export interface MediaViewerProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem[];
  initialIndex?: number;
}