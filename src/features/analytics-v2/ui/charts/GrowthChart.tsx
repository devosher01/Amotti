'use client';

import React from 'react';
import { Box, Typography, useTheme, alpha, Skeleton, Stack, Chip } from '@mui/material';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { AnalyticsResponse } from '../../core/api/types';
import { EmptyState } from '../components/EmptyState';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface GrowthChartProps {
  data: AnalyticsResponse[];
  title: string;
  height?: number;
  isLoading?: boolean;
  error?: string | null;
}

export function GrowthChart({ 
  data, 
  title, 
  height = 350, 
  isLoading = false,
  error = null 
}: GrowthChartProps) {
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
        title="Error al cargar crecimiento"
        description={error}
        height={height}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        type="no-data"
        title="No hay datos de crecimiento"
        description="No se encontraron datos para mostrar"
        height={height}
      />
    );
  }

  // Calculate growth metrics
  const processedData = data.map((item, index) => {
    const prevItem = index > 0 ? data[index - 1] : null;
    
    // Get follows from metrics array
    const follows = item.metrics.find(m => m.type === 'page_follows')?.value || 0;
    const impressions = item.metrics.find(m => m.type === 'reach')?.value || 0;
    const prevFollows = prevItem?.metrics.find(m => m.type === 'page_follows')?.value || 0;
    const prevImpressions = prevItem?.metrics.find(m => m.type === 'reach')?.value || 0;
    
    const followsGrowth = prevItem ? (follows - prevFollows) : 0;
    const impressionsGrowth = prevItem ? (impressions - prevImpressions) : 0;

    return {
      date: new Date(item.period.startDate).getTime(),
      follows,
      impressions,
      followsGrowth,
      impressionsGrowth,
    };
  });

  // Calculate total growth
  const totalFollowsGrowth = processedData.reduce((sum, item) => sum + item.followsGrowth, 0);
  const avgFollowsGrowth = processedData.length > 0 ? totalFollowsGrowth / processedData.length : 0;

  const series = [
    {
      name: 'Nuevos Seguidores',
      data: processedData.map(item => [item.date, item.followsGrowth])
    },
    {
      name: 'Crecimiento Impresiones',
      data: processedData.map(item => [item.date, item.impressionsGrowth])
    }
  ];

  const chartOptions = {
    chart: {
      type: 'area' as const,
      height,
      toolbar: { show: false },
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout' as const,
        speed: 1000,
        dynamicAnimation: {
          enabled: true,
          speed: 400
        }
      },
    },
    
    colors: [
      theme.palette.success.main,
      theme.palette.info.main,
    ],
    
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.2,
        gradientToColors: [
          alpha(theme.palette.success.main, 0.1),
          alpha(theme.palette.info.main, 0.1)
        ],
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    
    stroke: {
      width: 3,
      curve: 'smooth' as const,
      lineCap: 'round' as const
    },
    
    grid: {
      show: true,
      borderColor: alpha(theme.palette.divider, 0.06),
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: {
        top: 0,
        right: 20,
        bottom: 0,
        left: 20,
      },
    },
    
    xaxis: {
      type: 'datetime' as const,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px',
          fontWeight: '500',
        },
        format: 'dd MMM',
        datetimeUTC: false,
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
        formatter: (value: number) => {
          if (Math.abs(value) >= 1000) {
            return `${(value / 1000).toFixed(1)}K`;
          }
          return value.toFixed(0);
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    
    legend: {
      show: true,
      position: 'top' as const,
      horizontalAlign: 'right' as const,
      floating: false,
      offsetY: -10,
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
        horizontal: 15,
        vertical: 5,
      },
    },
    
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light' as const,
      style: {
        fontSize: '12px',
      },
      x: {
        format: 'dd MMM yyyy',
      },
      y: {
        formatter: (value: number) => {
          const sign = value >= 0 ? '+' : '';
          return `${sign}${value.toLocaleString('es-ES')}`;
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
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.success.main, 0.02)} 100%)`,
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
          background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.info.main})`,
        },
        '&:hover': {
          boxShadow: `0 8px 32px ${alpha(theme.palette.grey[500], 0.12)}`,
          borderColor: alpha(theme.palette.success.main, 0.15),
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
          icon={avgFollowsGrowth >= 0 ? <IconTrendingUp size={16} /> : <IconTrendingDown size={16} />}
          label={`${avgFollowsGrowth >= 0 ? '+' : ''}${avgFollowsGrowth.toFixed(1)} promedio`}
          size="small"
          sx={{
            backgroundColor: alpha(
              avgFollowsGrowth >= 0 ? theme.palette.success.main : theme.palette.error.main, 
              0.1
            ),
            color: avgFollowsGrowth >= 0 ? theme.palette.success.main : theme.palette.error.main,
            border: `1px solid ${alpha(
              avgFollowsGrowth >= 0 ? theme.palette.success.main : theme.palette.error.main, 
              0.2
            )}`,
            fontWeight: 600,
          }}
        />
      </Stack>
      
      <Box sx={{ height: height - 100, width: '100%' }}>
        <Chart
          options={chartOptions}
          series={series}
          type="area"
          height={height - 100}
          width="100%"
        />
      </Box>
    </Box>
  );
}