"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, useTheme, alpha } from '@mui/material';
import { 
  IconPlayerPlay, 
  IconPlayerPause, 
  IconVolume, 
  IconVolumeOff 
} from '@tabler/icons-react';

interface CustomVideoPlayerProps {
  src: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean;
}

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  src,
  style,
  autoPlay = false,
  loop = false,
  muted = false,
  showControls = true,
}) => {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControlsOverlay, setShowControlsOverlay] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(() => {
        // Si falla el autoplay, no hacer nada
      });
    }
  }, [autoPlay]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        cursor: showControls ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={() => setShowControlsOverlay(true)}
      onMouseLeave={() => setShowControlsOverlay(false)}
      onClick={showControls ? togglePlay : undefined}
    >
      <video
        ref={videoRef}
        src={src}
        loop={loop}
        muted={isMuted}
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          outline: 'none',
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Overlay de controles personalizados */}
      {showControls && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: showControlsOverlay || !isPlaying 
              ? 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)' 
              : 'transparent',
            transition: 'all 0.3s ease',
            opacity: showControlsOverlay || !isPlaying ? 1 : 0,
          }}
        >
          {/* Botón de play/pause central */}
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            sx={{
              width: 60,
              height: 60,
              backgroundColor: alpha('#ffffff', 0.9),
              backdropFilter: 'blur(10px)',
              border: `2px solid ${alpha('#ffffff', 0.3)}`,
              color: '#000000',
              fontSize: '24px',
              '&:hover': {
                backgroundColor: '#ffffff',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: `0 8px 25px ${alpha('#000000', 0.15)}`,
            }}
          >
            {isPlaying ? (
              <IconPlayerPause size={24} />
            ) : (
              <IconPlayerPlay size={24} />
            )}
          </IconButton>

          {/* Controles superiores */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              gap: 1,
            }}
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              sx={{
                width: 40,
                height: 40,
                backgroundColor: alpha('#000000', 0.6),
                backdropFilter: 'blur(10px)',
                color: 'white',
                fontSize: '18px',
                '&:hover': {
                  backgroundColor: alpha('#000000', 0.8),
                },
                transition: 'all 0.2s ease',
              }}
            >
              {isMuted ? (
                <IconVolumeOff size={18} />
              ) : (
                <IconVolume size={18} />
              )}
            </IconButton>
          </Box>

          {/* Indicadores de esquinas como en apps reales */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              display: 'flex',
              gap: '4px',
            }}
          >
            {[1, 2, 3].map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: '20px',
                  height: '3px',
                  borderRadius: '2px',
                  backgroundColor: index === 0 ? '#ffffff' : alpha('#ffffff', 0.5),
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};