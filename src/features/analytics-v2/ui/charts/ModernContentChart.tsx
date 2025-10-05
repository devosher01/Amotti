'use client';

import React from 'react';
import { Box, Typography, useTheme, alpha, Skeleton, Stack, Chip } from '@mui/material';
import { IconPhoto, IconVideo, IconFileText, IconCategory } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { Post } from '../../core/api/types';
import { EmptyState } from '../components/EmptyState';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ModernContentChartProps {
  posts: Post[];
  title: string;
  height?: number;
  isLoading?: boolean;
  error?: string | null;
}

export function ModernContentChart({ 
  posts, 
  title, 
  height = 400, 
  isLoading = false,
  error = null 
}: ModernContentChartProps) {
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box sx={{ height, p: 3 }}>
        <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={height - 80} sx={{ borderRadius: 2 }} />
      </Box>
    );
  }

  if (error) {
    return (
      <EmptyState
        type="error"
        title="Error al cargar contenido"
        description={error}
        height={height}
      />
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <EmptyState
        type="no-data"
        title="No hay contenido disponible"
        description="No se encontraron publicaciones para analizar"
        height={height}
      />
    );
  }

  // Process posts by content type
  const contentTypes = ['photo', 'video', 'text', 'carousel', 'reel', 'story'];
  const typeData = contentTypes.map(type => {
    const typePosts = posts.filter(p => p.type === type);
    if (typePosts.length === 0) return null;
    
    const avgLikes = typePosts.reduce((sum, p) => sum + p.likesCount, 0) / typePosts.length;
    const avgComments = typePosts.reduce((sum, p) => sum + p.commentsCount, 0) / typePosts.length;
    const avgImpressions = typePosts.reduce((sum, p) => sum + p.impressions, 0) / typePosts.length;
    const engagementRate = avgImpressions > 0 ? ((avgLikes + avgComments) / avgImpressions * 100) : 0;
    
    return {
      type,
      count: typePosts.length,
      avgLikes: Math.round(avgLikes),
      avgComments: Math.round(avgComments),
      avgImpressions: Math.round(avgImpressions),
      engagementRate: Number(engagementRate.toFixed(2))
    };
  }).filter(Boolean);

  const getTypeIcon = (type: string) => {
    const icons = {
      photo: IconPhoto,
      video: IconVideo,
      text: IconFileText,
      carousel: IconCategory,
      reel: IconVideo,
      story: IconPhoto,
    };
    return icons[type as keyof typeof icons] || IconFileText;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      photo: theme.palette.primary.main,
      video: theme.palette.error.main,
      text: theme.palette.grey[600],
      carousel: theme.palette.warning.main,
      reel: theme.palette.secondary.main,
      story: theme.palette.success.main,
    };
    return colors[type as keyof typeof colors] || theme.palette.grey[500];
  };

  const bestPerformer = typeData.reduce((best, current) => 
    current!.engagementRate > best!.engagementRate ? current : best
  );

  const series = [
    {
      name: 'Me Gusta Promedio',
      data: typeData.map(item => item!.avgLikes)
    },
    {
      name: 'Comentarios Promedio',
      data: typeData.map(item => item!.avgComments)
    },
    {
      name: 'Tasa de Engagement (%)',
      data: typeData.map(item => item!.engagementRate)
    }
  ];

  const chartOptions = {
    chart: {
      type: 'bar' as const,
      height,
      toolbar: { show: false },
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout' as const,
        speed: 1200,
        animateGradually: {
          enabled: true,
          delay: 150
        }
      },
    },
    
    colors: [
      `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.7)} 100%)`,
      `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${alpha(theme.palette.info.main, 0.7)} 100%)`,
      `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${alpha(theme.palette.success.main, 0.7)} 100%)`,
    ],
    
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: [
          alpha(theme.palette.primary.main, 0.8),
          alpha(theme.palette.info.main, 0.8),
          alpha(theme.palette.success.main, 0.8)
        ],
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0.7,
        stops: [0, 100]
      }
    },
    
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%',
        borderRadius: 8,
        borderRadiusApplication: 'end' as const,
        dataLabels: {
          position: 'top' as const,
        },
      },
    },
    
    dataLabels: {
      enabled: true,
      offsetY: -25,
      style: {
        fontSize: '11px',
        fontWeight: '600',
        colors: [theme.palette.text.primary],
      },
      formatter: (value: number, { seriesIndex }: { seriesIndex: number }) => {
        if (seriesIndex === 2) return `${value}%`; // Engagement rate
        return value.toLocaleString('es-ES');
      },
    },
    
    grid: {
      show: true,
      borderColor: alpha(theme.palette.divider, 0.08),
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    
    xaxis: {
      categories: typeData.map(item => item!.type.charAt(0).toUpperCase() + item!.type.slice(1)),
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px',
          fontWeight: '600',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    
    yaxis: [
      {
        title: {
          text: 'Interacciones Promedio',
          style: {
            color: theme.palette.text.secondary,
            fontSize: '12px',
            fontWeight: '600',
          },
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary,
            fontSize: '11px',
          },
          formatter: (value: number) => value.toLocaleString('es-ES'),
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      }
    ],
    
    legend: {
      show: true,
      position: 'top' as const,
      horizontalAlign: 'center' as const,
      floating: false,
      offsetY: -5,
      labels: {
        colors: theme.palette.text.secondary,
        useSeriesColors: false,
      },
      markers: {
        width: 14,
        height: 14,
        radius: 7,
      },
      itemMargin: {
        horizontal: 20,
        vertical: 8,
      },
    },
    
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light' as const,
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: (value: number, { seriesIndex }: { seriesIndex: number }) => {
          if (seriesIndex === 2) return `${value}%`;
          return value.toLocaleString('es-ES');
        },
      },
    },
    
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: 'bottom' as const,
            offsetY: 10,
          },
          chart: {
            height: height - 30,
          },
          plotOptions: {
            bar: {
              columnWidth: '80%',
            },
          },
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.warning.main, 0.02)} 100%)`,
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        boxShadow: `0 4px 20px ${alpha(theme.palette.grey[500], 0.08)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.warning.main}, ${theme.palette.success.main})`,
        },
        '&:hover': {
          boxShadow: `0 8px 32px ${alpha(theme.palette.grey[500], 0.12)}`,
          borderColor: alpha(theme.palette.warning.main, 0.15),
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            letterSpacing: '-0.02em',
            fontSize: '1.1rem',
          }}
        >
          {title}
        </Typography>
        
        <Chip
          icon={React.createElement(getTypeIcon(bestPerformer!.type), { size: 16 })}
          label={`${bestPerformer!.type} es el mejor (${bestPerformer!.engagementRate}%)`}
          size="small"
          sx={{
            backgroundColor: alpha(getTypeColor(bestPerformer!.type), 0.1),
            color: getTypeColor(bestPerformer!.type),
            border: `1px solid ${alpha(getTypeColor(bestPerformer!.type), 0.2)}`,
            fontWeight: 600,
            textTransform: 'capitalize',
          }}
        />
      </Stack>
      
      <Box sx={{ height: height - 100, width: '100%' }}>
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height={height - 100}
          width="100%"
        />
      </Box>
    </Box>
  );
}