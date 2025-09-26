'use client'
import { useSelector } from "@/store/hooks";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { AppState } from "@/store/store";
import Image from "next/image";
import { Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';

const Logo = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();
  const topbarHeight = customizer.TopbarHeight || 70; 
  
  const LinkStyled = styled(Link)(() => ({
    height: topbarHeight,
    width: customizer.isCollapse ? "40px" : "180px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
  }));

  return (
    <LinkStyled href="/new">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          paddingLeft: "8px", // Mover un poco a la derecha
        }}
      >
        {customizer.isCollapse && !customizer.isSidebarHover ? (
          // Logo colapsado - con caja blanca para contraste
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: "10px",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: theme.palette.mode === 'dark' 
                ? "0 4px 12px rgba(0,0,0,0.3)" 
                : "0 4px 12px rgba(0,0,0,0.15)",
              border: theme.palette.mode === 'dark' 
                ? "1px solid rgba(255, 255, 255, 0.1)" 
                : "1px solid rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: theme.palette.mode === 'dark' 
                  ? "0 6px 16px rgba(0,0,0,0.4)" 
                  : "0 6px 16px rgba(0,0,0,0.2)",
              }
            }}
          >
            <Image
              src="/images/logo_amotii.jpeg"
              alt="Amotii Logo"
              height={32}
              width={32}
              priority
              style={{
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
          </Box>
        ) : (
          // Logo expandido - con caja blanca para contraste
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: "12px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: theme.palette.mode === 'dark' 
                ? "0 6px 20px rgba(0,0,0,0.3)" 
                : "0 6px 20px rgba(0,0,0,0.15)",
              border: theme.palette.mode === 'dark' 
                ? "1px solid rgba(255, 255, 255, 0.1)" 
                : "1px solid rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.palette.mode === 'dark' 
                  ? "0 8px 25px rgba(0,0,0,0.4)" 
                  : "0 8px 25px rgba(0,0,0,0.2)",
              }
            }}
          >
            <Image
              src="/images/svgs/logo-01.svg"
              alt="Motii Logo"
              height={topbarHeight - 40}
              width={120}
              priority
              style={{
                objectFit: "contain",
                height: "auto",
                maxHeight: topbarHeight - 40,
              }}
            />
          </Box>
        )}
      </Box>
    </LinkStyled>
  );
};

export default Logo;
