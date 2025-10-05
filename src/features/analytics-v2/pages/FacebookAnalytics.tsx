'use client';

import React from 'react';
import { Box, Typography, Avatar, Stack, Alert, useTheme, alpha } from '@mui/material';
import { IconBrandFacebook } from '@tabler/icons-react';
import { useFacebookAnalytics } from '../core/hooks/useAnalyticsV2';
import { useFiltersStore } from '../core/store/filtersStore';
import { useConnectionsQuery } from '@/features/oauth/presentation/hooks/queries/useConnectionsQuery';
import { 
  AnalyticsLayout, 
  MetricsGrid, 
  ChartsGrid 
} from '../ui/layout/AnalyticsLayout';
import { MetricCard } from '../ui/components/MetricCard';
import { DateSelector } from '../ui/components/DateSelector';
import { EmptyState } from '../ui/components/EmptyState';
import { PostsCarousel } from '../ui/components/PostsCarousel';
import { PostsTable } from '../ui/components/PostsTable';
import { EngagementChart } from '../ui/charts/EngagementChart';
import { GrowthChart } from '../ui/charts/GrowthChart';
import { ModernContentChart } from '../ui/charts/ModernContentChart';
import PageContainer from '@/features/shared/components/container/PageContainer';

export default function FacebookAnalytics() {
  const theme = useTheme();
  const { timeRange, setTimeRange } = useFiltersStore();
  const { connections, isLoading: connectionsLoading } = useConnectionsQuery();
  
  // Get Facebook connection
  const facebookConnection = connections?.facebook?.find(conn => conn.isActive);
  
  // Fetch analytics data
  const {
    metrics,
    posts,
    isLoading,
    error,
  } = useFacebookAnalytics(timeRange, !!facebookConnection && !connectionsLoading);

  const renderHeader = () => (
    <Box
      sx={{
        p: { xs: 3, sm: 4, md: 5 },
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
        gap: 3,
        alignItems: 'center',
      }}
    >
      <Stack direction="row" spacing={3} alignItems="center">
        <Avatar
          sx={{
            width: { xs: 56, md: 72 },
            height: { xs: 56, md: 72 },
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        >
          <IconBrandFacebook size={32} />
        </Avatar>
        
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: theme.palette.text.primary,
              mb: 0.5,
              letterSpacing: '-0.02em',
            }}
          >
            Facebook Analytics
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            Análisis completo de rendimiento y engagement
          </Typography>
        </Box>
      </Stack>

      <DateSelector
        value={timeRange}
        onChange={setTimeRange}
        size="medium"
      />
    </Box>
  );

  const renderConnectionError = () => (
    <Alert
      severity="warning"
      sx={{
        borderRadius: 3,
        p: 3,
        border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
        '& .MuiAlert-icon': {
          fontSize: '1.5rem',
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
        Conexión de Facebook requerida
      </Typography>
      <Typography variant="body2">
        Para visualizar las analíticas, necesitas conectar tu página de Facebook.
        Ve a la sección de conexiones para vincular tu cuenta.
      </Typography>
    </Alert>
  );

  const renderMetrics = () => {
    if (!metrics.data?.metrics) return null;

    const metricsData = metrics.data.metrics;
    const getMetric = (type: string) => metricsData.find(m => m.type === type);

    return (
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 3,
            letterSpacing: '-0.01em',
          }}
        >
          Métricas Principales
        </Typography>
        
        <MetricsGrid>
          <MetricCard
            metric={getMetric('page_follows') || { type: 'page_follows', value: 0 }}
            label="Seguidores"
            priority="high"
            color={theme.palette.primary.main}
          />
          <MetricCard
            metric={getMetric('page_post_engagements') || { type: 'page_post_engagements', value: 0 }}
            label="Engagement"
            priority="high"
            color={theme.palette.secondary.main}
          />
          <MetricCard
            metric={getMetric('page_impressions') || { type: 'page_impressions', value: 0 }}
            label="Impresiones"
            priority="medium"
            color={theme.palette.success.main}
          />
          <MetricCard
            metric={getMetric('page_reach') || { type: 'page_reach', value: 0 }}
            label="Alcance"
            priority="medium"
            color={theme.palette.info.main}
          />
          <MetricCard
            metric={getMetric('page_video_views') || { type: 'page_video_views', value: 0 }}
            label="Video Views"
            priority="medium"
            color={theme.palette.warning.main}
          />
        </MetricsGrid>
      </Box>
    );
  };

  const renderCharts = () => (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          mb: 3,
          letterSpacing: '-0.01em',
        }}
      >
        Análisis de Tendencias
      </Typography>
      
      <ChartsGrid>
        <EngagementChart
          data={metrics.data ? [metrics.data] : []}
          title="Tasa de Engagement"
          height={380}
          isLoading={metrics.isLoading}
          error={metrics.error?.message || null}
        />
        
        <GrowthChart
          data={metrics.data ? [metrics.data] : []}
          title="Crecimiento de Audiencia"
          height={380}
          isLoading={metrics.isLoading}
          error={metrics.error?.message || null}
        />
      </ChartsGrid>
      
      {/* Gráfico especializado para contenido */}
      <Box sx={{ mt: 4 }}>
        <ModernContentChart
          posts={posts.data?.posts || []}
          title="Rendimiento por Tipo de Contenido"
          height={400}
          isLoading={posts.isLoading}
          error={posts.error?.message || null}
        />
      </Box>
    </Box>
  );

  const renderPosts = () => {
    if (!posts.data?.posts?.length) {
      return (
        <EmptyState
          type="no-data"
          title="No hay publicaciones"
          description="No se encontraron publicaciones para el período seleccionado"
          height={300}
        />
      );
    }

    return (
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 3,
            letterSpacing: '-0.01em',
          }}
        >
          Análisis de Contenido
        </Typography>
        
        {/* Carrusel de posts destacados */}
        {/* <PostsCarousel
          posts={posts.data.posts}
          title="Posts con Mejor Rendimiento"
          isLoading={posts.isLoading}
        /> */}
        
        {/* Tabla completa de posts */}
        <PostsTable
          posts={posts.data.posts}
          isLoading={posts.isLoading}
        />
      </Box>
    );
  };

  return (
    <PageContainer title="Facebook Analytics" description="Análisis detallado de Facebook">
      <AnalyticsLayout maxWidth="1400px">
        {renderHeader()}
        
        {connectionsLoading ? (
          <Box sx={{ display: 'grid', gap: 3 }}>
            {[1, 2, 3].map((i) => (
              <Box
                key={i}
                sx={{
                  height: 200,
                  borderRadius: 3,
                  background: alpha(theme.palette.grey[100], 0.5),
                  animation: 'pulse 1.5s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 },
                  },
                }}
              />
            ))}
          </Box>
        ) : !facebookConnection ? (
          renderConnectionError()
        ) : (
          <>
            {renderMetrics()}
            {renderCharts()}
            {renderPosts()}
          </>
        )}
      </AnalyticsLayout>
    </PageContainer>
  );
}