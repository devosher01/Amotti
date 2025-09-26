import { styled } from "@mui/material/styles";
import { Card, Button, Avatar, alpha } from "@mui/material";

export const HeaderCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  borderRadius: "24px",
  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)",
  backdropFilter: "blur(20px)",
  padding: "48px 32px",
  marginBottom: "48px",
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
  transition: "all 0.3s ease",
}));

export const PremiumButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  borderRadius: "16px",
  textTransform: "none",
  padding: "16px 32px",
  fontSize: "1.1rem",
  boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.3)}`,
  "&:hover": {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
    transform: "translateY(-2px)",
    boxShadow: `0 16px 50px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));

export const SubtleButton = styled(Button)(({ theme }) => ({
  borderColor: alpha(theme.palette.secondary.main, 0.3),
  color: theme.palette.secondary.main,
  fontWeight: 600,
  borderRadius: "16px",
  textTransform: "none",
  padding: "16px 32px",
  fontSize: "1.1rem",
  "&:hover": {
    borderColor: theme.palette.secondary.main,
    backgroundColor: alpha(theme.palette.secondary.main, 0.04),
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));

export const ConnectCard = styled(Card)(({ theme }) => ({
  border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  borderRadius: theme.spacing(3),
  overflow: "hidden",
  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)",
  backdropFilter: "blur(20px)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.25)}`,
    borderColor: theme.palette.primary.main,
  },
}));

export const PlatformAvatar = styled(Avatar)<{ platform: string }>(({ theme, platform }) => {
  const platformColors = {
    facebook: "#1877F2",
    instagram: "#E4405F", 
    twitter: "#1DA1F2",
    linkedin: "#0A66C2",
    tiktok: "#000000",
    youtube: "#FF0000",
  };
  
  return {
    width: 64,
    height: 64,
    background: `linear-gradient(135deg, ${platformColors[platform as keyof typeof platformColors]} 0%, ${alpha(platformColors[platform as keyof typeof platformColors], 0.8)} 100%)`,
    boxShadow: `0 12px 30px ${alpha(platformColors[platform as keyof typeof platformColors], 0.3)}`,
    border: `3px solid ${alpha("#ffffff", 0.2)}`,
  };
});

export const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  borderRadius: "16px",
  textTransform: "none",
  padding: "16px 32px",
  fontSize: "1.1rem",
  boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.3)}`,
  "&:hover": {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
    transform: "translateY(-3px)",
    boxShadow: `0 16px 50px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));

export const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  borderRadius: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
    borderColor: alpha(theme.palette.primary.main, 0.2),
  },
}));
