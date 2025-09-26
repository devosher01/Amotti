"use client";
import React from 'react';
import { Box, Typography } from '@mui/material';
import { InstagramPost } from './types';

interface PostsCarouselProps {
  readonly posts?: readonly InstagramPost[];
}

const PostsCarousel: React.FC<PostsCarouselProps> = ({ posts }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ 
        fontWeight: 700, 
        color: '#1e293b',
        mb: 2
      }}>
        Publicaciones Recientes
      </Typography>
      <Typography variant="body2" sx={{ 
        color: '#64748b' 
      }}>
        Esta sección ha sido simplificada para evitar problemas de layout
      </Typography>
    </Box>
  );
};

export default PostsCarousel;
