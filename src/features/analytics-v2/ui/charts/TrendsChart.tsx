'use client';

import React from 'react';
import { Box, Typography, useTheme, alpha, Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';
import { Metric } from '../../core/api/types';
import { EmptyState } from '../components/EmptyState';

// Lazy load ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface TrendsChartProps {
  metrics: Metric[];
  title: string;
  height?: number;
  isLoading?: boolean;
  error?: string | null;
}

export function TrendsChart({ 
  metrics, 
  title, 
  height = 350, 
  isLoading = false,
  error = null 
}: TrendsChartProps) {
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

  if (!metrics || metrics.length === 0) {
    return (
      <EmptyState
        type="no-data"
        title="No hay datos disponibles"
        description="No se encontraron métricas para mostrar en el gráfico"
        height={height}
      />
    );
  }

  // Process metrics data for chart
  const processedData = metrics.reduce((acc, metric) => {
    if (!acc[metric.type]) {
      acc[metric.type] = [];
    }
    acc[metric.type].push({
      x: new Date().getTime(), // For now, using current time - should come from API
      y: metric.value,
    });
    return acc;
  }, {} as Record<string, Array<{ x: number; y: number }>>);

  const series = Object.entries(processedData).map(([type, data]) => ({
    name: type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    data,
  }));

  const chartOptions = {
    chart: {
      type: 'line' as const,
      height,
      toolbar: { show: false },
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout' as const,
        speed: 800,
      },
      zoom: {
        enabled: false,
      },
    },
    
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main,
    ],
    
    stroke: {
      curve: 'smooth' as const,
      width: 3,
    },
    
    dataLabels: {
      enabled: false,
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
      type: 'datetime' as const,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px',
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
        formatter: (value: number) => value.toLocaleString('es-ES'),
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
          type="line"
          height={height - 60}
          width="100%"
        />
      </Box>
    </Box>
  );
}