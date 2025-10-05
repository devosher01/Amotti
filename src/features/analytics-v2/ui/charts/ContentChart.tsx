'use client';

import React from 'react';
import { Box, Typography, useTheme, alpha, Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';
import { Post } from '../../core/api/types';
import { EmptyState } from '../components/EmptyState';

// Lazy load ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ContentChartProps {
  posts: Post[];
  title: string;
  height?: number;
  isLoading?: boolean;
  error?: string | null;
}

export function ContentChart({ 
  posts, 
  title, 
  height = 350, 
  isLoading = false,
  error = null 
}: ContentChartProps) {
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
        title="Error al cargar gráfico"
        description={error}
        height={height}
      />
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <EmptyState
        type="no-data"
        title="No hay posts disponibles"
        description="No se encontraron publicaciones para analizar"
        height={height}
      />
    );
  }

  // Process posts data by content type
  const getAverageByType = (type: string, metric: keyof Post) => {
    const typePosts = posts.filter(p => p.type === type);
    if (typePosts.length === 0) return 0;
    const sum = typePosts.reduce((acc, post) => acc + (Number(post[metric]) || 0), 0);
    return Math.round(sum / typePosts.length);
  };

  const contentTypes = ['photo', 'video', 'text', 'carousel', 'reel', 'story'];
  const availableTypes = contentTypes.filter(type => 
    posts.some(post => post.type === type)
  );

  const series = [
    {
      name: 'Me Gusta',
      data: availableTypes.map(type => getAverageByType(type, 'likesCount')),
    },
    {
      name: 'Comentarios', 
      data: availableTypes.map(type => getAverageByType(type, 'commentsCount')),
    },
    {
      name: 'Impresiones',
      data: availableTypes.map(type => getAverageByType(type, 'impressions')),
    },
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
        speed: 800,
      },
    },
    
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
    ],
    
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 4,
        dataLabels: {
          position: 'top' as const,
        },
      },
    },
    
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: '12px',
        fontWeight: 600,
        colors: [theme.palette.text.primary],
      },
      formatter: (value: number) => value.toLocaleString('es-ES'),
    },
    
    grid: {
      show: true,
      borderColor: alpha(theme.palette.divider, 0.1),
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
      categories: availableTypes.map(type => 
        type.charAt(0).toUpperCase() + type.slice(1)
      ),
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px',
          fontWeight: '500',
        },
      },
      axisBorder: {
        show: true,
        color: alpha(theme.palette.divider, 0.2),
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
        formatter: (value: number) => value.toLocaleString('es-ES'),
      },
      axisBorder: {
        show: true,
        color: alpha(theme.palette.divider, 0.2),
      },
      axisTicks: {
        show: false,
      },
    },
    
    legend: {
      show: true,
      position: 'top' as const,
      horizontalAlign: 'center' as const,
      floating: false,
      offsetY: 0,
      labels: {
        colors: theme.palette.text.secondary,
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
      itemMargin: {
        horizontal: 20,
        vertical: 5,
      },
    },
    
    tooltip: {
      theme: 'light' as const,
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: (value: number) => `${value.toLocaleString('es-ES')} (promedio)`,
      },
    },
    
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: 'bottom' as const,
          },
          chart: {
            height: height - 50,
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
        background: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: `0 2px 12px ${alpha(theme.palette.grey[500], 0.08)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: `0 8px 24px ${alpha(theme.palette.grey[500], 0.12)}`,
          borderColor: alpha(theme.palette.primary.main, 0.2),
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          mb: 3,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </Typography>
      
      <Box sx={{ height: height - 60, width: '100%' }}>
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height={height - 60}
          width="100%"
        />
      </Box>
    </Box>
  );
}