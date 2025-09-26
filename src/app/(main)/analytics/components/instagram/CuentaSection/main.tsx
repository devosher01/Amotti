"use client";
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Stack,
  alpha,
} from "@mui/material";
import { CuentaSectionProps } from './types';
import { CuentaMetricsFactory } from './data';
import MetricCard from './MetricCard';
import { CombinedMetricsChart } from './InteractiveCharts';
import PostsCarousel from './PostsCarousel';

const ChartCard = ({ children, ...props }: any) => (
  <Card sx={{ 
    p: 2,
    border: `1px solid ${alpha('#5b24b7', 0.1)}`,
    borderRadius: 3,
    boxShadow: 'rgba(91, 36, 183, 0.08) 0px 4px 12px',
    width: '100%',
    maxWidth: '100%',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    minWidth: 0,
    ...props.sx 
  }} {...props}>
    <Box sx={{ 
      width: '100%', 
      maxWidth: '100%', 
      overflowX: 'hidden',
      minWidth: 0 
    }}>
      {children}
    </Box>
  </Card>
);

const CuentaSection: React.FC<CuentaSectionProps> = ({ 
  username = "devosher01",
  posts 
}) => {
  const [visibleCharts, setVisibleCharts] = useState<Set<string>>(
    new Set(['visualizaciones', 'promedio-alcance', 'contenido-total'])
  );

  const cuentaMetrics = CuentaMetricsFactory.getCuentaMetrics();

  const handleMetricClick = (metricId: string) => {
    setVisibleCharts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(metricId)) {
        newSet.delete(metricId);
      } else {
        newSet.add(metricId);
      }
      return newSet;
    });
  };

  return (
    <Box sx={{ 
      mb: 6,
      width: '100%',
     
    }}>
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between" 
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h3" sx={{ 
            fontWeight: 800, 
            color: '#1e293b',
            mb: 0.5,
            letterSpacing: '-0.025em'
          }}>
            Cuenta
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#64748b', 
            fontWeight: 500 
          }}>
            Perfil completo de rendimiento y contenido
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" sx={{ 
            color: '#64748b', 
            mb: 0.5 
          }}>
            Perfil
          </Typography>
          <Typography variant="h6" sx={{ 
            fontWeight: 700, 
            color: '#5b24b7' 
          }}>
            @{username}
          </Typography>
        </Box>
      </Stack>

      <ChartCard sx={{ 
        p: { xs: 2, sm: 3, md: 4 },
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden'
      }}>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 700, 
            color: '#1e293b',
            mb: 1,
            letterSpacing: '-0.02em'
          }}>
            Métricas del Perfil
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#64748b',
            mb: 4 
          }}>
            Indicadores clave de rendimiento y engagement
          </Typography>
          
          <Grid container spacing={2} sx={{ 
            width: '100%',
            maxWidth: '100%',
            margin: 0,
            '& .MuiGrid-item': {
              paddingLeft: '8px !important',
              paddingTop: '8px !important'
            }
          }}>
            {cuentaMetrics.map((metric) => (
              <Grid item xs={6} sm={4} md={2} key={metric.id} sx={{ 
                minWidth: 0,
                maxWidth: '100%'
              }}>
                <MetricCard 
                  metric={metric}
                  isActive={visibleCharts.has(metric.id)}
                  onClick={() => handleMetricClick(metric.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ 
          my: 5, 
          height: 1, 
          background: `linear-gradient(90deg, transparent 0%, ${alpha('#5b24b7', 0.1)} 50%, transparent 100%)` 
        }} />

        <Box sx={{ mb: 5 }}>
          <Stack 
            direction="row" 
            alignItems="center" 
            justifyContent="space-between" 
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                color: '#1e293b',
                letterSpacing: '-0.02em'
              }}>
                Tendencias de Engagement
              </Typography>
              <Typography variant="body1" sx={{ 
                color: '#64748b',
                mt: 0.5
              }}>
                Gráfico combinado con visualizaciones, promedio alcance y contenido total
              </Typography>
            </Box>
          </Stack>
          
          <Box sx={{ 
            border: `1px solid ${alpha('#5b24b7', 0.1)}`,
            borderRadius: 3,
            p: 3,
            backgroundColor: 'white',
            boxShadow: 'rgba(91, 36, 183, 0.08) 0px 4px 12px',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
            minWidth: 0
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              color: '#1e293b',
              mb: 3
            }}>
              Perfil de Métricas Integrado
            </Typography>
            <CombinedMetricsChart 
              height={400} 
              visibleSeries={visibleCharts} 
            />
          </Box>
          
          {visibleCharts.size === 0 && (
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              border: `2px dashed ${alpha('#5b24b7', 0.2)}`,
              borderRadius: 3,
              backgroundColor: alpha('#5b24b7', 0.02),
              mt: 3
            }}>
              <Typography variant="h6" sx={{ color: '#64748b', mb: 1 }}>
                No hay métricas seleccionadas
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Haz clic en las métricas de arriba para mostrar en el gráfico
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ 
          my: 5, 
          height: 1, 
          background: `linear-gradient(90deg, transparent 0%, ${alpha('#5b24b7', 0.1)} 50%, transparent 100%)` 
        }} />

        <Box sx={{ 
          overflow: 'hidden', 
          width: '100%', 
          maxWidth: '100%'
        }}>
          <PostsCarousel posts={posts} />
        </Box>
      </ChartCard>
    </Box>
  );
};

export default CuentaSection;
