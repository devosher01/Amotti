import { Publication, fromSnapshot } from '../../domain/entities/publication';
import { Platform, ContentType } from '../../domain/types/platform';
import { PublicationStatus } from '../../domain/types/status';
import { CreatePublicationCommand, UpdatePublicationCommand } from '../../application/ports/publication-repository.port';

// Tipos para respuestas de la API (basados en respuestas REALES)
export interface ApiPublicationData {
  id: string;
  userId: string;
  content: {
    id: string;
    text: string;
    media: string[]; // Array de URLs
    links: string[];
    hashtags: string[];
    mentions: string[];
    contentType: ContentType;
    metadata: {
      statusMessage?: string;
      lastStatusUpdate?: string;
      platformContentTypes: Record<Platform, ContentType>;
    };
    createdAt: string;
    updatedAt: string;
  };
  platforms: Platform[];
  status: PublicationStatus;
  publicationType: string;
  scheduledAt?: string;
  publishedAt?: string;
  notes: any[];
  createdAt: string;
  updatedAt: string;
}


export function mapApiResponseToPublication(apiData: ApiPublicationData): Publication {
  return fromSnapshot(apiData);
}


function getContentTypeFromPlatforms(platformContentTypes: Record<string, string>): string {
  const contentTypes = Object.values(platformContentTypes);
  return contentTypes[0] || 'post';
}

export function mapCreateCommandToJsonRequest(command: CreatePublicationCommand): any {
  const contentData = command.content;

  console.log('🗺️ Mapping command to JSON:', {
    contentText: contentData.text,
    mediaCount: contentData.media?.length || 0,
    mediaUrls: contentData.media?.map(item => item.url) || [],
    platforms: command.platforms,
    action: command.action
  });

  const result = {
    text: contentData.text || '',
    media: contentData.media?.map(item => ({
      type: item.type,
      url: item.url
    })) || [],
    hashtags: contentData.hashtags || [],
    contentType: getContentTypeFromPlatforms(command.platformContentTypes),
    platforms: command.platforms,
    platformContentTypes: command.platformContentTypes || {},
    action: command.action,
    ...(command.scheduledAt && { scheduledAt: command.scheduledAt.toISOString() })
  };

  console.log('🗺️ Mapped result:', result);
  return result;
}

export function mapUpdateCommandToJsonRequest(command: UpdatePublicationCommand): any {
  const request: any = {};

  if (command.content) {
    const contentData = command.content;

    if (contentData.text !== undefined) {
      request.text = contentData.text;
    }

    if (contentData.media !== undefined) {
      request.media = contentData.media.map(item => ({
        type: item.type,
        url: item.url
      }));
    }

    if (contentData.hashtags !== undefined) {
      request.hashtags = contentData.hashtags;
    }

    if (contentData.mentions !== undefined) {
      request.mentions = contentData.mentions;
    }

    if (contentData.links !== undefined) {
      request.links = contentData.links;
    }
  }

  if (command.platforms !== undefined) {
    request.platforms = command.platforms;
  }

  if (command.platformContentTypes !== undefined) {
    request.platformContentTypes = command.platformContentTypes;
  }

  if (command.action !== undefined) {
    request.action = command.action;
  }

  if (command.scheduledAt !== undefined) {
    request.scheduledAt = command.scheduledAt.toISOString();
  }

  console.log('🗺️ Update mapper - final request:', {
    command,
    request,
    scheduledAtOriginal: command.scheduledAt,
    scheduledAtMapped: request.scheduledAt
  });

  return request;
}



export function mapCreateCommandToFormData(command: CreatePublicationCommand, files: File[]): FormData {
  const formData = new FormData();
  const contentData = command.content;

  // Agregar archivos
  files.forEach(file => {
    formData.append('files', file);
  });

  // Agregar texto
  if (contentData.text) {
    formData.append('text', contentData.text);
  }

  // Agregar plataformas
  if (command.platforms && command.platforms.length > 0) {
    formData.append('platforms', command.platforms.join(','));
  }

  // Agregar tipos de contenido por plataforma
  if (command.platformContentTypes && Object.keys(command.platformContentTypes).length > 0) {
    formData.append('platformContentTypes', JSON.stringify(command.platformContentTypes));
  }

  // Agregar acción
  formData.append('action', command.action);

  // Agregar fecha programada
  if (command.scheduledAt) {
    formData.append('scheduledAt', command.scheduledAt.toISOString());
  }

  // Agregar hashtags, mentions, links si existen
  if (contentData.hashtags && contentData.hashtags.length > 0) {
    formData.append('hashtags', contentData.hashtags.join(','));
  }

  if (contentData.mentions && contentData.mentions.length > 0) {
    formData.append('mentions', contentData.mentions.join(','));
  }

  if (contentData.links && contentData.links.length > 0) {
    formData.append('links', contentData.links.join(','));
  }

  return formData;
}

