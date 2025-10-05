'use client';

import React from 'react';
import { Box, Typography, Avatar, Stack, Alert, useTheme, alpha } from '@mui/material';
import { IconBrandInstagram } from '@tabler/icons-react';
import { useInstagramAnalytics } from '../core/hooks/useAnalyticsV2';
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

export default function InstagramAnalytics() {
  const theme = useTheme();
  const { timeRange, setTimeRange } = useFiltersStore();
  const { connections, isLoading: connectionsLoading } = useConnectionsQuery();

  // Get Instagram connection
  const instagramConnection = connections?.instagram?.find(conn => conn.isActive);

  // Fetch analytics data
  const {
    metrics,
    posts,
    isLoading,
    error,
  } = useInstagramAnalytics(timeRange, !!instagramConnection && !connectionsLoading);

  const getInstagramGradient = () =>
    `linear-gradient(135deg, #833AB4 0%, #FD1D1D 25%, #FCB045 50%, #F77737 75%, #E1306C 100%)`;

  const renderHeader = () => (
    <Box
      sx={{
        p: { xs: 3, sm: 4, md: 5 },
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha('#E1306C', 0.1)} 0%, ${alpha('#833AB4', 0.05)} 100%)`,
        border: `1px solid ${alpha('#E1306C', 0.15)}`,
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
            background: getInstagramGradient(),
            boxShadow: `0 8px 32px ${alpha('#E1306C', 0.3)}`,
          }}
        >
          <IconBrandInstagram size={32} color="white" />
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
            Instagram Analytics
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            Análisis completo de engagement y alcance visual
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
        Conexión de Instagram requerida
      </Typography>
      <Typography variant="body2">
        Para visualizar las analíticas, necesitas conectar tu cuenta business de Instagram.
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
            metric={getMetric('reach') || { type: 'reach', value: 0 }}
            label="Alcance"
            priority="high"
            color="#E1306C"
          />
          <MetricCard
            metric={getMetric('profile_views') || { type: 'profile_views', value: 0 }}
            label="Vistas del Perfil"
            priority="high"
            color="#833AB4"
          />
          <MetricCard
            metric={getMetric('likes') || { type: 'likes', value: 0 }}
            label="Me Gusta"
            priority="medium"
            color="#FD1D1D"
          />
          <MetricCard
            metric={getMetric('comments') || { type: 'comments', value: 0 }}
            label="Comentarios"
            priority="medium"
            color="#FCB045"
          />
          <MetricCard
            metric={getMetric('saves') || { type: 'saves', value: 0 }}
            label="Guardados"
            priority="medium"
            color="#F77737"
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
        Análisis de Contenido Visual
      </Typography>

      <ChartsGrid>
        <EngagementChart
          data={metrics.data ? [metrics.data] : []}
          title="Tasa de Engagement Visual"
          height={380}
          isLoading={metrics.isLoading}
          error={metrics.error?.message || null}
        />

        <GrowthChart
          data={metrics.data ? [metrics.data] : []}
          title="Crecimiento de Seguidores"
          height={380}
          isLoading={metrics.isLoading}
          error={metrics.error?.message || null}
        />
      </ChartsGrid>

      {/* Gráfico especializado para contenido visual */}
      <Box sx={{ mt: 4 }}>
        <ModernContentChart
          posts={posts.data?.posts || []}
          title="Rendimiento por Tipo de Contenido Visual"
          height={400}
          isLoading={posts.isLoading}
          error={posts.error?.message || null}
        />
      </Box>
    </Box>
  );

  const renderStoriesInsight = () => {
    const storiesCount = posts.data?.posts?.filter(p => p.type === 'story').length || 0;
    const reelsCount = posts.data?.posts?.filter(p => p.type === 'reel').length || 0;
    const photosCount = posts.data?.posts?.filter(p => p.type === 'photo').length || 0;

    return (
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha('#E1306C', 0.05)} 0%, ${alpha('#833AB4', 0.02)} 100%)`,
          border: `1px solid ${alpha('#E1306C', 0.1)}`,
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          Distribución de Contenido
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#E1306C' }}>
              {photosCount}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Fotos
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#833AB4' }}>
              {reelsCount}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Reels
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#FCB045' }}>
              {storiesCount}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Stories
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

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
          Análisis de Contenido Visual
        </Typography>

        {/* Insight de distribución de contenido */}
        {renderStoriesInsight()}

        {/* Carrusel de posts destacados */}
        {/* <PostsCarousel
          posts={posts.data.posts}
          title="Contenido con Mayor Engagement"
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
    <PageContainer title="Instagram Analytics" description="Análisis detallado de Instagram">
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
        ) : !instagramConnection ? (
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