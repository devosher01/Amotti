"use client";

import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";

interface FacebookPreviewProps {
  content: string;
  scheduledTime: Date;
  viewMode: 'desktop' | 'mobile';
}

const FacebookPreview: React.FC<FacebookPreviewProps> = ({
  content,
  scheduledTime,
  viewMode,
}) => {
  const theme = useTheme();

  return (
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
                {scheduledTime.toLocaleDateString('es-ES', { 
                  day: 'numeric', 
                  month: 'short' 
                })} a las {scheduledTime.toLocaleTimeString('es-ES', { 
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
          mb: '12px'
        }}>
          {content || 'Tu contenido aparecerá aquí...'}
        </Typography>
      </Box>

      {/* Footer con estadísticas */}
      <Box sx={{ 
        px: '16px', 
        pb: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Box sx={{
            width: '18px',
            height: '18px',
            bgcolor: '#1877F2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box sx={{ color: 'white', fontSize: '10px' }}>👍</Box>
          </Box>
          <Typography sx={{ 
            fontSize: '13px',
            color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
            fontFamily: 'inherit'
          }}>
            0
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Typography sx={{ 
            fontSize: '13px',
            color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
            fontFamily: 'inherit'
          }}>
            0 comentarios
          </Typography>
          <Typography sx={{ 
            fontSize: '13px',
            color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
            fontFamily: 'inherit'
          }}>
            0 veces compartido
          </Typography>
        </Box>
      </Box>

      {/* Barra de acciones */}
      <Box sx={{ 
        borderTop: theme.palette.mode === 'dark' ? '1px solid #3a3b3c' : '1px solid #ced0d4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        py: '4px'
      }}>
        <IconButton sx={{ 
          flex: 1,
          py: '8px',
          color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? '#3a3b3c' : '#f2f3f4'
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Box sx={{ fontSize: '18px' }}>👍</Box>
            <Typography sx={{ 
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'inherit'
            }}>
              Me gusta
            </Typography>
          </Box>
        </IconButton>
        
        <IconButton sx={{ 
          flex: 1,
          py: '8px',
          color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? '#3a3b3c' : '#f2f3f4'
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Box sx={{ fontSize: '18px' }}>💬</Box>
            <Typography sx={{ 
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'inherit'
            }}>
              Comentar
            </Typography>
          </Box>
        </IconButton>
        
        <IconButton sx={{ 
          flex: 1,
          py: '8px',
          color: theme.palette.mode === 'dark' ? '#b0b3b8' : '#65676b',
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? '#3a3b3c' : '#f2f3f4'
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Box sx={{ fontSize: '18px' }}>↗️</Box>
            <Typography sx={{ 
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'inherit'
            }}>
              Compartir
            </Typography>
          </Box>
        </IconButton>
      </Box>
    </Box>
  );
};

export default FacebookPreview; 