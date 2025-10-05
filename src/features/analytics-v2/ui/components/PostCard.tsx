'use client';

import React from 'react';
import { Box, Typography, Chip, Stack, alpha, useTheme } from '@mui/material';
import { Post } from '../../core/api/types';

interface PostCardProps {
  post: Post;
  compact?: boolean;
}

export function PostCard({ post, compact = false }: PostCardProps) {
  const theme = useTheme();

  const formatDate = (dateString: string): string => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const getTypeColor = (type: string) => {
    const colors = {
      photo: theme.palette.info.main,
      video: theme.palette.error.main,
      text: theme.palette.grey[600],
      carousel: theme.palette.warning.main,
      reel: theme.palette.secondary.main,
      story: theme.palette.success.main,
    };
    return colors[type as keyof typeof colors] || theme.palette.grey[500];
  };

  const getEngagementRate = (): number => {
    const total = post.likesCount + post.commentsCount + post.sharesCount;
    return post.impressions > 0 ? (total / post.impressions) * 100 : 0;
  };

  if (compact) {
    return (
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
          background: alpha(theme.palette.background.paper, 0.8),
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: alpha(theme.palette.primary.main, 0.5),
            background: alpha(theme.palette.primary.main, 0.02),
          },
        }}
      >
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Chip
              label={post.type}
              size="small"
              sx={{
                backgroundColor: alpha(getTypeColor(post.type), 0.1),
                color: getTypeColor(post.type),
                border: `1px solid ${alpha(getTypeColor(post.type), 0.2)}`,
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {formatDate(post.createdAt)}
            </Typography>
          </Stack>
          
          <Typography
            variant="body2"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.4,
              color: theme.palette.text.primary,
            }}
          >
            {post.message || 'Sin mensaje'}
          </Typography>
          
          <Stack direction="row" spacing={2}>
            <Typography variant="caption" color="text.secondary">
              ❤️ {post.likesCount.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              💬 {post.commentsCount.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              👁️ {post.impressions.toLocaleString()}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        background: theme.palette.background.paper,
        boxShadow: `0 2px 12px ${alpha(theme.palette.grey[500], 0.08)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px ${alpha(theme.palette.grey[500], 0.12)}`,
          borderColor: alpha(theme.palette.primary.main, 0.3),
        },
      }}
    >
      <Stack spacing={2}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={post.type}
              sx={{
                backgroundColor: alpha(getTypeColor(post.type), 0.1),
                color: getTypeColor(post.type),
                border: `1px solid ${alpha(getTypeColor(post.type), 0.3)}`,
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
              }}
            />
            <Chip
              label={post.platform}
              size="small"
              variant="outlined"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 600,
              }}
            />
          </Stack>
          
          <Typography variant="body2" color="text.secondary">
            {formatDate(post.createdAt)}
          </Typography>
        </Stack>

        {/* Content */}
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.6,
            color: theme.palette.text.primary,
          }}
        >
          {post.message || 'Sin mensaje de texto'}
        </Typography>

        {/* Metrics */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 2,
            mt: 1,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="error.main" sx={{ fontWeight: 700 }}>
              {post.likesCount.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Me Gusta
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="info.main" sx={{ fontWeight: 700 }}>
              {post.commentsCount.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Comentarios
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="warning.main" sx={{ fontWeight: 700 }}>
              {post.sharesCount.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Compartidos
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
              {post.impressions.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Impresiones
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
              {getEngagementRate().toFixed(1)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Engagement
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}