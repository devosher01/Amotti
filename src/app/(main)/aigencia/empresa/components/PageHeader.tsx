"use client";

import React from 'react';
import { Box, Typography, Stack, Avatar, LinearProgress } from '@mui/material';
import { IconBuilding } from '@tabler/icons-react';

interface PageHeaderProps {
  completionPercentage: number;
  isDark: boolean;
}

// Component - Single Responsibility: Page Header
export const PageHeader: React.FC<PageHeaderProps> = ({
  completionPercentage,
  isDark,
}) => {
  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, 
          ${isDark ? 'rgba(91, 36, 183, 0.15)' : 'rgba(91, 36, 183, 0.08)'} 0%, 
          ${isDark ? 'rgba(64, 87, 217, 0.12)' : 'rgba(64, 87, 217, 0.06)'} 50%,
          ${isDark ? 'rgba(59, 104, 223, 0.10)' : 'rgba(59, 104, 223, 0.04)'} 100%
        )`,
        borderRadius: 3,
        padding: 4,
        marginBottom: 3,
        border: `1px solid ${isDark ? 'rgba(91, 36, 183, 0.2)' : 'rgba(91, 36, 183, 0.1)'}`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #5b24b7 0%, #4057d9 50%, #3b68df 100%)',
        }
      }}
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <Avatar
          sx={{
            background: 'linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)',
            width: 64,
            height: 64,
          }}
        >
          <IconBuilding size={32} color="white" />
        </Avatar>
        
        <Box flex={1}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: isDark ? '#e2d8f3' : '#5b24b7',
              marginBottom: 1,
            }}
          >
            Perfil de Empresa
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(91, 36, 183, 0.8)',
              marginBottom: 2,
            }}
          >
            Configura la información de tu empresa para generar buyer personas precisos con IA
          </Typography>
          
          {/* Barra de progreso */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LinearProgress
              variant="determinate"
              value={completionPercentage}
              sx={{
                flex: 1,
                height: 8,
                borderRadius: 4,
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(91, 36, 183, 0.1)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #5b24b7 0%, #4057d9 50%, #3b68df 100%)',
                  borderRadius: 4,
                }
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: isDark ? '#e2d8f3' : '#5b24b7',
              }}
            >
              {completionPercentage}% completo
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

