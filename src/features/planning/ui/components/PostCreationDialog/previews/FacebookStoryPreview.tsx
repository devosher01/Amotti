"use client";

import React from 'react';
import { Box, Typography, Avatar, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  MoreHoriz as MoreIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeOff as MuteIcon,
  Send as SendIcon,
  FavoriteBorder as LikeIcon,
  Add as AddIcon
} from '@mui/icons-material';

const StoryContainer = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '533px', // Aspect ratio 9:16 típico de stories
  backgroundColor: '#000000',
  borderRadius: '24px',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  border: '4px solid #1c1c1e',
  display: 'flex',
  flexDirection: 'column',
}));

const StoryHeader = styled(Box)({
  position: 'absolute',
  top: '16px',
  left: '16px',
  right: '16px',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const ProgressBars = styled(Box)({
  position: 'absolute',
  top: '8px',
  left: '16px',
  right: '16px',
  display: 'flex',
  gap: '4px',
  zIndex: 3,
});

const ProgressBar = styled(Box)<{ active?: boolean; completed?: boolean }>(({ active, completed }) => ({
  flex: 1,
  height: '3px',
  borderRadius: '2px',
  backgroundColor: completed ? '#ffffff' : active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
  position: 'relative',
  overflow: 'hidden',
  ...(active && {
    '&::after': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '0',
      height: '100%',
      width: '60%', // Simula progreso
      backgroundColor: '#ffffff',
      animation: 'progress 15s linear infinite',
    }
  })
}));

const StoryContent = styled(Box)({
  flex: 1,
  position: 'relative',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StoryFooter = styled(Box)({
  position: 'absolute',
  bottom: '20px',
  left: '16px',
  right: '16px',
  zIndex: 2,
});

const ReplyInput = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  padding: '8px 16px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
});

const ActionButton = styled(IconButton)({
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  width: '40px',
  height: '40px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

interface FacebookStoryPreviewProps {
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

export const FacebookStoryPreview: React.FC<FacebookStoryPreviewProps> = ({
  content = {
    text: "¡Momentos increíbles! ✨ Compartiendo mi día contigo",
    media: [],
    hashtags: ['#story', '#momento', '#vida']
  },
  userProfile = {
    name: "Tu Página",
    avatar: ""
  }
}) => {
  const displayText = content.text || "Tu historia aparecerá aquí...";
  const hashtags = content.hashtags?.join(' ') || '';

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <StoryContainer>
        {/* Progress Bars */}
        <ProgressBars>
          <ProgressBar completed />
          <ProgressBar active />
          <ProgressBar />
        </ProgressBars>

        {/* Header */}
        <StoryHeader>
          <Avatar 
            src={userProfile.avatar}
            sx={{ 
              width: 40, 
              height: 40,
              border: '3px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            {userProfile.name?.charAt(0) || 'P'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ 
              color: 'white', 
              fontWeight: 600,
              fontSize: '16px',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              lineHeight: 1.2
            }}>
              {userProfile.name || 'Tu Página'}
            </Typography>
            <Typography sx={{ 
              color: 'rgba(255,255,255,0.8)', 
              fontSize: '12px',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}>
              Hace 2 min
            </Typography>
          </Box>
          <ActionButton size="small">
            <PlayIcon sx={{ fontSize: '18px' }} />
          </ActionButton>
          <ActionButton size="small">
            <MuteIcon sx={{ fontSize: '18px' }} />
          </ActionButton>
          <ActionButton size="small">
            <MoreIcon sx={{ fontSize: '18px' }} />
          </ActionButton>
        </StoryHeader>

        {/* Story Content */}
        <StoryContent>
          {content.media && content.media.length > 0 ? (
            <Box
              component="img"
              src={content.media[0]}
              alt="Story preview"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Box sx={{
              textAlign: 'center',
              color: 'white',
              px: 3,
            }}>
              <Box sx={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                backdropFilter: 'blur(10px)',
              }}>
                <AddIcon sx={{ fontSize: '32px', color: 'white' }} />
              </Box>
              <Typography sx={{
                fontSize: '14px',
                opacity: 0.8,
                textAlign: 'center'
              }}>
                Agrega una foto o video
              </Typography>
            </Box>
          )}

          {/* Text Overlay */}
          {displayText && (
            <Box sx={{
              position: 'absolute',
              left: '20px',
              right: '20px',
              bottom: '120px',
              textAlign: 'center',
            }}>
              <Typography sx={{
                color: 'white',
                fontSize: '18px',
                fontWeight: 600,
                textAlign: 'center',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                lineHeight: 1.3,
                backgroundColor: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                padding: '12px 16px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                {displayText}
              </Typography>
              
              {hashtags && (
                <Typography sx={{
                  color: '#4FC3F7',
                  fontSize: '16px',
                  fontWeight: 500,
                  textAlign: 'center',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  mt: 1,
                }}>
                  {hashtags}
                </Typography>
              )}
            </Box>
          )}
        </StoryContent>

        {/* Footer */}
        <StoryFooter>
          <ReplyInput>
            <Typography sx={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              flex: 1,
            }}>
              Envía un mensaje...
            </Typography>
            <ActionButton size="small">
              <LikeIcon sx={{ fontSize: '18px' }} />
            </ActionButton>
            <ActionButton size="small">
              <SendIcon sx={{ fontSize: '18px' }} />
            </ActionButton>
          </ReplyInput>
        </StoryFooter>
      </StoryContainer>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </Box>
  );
};