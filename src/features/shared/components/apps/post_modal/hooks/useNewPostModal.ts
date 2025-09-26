import { useState, useEffect } from "react";
import { SocialMediaPostType, LogEntry } from "../types";

interface UseNewPostModalProps {
  post: SocialMediaPostType | null;
  onSave: (postData: SocialMediaPostType) => void;
}

export const useNewPostModal = ({ post, onSave }: UseNewPostModalProps) => {
  const [formData, setFormData] = useState<SocialMediaPostType>({
    id: "",
    title: "",
    content: "dsadasdasd",
    scheduledTime: new Date(),
    platforms: ["instagram"],
    status: "draft",
    mediaUrls: [],
  });
  
  const [selectedContentTypes, setSelectedContentTypes] = useState<Record<string, string>>({
    facebook: "post",
    instagram: "post"
  });
  
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [hasImage, setHasImage] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Estados para configuraciones
  const [globalConfig, setGlobalConfig] = useState({
    autoPublish: true,
    urlShortener: false,
    hashtagOptimization: true,
  });

  const [facebookConfig, setFacebookConfig] = useState({
    autoTagFriends: false,
    locationTagging: true,
    audienceTargeting: false,
  });

  const [instagramConfig, setInstagramConfig] = useState({
    autoAddHashtags: true,
    storyHighlights: false,
    locationTagging: true,
  });

  // Inicializar formulario
  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        scheduledTime: post.scheduledTime ? new Date(post.scheduledTime) : new Date(),
      });
    } else {
      setFormData({
        id: "",
        title: "",
        content: "dsadasdasd",
        scheduledTime: new Date(),
        platforms: ["instagram"],
        status: "draft",
        mediaUrls: [],
      });
    }
  }, [post]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(null);
    };

    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [dropdownOpen]);

  // Manejar cambios en el formulario
  const handleInputChange = (field: keyof SocialMediaPostType, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Manejar cambio de fecha y hora
  const handleDateTimeChange = (newValue: unknown) => {
    if (newValue instanceof Date) {
      setFormData(prev => ({ ...prev, scheduledTime: newValue }));
    }
  };

  // Toggle plataforma
  const togglePlatform = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  // Manejar cambio de tipo de contenido
  const handleContentTypeChange = (platform: string, contentType: string) => {
    setSelectedContentTypes(prev => ({
      ...prev,
      [platform]: contentType
    }));
    setDropdownOpen(null);
  };

  // Obtener tipo de contenido actual
  const getCurrentContentType = (platform: string) => {
    return selectedContentTypes[platform] || "post";
  };

  // Guardar post
  const handleSave = () => {
    onSave(formData);
  };

  // Función para generar logs basados en el contenido
  const generateLogs = () => {
    const newLogs: LogEntry[] = [];

    // Validar que siempre haya al menos una red social seleccionada
    if (formData.platforms.length === 0) {
      newLogs.push({
        id: 'no-platform-error',
        type: 'error',
        message: 'Debe seleccionar al menos una red social.',
      });
    }

    // Validar contenido
    if (!formData.content || formData.content.trim().length === 0) {
      newLogs.push({
        id: 'content-error',
        type: 'error',
        message: 'Se requiere al menos un carácter de texto o un recurso visual.',
      });
    }

    // Validar imágenes para Instagram (solo si Instagram está seleccionado)
    if (formData.platforms.includes('instagram') && (!formData.mediaUrls || formData.mediaUrls.length === 0)) {
      newLogs.push({
        id: 'instagram-media-error',
        type: 'warning',
        platform: 'instagram',
        message: 'Se debe incluir al menos 1 imagen o vídeo.',
      });
    }

    // Validar longitud de contenido para Facebook (solo si Facebook está seleccionado)
    if (formData.platforms.includes('facebook') && formData.content && formData.content.length > 63206) {
      newLogs.push({
        id: 'facebook-length-warning',
        type: 'warning',
        platform: 'facebook',
        message: 'El contenido excede el límite recomendado de 63,206 caracteres.',
      });
    }

    // Validar hashtags
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

    // Validar URLs
    if (formData.content && formData.content.includes('http')) {
      newLogs.push({
        id: 'url-info',
        type: 'info',
        message: 'Se detectó una URL en el contenido. Se aplicará el acortador automáticamente.',
      });
    }

    setLogs(newLogs);
  };

  // Actualizar logs cuando cambie el contenido o las plataformas
  useEffect(() => {
    generateLogs();
  }, [formData.content, formData.platforms, formData.mediaUrls]);

  // Validar si el formulario es válido
  const isValid = formData.platforms.length > 0 && 
                  formData.content && 
                  formData.content.trim().length > 0 &&
                  logs.filter(log => log.type === 'error').length === 0;

  return {
    formData,
    selectedContentTypes,
    dropdownOpen,
    viewMode,
    hasImage,
    logs,
    globalConfig,
    facebookConfig,
    instagramConfig,
    handleInputChange,
    handleDateTimeChange,
    togglePlatform,
    handleContentTypeChange,
    getCurrentContentType,
    handleSave,
    setDropdownOpen,
    setViewMode,
    setHasImage,
    setGlobalConfig,
    setFacebookConfig,
    setInstagramConfig,
    isValid,
  };
}; 