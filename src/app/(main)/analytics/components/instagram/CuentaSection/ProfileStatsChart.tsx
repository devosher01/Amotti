"use client";
import React, { useMemo } from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import dynamic from 'next/dynamic';
import { ProfileStatsChartData } from './types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ProfileStatsChartProps {
  readonly data?: ProfileStatsChartData;
  readonly height?: number;
}

const ProfileStatsChart: React.FC<ProfileStatsChartProps> = ({
  data,
  height = 200
}) => {
  const theme = useTheme();

  const defaultData: ProfileStatsChartData = useMemo(() => ({
    categories: [
      '28 May', '31 May', '3 Jun', '6 Jun', '9 Jun', '12 Jun',
      '15 Jun', '18 Jun', '21 Jun', '24 Jun'
    ],
    series: [{
      name: 'Métricas del perfil',
      data: [0, 0, 0, 0, 0, 0.8, 0.9, 0, 1.0, 0.8]
    }]
  }), []);

  const chartOptions = useMemo(() => ({
    chart: {
      type: 'bar' as const,
      height,
      toolbar: { show: false },
      background: 'transparent',
      sparkline: { enabled: false }
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        borderRadius: 4,
        colors: {
          ranges: [{
            from: 0,
            to: 1,
            color: '#d4a574'
          }]
        }
      }
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    grid: {
      show: true,
      borderColor: alpha('#d4a574', 0.1),
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } }
    },
    xaxis: {
      categories: data?.categories || defaultData.categories,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '11px',
          fontWeight: 500
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '11px'
        }
      },
      min: 0,
      max: 1,
      tickAmount: 3
    },
    tooltip: {
      theme: 'light' as const,
      style: { fontSize: '12px' },
      y: {
        formatter: (value: number) => `${(value * 100).toFixed(1)}%`
      }
    },
    colors: ['#d4a574']
  }), [theme, data, defaultData, height]);

  const chartSeries = useMemo(() => 
    (data?.series || defaultData.series) as any,
    [data, defaultData]
  );

  return (
    <Box sx={{ 
      width: '100%', 
      height,
      '& .apexcharts-canvas': {
        margin: '0 auto'
      }
    }}>
      <Chart 
        options={chartOptions} 
        series={chartSeries} 
        type="bar" 
        height={height} 
      />
    </Box>
  );
};

export default ProfileStatsChart;
