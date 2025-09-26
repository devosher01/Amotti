"use client";

import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  useTheme,
} from "@mui/material";
import { IconPhoto } from "@tabler/icons-react";
import { SocialMediaPostType } from "../../types";
import { CustomVideoPlayer } from "../../../../../planning/ui/components/PostCreationDialog/components/CustomVideoPlayer";

interface FacebookPreviewProps {
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

export const FacebookPreview: React.FC<FacebookPreviewProps> = ({
  formData,
  hasImage,
  viewMode,
  mediaFiles = [],
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
      <Box sx={{ p: '12px 16px 0 16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: '12px' }}>
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

      <Box sx={{ px: '16px', pb: '12px' }}>
        <Typography sx={{ 
          fontSize: '15px',
          lineHeight: '20px',
          color: theme.palette.mode === 'dark' ? '#e4e6ea' : '#050505',
          fontFamily: 'inherit',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}>
          {formData.content}
        </Typography>
      </Box>

      {(hasImage || mediaFiles.length > 0) && (
        <Box sx={{ 
          width: '100%',
          borderTop: theme.palette.mode === 'dark' ? '1px solid #3a3b3c' : '1px solid #dddfe2',
          borderBottom: theme.palette.mode === 'dark' ? '1px solid #3a3b3c' : '1px solid #dddfe2'
        }}>
          {mediaFiles.length > 0 ? (
            // Mostrar archivos reales
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: mediaFiles.length === 1 ? '1fr' : mediaFiles.length === 2 ? '1fr 1fr' : 'repeat(3, 1fr)',
              gap: '1px',
              bgcolor: theme.palette.mode === 'dark' ? '#3a3b3c' : '#dddfe2'
            }}>
              {mediaFiles.slice(0, 4).map((file, index) => (
                <Box
                  key={file.id}
                  sx={{
                    position: 'relative',
                    aspectRatio: mediaFiles.length === 1 ? '16/9' : '1/1',
                    bgcolor: theme.palette.mode === 'dark' ? '#242526' : '#ffffff',
                    overflow: 'hidden'
                  }}
                >
                  {file.url ? (
                    file.type === 'video' ? (
                      <CustomVideoPlayer
                        src={file.url}
                        style={{
                          width: '100%',
                          height: '100%'
                        }}
                      />
                    ) : (
                      <img
                        src={file.url}
                        alt="Media preview"
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
                      bgcolor: theme.palette.mode === 'dark' ? '#3a3b3c' : '#f0f2f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconPhoto size={40} color={theme.palette.mode === 'dark' ? '#65676b' : '#8a8d91'} />
                    </Box>
                  )}
                  
                  {/* Mostrar indicador si hay más de 4 archivos */}
                  {index === 3 && mediaFiles.length > 4 && (
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      bgcolor: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}>
                      +{mediaFiles.length - 4}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          ) : (
            // Placeholder cuando hasImage es true pero no hay archivos
            <Box sx={{ 
              width: '100%', 
              aspectRatio: '16/9',
              bgcolor: theme.palette.mode === 'dark' ? '#3a3b3c' : '#f0f2f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <IconPhoto size={60} color={theme.palette.mode === 'dark' ? '#65676b' : '#8a8d91'} />
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ px: '16px', py: '8px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '8px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '-2px' }}>
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
        
        <Box sx={{ 
          height: '1px',
          bgcolor: theme.palette.mode === 'dark' ? '#3a3b3c' : '#ced0d4',
          my: '8px'
        }} />
        
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
};