const DarkThemeColors = [
  {
    name: 'AMOTII_THEME',
    palette: {
      primary: {
        main: '#ff6800',        // Base Amotii Orange
        light: '#4c1f00',       // 70% shade (dark background)
        dark: '#cc5400',        // 20% shade (darker)
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ff8533',        // 10% tint (lighter orange)
        light: '#331500',       // 80% shade (very dark)
        dark: '#e65f00',        // 10% shade (slightly darker)
        contrastText: '#ffffff',
      },
      // Fondo para tema oscuro
      background: {
        default: '#1a0a00',     // Muy oscuro, basado en naranja
        dark: '#2b1500',       // Ligeramente más claro
        paper: '#1a0a00',      // Mismo que default
      },
      // Colores adicionales para el sistema Amotii (oscuro)
      tertiary: {
        main: '#ff8533',        // Más brillante en dark
        light: '#662a00',       // 60% shade
        dark: '#b34a00',        // 30% shade
      },
      success: {
        main: '#ff8533',
        light: '#4c1f00',
        dark: '#cc5400',
      },
      warning: {
        main: '#ff964d',
        light: '#4c1f00',
        dark: '#993f00',
      },
      error: {
        main: '#ff781a',
        light: '#331500',
        dark: '#803500',
      },
      info: {
        main: '#ffa566',
        light: '#4c1f00',
        dark: '#662a00',
      },
    },
  },
  {
    name: 'BLUE_THEME',
    palette: {
      primary: {
        main: '#5D87FF',
        light: '#253662',
        dark: '#4570EA',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#49BEFF',
        light: '#1C455D',
        dark: '#23afdb',
        contrastText: '#ffffff',
      },
      background: {
        default: '#2A3447',
        dark: '#2A3547',
        paper: '#2A3447',
      },
    },
  },
  {
    name: 'AQUA_THEME',
    palette: {
      primary: {
        main: '#0074BA',
        light: '#103247',
        dark: '#006DAF',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#47D7BC',
        light: '#0C4339',
        dark: '#39C7AD',
        contrastText: '#ffffff',
      },
    },
  },
  {
    name: 'PURPLE_THEME',
    palette: {
      primary: {
        main: '#763EBD',
        light: '#26153C',
        dark: '#6E35B7',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#95CFD5',
        light: '#09454B',
        dark: '#8BC8CE',
        contrastText: '#ffffff',
      },
    },
  },
  {
    name: 'GREEN_THEME',
    palette: {
      primary: {
        main: '#0A7EA4',
        light: '#05313F',
        dark: '#06769A',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#CCDA4E',
        light: '#282917',
        dark: '#C3D046',
        contrastText: '#ffffff',
      },
    },
  },
  {
    name: 'CYAN_THEME',
    palette: {
      primary: {
        main: '#01C0C8',
        light: '#003638',
        dark: '#00B9C0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#FB9678',
        light: '#40241C',
        dark: '#F48B6C',
        contrastText: '#ffffff',
      },
    },
  },
  {
    name: 'ORANGE_THEME',
    palette: {
      primary: {
        main: '#FA896B',
        light: '#402E32',
        dark: '#F48162',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#0074BA',
        light: '#082E45',
        dark: '#006FB1',
        contrastText: '#ffffff',
      },
    },
  },
];

export { DarkThemeColors };
