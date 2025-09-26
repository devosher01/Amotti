"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Divider,
  useTheme,
  alpha,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconX,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconBrandTiktok,
  IconEdit,
  IconTrash,
  IconCalendar,
  IconClock,
  IconShare,
  IconEye,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { SocialMediaPostType } from "./types";

interface SocialMediaPostDialogProps {
  open: boolean;
  post: SocialMediaPostType | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const SocialMediaPostDialog: React.FC<SocialMediaPostDialogProps> = ({
  open,
  post,
  onClose,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();

  if (!post) return null;

  // Configuración de plataformas
  const platformConfig = {
    facebook: { icon: IconBrandFacebook, color: "#1877F2", label: "Facebook" },
    instagram: { icon: IconBrandInstagram, color: "#E4405F", label: "Instagram" },
    twitter: { icon: IconBrandTwitter, color: "#1DA1F2", label: "Twitter" },
    linkedin: { icon: IconBrandLinkedin, color: "#0077B5", label: "LinkedIn" },
    youtube: { icon: IconBrandYoutube, color: "#FF0000", label: "YouTube" },
    tiktok: { icon: IconBrandTiktok, color: "#000000", label: "TikTok" },
  };

  // Obtener icono y color de la plataforma
  const getPlatformIcon = (platform: string) => {
    const config = platformConfig[platform as keyof typeof platformConfig];
    if (!config) return null;
    
    const IconComponent = config.icon;
    return (
      <IconComponent 
        size={20} 
        color={config.color}
      />
    );
  };

  // Obtener color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'scheduled':
        return 'primary';
      case 'draft':
        return 'default';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  // Obtener texto del estado
  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicado';
      case 'scheduled':
        return 'Programado';
      case 'draft':
        return 'Borrador';
      case 'failed':
        return 'Fallido';
      default:
        return status;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        pb: 1
      }}>
        <Typography variant="h6" fontWeight={600}>
          Detalles del Post
        </Typography>
        <IconButton onClick={onClose} size="small">
          <IconX size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Stack spacing={3}>
          {/* Título */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Título
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {post.title || 'Sin título'}
            </Typography>
          </Box>

          {/* Contenido */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Contenido
            </Typography>
            <Typography variant="body2" sx={{ 
              whiteSpace: 'pre-wrap',
              lineHeight: 1.5
            }}>
              {post.content || 'Sin contenido'}
            </Typography>
          </Box>

          {/* Plataformas */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Plataformas
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {post.platforms.map((platform) => {
                const icon = getPlatformIcon(platform);
                return (
                  <Chip
                    key={platform}
                    icon={icon || undefined}
                    label={platformConfig[platform as keyof typeof platformConfig]?.label || platform}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      '& .MuiChip-icon': { 
                        color: platformConfig[platform as keyof typeof platformConfig]?.color 
                      }
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          {/* Estado */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Estado
            </Typography>
            <Chip
              label={getStatusText(post.status)}
              color={getStatusColor(post.status) as any}
              size="small"
            />
          </Box>

          {/* Fecha y hora programada */}
          {post.scheduledTime && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Programado para
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconCalendar size={16} color={theme.palette.text.secondary} />
                <Typography variant="body2">
                  {format(post.scheduledTime, 'EEEE, d \'de\' MMMM \'de\' yyyy', { locale: es })}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <IconClock size={16} color={theme.palette.text.secondary} />
                <Typography variant="body2">
                  {format(post.scheduledTime, 'HH:mm', { locale: es })}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Archivos adjuntos */}
          {post.mediaUrls && post.mediaUrls.length > 0 && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Archivos adjuntos
              </Typography>
              <Typography variant="body2">
                {post.mediaUrls.length} archivo(s)
              </Typography>
            </Box>
          )}

          {/* Hashtags */}
          {post.hashtags && post.hashtags.length > 0 && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Hashtags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {post.hashtags.map((hashtag, index) => (
                  <Chip
                    key={index}
                    label={hashtag}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '11px' }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Menciones */}
          {post.mentions && post.mentions.length > 0 && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Menciones
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {post.mentions.map((mention, index) => (
                  <Chip
                    key={index}
                    label={mention}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '11px' }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<IconTrash size={16} />}
          onClick={onDelete}
        >
          Eliminar
        </Button>
        <Button
          variant="outlined"
          startIcon={<IconEdit size={16} />}
          onClick={onEdit}
        >
          Editar
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SocialMediaPostDialog; 