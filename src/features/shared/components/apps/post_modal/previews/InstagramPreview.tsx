"use client";

import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";

interface InstagramPreviewProps {
  content: string;
  scheduledTime: Date;
  viewMode: 'desktop' | 'mobile';
}

const InstagramPreview: React.FC<InstagramPreviewProps> = ({
  content,
  scheduledTime,
  viewMode,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      bgcolor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
      borderRadius: viewMode === 'mobile' ? 0 : '8px',
      border: theme.palette.mode === 'dark' ? '1px solid #262626' : '1px solid #dbdbdb',
      maxWidth: viewMode === 'mobile' ? 375 : 400,
      width: viewMode === 'mobile' ? 375 : 'auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      ...(viewMode === 'mobile' && {
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40%',
          height: '4px',
          bgcolor: '#000',
          borderRadius: '0 0 8px 8px',
          zIndex: 1
        }
      })
    }}>
      {/* Header de Instagram */}
      <Box sx={{ 
        p: viewMode === 'mobile' ? '12px' : '14px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#262626' : '#dbdbdb'}`
      }}>
        {/* Avatar */}
        <Box sx={{ 
          width: 32, 
          height: 32,
          borderRadius: '50%',
          bgcolor: '#E4405F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: '12px',
          color: 'white',
          fontWeight: 600,
          fontSize: '14px'
        }}>
          T
        </Box>
        
        {/* Usuario */}
        <Typography sx={{ 
          fontWeight: 600,
          fontSize: '14px',
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
          fontFamily: 'inherit',
          flex: 1
        }}>
          taktiko
        </Typography>
        
        {/* Menú tres puntos */}
        <IconButton sx={{ 
          p: '4px',
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626'
        }}>
          <Box sx={{ fontSize: '16px' }}>⋯</Box>
        </IconButton>
      </Box>

      {/* Área de imagen (placeholder) */}
      <Box sx={{ 
        width: '100%',
        height: viewMode === 'mobile' ? 375 : 400,
        bgcolor: theme.palette.mode === 'dark' ? '#262626' : '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#262626' : '#dbdbdb'}`
      }}>
        <Box sx={{ 
          color: theme.palette.mode === 'dark' ? '#8e8e8e' : '#c7c7c7',
          textAlign: 'center'
        }}>
          <Box sx={{ fontSize: '48px', mb: 1 }}>📷</Box>
          <Typography sx={{ 
            fontSize: '14px',
            color: 'inherit',
            fontFamily: 'inherit'
          }}>
            Imagen
          </Typography>
        </Box>
      </Box>

      {/* Barra de acciones */}
      <Box sx={{ p: viewMode === 'mobile' ? '12px' : '14px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', mb: '12px' }}>
          <IconButton sx={{ p: 0, color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626' }}>
            <Box sx={{ fontSize: '24px' }}>❤️</Box>
          </IconButton>
          <IconButton sx={{ p: 0, color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626' }}>
            <Box sx={{ fontSize: '24px' }}>💬</Box>
          </IconButton>
          <IconButton sx={{ p: 0, color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626' }}>
            <Box sx={{ fontSize: '24px' }}>📤</Box>
          </IconButton>
          <IconButton sx={{ p: 0, color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626', ml: 'auto' }}>
            <Box sx={{ fontSize: '24px' }}>🔖</Box>
          </IconButton>
        </Box>

        {/* Likes */}
        <Typography sx={{ 
          fontWeight: 600,
          fontSize: '14px',
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
          fontFamily: 'inherit',
          mb: '8px'
        }}>
          0 Me gusta
        </Typography>

        {/* Contenido del post */}
        <Box sx={{ mb: '8px' }}>
          <Typography component="span" sx={{ 
            fontWeight: 600,
            fontSize: '14px',
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
            fontFamily: 'inherit',
            mr: '8px'
          }}>
            taktiko
          </Typography>
          <Typography component="span" sx={{ 
            fontSize: '14px',
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626',
            fontFamily: 'inherit'
          }}>
            {content || 'Tu contenido aparecerá aquí...'}
          </Typography>
        </Box>

        {/* Comentarios */}
        <Typography sx={{ 
          fontSize: '14px',
          color: theme.palette.mode === 'dark' ? '#8e8e8e' : '#8e8e8e',
          fontFamily: 'inherit',
          mb: '8px',
          cursor: 'pointer'
        }}>
          Ver todos los 0 comentarios
        </Typography>

        {/* Timestamp */}
        <Typography sx={{ 
          fontSize: '12px',
          color: theme.palette.mode === 'dark' ? '#8e8e8e' : '#8e8e8e',
          fontFamily: 'inherit',
          textTransform: 'uppercase',
          mb: '12px'
        }}>
          {scheduledTime.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'short' 
          })} a las {scheduledTime.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Typography>
      </Box>

      {/* Barra de comentarios */}
      <Box sx={{ 
        borderTop: theme.palette.mode === 'dark' ? '1px solid #262626' : '1px solid #dbdbdb',
        px: viewMode === 'mobile' ? '12px' : '14px',
        py: viewMode === 'mobile' ? '10px' : '12px',
        display: 'flex',
        alignItems: 'center',
        gap: viewMode === 'mobile' ? '8px' : '12px'
      }}>
        <IconButton sx={{ 
          p: 0,
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#262626'
        }}>
          <Box sx={{ fontSize: '24px' }}>😊</Box>
        </IconButton>
        
        <Typography sx={{ 
          fontSize: viewMode === 'mobile' ? '13px' : '14px',
          color: theme.palette.mode === 'dark' ? '#8e8e8e' : '#8e8e8e',
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

export default InstagramPreview; 