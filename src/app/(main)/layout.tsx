"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
import { ThemeSettings } from "@/utils/theme/Theme";
import { useSelector } from 'react-redux';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { AppState } from "@/store/store";
import RTL from "../../components/componentsv1/shared/customizer/RTL";
import "@/utils/i18n";

import Header from "../../components/componentsv1/header/Header";
import Sidebar from "../../components/componentsv1/sidebar/Sidebar";
import Customizer from "../../components/componentsv1/shared/customizer/Customizer";
import Navigation from "../../components/componentsv1/navbar/Navigation";
import HorizontalHeader from "../../components/componentsv1/header/HorizontalHeader";
import { AppLoadingBoundary } from "@/components/loading/AppLoadingBoundary";
import { LoadingProvider } from "@/components/loading/LoadingProvider";
import { DataPrefetchProvider } from "@/components/loading/DataPrefetchProvider";
import { useSimpleLoading } from '@/hooks/useSimpleLoading';

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const theme = ThemeSettings();
  const muiTheme = useTheme();
  const customizer = useSelector((state: AppState) => state.customizer);

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <RTL direction={customizer.activeDir}>
          <CssBaseline />
          <LoadingProvider>
            <DataPrefetchProvider>
              <MainLayoutContent 
                customizer={customizer} 
                muiTheme={muiTheme}
              >
                {children}
              </MainLayoutContent>
            </DataPrefetchProvider>
          </LoadingProvider>
        </RTL>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

// 🎯 Componente interno que puede usar el loading state
function MainLayoutContent({ 
  children, 
  customizer, 
  muiTheme 
}: { 
  children: React.ReactNode;
  customizer: any;
  muiTheme: any;
}) {
  const { isGlobalLoading } = useSimpleLoading();

  return (
    <AppLoadingBoundary isLoading={isGlobalLoading}>
      <MainWrapper className={customizer.activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}>
        {customizer.isHorizontal ? "" : <Sidebar />}
        
        <PageWrapper
          className="page-wrapper"
          sx={{
            ...(customizer.isCollapse && {
              [muiTheme.breakpoints.up("lg")]: {
                ml: `${customizer.MiniSidebarWidth}px`,
              },
            }),
          }}
        >
          {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
          {customizer.isHorizontal ? <Navigation /> : ""}
          
          <Container
            sx={{
              pt: '30px',
              maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important",
            }}
          >
            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
              {children}
            </Box>
          </Container>
          
          <Customizer />
        </PageWrapper>
      </MainWrapper>
    </AppLoadingBoundary>
  );
}
