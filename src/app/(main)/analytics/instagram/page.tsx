"use client";
import React from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Chip,
  Avatar,
  Stack,
  Alert,
  useTheme,
  alpha,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconBrandInstagram,
  IconChartLine,
} from "@tabler/icons-react";

import dynamic from "next/dynamic";
import { useTimeRange } from '@/features/analytics/application/hooks/useTimeRange';
import TimeRangeSelector from '@/features/analytics/presentation/components/TimeRangeSelector';
import InstagramMetricsCard from '@/features/analytics/presentation/components/InstagramMetricsCard';
import InstagramPostsTable from '@/features/analytics/presentation/components/InstagramPostsTable';
import { useAnalyticsWithConnections } from '@/features/analytics/presentation/hooks/useAnalyticsWithConnections';
import PageContainer from "@/features/shared/components/container/PageContainer";
import { HeaderCard } from "@/features/welcome-dashboard/presentation/styles/StyledComponents";

// Importar ApexCharts dinámicamente
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Styled Components
const AccentChip = styled(Chip)<{
  chipvariant?: "primary" | "success" | "info";
}>(({ theme, chipvariant = "info" }) => {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        };
      case "success":
        return {
          backgroundColor: alpha(theme.palette.success.main, 0.1),
          color: theme.palette.success.dark,
          border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
        };
      default:
        return {
          backgroundColor: alpha(theme.palette.grey[500], 0.1),
          color: theme.palette.grey[700],
          border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
        };
    }
  };

  return {
    fontWeight: 600,
    fontSize: "0.875rem",
    ...getVariantStyles(chipvariant),
  };
});

// Skeleton Components
const MetricsSkeleton = () => {
  const theme = useTheme();
  return (
  <Card sx={{
    p: { xs: 2, sm: 3, md: 5 },
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    borderRadius: 3,
    boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
    mb: 3,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden'
  }}>
    <Box sx={{ mb: 4 }}>
      <Skeleton variant="text" width="40%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="60%" height={24} />
    </Box>
    <Grid container spacing={3}>
      {[1, 2, 3, 4, 5].map((item) => (
        <Grid item xs={6} sm={4} lg={2} key={item}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="60%" height={20} />
          </Card>
        </Grid>
      ))}
    </Grid>
  </Card>
  );
};

const PostsTableSkeleton = () => {
  const theme = useTheme();
  return (
  <Card sx={{
    p: { xs: 2, sm: 3, md: 5 },
    border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
    borderRadius: 3,
    boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.04)}`,
    mb: 3,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden'
  }}>
    <Box sx={{ mb: 4 }}>
      <Skeleton variant="text" width="40%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="60%" height={24} />
    </Box>
    <Box sx={{ border: `1px solid ${alpha(theme.palette.divider, 0.5)}`, borderRadius: 0 }}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
        <Grid container spacing={2}>
          {['Fecha', 'Tipo', 'Mensaje', 'Likes', 'Comentarios', 'Impresiones', 'Clics'].map((header) => (
            <Grid item xs key={header}>
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {[1, 2, 3, 4, 5].map((row) => (
        <Box key={row} sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
          <Grid container spacing={2}>
            <Grid item xs>
              <Skeleton variant="text" width="80%" height={20} />
            </Grid>
            <Grid item xs>
              <Skeleton variant="text" width="60%" height={20} />
            </Grid>
            <Grid item xs>
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
            <Grid item xs>
              <Skeleton variant="text" width="40%" height={20} />
            </Grid>
            <Grid item xs>
              <Skeleton variant="text" width="40%" height={20} />
            </Grid>
            <Grid item xs>
              <Skeleton variant="text" width="40%" height={20} />
            </Grid>
            <Grid item xs>
              <Skeleton variant="text" width="40%" height={20} />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  </Card>
  );
};

const ChartSkeleton = () => {
  const theme = useTheme();
  return (
  <Card sx={{
    p: { xs: 2, sm: 3, md: 5 },
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    borderRadius: 3,
    boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
    mb: 3,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden'
  }}>
    <Box sx={{ mb: 4 }}>
      <Skeleton variant="text" width="40%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="60%" height={24} />
    </Box>
    <Card sx={{
      p: 3,
      height: 420,
      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      borderRadius: 3,
      boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
    }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton variant="text" width="30%" height={32} />
        <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 2 }} />
      </Box>
      <Skeleton variant="rectangular" width="100%" height={350} sx={{ borderRadius: 2 }} />
    </Card>
  </Card>
  );
};

export default function InstagramAnalytics() {
  const theme = useTheme();

  const { timeRange, dateRange, handleTimeRangeChange } = useTimeRange('30d');

  // Hook optimizado que maneja connections y analytics automáticamente
  const {
    instagramConnection,
    instagramAnalytics,
    instagramPosts,
    connectionsLoading,
    isLoading,
  } = useAnalyticsWithConnections({ 
    dateRange, 
    postsLimit: 10 
  });

  return (
    <PageContainer title="Analíticas de Instagram" description="Dashboard detallado de Instagram">
      <Box sx={{
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        px: { xs: 1, sm: 2, md: 3 },
        boxSizing: 'border-box'
      }}>
        {/* Header con degradado Instagram */}
        <HeaderCard sx={{ maxWidth: '100%', overflow: 'hidden' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={3}
                sx={{ mb: 3 }}
              >
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    background:
                      `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    color: "white",
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                  }}
                >
                  <IconBrandInstagram size={32} />
                </Avatar>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, mb: 1, color: "#1e293b" }}
                  >
                    Analíticas de Instagram
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#64748b" }}>
                    Comunidad, engagement y rendimiento de contenido
                  </Typography>
                </Box>
              </Stack>

             
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
                <TimeRangeSelector
                  currentTimeRange={timeRange}
                  onTimeRangeChange={handleTimeRangeChange}
                />
              </Box>
            </Grid>
          </Grid>
        </HeaderCard>

        {/* Métricas principales */}
        {connectionsLoading ? (
          <Box>
            <MetricsSkeleton />
            <PostsTableSkeleton />
            <ChartSkeleton />
          </Box>
        ) : !instagramConnection ? (
          <Card sx={{ p: 5 }}>
            <Alert severity="warning">
              <Typography variant="h6" sx={{ mb: 1 }}>
                No hay conexión de Instagram
              </Typography>
            <Typography variant="body2">
                Necesitas conectar tu cuenta de Instagram para ver las analíticas.
                Ve a la sección de conexiones para vincular tu cuenta.
            </Typography>
          </Alert>
          </Card>
        ) : instagramAnalytics.isLoading ? (
          <MetricsSkeleton />
        ) : (
          <InstagramMetricsCard
            data={instagramAnalytics.data}
            loading={instagramAnalytics.isLoading}
            error={instagramAnalytics.error}
          />
        )}

        {/* Gráfico de Evolución de Métricas */}
        {instagramConnection && (
        <Card sx={{ 
          p: { xs: 2, sm: 3, md: 5 },
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: 3,
            boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
          mb: 3,
            mt: 3,
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
                Evolución de Métricas
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b' }}>
                Gráfico de tendencias basado en datos reales de Instagram
            </Typography>
          </Box>
          
            <Card sx={{ 
              p: 3, 
              height: 420,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 3,
              boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
                borderColor: alpha(theme.palette.primary.main, 0.3),
              }
            }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  Tendencias de Rendimiento
                </Typography>
                <Chip
                  label={`${timeRange === '7d' ? 'Últimos 7 días' : timeRange === '30d' ? 'Últimos 30 días' : timeRange === '90d' ? 'Últimos 90 días' : 'Último año'}`}
                  size="small"
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                />
              </Stack>
              
              <Box sx={{ width: '100%', height: 300, maxWidth: '100%', overflow: 'hidden', pt: 2 }}>
                {instagramAnalytics.isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }} />
                ) : instagramAnalytics.data && instagramAnalytics.data.metrics.length > 0 ? (
                  <Chart
                    options={{
                      chart: {
                        type: 'bar',
                        height: 280,
                        toolbar: { show: false },
                        background: 'transparent',
                        animations: {
                          enabled: true,
                          easing: 'easeinout',
                          speed: 800
                        }
                      },
                      colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.warning.main, theme.palette.info.main],
                      plotOptions: {
                        bar: {
                          horizontal: false,
                          columnWidth: '60%',
                          borderRadius: 4,
                          dataLabels: {
                            position: 'top'
                          },
                          distributed: true
                        }
                      },
                      dataLabels: {
                        enabled: true,
                        offsetY: -20,
                        style: {
                          fontSize: '14px',
                          fontWeight: 'bold',
                          colors: ['#374151']
                        },
                        formatter: function(val: number) {
                          return Math.round(val).toLocaleString();
                        }
                      },
                      grid: {
                        show: true,
                        borderColor: '#e5e7eb',
                        strokeDashArray: 2,
                        yaxis: {
                          lines: {
                            show: true
                          }
                        },
                        xaxis: {
                          lines: {
                            show: false
                          }
                        },
                        padding: {
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0
                        }
                      },
                      xaxis: {
                        categories: ['Alcance', 'Vistas del Perfil', 'Likes', 'Comentarios'],
                        labels: {
                          style: {
                            colors: '#64748b',
                            fontSize: '12px',
                            fontWeight: '500'
                          }
                        },
                        axisBorder: {
                          show: true,
                          color: '#e5e7eb'
                        },
                        axisTicks: {
                          show: false
                        }
                      },
                      yaxis: {
                        min: 0,
                        forceNiceScale: true,
                        labels: {
                          style: {
                            colors: '#64748b',
                            fontSize: '12px',
                            fontWeight: '500'
                          },
                          formatter: function(val: number) {
                            return Math.round(val).toLocaleString();
                          }
                        },
                        axisBorder: {
                          show: true,
                          color: '#e5e7eb'
                        },
                        axisTicks: {
                          show: false
                        }
                      },
                      legend: {
                        show: false
                      },
                      tooltip: {
                        enabled: true,
                        theme: 'light',
                        y: {
                          formatter: function(val: number) {
                            return Math.round(val).toLocaleString();
                          }
                        }
                      }
                    }}
                    series={[{
                      name: 'Métricas Instagram',
                      data: [
                        instagramAnalytics.data.metrics.find((m: any) => m.type === 'reach')?.value || 0,
                        instagramAnalytics.data.metrics.find((m: any) => m.type === 'profile_views')?.value || 0,
                        instagramAnalytics.data.metrics.find((m: any) => m.type === 'likes')?.value || 0,
                        instagramAnalytics.data.metrics.find((m: any) => m.type === 'comments')?.value || 0,
                      ]
                    }]}
                    type="bar"
                    height={280}
                    width="100%"
                  />
                ) : (
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <IconChartLine size={48} color="#64748b" />
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 2 }}>
                      No hay datos de métricas disponibles
                    </Typography>
                  </Box>
                )}
              </Box>
            </Card>
          </Card>
        )}

        {/* Gráfico de Rendimiento por Tipo de Post */}
        {instagramConnection && (
          <Card sx={{
            p: { xs: 2, sm: 3, md: 5 },
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderRadius: 3,
            boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
            mb: 3,
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
                Rendimiento por Tipo de Contenido
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                Análisis de engagement y alcance por categoría de post
              </Typography>
            </Box>

            <Card sx={{ 
              p: 3, 
              height: 420,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 3,
              boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
                borderColor: alpha(theme.palette.primary.main, 0.3),
              }
            }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  Análisis de Contenido
              </Typography>
                <Chip
                  label="Últimos Posts"
                  size="small"
                  sx={{
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                    fontWeight: 600,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                  }}
                />
              </Stack>

              <Box sx={{ width: '100%', height: 350, maxWidth: '100%', overflow: 'hidden', pt: 2 }}>
                {instagramPosts.isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={350} sx={{ borderRadius: 2 }} />
                ) : instagramPosts.data && instagramPosts.data.length > 0 ? (
                  <Chart
                    options={{
                      chart: {
                        type: 'bar',
                        height: 350,
                        toolbar: { show: false },
                        background: 'transparent',
                        width: '100%',
                        parentHeightOffset: 0,
                        animations: { enabled: true, easing: 'easeinout', speed: 800 }
                      },
                      responsive: [
                        {
                          breakpoint: 9999,
                          options: {
                            chart: { width: '100%' },
                            plotOptions: { bar: { columnWidth: '60%' } }
                          }
                        }
                      ],
                      colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.warning.main, theme.palette.info.main, theme.palette.error.main],
                      dataLabels: { 
                        enabled: true,
                        style: {
                          fontSize: '12px',
                          fontWeight: 600,
                          colors: ['#fff']
                        }
                      },
                      legend: {
                        show: true,
                        position: 'top',
                        horizontalAlign: 'center',
                        offsetY: 0,
                        offsetX: 0,
                        labels: {
                          colors: '#64748b',
                          useSeriesColors: false
                        },
                        markers: {
                          width: 12,
                          height: 12,
                          radius: 6
                        },
                        itemMargin: {
                          horizontal: 20,
                          vertical: 5
                        }
                      },
                      grid: {
                        show: true,
                        borderColor: alpha(theme.palette.primary.main, 0.1),
                        strokeDashArray: 3,
                      },
                      xaxis: {
                        categories: ['Photo', 'Video', 'Carousel', 'Story', 'Reel'],
                        labels: {
                          style: { colors: '#64748b', fontSize: '12px' },
                        },
                      },
                      yaxis: {
                        labels: {
                          style: { colors: '#64748b', fontSize: '12px' },
                          formatter: (value: number) => value.toLocaleString()
                        },
                      },
                      tooltip: {
                        theme: 'light',
                        style: { fontSize: '12px' },
                        y: {
                          formatter: (value: number) => value.toLocaleString()
                        }
                      },
                      plotOptions: {
                        bar: {
                          horizontal: false,
                          columnWidth: '60%',
                          borderRadius: 4,
                          dataLabels: {
                            position: 'top'
                          }
                        }
                      }
                    }}
                    series={[
                      {
                        name: 'Likes Promedio',
                        data: [
                          (() => {
                            const photoPosts = instagramPosts.data.filter((p: any) => p.type === 'photo');
                            return photoPosts.length > 0 ? photoPosts.reduce((sum: number, p: any) => sum + p.likesCount, 0) / photoPosts.length : 0;
                          })(),
                          (() => {
                            const videoPosts = instagramPosts.data.filter((p: any) => p.type === 'video');
                            return videoPosts.length > 0 ? videoPosts.reduce((sum: number, p: any) => sum + p.likesCount, 0) / videoPosts.length : 0;
                          })(),
                          (() => {
                            const carouselPosts = instagramPosts.data.filter((p: any) => p.type === 'carousel');
                            return carouselPosts.length > 0 ? carouselPosts.reduce((sum: number, p: any) => sum + p.likesCount, 0) / carouselPosts.length : 0;
                          })(),
                          (() => {
                            const storyPosts = instagramPosts.data.filter((p: any) => p.type === 'story');
                            return storyPosts.length > 0 ? storyPosts.reduce((sum: number, p: any) => sum + p.likesCount, 0) / storyPosts.length : 0;
                          })(),
                          (() => {
                            const reelPosts = instagramPosts.data.filter((p: any) => p.type === 'reel');
                            return reelPosts.length > 0 ? reelPosts.reduce((sum: number, p: any) => sum + p.likesCount, 0) / reelPosts.length : 0;
                          })()
                        ]
                      },
                      {
                        name: 'Comentarios Promedio',
                        data: [
                          (() => {
                            const photoPosts = instagramPosts.data.filter((p: any) => p.type === 'photo');
                            return photoPosts.length > 0 ? photoPosts.reduce((sum: number, p: any) => sum + p.commentsCount, 0) / photoPosts.length : 0;
                          })(),
                          (() => {
                            const videoPosts = instagramPosts.data.filter((p: any) => p.type === 'video');
                            return videoPosts.length > 0 ? videoPosts.reduce((sum: number, p: any) => sum + p.commentsCount, 0) / videoPosts.length : 0;
                          })(),
                          (() => {
                            const carouselPosts = instagramPosts.data.filter((p: any) => p.type === 'carousel');
                            return carouselPosts.length > 0 ? carouselPosts.reduce((sum: number, p: any) => sum + p.commentsCount, 0) / carouselPosts.length : 0;
                          })(),
                          (() => {
                            const storyPosts = instagramPosts.data.filter((p: any) => p.type === 'story');
                            return storyPosts.length > 0 ? storyPosts.reduce((sum: number, p: any) => sum + p.commentsCount, 0) / storyPosts.length : 0;
                          })(),
                          (() => {
                            const reelPosts = instagramPosts.data.filter((p: any) => p.type === 'reel');
                            return reelPosts.length > 0 ? reelPosts.reduce((sum: number, p: any) => sum + p.commentsCount, 0) / reelPosts.length : 0;
                          })()
                        ]
                      },
                      {
                        name: 'Impresiones Promedio',
                        data: [
                          (() => {
                            const photoPosts = instagramPosts.data.filter((p: any) => p.type === 'photo');
                            return photoPosts.length > 0 ? photoPosts.reduce((sum: number, p: any) => sum + p.impressions, 0) / photoPosts.length : 0;
                          })(),
                          (() => {
                            const videoPosts = instagramPosts.data.filter((p: any) => p.type === 'video');
                            return videoPosts.length > 0 ? videoPosts.reduce((sum: number, p: any) => sum + p.impressions, 0) / videoPosts.length : 0;
                          })(),
                          (() => {
                            const carouselPosts = instagramPosts.data.filter((p: any) => p.type === 'carousel');
                            return carouselPosts.length > 0 ? carouselPosts.reduce((sum: number, p: any) => sum + p.impressions, 0) / carouselPosts.length : 0;
                          })(),
                          (() => {
                            const storyPosts = instagramPosts.data.filter((p: any) => p.type === 'story');
                            return storyPosts.length > 0 ? storyPosts.reduce((sum: number, p: any) => sum + p.impressions, 0) / storyPosts.length : 0;
                          })(),
                          (() => {
                            const reelPosts = instagramPosts.data.filter((p: any) => p.type === 'reel');
                            return reelPosts.length > 0 ? reelPosts.reduce((sum: number, p: any) => sum + p.impressions, 0) / reelPosts.length : 0;
                          })()
                        ]
                      }
                    ]}
                    type="bar"
                    height={350}
                    width="100%"
                  />
                ) : (
                  <Box sx={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <IconChartLine size={48} color="#64748b" />
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 2 }}>
                      No hay datos de posts disponibles
                  </Typography>
                </Box>
                )}
                    </Box>
            </Card>
          </Card>
        )}

        {/* Tabla de Publicaciones */}
        {instagramConnection && (
          instagramPosts.isLoading ? (
            <PostsTableSkeleton />
          ) : (
            <InstagramPostsTable
              posts={instagramPosts.data}
              loading={instagramPosts.isLoading}
              error={instagramPosts.error}
            />
          )
        )}

      </Box>
    </PageContainer>
  );
}
