import { Platform, ContentType } from '../types/platform';
import { PublicationStatus } from '../types/status';
import { Content } from '../value-objects/content';

export type PublicationId = string;
export type UserId = string;

export type MediaItem = {
  id: string;
  type: 'image' | 'video';
  url: string;
  alt?: string;
};

export type Publication = {
  id: PublicationId;
  userId: UserId;
  content: Content;
  platforms: Platform[];
  platformContentTypes: Record<Platform, ContentType>;
  status: PublicationStatus;
  scheduledAt?: Date;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  errors?: string[];
};



export function createPublication(
  id: PublicationId,
  userId: UserId,
  content: Content,
  platforms: Platform[],
  platformContentTypes: Record<Platform, ContentType>,
  status: PublicationStatus,
  scheduledAt?: Date
): Publication {
  const now = new Date();

  return {
    id,
    userId,
    content,
    platforms,
    platformContentTypes,
    status,
    scheduledAt,
    publishedAt: undefined,
    createdAt: now,
    updatedAt: now,
    errors: []
  };
}

export function fromSnapshot(data: any): Publication {
  const platformContentTypes = data.platformContentTypes ||
    data.content?.metadata?.platformContentTypes ||
    {};

  const errors: string[] = [];
  if (data.content?.metadata?.publishResults) {
    const failedResults = data.content.metadata.publishResults.filter((result: any) => !result.success);
    errors.push(...failedResults.map((result: any) => result.error || 'Unknown error'));
  }

  let transformedContent = data.content;
  if (data.content?.media && Array.isArray(data.content.media)) {
    const needsTransformation = data.content.media.some((item: any) => typeof item === 'string');
    
    if (needsTransformation) {
      transformedContent = {
        ...data.content,
        media: data.content.media.map((mediaUrl: string | MediaItem) => {
          if (typeof mediaUrl === 'string') {
            return {
              id: generateMediaId(mediaUrl),
              type: inferMediaTypeFromUrl(mediaUrl),
              url: mediaUrl,
              alt: ''
            };
          }
          return mediaUrl;
        })
      };
    }
  }

  return {
    id: data.id,
    userId: data.userId,
    content: transformedContent,
    platforms: data.platforms || [],
    platformContentTypes,
    status: data.status,
    scheduledAt: data.scheduledAt ? new Date(data.scheduledAt + (data.scheduledAt.endsWith('Z') ? '' : 'Z')) : undefined,
    publishedAt: data.publishedAt ? new Date(data.publishedAt + (data.publishedAt.endsWith('Z') ? '' : 'Z')) : undefined,
    createdAt: data.createdAt ? new Date(data.createdAt + (data.createdAt.endsWith('Z') ? '' : 'Z')) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt + (data.updatedAt.endsWith('Z') ? '' : 'Z')) : new Date(),
    errors: data.errors?.length > 0 ? data.errors : (errors.length > 0 ? errors : undefined)
  };
}

function inferMediaTypeFromUrl(url: string): 'image' | 'video' {
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('.mp4') || lowerUrl.includes('.mov') || lowerUrl.includes('.webm') || lowerUrl.includes('/video/')) {
    return 'video';
  }
  
  return 'image'; // Default to image
}

function generateMediaId(url: string): string {
  // Extraer nombre del archivo o usar hash simple
  const urlParts = url.split('/');
  const fileName = urlParts[urlParts.length - 1] || 'media';
  return `media_${fileName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`;
}


export function updateContent(publication: Publication, content: Content): Publication {
  return {
    ...publication,
    content,
    updatedAt: new Date()
  };
}

export function updatePlatforms(
  publication: Publication,
  platforms: Platform[],
  platformContentTypes: Record<Platform, ContentType>
): Publication {
  return {
    ...publication,
    platforms,
    platformContentTypes,
    updatedAt: new Date()
  };
}

export function schedulePublication(publication: Publication, scheduledAt: Date): Publication {
  return {
    ...publication,
    status: 'scheduled',
    scheduledAt,
    updatedAt: new Date()
  };
}

export function publishNow(publication: Publication): Publication {
  return {
    ...publication,
    status: 'processing',
    scheduledAt: undefined,
    updatedAt: new Date()
  };
}

export function markAsPublished(publication: Publication, publishedAt?: Date): Publication {
  return {
    ...publication,
    status: 'published',
    publishedAt: publishedAt || new Date(),
    updatedAt: new Date(),
    errors: undefined
  };
}

export function markAsFailed(publication: Publication, errors: string[]): Publication {
  return {
    ...publication,
    status: 'failed',
    errors,
    updatedAt: new Date()
  };
}

export function markAsDraft(publication: Publication): Publication {
  return {
    ...publication,
    status: 'draft',
    scheduledAt: undefined,
    publishedAt: undefined,
    errors: undefined,
    updatedAt: new Date()
  };
}

export function canEdit(publication: Publication): boolean {
  return ['draft', 'failed'].includes(publication.status);
}

export function canDelete(publication: Publication): boolean {
  return ['draft', 'failed', 'cancelled'].includes(publication.status);
}

export function canSchedule(publication: Publication): boolean {
  return publication.status === 'draft' || publication.status === 'failed';
}

export function canPublishNow(publication: Publication): boolean {
  return ['draft', 'scheduled', 'failed'].includes(publication.status);
}

export function isOverdue(publication: Publication): boolean {
  if (!publication.scheduledAt || publication.status !== 'scheduled') {
    return false;
  }
  return publication.scheduledAt < new Date();
}