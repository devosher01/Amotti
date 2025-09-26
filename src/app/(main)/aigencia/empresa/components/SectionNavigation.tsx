"use client";

import React from 'react';
import { Box, Paper, Typography, Button, Stack, Avatar } from '@mui/material';
import {
  IconBuilding,
  IconHeart,
  IconGift,
  IconUsers,
  IconTrendingUp,
  IconPalette,
  IconWorld,
  IconCheck,
} from '@tabler/icons-react';
import { SectionConfig, SectionId, CompanyProfile } from '../types/CompanyProfile';

interface SectionNavigationProps {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  getSectionCompletionStatus: (sectionId: SectionId) => boolean;
  isDark: boolean;
}

// Component - Single Responsibility: Navigation
export const SectionNavigation: React.FC<SectionNavigationProps> = ({
  activeSection,
  setActiveSection,
  getSectionCompletionStatus,
  isDark,
}) => {
  const sections: SectionConfig[] = [
    { id: 'basic', label: 'Información Básica', icon: IconBuilding, step: 1 },
    { id: 'storytelling', label: 'Storytelling', icon: IconHeart, step: 2 },
    { id: 'products', label: 'Productos/Servicios', icon: IconGift, step: 3 },
    { id: 'audience', label: 'Audiencia Objetivo', icon: IconUsers, step: 4 },
    { id: 'competition', label: 'Competencia', icon: IconTrendingUp, step: 5 },
    { id: 'branding', label: 'Branding & Tono', icon: IconPalette, step: 6 },
    { id: 'channels', label: 'Canales & Contenido', icon: IconWorld, step: 7 },
  ];

  return (
    <Paper
      sx={{
        background: isDark 
          ? 'linear-gradient(180deg, rgba(91, 36, 183, 0.12) 0%, rgba(64, 87, 217, 0.08) 100%)'
          : 'linear-gradient(180deg, rgba(91, 36, 183, 0.06) 0%, rgba(64, 87, 217, 0.04) 100%)',
        border: `1px solid ${isDark ? 'rgba(91, 36, 183, 0.2)' : 'rgba(91, 36, 183, 0.15)'}`,
        borderRadius: 3,
        padding: 3,
        position: 'sticky',
        top: 20,
        boxShadow: '0 8px 32px rgba(91, 36, 183, 0.15)',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: isDark ? '#e2d8f3' : '#5b24b7',
          fontWeight: 700,
          marginBottom: 3,
          textAlign: 'center',
          fontSize: '1.1rem'
        }}
      >
        Configuración por Pasos
      </Typography>
      
      {sections.map((section) => {
        const isCompleted = getSectionCompletionStatus(section.id);
        const isActive = activeSection === section.id;
        
        return (
          <Box key={section.id} sx={{ marginBottom: 2 }}>
            <Button
              fullWidth
              variant={isActive ? 'contained' : 'text'}
              onClick={() => setActiveSection(section.id)}
              sx={{
                justifyContent: 'flex-start',
                padding: '12px 16px',
                minHeight: '56px',
                borderRadius: 2,
                position: 'relative',
                color: isActive 
                  ? 'white' 
                  : isDark ? 'rgba(255,255,255,0.9)' : 'rgba(91, 36, 183, 0.9)',
                background: isActive
                  ? 'linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)'
                  : 'transparent',
                border: isCompleted && !isActive 
                  ? `2px solid ${isDark ? 'rgba(46, 160, 67, 0.6)' : 'rgba(46, 160, 67, 0.8)'}`
                  : `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(91, 36, 183, 0.1)'}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: isActive
                    ? 'linear-gradient(135deg, #4a1f9e 0%, #3649c7 100%)'
                    : isDark 
                      ? 'rgba(255,255,255,0.08)' 
                      : 'rgba(91, 36, 183, 0.08)',
                  transform: 'translateX(4px)',
                  boxShadow: '0 4px 20px rgba(91, 36, 183, 0.2)',
                }
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                {/* Número de paso */}
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: isActive
                      ? 'rgba(255,255,255,0.2)'
                      : isCompleted
                        ? 'linear-gradient(135deg, #2e8b57 0%, #2ea043 100%)'
                        : isDark 
                          ? 'rgba(255,255,255,0.1)' 
                          : 'rgba(91, 36, 183, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: isCompleted && !isActive 
                      ? '2px solid #2ea043' 
                      : 'none',
                  }}
                >
                  {isCompleted ? (
                    <IconCheck size={16} color="white" />
                  ) : (
                    <Typography
                      variant="caption"
                      sx={{
                        color: isActive ? 'white' : isDark ? '#e2d8f3' : '#5b24b7',
                        fontWeight: 700,
                        fontSize: '0.75rem'
                      }}
                    >
                      {section.step}
                    </Typography>
                  )}
                </Box>

                {/* Icono y texto */}
                <Box sx={{ flex: 1, textAlign: 'left' }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <section.icon 
                      size={24} 
                      color={isActive ? 'white' : isDark ? '#e2d8f3' : '#5b24b7'} 
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          lineHeight: 1.2,
                          color: 'inherit'
                        }}
                      >
                        {section.step}. {section.label}
                      </Typography>
                      {isCompleted && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: isActive ? 'rgba(255,255,255,0.8)' : '#2ea043',
                            fontSize: '0.7rem',
                            fontWeight: 500
                          }}
                        >
                          Completado
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Button>
          </Box>
        );
      })}
    </Paper>
  );
};

