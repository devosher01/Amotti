"use client";

import React from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  useTheme,
} from "@mui/material";
import { IconPhoto } from "@tabler/icons-react";
import { SocialMediaPostType } from "../../types";
import { CustomVideoPlayer } from "../../../../../planning/ui/components/PostCreationDialog/components/CustomVideoPlayer";

interface InstagramStoryPreviewProps {
  formData: SocialMediaPostType;
  hasImage: boolean;
  mediaFiles?: Array<{
    id: string;
    file: File;
    type: 'image' | 'video' | 'gif' | 'document';
    url?: string;
    size: number;
  }>;
}

// 🎯 Los STORIES de Instagram siempre son verticales (9:16)
export const InstagramStoryPreview: React.FC<InstagramStoryPreviewProps> = ({
  formData,
  hasImage,
  mediaFiles = [],
}) => {
  const theme = useTheme();

  // 📱 STORY - Siempre formato vertical nativo de Instagram
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Progress bars en la parte superior estilo Instagram */}
      <Box sx={{
        position: 'absolute',
        top: '8px',
        left: '12px',
        right: '12px',
        display: 'flex',
        gap: '2px',
        zIndex: 3,
      }}>
        {[1, 2, 3].map((_, index) => (
          <Box key={index} sx={{
            flex: 1,
            height: '2px',
            borderRadius: '1px',
            backgroundColor: index === 1 ? '#ffffff' : index === 0 ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
            position: 'relative',
            ...(index === 1 && {
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: '70%',
                backgroundColor: '#ffffff',
                animation: 'storyProgress 15s linear infinite',
              }
            })
          }} />
        ))}
      </Box>

      {/* Header con info del usuario estilo Instagram */}
      <Box sx={{
        position: 'absolute',
        top: '20px',
        left: '16px',
        right: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 2,
      }}>
        <Avatar sx={{ 
          width: 32, 
          height: 32,
          background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
          p: '2px'
        }}>
          <Box sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 600
          }}>
            T
          </Box>
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
            lineHeight: 1.2
          }}>
            taktiko
          </Typography>
          <Typography sx={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '12px',
            textShadow: '0 1px 2px rgba(0,0,0,0.6)'
          }}>
            2 min
          </Typography>
        </Box>
        <IconButton sx={{ color: 'white', p: '4px' }}>
          <Box sx={{ fontSize: '14px' }}>▶</Box>
        </IconButton>
        <IconButton sx={{ color: 'white', p: '4px' }}>
          <Box sx={{ fontSize: '14px' }}>🔇</Box>
        </IconButton>
        <IconButton sx={{ color: 'white', p: '4px' }}>
          <Box sx={{ fontSize: '16px' }}>⋯</Box>
        </IconButton>
      </Box>

      {/* Contenido principal de la story */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: (hasImage || mediaFiles.length > 0) ? 'none' : 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {mediaFiles.length > 0 && mediaFiles[0].url ? (
          // Mostrar video/imagen real
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
              alt="Instagram Story content"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          )
        ) : hasImage ? (
          <IconPhoto size={80} color="rgba(255,255,255,0.6)" />
        ) : (
          <Box sx={{
            textAlign: 'center',
            color: 'white',
            px: 3,
          }}>
            <Box sx={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              backdropFilter: 'blur(10px)',
            }}>
              <Box sx={{ fontSize: '32px', color: 'white' }}>+</Box>
            </Box>
            <Typography sx={{
              fontSize: '14px',
              opacity: 0.8,
              textAlign: 'center',
              textShadow: '0 1px 3px rgba(0,0,0,0.8)'
            }}>
              Agrega una foto o video
            </Typography>
          </Box>
        )}
      </Box>

      {/* Footer de respuesta estilo Instagram */}
      <Box sx={{
        position: 'absolute',
        bottom: '20px',
        left: '16px',
        right: '16px',
        zIndex: 2,
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          borderRadius: '22px',
          padding: '10px 16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <Typography sx={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '14px',
            flex: 1,
          }}>
            Envía un mensaje
          </Typography>
          
          {/* Botones de respuesta estilo Instagram */}
          <IconButton sx={{ 
            color: 'white', 
            p: '6px',
            minWidth: 'auto',
            fontSize: '18px',
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease'
          }}>
            ❤️
          </IconButton>
          <IconButton sx={{ 
            color: 'white', 
            p: '6px',
            minWidth: 'auto',
            fontSize: '18px',
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease'
          }}>
            📨
          </IconButton>
        </Box>
      </Box>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes storyProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </Box>
  );
};