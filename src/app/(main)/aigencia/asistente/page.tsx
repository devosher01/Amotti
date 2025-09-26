"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Avatar,
  alpha,
  Grid,
  Chip,
  CardContent,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconRobot,
  IconSparkles,
  IconBrain,
  IconSend,
  IconMessageCircle,
  IconBulb,
  IconTarget,
} from "@tabler/icons-react";
import PageContainer from "@/features/shared/components/container/PageContainer";
import BlankCard from "@/features/shared/components/shared/BlankCard";


// Styled Components con el mismo branding de Autolistas
const HeaderCard = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.98) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  border: `1px solid ${alpha('#5b24b7', 0.08)}`,
  boxShadow: `0 8px 32px ${alpha('#5b24b7', 0.06)}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const PremiumButton = styled(Button)(() => ({
  background: 'linear-gradient(135deg, #5b24b7 0%, #4c1d9a 100%)',
  color: 'white',
  fontWeight: 600,
  borderRadius: '12px',
  textTransform: 'none',
  padding: '12px 24px',
  boxShadow: `0 8px 25px ${alpha('#5b24b7', 0.2)}`,
  '&:hover': {
    background: 'linear-gradient(135deg, #4c1d9a 0%, #3d1677 100%)',
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 35px ${alpha('#5b24b7', 0.3)}`,
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const SubtleButton = styled(Button)(() => ({
  borderColor: alpha('#5b24b7', 0.2),
  color: '#5b24b7',
  fontWeight: 500,
  borderRadius: '12px',
  textTransform: 'none',
  padding: '8px 20px',
  '&:hover': {
    borderColor: '#5b24b7',
    backgroundColor: alpha('#5b24b7', 0.04),
    transform: 'translateY(-1px)',
  },
}));

const StyledCard = styled(BlankCard)(({ theme }) => ({
  border: `1px solid ${alpha('#5b24b7', 0.08)}`,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: `0 4px 20px ${alpha('#5b24b7', 0.06)}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 30px ${alpha('#5b24b7', 0.12)}`,
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const ChatContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${alpha('#5b24b7', 0.08)}`,
  borderRadius: theme.spacing(2),
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.90) 100%)'
    : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  boxShadow: `0 4px 20px ${alpha('#5b24b7', 0.06)}`,
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
}));

export default function AsistentePage() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente IA. ¿En qué puedo ayudarte hoy?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        text: message,
        isBot: false,
        timestamp: new Date(),
      }]);
      setMessage("");
      
      // Simular respuesta del bot
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: prev.length + 1,
          text: "Gracias por tu mensaje. Estoy procesando tu solicitud...",
          isBot: true,
          timestamp: new Date(),
        }]);
      }, 1000);
    }
  };

  const quickActions = [
    {
      title: "Generar Ideas",
      description: "Crea contenido creativo para redes sociales",
      icon: IconBulb,
      color: "#F59E0B",
    },
    {
      title: "Análisis de Mercado",
      description: "Obtén insights sobre tu audiencia",
      icon: IconTarget,
      color: "#10B981",
    },
    {
      title: "Optimizar Campaña",
      description: "Mejora el rendimiento de tus anuncios",
      icon: IconSparkles,
      color: "#8B5CF6",
    },
  ];

  return (
    <PageContainer title="Asistente IA" description="Tu asistente inteligente para marketing digital">
      <Box>
        {/* Header con el mismo diseño de Autolistas */}
        <HeaderCard>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 3 }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    background: 'linear-gradient(135deg, #5b24b7 0%, #4c1d9a 100%)',
                    boxShadow: `0 8px 24px ${alpha('#5b24b7', 0.2)}`,
                  }}
                >
                  <IconRobot size={32} color="white" />
                </Avatar>
                <Box>
                  <Typography 
                    variant="h3" 
                    fontWeight={700} 
                    sx={{ 
                      background: (theme) => theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                        : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      mb: 1,
                    }}
                  >
                    Asistente IA
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    fontWeight={400}
                  >
                    Tu compañero inteligente para el éxito en marketing digital
                  </Typography>
                </Box>
              </Stack>
              
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip
                  icon={<IconBrain size={16} />}
                  label="IA Avanzada"
                  variant="outlined"
                  sx={{
                    borderColor: alpha('#5b24b7', 0.3),
                    color: '#5b24b7',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={<IconSparkles size={16} />}
                  label="Respuestas Instantáneas"
                  variant="outlined"
                  sx={{
                    borderColor: alpha('#10B981', 0.3),
                    color: '#059669',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={<IconMessageCircle size={16} />}
                  label="Conversacional"
                  variant="outlined"
                  sx={{
                    borderColor: alpha('#F59E0B', 0.3),
                    color: '#D97706',
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Stack spacing={2} alignItems={{ xs: 'stretch', md: 'flex-end' }}>
                <PremiumButton
                  startIcon={<IconSparkles />}
                  fullWidth
                  onClick={() => setMessage("Ayúdame a crear una campaña")}
                >
                  Iniciar sesión avanzada
                </PremiumButton>
                <SubtleButton
                  variant="outlined"
                  startIcon={<IconBulb />}
                  fullWidth
                >
                  Ver ejemplos
                </SubtleButton>
              </Stack>
            </Grid>
          </Grid>
        </HeaderCard>

        <Grid container spacing={3}>
          {/* Acciones rápidas */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
              Acciones rápidas
            </Typography>
            <Stack spacing={2}>
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <StyledCard key={index}>
                    <CardContent sx={{ p: 3 }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                          sx={{
                            backgroundColor: alpha(action.color, 0.1),
                            color: action.color,
                            width: 48,
                            height: 48,
                          }}
                        >
                          <IconComponent size={24} />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {action.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {action.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </StyledCard>
                );
              })}
            </Stack>
          </Grid>

          {/* Chat del asistente */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
              Conversación con el asistente
            </Typography>
            
            <ChatContainer>
              {/* Mensajes */}
              <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
                <Stack spacing={2}>
                  {chatMessages.map((msg) => (
                    <Box
                      key={msg.id}
                      sx={{
                        display: 'flex',
                        justifyContent: msg.isBot ? 'flex-start' : 'flex-end',
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '70%',
                          padding: 2,
                          borderRadius: 2,
                          backgroundColor: msg.isBot 
                            ? alpha('#5b24b7', 0.1) 
                            : '#5b24b7',
                          color: msg.isBot ? 'text.primary' : 'white',
                          border: msg.isBot ? `1px solid ${alpha('#5b24b7', 0.2)}` : 'none',
                        }}
                      >
                        <Typography variant="body2">
                          {msg.text}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Input de mensaje */}
              <Box sx={{ p: 3, borderTop: `1px solid ${alpha('#5b24b7', 0.08)}` }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    fullWidth
                    placeholder="Escribe tu mensaje aquí..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: alpha('#f8fafc', 0.8),
                        '&:hover': {
                          backgroundColor: '#f8fafc',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          borderColor: '#5b24b7',
                        },
                      },
                    }}
                  />
                  <IconButton
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    sx={{
                      backgroundColor: '#5b24b7',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#4c1d9a',
                      },
                      '&:disabled': {
                        backgroundColor: alpha('#5b24b7', 0.3),
                      },
                    }}
                  >
                    <IconSend size={20} />
                  </IconButton>
                </Stack>
              </Box>
            </ChatContainer>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
} 