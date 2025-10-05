'use client';

import React from 'react';
import { Box, Typography, useTheme, alpha, Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';
import { AnalyticsResponse } from '../../core/api/types';
import { EmptyState } from '../components/EmptyState';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface EngagementChartProps {
  data: AnalyticsResponse[];
  title: string;
  height?: number;
  isLoading?: boolean;
  error?: string | null;
}

export function EngagementChart({ 
  data, 
  title, 
  height = 380, 
  isLoading = false,
  error = null 
}: EngagementChartProps) {
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
        title="Error al cargar engagement"
        description={error}
        height={height}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        type="no-data"
        title="No hay datos de engagement"
        description="No se encontraron datos para mostrar"
        height={height}
      />
    );
  }

  // Process data for engagement metrics
  const processedData = data.map(item => {
    const engagement = item.metrics.find(m => m.type === 'page_post_engagements')?.value || 0;
    const impressions = item.metrics.find(m => m.type === 'reach')?.value || 0;
    
    return {
      date: new Date(item.period.startDate).getTime(),
      engagement,
      impressions,
      rate: impressions > 0 ? (engagement / impressions * 100) : 0
    };
  });

  const series = [
    {
      name: 'Tasa de Engagement (%)',
      type: 'area',
      data: processedData.map(item => [item.date, Number(item.rate.toFixed(2))])
    },
    {
      name: 'Interacciones',
      type: 'line',
      data: processedData.map(item => [item.date, item.engagement])
    }
  ];

  const chartOptions = {
    chart: {
      type: 'line' as const,
      height,
      toolbar: { show: false },
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout' as const,
        speed: 1200,
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      zoom: {
        enabled: false
      }
    },
    
    colors: [
      `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      theme.palette.info.main,
    ],
    
    fill: {
      type: ['gradient', 'solid'],
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: [theme.palette.secondary.main],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    
    stroke: {
      width: [0, 3],
      curve: 'smooth' as const,
      lineCap: 'round' as const
    },
    
    grid: {
      show: true,
      borderColor: alpha(theme.palette.divider, 0.08),
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: {
        top: 0,
        right: 30,
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
    
    yaxis: [
      {
        title: {
          text: 'Tasa de Engagement (%)',
          style: {
            color: theme.palette.text.secondary,
            fontSize: '12px',
            fontWeight: '600',
          },
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary,
            fontSize: '12px',
          },
          formatter: (value: number) => `${value.toFixed(1)}%`,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      {
        opposite: true,
        title: {
          text: 'Interacciones Totales',
          style: {
            color: theme.palette.text.secondary,
            fontSize: '12px',
            fontWeight: '600',
          },
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary,
            fontSize: '12px',
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
      y: [
        {
          formatter: (value: number) => `${value}%`,
        },
        {
          formatter: (value: number) => value.toLocaleString('es-ES'),
        }
      ],
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
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
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
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        },
        '&:hover': {
          boxShadow: `0 8px 32px ${alpha(theme.palette.grey[500], 0.12)}`,
          borderColor: alpha(theme.palette.primary.main, 0.15),
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          mb: 2,
          letterSpacing: '-0.02em',
          fontSize: '1.1rem',
        }}
      >
        {title}
      </Typography>
      
      <Box sx={{ height: height - 80, width: '100%' }}>
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          height={height - 80}
          width="100%"
        />
      </Box>
    </Box>
  );
}