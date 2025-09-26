/**
 * Modern Calendar Theme 2025 - Ultra Clean & Professional
 * Inspired by Apple Calendar, Linear, and Notion
 */

import { Theme } from '@mui/material/styles';

export const getCalendarThemeStyles = (theme: Theme) => {
  const isDark = theme.palette.mode === 'dark';
  const colors = {
    // Base colors - Using theme palette
    bg: theme.palette.background.default,
    surface: theme.palette.background.paper,
    border: theme.palette.divider,
    borderLight: theme.palette.divider,
    text: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    textMuted: theme.palette.text.disabled,
    
    // Accent colors - Using theme palette
    primary: theme.palette.primary.main,
    primaryLight: theme.palette.primary.light,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    danger: theme.palette.error.main,
    
    // Today highlight - Using theme colors with alpha
    today: isDark ? theme.palette.primary.dark + '20' : theme.palette.primary.light + '20',
    
    // Weekend styling - Using theme background variations
    weekend: isDark ? theme.palette.background.default : theme.palette.background.paper,
    
    // Time indicators - Using theme colors
    nowLine: theme.palette.primary.main,
    timeLabel: theme.palette.text.disabled,
  };

  return {
    // ✨ MODERN CSS VARIABLES
    '--fc-border-color': colors.border,
    '--fc-neutral-bg-color': colors.surface,
    '--fc-page-bg-color': colors.bg,
    '--fc-text-color': colors.text,
    '--fc-today-bg-color': colors.today,
    '--fc-now-indicator-color': colors.nowLine,
    
    // 🎨 MODERN BASE STYLING
    '.fc': {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Segoe UI", Roboto, sans-serif',
      fontSize: '14px',
      fontWeight: '400',
      backgroundColor: colors.bg,
      color: colors.text,
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: isDark 
        ? '0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)' 
        : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    },


    // 🏷️ TIME LABELS - Clean and minimal
    '.fc-timegrid-axis': {
      backgroundColor: colors.surface,
      borderRight: `1px solid ${colors.borderLight}`,
      width: '60px',
    },

    '.fc-timegrid-slot-label': {
      color: colors.timeLabel,
      fontSize: '12px',
      fontWeight: '500',
      padding: '8px 12px',
      backgroundColor: 'transparent',
      border: 'none',
      textAlign: 'right',
      fontFeatureSettings: '"tnum"', // Tabular numbers for alignment
    },

    '.fc-timegrid-slot-label-cushion': {
      backgroundColor: 'transparent',
      padding: '0',
    },

    // 🕐 TIME SLOTS - Ultra clean grid
    '.fc-timegrid-slot': {
      backgroundColor: colors.bg,
      borderTop: `1px solid ${colors.borderLight}`,
      borderBottom: 'none',
      height: '52px', // Slightly taller for better spacing
      transition: 'background-color 0.15s ease',
    },

    '.fc-timegrid-slot:hover': {
      backgroundColor: colors.surface,
    },

    // Major hour lines (every hour)
    '.fc-timegrid-slot-major': {
      borderTop: `1px solid ${colors.border}`,
    },

    // 📋 DAY COLUMNS - Modern card-like appearance
    '.fc-timegrid-col': {
      backgroundColor: colors.bg,
      borderRight: `1px solid ${colors.borderLight}`,
      borderLeft: 'none',
      position: 'relative',
    },

    '.fc-timegrid-col:last-child': {
      borderRight: 'none',
    },

    '.fc-timegrid-col:first-child': {
      borderLeft: 'none',
    },

    // 📆 COLUMN HEADERS - Apple Calendar inspired
    '.fc-col-header': {
      backgroundColor: colors.surface,
      borderBottom: `2px solid ${colors.border}`,
      borderTop: 'none',
    },

    '.fc-col-header-cell': {
      padding: '16px 8px',
      fontWeight: '600',
      fontSize: '13px',
      color: colors.textSecondary,
      backgroundColor: 'transparent',
      borderRight: `1px solid ${colors.borderLight}`,
      borderLeft: 'none',
      textAlign: 'center',
      letterSpacing: '0.3px',
      textTransform: 'none',
    },

    '.fc-col-header-cell:last-child': {
      borderRight: 'none',
    },

    '.fc-col-header-cell-cushion': {
      padding: '0',
      backgroundColor: 'transparent',
    },

    // ✨ TODAY HIGHLIGHTING - Subtle but noticeable
    '.fc-day-today': {
      backgroundColor: `${colors.today} !important`,
      position: 'relative',
    },

  

    '.fc-day-today .fc-col-header-cell': {
      color: colors.primary,
      fontWeight: '700',
      backgroundColor: 'transparent',
    },

    // 🌅 WEEKEND STYLING - Subtle differentiation
    '.fc-day-sat, .fc-day-sun': {
      backgroundColor: colors.weekend,
    },

    '.fc-day-sat .fc-col-header-cell, .fc-day-sun .fc-col-header-cell': {
      color: colors.textMuted,
    },

    // ⏰ NOW INDICATOR - Modern line design
    '.fc-timegrid-now-indicator-line': {
      borderColor: colors.nowLine,
      borderWidth: '2px',
      borderStyle: 'solid',
      boxShadow: `0 0 8px ${colors.nowLine}40`,
      zIndex: '100',
    },

    '.fc-timegrid-now-indicator-arrow': {
      borderColor: colors.nowLine,
      borderWidth: '6px 0 6px 8px',
      borderStyle: 'solid',
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: 'transparent',
      marginTop: '-6px',
      left: '-8px',
    },

    // 🎯 EVENTS - Modern card design
    '.fc-event': {
      backgroundColor: 'transparent !important',
      border: 'none !important',
      borderRadius: '0 !important',
      padding: '0 !important',
      margin: '0 4px 2px 4px',
      fontSize: '13px',
      fontWeight: '500',
      cursor: 'pointer',
      position: 'relative !important',
      zIndex: '10',
    },

    '.fc-event .fc-event-main': {
      backgroundColor: 'transparent !important',
      border: 'none !important',
      padding: '0 !important',
      borderRadius: '8px',
      overflow: 'hidden',
    },

    // Event hover effects
    '.fc-event:hover': {
      backgroundColor: 'transparent !important',
      transform: 'translateY(-1px)',
      transition: 'all 0.2s ease',
      zIndex: '100 !important',
    },

    '.fc-event:hover .fc-event-main': {
      backgroundColor: 'transparent !important',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },

    // 🗂️ EVENT POSITIONING - Better stacking
    '.fc-timegrid-event-harness': {
      pointerEvents: 'auto',
      position: 'relative',
      marginRight: '4px',
    },

    // 🔄 SCROLLING - Smooth and natural
    '.fc-scroller': {
      overflow: 'auto !important',
      scrollbarWidth: 'thin',
      scrollbarColor: `${colors.border} transparent`,
    },

    '.fc-scroller::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },

    '.fc-scroller::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },

    '.fc-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: colors.border,
      borderRadius: '3px',
    },

    '.fc-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: colors.textMuted,
    },

    // 📐 GRID STRUCTURE - Clean separation
    '.fc-scrollgrid': {
      border: 'none !important',
      backgroundColor: 'transparent',
    },

    '.fc-scrollgrid-sync-table': {
      border: 'none !important',
    },

    '.fc-theme-standard td, .fc-theme-standard th': {
      border: 'none',
    },

    // 🎨 VIEW CONTAINERS - Seamless backgrounds
    '.fc-view': {
      backgroundColor: 'transparent',
    },

    '.fc-view-harness': {
      backgroundColor: 'transparent',
    },

    '.fc-timegrid-body': {
      backgroundColor: 'transparent',
    },

    // 📱 RESPONSIVE ADJUSTMENTS
    '@media (max-width: 768px)': {
      '.fc-timegrid-axis': {
        width: '45px',
      },
      
      '.fc-timegrid-slot-label': {
        fontSize: '11px',
        padding: '6px 8px',
      },
      
      '.fc-col-header-cell': {
        padding: '12px 4px',
        fontSize: '12px',
      },
      
      '.fc-timegrid-slot': {
        height: '44px',
      },
    },

    // 🚫 REMOVE UNNECESSARY ELEMENTS
    '.fc-button, .fc-toolbar-chunk, .fc-toolbar-title': {
      display: 'none !important',
    },

    // 🎭 DARK MODE SPECIFIC ADJUSTMENTS
    ...(isDark && {
      '.fc-timegrid-slot:hover': {
        backgroundColor: '#1f1f1f',
      },
      
      '.fc-scroller::-webkit-scrollbar-thumb': {
        backgroundColor: '#404040',
      },
      
      '.fc-scroller::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#606060',
      },
    }),

    // 🎨 HEATMAP INTEGRATION STYLES (for future best hours feature)
    '.heatmap-slot': {
      position: 'relative',
      transition: 'all 0.2s ease',
    },

    '.heatmap-slot.heatmap-low': {
      borderLeft: `3px solid ${colors.warning}`,
    },

    '.heatmap-slot.heatmap-medium': {
      borderLeft: `3px solid #f59e0b`,
    },

    '.heatmap-slot.heatmap-high': {
      borderLeft: `3px solid ${colors.success}`,
    },

    '.heatmap-percentage': {
      position: 'absolute',
      bottom: '2px',
      right: '4px',
      fontSize: '10px',
      fontWeight: '600',
      color: colors.textMuted,
      pointerEvents: 'none',
      userSelect: 'none',
      textShadow: isDark ? '0 0 2px rgba(0,0,0,0.8)' : '0 0 2px rgba(255,255,255,0.8)',
    },

    // 🎯 MODERN EVENT CARDS INTEGRATION
    '.fc-event[data-publication-type]': {
      marginRight: '6px',
    },

    '.fc-event[data-publication-type="instagram"]': {
      borderLeft: `4px solid ${theme.palette.secondary.main}`,
    },

    '.fc-event[data-publication-type="facebook"]': {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
    },

    '.fc-event[data-publication-type="twitter"]': {
      borderLeft: `4px solid ${theme.palette.info.main}`,
    },

    '.fc-event[data-publication-type="linkedin"]': {
      borderLeft: `4px solid ${theme.palette.info.dark}`,
    },

    '.fc-event[data-publication-type="tiktok"]': {
      borderLeft: `4px solid ${theme.palette.grey[800]}`,
    },
  };
};