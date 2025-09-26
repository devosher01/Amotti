"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Stack,
  IconButton,
  useTheme,
  TextField,
  Button,
  Chip,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Avatar,
  Tooltip,
  Grid,
} from "@mui/material";
import {
  IconX,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconBrandTiktok,
  IconPlus,
  IconCheck,
  IconPhoto,
  IconMoodSmile,
  IconHash,
  IconMapPin,
  IconLink,
  IconVideo,
  IconEye,
  IconDeviceMobile,
  IconCalendar,
  IconClock,
  IconSettings,
  IconEdit,
  IconChevronDown,
} from "@tabler/icons-react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { SocialMediaPostType } from "./types";
import ConfigurationSection from "./ConfigurationSection";
import LogsSection, { LogEntry } from "./LogsSection";

interface NewPostModalProps {
  open: boolean;
  post: SocialMediaPostType | null;
  onClose: () => void;
  onSave: (postData: SocialMediaPostType) => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({
  open,
  post,
  onClose,
  onSave,
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<SocialMediaPostType>({
    id: "",
    title: "",
    content: "dsadasdasd",
    scheduledTime: new Date(),
    platforms: ["instagram"],
    status: "draft",
    mediaUrls: [],
  });
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [autoPublish, setAutoPublish] = useState(true);
  const [urlShortener, setUrlShortener] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [selectedContentTypes, setSelectedContentTypes] = useState<Record<string, string>>({
    facebook: "post",
    instagram: "post"
  });
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

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

  // Estados para logs
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Plataformas disponibles con tipos de contenido
  const platforms = [
    {
      value: "facebook",
      label: "Facebook",
      icon: <IconBrandFacebook size={20} />,
      color: "#1877F2",
      contentTypes: [
        { value: "post", label: "POST", icon: <IconPhoto size={16} />, description: "Publicación estándar" },
        { value: "reel", label: "REEL", icon: <IconVideo size={16} />, description: "Video corto vertical" },
        { value: "story", label: "HISTORIA", icon: <IconPlus size={16} />, description: "Contenido temporal 24h" }
      ]
    },
    {
      value: "instagram",
      label: "Instagram",
      icon: <IconBrandInstagram size={20} />,
      color: "#E4405F",
      contentTypes: [
        { value: "post", label: "POST", icon: <IconPhoto size={16} />, description: "Publicación estándar" },
        { value: "reel", label: "REEL", icon: <IconVideo size={16} />, description: "Video corto vertical" },
        { value: "story", label: "HISTORIA", icon: <IconPlus size={16} />, description: "Contenido temporal 24h" },
        { value: "carousel", label: "CARRUSEL", icon: <IconPhoto size={16} />, description: "Múltiples imágenes" }
      ]
    }
  ];

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
        platforms: ["facebook"],
        status: "draft",
        mediaUrls: [],
      });
    }
  }, [post, open]);

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

    // Renderizar previsualización de Facebook
  const renderFacebookPreview = () => (
    <Box sx={{ 
      bgcolor: theme.palette.mode === 'dark' ? '#242526' : '#ffffff',
      borderRadius: '8px',
      border: theme.palette.mode === 'dark' ? '1px solid #3a3b3c' : '1px solid #dddfe2',
      maxWidth: viewMode === 'mobile' ? 375 : 500,
      width: viewMode === 'mobile' ? 375 : 'auto',
      boxShadow: theme.palette.mode === 'dark' 
        ? '0 1px 2px rgba(0,0,0,0.2)' 
        : '0 1px 2px rgba(0,0,0,0.1)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      ...(viewMode === 'mobile' && {
        borderRadius: 0,
        border: 'none',
        boxShadow: 'none'
      })
    }}>
      {/* Header del post */}
      <Box sx={{ p: '12px 16px 0 16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: '12px' }}>
          {/* Avatar */}
          <Box sx={{ 
            width: 40, 
            height: 40,
            borderRadius: '50%',
            bgcolor: '#1877F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: '12px',
            color: 'white',
            fontWeight: 600,
            fontSize: '18px'
          }}>
            T
          </Box>
          
          {/* Info de la página */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', mb: '4px' }}>
              <Typography sx={{ 
                fontWeight: 600,
                fontSize: '15px',
                lineHeight: '20px',
                color: theme.palette.mode === 'dark' ? '#e4e6ea' : '#050505',
                fontFamily: 'inherit'
              }}>
                Taktiko
              </Typography>
              {/* Badge verificado */}
              <Box sx={{
                width: '12px',
                height: '12px',
                bgcolor: '#1877F2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ml: '2px'
              }}>
                <Box sx={{ color: 'white', fontSize: '8px', fontWeight: 'bold' }}>✓</Box>
              </Box>
            </Box>
            
            {/* Timestamp y privacidad */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Typography sx={{ 
                fontSize: '13px',
                color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
                fontFamily: 'inherit'
              }}>
                {(formData.scheduledTime || new Date()).toLocaleDateString('es-ES', { 
                  day: 'numeric', 
                  month: 'short' 
                })} a las {(formData.scheduledTime || new Date()).toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Typography>
              <Typography sx={{ 
                fontSize: '13px',
                color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
                mx: '2px'
              }}>
                ·
              </Typography>
              <Box sx={{ 
                width: '12px', 
                height: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="12" height="12" viewBox="0 0 16 16" style={{ 
                  fill: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b' 
                }}>
                  <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
                  <path d="M8 4c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1s1-.4 1-1V5c0-.6-.4-1-1-1z"/>
                  <circle cx="8" cy="11" r="1"/>
                </svg>
              </Box>
            </Box>
          </Box>
          
          {/* Menú tres puntos */}
          <IconButton sx={{ 
            p: '8px',
            color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? '#3a3b3c' : '#f2f3f4'
            }
          }}>
            <Box sx={{ fontSize: '20px' }}>⋯</Box>
          </IconButton>
        </Box>
      </Box>

      {/* Contenido del post */}
      <Box sx={{ px: '16px', pb: '12px' }}>
        <Typography sx={{ 
          fontSize: '15px',
          lineHeight: '20px',
          color: theme.palette.mode === 'dark' ? '#e4e6ea' : '#050505',
          fontFamily: 'inherit',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}>
          {formData.content || "dsadasdasd"}
        </Typography>
      </Box>

      {/* Imagen del post */}
      {hasImage && (
        <Box sx={{ 
          width: '100%', 
          aspectRatio: '16/9',
          bgcolor: theme.palette.mode === 'dark' ? '#3a3b3c' : '#f0f2f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: theme.palette.mode === 'dark' ? '1px solid #3a3b3c' : '1px solid #dddfe2',
          borderBottom: theme.palette.mode === 'dark' ? '1px solid #3a3b3c' : '1px solid #dddfe2'
        }}>
          <IconPhoto size={60} color={theme.palette.mode === 'dark' ? '#65676b' : '#8a8d91'} />
        </Box>
      )}

      {/* Reacciones y estadísticas */}
      <Box sx={{ px: '16px', py: '8px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '8px' }}>
          {/* Reacciones */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '-2px' }}>
              {/* Like icon */}
              <Box sx={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                bgcolor: '#1877F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid ' + (theme.palette.mode === 'dark' ? '#242526' : '#ffffff'),
                zIndex: 3
              }}>
                <Box sx={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>👍</Box>
              </Box>
              {/* Love icon */}
              <Box sx={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                bgcolor: '#e91e63',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid ' + (theme.palette.mode === 'dark' ? '#242526' : '#ffffff'),
                ml: '-6px',
                zIndex: 2
              }}>
                <Box sx={{ color: 'white', fontSize: '10px' }}>❤️</Box>
              </Box>
            </Box>
            <Typography sx={{ 
              fontSize: '15px',
              color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
              ml: '6px',
              fontFamily: 'inherit'
            }}>
              Tú y 42 personas más
            </Typography>
          </Box>
          
          {/* Comentarios y compartir */}
          <Box sx={{ display: 'flex', gap: '12px' }}>
            <Typography sx={{ 
              fontSize: '15px',
              color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}>
              8 comentarios
            </Typography>
            <Typography sx={{ 
              fontSize: '15px',
              color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}>
              2 veces compartido
            </Typography>
          </Box>
        </Box>
        
        {/* Línea divisoria */}
        <Box sx={{ 
          height: '1px',
          bgcolor: theme.palette.mode === 'dark' ? '#3a3b3c' : '#ced0d4',
          my: '8px'
        }} />
        
        {/* Botones de acción */}
        <Box sx={{ display: 'flex' }}>
          <Button sx={{ 
            flex: 1,
            py: '8px',
            color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
            fontSize: '15px',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '6px',
            justifyContent: 'center',
            gap: '8px',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? '#3a3b3c' : '#f2f3f4'
            }
          }}>
            <Box sx={{ fontSize: '18px' }}>👍</Box>
            Me gusta
          </Button>
          
          <Button sx={{ 
            flex: 1,
            py: '8px',
            color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
            fontSize: '15px',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '6px',
            justifyContent: 'center',
            gap: '8px',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? '#3a3b3c' : '#f2f3f4'
            }
          }}>
            <Box sx={{ fontSize: '18px' }}>💬</Box>
            Comentar
          </Button>
          
          <Button sx={{ 
            flex: 1,
            py: '8px',
            color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
            fontSize: '15px',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '6px',
            justifyContent: 'center',
            gap: '8px',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? '#3a3b3c' : '#f2f3f4'
            }
          }}>
            <Box sx={{ fontSize: '18px' }}>↗️</Box>
            Compartir
          </Button>
        </Box>
      </Box>
    </Box>
  );

  // Renderizar previsualización de Instagram
  const renderInstagramPreview = () => (
    <Box sx={{ 
      bgcolor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
      borderRadius: '8px',
      border: theme.palette.mode === 'dark' ? '1px solid #262626' : '1px solid #dbdbdb',
      maxWidth: viewMode === 'mobile' ? 375 : 470,
      width: viewMode === 'mobile' ? 375 : 'auto',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      ...(viewMode === 'mobile' && {
        borderRadius: 0,
        border: 'none'
      })
    }}>
      {/* Header del post */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        px: viewMode === 'mobile' ? '12px' : '16px',
        py: viewMode === 'mobile' ? '12px' : '14px',
        borderBottom: theme.palette.mode === 'dark' ? 'none' : '1px solid #efefef'
      }}>
        {/* Avatar con gradiente */}
        <Box sx={{ 
          width: viewMode === 'mobile' ? '28px' : '32px', 
          height: viewMode === 'mobile' ? '28px' : '32px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: '2px',
          mr: viewMode === 'mobile' ? '8px' : '12px'
        }}>
          <Box sx={{
            width: viewMode === 'mobile' ? '24px' : '28px',
            height: viewMode === 'mobile' ? '24px' : '28px',
            borderRadius: '50%',
            bgcolor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
            fontSize: viewMode === 'mobile' ? '12px' : '14px',
            fontWeight: 600
          }}>
            T
          </Box>
        </Box>
        
        {/* Username */}
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ 
            fontWeight: 600,
            fontSize: viewMode === 'mobile' ? '13px' : '14px',
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
            fontFamily: 'inherit'
          }}>
            taktiko
          </Typography>
        </Box>
        
        {/* Menú tres puntos */}
        <IconButton sx={{ 
          p: '8px',
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626'
        }}>
          <Box sx={{ fontSize: '16px', transform: 'rotate(90deg)' }}>⋯</Box>
        </IconButton>
      </Box>

      {/* Imagen principal */}
      <Box sx={{ 
        width: '100%', 
        aspectRatio: '1/1',
        bgcolor: theme.palette.mode === 'dark' ? '#262626' : '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <IconPhoto size={60} color={theme.palette.mode === 'dark' ? '#737373' : '#c7c7c7'} />
      </Box>

      {/* Botones de acción */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        px: viewMode === 'mobile' ? '12px' : '16px',
        py: viewMode === 'mobile' ? '10px' : '12px'
      }}>
        {/* Lado izquierdo: Like, Comment, Share */}
        <Box sx={{ display: 'flex', gap: viewMode === 'mobile' ? '12px' : '16px' }}>
          <IconButton sx={{ 
            p: 0,
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
            '&:hover': { opacity: 0.7 }
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" 
                    fill="currentColor"/>
            </svg>
          </IconButton>
          
          <IconButton sx={{ 
            p: 0,
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
            '&:hover': { opacity: 0.7 }
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeLinejoin="round" 
                    strokeWidth="2"/>
            </svg>
          </IconButton>
          
          <IconButton sx={{ 
            p: 0,
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
            '&:hover': { opacity: 0.7 }
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="22" y1="2" x2="9.218" y2="10.083" 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2"/>
              <polygon points="11.698,20.334 22,2 2,8.667 11.698,14.668 " 
                       fill="none" 
                       stroke="currentColor" 
                       strokeLinecap="round" 
                       strokeLinejoin="round" 
                       strokeWidth="2"/>
            </svg>
          </IconButton>
        </Box>
        
        {/* Lado derecho: Bookmark */}
        <IconButton sx={{ 
          p: 0,
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
          '&:hover': { opacity: 0.7 }
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21" 
                     fill="none" 
                     stroke="currentColor" 
                     strokeLinecap="round" 
                     strokeLinejoin="round" 
                     strokeWidth="2"/>
          </svg>
        </IconButton>
      </Box>

      {/* Likes */}
      <Box sx={{ px: viewMode === 'mobile' ? '12px' : '16px', pb: '8px' }}>
        <Typography sx={{ 
          fontWeight: 600,
          fontSize: viewMode === 'mobile' ? '13px' : '14px',
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
          fontFamily: 'inherit'
        }}>
          Les gusta a <span style={{ fontWeight: 600 }}>carlos_dev</span> y <span style={{ fontWeight: 600 }}>42 personas más</span>
        </Typography>
      </Box>

      {/* Contenido del post */}
      <Box sx={{ px: viewMode === 'mobile' ? '12px' : '16px', pb: '4px' }}>
        <Typography sx={{ 
          fontSize: viewMode === 'mobile' ? '13px' : '14px',
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
          fontFamily: 'inherit',
          lineHeight: '18px'
        }}>
          <span style={{ fontWeight: 600, marginRight: '4px' }}>taktiko</span>
          {formData.content || "dsadasdasd"}
        </Typography>
      </Box>

      {/* Ver todos los comentarios */}
      <Box sx={{ px: viewMode === 'mobile' ? '12px' : '16px', pb: '4px' }}>
        <Typography sx={{ 
          fontSize: viewMode === 'mobile' ? '13px' : '14px',
          color: theme.palette.mode === 'dark' ? '#a8a8a8' : '#8e8e8e',
          fontFamily: 'inherit',
          cursor: 'pointer',
          '&:hover': { opacity: 0.7 }
        }}>
          Ver los 12 comentarios
        </Typography>
      </Box>

      {/* Comentario ejemplo */}
      <Box sx={{ px: viewMode === 'mobile' ? '12px' : '16px', pb: '4px' }}>
        <Typography sx={{ 
          fontSize: viewMode === 'mobile' ? '13px' : '14px',
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
          fontFamily: 'inherit',
          lineHeight: '18px'
        }}>
          <span style={{ fontWeight: 600, marginRight: '4px' }}>maria.design</span>
          ¡Increíble trabajo! 🔥
          <IconButton sx={{ 
            p: 0, 
            ml: '8px',
            color: theme.palette.mode === 'dark' ? '#a8a8a8' : '#8e8e8e',
            fontSize: '12px'
          }}>
            ♡
          </IconButton>
        </Typography>
      </Box>

      {/* Tiempo */}
      <Box sx={{ px: viewMode === 'mobile' ? '12px' : '16px', pb: '12px' }}>
        <Typography sx={{ 
          fontSize: '10px',
          color: theme.palette.mode === 'dark' ? '#a8a8a8' : '#8e8e8e',
          fontFamily: 'inherit',
          textTransform: 'uppercase',
          letterSpacing: '0.2px',
          fontWeight: 400
        }}>
          HACE 2 HORAS
        </Typography>
      </Box>

      {/* Agregar comentario */}
      <Box sx={{ 
        borderTop: theme.palette.mode === 'dark' ? '1px solid #262626' : '1px solid #efefef',
        px: viewMode === 'mobile' ? '12px' : '16px',
        py: viewMode === 'mobile' ? '10px' : '12px',
        display: 'flex',
        alignItems: 'center',
        gap: viewMode === 'mobile' ? '8px' : '12px'
      }}>
        <IconButton sx={{ 
          p: 0,
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <circle cx="19" cy="12" r="2" fill="currentColor"/>
            <circle cx="5" cy="12" r="2" fill="currentColor"/>
          </svg>
        </IconButton>
        
        <Typography sx={{ 
          fontSize: viewMode === 'mobile' ? '13px' : '14px',
          color: theme.palette.mode === 'dark' ? '#a8a8a8' : '#8e8e8e',
          fontFamily: 'inherit',
          flex: 1
        }}>
          Agrega un comentario...
        </Typography>
        
        <Typography sx={{ 
          fontSize: viewMode === 'mobile' ? '13px' : '14px',
          color: '#0095f6',
          fontFamily: 'inherit',
          fontWeight: 600,
          cursor: 'pointer',
          '&:hover': { opacity: 0.7 }
        }}>
          Publicar
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Dialog 
      open={open} 
      onClose={() => {}} // Deshabilitar cierre con Escape o clic fuera
      maxWidth="xl" 
      fullWidth
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          borderRadius: 1,
          height: '90vh',
          maxHeight: '90vh',
          width: '95vw',
          maxWidth: '95vw',
          overflow: 'hidden'
        }
      }}
    >
      <DialogContent sx={{ p: 0, height: '100%' }}>
        <Grid container sx={{ height: '100%' }}>
          {/* COLUMNA IZQUIERDA - ÁREA DE EDICIÓN */}
          <Grid item xs={12} md={7} sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Stack spacing={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* 1. Encabezado superior */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" fontWeight={600}>
                  Crear nueva publicación
                </Typography>
                <IconButton onClick={onClose} size="small">
                  <IconX size={20} />
                </IconButton>
              </Box>

              {/* 2. Selector de redes sociales */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Redes sociales
                  </Typography>
                  {/* <Chip 
                    size="small" 
                    label={`${formData.platforms.length} seleccionada${formData.platforms.length !== 1 ? 's' : ''}`}
                    color={formData.platforms.length === 0 ? "error" : "primary"}
                    variant="outlined"
                  /> */}
                </Box>
                
                {/* Fila de pares: icono + botón dropdown para cada red social */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {platforms.map((platform) => {
                    const isSelected = formData.platforms.includes(platform.value);
                    const currentContentType = getCurrentContentType(platform.value);
                    
                    return (
                      <Box key={platform.value} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* Icono clickeable de la red social */}
                        <Tooltip title={isSelected ? `Deseleccionar ${platform.label}` : `Seleccionar ${platform.label}`}>
                          <IconButton
                            onClick={() => togglePlatform(platform.value)}
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 1,
                              bgcolor: isSelected ? platform.color : 'transparent',
                              color: isSelected ? 'white' : theme.palette.text.secondary,
                              border: `1px solid ${isSelected ? platform.color : theme.palette.divider}`,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: isSelected ? platform.color : theme.palette.action.hover,
                                transform: 'scale(1.05)',
                              },
                              '&:active': {
                                transform: 'scale(0.95)',
                              }
                            }}
                          >
                            {platform.icon}
                          </IconButton>
                        </Tooltip>
                        
                        {/* Botón dropdown para tipo de contenido */}
                        <Box sx={{ position: 'relative' }}>
                          <Button
                            variant="outlined"
                            size="small"
                            disabled={!isSelected}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isSelected) {
                                setDropdownOpen(dropdownOpen === platform.value ? null : platform.value);
                              }
                            }}
                            sx={{
                              minWidth: 120,
                              height: 32,
                              textTransform: 'none',
                              fontSize: '12px',
                              fontWeight: 500,
                              borderColor: theme.palette.divider,
                              color: theme.palette.text.primary,
                              bgcolor: theme.palette.background.paper,
                              '&:hover': {
                                borderColor: theme.palette.primary.main,
                                bgcolor: theme.palette.background.paper, // No cambiar fondo en hover
                                color: theme.palette.text.primary
                              },
                              '&.Mui-disabled': {
                                opacity: 0.5,
                                bgcolor: theme.palette.action.disabledBackground,
                              }
                            }}
                            endIcon={<IconChevronDown size={14} />}
                          >
                            {/* Mostrar el label del tipo de contenido seleccionado */}
                            {(() => {
                              const selectedType = platform.contentTypes.find(
                                (ct) => ct.value === currentContentType
                              );
                              return selectedType ? selectedType.label : 'TIPO';
                            })()}
                          </Button>
                          
                          {/* Dropdown de tipos de contenido */}
                          {dropdownOpen === platform.value && isSelected && (
                            <Box
                              onClick={(e) => e.stopPropagation()}
                              sx={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                mt: 0.5,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                boxShadow: theme.shadows[3],
                                border: `1px solid ${theme.palette.divider}`,
                                zIndex: 1000,
                                py: 0.5,
                                minWidth: 150
                              }}
                            >
                              {platform.contentTypes.map((contentType) => (
                                <Box
                                  key={contentType.value}
                                  onClick={() => handleContentTypeChange(platform.value, contentType.value)}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    px: 2,
                                    py: 1,
                                    cursor: 'pointer',
                                    '&:hover': {
                                      bgcolor: theme.palette.action.hover
                                    },
                                    bgcolor: currentContentType === contentType.value ? theme.palette.action.selected : 'transparent'
                                  }}
                                >
                                  <Box sx={{ color: theme.palette.text.secondary }}>
                                    {contentType.icon}
                                  </Box>
                                  <Box>
                                    <Typography variant="body2" fontWeight={500}>
                                      {contentType.label}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {contentType.description}
                                    </Typography>
                                  </Box>
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              {/* 3. Área de texto de la publicación */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <TextField
                  multiline
                  rows={6}
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="¿Qué quieres compartir?"
                  variant="outlined"
                  fullWidth
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      fontSize: '1rem',
                      lineHeight: 1.5,
                      height: '100%',
                      '& textarea': {
                        height: '100% !important',
                        resize: 'none'
                      }
                    }
                  }}
                />
              
              {/* 4. Miniatura de imagen adjunta */}
              {hasImage && (
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  bgcolor: theme.palette.grey[200], 
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <IconPhoto size={24} color={theme.palette.grey[400]} />
                  <IconButton 
                    size="small" 
                    sx={{ 
                      position: 'absolute', 
                      top: -8, 
                      right: -8,
                      bgcolor: 'white',
                      boxShadow: 1
                    }}
                  >
                    <IconX size={12} />
                  </IconButton>
                </Box>
              )}

              {/* 5. Barra de herramientas inferior */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                pt: 1,
                borderTop: `1px solid ${theme.palette.divider}`
              }}>
                <Tooltip title="Agregar imagen">
                  <IconButton size="small" onClick={() => setHasImage(!hasImage)}>
                    <IconPhoto size={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Agregar emoji">
                  <IconButton size="small">
                    <IconMoodSmile size={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Agregar hashtag">
                  <IconButton size="small">
                    <IconHash size={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Agregar ubicación">
                  <IconButton size="small">
                    <IconMapPin size={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Agregar enlace">
                  <IconButton size="small">
                    <IconLink size={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Agregar video">
                  <IconButton size="small">
                    <IconVideo size={20} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

              {/* 7. Configuraciones y Logs */}
              <Stack spacing={1}>
                <ConfigurationSection
                  items={[
                    {
                      id: 'global',
                      title: 'Configuración global',
                      icon: <IconSettings size={16} />,
                      color: theme.palette.primary.main,
                      settings: [
                        {
                          label: 'Auto publicar',
                          value: globalConfig.autoPublish,
                          onChange: (value) => setGlobalConfig(prev => ({ ...prev, autoPublish: value })),
                          description: 'Publicar automáticamente en la fecha programada'
                        },
                        {
                          label: 'Acortador de URLs',
                          value: globalConfig.urlShortener,
                          onChange: (value) => setGlobalConfig(prev => ({ ...prev, urlShortener: value })),
                          description: 'Acortar automáticamente las URLs en el contenido'
                        },
                        {
                          label: 'Optimización de hashtags',
                          value: globalConfig.hashtagOptimization,
                          onChange: (value) => setGlobalConfig(prev => ({ ...prev, hashtagOptimization: value })),
                          description: 'Optimizar automáticamente los hashtags para mejor alcance'
                        }
                      ]
                    },
                    ...(formData.platforms.includes('instagram') ? [{
                      id: 'instagram',
                      title: 'Configuración de Instagram',
                      icon: <IconBrandInstagram size={16} />,
                      color: '#E4405F',
                      settings: [
                        {
                          label: 'Agregar hashtags automáticamente',
                          value: instagramConfig.autoAddHashtags,
                          onChange: (value: boolean) => setInstagramConfig(prev => ({ ...prev, autoAddHashtags: value })),
                          description: 'Agregar hashtags relevantes automáticamente'
                        },
                        {
                          label: 'Destacar en historias',
                          value: instagramConfig.storyHighlights,
                          onChange: (value: boolean) => setInstagramConfig(prev => ({ ...prev, storyHighlights: value })),
                          description: 'Guardar automáticamente en destacados'
                        },
                        {
                          label: 'Etiquetado de ubicación',
                          value: instagramConfig.locationTagging,
                          onChange: (value: boolean) => setInstagramConfig(prev => ({ ...prev, locationTagging: value })),
                          description: 'Permitir etiquetado de ubicaciones'
                        }
                      ]
                    }] : [])
                  ]}
                />
                
                <LogsSection logs={logs} />
              </Stack>

              {/* 8. Footer con acciones */}
              <Box sx={{ 
                pt: 2,
                borderTop: `1px solid ${theme.palette.divider}`,
                mt: 'auto'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Botón Cancelar */}
                  <Button 
                    variant="outlined" 
                    onClick={onClose}
                    sx={{ textTransform: 'none' }}
                  >
                    Cancelar
                  </Button>

                  {/* Selector de fecha y hora */}
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                    <DateTimePicker
                      value={formData.scheduledTime}
                      onChange={handleDateTimeChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          sx={{ minWidth: 200 }}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                                <IconCalendar size={16} style={{ marginRight: 4 }} />
                                <IconClock size={16} />
                              </Box>
                            )
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>

                  {/* Botón Programar */}
                  <Button 
                    variant="contained" 
                    onClick={handleSave}
                    startIcon={<IconCheck size={16} />}
                    sx={{ 
                      textTransform: 'none',
                      px: 3,
                      py: 1
                    }}
                  >
                    Programar
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Grid>

          {/* COLUMNA DERECHA - PREVISUALIZACIÓN */}
          <Grid item xs={12} md={5} sx={{ 
            bgcolor: theme.palette.mode === 'dark' ? '#2A3447' : '#f8f9fa', 
            p: 3, 
            display: 'flex', 
            flexDirection: 'column',
            borderLeft: `1px solid ${theme.palette.divider}`
          }}>
            {/* Selector de plataforma para preview */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  icon={<IconBrandFacebook size={16} />}
                  label="Facebook"
                  variant={selectedPlatform === 'facebook' ? 'filled' : 'outlined'}
                  onClick={() => setSelectedPlatform('facebook')}
                  size="small"
                  sx={{ 
                    '& .MuiChip-icon': { color: '#1877F2' },
                    ...(selectedPlatform === 'facebook' && {
                      bgcolor: '#1877F2',
                      color: 'white',
                      '&:hover': { bgcolor: '#1877F2' }
                    })
                  }}
                />
                <Chip
                  icon={<IconBrandInstagram size={16} />}
                  label="Instagram"
                  variant={selectedPlatform === 'instagram' ? 'filled' : 'outlined'}
                  onClick={() => setSelectedPlatform('instagram')}
                  size="small"
                  sx={{ 
                    '& .MuiChip-icon': { color: '#E4405F' },
                    ...(selectedPlatform === 'instagram' && {
                      bgcolor: '#E4405F',
                      color: 'white',
                      '&:hover': { bgcolor: '#E4405F' }
                    })
                  }}
                />
              </Box>
              
              <Stack direction="row" spacing={1}>
                <Tooltip title="Vista de escritorio">
                  <IconButton 
                    size="small" 
                    onClick={() => setViewMode('desktop')}
                    sx={{ 
                      color: viewMode === 'desktop' ? theme.palette.primary.main : theme.palette.text.secondary,
                      bgcolor: viewMode === 'desktop' ? theme.palette.primary.light : 'transparent',
                      '&:hover': {
                        bgcolor: viewMode === 'desktop' ? theme.palette.primary.light : theme.palette.action.hover
                      }
                    }}
                  >
                    <IconEye size={16} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Vista móvil">
                  <IconButton 
                    size="small" 
                    onClick={() => setViewMode('mobile')}
                    sx={{ 
                      color: viewMode === 'mobile' ? theme.palette.primary.main : theme.palette.text.secondary,
                      bgcolor: viewMode === 'mobile' ? theme.palette.primary.light : 'transparent',
                      '&:hover': {
                        bgcolor: viewMode === 'mobile' ? theme.palette.primary.light : theme.palette.action.hover
                      }
                    }}
                  >
                    <IconDeviceMobile size={16} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>

            {/* Vista previa del post */}
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              {viewMode === 'mobile' ? (
                <Box sx={{
                  bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f0f0f0',
                  borderRadius: '20px',
                  p: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  border: '4px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#333' : '#ddd'
                }}>
                  {/* Notch */}
                  <Box sx={{
                    width: '120px',
                    height: '20px',
                    bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f0f0f0',
                    borderRadius: '0 0 15px 15px',
                    mx: 'auto',
                    mb: '8px',
                    position: 'relative'
                  }}>
                    <Box sx={{
                      position: 'absolute',
                      top: '6px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60px',
                      height: '8px',
                      bgcolor: theme.palette.mode === 'dark' ? '#333' : '#999',
                      borderRadius: '4px'
                    }} />
                  </Box>
                  
                  {/* Contenido del dispositivo */}
                  <Box sx={{
                    width: '375px',
                    height: '667px',
                    bgcolor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    {selectedPlatform === 'facebook' ? renderFacebookPreview() : renderInstagramPreview()}
                  </Box>
                </Box>
              ) : (
                selectedPlatform === 'facebook' ? renderFacebookPreview() : renderInstagramPreview()
              )}
            </Box>

            {/* Nota de advertencia */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="caption" color="textSecondary">
                Las previsualizaciones son una aproximación y pueden variar según la plataforma
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostModal; 