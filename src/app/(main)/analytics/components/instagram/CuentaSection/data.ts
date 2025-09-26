// ============================================================================
// CUENTA METRICS DATA - SIGUIENDO PRINCIPIOS DRY Y SINGLE RESPONSIBILITY
// ============================================================================

import { CuentaMetric } from './types';

/**
 * Factory para crear métricas de cuenta con validación y consistencia
 * Principio SOLID: Single Responsibility - Solo maneja datos de métricas
 */
export class CuentaMetricsFactory {
  private static readonly COLORS = {
    PRIMARY: '#5b24b7',
    SECONDARY: '#8b5cf6',
    ACCENT: '#22d3ee',
    NEUTRAL: '#e2e8f0',
    TEXT_LIGHT: '#64748b',
    TEXT_WHITE: 'white'
  } as const;

  /**
   * Obtiene todas las métricas de cuenta con jerarquía visual
   */
  public static getCuentaMetrics(): readonly CuentaMetric[] {
    return [
      this.createMetric({
        id: 'visualizaciones',
        valor: '1',
        label: 'Visualizaciones',
        priority: 'high',
        color: this.COLORS.PRIMARY,
        textColor: this.COLORS.TEXT_WHITE
      }),
      
      this.createMetric({
        id: 'promedio-alcance',
        valor: '0',
        label: 'Promedio alcanzado',
        priority: 'medium',
        color: this.COLORS.SECONDARY,
        textColor: this.COLORS.TEXT_WHITE
      }),
      
      this.createMetric({
        id: 'contenido-total',
        valor: '28',
        label: 'Contenido total',
        priority: 'high',
        color: this.COLORS.ACCENT,
        textColor: this.COLORS.TEXT_WHITE
      })
    ];
  }

  /**
   * Crea una métrica con validación
   * Principio SOLID: Open/Closed - Extensible sin modificar código existente
   */
  private static createMetric(config: {
    id: string;
    valor: string;
    label: string;
    priority: CuentaMetric['priority'];
    color: string;
    textColor: string;
  }): CuentaMetric {
    const { id, valor, label, priority, color, textColor } = config;
    
    // Validación de entrada
    if (!id || !valor || !label) {
      throw new Error('Metric configuration is incomplete');
    }

    return {
      id,
      valor,
      label,
      color,
      textColor,
      priority
    };
  }
}
