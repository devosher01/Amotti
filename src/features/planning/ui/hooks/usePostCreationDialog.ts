/**
 * Hook LIMPIO para el diálogo de publicaciones
 * Solo lo esencial - sin complejidad innecesaria
 */

import { useState, useCallback } from 'react';
import { useCreatePublication } from './useCreatePublication';
import { useUpdatePublication } from './useUpdatePublication';
import { PublicationFormData } from '../types/socialMediaPost';
import { MediaFile } from '../types/mediaValidation';

const defaultFormData: PublicationFormData = {
  id: '',
  title: '',
  content: '',
  scheduledTime: new Date(),
  platforms: [],
  status: 'draft',
  mediaUrls: [],
  hashtags: [],
  mentions: [],
  platformContentTypes: {}
};

export interface UsePostCreationDialogReturn {
  // Estado esencial
  formData: PublicationFormData;
  mediaFiles: MediaFile[];
  isProcessing: boolean;
  error: string | null;
  
  // Acciones esenciales
  updateContent: (content: string) => void;
  togglePlatform: (platform: string) => void;
  setContentType: (platform: string, contentType: string) => void;
  handleMediaUpload: (files: FileList | File[]) => void;
  removeMediaFile: (fileId: string) => void;
  handleDateTimeChange: (date: Date | null) => void;
  resetForm: () => void;
  
  // Acción principal
  handleCreateOrUpdate: (action: 'draft' | 'publish_now' | 'schedule', isEditMode?: boolean, publicationId?: string) => Promise<any>;
}

export function usePostCreationDialog(): UsePostCreationDialogReturn {
  const [formData, setFormData] = useState<PublicationFormData>({ ...defaultFormData });
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  
  const createHook = useCreatePublication();
  const updateHook = useUpdatePublication();

  // Acciones del formulario
  const updateContent = useCallback((content: string) => {
    setFormData(prev => ({ ...prev, content }));
  }, []);

  const togglePlatform = useCallback((platform: string) => {
    setFormData(prev => {
      const isSelected = prev.platforms.includes(platform);
      const newPlatforms = isSelected
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform];
      
      return { ...prev, platforms: newPlatforms };
    });
  }, []);

  const setContentType = useCallback((platform: string, contentType: string) => {
    console.log('🎯 Setting content type:', { platform, contentType });
    setFormData(prev => {
      const newPlatformContentTypes = {
        ...prev.platformContentTypes,
        [platform]: contentType
      };
      console.log('🎯 Updated platformContentTypes:', newPlatformContentTypes);
      return {
        ...prev,
        platformContentTypes: newPlatformContentTypes
      };
    });
  }, []);

  const handleMediaUpload = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newMediaFiles: MediaFile[] = fileArray.map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      type: file.type.startsWith('video/') ? 'video' : 'image',
      size: file.size,
      url: URL.createObjectURL(file),
    }));

    setMediaFiles(prev => [...prev, ...newMediaFiles]);
  }, []);

  const removeMediaFile = useCallback((fileId: string) => {
    setMediaFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const handleDateTimeChange = useCallback((date: Date | null) => {
    if (date) {
      setFormData(prev => ({ ...prev, scheduledTime: date }));
    }
  }, []);

  const resetForm = useCallback(() => {
    setFormData({ ...defaultFormData });
    setMediaFiles([]);
  }, []);

  // Acción principal - usar flujo simplificado: pasar archivos al hook de creación
  const handleCreateOrUpdate = useCallback(async (
    action: 'draft' | 'publish_now' | 'schedule',
    isEditMode: boolean = false,
    publicationId?: string
  ) => {
    try {
      // Extraer archivos reales de mediaFiles
      const actualFiles = mediaFiles
        .filter(mf => mf.file)
        .map(mf => mf.file!);

      // URLs existentes - formato diferente para create vs update
      const existingUrls = formData.mediaUrls?.map((url, index) => {
        const baseMedia = {
          type: url.includes('.mp4') || url.includes('video') ? 'video' as const : 'image' as const,
          url
        };
        
        // Para update necesita ID, para create no
        if (isEditMode) {
          return {
            id: `existing_${index}_${Date.now()}`,
            ...baseMedia,
            alt: ''
          };
        } else {
          return {
            ...baseMedia,
            alt: ''
          };
        }
      }) || [];

      console.log('📝 Enviando al hook:', { 
        isEditMode,
        hasFiles: actualFiles.length > 0, 
        fileCount: actualFiles.length,
        existingMediaCount: existingUrls.length,
        platforms: formData.platforms,
        platformContentTypes: formData.platformContentTypes,
        formDataKeys: Object.keys(formData)
      });

      if (isEditMode && publicationId) {
        // Para UPDATE - requiere IDs en media
        const updateInput = {
          id: publicationId,
          content: {
            text: formData.content,
            hashtags: formData.hashtags,
            mentions: formData.mentions,
            links: [],
            media: existingUrls as Array<{ id: string; type: 'image' | 'video'; url: string; alt?: string }>
          },
          platforms: formData.platforms as any[],
          platformContentTypes: formData.platformContentTypes as any,
          action,
          scheduledAt: action === 'schedule' ? formData.scheduledTime : undefined
        };
        return await updateHook.updatePublication(updateInput);
      } else {
        // Para CREATE - no requiere IDs en media
        const createInput = {
          content: {
            text: formData.content,
            hashtags: formData.hashtags,
            mentions: formData.mentions,
            links: [],
            media: existingUrls as Array<{ type: 'image' | 'video'; url: string; alt?: string }>
          },
          platforms: formData.platforms as any[],
          platformContentTypes: formData.platformContentTypes as any,
          action,
          scheduledAt: action === 'schedule' ? formData.scheduledTime : undefined,
          hasFiles: actualFiles.length > 0, // ✅ Indicar si hay archivos
          files: actualFiles // ✅ Pasar archivos reales
        };
        return await createHook.createPublication(createInput);
      }
    } catch (error) {
      console.error('❌ Error en handleCreateOrUpdate:', error);
      throw error;
    }
  }, [formData, mediaFiles, createHook.createPublication, updateHook.updatePublication]);

  return {
    // Estado esencial
    formData,
    mediaFiles,
    isProcessing: createHook.isCreating || updateHook.isUpdating,
    error: createHook.error || updateHook.error,
    
    // Acciones esenciales
    updateContent,
    togglePlatform,
    setContentType,
    handleMediaUpload,
    removeMediaFile,
    handleDateTimeChange,
    resetForm,
    
    // Acción principal
    handleCreateOrUpdate
  };
}