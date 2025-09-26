import { Publication } from '../../domain/entities/publication';

export type CalendarEventInput = {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  extendedProps?: {
    status: string;
    platforms: string[];
    platformContentTypes: Record<string, string>;
    hasImage: boolean;
    imageUrl: string | null;
    fullText: string;
    hashtags: string[];
    mentions: string[];
    mediaCount: number;
    mediaUrls: string[];
    publicationId: string;
    userId: string;
    createdAt: Date;
    scheduledAt?: Date;
    publishedAt?: Date;
    errors: string[];
  };
};

export function mapPublicationToEvent(pub: Publication): CalendarEventInput | null {
  const startDate = pub.scheduledAt ?? pub.createdAt;
  if (!startDate) {
    console.log('❌ Publication without scheduledAt or createdAt:', pub.id);
    return null;
  }

  const start = new Date(startDate);
  const end = new Date(start.getTime() + 30 * 60 * 1000);

  const mediaArray = pub.content.media;
  const hasImage = mediaArray && mediaArray.length > 0;

  const contentText = pub.content.text || 'Sin contenido';
  const truncatedText = contentText.length > 50 ? contentText.substring(0, 50) + '...' : contentText;

  return {
    id: pub.id,
    title: truncatedText,
    start,
    end,
    allDay: false,
    extendedProps: {
      status: pub.status.toUpperCase(),
      platforms: pub.platforms,
      platformContentTypes: pub.platformContentTypes,
      hasImage: hasImage,
      imageUrl: hasImage ? mediaArray[0].url : null,
      fullText: pub.content.text,
      hashtags: pub.content.hashtags || [],
      mentions: pub.content.mentions || [],
      mediaCount: mediaArray?.length || 0,
      mediaUrls: mediaArray ? mediaArray.map(asset => asset.url) : [],
      publicationId: pub.id,
      userId: pub.userId,
      createdAt: pub.createdAt,
      scheduledAt: pub.scheduledAt,
      publishedAt: pub.publishedAt,
      errors: pub.errors || [],
    }
  };
}

export function mapPublicationsToEvents(pubs: readonly Publication[]): CalendarEventInput[] {
  console.log('🔄 Mapping publications to events:', {
    inputCount: pubs.length,
    publications: pubs.slice(0, 2)
  });

  const events = pubs.map(mapPublicationToEvent).filter(Boolean) as CalendarEventInput[];

  console.log('✅ Mapping result:', {
    outputCount: events.length,
    events: events.slice(0, 2)
  });

  return events;
}