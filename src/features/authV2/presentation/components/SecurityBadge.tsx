import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { SecurityBadgeProps } from "../types/loginTypes";
import { LAYOUT_CONFIG, TYPOGRAPHY_SCALE, ANIMATION_CONFIG } from "../constants/loginConfig";
import { createPageAnimations } from "../utils/animations";

export const SecurityBadge: React.FC<SecurityBadgeProps> = ({ isDark }) => {
  const animations = useMemo(() => createPageAnimations(), []);

  return (
    <Box
      sx={{
        mt: LAYOUT_CONFIG.SECURITY_SPACING,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        opacity: 0.6,
        transition: "opacity 0.3s ease",
        "&:hover": {
          opacity: 0.8,
        },
      }}
    >
      <Box
        sx={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          animation: `${animations.pulseSuccess} ${ANIMATION_CONFIG.DURATION.PULSE} ${ANIMATION_CONFIG.EASING.EASE_IN_OUT} infinite`,
          boxShadow: "0 0 8px rgba(16, 185, 129, 0.3)",
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: isDark
            ? "rgba(255, 255, 255, 0.55)"
            : "rgba(100, 116, 139, 0.65)",
          fontSize: TYPOGRAPHY_SCALE.SECURITY_PRIMARY,
          fontFamily: '"Inter", system-ui, sans-serif',
          fontWeight: 500,
          letterSpacing: "0.3px",
          textTransform: "uppercase",
        }}
      >
        Conexión Segura SSL
      </Typography>

      <Box
        sx={{
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: isDark
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(100, 116, 139, 0.4)",
        }}
      />

      <Typography
        variant="caption"
        sx={{
          color: isDark
            ? "rgba(255, 255, 255, 0.45)"
            : "rgba(100, 116, 139, 0.55)",
          fontSize: TYPOGRAPHY_SCALE.SECURITY_SECONDARY,
          fontFamily: '"Inter", system-ui, sans-serif',
          fontWeight: 400,
        }}
      >
        256-bit encryption
      </Typography>
    </Box>
  );
};
