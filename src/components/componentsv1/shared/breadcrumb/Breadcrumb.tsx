'use client'
import React from "react";
import { Grid, Typography, Box, Breadcrumbs, Theme } from "@mui/material";
import Link from "next/link";
import { IconCircle } from "@tabler/icons-react";
import Image from "next/image";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { professionalBranding } from "@/utils/theme/ProfessionalBranding";

interface BreadCrumbType {
  subtitle?: string;
  items?: any[];
  title: string;
  children?: JSX.Element;
}

const Breadcrumb = ({ subtitle, items, title, children }: BreadCrumbType) => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const isDark = customizer.activeMode === 'dark';

  return (
    <Grid
      container
      sx={{
        // 🎨 Fondo sutil que se integra naturalmente
        background: professionalBranding.getCardBackground(isDark),
        borderRadius: (theme: Theme) => theme.shape.borderRadius / 4,
        p: "24px 20px 16px",
        marginBottom: "24px",
        position: "relative",
        overflow: "hidden",
        // Borde muy sutil para integración
        border: `1px solid ${professionalBranding.getCalendarHeaderBorder(isDark)}`,
        // Sombra muy suave
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        // 🎨 Gradiente sutil púrpura en el borde superior
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #5b24b7 0%, #4057d9 50%, #3b68df 100%)',
          borderRadius: '4px 4px 0 0',
        },
      }}
    >
      <Grid item xs={12} sm={6} lg={8} mb={1}>
        <Typography 
          variant="h4"
          sx={{
            // 🎨 Título con acento púrpura sutil
            color: professionalBranding.getTextPrimary(isDark),
            fontWeight: 700,
            background: 'linear-gradient(135deg, #5b24b7 0%, #4057d9 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            '&::after': {
              content: '""',
              display: 'block',
              width: '60px',
              height: '3px',
              background: 'linear-gradient(90deg, #5b24b7 0%, #4057d9 100%)',
              borderRadius: '2px',
              marginTop: '8px',
            }
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            // 🎨 Subtítulo más sutil
            color: professionalBranding.getTextSecondary(isDark),
            fontWeight: 400,
            mt: 0.8,
            mb: 0,
          }}
          variant="h6"
        >
          {subtitle}
        </Typography>
        <Breadcrumbs
          separator={
            <IconCircle
              size="5"
              style={{ 
                margin: "0 5px",
                // 🎨 Separador con acento púrpura
                color: '#5b24b7',
                opacity: 0.6
              }}
            />
          }
          sx={{ alignItems: "center", mt: items ? "10px" : "" }}
          aria-label="breadcrumb"
        >
          {items
            ? items.map((item) => (
                <div key={item.title}>
                  {item.to ? (
                    <Link href={item.to} passHref>
                      <Typography 
                        sx={{
                          // 🎨 Enlaces con acento púrpura
                          color: professionalBranding.getTextSecondary(isDark),
                          textDecoration: 'none',
                          fontWeight: 500,
                          '&:hover': {
                            color: '#5b24b7',
                            textDecoration: 'none',
                            transform: 'translateY(-1px)',
                            transition: 'all 0.2s ease',
                          }
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Link>
                  ) : (
                    <Typography 
                      sx={{
                        // 🎨 Texto activo con acento púrpura
                        color: '#5b24b7',
                        fontWeight: 600,
                        '&::after': {
                          content: '""',
                          display: 'block',
                          width: '100%',
                          height: '2px',
                          background: 'linear-gradient(90deg, #5b24b7 0%, #4057d9 100%)',
                          borderRadius: '1px',
                          marginTop: '2px',
                        }
                      }}
                    >
                      {item.title}
                    </Typography>
                  )}
                </div>
              ))
            : ""}
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
        <Box
          sx={{
            display: { xs: "none", md: "block", lg: "flex" },
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          {children ? (
            <Box sx={{ top: "0px", position: "absolute" }}>{children}</Box>
          ) : (
            <>
              <Box sx={{ top: "0px", position: "absolute" }}>
                <Image
                  src="/images/breadcrumb/ChatBc.png"
                  alt={"breadcrumbImg"}
                  style={{ width: "165px", height: "165px" }}
                  priority
                  width={165}
                  height={165}
                />
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Breadcrumb;
