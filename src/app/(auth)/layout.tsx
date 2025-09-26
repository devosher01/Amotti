"use client";
import React from 'react';
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from 'react-redux';
import { AppState } from "@/store/store";
import { ThemeSettings } from "@/utils/theme/Theme";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import RTL from "../../components/componentsv1/shared/customizer/RTL";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const theme = ThemeSettings();
  const customizer = useSelector((state: AppState) => state.customizer);

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <RTL direction={customizer.activeDir}>
          <CssBaseline />
          <Box
            sx={{
              minHeight: "100vh",
              width: "100%",
              background: `linear-gradient(180deg, 
                ${theme.palette.primary.main} 0%,
                ${theme.palette.primary.light} 50%,
                ${theme.palette.secondary.main} 100%
              )`,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: "none",
                background: `
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
              linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)
            `,
              },
            }}
          >
            {children}
          </Box>
        </RTL>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
} 