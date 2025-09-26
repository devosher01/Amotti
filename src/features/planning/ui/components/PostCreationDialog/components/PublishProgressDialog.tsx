"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Alert,
  Button,
  Stack,
  useTheme,
  alpha,
  Avatar,
} from '@mui/material';
import {
  IconX,
  IconCheck,
  IconAlertCircle,
  IconBrandFacebook,
  IconBrandInstagram,
} from '@tabler/icons-react';
import { PublicationResponse } from '@/features/publications/infrastructure/api/publications-api.service';

interface PublishProgressDialogProps {
  open: boolean;
  onClose: () => void;
  isPublishing: boolean;
  progress: number;
  response: PublicationResponse | null;
  platforms: string[];
  action: 'draft' | 'publish_now' | 'schedule';
  isEditMode?: boolean;
}

export const PublishProgressDialog: React.FC<PublishProgressDialogProps> = ({
  open,
  onClose,
  isPublishing,
  progress,
  response,
  platforms,
  action,
  isEditMode = false,
}) => {
  const theme = useTheme();

  const getActionText = () => {
    if (isEditMode) {
      switch (action) {
        case 'draft':
          return 'Actualizando borrador';
        case 'publish_now':
          return 'Actualizando y publicando';
        case 'schedule':
          return 'Actualizando programación';
        default:
          return 'Actualizando';
      }
    } else {
      switch (action) {
        case 'draft':
          return 'Guardando borrador';
        case 'publish_now':
          return 'Publicando ahora';
        case 'schedule':
          return 'Programando publicación';
        default:
          return 'Procesando';
      }
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <IconBrandFacebook size={20} color="#1877F2" />;
      case 'instagram':
        return <IconBrandInstagram size={20} color="#E4405F" />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={isPublishing}
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            background: `linear-gradient(135deg, ${alpha('#5b24b7', 0.05)} 0%, ${alpha('#4f46e5', 0.08)} 100%)`,
            borderBottom: `1px solid ${alpha('#5b24b7', 0.08)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                background: 'linear-gradient(135deg, #5b24b7 0%, #4f46e5 100%)',
                width: 40,
                height: 40,
              }}
            >
              {isPublishing ? (
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}
                />
              ) : response?.success ? (
                <IconCheck size={20} />
              ) : (
                <IconAlertCircle size={20} />
              )}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#5b24b7' }}>
                {isPublishing ? getActionText() : response?.success ? (isEditMode ? '¡Actualizado!' : '¡Éxito!') : (isEditMode ? 'Error en la actualización' : 'Error en la publicación')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isPublishing ? 'Por favor espera...' : response?.message || ''}
              </Typography>
            </Box>
          </Box>
          {!isPublishing && (
            <IconButton onClick={onClose} size="small">
              <IconX size={20} />
            </IconButton>
          )}
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Progress Bar */}
          {isPublishing && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {isEditMode ? 'Actualizando...' : 'Subiendo archivos...'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(progress)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: alpha('#5b24b7', 0.1),
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #5b24b7 0%, #4f46e5 100%)',
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          )}

          {/* Platforms */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Plataformas seleccionadas:
            </Typography>
            <Stack direction="row" spacing={1}>
              {platforms.map((platform) => (
                <Box
                  key={platform}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: alpha('#f8fafc', 0.8),
                    border: `1px solid ${alpha('#5b24b7', 0.1)}`,
                  }}
                >
                  {getPlatformIcon(platform)}
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {platform}
                  </Typography>
                  {response?.success && (
                    <IconCheck size={16} color={theme.palette.success.main} />
                  )}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Response */}
          {response && (
            <Box sx={{ mb: 2 }}>
              <Alert
                severity={response.success ? 'success' : 'error'}
                sx={{
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    fontSize: '1.5rem',
                  },
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    {response.message}
                  </Typography>
                  {response.errors && response.errors.length > 0 && (
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {response.errors.map((error, index) => (
                        <Typography
                          key={index}
                          component="li"
                          variant="body2"
                          sx={{ mb: 0.5 }}
                        >
                          {error}
                        </Typography>
                      ))}
                    </Box>
                  )}
                  {response.success && response.data && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2">
                        ID de publicación: <code>{response.data.id}</code>
                      </Typography>
                      <Typography variant="body2">
                        Estado: <strong>{response.data.status}</strong>
                      </Typography>
                      {response.data.publishedAt && (
                        <Typography variant="body2">
                          Publicado: {new Date(response.data.publishedAt).toLocaleString()}
                        </Typography>
                      )}
                      {response.data.scheduledAt && (
                        <Typography variant="body2">
                          Programado para: {new Date(response.data.scheduledAt).toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              </Alert>
            </Box>
          )}

          {/* Actions */}
          {!isPublishing && (
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  borderColor: alpha('#5b24b7', 0.2),
                  color: '#5b24b7',
                  '&:hover': {
                    borderColor: '#5b24b7',
                    backgroundColor: alpha('#5b24b7', 0.04),
                  },
                }}
              >
                Cerrar
              </Button>
              {response?.success && (
                <Button
                  variant="contained"
                  onClick={onClose}
                  sx={{
                    background: 'linear-gradient(135deg, #5b24b7 0%, #4c1d9a 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4c1d9a 0%, #3d1677 100%)',
                    },
                  }}
                >
                  Continuar
                </Button>
              )}
            </Stack>
          )}
        </Box>
      </DialogContent>

      {/* Spinner Animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Dialog>
  );
};