"use client";

import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { IconPhoto } from "@tabler/icons-react";
import { SocialMediaPostType } from "../../types";
import { CustomVideoPlayer } from "../../../../../planning/ui/components/PostCreationDialog/components/CustomVideoPlayer";

interface InstagramPreviewProps {
  formData: SocialMediaPostType;
  hasImage: boolean;
  viewMode: "desktop" | "mobile";
  mediaFiles?: Array<{
    id: string;
    file: File;
    type: 'image' | 'video' | 'gif' | 'document';
    url?: string;
    size: number;
  }>;
}

export const InstagramPreview: React.FC<InstagramPreviewProps> = ({
  formData,
  hasImage,
  viewMode,
  mediaFiles = [],
}) => {
  const theme = useTheme();

  return (
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
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        px: viewMode === 'mobile' ? '12px' : '16px',
        py: viewMode === 'mobile' ? '12px' : '14px',
        borderBottom: theme.palette.mode === 'dark' ? 'none' : '1px solid #efefef'
      }}>
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
        
        <IconButton sx={{ 
          p: '8px',
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626'
        }}>
          <Box sx={{ fontSize: '16px', transform: 'rotate(90deg)' }}>⋯</Box>
        </IconButton>
      </Box>

      <Box sx={{ 
        width: '100%', 
        aspectRatio: '1/1',
        bgcolor: theme.palette.mode === 'dark' ? '#262626' : '#fafafa',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {mediaFiles.length > 0 ? (
          // Mostrar archivos reales
          <Box sx={{ 
            width: '100%',
            height: '100%',
            position: 'relative'
          }}>
            {/* Imagen/video principal */}
            {mediaFiles[0].url ? (
              mediaFiles[0].type === 'video' ? (
                <CustomVideoPlayer
                  src={mediaFiles[0].url}
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              ) : (
                <img
                  src={mediaFiles[0].url}
                  alt="Instagram post"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              )
            ) : (
              <Box sx={{
                width: '100%',
                height: '100%',
                bgcolor: theme.palette.mode === 'dark' ? '#262626' : '#fafafa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconPhoto size={60} color={theme.palette.mode === 'dark' ? '#737373' : '#c7c7c7'} />
              </Box>
            )}
            
            {/* Indicador de carrusel si hay múltiples archivos */}
            {mediaFiles.length > 1 && (
              <Box sx={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                bgcolor: 'rgba(0,0,0,0.7)',
                borderRadius: '12px',
                px: '8px',
                py: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Box sx={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  bgcolor: 'white'
                }} />
                <Box sx={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.5)'
                }} />
                {mediaFiles.length > 2 && (
                  <Box sx={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.3)'
                  }} />
                )}
                {mediaFiles.length > 3 && (
                  <Typography sx={{
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    ml: '2px'
                  }}>
                    +{mediaFiles.length - 3}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        ) : (
          // Placeholder cuando no hay archivos
          <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <IconPhoto size={60} color={theme.palette.mode === 'dark' ? '#737373' : '#c7c7c7'} />
          </Box>
        )}
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        px: viewMode === 'mobile' ? '12px' : '16px',
        py: viewMode === 'mobile' ? '10px' : '12px'
      }}>
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

      <Box sx={{ px: viewMode === 'mobile' ? '12px' : '16px', pb: '4px' }}>
        <Typography sx={{ 
          fontSize: viewMode === 'mobile' ? '13px' : '14px',
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
          fontFamily: 'inherit',
          lineHeight: '18px'
        }}>
          <span style={{ fontWeight: 600, marginRight: '4px' }}>taktiko</span>
          {formData.content}
        </Typography>
      </Box>

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
};