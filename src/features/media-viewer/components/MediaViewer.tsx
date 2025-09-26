'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  Box,
  IconButton,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import {
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconMaximize,
} from '@tabler/icons-react';
import { styled } from '@mui/material/styles';
import { MediaViewerProps, MediaItem } from '../types/media';

const FullscreenDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    margin: 0,
    maxWidth: 'none',
    maxHeight: 'none',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderRadius: 0,
    overflow: 'hidden',
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
}));

const ControlsOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '80px',
  background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  zIndex: 1000,
  transition: 'opacity 0.3s ease',
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: alpha('#000', 0.5),
  color: 'white',
  width: '60px',
  height: '60px',
  zIndex: 1000,
  '&:hover': {
    backgroundColor: alpha('#000', 0.7),
  },
  '&:disabled': {
    display: 'none',
  },
}));

const MediaContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

const StyledImage = styled('img')({
  maxWidth: '95vw',
  maxHeight: '95vh',
  width: 'auto',
  height: 'auto',
  objectFit: 'contain',
  userSelect: 'none',
});

const StyledVideo = styled('video')({
  maxWidth: '95vw',
  maxHeight: '95vh',
  width: 'auto',
  height: 'auto',
  outline: 'none',
  borderRadius: '8px',
  objectFit: 'contain',
});

const MediaInfo = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
  color: 'white',
  padding: theme.spacing(2),
  zIndex: 1000,
}));

export const MediaViewer: React.FC<MediaViewerProps> = ({
  isOpen,
  onClose,
  media,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showControls, setShowControls] = useState(true);

  const currentMedia = media[currentIndex];

  // Auto-hide controls para imágenes solamente
  const resetControlsTimeout = useCallback(() => {
    if (currentMedia?.type === 'image') {
      setShowControls(true);
      setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      // Para videos, siempre mostrar controles
      setShowControls(true);
    }
  }, [currentMedia?.type]);

  useEffect(() => {
    if (isOpen) {
      resetControlsTimeout();
    }
  }, [isOpen, resetControlsTimeout]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < media.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, media.length]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (event.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
    }
  }, [isOpen, onClose, handlePrevious, handleNext]);

  const handleDownload = useCallback(() => {
    if (currentMedia) {
      const link = document.createElement('a');
      link.href = currentMedia.url;
      link.download = currentMedia.title || `media-${currentMedia.id}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [currentMedia]);


  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  if (!currentMedia) return null;

  return (
    <FullscreenDialog
      open={isOpen}
      onClose={onClose}
      maxWidth={false}
      fullScreen
    >
      <MediaContainer onMouseMove={resetControlsTimeout}>
        {/* Controls Overlay */}
        <ControlsOverlay style={{ opacity: showControls ? 1 : 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={onClose}
              sx={{ color: 'white' }}
            >
              <IconX size={24} />
            </IconButton>
            <Typography variant="h6" sx={{ color: 'white' }}>
              {currentMedia.title || `Media ${currentIndex + 1} de ${media.length}`}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handleDownload}
              sx={{ color: 'white' }}
            >
              <IconDownload size={20} />
            </IconButton>
            <IconButton
              sx={{ color: 'white' }}
            >
              <IconMaximize size={20} />
            </IconButton>
          </Box>
        </ControlsOverlay>

        {/* Navigation Buttons */}
        <NavigationButton
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          sx={{ left: 20 }}
        >
          <IconChevronLeft size={30} />
        </NavigationButton>

        <NavigationButton
          onClick={handleNext}
          disabled={currentIndex === media.length - 1}
          sx={{ right: 20 }}
        >
          <IconChevronRight size={30} />
        </NavigationButton>

        {/* Media Content */}
        {currentMedia.type === 'image' ? (
          <StyledImage
            src={currentMedia.url}
            alt={currentMedia.alt || currentMedia.title}
          />
        ) : (
          <StyledVideo
            src={currentMedia.url}
            controls={true}
            autoPlay={false}
            preload="metadata"
            style={{
              backgroundColor: '#000',
            }}
          />
        )}

        {/* Media Info - Solo mostrar para imágenes, videos ya tienen sus controles */}
        {currentMedia.type === 'image' && (
          <MediaInfo style={{ opacity: showControls ? 1 : 0 }}>
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
              {currentIndex + 1} de {media.length}
            </Typography>
          </MediaInfo>
        )}
      </MediaContainer>
    </FullscreenDialog>
  );
};