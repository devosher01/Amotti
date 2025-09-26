// 🎨 Sistema de Branding Profesional Centralizado
// Se integra con el tema de Material-UI para soporte dark/light
// Usando los colores exactos de la marca: #4057d9, #e9faff, #5b24b7, #3b68df, #2f7ff1

export const professionalBranding = {
  // Colores exactos de la marca
  colors: {
    byzantine_blue: {
      DEFAULT: '#4057d9',
      100: '#090f2f',
      200: '#131e5e',
      300: '#1c2d8d',
      400: '#253cbb',
      500: '#4057d9',
      600: '#6678e1',
      700: '#8c9ae8',
      800: '#b2bcf0',
      900: '#d9ddf7'
    },
    azure_web: {
      DEFAULT: '#e9faff',
      100: '#004b62',
      200: '#0096c4',
      300: '#27cdff',
      400: '#89e3ff',
      500: '#e9faff',
      600: '#effbff',
      700: '#f3fcff',
      800: '#f7fdff',
      900: '#fbfeff'
    },
    grape: {
      DEFAULT: '#5b24b7',
      100: '#120725',
      200: '#240e49',
      300: '#36166e',
      400: '#481d92',
      500: '#5b24b7',
      600: '#763dd9',
      700: '#986de2',
      800: '#ba9eec',
      900: '#ddcef5'
    },
    royal_blue: {
      DEFAULT: '#3b68df',
      100: '#081330',
      200: '#102560',
      300: '#183891',
      400: '#1f4bc1',
      500: '#3b68df',
      600: '#6184e5',
      700: '#89a3ec',
      800: '#b0c2f2',
      900: '#d8e0f9'
    },
    azure: {
      DEFAULT: '#2f7ff1',
      100: '#041835',
      200: '#07316b',
      300: '#0b49a0',
      400: '#0f62d6',
      500: '#2f7ff1',
      600: '#5798f3',
      700: '#81b2f6',
      800: '#abccf9',
      900: '#d5e5fc'
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    }
  },

  // Funciones para obtener colores según el tema - Peso visual equilibrado
  getSidebarBackground: (isDark: boolean) => {
    return isDark 
      ? 'linear-gradient(180deg, #1e293b 0%, #334155 50%, #475569 100%)'
      : 'linear-gradient(180deg, #5b24b7 0%, #4057d9 50%, #3b68df 100%)'; // Colores exactos de la marca
  },

  getHeaderBackground: (isDark: boolean) => {
    return isDark 
      ? 'rgba(23, 28, 35, 0.95)'
      : 'rgba(255, 255, 255, 0.95)';
  },

  getHeaderBorder: (isDark: boolean) => {
    return isDark ? '#333F55' : '#e2e8f0';
  },

  getHeaderTextColor: (isDark: boolean) => {
    return isDark ? '#EAEFF4' : '#64748b';
  },

  getSidebarTextColor: (isDark: boolean, isActive: boolean = false) => {
    if (isActive) return 'white';
    return isDark ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.8)';
  },

  getSidebarHoverBackground: (isDark: boolean) => {
    return isDark 
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(255,255,255,0.15)'; // Como en el test
  },

  getSidebarGroupTextColor: (isDark: boolean) => {
    return isDark 
      ? 'rgba(255,255,255,0.6)'
      : 'rgba(255,255,255,0.6)'; // Como en el test
  },

  getProfileBackground: (isDark: boolean) => {
    return isDark 
      ? 'rgba(255,255,255,0.05)'
      : 'rgba(255,255,255,0.1)'; // Como en el test
  },

  getLogoFilter: (isDark: boolean) => {
    return isDark ? 'brightness(0) invert(1)' : 'brightness(0) invert(1)';
  },

  getChipBackground: () => {
    return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
  },

  getGlassEffect: (isDark: boolean) => {
    return {
      background: isDark 
        ? 'rgba(23, 28, 35, 0.95)'
        : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      border: isDark 
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(255, 255, 255, 0.2)',
    };
  },

  getButtonBackground: (isDark: boolean) => {
    return isDark ? '#333F55' : 'white';
  },

  getButtonHoverBackground: (isDark: boolean) => {
    return isDark ? '#465670' : '#f8fafc';
  },

  getButtonShadow: (isDark: boolean) => {
    return isDark 
      ? '0 2px 8px rgba(0,0,0,0.3)'
      : '0 2px 8px rgba(0,0,0,0.06)';
  },

  getButtonHoverShadow: (isDark: boolean) => {
    return isDark 
      ? '0 4px 16px rgba(0,0,0,0.4)'
      : '0 4px 16px rgba(0,0,0,0.12)';
  },

  // Nuevas funciones para el peso visual equilibrado
  getMainContentBackground: (isDark: boolean) => {
    return isDark 
      ? '#171c23'
      : '#f8fafc'; // Fondo suave como en el test
  },

  getCardBackground: (isDark: boolean) => {
    return isDark 
      ? '#1e293b'
      : 'white';
  },

  getTextPrimary: (isDark: boolean) => {
    return isDark 
      ? '#EAEFF4'
      : '#1e293b'; // Texto principal equilibrado
  },

  getTextSecondary: (isDark: boolean) => {
    return isDark 
      ? '#7C8FAC'
      : '#64748b'; // Texto secundario equilibrado
  },

  // 🗓️ Funciones específicas para el calendario
  getCalendarHeaderBackground: (isDark: boolean) => {
    return isDark 
      ? '#1e293b'
      : 'white';
  },

  getCalendarHeaderBorder: (isDark: boolean) => {
    return isDark 
      ? '#334155'
      : '#e2e8f0';
  },

  getCalendarGridBackground: (isDark: boolean) => {
    return isDark 
      ? '#0f172a'
      : '#f8fafc';
  },

  getCalendarCellBackground: (isDark: boolean, isToday: boolean = false) => {
    if (isToday) {
      return isDark 
        ? 'rgba(64, 87, 217, 0.2)' // Byzantine blue con transparencia
        : 'rgba(64, 87, 217, 0.1)';
    }
    return isDark 
      ? '#1e293b'
      : 'white';
  },

  getCalendarCellBorder: (isDark: boolean) => {
    return isDark 
      ? '#334155'
      : '#e2e8f0';
  },

  getCalendarTodayBorder: (isDark: boolean) => {
    return isDark 
      ? '#4057d9' // Byzantine blue
      : '#4057d9';
  },

  getCalendarEventBackground: (platform: string) => {
    const platformColors = {
      facebook: 'linear-gradient(135deg, #4057d9 0%, #3b68df 100%)', // Byzantine blue + Royal blue
      instagram: 'linear-gradient(135deg, #5b24b7 0%, #763dd9 100%)', // Grape + variación
      twitter: 'linear-gradient(135deg, #2f7ff1 0%, #5798f3 100%)', // Azure + variación
      linkedin: 'linear-gradient(135deg, #4057d9 0%, #2f7ff1 100%)', // Byzantine blue + Azure
      youtube: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', // Rojo para YouTube
      tiktok: 'linear-gradient(135deg, #5b24b7 0%, #ef4444 100%)', // Grape + Rojo
      default: 'linear-gradient(135deg, #4057d9 0%, #3b68df 100%)' // Colores de marca por defecto
    };
    return platformColors[platform as keyof typeof platformColors] || platformColors.default;
  },

  getCalendarButtonPrimary: (isDark: boolean) => {
    return isDark 
      ? 'linear-gradient(135deg, #4057d9 0%, #3b68df 100%)'
      : 'linear-gradient(135deg, #4057d9 0%, #3b68df 100%)';
  },

  getCalendarButtonSecondary: (isDark: boolean) => {
    return isDark 
      ? '#334155'
      : '#f1f5f9';
  },

  getCalendarToggleButtonActive: (isDark: boolean) => {
    return isDark 
      ? 'rgba(64, 87, 217, 0.2)'
      : 'rgba(64, 87, 217, 0.1)';
  },

  getCalendarToggleButtonText: (isDark: boolean, isActive: boolean = false) => {
    if (isActive) {
      return isDark ? '#4057d9' : '#4057d9';
    }
    return isDark ? '#94a3b8' : '#64748b';
  },

  getCalendarTimeSlotBackground: (isDark: boolean) => {
    return isDark 
      ? '#1e293b'
      : 'white';
  },

  getCalendarTimeSlotBorder: (isDark: boolean) => {
    return isDark 
      ? '#334155'
      : '#e2e8f0';
  },

  getCalendarCurrentTimeIndicator: () => {
    return '#4057d9'; // Byzantine blue para el indicador de tiempo actual
  }
};

// Función helper para obtener el estado del tema
export const useThemeMode = () => {
  // Esta función se puede usar en componentes para detectar el modo
  // Por ahora retorna false (light mode) por defecto
  // Se puede integrar con el store de customizer más adelante
  return false; // false = light, true = dark
};

export default professionalBranding; 