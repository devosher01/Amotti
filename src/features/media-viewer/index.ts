/**
 * Media Viewer Feature - Export Index
 */

export { MediaViewer } from './components/MediaViewer';
export type { MediaItem, MediaType, MediaViewerProps } from './types/media';
export { 
  extractVideoThumbnail, 
  getVideoThumbnail, 
  generateVideoPlaceholder 
} from './utils/videoThumbnail';