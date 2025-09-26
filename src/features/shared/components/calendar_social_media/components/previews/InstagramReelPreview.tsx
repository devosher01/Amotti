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

interface InstagramReelPreviewProps {
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

// 🎯 Los REELS de Instagram siempre son verticales (9:16), como TikTok
export const InstagramReelPreview: React.FC<InstagramReelPreviewProps> = ({
  formData,
  hasImage,
  mediaFiles = [],
}) => {
  const theme = useTheme();

  // 📱 REEL - Siempre formato vertical nativo de Instagram
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Header minimalista de Instagram Reels */}
      <Box sx={{
        position: 'absolute',
        top: '12px',
        left: '16px',
        right: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 3,
      }}>
        <Typography sx={{
          color: 'white',
          fontSize: '16px',
          fontWeight: 600,
          textShadow: '0 2px 4px rgba(0,0,0,0.8)',
        }}>
          Reels
        </Typography>
        <IconButton sx={{ color: 'white', p: '4px' }}>
          <Box sx={{ fontSize: '20px' }}>📷</Box>
        </IconButton>
      </Box>

      {/* Contenido principal del reel */}
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
              loop={true}
            />
          ) : (
            <img
              src={mediaFiles[0].url}
              alt="Instagram Reel content"
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
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            <Box sx={{ 
              fontSize: '32px', 
              color: 'white',
              ml: '4px'
            }}>
              ▶
            </Box>
          </Box>
        )}
      </Box>

      {/* Botones de acción lateral estilo Instagram */}
      <Box sx={{
        position: 'absolute',
        right: '12px',
        bottom: '120px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
      }}>
        {/* Avatar del usuario */}
        <Box sx={{ position: 'relative' }}>
          <Avatar sx={{
            width: 44,
            height: 44,
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
              fontSize: '14px',
              fontWeight: 600
            }}>
              T
            </Box>
          </Avatar>
          {/* Plus button */}
          <Box sx={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#FF3040',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #000000',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            +
          </Box>
        </Box>

        {/* Acciones de Instagram Reels */}
        {[
          { icon: '🤍', count: '2.1K', size: 48 },
          { icon: '💬', count: '89', size: 48 },
          { icon: '📤', count: '', size: 48 },
          { icon: '🎵', count: '', size: 48 },
        ].map((action, index) => (
          <Box key={index} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Box sx={{
              width: action.size,
              height: action.size,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              cursor: 'pointer',
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              '&:hover': {
                transform: 'scale(1.1)',
              },
              transition: 'transform 0.2s ease'
            }}>
              {action.icon}
            </Box>
            {action.count && (
              <Typography sx={{
                color: 'white',
                fontSize: '11px',
                fontWeight: 600,
                textShadow: '0 1px 2px rgba(0,0,0,0.7)'
              }}>
                {action.count}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* Información en la parte inferior estilo Instagram */}
      <Box sx={{
        position: 'absolute',
        bottom: '20px',
        left: '16px',
        right: '70px', // Espacio para los botones laterales
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: 1 }}>
          <Avatar sx={{ 
            width: 24, 
            height: 24,
            background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
            p: '1px'
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
              fontSize: '10px',
              fontWeight: 600
            }}>
              T
            </Box>
          </Avatar>
          <Typography sx={{
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          }}>
            taktiko
          </Typography>
          <Typography sx={{
            color: 'white',
            fontSize: '14px',
            fontWeight: 400,
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          }}>
            • Siguiendo
          </Typography>
        </Box>
        
        <Typography sx={{
          color: 'white',
          fontSize: '14px',
          lineHeight: 1.4,
          textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          mb: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {formData.content || "Tu contenido de reel aparecerá aquí..."}
        </Typography>
        
        {/* Audio info estilo Instagram */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Box sx={{
            width: '16px',
            height: '16px',
            borderRadius: '2px',
            background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Box sx={{ color: 'white', fontSize: '8px', fontWeight: 'bold' }}>🎵</Box>
          </Box>
          <Typography sx={{
            color: 'white',
            fontSize: '13px',
            fontWeight: 500,
            textShadow: '0 1px 2px rgba(0,0,0,0.7)'
          }}>
            Audio original • taktiko
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};