"use client";

import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Stack,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconEye,
  IconDeviceMobile,
  IconPhoto,
} from "@tabler/icons-react";
import { SocialMediaPostType } from "../types";
import { FacebookPreview } from "./previews/FacebookPreview";
import { InstagramPreview } from "./previews/InstagramPreview";
import { MobileDeviceWrapper } from "./previews/MobileDeviceWrapper";
import { FacebookReelPreview } from "./previews/FacebookReelPreview";
import { FacebookStoryPreview } from "./previews/FacebookStoryPreview";
import { InstagramReelPreview } from "./previews/InstagramReelPreview";
import { InstagramStoryPreview } from "./previews/InstagramStoryPreview";


interface SocialPreviewProps {
  formData: SocialMediaPostType;
  hasImage: boolean;
  selectedContentTypes?: Record<string, string>;
  mediaFiles?: Array<{
    id: string;
    file: File;
    type: 'image' | 'video' | 'gif' | 'document';
    url?: string;
    size: number;
  }>;
}

export const SocialPreview: React.FC<SocialPreviewProps> = ({
  formData,
  hasImage,
  selectedContentTypes = {},
  mediaFiles = [],
}) => {
  const theme = useTheme();
  
  // 🎯 Filtrar solo plataformas seleccionadas
  const selectedPlatforms = formData.platforms || [];
  const [selectedPlatform, setSelectedPlatform] = React.useState(() => {
    // Inicializar con la primera plataforma seleccionada
    return selectedPlatforms.length > 0 ? selectedPlatforms[0] : "facebook";
  });
  const [viewMode, setViewMode] = React.useState<"desktop" | "mobile">("desktop");

  // 🔄 Auto-seleccionar la primera plataforma disponible si la actual no está seleccionada
  React.useEffect(() => {
    if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(selectedPlatform)) {
      setSelectedPlatform(selectedPlatforms[0]);
    }
  }, [selectedPlatforms, selectedPlatform]);

  // 🚫 Si no hay plataformas seleccionadas, mostrar mensaje
  if (selectedPlatforms.length === 0) {
    return (
      <Box sx={{ 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center'
      }}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          Selecciona una plataforma
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Para ver la previsualización, primero selecciona al menos una plataforma social.
        </Typography>
      </Box>
    );
  }

  const renderPreview = () => {
    // 🎯 Obtener el tipo de contenido para la plataforma seleccionada
    const contentType = selectedContentTypes[selectedPlatform] || 'post';
    
    console.log('🎨 Preview Debug:', {
      selectedPlatform,
      contentType,
      selectedContentTypes,
      formDataContent: formData.content
    });
    
    let previewComponent;
    let shouldUseMobileWrapper = false;
    
    if (selectedPlatform === 'facebook') {
      // 🚀 Facebook: diferentes previews según el tipo de contenido
      switch (contentType.toLowerCase()) {
        case 'reel':
          // 📱 Los REELS siempre son móviles (9:16), usar MobileDeviceWrapper
          previewComponent = <FacebookReelPreview formData={formData} hasImage={hasImage} mediaFiles={mediaFiles} />;
          shouldUseMobileWrapper = true;
          break;
        case 'historia':
        case 'story':
          // 📱 Los STORIES siempre son móviles (9:16), usar MobileDeviceWrapper
          previewComponent = <FacebookStoryPreview formData={formData} hasImage={hasImage} mediaFiles={mediaFiles} />;
          shouldUseMobileWrapper = true;
          break;
        default:
          // 📰 POST normal: puede ser desktop o mobile según viewMode
          previewComponent = <FacebookPreview formData={formData} hasImage={hasImage} viewMode={viewMode} mediaFiles={mediaFiles} />;
          shouldUseMobileWrapper = viewMode === 'mobile';
          break;
      }
    } else {
      // Instagram: diferentes previews según el tipo de contenido
      switch (contentType.toLowerCase()) {
        case 'reel':
          // 📱 Los REELS siempre son móviles (9:16), usar MobileDeviceWrapper
          previewComponent = <InstagramReelPreview formData={formData} hasImage={hasImage} mediaFiles={mediaFiles} />;
          shouldUseMobileWrapper = true;
          break;
        case 'historia':
        case 'story':
          // 📱 Los STORIES siempre son móviles (9:16), usar MobileDeviceWrapper
          previewComponent = <InstagramStoryPreview formData={formData} hasImage={hasImage} mediaFiles={mediaFiles} />;
          shouldUseMobileWrapper = true;
          break;
        default:
          // 📰 POST normal: puede ser desktop o mobile según viewMode
          previewComponent = <InstagramPreview formData={formData} hasImage={hasImage} viewMode={viewMode} mediaFiles={mediaFiles} />;
          shouldUseMobileWrapper = viewMode === 'mobile';
          break;
      }
    }

    // 🎯 Sistema robusto: usar MobileDeviceWrapper cuando sea necesario
    return shouldUseMobileWrapper 
      ? <MobileDeviceWrapper>{previewComponent}</MobileDeviceWrapper>
      : previewComponent;
  };

  return (
    <Box sx={{ 
      p: 3, 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Header de la previsualizaci\u00f3n con branding */}
      <Box sx={{ 
        mb: 3,
        pb: 2,
        borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(91,36,183,0.2)' : 'rgba(91,36,183,0.1)'}`,
      }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* 🎯 Solo mostrar plataformas seleccionadas */}
            {selectedPlatforms.includes('facebook') && (
              <Chip
                icon={<IconBrandFacebook size={16} />}
                label="Facebook"
                variant={selectedPlatform === 'facebook' ? 'filled' : 'outlined'}
                onClick={() => setSelectedPlatform('facebook')}
                size="small"
                sx={{ 
                  '& .MuiChip-icon': { color: '#1877F2' },
                  borderRadius: '12px',
                  fontWeight: 500,
                  ...(selectedPlatform === 'facebook' ? {
                    bgcolor: '#1877F2',
                    color: 'white',
                    boxShadow: `0 4px 12px ${theme.palette.mode === 'dark' ? 'rgba(24,119,242,0.3)' : 'rgba(24,119,242,0.2)'}`,
                    '&:hover': { bgcolor: '#1877F2' }
                  } : {
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(24,119,242,0.3)' : 'rgba(24,119,242,0.2)',
                    color: '#1877F2',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(24,119,242,0.1)' : 'rgba(24,119,242,0.05)',
                    }
                  })
                }}
              />
            )}
            {selectedPlatforms.includes('instagram') && (
              <Chip
                icon={<IconBrandInstagram size={16} />}
                label="Instagram"
                variant={selectedPlatform === 'instagram' ? 'filled' : 'outlined'}
                onClick={() => setSelectedPlatform('instagram')}
                size="small"
                sx={{ 
                  '& .MuiChip-icon': { color: '#E4405F' },
                  borderRadius: '12px',
                  fontWeight: 500,
                  ...(selectedPlatform === 'instagram' ? {
                    bgcolor: '#E4405F',
                    color: 'white',
                    boxShadow: `0 4px 12px ${theme.palette.mode === 'dark' ? 'rgba(228,64,95,0.3)' : 'rgba(228,64,95,0.2)'}`,
                    '&:hover': { bgcolor: '#E4405F' }
                  } : {
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(228,64,95,0.3)' : 'rgba(228,64,95,0.2)',
                    color: '#E4405F',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(228,64,95,0.1)' : 'rgba(228,64,95,0.05)',
                    }
                  })
                }}
              />
            )}
          </Box>
        
          {(() => {
            // 🎯 Solo mostrar controles de vista para contenido que puede alternar
            const contentType = selectedContentTypes[selectedPlatform] || 'post';
            const isAlwaysMobile = ['reel', 'historia', 'story'].includes(contentType.toLowerCase());
            
            if (isAlwaysMobile) {
              // 📱 Para Reels y Stories, mostrar solo indicador de que son móviles
              return (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: '12px',
                  bgcolor: alpha('#5b24b7', 0.08),
                  border: `1px solid ${alpha('#5b24b7', 0.15)}`
                }}>
                  <IconDeviceMobile size={16} color="#5b24b7" />
                  <Typography variant="caption" sx={{ color: '#5b24b7', fontWeight: 500 }}>
                    Formato vertical
                  </Typography>
                </Box>
              );
            }
            
            // 📰 Para Posts normales, mostrar controles de vista
            return (
              <Stack direction="row" spacing={1}>
                <Tooltip title="Vista de escritorio">
                  <IconButton 
                    size="small" 
                    onClick={() => setViewMode('desktop')}
                    sx={{ 
                      color: viewMode === 'desktop' ? theme.palette.primary.main : theme.palette.text.secondary,
                      bgcolor: viewMode === 'desktop' ? alpha('#5b24b7', 0.1) : 'transparent',
                      borderRadius: '8px',
                      '&:hover': {
                        bgcolor: alpha('#5b24b7', 0.15),
                        color: '#5b24b7',
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
                      bgcolor: viewMode === 'mobile' ? alpha('#5b24b7', 0.1) : 'transparent',
                      borderRadius: '8px',
                      '&:hover': {
                        bgcolor: alpha('#5b24b7', 0.15),
                        color: '#5b24b7',
                      }
                    }}
                  >
                    <IconDeviceMobile size={16} />
                  </IconButton>
                </Tooltip>
              </Stack>
            );
          })()}
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        {renderPreview()}
      </Box>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="caption" color="textSecondary">
          Las previsualizaciones son una aproximación y pueden variar según la plataforma
        </Typography>
      </Box>
    </Box>
  );
};