export interface SocialMediaPostType {
  id: string;
  title: string;
  content: string;
  scheduledTime: Date;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published';
  mediaUrls: string[];
}

export interface PlatformType {
  value: string;
  label: string;
  icon: React.ReactElement;
  color: string;
  contentTypes: ContentType[];
}

export interface ContentType {
  value: string;
  label: string;
  icon: React.ReactElement;
  description: string;
}

export interface LogEntry {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  platform?: string;
  timestamp?: Date;
}

export interface ConfigurationSectionProps {
  globalConfig: {
    autoPublish: boolean;
    urlShortener: boolean;
    hashtagOptimization: boolean;
  };
  facebookConfig: {
    autoTagFriends: boolean;
    locationTagging: boolean;
    audienceTargeting: boolean;
  };
  instagramConfig: {
    autoAddHashtags: boolean;
    storyHighlights: boolean;
    locationTagging: boolean;
  };
  onConfigChange: (section: string, config: any) => void;
  selectedPlatforms: string[];
}

export interface SocialMediaSelectorProps {
  platforms: PlatformType[];
  selectedPlatforms: string[];
  selectedContentTypes: Record<string, string>;
  onPlatformToggle: (platform: string) => void;
  onContentTypeChange: (platform: string, contentType: string) => void;
  dropdownOpen: string | null;
  setDropdownOpen: (platform: string | null) => void;
}

export interface PostEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  hasImage: boolean;
  onImageToggle: (hasImage: boolean) => void;
}

export interface PreviewSectionProps {
  viewMode: 'desktop' | 'mobile';
  onViewModeChange: (mode: 'desktop' | 'mobile') => void;
  selectedPlatforms: string[];
  content: string;
  scheduledTime: Date;
}

export interface ModalFooterProps {
  onCancel: () => void;
  onSave: () => void;
  scheduledTime: Date;
  onDateTimeChange: (date: Date) => void;
  isValid: boolean;
} 