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

interface FacebookReelPreviewProps {
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

// 🎯 Los REELS siempre son verticales (9:16), como TikTok
export const FacebookReelPreview: React.FC<FacebookReelPreviewProps> = ({
  formData,
  hasImage,
  mediaFiles = [],
}) => {
  const theme = useTheme();

  // 📱 REEL - Siempre formato vertical nativo
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
        top: '12px',
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
            backgroundColor: index === 1 ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
          }} />
        ))}
      </Box>

      {/* Header con info del usuario */}
      <Box sx={{
        position: 'absolute',
        top: '28px',
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
          bgcolor: '#1877F2',
          fontSize: '14px',
          fontWeight: 600
        }}>
          T
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{
            color: 'white',
            fontSize: '14px',
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
            Hace 2h
          </Typography>
        </Box>
        <IconButton sx={{ color: 'white', p: '4px' }}>
          <Box sx={{ fontSize: '20px' }}>⋯</Box>
        </IconButton>
      </Box>

      {/* Contenido principal del video */}
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
              alt="Reel content"
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
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            <Box sx={{ 
              fontSize: '32px', 
              color: '#1877F2',
              ml: '4px'
            }}>
              ▶
            </Box>
          </Box>
        )}
      </Box>

      {/* Botones de acción lateral */}
      <Box sx={{
        position: 'absolute',
        right: '12px',
        bottom: '140px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
      }}>
        {[
          { icon: '👍', count: '1.2K' },
          { icon: '💬', count: '156' },
          { icon: '↗️', count: '89' },
          { icon: '🔖', count: '' },
        ].map((action, index) => (
          <Box key={index} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Box sx={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              }
            }}>
              {action.icon}
            </Box>
            {action.count && (
              <Typography sx={{
                color: 'white',
                fontSize: '11px',
                fontWeight: 500,
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}>
                {action.count}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* Información en la parte inferior */}
      <Box sx={{
        position: 'absolute',
        bottom: '20px',
        left: '16px',
        right: '70px', // Espacio para los botones laterales
      }}>
        <Typography sx={{
          color: 'white',
          fontSize: '14px',
          lineHeight: 1.4,
          textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          mb: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {formData.content || "Tu contenido de reel aparecerá aquí..."}
        </Typography>
        
        <Typography sx={{
          color: '#4FC3F7',
          fontSize: '13px',
          fontWeight: 500,
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
          #reel #facebook #contenido
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          <Box sx={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Box sx={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#1877F2',
            }} />
          </Box>
          <Typography sx={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '12px',
          }}>
            Audio original • Taktiko
          </Typography>
        </Stack>
      </Box>

      {/* Barra de progreso del video */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      }}>
        <Box sx={{
          height: '100%',
          width: '35%',
          backgroundColor: '#ffffff',
        }} />
      </Box>
    </Box>
  );
};