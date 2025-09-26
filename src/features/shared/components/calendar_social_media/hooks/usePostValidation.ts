import { useState, useEffect, useCallback } from "react";
import { SocialMediaPostType } from "../types";
import { LogEntry } from "../LogsSection";

interface UsePostValidationProps {
  formData: SocialMediaPostType;
}

export const usePostValidation = ({ formData }: UsePostValidationProps) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const generateLogs = useCallback(() => {
    const newLogs: LogEntry[] = [];

    if (formData.platforms.length === 0) {
      newLogs.push({
        id: 'no-platform-error',
        type: 'error',
        message: 'Debe seleccionar al menos una red social.',
      });
    }

    if (!formData.content || formData.content.trim().length === 0) {
      newLogs.push({
        id: 'content-error',
        type: 'error',
        message: 'Se requiere al menos un carácter de texto o un recurso visual.',
      });
    }

    if (formData.platforms.includes('instagram') && (!formData.mediaUrls || formData.mediaUrls.length === 0)) {
      newLogs.push({
        id: 'instagram-media-error',
        type: 'warning',
        platform: 'instagram',
        message: 'Se debe incluir al menos 1 imagen o vídeo.',
      });
    }

    if (formData.platforms.includes('facebook') && formData.content && formData.content.length > 63206) {
      newLogs.push({
        id: 'facebook-length-warning',
        type: 'warning',
        platform: 'facebook',
        message: 'El contenido excede el límite recomendado de 63,206 caracteres.',
      });
    }

    if (formData.content && formData.content.includes('#')) {
      const hashtagCount = (formData.content.match(/#/g) || []).length;
      if (hashtagCount > 30) {
        newLogs.push({
          id: 'hashtag-warning',
          type: 'warning',
          message: `Se detectaron ${hashtagCount} hashtags. Se recomienda usar máximo 30 hashtags.`,
        });
      }
    }

    if (formData.content && formData.content.includes('http')) {
      newLogs.push({
        id: 'url-info',
        type: 'info',
        message: 'Se detectó una URL en el contenido. Se aplicará el acortador automáticamente.',
      });
    }

    setLogs(newLogs);
  }, [formData.content, formData.platforms, formData.mediaUrls]);

  useEffect(() => {
    generateLogs();
  }, [generateLogs]);

  const isValid = logs.filter(log => log.type === 'error').length === 0;

  return {
    logs,
    isValid,
  };
};