import React from "react";
import { Box, Typography, Theme } from "@mui/material";
import Image from "next/image";
import { LAYOUT_CONFIG, TYPOGRAPHY_SCALE, ANIMATION_CONFIG } from "../constants/loginConfig";

interface HeroLogoProps {
  theme: Theme;
  animations: any;
}

export const HeroLogo: React.FC<HeroLogoProps> = ({ theme, animations }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      mb: LAYOUT_CONFIG.HERO_SPACING,
      animation: `${animations.fadeInUp} ${ANIMATION_CONFIG.DURATION.FADE} ${ANIMATION_CONFIG.EASING.EASE_OUT}`,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      padding: '16px 20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      maxWidth: 'fit-content',
    }}
  >
    <Box
      sx={{
        position: "relative",
        mb: 0,
        transition: `all 0.3s ${ANIMATION_CONFIG.EASING.SMOOTH}`,
        "&:hover": {
          transform: "scale(1.02) translateY(-2px)",
        },
      }}
    >
      <Image
        src="/images/svgs/logo-01.svg"
        alt="Amotii"
        height={LAYOUT_CONFIG.LOGO_HEIGHT}
        width={LAYOUT_CONFIG.LOGO_WIDTH}
        priority
        style={{
          objectFit: "contain",
          filter: theme.palette.mode === 'dark' ? 'drop-shadow(0 6px 20px rgba(0,0,0,0.3))' : 'drop-shadow(0 6px 20px rgba(0,0,0,0.15))',
        }}
      />
    </Box>

    <Typography
      variant="body2"
      sx={{
        color: theme.palette.text.secondary,
        fontWeight: 500,
        fontSize: TYPOGRAPHY_SCALE.DESCRIPTION,
        letterSpacing: "0.3px",
        textAlign: "center",
        fontFamily: '"Inter", system-ui, sans-serif',
        lineHeight: 1.4,
        maxWidth: "280px",
      }}
    >
      Plataforma inteligente de gestión de marketing
    </Typography>
  </Box>
);
