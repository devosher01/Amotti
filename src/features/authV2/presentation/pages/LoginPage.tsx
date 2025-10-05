"use client";
import React, { useMemo } from "react";
import {
    Grid,
    Box,
    Card,
    Stack,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLogin } from "../hooks/useAuth";
import { createPageAnimations } from "../utils/animations";
import { LAYOUT_CONFIG, TYPOGRAPHY_SCALE, ANIMATION_CONFIG } from "../constants/loginConfig";
import type { LoginPageProps } from "../types/loginTypes";
import { SecurityBadge } from "@/features/authV2/presentation/components/SecurityBadge";
import { HeroLogo } from "../components/HeroLogo";
import OptimizedLoginForm from "../components/LoginForm";

export const LoginPage: React.FC<LoginPageProps> = () => {
    const theme = useTheme();
    const animations = useMemo(() => createPageAnimations(), []);
    const { login } = useLogin();

    const handleLoginSuccess = async (credentials: { email: string; password: string }) => {
        try {
            await login(credentials);
        } catch (error) {
            console.error('Error en login:', error);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                margin: 0,
                padding: 0,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 0,
                background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main}1A 25%, ${theme.palette.secondary.main}1A 50%, ${theme.palette.primary.main}33 75%, ${theme.palette.primary.main}4D 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 0,
                    background: `radial-gradient(circle at 30% 20%, ${theme.palette.primary.main}1A 0%, transparent 50%),
                     radial-gradient(circle at 70% 80%, ${theme.palette.info.main}14 0%, transparent 50%)`,
                    pointerEvents: "none",
                },
            }}
        >
            <Grid
                container
                spacing={0}
                justifyContent="center"
                sx={{
                    minHeight: "100vh",
                    position: "relative",
                    zIndex: 2,
                    padding: LAYOUT_CONFIG.CONTAINER_PADDING,
                    margin: 0,
                    width: "100%",
                    maxWidth: "100vw",
                    borderRadius: 0,
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={10}
                    md={8}
                    lg={5}
                    xl={4}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        maxWidth: "480px !important",
                        minHeight: "100vh",
                        py: { xs: 4, sm: 6 },
                    }}
                >
                    <HeroLogo theme={theme} animations={animations} />

                    <Card
                        elevation={0}
                        sx={{
                            width: "100%",
                            maxWidth: LAYOUT_CONFIG.CARD_MAX_WIDTH,
                            background: theme.palette.background.paper,
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            borderRadius: "20px",
                            border: `1px solid ${theme.palette.divider}`,
                            padding: LAYOUT_CONFIG.CARD_PADDING,
                            boxShadow: theme.shadows[4],
                            animation: `${animations.fadeInUp} ${ANIMATION_CONFIG.DURATION.CARD} ${ANIMATION_CONFIG.EASING.EASE_OUT} 0.2s both`,
                            transition: `all ${ANIMATION_CONFIG.DURATION.HOVER} ${ANIMATION_CONFIG.EASING.SMOOTH}`,

                            "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: theme.shadows[8],
                            },
                        }}
                    >
                        <Box sx={{ mb: LAYOUT_CONFIG.TITLE_SPACING }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    color: theme.palette.text.primary,
                                    fontWeight: 800,
                                    fontSize: TYPOGRAPHY_SCALE.TITLE,
                                    lineHeight: 1.1,
                                    textAlign: "center",
                                    mb: 2,
                                    fontFamily: '"Inter", system-ui, sans-serif',
                                    letterSpacing: "-0.03em",
                                }}
                            >
                                Bienvenido de vuelta
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontWeight: 500,
                                    fontSize: TYPOGRAPHY_SCALE.SUBTITLE,
                                    lineHeight: 1.4,
                                    textAlign: "center",
                                    fontFamily: '"Inter", system-ui, sans-serif',
                                }}
                            >
                                Accede a tu dashboard empresarial
                            </Typography>
                        </Box>

                        <Box sx={{ position: "relative" }}>
                            <OptimizedLoginForm
                                onSuccess={handleLoginSuccess}
                            />

                            <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                                mt={LAYOUT_CONFIG.LINK_SPACING}
                                sx={{
                                    opacity: 0.8,
                                    transition: "opacity 0.2s ease",
                                    "&:hover": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: theme.palette.text.disabled,
                                        fontWeight: 400,
                                        fontSize: TYPOGRAPHY_SCALE.LINK_TEXT,
                                        fontFamily: '"Inter", system-ui, sans-serif',
                                    }}
                                >
                                    ¿Nuevo en la plataforma?
                                </Typography>
                                <Typography
                                    component="a"
                                    href="/register"
                                    sx={{
                                        textDecoration: "none",
                                        color: theme.palette.primary.main,
                                        fontWeight: 500,
                                        fontSize: TYPOGRAPHY_SCALE.LINK_TEXT,
                                        transition: "all 0.2s ease",
                                        position: "relative",

                                        "&:hover": {
                                            color: theme.palette.primary.dark,
                                            transform: "translateY(-1px)",
                                        },

                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: -2,
                                            left: 0,
                                            right: 0,
                                            height: "1px",
                                            background: "currentColor",
                                            transform: "scaleX(0)",
                                            transition: "transform 0.2s ease",
                                        },

                                        "&:hover::after": {
                                            transform: "scaleX(1)",
                                        },
                                    }}
                                >
                                    Crear cuenta
                                </Typography>
                            </Stack>
                        </Box>
                    </Card>

                    <SecurityBadge isDark={theme.palette.mode === 'dark'} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginPage;
