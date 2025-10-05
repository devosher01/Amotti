'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  useTheme, 
  alpha, 
  Card,
  Stack,
  Chip
} from '@mui/material';
import { 
  IconTrendingUp,
  IconHeart,
  IconMessage,
  IconEye
} from '@tabler/icons-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Post } from '../../core/api/types';

interface PostsCarouselProps {
  posts: Post[];
  title?: string;
  isLoading?: boolean;
}

export function PostsCarousel({ 
  posts, 
  title = "Posts Destacados",
  isLoading = false 
}: PostsCarouselProps) {
  const theme = useTheme();

  const formatDate = (dateString: string): string => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
    }).format(new Date(dateString));
  };

  const getEngagementRate = (post: Post): number => {
    const total = post.likesCount + post.commentsCount + post.sharesCount;
    return post.impressions > 0 ? (total / post.impressions) * 100 : 0;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      photo: '#3B82F6',
      video: '#EF4444', 
      text: '#6B7280',
      carousel: '#F59E0B',
      reel: '#8B5CF6',
      story: '#10B981',
    };
    return colors[type as keyof typeof colors] || theme.palette.grey[500];
  };

  // Sort posts by engagement rate
  const topPosts = [...posts]
    .sort((a, b) => getEngagementRate(b) - getEngagementRate(a))
    .slice(0, 8);

  if (isLoading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
          {title}
        </Typography>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView="auto"
          style={{ paddingBottom: '16px' }}
        >
          {[1, 2, 3, 4].map((i) => (
            <SwiperSlide key={i} style={{ width: 'auto' }}>
              <Box
                sx={{
                  width: { xs: 280, sm: 300 },
                  height: 200,
                  borderRadius: 3,
                  background: alpha(theme.palette.grey[100], 0.5),
                  animation: 'pulse 1.5s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 },
                  },
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    );
  }

  if (!topPosts.length) return null;

  return (
    <Box 
      sx={{ 
        mb: 4,
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden', // CRÍTICO: Contenedor principal
        minWidth: 0, // CRÍTICO: Permite shrinking
      }}
    >
      {/* Header */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          letterSpacing: '-0.01em',
          mb: 3,
        }}
      >
        {title}
      </Typography>

      {/* CONTENEDOR ANTI-OVERFLOW ABSOLUTO */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden', // BARRERA 1: Container overflow
          position: 'relative',
          minWidth: 0, // CRÍTICO: Permite flex shrinking
          '& .swiper': {
            width: '100% !important',
            maxWidth: '100% !important',
            overflow: 'hidden !important', // BARRERA 2: Swiper overflow
            minWidth: '0 !important',
          },
          '& .swiper-wrapper': {
            width: '100% !important',
            maxWidth: '100% !important',
          },
          '& .swiper-slide': {
            width: 'auto !important',
            maxWidth: 'none !important',
            flexShrink: 0,
          },
          '& .swiper-button-prev, & .swiper-button-next': {
            color: theme.palette.primary.main,
            background: alpha(theme.palette.primary.main, 0.1),
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            marginTop: '-20px',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: alpha(theme.palette.primary.main, 0.2),
            },
            '&::after': {
              fontSize: '16px',
              fontWeight: 'bold',
            },
          },
          '& .swiper-button-disabled': {
            opacity: 0.3,
          },
          '& .swiper-pagination-bullet': {
            background: theme.palette.primary.main,
            opacity: 0.3,
          },
          '& .swiper-pagination-bullet-active': {
            opacity: 1,
          },
        }}
      >
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView="auto"
          navigation={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 12,
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          style={{ 
            paddingBottom: '40px',
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden'
          }}
        >
          {topPosts.map((post, index) => (
            <SwiperSlide 
              key={post.id} 
              style={{ 
                width: 'auto',
                maxWidth: 'none',
                minWidth: 'unset',
              }}
            >
              <Card
                sx={{
                  width: '100%',
                  maxWidth: { xs: 'calc(100vw - 64px)', sm: 300 },
                  minWidth: { xs: 200, sm: 280 },
                  flexShrink: 1,
                  p: 3,
                  borderRadius: 3,
                  background: theme.palette.background.paper,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: `0 2px 12px ${alpha(theme.palette.grey[500], 0.08)}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxSizing: 'border-box', // INCLUYE PADDING EN CÁLCULO
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${alpha(theme.palette.grey[500], 0.15)}`,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  },
                }}
              >
                {/* Performance indicator */}
                {index < 3 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.main,
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconTrendingUp size={16} />
                  </Box>
                )}

                <Stack spacing={2}>
                  {/* Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Chip
                      label={post.type}
                      size="small"
                      sx={{
                        backgroundColor: alpha(getTypeColor(post.type), 0.1),
                        color: getTypeColor(post.type),
                        border: `1px solid ${alpha(getTypeColor(post.type), 0.2)}`,
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                    />
                    
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                      }}
                    >
                      {formatDate(post.createdAt)}
                    </Typography>
                  </Stack>

                  {/* Content preview */}
                  <Typography
                    variant="body2"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.4,
                      color: theme.palette.text.primary,
                      minHeight: 40,
                    }}
                  >
                    {post.message || 'Sin mensaje de texto'}
                  </Typography>

                  {/* Metrics */}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 1,
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconHeart size={14} color={theme.palette.error.main} />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {post.likesCount.toLocaleString()}
                      </Typography>
                    </Stack>
                    
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconMessage size={14} color={theme.palette.info.main} />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {post.commentsCount.toLocaleString()}
                      </Typography>
                    </Stack>
                    
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconEye size={14} color={theme.palette.success.main} />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {post.impressions.toLocaleString()}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Engagement rate */}
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 1,
                      borderRadius: 2,
                      background: alpha(theme.palette.primary.main, 0.05),
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        fontSize: '1.1rem',
                      }}
                    >
                      {getEngagementRate(post).toFixed(1)}%
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600,
                      }}
                    >
                      Engagement
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}