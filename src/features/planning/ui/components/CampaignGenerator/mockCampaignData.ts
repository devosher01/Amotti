export interface MockCampaignPost {
  id: string;
  type: 'post' | 'reel' | 'story';
  platform: 'facebook' | 'instagram';
  content: {
    text: string;
    hashtags: string[];
    mentions: string[];
    imageUrl: string;
  };
  scheduledTime: string; // HH:mm format
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
  };
  category: 'promocional' | 'educativo' | 'entretenimiento' | 'testimonial' | 'behind_scenes' | 'user_generated';
}

export interface MockCampaign {
  id: string;
  name: string;
  objective: string;
  duration: number; // days
  budget: number;
  targetAudience: string;
  posts: MockCampaignPost[];
  metrics: {
    expectedReach: number;
    expectedEngagement: number;
    expectedConversions: number;
    roi: number;
  };
}

// Banco de imágenes realistas para diferentes categorías
export const MOCK_IMAGES = {
  promocional: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop',
  ],
  educativo: [
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1553028826-f4804a6dfd3f?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
  ],
  entretenimiento: [
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=800&h=800&fit=crop',
  ],
  testimonial: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1494790108755-2616c3d904c5?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop',
  ],
  behind_scenes: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=800&fit=crop',
  ],
  user_generated: [
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1541280063430-c5d97801a7b3?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=800&h=800&fit=crop',
  ]
};

// Plantillas de contenido por categoría
export const CONTENT_TEMPLATES = {
  promocional: [
    "🔥 ¡Oferta especial por tiempo limitado! No te pierdas esta increíble oportunidad. {emoji}",
    "✨ Descubre nuestra nueva colección. Calidad premium al mejor precio. {emoji}",
    "🎯 La solución que estabas buscando está aquí. ¡Aprovecha ahora! {emoji}",
    "💎 Exclusivo para nuestros seguidores más fieles. Solo por hoy. {emoji}",
    "🌟 Transforma tu experiencia con nosotros. Resultados garantizados. {emoji}",
    "🚀 Lleva tu negocio al siguiente nivel con nuestros servicios premium. {emoji}",
    "💥 ¡Última oportunidad! Esta oferta desaparecerá pronto. {emoji}",
    "🎉 Celebramos contigo con descuentos increíbles. No te lo pierdas. {emoji}",
  ],
  educativo: [
    "📚 Tip del día: ¿Sabías que...? Aprende algo nuevo con nosotros. {emoji}",
    "🧠 Conocimiento que transforma: descubre las mejores prácticas. {emoji}",
    "📈 Estrategias probadas que realmente funcionan. Guía paso a paso. {emoji}",
    "💡 Ideas brillantes que cambiarán tu perspectiva. Conoce más aquí. {emoji}",
    "🔍 Datos fascinantes que te sorprenderán. La información que necesitas. {emoji}",
    "📖 Tutorial completo: domina esta habilidad en minutos. {emoji}",
    "🎓 Aprende de los expertos: consejos que marcan la diferencia. {emoji}",
    "🔬 Investigación reveladora: lo que necesitas saber sobre... {emoji}",
  ],
  entretenimiento: [
    "😂 ¡Esto te va a sacar una sonrisa! Momentos divertidos garantizados. {emoji}",
    "🎭 Detrás de cámaras: momentos únicos e irrepetibles. {emoji}",
    "🎬 La historia que no esperabas. Prepárate para sorprenderte. {emoji}",
    "🎪 Diversión asegurada para toda la familia. ¡Únete a la aventura! {emoji}",
    "🎨 Creatividad sin límites. Inspírate con nuestras ideas más locas. {emoji}",
    "🎵 El ritmo que te hará moverte. Música para el alma. {emoji}",
    "🎯 Desafío aceptado: ¿te atreves a intentarlo? {emoji}",
    "🎊 Celebrando los pequeños momentos que nos hacen felices. {emoji}",
  ],
  testimonial: [
    "💬 'La mejor decisión que he tomado' - dice uno de nuestros clientes. {emoji}",
    "⭐ Historias reales de personas reales. Resultados que hablan por sí solos. {emoji}",
    "🏆 'Superó todas mis expectativas' - testimonio que nos llena de orgullo. {emoji}",
    "💝 'Cambió mi vida completamente' - experiencias que nos motivan cada día. {emoji}",
    "🌟 'Lo recomiendo sin dudar' - la confianza de nuestros clientes nos impulsa. {emoji}",
    "🎯 'Resultados increíbles en poco tiempo' - eficacia comprobada. {emoji}",
    "💎 'Calidad excepcional, servicio impecable' - excelencia reconocida. {emoji}",
    "🚀 'Mi negocio creció exponencialmente' - historias de éxito reales. {emoji}",
  ],
  behind_scenes: [
    "🎬 Detrás de cámaras: así es como creamos la magia. {emoji}",
    "👥 Conoce al equipo que hace posible todo esto. Pasión en cada detalle. {emoji}",
    "🛠️ El proceso creativo que no ves: desde la idea hasta la realidad. {emoji}",
    "☕ Un día típico en nuestra oficina. Trabajo duro y mucha diversión. {emoji}",
    "🎨 Así nacen nuestras ideas más brillantes. Creatividad en estado puro. {emoji}",
    "📸 Momentos espontáneos que capturan nuestra esencia. {emoji}",
    "🔧 Los detalles que marcan la diferencia. Perfección en cada proceso. {emoji}",
    "🎪 El lado humano de nuestra empresa. Somos más que un equipo. {emoji}",
  ],
  user_generated: [
    "📸 ¡Nuestros clientes son los mejores! Mira estas increíbles creaciones. {emoji}",
    "❤️ Contenido creado por ustedes, para ustedes. Comunidad en acción. {emoji}",
    "🌟 Spotlight del día: celebrando la creatividad de nuestra audiencia. {emoji}",
    "📱 Etiquétanos y forma parte de nuestra galería especial. {emoji}",
    "🎉 Concurso: comparte tu experiencia y gana premios increíbles. {emoji}",
    "💫 Inspiración diaria cortesía de nuestros seguidores. {emoji}",
    "🏅 Featured: el talento de nuestra comunidad nos sorprende cada día. {emoji}",
    "🎨 Repost: arte y creatividad que merece ser compartida. {emoji}",
  ]
};

export const HASHTAG_COLLECTIONS = {
  general: ['#marketing', '#business', '#success', '#motivation', '#entrepreneur'],
  tech: ['#technology', '#innovation', '#digital', '#AI', '#future'],
  lifestyle: ['#lifestyle', '#inspiration', '#wellness', '#selfcare', '#mindfulness'],
  business: ['#business', '#startup', '#leadership', '#growth', '#strategy'],
  creative: ['#creative', '#design', '#art', '#photography', '#inspiration'],
  social: ['#community', '#together', '#family', '#friends', '#connection']
};

export const EMOJIS_BY_CATEGORY = {
  promocional: ['🔥', '✨', '💎', '🌟', '🚀', '💥', '🎯', '🎉'],
  educativo: ['📚', '🧠', '📈', '💡', '🔍', '📖', '🎓', '🔬'],
  entretenimiento: ['😂', '🎭', '🎬', '🎪', '🎨', '🎵', '🎯', '🎊'],
  testimonial: ['💬', '⭐', '🏆', '💝', '🌟', '🎯', '💎', '🚀'],
  behind_scenes: ['🎬', '👥', '🛠️', '☕', '🎨', '📸', '🔧', '🎪'],
  user_generated: ['📸', '❤️', '🌟', '📱', '🎉', '💫', '🏅', '🎨']
};

// Función para generar contenido realista
export function generateMockContent(category: MockCampaignPost['category'], index: number = 0): string {
  const templates = CONTENT_TEMPLATES[category];
  const emojis = EMOJIS_BY_CATEGORY[category];
  
  const template = templates[index % templates.length];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  
  return template.replace('{emoji}', emoji);
}

// Función para generar hashtags relevantes
export function generateHashtags(category: MockCampaignPost['category']): string[] {
  const collections = Object.values(HASHTAG_COLLECTIONS);
  const baseHashtags = collections[Math.floor(Math.random() * collections.length)];
  
  // Hashtags específicos por categoría
  const specificHashtags = {
    promocional: ['#oferta', '#descuento', '#limitado', '#especial'],
    educativo: ['#aprender', '#tutorial', '#tips', '#conocimiento'],
    entretenimiento: ['#diversion', '#entretenimiento', '#humor', '#viral'],
    testimonial: ['#testimonio', '#review', '#experiencia', '#satisfaccion'],
    behind_scenes: ['#backstage', '#equipo', '#proceso', '#detras'],
    user_generated: ['#comunidad', '#fans', '#usuarios', '#compartir']
  };
  
  return [...baseHashtags.slice(0, 3), ...specificHashtags[category].slice(0, 2)];
}

// Función para generar métricas realistas
export function generateRealisticMetrics(type: MockCampaignPost['type'], platform: MockCampaignPost['platform']) {
  const baseMetrics = {
    post: { likes: 50, comments: 5, shares: 2, reach: 800 },
    reel: { likes: 150, comments: 15, shares: 8, reach: 2500 },
    story: { likes: 30, comments: 2, shares: 1, reach: 500 }
  };
  
  const platformMultiplier = platform === 'instagram' ? 1.3 : 1.0;
  const variance = 0.3; // 30% de variación
  
  const base = baseMetrics[type];
  
  return {
    likes: Math.round(base.likes * platformMultiplier * (1 + (Math.random() - 0.5) * variance)),
    comments: Math.round(base.comments * platformMultiplier * (1 + (Math.random() - 0.5) * variance)),
    shares: Math.round(base.shares * platformMultiplier * (1 + (Math.random() - 0.5) * variance)),
    reach: Math.round(base.reach * platformMultiplier * (1 + (Math.random() - 0.5) * variance))
  };
}

// Función principal para generar una campaña completa
export function generateMockCampaign(objective: string, duration: number = 30): MockCampaign {
  const categories: MockCampaignPost['category'][] = ['promocional', 'educativo', 'entretenimiento', 'testimonial', 'behind_scenes', 'user_generated'];
  const types: MockCampaignPost['type'][] = ['post', 'reel', 'story'];
  const platforms: MockCampaignPost['platform'][] = ['facebook', 'instagram'];
  const timeSlots = ['09:00', '12:00', '15:00', '18:00', '20:00', '21:00'];
  
  const posts: MockCampaignPost[] = [];
  const postsPerDay = 3; // Promedio de posts por día
  const totalPosts = duration * postsPerDay;
  
  for (let i = 0; i < totalPosts; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const timeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
    
    const imageUrls = MOCK_IMAGES[category];
    const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    
    posts.push({
      id: `post-${i + 1}`,
      type,
      platform,
      content: {
        text: generateMockContent(category, i),
        hashtags: generateHashtags(category),
        mentions: Math.random() > 0.7 ? ['@influencer', '@partner'] : [],
        imageUrl
      },
      scheduledTime: timeSlot,
      engagement: generateRealisticMetrics(type, platform),
      category
    });
  }
  
  // Calcular métricas de campaña
  const totalReach = posts.reduce((sum, post) => sum + post.engagement.reach, 0);
  const totalEngagement = posts.reduce((sum, post) => sum + post.engagement.likes + post.engagement.comments + post.engagement.shares, 0);
  
  return {
    id: `campaign-${Date.now()}`,
    name: `Campaña ${objective} - ${duration} días`,
    objective,
    duration,
    budget: Math.round(duration * 50 * (1 + Math.random())), // Budget variable
    targetAudience: 'Adultos 25-45 años, interesados en tecnología y negocios',
    posts,
    metrics: {
      expectedReach: totalReach,
      expectedEngagement: totalEngagement,
      expectedConversions: Math.round(totalReach * 0.02), // 2% conversion rate
      roi: Math.round(200 + Math.random() * 300) // ROI entre 200-500%
    }
  };
}