/**
 * Professional Calendar Loading Overlay
 * Muestra un overlay elegante mientras se cargan las publicaciones
 */

'use client';

import React from 'react';
import { Box, CircularProgress, Typography, Fade, Backdrop } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const LoadingContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(248, 250, 252, 0.98)',
  backdropFilter: 'blur(8px)',
  zIndex: 9999,
  borderRadius: '8px',
  transition: 'all 0.3s ease-in-out',
}));

const LoadingCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  animation: `${pulseAnimation} 2s ease-in-out infinite`,
  minWidth: '200px',
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
  },
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  color: '#2196f3',
  fontWeight: 600,
  fontSize: '0.875rem',
  textAlign: 'center',
  marginBottom: theme.spacing(1),
}));

const LoadingSubtext = styled(Typography)(({ theme }) => ({
  color: '#666666',
  fontSize: '0.75rem',
  textAlign: 'center',
  opacity: 0.8,
}));

interface CalendarLoadingOverlayProps {
  show: boolean;
  message?: string;
  subMessage?: string;
}

export const CalendarLoadingOverlay: React.FC<CalendarLoadingOverlayProps> = ({
  show,
  message = "Cargando publicaciones...",
  subMessage = "Obteniendo datos del calendario"
}) => {
  return (
    <Fade in={show} timeout={300}>
      <LoadingContainer>
        <LoadingCard>
          <StyledCircularProgress
            size={40}
            thickness={4}
            sx={{
              color: '#2196f3',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
          <LoadingText>
            {message}
          </LoadingText>
          <LoadingSubtext>
            {subMessage}
          </LoadingSubtext>
        </LoadingCard>
      </LoadingContainer>
    </Fade>
  );
};

export default CalendarLoadingOverlay;