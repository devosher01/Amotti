import React from 'react';
import { Box, Typography, Card, Grid, useTheme, alpha, CircularProgress, Alert } from '@mui/material';
import { FacebookAnalyticsData } from '../../domain/types';

interface FacebookMetricsCardProps {
  data: FacebookAnalyticsData | null;
  loading: boolean;
  error: string | null;
}

const getMetricStyles = (priority: 'low' | 'medium' | 'high', color: string, textColor: string, theme: any) => {
  const baseStyles = {
    borderRadius: 3,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  switch (priority) {
    case 'high':
      return {
        ...baseStyles,
        p: 3,
        backgroundColor: color,
        color: textColor,
        boxShadow: `0 8px 32px ${alpha(color, 0.4)}`,
        transform: 'scale(1.02)',
        border: `2px solid ${alpha(color, 0.6)}`,
      };
    case 'medium':
      return {
        ...baseStyles,
        p: 2.5,
        backgroundColor: color,
        color: textColor,
        boxShadow: `0 6px 24px ${alpha(color, 0.3)}`,
        border: `1px solid ${alpha(color, 0.4)}`,
      };
    default: // low priority
      return {
        ...baseStyles,
        p: 2,
        backgroundColor: color,
        color: textColor,
        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
        '&:hover': {
          backgroundColor: alpha(theme.palette.background.default, 0.8),
        },
      };
  }
};

const getTypographySize = (priority: 'low' | 'medium' | 'high') => {
  switch (priority) {
    case 'high':
      return { valor: 'h2', label: 'body1' };
    case 'medium':
      return { valor: 'h3', label: 'body2' };
    default:
      return { valor: 'h4', label: 'caption' };
  }
};

const FacebookMetricsCard: React.FC<FacebookMetricsCardProps> = ({ data, loading, error }) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Card sx={{ p: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
        <CircularProgress />
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ p: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Card>
    );
  }

  const metricsToDisplay = [
    {
      id: 'page_follows',
      label: 'Seguidores',
      priority: 'low',
      color: theme.palette.grey[200],
      textColor: theme.palette.text.secondary,
      format: (val: number) => val.toLocaleString(),
    },
    {
      id: 'page_post_engagements',
      label: 'Engagement',
      priority: 'medium',
      color: theme.palette.secondary.main,
      textColor: 'white',
      format: (val: number) => val.toLocaleString(),
    },
    {
      id: 'page_media_view',
      label: 'Vistas de Media',
      priority: 'low',
      color: theme.palette.grey[200],
      textColor: theme.palette.text.secondary,
      format: (val: number) => val.toLocaleString(),
    },
    {
      id: 'page_video_views',
      label: 'Vistas de Video',
      priority: 'low',
      color: theme.palette.grey[200],
      textColor: theme.palette.text.secondary,
      format: (val: number) => val.toLocaleString(),
    },
    {
      id: 'page_actions_post_reactions_like_total',
      label: 'Reacciones (Likes)',
      priority: 'high',
      color: theme.palette.primary.main,
      textColor: 'white',
      format: (val: number) => val.toLocaleString(),
    },
  ];

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
        <Typography variant="h4" sx={{
          fontWeight: 700,
          color: '#1e293b',
          mb: 1,
          letterSpacing: '-0.02em'
        }}>
          Métricas Principales
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Rendimiento y estadísticas clave de Facebook
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {metricsToDisplay.map((metricConfig) => {
          const metricValue = data?.metrics.find(m => m.type === metricConfig.id)?.value || 0;
          const typographySize = getTypographySize(metricConfig.priority as 'low' | 'medium' | 'high');

          return (
            <Grid item xs={6} sm={4} lg={2} key={metricConfig.id}>
              <Card sx={{
                textAlign: 'center',
                ...getMetricStyles(metricConfig.priority as 'low' | 'medium' | 'high', metricConfig.color, metricConfig.textColor, theme),
                '&:hover': {
                  ...(metricConfig.priority !== 'low' && {
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: `0 12px 40px ${alpha(metricConfig.color, 0.5)}`,
                  }),
                },
              }}>
                <Typography
                  variant={typographySize.valor as any}
                  sx={{
                    fontWeight: (metricConfig.priority as 'high' | 'medium' | 'low') === 'high' ? 800 : (metricConfig.priority as 'high' | 'medium' | 'low') === 'medium' ? 700 : 600,
                    mb: 1,
                    lineHeight: 1.2,
                  }}
                >
                  {metricConfig.format(metricValue)}
                </Typography>
                <Typography
                  variant={typographySize.label as any}
                  sx={{
                    fontSize: (metricConfig.priority as 'high' | 'medium' | 'low') === 'high' ? '0.95rem' : (metricConfig.priority as 'high' | 'medium' | 'low') === 'medium' ? '0.875rem' : '0.75rem',
                    fontWeight: 500,
                    opacity: (metricConfig.priority as 'high' | 'medium' | 'low') === 'low' ? 0.8 : 1,
                    lineHeight: 1.3,
                  }}
                >
                  {metricConfig.label}
                </Typography>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};

export default FacebookMetricsCard;
