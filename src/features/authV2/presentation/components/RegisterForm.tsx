"use client";
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Typography, 
  InputAdornment, 
  IconButton,
  Grid,
  CircularProgress,
  keyframes,
  Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff, Person, Email, Lock } from '@mui/icons-material';
import { useRegister } from '@/features/authV2/presentation/hooks/useAuth';

const focusGlow = keyframes`
  0% { 
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
  }
  50% { 
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  }
  100% { 
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
  }
`;

const successPulse = keyframes`
  0% { 
    transform: scale(1);
    opacity: 1;
  }
  50% { 
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% { 
    transform: scale(1);
    opacity: 1;
  }
`;

type RegisterFormProps = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

export const OptimizedRegisterForm: React.FC<RegisterFormProps> = ({ 
  onSuccess, 
  onError 
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { register, isLoading } = useRegister();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Nombre requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'Apellido requerido';
    if (!formData.email.trim()) newErrors.email = 'Email requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'Contraseña requerida';
    else if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirmación requerida';
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Debes aceptar los términos';
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      onError?.('Por favor corrige los errores del formulario');
      return;
    }
    
    try {
      // Preparar datos para authV2
      const registerData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };
      
      await register(registerData);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error en registro:', error.message || error);
      onError?.(error.message || 'Error al crear la cuenta');
    }
  };

  // Estilos optimizados para inputs con mejor usabilidad
  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px', // Más redondeado
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      
      backgroundColor: isDark 
        ? 'rgba(255,255,255,0.12)' 
        : 'rgba(255,255,255,0.95)', 
      
      '& fieldset': {
        borderColor: isDark 
          ? 'rgba(255,255,255,0.25)' 
          : 'rgba(148,163,184,0.4)', 
        borderWidth: '1.5px',
        transition: 'all 0.2s ease',
      },
      
      '&:hover fieldset': {
        borderColor: isDark 
          ? 'rgba(255,255,255,0.4)' 
          : 'rgba(148,163,184,0.6)',
        animation: `${focusGlow} 0.6s ease-out`,
      },
      
      '&.Mui-focused fieldset': {
        borderColor: isDark ? '#a78bfa' : '#8b5cf6',
        borderWidth: '2px', // Borde más grueso cuando está enfocado
        boxShadow: isDark 
          ? '0 0 0 3px rgba(167, 139, 250, 0.12)'
          : '0 0 0 3px rgba(139, 92, 246, 0.12)',
      },
      
      '&.Mui-error fieldset': {
        borderColor: theme.palette.error.main,
        backgroundColor: isDark 
          ? 'rgba(239, 68, 68, 0.05)'
          : 'rgba(239, 68, 68, 0.02)',
      },
    },
    
    '& .MuiOutlinedInput-input': {
      padding: '14px 16px', // Más padding para mejor usabilidad
      color: isDark ? '#ffffff' : '#1e293b',
      fontSize: '16px', // Tamaño estándar para mejor legibilidad
      fontWeight: 500, // Menos pesado
      fontFamily: '"Inter", system-ui, sans-serif',
      
      '&::placeholder': {
        color: isDark 
          ? 'rgba(255,255,255,0.7)' 
          : 'rgba(100,116,139,0.8)', 
        opacity: 1,
        fontWeight: 400,
      },
    },
    
    '& .MuiFormHelperText-root': {
      fontSize: '13px', // Más grande para mejor legibilidad
      fontWeight: 500,
      marginTop: '6px',
      marginLeft: '4px',
    }
  };

  // Labels con mejor tamaño
  const labelStyles = {
    display: 'block',
    mb: 1.2, // Más espacio
    color: isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(30, 41, 59, 0.95)",
    fontSize: '14px', // Más grande
    fontWeight: 600, 
    fontFamily: '"Inter", system-ui, sans-serif',
    letterSpacing: '-0.01em',
    transition: 'color 0.2s ease',
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* SECCIÓN 1: DATOS PERSONALES */}
      <Stack spacing={3} sx={{ mb: 3 }}> 
        
        {/* GRID UNIFICADO: Todos los campos personales */}
        <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}> 
          <Grid item xs={12} sm={6}>
            <Typography 
              component="label"
              sx={{
                ...labelStyles,
                ...(focusedField === 'firstName' && {
                  color: isDark ? '#a78bfa' : '#8b5cf6',
                })
              }}
            >
              Nombre *
            </Typography>
            <TextField
              fullWidth
              placeholder="Ej: Pedrito"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              onFocus={() => setFocusedField('firstName')}
              onBlur={() => setFocusedField(null)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person 
                      sx={{ 
                        color: errors.firstName 
                          ? theme.palette.error.main
                          : focusedField === 'firstName'
                            ? (isDark ? '#a78bfa' : '#8b5cf6')
                            : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)'),
                        fontSize: '18px',
                        transition: 'color 0.2s ease',
                      }} 
                    />
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography 
              component="label"
              sx={{
                ...labelStyles,
                ...(focusedField === 'lastName' && {
                  color: isDark ? '#a78bfa' : '#8b5cf6',
                })
              }}
            >
              Apellido *
            </Typography>
            <TextField
              fullWidth
              placeholder="Ej: González"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              onFocus={() => setFocusedField('lastName')}
              onBlur={() => setFocusedField(null)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person 
                      sx={{ 
                        color: errors.lastName 
                          ? theme.palette.error.main
                          : focusedField === 'lastName'
                            ? (isDark ? '#a78bfa' : '#8b5cf6')
                            : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)'),
                        fontSize: '18px',
                        transition: 'color 0.2s ease',
                      }} 
                    />
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />
          </Grid>

          {/* EMAIL - Ahora dentro del Grid para alineación perfecta */}
          <Grid item xs={12}>
            <Typography 
              component="label"
              sx={{
                ...labelStyles,
                ...(focusedField === 'email' && {
                  color: isDark ? '#a78bfa' : '#8b5cf6',
                })
              }}
            >
              Correo electrónico *
            </Typography>
            <TextField
              fullWidth
              type="email"
              placeholder="pedrito.gonzalez@gmail.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email 
                      sx={{ 
                        color: errors.email 
                          ? theme.palette.error.main
                          : focusedField === 'email'
                            ? (isDark ? '#a78bfa' : '#8b5cf6')
                            : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)'),
                        fontSize: '18px',
                        transition: 'color 0.2s ease',
                      }} 
                    />
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />
          </Grid>
        </Grid>
      </Stack>

      {/* SECCIÓN 2: CONTRASEÑAS - MÁS COMPACTO */}
      <Stack spacing={2} sx={{ mb: 2.5 }}> 
        <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Grid item xs={12} sm={6}>
            <Typography 
              component="label"
              sx={{
                ...labelStyles,
                ...(focusedField === 'password' && {
                  color: isDark ? '#a78bfa' : '#8b5cf6',
                })
              }}
            >
              Contraseña *
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              error={!!errors.password}
              helperText={errors.password || "Mínimo 8 caracteres"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock 
                      sx={{ 
                        color: errors.password 
                          ? theme.palette.error.main
                          : focusedField === 'password'
                            ? (isDark ? '#a78bfa' : '#8b5cf6')
                            : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)'),
                        fontSize: '16px', // Íconos más pequeños
                        transition: 'color 0.2s ease',
                      }} 
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small" // Botón más pequeño
                      sx={{
                        color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)',
                        '&:hover': {
                          color: isDark ? '#a78bfa' : '#8b5cf6',
                          backgroundColor: 'transparent',
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography 
              component="label"
              sx={{
                ...labelStyles,
                ...(focusedField === 'confirmPassword' && {
                  color: isDark ? '#a78bfa' : '#8b5cf6',
                })
              }}
            >
              Confirmar contraseña *
            </Typography>
            <TextField
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField(null)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword || "Debe coincidir con la contraseña"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock 
                      sx={{ 
                        color: errors.confirmPassword 
                          ? theme.palette.error.main
                          : focusedField === 'confirmPassword'
                            ? (isDark ? '#a78bfa' : '#8b5cf6')
                            : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)'),
                        fontSize: '16px', // Íconos más pequeños
                        transition: 'color 0.2s ease',
                      }} 
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="small" // Botón más pequeño
                      sx={{
                        color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)',
                        '&:hover': {
                          color: isDark ? '#a78bfa' : '#8b5cf6',
                          backgroundColor: 'transparent',
                        }
                      }}
                    >
                      {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />
          </Grid>
        </Grid>
        
        {/* Indicadores de seguridad SIMPLIFICADOS y MÁS PEQUEÑOS */}
        <Box sx={{ 
          p: 1.5, // Menos padding
          borderRadius: "8px", // Menos redondeado
          background: isDark 
            ? "rgba(16, 185, 129, 0.06)" 
            : "rgba(16, 185, 129, 0.04)",
          border: isDark 
            ? "1px solid rgba(16, 185, 129, 0.15)" 
            : "1px solid rgba(16, 185, 129, 0.12)",
          textAlign: "center",
        }}>
          <Typography 
            sx={{ 
              fontSize: "10px", // Mucho más pequeño
              fontWeight: 500, 
              color: isDark ? "rgba(16, 185, 129, 0.8)" : "rgba(16, 120, 95, 0.8)",
              fontFamily: '"Inter", system-ui, sans-serif',
              lineHeight: 1.3,
            }}
          >
            🔒 Información protegida con encriptación SSL y validación en tiempo real
          </Typography>
        </Box>
      </Stack>

      {/* SECCIÓN 3: TÉRMINOS Y BOTÓN - MÁS COMPACTO */}
      <Stack spacing={2}> {/* Menos spacing */}
        {/* CHECKBOX TÉRMINOS - MÁS COMPACTO */}
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.acceptTerms}
                onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                size="small" // Checkbox más pequeño
                sx={{
                  color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)',
                  '&.Mui-checked': {
                    color: isDark ? '#a78bfa' : '#8b5cf6',
                    animation: `${successPulse} 0.3s ease-out`,
                  },
                  p: 1, // Menos padding
                  '&:hover': {
                    backgroundColor: isDark 
                      ? 'rgba(167, 139, 250, 0.1)' 
                      : 'rgba(139, 92, 246, 0.1)',
                  }
                }}
              />
            }
            label={
              <Typography
                sx={{
                  fontSize: '12px', // Más pequeño
                  fontWeight: 600, 
                  color: isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(30, 41, 59, 0.85)",
                  fontFamily: '"Inter", system-ui, sans-serif',
                  lineHeight: 1.4,
                  userSelect: 'none',
                  cursor: 'pointer',
                }}
              >
                Acepto los{' '}
                <Typography
                  component="span"
                  sx={{
                    color: isDark ? '#a78bfa' : '#8b5cf6',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  términos y condiciones
                </Typography>
              </Typography>
            }
            sx={{
              margin: 0,
              '& .MuiFormControlLabel-label': {
                paddingLeft: '4px', // Menos padding
              }
            }}
          />
          {errors.acceptTerms && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.error.main,
                display: 'block',
                mt: 0.5,
                ml: 3.5,
                fontSize: '10px', // Más pequeño
                fontWeight: 500,
              }}
            >
              {errors.acceptTerms}
            </Typography>
          )}
        </Box>

        {/* BOTÓN MÁS COMPACTO */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            py: 1.6, // Menos altura
            borderRadius: '10px', // Menos redondeado
            background: isLoading
              ? isDark ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.6)'
              : 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
            boxShadow: isLoading 
              ? 'none'
              : '0 4px 12px rgba(139, 92, 246, 0.3)', // Menos sombra
            fontSize: '14px', // Más pequeño
            fontWeight: 700, 
            fontFamily: '"Inter", system-ui, sans-serif',
            textTransform: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            
            '&:hover': {
              background: isLoading
                ? isDark ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.6)'
                : 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
              transform: isLoading ? 'none' : 'translateY(-1px)', // Menos movimiento
              boxShadow: isLoading 
                ? 'none'
                : '0 6px 16px rgba(139, 92, 246, 0.4)',
            },
            
            '&:active': {
              transform: isLoading ? 'none' : 'translateY(0)',
            },
            
            '&:disabled': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          }}
        >
          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} sx={{ color: 'white' }} />
              <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>
                Creando cuenta...
              </Typography>
            </Box>
          ) : (
            'Crear mi cuenta'
          )}
        </Button>
      </Stack>
    </Box>
  );
};