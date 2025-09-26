// ============================================================================
// METRIC CARD - COMPONENTE REUTILIZABLE PARA MOSTRAR MÉTRICAS
// ============================================================================

"use client";
import React from 'react';
import { Card, Typography, alpha } from '@mui/material';
import { CuentaMetric } from './types';

// Estilos CSS para animaciones
const pulseAnimation = `
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

interface MetricCardProps {
  readonly metric: CuentaMetric;
  readonly isActive?: boolean;
  readonly onClick?: () => void;
}

/**
 * Componente reutilizable para mostrar una métrica individual clickeable
 * Principio SOLID: Single Responsibility - Solo maneja la visualización de una métrica
 * Principio DRY: Reutilizable para todas las métricas
 */
const MetricCard: React.FC<MetricCardProps> = ({ metric, isActive = false, onClick }) => {
  // Estilos dinámicos basados en la prioridad y estado activo de la métrica
  const getMetricStyles = () => {
    const baseStyles = {
      textAlign: 'center' as const,
      borderRadius: 3,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative' as const,
      width: '100%',
      maxWidth: '100%',
      overflowX: 'hidden',
      boxSizing: 'border-box',
      minWidth: 0,
    };

    // Estilos para estado activo (gráfico visible)
    if (isActive) {
      return {
        ...baseStyles,
        p: 2, // Padding reducido
        backgroundColor: metric.color,
        color: metric.textColor,
        boxShadow: `0 6px 24px ${alpha(metric.color, 0.3)}`,
        transform: 'scale(1.01)', // Escalado reducido
        border: `2px solid ${alpha(metric.color, 0.8)}`,
        '&::after': {
          content: '""',
          position: 'absolute',
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          borderRadius: 3,
          border: `2px solid ${alpha(metric.color, 0.6)}`,
          animation: 'pulse 2s infinite',
        },
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: `0 8px 28px ${alpha(metric.color, 0.4)}`,
        }
      };
    }

    // Estilos para estado inactivo (gráfico oculto)
    return {
      ...baseStyles,
      p: 2, // Padding reducido
      backgroundColor: alpha(metric.color, 0.1),
      color: metric.color,
      border: `2px dashed ${alpha(metric.color, 0.3)}`,
      opacity: 0.7,
      '&:hover': {
        opacity: 1,
        backgroundColor: alpha(metric.color, 0.15),
        transform: 'scale(1.01)',
        boxShadow: `0 3px 12px ${alpha(metric.color, 0.2)}`,
      }
    };
  };

  // Tipografía dinámica basada en la prioridad (más compacta)
  const getTypographySizes = () => {
    switch (metric.priority) {
      case 'high':
        return { valor: 'h4', label: 'body2' }; // Más pequeño
      case 'medium':
        return { valor: 'h5', label: 'caption' }; // Más pequeño
      default:
        return { valor: 'h6', label: 'caption' }; // Más pequeño
    }
  };

  const typography = getTypographySizes();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pulseAnimation }} />
      <Card sx={getMetricStyles()} onClick={onClick}>
        <Typography 
        variant={typography.valor as any}
        sx={{ 
          fontWeight: metric.priority === 'high' ? 700 : 
                     metric.priority === 'medium' ? 600 : 600,
          mb: 0.5, // Margen reducido
          lineHeight: 1.1,
        }}
      >
        {metric.valor}
      </Typography>
      
      <Typography 
        variant={typography.label as any}
        sx={{ 
          fontSize: metric.priority === 'high' ? '0.75rem' : 
                   metric.priority === 'medium' ? '0.7rem' : '0.65rem',
          fontWeight: 500,
          opacity: metric.priority === 'low' ? 0.8 : 1,
          lineHeight: 1.2,
        }}
      >
        {metric.label}
      </Typography>
    </Card>
    </>
  );
};

export default MetricCard;
