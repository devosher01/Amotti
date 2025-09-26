import { type Theme, alpha } from "@mui/material";

// ============================================================================
// LOGIN THEME UTILITIES
// ============================================================================

export const createLoginThemeUtils = (theme: Theme) => {
  const isDark = theme.palette.mode === "dark";

  return {
    isDark,
    colors: {
      text: {
        primary: theme.palette.text.primary,
        secondary: theme.palette.text.secondary,
        muted: alpha(theme.palette.text.secondary, 0.8),
        subtle: alpha(theme.palette.text.secondary, 0.6),
        link: alpha(theme.palette.primary.main, 0.8),
        linkHover: theme.palette.primary.main,
        security: alpha(theme.palette.text.secondary, 0.7),
        securitySecondary: alpha(theme.palette.text.secondary, 0.5),
      },
      background: {
        page: isDark
          ? `linear-gradient(135deg, 
              ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.dark, 0.1)} 25%, ${alpha(theme.palette.secondary.dark, 0.1)} 50%, ${alpha(theme.palette.primary.main, 0.2)} 75%, ${theme.palette.primary.main} 100%
            )`
          : `linear-gradient(135deg, 
              ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.light, 0.1)} 25%, ${alpha(theme.palette.secondary.light, 0.1)} 50%, ${alpha(theme.palette.primary.main, 0.1)} 75%, ${alpha(theme.palette.primary.main, 0.2)} 100%
            )`,
        overlay: isDark
          ? `radial-gradient(circle at 30% 20%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%),
             radial-gradient(circle at 70% 80%, ${alpha(theme.palette.info.main, 0.08)} 0%, transparent 50%)`
          : `radial-gradient(circle at 30% 20%, ${alpha(theme.palette.background.paper, 0.3)} 0%, transparent 50%),
             radial-gradient(circle at 70% 80%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%)`,
        card: isDark
          ? `linear-gradient(135deg, 
              ${alpha(theme.palette.background.paper, 0.12)} 0%, ${alpha(theme.palette.background.paper, 0.08)} 100%
            )`
          : `linear-gradient(135deg, 
              ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%
            )`,
      },
      border: {
        card: isDark
          ? `1px solid ${alpha(theme.palette.background.paper, 0.15)}`
          : `1px solid ${alpha(theme.palette.divider, 0.25)}`,
      },
      shadow: {
        card: isDark
          ? `0 24px 48px -12px ${alpha(theme.palette.common.black, 0.4)},
             0 0 0 1px ${alpha(theme.palette.background.paper, 0.08)} inset,
             0 2px 4px ${alpha(theme.palette.background.paper, 0.1)} inset`
          : `0 24px 48px -12px ${alpha(theme.palette.divider, 0.3)},
             0 0 0 1px ${alpha(theme.palette.background.paper, 0.9)} inset,
             0 2px 4px ${alpha(theme.palette.background.paper, 0.8)} inset`,
        cardHover: isDark
          ? `0 32px 64px -12px ${alpha(theme.palette.common.black, 0.5)},
             0 0 0 1px ${alpha(theme.palette.background.paper, 0.12)} inset,
             0 4px 8px ${alpha(theme.palette.background.paper, 0.15)} inset`
          : `0 32px 64px -12px ${alpha(theme.palette.divider, 0.35)},
             0 0 0 1px ${alpha(theme.palette.background.paper, 0.95)} inset,
             0 4px 8px ${alpha(theme.palette.background.paper, 0.9)} inset`,
        logo: isDark
          ? `drop-shadow(0 6px 20px ${alpha(theme.palette.common.black, 0.3)})`
          : `drop-shadow(0 6px 20px ${alpha(theme.palette.common.black, 0.15)})`,
        securityDot: `0 0 8px ${alpha(theme.palette.success.main, 0.3)}`,
      },
    },
  };
};
