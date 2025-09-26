/**
 * Video Thumbnail Extractor
 * Utilidad para extraer thumbnails de videos
 */

export const extractVideoThumbnail = (videoUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('No se pudo obtener el contexto del canvas'));
      return;
    }

    video.addEventListener('loadedmetadata', () => {
      // Establecer el tiempo a la mitad del video para obtener una frame representativa
      video.currentTime = video.duration * 0.25;
    });

    video.addEventListener('seeked', () => {
      try {
        // Configurar el canvas con las dimensiones del video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Dibujar el frame actual en el canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convertir a base64
        const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
        resolve(thumbnail);
      } catch (error) {
        reject(error);
      }
    });

    video.addEventListener('error', () => {
      reject(new Error('Error al cargar el video'));
    });

    // Configurar el video
    video.crossOrigin = 'anonymous';
    video.src = videoUrl;
    video.load();
  });
};

/**
 * Obtiene un thumbnail de un video con manejo de errores
 */
export const getVideoThumbnail = async (videoUrl: string): Promise<string | null> => {
  try {
    return await extractVideoThumbnail(videoUrl);
  } catch (error) {
    console.warn('Error al extraer thumbnail del video:', error);
    return null;
  }
};

/**
 * Genera un thumbnail placeholder para videos
 */
export const generateVideoPlaceholder = (width = 300, height = 200): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';

  canvas.width = width;
  canvas.height = height;

  // Fondo gradiente
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#5b24b7');
  gradient.addColorStop(1, '#4c1d9a');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Ícono de play
  const centerX = width / 2;
  const centerY = height / 2;
  const playSize = Math.min(width, height) * 0.2;

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(centerX - playSize / 2, centerY - playSize);
  ctx.lineTo(centerX + playSize, centerY);
  ctx.lineTo(centerX - playSize / 2, centerY + playSize);
  ctx.closePath();
  ctx.fill();

  return canvas.toDataURL('image/jpeg', 0.8);
};