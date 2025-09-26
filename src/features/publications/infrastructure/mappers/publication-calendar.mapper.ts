import { Publication } from '../../domain/entities/publication';

export type CalendarEventInput = {
  id: string;
  title: string;
  start: Date; // ensure Date object
  end?: Date;
  allDay?: boolean;
  extendedProps?: Record<string, unknown>;
};

const isDateOnly = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

export function mapPublicationToEvent(pub: Publication): CalendarEventInput | null {
  // 🎯 Usar scheduledAt como fecha principal para el calendario
  const startISO = pub.scheduledAt ?? pub.createdAt;
  if (!startISO) {
    console.log('❌ Publication without scheduledAt or createdAt:', pub.id);
    return null;
  }

  console.log('📅 Mapping publication to event:', {
    id: pub.id,
    status: pub.status,
    scheduledAt: pub.scheduledAt,
    createdAt: pub.createdAt,
    selectedDate: startISO,
    content: pub.content?.text?.substring(0, 50)
  });

  const start = isDateOnly(startISO) ? new Date(`${startISO}T12:00:00.000Z`) : new Date(startISO);
  const end = new Date(start.getTime() + 30 * 60 * 1000);

  // 🎯 Calcular si tiene imagen basado en los media items
  // El backend puede enviar media como array de strings o array de MediaItem
  const mediaArray = pub.content.media;
  const hasImage = mediaArray && mediaArray.length > 0;
  
  // Manejar ambos formatos: string[] o MediaItem[]
  const firstImageUrl = hasImage ? 
    (typeof mediaArray[0] === 'string' ? mediaArray[0] : (mediaArray[0] as any)?.url) 
    : null;
  
  // 🔍 Debug: Log para verificar el parsing
  console.log('🖼️ Media parsing debug:', {
    publicationId: pub.id,
    mediaArray,
    hasImage,
    firstImageUrl,
    mediaType: typeof mediaArray,
    mediaLength: mediaArray?.length,
    firstItemType: mediaArray?.[0] ? typeof mediaArray[0] : 'none'
  });
  
  // 📝 Usar el texto del contenido como título, no el genérico
  const contentText = pub.content.text || 'Sin contenido';
  const truncatedText = contentText.length > 50 ? contentText.substring(0, 50) + '...' : contentText;

  return {
    id: pub.id as unknown as string,
    title: truncatedText, // 🎯 Usar texto real en lugar de genérico
    start,
    end,
    allDay: false,
    extendedProps: {
      // 📋 Datos básicos requeridos por CalendarEventRenderer
      status: pub.status.toUpperCase(), // DRAFT, SCHEDULED, etc.
      platforms: pub.platforms,
      contentType: pub.content.contentType,
      hasImage: hasImage,
      imageUrl: firstImageUrl, // 🖼️ URL de la primera imagen
      
      // 📝 Datos adicionales para renderizado completo
      fullText: pub.content.text,
      hashtags: pub.content.hashtags || [],
      mentions: pub.content.mentions || [],
      mediaCount: mediaArray?.length || 0,
      mediaUrls: mediaArray ? 
        mediaArray.map(item => typeof item === 'string' ? item : (item as any)?.url).filter(Boolean) 
        : [], // Array de URLs, manejando ambos formatos
      
      // 🔗 Metadata útil
      publicationId: pub.id,
      userId: pub.userId,
      createdAt: pub.createdAt,
      scheduledAt: pub.scheduledAt,
      notes: pub.notes || [],
    },
  };
}

export function mapPublicationsToEvents(pubs: readonly Publication[]): CalendarEventInput[] {
  console.log('🔄 Mapping publications to events:', {
    inputCount: pubs.length,
    publications: pubs.slice(0, 2) // Mostrar solo las primeras 2 publicaciones
  });
  
  const events = pubs.map(mapPublicationToEvent).filter(Boolean) as CalendarEventInput[];
  
  console.log('✅ Mapping result:', {
    outputCount: events.length,
    events: events.slice(0, 2) // Mostrar solo los primeros 2 eventos
  });
  
  return events;
}
