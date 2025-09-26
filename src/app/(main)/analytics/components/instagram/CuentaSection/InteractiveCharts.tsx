// ============================================================================
// INTERACTIVE CHARTS - GRÁFICO COMBINADO PARA TODAS LAS MÉTRICAS
// ============================================================================

"use client";
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Datos del gráfico combinado
const chartData = [
  { date: '28 May', visualizaciones: 0, promedio: 0, contenido: 20 },
  { date: '31 May', visualizaciones: 0.1, promedio: 0, contenido: 22 },
  { date: '3 Jun', visualizaciones: 0, promedio: 0, contenido: 24 },
  { date: '6 Jun', visualizaciones: 0, promedio: 0, contenido: 25 },
  { date: '9 Jun', visualizaciones: 0, promedio: 0, contenido: 26 },
  { date: '12 Jun', visualizaciones: 0, promedio: 0, contenido: 27 },
  { date: '15 Jun', visualizaciones: 0.8, promedio: 0.3, contenido: 28 },
  { date: '16 Jun', visualizaciones: 0, promedio: 0, contenido: 28 },
  { date: '17 Jun', visualizaciones: 0.2, promedio: 0.1, contenido: 28 },
  { date: '18 Jun', visualizaciones: 0, promedio: 0, contenido: 28 },
  { date: '21 Jun', visualizaciones: 1.0, promedio: 1.0, contenido: 28 },
  { date: '24 Jun', visualizaciones: 0, promedio: 0, contenido: 28 },
];

interface CombinedChartProps {
  readonly height?: number;
  readonly visibleSeries: Set<string>;
}

/**
 * Gráfico combinado con todas las métricas
 * Barras para contenido total, líneas para visualizaciones y promedio
 */
export const CombinedMetricsChart: React.FC<CombinedChartProps> = ({ 
  height = 350, 
  visibleSeries 
}) => {
  const [chartKey, setChartKey] = useState(0);

  // Forzar re-render cuando cambie el viewport
  useEffect(() => {
    const handleResize = () => {
      setChartKey(prev => prev + 1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{ 
      width: '100%', 
      height, 
      overflow: 'hidden',
      maxWidth: '100%',
    }}>
      <ResponsiveContainer 
        width="100%" 
        height="100%" 
        maxHeight={height}
        debounce={150}
        key={chartKey}
      >
        <ComposedChart 
          data={chartData} 
          margin={{ top: 20, right: 15, left: 15, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#64748b' }}
            interval="preserveStartEnd"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#64748b' }}
            domain={[0, 30]}
            width={40}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              color: '#1e293b'
            }}
          />
          
          {/* Barras para contenido total */}
          {visibleSeries.has('contenido-total') && (
            <Bar 
              dataKey="contenido" 
              fill="#22d3ee" 
              name="Contenido total"
              radius={[2, 2, 0, 0]}
            />
          )}
          
          {/* Línea para visualizaciones */}
          {visibleSeries.has('visualizaciones') && (
            <Line 
              type="monotone" 
              dataKey="visualizaciones" 
              stroke="#5b24b7" 
              strokeWidth={3}
              name="Visualizaciones"
              dot={{ fill: '#5b24b7', strokeWidth: 2, r: 4 }}
              connectNulls={false}
            />
          )}
          
          {/* Línea para promedio */}
          {visibleSeries.has('promedio-alcance') && (
            <Line 
              type="monotone" 
              dataKey="promedio" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              name="Promedio alcance/día"
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              connectNulls={false}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

// Exportaciones compatibles con los gráficos individuales (deprecated)
export const VisualizacionesChart: React.FC<{ height?: number }> = ({ height = 250 }) => (
  <CombinedMetricsChart height={height} visibleSeries={new Set(['visualizaciones'])} />
);

export const PromedioAlcanceChart: React.FC<{ height?: number }> = ({ height = 250 }) => (
  <CombinedMetricsChart height={height} visibleSeries={new Set(['promedio-alcance'])} />
);

export const ContenidoTotalChart: React.FC<{ height?: number }> = ({ height = 250 }) => (
  <CombinedMetricsChart height={height} visibleSeries={new Set(['contenido-total'])} />
);
