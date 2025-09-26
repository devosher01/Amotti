import React from 'react';
import { FileImage, Video, Camera } from 'lucide-react';
import { getContentTypeLabel, type ContentType } from './calendarUtils';

interface ContentTypeIconProps {
  type: string;
  size?: number;
}

export const ContentTypeIcon: React.FC<ContentTypeIconProps> = ({ type, size = 14 }) => {
  const iconStyle = { size, color: '#6b7280' };

  switch (type) {
    case 'post': return <FileImage {...iconStyle} />;
    case 'reel': return <Video {...iconStyle} />;
    case 'story': return <Camera {...iconStyle} />;
    default: return <FileImage {...iconStyle} />;
  }
};

export const ContentTypeIconHTML = (type: string): string => {
  const iconColor = '#6b7280';
  
  switch (type) {
    case 'post': return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;
    case 'reel': return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect width="14" height="12" x="1" y="5" rx="2" ry="2"/></svg>`;
    case 'story': return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`;
    default: return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;
  }
};

export const getContentTypeLabelHTML = (type: string): string => {
  return getContentTypeLabel(type);
};
