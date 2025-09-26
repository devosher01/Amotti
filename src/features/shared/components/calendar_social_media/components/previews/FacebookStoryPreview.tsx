"use client";

import React from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import { IconPhoto } from "@tabler/icons-react";
import { SocialMediaPostType } from "../../types";
import { CustomVideoPlayer } from "../../../../../planning/ui/components/PostCreationDialog/components/CustomVideoPlayer";

interface FacebookStoryPreviewProps {
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

// 🎯 Los STORIES siempre son verticales (9:16), como Instagram Stories
export const FacebookStoryPreview: React.FC<FacebookStoryPreviewProps> = ({
  formData,
  hasImage,
  mediaFiles = [],
}) => {
  const theme = useTheme();

  // 📱 STORY - Siempre formato vertical nativo
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Progress bars en la parte superior */}
      <Box sx={{
        position: 'absolute',
        top: '8px',
        left: '16px',
        right: '16px',
        display: 'flex',
        gap: '4px',
        zIndex: 3,
      }}>
        {[1, 2, 3].map((_, index) => (
          <Box key={index} sx={{
            flex: 1,
            height: '3px',
            borderRadius: '2px',
            backgroundColor: index === 1 ? '#ffffff' : index === 0 ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
            position: 'relative',
            ...(index === 1 && {
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: '60%',
                backgroundColor: '#ffffff',
                animation: 'progress 15s linear infinite',
              }
            })
          }} />
        ))}
      </Box>

      {/* Header con info del usuario */}
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
          width: 36, 
          height: 36,
          bgcolor: '#1877F2',
          fontSize: '14px',
          fontWeight: 600,
          border: '3px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          T
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            textShadow: '0 2px 4px rgba(0,0,0,0.7)',
            lineHeight: 1.2
          }}>
            Taktiko
          </Typography>
          <Typography sx={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '12px',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}>
            Hace 2 min
          </Typography>
        </Box>
        <IconButton sx={{ color: 'white', p: '4px' }}>
          <Box sx={{ fontSize: '16px' }}>▶</Box>
        </IconButton>
        <IconButton sx={{ color: 'white', p: '4px' }}>
          <Box sx={{ fontSize: '16px' }}>🔇</Box>
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
        background: (hasImage || mediaFiles.length > 0) ? 'none' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {mediaFiles.length > 0 && mediaFiles[0].url ? (
          // Mostrar video/imagen real con controles
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
              alt="Story content"
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
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
              textAlign: 'center'
            }}>
              Agrega una foto o video
            </Typography>
          </Box>
        )}
      </Box>

      {/* Footer de respuesta */}
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
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '8px 16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <Typography sx={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '14px',
            flex: 1,
          }}>
            Envía un mensaje...
          </Typography>
          <IconButton sx={{ 
            color: 'white', 
            p: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
          }}>
            <Box sx={{ fontSize: '16px' }}>❤️</Box>
          </IconButton>
          <IconButton sx={{ 
            color: 'white', 
            p: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
          }}>
            <Box sx={{ fontSize: '16px' }}>📨</Box>
          </IconButton>
        </Box>
      </Box>

      {/* Animations */}
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </Box>
  );
};