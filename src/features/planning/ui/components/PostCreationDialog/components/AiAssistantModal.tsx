"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  IconButton,
  Box,
  useTheme,
  Avatar,
  Alert,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  IconX,
  IconCheck,
  IconThumbUp,
  IconThumbDown,
  IconChevronRight,
  IconLanguage,
  IconHash,
  IconArrowUp,
  IconArrowDown,
  IconPalette,
  IconMoodSmile,
  IconBellCheck,
  IconShare,
  IconRefresh,
  IconSettings,
  IconReload,
} from "@tabler/icons-react";
import { AIChatProvider, useAIChat } from "@/features/ai-chat";

// 🛠️ Herramientas hardcodeadas para mejor UX
const STATIC_AI_OPTIONS = [
  { id: 'translate', title: 'Traducir', icon: IconLanguage, hasSubmenu: true },
  { id: 'add_cta', title: 'Añadir CTA', icon: IconShare },
  { id: 'add_hashtags', title: 'Añadir Hashtags', icon: IconHash },
  { id: 'expand_text', title: 'Alargar texto', icon: IconArrowUp }, // Corregido: extend_text -> expand_text
  { id: 'shorten_text', title: 'Acortar texto', icon: IconArrowDown },
  { id: 'change_tone', title: 'Cambiar tono', icon: IconPalette, hasSubmenu: true },
  { id: 'add_emojis', title: 'Añadir emojis', icon: IconMoodSmile },
  { id: 'correct_text', title: 'Corregir texto', icon: IconBellCheck }, // Corregido: spell_check -> correct_text
  { id: 'optimize_for_platform', title: 'Optimizar para red social', icon: IconShare, hasSubmenu: true }, // Corregido: optimize_social -> optimize_for_platform
  { id: 'restructure_content', title: 'Cambiar estructura', icon: IconRefresh }, // Corregido: change_structure -> restructure_content
  { id: 'adjust_instructions', title: 'Ajustar instrucciones', icon: IconSettings, isHighlighted: true },
  { id: 'reset_assistant', title: 'Reiniciar asistente', icon: IconReload }
];

interface AiAssistantModalProps {
  open: boolean;
  onClose: () => void;
  currentText: string;
  onTextGenerated: (newText: string) => void;
}

// Componente interno que usa el hook
const AiAssistantModalContent: React.FC<AiAssistantModalProps> = ({
  open,
  onClose,
  currentText,
  onTextGenerated,
}) => {
  const theme = useTheme();
  const [processing, setProcessing] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState<HTMLElement | null>(null);
  
  // Estado para el modo generador
  const [generatorForm, setGeneratorForm] = useState({
    topic: '',
    tone: 'formal',
    language: 'español',
    platform: 'cualquier',
    length: 'medio'
  });

  // 🎭 Opciones de tono con emojis
  const TONE_OPTIONS = [
    { value: 'afectuoso', label: '😘 Afectuoso' },
    { value: 'creativo', label: '🎨 Creativo' },
    { value: 'descriptivo', label: '📖 Descriptivo' },
    { value: 'dramatico', label: '😱 Dramático' },
    { value: 'educativo', label: '✏️ Educativo' },
    { value: 'empatico', label: '🤗 Empático' },
    { value: 'formal', label: '🧐 Formal' },
    { value: 'humoristico', label: '😁 Humorístico' },
    { value: 'informal', label: '😜 Informal' },
    { value: 'ironico', label: '😏 Irónico' },
    { value: 'melancolico', label: '😢 Melancólico' },
    { value: 'positivo', label: '🙂 Positivo' },
    { value: 'cientifico', label: '✍️ Científico' }
  ];

  // 🌍 Opciones de idioma
  const LANGUAGE_OPTIONS = [
    { value: 'español', label: 'Español' },
    { value: 'inglés', label: 'Inglés' },
    { value: 'armenio', label: 'Armenio' },
    { value: 'francés', label: 'Francés' },
    { value: 'alemán', label: 'Alemán' },
    { value: 'portugués', label: 'Portugués' },
    { value: 'italiano', label: 'Italiano' },
    { value: 'japonés', label: 'Japonés' },
    { value: 'coreano', label: 'Coreano' },
    { value: 'chino', label: 'Chino' }
  ];

  // 📱 Opciones de plataforma social
  const PLATFORM_OPTIONS = [
    { value: 'cualquier', label: 'Cualquier red social' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
  ];

  // 📏 Opciones de longitud
  const LENGTH_OPTIONS = [
    { value: 'corto', label: 'Corto' },
    { value: 'medio', label: 'Medio' },
    { value: 'largo', label: 'Largo' },
  ];

  // 🔧 Mapear opciones existentes para submenús
  const SUBMENU_OPTIONS = {
    translate: LANGUAGE_OPTIONS,
    change_tone: TONE_OPTIONS,
    optimize_for_platform: PLATFORM_OPTIONS.filter(p => p.value !== 'cualquier') // Corregido: optimize_social -> optimize_for_platform
  };
  
  // 🔍 Debug: Verificar qué texto llega al modal
  console.log('🎯 AI Modal - currentText received:', {
    currentText,
    type: typeof currentText,
    length: currentText?.length,
    trimmed: currentText?.trim(),
    trimmedLength: currentText?.trim()?.length
  });

  // Hook de AI Chat
  const {
    session,
    messages,
    isLoading,
    error,
    initializeSession,
    processTool,
    addFeedback,
    resetSession,
    generateContent,
    clearError
  } = useAIChat({
    originalText: currentText,
    onTextGenerated
  });

  // Inicializar sesión cuando se abre el modal
  useEffect(() => {
    if (open && !session && !isLoading && !isInitialized) {
      // ⚠️ Validar que haya texto antes de inicializar
      const trimmedText = currentText?.trim();
      if (!trimmedText || trimmedText.length < 3) {
        console.warn('⚠️ No hay suficiente texto para inicializar AI Chat');
        return;
      }
      
      setIsInitialized(true);
      initializeSession();
    }
    
    // Reset cuando se cierra el modal
    if (!open && isInitialized) {
      setIsInitialized(false);
      setSuccessMessage(null);
      setProcessing(null);
    }
  }, [open, session, isLoading, isInitialized, initializeSession, currentText]);

  // 🚀 Usar herramientas estáticas para mejor UX - no esperar al backend
  const aiOptions = STATIC_AI_OPTIONS;

  // 🎯 Determinar el modo de la modal
  const hasExistingText = currentText?.trim()?.length >= 3;
  const isGeneratorMode = !hasExistingText;

  const handleOptionClick = async (optionId: string, event?: React.MouseEvent<HTMLElement>) => {
    const option = aiOptions.find(opt => opt.id === optionId);
    if (!option || processing || !session) return;

    // 🔧 Si la opción tiene submenú, abrirlo
    if (option.hasSubmenu && SUBMENU_OPTIONS[optionId as keyof typeof SUBMENU_OPTIONS]) {
      setSubmenuOpen(optionId);
      setSubmenuAnchorEl(event?.currentTarget || null);
      return;
    }

    // 🚀 Si no tiene submenú, procesar directamente
    setProcessing(optionId);

    try {
      await processTool(optionId);
    } catch (error) {
      console.error('Error processing AI option:', error);
    } finally {
      setProcessing(null);
    }
  };

  const handleSubmenuClick = async (toolId: string, parameter: string) => {
    setSubmenuOpen(null);
    setSubmenuAnchorEl(null);
    setProcessing(toolId);

    try {
      // Pasar el parámetro seleccionado
      await processTool(toolId, undefined, { selectedOption: parameter });
    } catch (error) {
      console.error('Error processing AI tool with parameter:', error);
    } finally {
      setProcessing(null);
    }
  };

  const handleSubmenuClose = () => {
    setSubmenuOpen(null);
    setSubmenuAnchorEl(null);
  };

  const handleReset = async () => {
    if (!session) return;
    setProcessing('reset');
    try {
      await resetSession();
    } catch (error) {
      console.error('Error resetting session:', error);
    } finally {
      setProcessing(null);
    }
  };

  const handleUseText = async (messageId: string) => {
    try {
      // 🎯 Buscar el mensaje con el texto transformado
      const message = messages.find(msg => msg.id === messageId);
      
      if (message && message.transformedText) {
        console.log('✅ Aplicando texto transformado directamente:', {
          messageId,
          transformedText: message.transformedText.substring(0, 100) + '...'
        });
        
        // 🚀 Aplicar el texto directamente sin petición HTTP
        onTextGenerated(message.transformedText);
        onClose();
      } else {
        console.warn('⚠️ No se encontró el mensaje o no tiene texto transformado:', { messageId, message });
      }
    } catch (error) {
      console.error('Error applying transformation:', error);
    }
  };

  const handleFeedback = async (messageId: string, liked: boolean) => {
    try {
      await addFeedback(messageId, liked);
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  const handleGenerateText = async () => {
    if (!generatorForm.topic.trim()) return;
    
    try {
      setProcessing('generate');
      setSuccessMessage(null); // Limpiar mensaje anterior
      
      // 🎯 Usar la nueva API de generación de contenido
      const parameters = {
        topic: generatorForm.topic.trim(),
        tone: generatorForm.tone,
        language: generatorForm.language,
        platform: generatorForm.platform,
        length: generatorForm.length
      };

      const userInstructions = `Genera contenido atractivo para ${generatorForm.platform} con tono ${generatorForm.tone}`;
      
      console.log('🚀 Calling generateContent with parameters:', { parameters, userInstructions });
      
      // Llamar al servicio real de IA
      await generateContent(parameters, userInstructions);
      
      // ✅ Mostrar mensaje de éxito SIN cerrar la modal
      if (!error) {
        setSuccessMessage('✅ ¡Contenido generado exitosamente! El texto se ha agregado a tu publicación.');
      }
      
    } catch (error) {
      console.error('❌ Error generating text:', error);
      setSuccessMessage(null); // Limpiar mensaje de éxito si hay error
      // 🚫 NO cerrar la modal en caso de error para que el usuario pueda ver el error y reintentar
    } finally {
      setProcessing(null);
    }
  };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          height: '90vh',
          maxHeight: '900px',
        }
      }}
    >
      <DialogContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header mejorado según especificaciones */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.paper,
        }}>
          {/* Lado izquierdo: Título */}
          <Typography variant="h6" fontWeight={600}>
            Generador de textos con IA
          </Typography>
          
          {/* Lado derecho: Créditos + Botón cerrar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Créditos IA disponibles: <strong>0.9 de 5</strong>
              </Typography>
              <IconButton size="small" sx={{ color: theme.palette.grey[600] }}>
                <IconCheck size={16} />
              </IconButton>
            </Box>
            <IconButton onClick={onClose} size="small">
              <IconX size={20} />
            </IconButton>
          </Box>
        </Box>

        {/* Error Alert */}
        {/* {error && (
          <Alert 
            severity="error" 
            onClose={clearError}
            sx={{ m: 2 }}
          >
            {error}
          </Alert>
        )} */}

        {/* Success Alert */}
        {/* {successMessage && (
          <Alert 
            severity="success" 
            onClose={() => setSuccessMessage(null)}
            sx={{ m: 2 }}
          >
            {successMessage}
          </Alert>
        )} */}

        {/* Bot Writing Indicator - Solo en modo generador cuando está procesando */}
        {isGeneratorMode && processing === 'generate' && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 3,
            bgcolor: theme.palette.grey[50],
            borderTop: `1px solid ${theme.palette.divider}`,
            borderBottom: `1px solid ${theme.palette.divider}`,
            gap: 2
          }}>
            <Box sx={{ 
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
            }}>
              🤖
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={600} color="text.primary">
                El asistente está generando tu contenido...
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <Box 
                  sx={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.primary.main,
                    animation: 'bounce 1.4s infinite ease-in-out'
                  }} 
                />
                <Box 
                  sx={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.primary.main,
                    animation: 'bounce 1.4s infinite ease-in-out 0.2s'
                  }} 
                />
                <Box 
                  sx={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.primary.main,
                    animation: 'bounce 1.4s infinite ease-in-out 0.4s'
                  }} 
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  Esto puede tomar unos segundos
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Main Content */}
        <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {isGeneratorMode ? (
            // 🎯 MODO GENERADOR - Cuando no hay texto
            <>
              {/* Left Column - Welcome Message */}
              <Box sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                borderRight: `1px solid ${theme.palette.divider}`,
                p: 3
              }}>
                <Box sx={{
                  bgcolor: theme.palette.grey[900],
                  color: 'white',
                  p: 3,
                  borderRadius: 2,
                  mb: 3
                }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    ¡Hola! Soy tu asistente de IA.
                  </Typography>
                  <Typography variant="body2">
                    Rellena los campos y en un momento generaré un texto que puedes modificar para hacerlo tuyo. ¡manos a la obra!
                  </Typography>
                </Box>
              </Box>

              {/* Right Column - Generator Form */}
              <Box sx={{ 
                width: 400, 
                display: 'flex', 
                flexDirection: 'column',
                bgcolor: theme.palette.background.default,
                p: 3
              }}>
                {/* Robot Illustration */}
                <Box sx={{ 
                  textAlign: 'center', 
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    fontSize: '60px',
                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
                  }}>
                    🤖
                  </Box>
                  <Box sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    fontSize: '20px',
                    animation: 'sparkle 2s infinite'
                  }}>
                    ✨
                  </Box>
                  <Box sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    fontSize: '16px',
                    animation: 'sparkle 2s infinite 0.5s'
                  }}>
                    ⭐
                  </Box>
                </Box>

                {/* Form Fields */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    label="Escribe el tema del texto a generar"
                    multiline
                    rows={3}
                    value={generatorForm.topic}
                    onChange={(e) => setGeneratorForm(prev => ({ ...prev, topic: e.target.value }))}
                    placeholder="Ej. Cinco beneficios de tener perros labradores en casa"
                    error={!generatorForm.topic.trim() && generatorForm.topic.length > 0}
                    helperText={!generatorForm.topic.trim() && generatorForm.topic.length > 0 ? "El campo Tema es obligatorio" : ""}
                    fullWidth
                  />

                  <FormControl fullWidth>
                    <InputLabel>Elige un tono</InputLabel>
                    <Select
                      value={generatorForm.tone}
                      label="Elige un tono"
                      onChange={(e) => setGeneratorForm(prev => ({ ...prev, tone: e.target.value }))}
                      MenuProps={{
                        PaperProps: {
                          sx: { maxHeight: 300 }
                        }
                      }}
                    >
                      {TONE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Idioma</InputLabel>
                    <Select
                      value={generatorForm.language}
                      label="Idioma"
                      onChange={(e) => setGeneratorForm(prev => ({ ...prev, language: e.target.value }))}
                      MenuProps={{
                        PaperProps: {
                          sx: { maxHeight: 300 }
                        }
                      }}
                    >
                      {LANGUAGE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Optimizar para red social</InputLabel>
                    <Select
                      value={generatorForm.platform}
                      label="Optimizar para red social"
                      onChange={(e) => setGeneratorForm(prev => ({ ...prev, platform: e.target.value }))}
                      MenuProps={{
                        PaperProps: {
                          sx: { maxHeight: 300 }
                        }
                      }}
                    >
                      {PLATFORM_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Longitud del contenido</InputLabel>
                    <Select
                      value={generatorForm.length}
                      label="Longitud del contenido"
                      onChange={(e) => setGeneratorForm(prev => ({ ...prev, length: e.target.value }))}
                      MenuProps={{
                        PaperProps: {
                          sx: { maxHeight: 300 }
                        }
                      }}
                    >
                      {LENGTH_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleGenerateText}
                    disabled={!generatorForm.topic.trim() || processing === 'generate'}
                    sx={{ 
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: '1rem',
                      ...(processing === 'generate' && {
                        bgcolor: theme.palette.grey[400],
                        '&:hover': {
                          bgcolor: theme.palette.grey[400],
                        }
                      })
                    }}
                  >
                    {processing === 'generate' ? 'Generando texto...' : 'Generar texto'}
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            // 🔧 MODO MODIFICADOR - Cuando hay texto existente
            <>
              {/* Left Column - Chat */}
              <Box sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                borderRight: `1px solid ${theme.palette.divider}`,
              }}>
                {/* Chat Messages Container with Scroll */}
                <Box sx={{ 
                  flex: 1,
                  p: 3,
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: 8,
                  },
                  '&::-webkit-scrollbar-track': {
                    background: theme.palette.action.hover,
                    borderRadius: 4,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: theme.palette.primary.main,
                    borderRadius: 4,
                    '&:hover': {
                      background: theme.palette.primary.dark,
                    }
                  },
                }}>
                  {messages.map((message, index) => (
                    <Box key={message.id} sx={{ mb: 3 }}>
                      {message.role === 'assistant' ? (
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                            <Avatar sx={{ width: 36, height: 36, bgcolor: theme.palette.primary.main }}>
                              {message.avatar}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
                                {message.content}
                              </Typography>
                              {message.hasTransformedText && message.transformedText && (
                                <Box sx={{ mt: 2 }}>
                                  <Box sx={{ 
                                    border: `2px solid ${theme.palette.primary.light}`,
                                    borderRadius: 2,
                                    p: 2,
                                    bgcolor: theme.palette.background.default,
                                    fontFamily: 'monospace',
                                    fontSize: '0.875rem',
                                    whiteSpace: 'pre-line'
                                  }}>
                                    {message.transformedText}
                                  </Box>
                                  {index > 0 && (
                                    <Box sx={{ 
                                      display: 'flex', 
                                      justifyContent: 'space-between', 
                                      alignItems: 'center',
                                      mt: 2 
                                    }}>
                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                          ¿Te gusta?
                                        </Typography>
                                        <IconButton 
                                          size="small"
                                          onClick={() => handleFeedback(message.id, true)}
                                          color={message.feedback?.liked === true ? 'primary' : 'default'}
                                        >
                                          <IconThumbUp size={16} />
                                        </IconButton>
                                        <IconButton 
                                          size="small"
                                          onClick={() => handleFeedback(message.id, false)}
                                          color={message.feedback?.liked === false ? 'error' : 'default'}
                                        >
                                          <IconThumbDown size={16} />
                                        </IconButton>
                                      </Box>
                                      <Button 
                                        variant="contained" 
                                        size="small"
                                        onClick={() => handleUseText(message.id)}
                                        sx={{ fontWeight: 600 }}
                                      >
                                        Usar texto
                                      </Button>
                                    </Box>
                                  )}
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2, justifyContent: 'flex-end' }}>
                          <Box sx={{ 
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            p: 2,
                            borderRadius: 2,
                            maxWidth: '70%'
                          }}>
                            <Typography variant="body1">
                              {message.content}
                            </Typography>
                          </Box>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: theme.palette.grey[500] }}>
                            {message.avatar}
                          </Avatar>
                        </Box>
                      )}
                    </Box>
                  ))}
                  
                  {/* Bot Writing Indicator en chat */}
                  {!isGeneratorMode && processing && processing !== 'reset' && (
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: theme.palette.primary.main }}>
                          🤖
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ 
                            bgcolor: theme.palette.grey[100],
                            borderRadius: 2,
                            p: 2,
                            maxWidth: '70%'
                          }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                              El asistente está trabajando en tu solicitud...
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                              <Box 
                                sx={{ 
                                  width: 4, 
                                  height: 4, 
                                  borderRadius: '50%', 
                                  bgcolor: theme.palette.primary.main,
                                  animation: 'bounce 1.4s infinite ease-in-out'
                                }} 
                              />
                              <Box 
                                sx={{ 
                                  width: 4, 
                                  height: 4, 
                                  borderRadius: '50%', 
                                  bgcolor: theme.palette.primary.main,
                                  animation: 'bounce 1.4s infinite ease-in-out 0.2s'
                                }} 
                              />
                              <Box 
                                sx={{ 
                                  width: 4, 
                                  height: 4, 
                                  borderRadius: '50%', 
                                  bgcolor: theme.palette.primary.main,
                                  animation: 'bounce 1.4s infinite ease-in-out 0.4s'
                                }} 
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Right Column - Panel de herramientas */}
              <Box sx={{ 
                width: 300, 
                display: 'flex', 
                flexDirection: 'column',
                bgcolor: theme.palette.background.default 
              }}>
                {/* Ilustración del bot */}
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 3,
                  borderBottom: `1px solid ${theme.palette.divider}`
                }}>
                  <Box sx={{ 
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <Box sx={{ 
                      fontSize: '40px',
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
                    }}>
                      🤖
                    </Box>
                    <Box sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      fontSize: '12px',
                      animation: 'sparkle 2s infinite'
                    }}>
                      ✨
                    </Box>
                  </Box>
                </Box>
                
                {/* Herramientas de modificación */}
                <Box sx={{ 
                  flex: 1,
                  p: 2,
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: 6,
                  },
                  '&::-webkit-scrollbar-track': {
                    background: theme.palette.action.hover,
                    borderRadius: 3,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: theme.palette.primary.main,
                    borderRadius: 3,
                    '&:hover': {
                      background: theme.palette.primary.dark,
                    }
                  },
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {aiOptions.map((option) => (
                      <Button
                        key={option.id}
                        variant="outlined"
                        fullWidth
                        onClick={(event) => {
                          if (option.id === 'reset_assistant') {
                            handleReset();
                          } else {
                            handleOptionClick(option.id, event);
                          }
                        }}
                        disabled={!!processing || isLoading}
                        sx={{
                          justifyContent: 'flex-start',
                          py: 1.5,
                          px: 2,
                          textTransform: 'none',
                          fontWeight: 400,
                          borderRadius: 1.5,
                          bgcolor: 'white',
                          border: `1px solid ${theme.palette.grey[300]}`,
                          color: theme.palette.text.primary,
                          '&:hover': {
                            bgcolor: theme.palette.grey[50],
                            borderColor: theme.palette.grey[400],
                          },
                          ...(option.isHighlighted && {
                            bgcolor: '#fff3cd',
                            borderColor: '#ffeaa7',
                            '&:hover': {
                              bgcolor: '#ffeaa7',
                            }
                          }),
                          ...(processing === option.id && {
                            bgcolor: theme.palette.action.selected,
                            opacity: 0.7,
                          })
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                            <option.icon size={18} />
                          </Box>
                          <Typography variant="body2" sx={{ textAlign: 'left', fontSize: '0.875rem' }}>
                            {option.title}
                          </Typography>
                        </Box>
                        {option.hasSubmenu && (
                          <IconChevronRight size={14} color={theme.palette.grey[500]} />
                        )}
                        {/* Solo mostrar un indicador sutil, no spinner */}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>

      <style>
        {`
          @keyframes sparkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.2); }
          }
          
          @keyframes bounce {
            0%, 80%, 100% { 
              transform: scale(0.8);
              opacity: 0.5;
            }
            40% { 
              transform: scale(1.2);
              opacity: 1;
            }
          }
        `}
      </style>

      {/* Submenú desplegable */}
      <Menu
        anchorEl={submenuAnchorEl}
        open={!!submenuOpen}
        onClose={handleSubmenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            minWidth: 200,
            maxWidth: 300,
          }
        }}
      >
        {submenuOpen && SUBMENU_OPTIONS[submenuOpen as keyof typeof SUBMENU_OPTIONS]?.map((option) => (
          <MenuItem 
            key={option.value}
            onClick={() => handleSubmenuClick(submenuOpen, option.value)}
            sx={{ py: 1, px: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <span style={{ fontSize: '16px' }}>
                {option.label.split(' ')[0]} {/* Extraer emoji si existe */}
              </span>
            </ListItemIcon>
            <ListItemText 
              primary={option.label.includes(' ') ? option.label.split(' ').slice(1).join(' ') : option.label}
              sx={{ fontSize: '0.875rem' }}
            />
          </MenuItem>
        ))}
      </Menu>
    </Dialog>
  );
};

// Componente principal que envuelve con el provider
export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ open, ...props }) => {
  // Solo renderizar el contenido cuando el modal esté abierto
  if (!open) {
    return null;
  }

  return (
    <AIChatProvider>
      <AiAssistantModalContent open={open} {...props} />
    </AIChatProvider>
  );
};