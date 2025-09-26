"use client";

import React from 'react';
import { Box, Typography, Avatar, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  MoreHoriz as MoreIcon,
  PlayArrow as PlayIcon,
  FavoriteBorder as LikeIcon,
  ChatBubbleOutline as CommentIcon,
  Send as ShareIcon,
  BookmarkBorder as SaveIcon,
  VolumeUp as VolumeIcon,
  Fullscreen as FullscreenIcon
} from '@mui/icons-material';

const ReelContainer = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '533px', // Aspect ratio 9:16 típico de reels
  backgroundColor: '#000000',
  borderRadius: '24px',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  border: '4px solid #1c1c1e',
  display: 'flex',
  flexDirection: 'column',
}));

const VideoArea = styled(Box)({
  flex: 1,
  position: 'relative',
  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const PlayButton = styled(Box)({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const BottomOverlay = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
  padding: '20px 16px',
});

const SideActions = styled(Box)({
  position: 'absolute',
  right: '12px',
  bottom: '100px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
});

const ActionButton = styled(IconButton)({
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  width: '48px',
  height: '48px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

const ProgressBar = styled(Box)({
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  height: '3px',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
});

const Progress = styled(Box)({
  height: '100%',
  width: '30%', // Simula progreso del video
  backgroundColor: '#ffffff',
});

interface FacebookReelPreviewProps {
  content?: {
    text?: string;
    media?: string[];
    hashtags?: string[];
  };
  userProfile?: {
    name?: string;
    avatar?: string;
  };
}

export const FacebookReelPreview: React.FC<FacebookReelPreviewProps> = ({
  content = {
    text: "¡Increíble contenido de video! 🚀 No te pierdas este momento épico",
    media: [],
    hashtags: ['#video', '#reel', '#contenido']
  },
  userProfile = {
    name: "Tu Página",
    avatar: ""
  }
}) => {
  const displayText = content.text || "Tu contenido de reel aparecerá aquí...";
  const hashtags = content.hashtags?.join(' ') || '';

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <ReelContainer>
        {/* Video Area */}
        <VideoArea>
          {content.media && content.media.length > 0 ? (
            <Box
              component="img"
              src={content.media[0]}
              alt="Reel preview"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <PlayButton>
              <PlayIcon sx={{ fontSize: '32px', color: '#1877F2', ml: '4px' }} />
            </PlayButton>
          )}

          {/* Top Controls */}
          <Box sx={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            right: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography sx={{ 
              color: 'white', 
              fontWeight: 600,
              fontSize: '16px',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              Reels
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <ActionButton size="small">
                <VolumeIcon sx={{ fontSize: '20px' }} />
              </ActionButton>
              <ActionButton size="small">
                <MoreIcon sx={{ fontSize: '20px' }} />
              </ActionButton>
            </Box>
          </Box>

          {/* Side Actions */}
          <SideActions>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ActionButton>
                <LikeIcon sx={{ fontSize: '24px' }} />
              </ActionButton>
              <Typography sx={{ color: 'white', fontSize: '12px', mt: 0.5 }}>
                1.2K
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ActionButton>
                <CommentIcon sx={{ fontSize: '24px' }} />
              </ActionButton>
              <Typography sx={{ color: 'white', fontSize: '12px', mt: 0.5 }}>
                156
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ActionButton>
                <ShareIcon sx={{ fontSize: '24px' }} />
              </ActionButton>
              <Typography sx={{ color: 'white', fontSize: '12px', mt: 0.5 }}>
                89
              </Typography>
            </Box>

            <ActionButton>
              <SaveIcon sx={{ fontSize: '24px' }} />
            </ActionButton>

            <ActionButton>
              <FullscreenIcon sx={{ fontSize: '24px' }} />
            </ActionButton>
          </SideActions>

          {/* Bottom Content */}
          <BottomOverlay>
            <Stack spacing={1}>
              {/* User Info */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar 
                  src={userProfile.avatar}
                  sx={{ width: 32, height: 32, border: '2px solid white' }}
                >
                  {userProfile.name?.charAt(0) || 'P'}
                </Avatar>
                <Typography sx={{ 
                  color: 'white', 
                  fontWeight: 600,
                  fontSize: '14px'
                }}>
                  {userProfile.name || 'Tu Página'}
                </Typography>
                <Typography sx={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: '12px'
                }}>
                  • Hace 2h
                </Typography>
              </Stack>

              {/* Content Text */}
              <Typography sx={{ 
                color: 'white', 
                fontSize: '14px',
                lineHeight: 1.4,
                maxHeight: '60px',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}>
                {displayText}
              </Typography>

              {/* Hashtags */}
              {hashtags && (
                <Typography sx={{ 
                  color: '#4FC3F7',
                  fontSize: '14px',
                  fontWeight: 500,
                }}>
                  {hashtags}
                </Typography>
              )}

              {/* Audio Info */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box sx={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Box sx={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#1877F2',
                  }} />
                </Box>
                <Typography sx={{ 
                  color: 'rgba(255,255,255,0.8)', 
                  fontSize: '12px',
                  flex: 1,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}>
                  Audio original • {userProfile.name || 'Tu Página'}
                </Typography>
              </Stack>
            </Stack>
          </BottomOverlay>

          {/* Progress Bar */}
          <ProgressBar>
            <Progress />
          </ProgressBar>
        </VideoArea>
      </ReelContainer>
    </Box>
  );
};