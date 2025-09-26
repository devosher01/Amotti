// 🎨 Sistema de Colores Estandarizado Amotii
// Basado en #ff6800 (Blaze Orange) con todas sus variaciones
// Uso: import { AmotiiColors } from '@/utils/theme/AmotiiColors'

import { useTheme } from '@mui/material/styles';
import { Theme } from '@mui/material/styles/createTheme';

// Paleta completa de colores Amotii basada en #ff6800
export const AmotiiColorPalette = {
  // Base color
  base: '#ff6800',
  
  // Tints (agregando blanco) - para fondos claros, highlights
  tints: {
    t10: '#ff781a',   // 10% white added
    t20: '#ff8733',   // 20% white added  
    t30: '#ff964d',   // 30% white added
    t40: '#ffa566',   // 40% white added
    t50: '#ffb480',   // 50% white added
    t60: '#ffc399',   // 60% white added
    t70: '#ffd2b3',   // 70% white added
    t80: '#ffe1cc',   // 80% white added
    t90: '#fff0e6',   // 90% white added - muy sutil para fondos
  },
  
  // Shades (agregando negro) - para hover states, sombras, bordes
  shades: {
    s10: '#e65f00',   // 10% black added
    s20: '#cc5400',   // 20% black added
    s30: '#b34a00',   // 30% black added
    s40: '#993f00',   // 40% black added
    s50: '#803500',   // 50% black added
    s60: '#662a00',   // 60% black added
    s70: '#4c1f00',   // 70% black added
    s80: '#331500',   // 80% black added
    s90: '#190a00',   // 90% black added - muy oscuro para fondos dark
  },
  
  // Colores complementarios (para contraste y accents)
  complementary: {
    blue: '#0096ff',       // Complementario directo
    blueLight: '#63c8ff', 
    blueDark: '#0074cc',
  },
  
  // Estados semánticos usando la paleta Amotii
  semantic: {
    success: '#ff8533',    // Tint 20%
    warning: '#ff964d',    // Tint 30%
    error: '#cc4400',      // Shade 20% con ajuste
    info: '#ff781a',       // Tint 10%
  },
};

// Hook personalizado para acceder a los colores Amotii según el tema actual
export const useAmotiiColors = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return {
    // Color principal adaptativo
    primary: theme.palette.primary.main,
    primaryLight: theme.palette.primary.light,
    primaryDark: theme.palette.primary.dark,
    
    // Acceso directo a la paleta
    palette: AmotiiColorPalette,
    
    // Funciones helper para uso común
    getSidebarBackground: () => isDark 
      ? `linear-gradient(135deg, 
          ${AmotiiColorPalette.shades.s60} 0%,
          ${AmotiiColorPalette.base} 25%,
          ${AmotiiColorPalette.shades.s40} 50%,
          ${AmotiiColorPalette.base} 75%,
          ${AmotiiColorPalette.shades.s70} 100%
        )`
      : `linear-gradient(135deg, 
          ${AmotiiColorPalette.tints.t20} 0%,
          ${AmotiiColorPalette.base} 20%,
          ${AmotiiColorPalette.shades.s10} 40%,
          ${AmotiiColorPalette.base} 60%,
          ${AmotiiColorPalette.shades.s30} 80%,
          ${AmotiiColorPalette.shades.s50} 100%
        )`,
    
    getNavItemColors: () => ({
      default: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.9)',
      hover: 'rgba(255, 255, 255, 0.15)',
      active: 'rgba(255, 255, 255, 0.2)',
      activeBorder: isDark 
        ? `linear-gradient(180deg, ${AmotiiColorPalette.base}, #ffffff)`
        : `linear-gradient(180deg, #ffffff, ${AmotiiColorPalette.tints.t60})`,
    }),
    
    getButtonColors: (variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error') => {
      const colors = {
        primary: {
          main: AmotiiColorPalette.base,
          hover: AmotiiColorPalette.shades.s10,
          active: AmotiiColorPalette.shades.s20,
        },
        secondary: {
          main: AmotiiColorPalette.tints.t20,
          hover: AmotiiColorPalette.tints.t10,
          active: AmotiiColorPalette.base,
        },
        success: {
          main: AmotiiColorPalette.semantic.success,
          hover: AmotiiColorPalette.tints.t10,
          active: AmotiiColorPalette.base,
        },
        warning: {
          main: AmotiiColorPalette.semantic.warning,
          hover: AmotiiColorPalette.tints.t20,
          active: AmotiiColorPalette.tints.t10,
        },
        error: {
          main: AmotiiColorPalette.semantic.error,
          hover: AmotiiColorPalette.shades.s30,
          active: AmotiiColorPalette.shades.s40,
        }
      };
      return colors[variant];
    },
    
    // Utilidades para accesibilidad
    getContrastText: (backgroundColor: string) => {
      // Lógica simple - en una implementación real usarías una librería como 'color'
      const isLight = backgroundColor.includes('f') || backgroundColor.includes('e') || 
                     backgroundColor.includes('d') || backgroundColor.includes('c');
      return isLight ? AmotiiColorPalette.shades.s90 : '#ffffff';
    },
    
    // Para fondos adaptativos
    getBackgroundColor: (level: 'primary' | 'secondary' | 'tertiary' = 'primary') => {
      if (isDark) {
        const levels = {
          primary: AmotiiColorPalette.shades.s90,
          secondary: AmotiiColorPalette.shades.s80,
          tertiary: AmotiiColorPalette.shades.s70,
        };
        return levels[level];
      } else {
        const levels = {
          primary: '#ffffff',
          secondary: AmotiiColorPalette.tints.t90,
          tertiary: AmotiiColorPalette.tints.t80,
        };
        return levels[level];
      }
    },
  };
};

// Tipos TypeScript para mejor autocompletado
export type AmotiiColorVariant = keyof typeof AmotiiColorPalette.tints | keyof typeof AmotiiColorPalette.shades | 'base';
export type AmotiiSemanticColor = keyof typeof AmotiiColorPalette.semantic;

// Constantes para uso rápido
export const AMOTII_COLORS = {
  PRIMARY: '#ff6800',
  PRIMARY_LIGHT: '#fff0e6',
  PRIMARY_DARK: '#cc5400',
  SECONDARY: '#ff8533',
  BACKGROUND_LIGHT: '#fff0e6',
  BACKGROUND_DARK: '#190a00',
  TEXT_ON_PRIMARY: '#ffffff',
  TEXT_ON_LIGHT: '#cc5400',
} as const;

// Helper para crear gradientes rápidos
export const createAmotiiGradient = (
  direction: string = '135deg',
  stops: Array<{color: string, position: number}>
) => {
  const gradientStops = stops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
  return `linear-gradient(${direction}, ${gradientStops})`;
};

export default AmotiiColorPalette;