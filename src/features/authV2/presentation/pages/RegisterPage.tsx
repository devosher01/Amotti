"use client";
import React, { useMemo, useState } from "react";
import { Box, Card, Typography, Snackbar, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { createLoginThemeUtils } from "../utils/themeUtils";
import { createPageAnimations } from "../utils/animations";

import type { RegisterPageProps } from "../types/loginTypes";
import { RegisterFormRHF } from "../components/RegisterFormRHF";
import { HeroLogo } from "../components/HeroLogo";

export const RegisterPage: React.FC<RegisterPageProps> = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const themeUtils = useMemo(() => createLoginThemeUtils(theme), [theme]);
    const animations = useMemo(() => createPageAnimations(), []);

    const handleRegisterSuccess = () => {
        window.location.href = '/login';
    };

    const handleRegisterError = (error: string) => {
        // Intentionally left blank as per instruction to remove logs and comments.
        // In a real application, you would handle the error here (e.g., show a toast/snackbar).
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
                background: themeUtils.colors.background.page,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                overflowY: "auto",
                paddingTop: { xs: "env(safe-area-inset-top, 0px)", sm: 0 },

                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 0,
                    background: themeUtils.colors.background.overlay,
                    pointerEvents: "none",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    position: "relative",
                    zIndex: 2,
                    padding: { xs: "12px", sm: "16px", md: "20px" },
                    gap: { xs: 1, sm: 1.5 },
                }}
            >
                <Box sx={{
                    flexShrink: 0,
                    mb: { xs: 0.5, sm: 1 },
                }}>
                    <HeroLogo themeUtils={themeUtils} animations={animations} />
                </Box>

                <Card
                    elevation={0}
                    sx={{
                        position: "relative",
                        width: "100%",
                        maxWidth: { xs: "100%", sm: "700px", md: "800px" },
                        p: { xs: 3, sm: 4, md: 5 },
                        zIndex: 5,
                        backdropFilter: "blur(20px)",
                        background: themeUtils.colors.background.card,
                        border: themeUtils.colors.border.card,
                        borderRadius: "16px",
                        boxShadow: themeUtils.colors.shadow.card,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

                        "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: themeUtils.colors.shadow.cardHover,
                        },
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}>
                        <Box sx={{
                            width: "100%",
                            maxWidth: "700px",
                        }}>
                            <RegisterFormRHF
                                onSuccess={handleRegisterSuccess}
                                onError={handleRegisterError}
                            />

                        </Box>
                    </Box>
                </Card>

                <Box
                    sx={{
                        textAlign: "center",
                        mt: 2,
                        mb: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: themeUtils.colors.text.secondary,
                            fontSize: "14px",
                            fontFamily: '"Inter", system-ui, sans-serif',
                        }}
                    >
                        ¿Ya tienes una cuenta?{' '}
                        <Typography
                            component="a"
                            href="/login"
                            sx={{
                                color: themeUtils.colors.text.link,
                                textDecoration: 'none',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    color: themeUtils.colors.text.linkHover,
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Inicia sesión aquí
                        </Typography>
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        opacity: 0.6,
                        flexShrink: 0,
                        mt: 1,
                    }}
                >
                    <Box
                        sx={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: theme.palette.success.main,
                            animation: `${animations.pulseSuccess} 3s ease-in-out infinite`,
                            boxShadow: themeUtils.colors.shadow.securityDot,
                        }}
                    />
                    <Typography
                        variant="caption"
                        sx={{
                            color: themeUtils.colors.text.security,
                            fontSize: "10px",
                            fontFamily: '"Inter", system-ui, sans-serif',
                            fontWeight: 500,
                        }}
                    >
                        SSL
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default RegisterPage;
