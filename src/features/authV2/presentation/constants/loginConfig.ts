// ============================================================================
// LOGIN PAGE CONFIGURATION CONSTANTS
// ============================================================================

export const LAYOUT_CONFIG = {
  CONTAINER_PADDING: { xs: 3, sm: 4 },
  CARD_MAX_WIDTH: "420px",
  LOGO_HEIGHT: 64,
  LOGO_WIDTH: 200,
  CARD_PADDING: { xs: "36px", sm: "44px" },
  HERO_SPACING: 7,
  TITLE_SPACING: 5,
  LINK_SPACING: 6,
  SECURITY_SPACING: 5,
} as const;

export const TYPOGRAPHY_SCALE = {
  TITLE: { xs: "30px", sm: "34px" },
  SUBTITLE: "15px",
  DESCRIPTION: "15px",
  LINK_TEXT: "13px",
  SECURITY_PRIMARY: "11px",
  SECURITY_SECONDARY: "10px",
} as const;

export const ANIMATION_CONFIG = {
  DURATION: {
    FADE: "0.8s",
    CARD: "1s",
    HOVER: "0.4s",
    PULSE: "2s",
  },
  EASING: {
    SMOOTH: "cubic-bezier(0.4, 0, 0.2, 1)",
    EASE_OUT: "ease-out",
    EASE_IN_OUT: "ease-in-out",
  },
} as const;
