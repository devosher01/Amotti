'use client';

import React from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';

interface AppLoadingBoundaryProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export function AppLoadingBoundary({ children, isLoading }: AppLoadingBoundaryProps) {
  const theme = useTheme();
  
  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(ellipse at center, rgba(15,23,42,0.95) 0%, rgba(15,23,42,1) 100%)'
            : 'radial-gradient(ellipse at center, rgba(255,248,240,0.95) 0%, rgba(248,250,252,1) 100%)',
          zIndex: 9999,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `conic-gradient(from 0deg, transparent, ${alpha(theme.palette.primary.main, 0.03)}, transparent)`,
            animation: 'rotate 20s linear infinite',
            '@keyframes rotate': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          },
        }}
      >
        {/* Logo principal con efectos espectaculares */}
        <Box
          sx={{
            mb: 8,
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Anillos de energía orbitando */}
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${140 + index * 30}px`,
                height: `${140 + index * 30}px`,
                borderRadius: '50%',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1 - index * 0.02)}`,
                animation: `orbit${index} ${4 + index * 0.5}s linear infinite`,
                [`@keyframes orbit${index}`]: {
                  '0%': {
                    transform: 'translate(-50%, -50%) rotate(0deg) scale(1)',
                    opacity: 0.8 - index * 0.2,
                  },
                  '50%': {
                    opacity: 1 - index * 0.2,
                  },
                  '100%': {
                    transform: `translate(-50%, -50%) rotate(360deg) scale(${1 + index * 0.05})`,
                    opacity: 0.8 - index * 0.2,
                  },
                },
              }}
            />
          ))}
          
          {/* Logo Container principal */}
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '28px',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: `0 32px 64px -12px ${alpha(theme.palette.primary.main, 0.4)}, 0 16px 32px -8px ${alpha(theme.palette.primary.main, 0.3)}`,
              animation: 'logoFloat 4s ease-in-out infinite',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                borderRadius: '30px',
                background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                zIndex: -1,
                animation: 'borderGlow 3s ease-in-out infinite alternate',
              },
              '@keyframes logoFloat': {
                '0%, 100%': {
                  transform: 'translateY(0px) rotate(0deg)',
                },
                '25%': {
                  transform: 'translateY(-12px) rotate(1deg)',
                },
                '50%': {
                  transform: 'translateY(-8px) rotate(0deg)',
                },
                '75%': {
                  transform: 'translateY(-12px) rotate(-1deg)',
                },
              },
              '@keyframes borderGlow': {
                '0%': {
                  opacity: 0.5,
                  filter: 'blur(2px)',
                },
                '100%': {
                  opacity: 0.8,
                  filter: 'blur(4px)',
                },
              },
            }}
          >
            {/* Logo Amotii SVG simplificado */}
            <Box
              component="svg"
              width="64"
              height="64"
              viewBox="0 0 100 100"
              sx={{
                fill: 'white',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              }}
            >
              {/* Ojos */}
              <ellipse cx="25" cy="30" rx="12" ry="18" fill="white" />
              <ellipse cx="75" cy="30" rx="12" ry="18" fill="white" />
              <circle cx="25" cy="30" r="6" fill={theme.palette.primary.main} />
              <circle cx="75" cy="30" r="6" fill={theme.palette.primary.main} />
              <circle cx="25" cy="30" r="3" fill="white" opacity="0.8" />
              <circle cx="75" cy="30" r="3" fill="white" opacity="0.8" />
              
              {/* Barras verticales (nariz) */}
              <rect x="35" y="50" width="8" height="35" rx="4" fill="white" />
              <rect x="57" y="50" width="8" height="35" rx="4" fill="white" />
            </Box>
            
            {/* Partículas flotantes */}
            {[...Array(8)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  opacity: 0.6,
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animation: `particle${i} ${2 + Math.random() * 2}s ease-in-out infinite`,
                  [`@keyframes particle${i}`]: {
                    '0%, 100%': {
                      transform: 'translateY(0px) scale(1)',
                      opacity: 0.3,
                    },
                    '50%': {
                      transform: `translateY(${-10 - Math.random() * 10}px) scale(1.2)`,
                      opacity: 0.8,
                    },
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Título con efectos tipográficos premium */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
            position: 'relative',
            zIndex: 10,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 50%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '-0.04em',
              mb: 1,
              p: 2,
              position: 'relative',
              animation: 'textShimmer 3s ease-in-out infinite',
              backgroundSize: '200% 200%',
              '@keyframes textShimmer': {
                '0%, 100%': {
                  backgroundPosition: '0% 50%',
                },
                '50%': {
                  backgroundPosition: '100% 50%',
                },
              },
            }}
          >
            Amotii
          </Typography>
          
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
              fontSize: '1.1rem',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              opacity: 0.8,
              animation: 'fadeInUp 2s ease-out',
              '@keyframes fadeInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(20px)',
                },
                '100%': {
                  opacity: 0.8,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            Social Media Management Platform
          </Typography>
        </Box>

        {/* Barra de progreso premium */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: 280, sm: 320 },
            height: 6,
            backgroundColor: alpha(theme.palette.divider, 0.1),
            borderRadius: '3px',
            overflow: 'hidden',
            mb: 2,
            boxShadow: `inset 0 2px 4px ${alpha(theme.palette.common.black, 0.1)}`,
            zIndex: 10,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '40%',
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.light} 100%)`,
              borderRadius: '3px',
              animation: 'progressFlow 2s ease-in-out infinite',
              boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.5)}`,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                animation: 'shine 1.5s ease-in-out infinite',
              },
              '@keyframes progressFlow': {
                '0%': {
                  transform: 'translateX(-100%)',
                  width: '40%',
                },
                '50%': {
                  transform: 'translateX(200%)',
                  width: '60%',
                },
                '100%': {
                  transform: 'translateX(200%)',
                  width: '40%',
                },
              },
              '@keyframes shine': {
                '0%': {
                  transform: 'translateX(-100%)',
                },
                '100%': {
                  transform: 'translateX(100%)',
                },
              },
            }}
          />
        </Box>

        {/* Indicadores de estado premium */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            zIndex: 10,
          }}
        >
          {/* Dots animados con efectos 3D */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            {[0, 1, 2, 3, 4].map((index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: alpha(theme.palette.primary.main, 0.3),
                  animation: `dotWave 1.8s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    right: '-2px',
                    bottom: '-2px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.4)} 0%, transparent 70%)`,
                    animation: `dotGlow 1.8s ease-in-out infinite`,
                    animationDelay: `${index * 0.2}s`,
                  },
                  '@keyframes dotWave': {
                    '0%, 60%, 100%': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.3),
                      transform: 'scale(1) translateY(0)',
                    },
                    '30%': {
                      backgroundColor: theme.palette.primary.main,
                      transform: 'scale(1.4) translateY(-4px)',
                      boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
                    },
                  },
                  '@keyframes dotGlow': {
                    '0%, 60%, 100%': {
                      opacity: 0.5,
                      transform: 'scale(1)',
                    },
                    '30%': {
                      opacity: 1,
                      transform: 'scale(2)',
                    },
                  },
                }}
              />
            ))}
          </Box>

          {/* Texto de estado con animación typewriter */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontFamily: '"SF Mono", "Monaco", "Menlo", monospace',
                opacity: 0.9,
                animation: 'typewriter 3s ease-in-out infinite',
                '@keyframes typewriter': {
                  '0%, 50%': {
                    opacity: 0.9,
                  },
                  '25%': {
                    opacity: 0.6,
                  },
                },
              }}
            >
              Iniciando Amotii
            </Typography>
            
            <Typography
              variant="caption"
              sx={{
                color: alpha(theme.palette.text.secondary, 0.6),
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '1px',
                mt: 0.5,
                display: 'block',
              }}
            >
              Preparando tu experiencia...
            </Typography>
          </Box>
        </Box>
      </Box>
      );
    }

  return <>{children}</>;
}