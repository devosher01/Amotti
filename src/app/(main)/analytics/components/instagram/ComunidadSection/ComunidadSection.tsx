"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Typography,
  Card,
  Grid,
  Stack,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartCard = ({ children, ...props }: any) => {
  const theme = useTheme();
  return (
  <Card sx={{ 
    p: 3, 
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    borderRadius: 3,
    boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
    ...props.sx 
  }} {...props}>
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      {children}
    </Box>
  </Card>
  );
};

const CrecimientoChart = () => {
  const theme = useTheme();
  
  const options = {
    chart: {
      type: 'line' as const,
      height: 350,
      toolbar: {
        show: false,
      },
      background: 'transparent',
      width: '100%',
      parentHeightOffset: 0,
    },
    responsive: [
      {
        breakpoint: 9999,
        options: {
          chart: {
            width: '100%'
          },
          plotOptions: {
            bar: {
              columnWidth: '90%'
            }
          }
        }
      }
    ],
    stroke: {
      curve: 'smooth' as const,
      width: 3,
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.warning.main],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: 'top' as const,
      horizontalAlign: 'right' as const,
      offsetY: -10,
      labels: {
        colors: theme.palette.text.secondary,
      },
    },
    grid: {
      show: true,
      borderColor: alpha(theme.palette.primary.main, 0.1),
      strokeDashArray: 3,
    },
    xaxis: {
      categories: [
        '30 Jun', '2 Jul', '4 Jul', '6 Jul', '8 Jul', '10 Jul', 
        '12 Jul', '14 Jul', '16 Jul', '18 Jul', '20 Jul', '22 Jul', 
        '24 Jul', '26 Jul', '28 Jul'
      ],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px',
        },
      },
      min: -1,
      max: 1,
      tickAmount: 4,
    },
    tooltip: {
      theme: 'light' as const,
      style: {
        fontSize: '12px',
      },
    },
  };

  const series = [
    {
      name: 'Seguidores',
      data: [0, 0, 0, 0, 0, 0, -0.5, 0.8, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Siguiendo',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Contenido total',
      data: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    },
  ];

  return (
    <Box sx={{ width: '100%', height: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <Chart options={options} series={series} type="line" height={350} width="100%" />
    </Box>
  );
};

const BalanceSeguidoresChart = () => {
  const theme = useTheme();
  
  const options = {
    chart: {
      type: 'area' as const,
      height: 250,
      toolbar: {
        show: false,
      },
      background: 'transparent',
      width: '100%',
      parentHeightOffset: 0,
    },
    responsive: [
      {
        breakpoint: 9999,
        options: {
          chart: {
            width: '100%'
          },
          plotOptions: {
            bar: {
              columnWidth: '90%'
            }
          }
        }
      }
    ],
    stroke: {
      curve: 'smooth' as const,
      width: 2,
    },
    colors: [theme.palette.success.main],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: true,
      borderColor: alpha(theme.palette.success.main, 0.1),
      strokeDashArray: 3,
    },
    xaxis: {
      categories: [
        '30 Jun', '2 Jul', '4 Jul', '6 Jul', '8 Jul', '10 Jul', 
        '12 Jul', '14 Jul', '16 Jul', '18 Jul', '20 Jul', '22 Jul', 
        '24 Jul', '26 Jul', '28 Jul'
      ],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '11px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '11px',
        },
      },
      min: 0,
      max: 1,
    },
    tooltip: {
      theme: 'light' as const,
      style: {
        fontSize: '12px',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
  };

  const series = [
    {
      name: 'Seguidores',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  return (
    <Box sx={{ width: '100%', height: 250, maxWidth: '100%', overflow: 'hidden' }}>
      <Chart options={options} series={series} type="area" height={250} width="100%" />
    </Box>
  );
};

const metricas = [
  { 
    valor: '0', 
    label: 'Seguidores', 
    color: '#e2e8f0', 
    textColor: '#64748b',
    size: 'small',
    priority: 'low'
  },
  { 
    valor: '0', 
    label: 'Seguidores diarios', 
    color: '#e2e8f0', 
    textColor: '#64748b',
    size: 'small',
    priority: 'low'
  },
  { 
    valor: '0', 
    label: 'Siguiendo', 
    color: '#e2e8f0', 
    textColor: '#64748b',
    size: 'small',
    priority: 'low'
  },
  { 
    valor: '1.03', 
    label: 'Publicaciones por día', 
    color: '#8b5cf6',
    textColor: 'white',
    size: 'medium',
    priority: 'medium'
  },
  { 
    valor: '7.23', 
    label: 'Publicaciones por semana', 
    color: '#5b24b7',
    textColor: 'white',
    size: 'large',
    priority: 'high'
  },
];

const getMetricStyles = (metric: typeof metricas[0]) => {
  const baseStyles = {
    borderRadius: 3,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  switch (metric.priority) {
    case 'high':
      return {
        ...baseStyles,
        p: 3, // Más padding
        backgroundColor: metric.color,
        color: metric.textColor,
        boxShadow: `0 8px 32px ${alpha(metric.color, 0.4)}`,
        transform: 'scale(1.02)', // Ligeramente más grande
        border: `2px solid ${alpha(metric.color, 0.6)}`,
      };
    case 'medium':
      return {
        ...baseStyles,
        p: 2.5,
        backgroundColor: metric.color,
        color: metric.textColor,
        boxShadow: `0 6px 24px ${alpha(metric.color, 0.3)}`,
        border: `1px solid ${alpha(metric.color, 0.4)}`,
      };
    default: // low priority
      return {
        ...baseStyles,
        p: 2,
        backgroundColor: metric.color,
        color: metric.textColor,
        border: `1px solid ${alpha('#cbd5e1', 0.3)}`,
        '&:hover': {
          backgroundColor: alpha('#f1f5f9', 0.8),
        },
      };
  }
};

const getTypographySize = (priority: string) => {
  switch (priority) {
    case 'high':
      return { valor: 'h2', label: 'body1' };
    case 'medium':
      return { valor: 'h3', label: 'body2' };
    default:
      return { valor: 'h4', label: 'caption' };
  }
};

interface ComunidadSectionProps {
  username?: string;
}

const ComunidadSection: React.FC<ComunidadSectionProps> = ({ 
  username = "devosher01" 
}) => {
  return (
    <Box sx={{ 
      mb: 6,
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ 
            fontWeight: 800, 
            color: '#1e293b',
            mb: 0.5,
            letterSpacing: '-0.025em'
          }}>
            Comunidad
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
            Métricas principales de engagement y crecimiento
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" sx={{ color: '#64748b', mb: 0.5 }}>
            Usuario activo
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#5b24b7' }}>
            {username}
          </Typography>
        </Box>
      </Stack>

      <ChartCard sx={{ 
        p: 5,
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden'
      }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 700, 
            color: '#1e293b',
            mb: 1,
            letterSpacing: '-0.02em'
          }}>
            Crecimiento
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            Seguimiento de actividad y audiencia en tiempo real
          </Typography>
        </Box>
        
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {metricas.map((metrica, index) => {
            const typographySize = getTypographySize(metrica.priority);
            return (
              <Grid item xs={6} sm={4} lg={2} key={index}>
                <Card sx={{ 
                  textAlign: 'center',
                  ...getMetricStyles(metrica),
                  '&:hover': {
                    ...(metrica.priority !== 'low' && {
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: `0 12px 40px ${alpha(metrica.color, 0.5)}`,
                    }),
                  },
                }}>
                  <Typography 
                    variant={typographySize.valor as any} 
                    sx={{ 
                      fontWeight: metrica.priority === 'high' ? 800 : metrica.priority === 'medium' ? 700 : 600,
                      mb: 1,
                      lineHeight: 1.2,
                    }}
                  >
                    {metrica.valor}
                  </Typography>
                  <Typography 
                    variant={typographySize.label as any} 
                    sx={{ 
                      fontSize: metrica.priority === 'high' ? '0.95rem' : metrica.priority === 'medium' ? '0.875rem' : '0.75rem',
                      fontWeight: 500,
                      opacity: metrica.priority === 'low' ? 0.8 : 1,
                      lineHeight: 1.3,
                    }}
                  >
                    {metrica.label}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        
        <Box sx={{ 
          height: 400, 
          mb: 4, 
          width: '100%', 
          maxWidth: '100%',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <CrecimientoChart />
        </Box>

        <Box sx={{ 
          my: 6, 
          height: 1, 
          background: `linear-gradient(90deg, transparent 0%, ${alpha('#5b24b7', 0.1)} 50%, transparent 100%)` 
        }} />

        <Box sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              color: '#1e293b',
              letterSpacing: '-0.02em'
            }}>
              Balance de Seguidores
            </Typography>
            <Chip 
              label="Últimos 30 días"
              size="small"
              sx={{
                backgroundColor: alpha('#10b981', 0.1),
                color: '#059669',
                fontWeight: 600,
                border: `1px solid ${alpha('#10b981', 0.2)}`,
              }}
            />
          </Stack>
          <Typography variant="body1" sx={{ color: '#64748b', mb: 3 }}>
            Flujo neto de seguidores ganados y perdidos
          </Typography>
        </Box>
        
        <Box sx={{ 
          height: 300, 
          width: '100%', 
          maxWidth: '100%',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <BalanceSeguidoresChart />
        </Box>
      </ChartCard>
    </Box>
  );
};

export default ComunidadSection; 