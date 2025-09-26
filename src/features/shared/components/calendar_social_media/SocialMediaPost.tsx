"use client";

import React from "react";
import {
  Box,
  Typography,
  Chip,
  useTheme,
  Tooltip,
  Stack,
} from "@mui/material";
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconBrandTiktok,
  IconBrandPinterest,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { SocialMediaPostType } from "./types";

interface SocialMediaPostProps {
  post: SocialMediaPostType;
  onClick: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  isCompact?: boolean;
  style?: React.CSSProperties;
}

const SocialMediaPost: React.FC<SocialMediaPostProps> = ({
  post,
  onClick,
  onDragStart,
  onDragEnd,
  isCompact = false,
  style = {},
}) => {
  const theme = useTheme();

  // Iconos de redes sociales
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <IconBrandTwitter size={12} />;
      case "facebook":
        return <IconBrandFacebook size={12} />;
      case "instagram":
        return <IconBrandInstagram size={12} />;
      case "linkedin":
        return <IconBrandLinkedin size={12} />;
      case "youtube":
        return <IconBrandYoutube size={12} />;
      case "tiktok":
        return <IconBrandTiktok size={12} />;
      case "pinterest":
        return <IconBrandPinterest size={12} />;
      default:
        return <IconBrandTwitter size={12} />;
    }
  };

  // Colores de plataformas
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return "#1DA1F2";
      case "facebook":
        return "#1877F2";
      case "instagram":
        return "#E4405F";
      case "linkedin":
        return "#0A66C2";
      case "youtube":
        return "#FF0000";
      case "tiktok":
        return "#000000";
      case "pinterest":
        return "#BD081C";
      default:
        return theme.palette.primary.main;
    }
  };

  // Colores de estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return theme.palette.warning.main;
      case "scheduled":
        return theme.palette.info.main;
      case "published":
        return theme.palette.success.main;
      case "failed":
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  // Formatear hora
  const formatTime = () => {
    if (!post.scheduledTime) return "";
    return format(new Date(post.scheduledTime), "HH:mm", { locale: es });
  };

  return (
    <Tooltip 
      title={
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            {post.title || "Sin título"}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {formatTime()} - {post.platforms.join(", ")}
          </Typography>
          {post.content && (
            <Typography variant="caption" display="block" color="textSecondary">
              {post.content.length > 50 ? post.content.substring(0, 50) + "..." : post.content}
            </Typography>
          )}
        </Box>
      }
      arrow
      className="scheduler-tooltip"
    >
      <Box
        className="social-media-post"
        sx={{
          p: isCompact ? 0.3 : 0.5,
          mb: isCompact ? 0.3 : 0.5,
          borderRadius: 1,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'all 0.2s ease',
          minHeight: isCompact ? '18px' : '24px',
          ...style,
          '&:hover': {
            bgcolor: theme.palette.action.hover,
            borderColor: '#5b24b7',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(91, 36, 183, 0.2)',
          },
          '&:active': {
            transform: 'translateY(0)',
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        draggable
        onDragStart={(e) => {
          e.stopPropagation();
          onDragStart();
          e.dataTransfer.setData('text/plain', post.id || '');
          e.dataTransfer.effectAllowed = 'move';
        }}
        onDragEnd={(e) => {
          e.stopPropagation();
          onDragEnd();
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* Indicador de estado */}
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              bgcolor: getStatusColor(post.status),
              flexShrink: 0,
              // 🎨 Sombra sutil púrpura
              boxShadow: '0 1px 3px rgba(91, 36, 183, 0.3)',
            }}
          />
          
          {/* Contenido del post */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: isCompact ? '0.6rem' : '0.7rem',
                lineHeight: isCompact ? 1.1 : 1.2,
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {post.title || "Sin título"}
            </Typography>
            
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.65rem',
                display: 'block',
              }}
            >
              {formatTime()}
            </Typography>
          </Box>
          
          {/* Iconos de plataformas */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
            {post.platforms.slice(0, 2).map((platform, index) => (
              <Box
                key={index}
                className={`platform-icon platform-${platform.toLowerCase()}`}
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.6rem',
                  // 🎨 Sombra sutil púrpura
                  boxShadow: '0 1px 3px rgba(91, 36, 183, 0.2)',
                }}
              >
                {getPlatformIcon(platform)}
              </Box>
            ))}
            {post.platforms.length > 2 && (
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.6rem',
                  color: '#5b24b7',
                  fontWeight: 600,
                }}
              >
                +{post.platforms.length - 2}
              </Typography>
            )}
          </Box>
        </Box>
        
        {/* Estado del post */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.5 }}>
          <Typography
            className={`status-chip status-${post.status}`}
            sx={{
              fontSize: '0.6rem',
              height: 16,
              padding: '0 4px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 500,
              // 🎨 Sombra sutil púrpura
              boxShadow: '0 1px 2px rgba(91, 36, 183, 0.15)',
            }}
          >
            {post.status === 'draft' && 'Borrador'}
            {post.status === 'scheduled' && 'Programado'}
            {post.status === 'published' && 'Publicado'}
          </Typography>
          
          {/* Indicador de contenido multimedia */}
          {post.mediaUrls && post.mediaUrls.length > 0 && (
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: '#5b24b7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.5rem',
                // 🎨 Sombra sutil púrpura
                boxShadow: '0 1px 2px rgba(91, 36, 183, 0.3)',
              }}
            >
              📷
            </Box>
          )}
        </Box>
      </Box>
    </Tooltip>
  );
};

export default SocialMediaPost; 