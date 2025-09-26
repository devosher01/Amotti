/**
 * Domain Value Object: Publication Content
 * Enfoque funcional siguiendo Clean Architecture
 */

// Tipos simples
export type MediaItem = {
  id: string;
  type: 'image' | 'video';
  url: string;
  alt?: string;
};

export type Content = {
  text: string;
  hashtags: string[];
  mentions: string[];
  links: string[];
  media: MediaItem[];
};

// Funciones puras de validación
function validateBusinessRules(content: Partial<Content>): void {
  if (content.text && content.text.length > 2200) {
    throw new Error('Content text cannot exceed 2200 characters');
  }

  if (content.hashtags && content.hashtags.length > 30) {
    throw new Error('Cannot have more than 30 hashtags');
  }

  if (content.mentions && content.mentions.length > 20) {
    throw new Error('Cannot have more than 20 mentions');
  }

  if (content.media && content.media.length > 10) {
    throw new Error('Cannot have more than 10 media items');
  }
}

function validateForCreation(content: Partial<Content>): void {
  if (!content.text || content.text.trim().length === 0) {
    throw new Error('Content text cannot be empty');
  }
  
  validateBusinessRules(content);
}

function validateForSnapshot(content: Partial<Content>): void {
  // NO validar texto vacío para datos existentes (snapshots del backend)
  validateBusinessRules(content);
}

// Funciones puras de creación
export function createContent(data: Partial<Content>): Content {
  validateForCreation(data);
  
  return {
    text: data.text || '',
    hashtags: data.hashtags || [],
    mentions: data.mentions || [],
    links: data.links || [],
    media: data.media || []
  };
}

export function fromSnapshot(data: Partial<Content>): Content {
  validateForSnapshot(data);
  
  return {
    text: data.text || '',
    hashtags: data.hashtags || [],
    mentions: data.mentions || [],
    links: data.links || [],
    media: data.media || []
  };
}

// Funciones puras de consulta
export function getText(content: Content): string {
  return content.text;
}

export function getHashtags(content: Content): readonly string[] {
  return content.hashtags;
}

export function getMentions(content: Content): readonly string[] {
  return content.mentions;
}

export function getLinks(content: Content): readonly string[] {
  return content.links;
}

export function getMedia(content: Content): readonly MediaItem[] {
  return content.media;
}

export function hasMedia(content: Content): boolean {
  return content.media.length > 0;
}

export function getWordCount(content: Content): number {
  return content.text.split(/\s+/).length;
}

export function getCharacterCount(content: Content): number {
  return content.text.length;
}

export function contentEquals(content1: Content, content2: Content): boolean {
  return JSON.stringify(content1) === JSON.stringify(content2);
}