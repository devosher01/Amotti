"use client";
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  Stack,
  FormHelperText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff, Person, Email, Lock } from '@mui/icons-material';
import { useRegister } from '@/features/authV2/presentation/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '../schemas/registerSchema';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

type RegisterFormProps = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

export const RegisterFormRHF: React.FC<RegisterFormProps> = ({ 
  onSuccess, 
  onError 
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { register: registerUser, isLoading } = useRegister();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    }
  });

  const watchedPassword = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log('🔍 [RegisterForm] Form data:', data);
      
      // Preparar datos para authV2 (sin confirmPassword y acceptTerms)
      const registerData = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      };
      
      console.log('🔍 [RegisterForm] Register data to send:', registerData);
      
      await registerUser(registerData);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error en registro:', error.message || error);
      onError?.(error.message || 'Error al crear la cuenta');
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.95)',
      
      '& fieldset': {
        borderColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(148,163,184,0.4)',
        borderWidth: '1.5px',
      },
      
      '&:hover fieldset': {
        borderColor: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(148,163,184,0.6)',
      },
      
      '&.Mui-focused fieldset': {
        borderColor: isDark ? '#a78bfa' : '#8b5cf6',
        borderWidth: '2px',
        boxShadow: isDark 
          ? '0 0 0 3px rgba(167, 139, 250, 0.12)'
          : '0 0 0 3px rgba(139, 92, 246, 0.12)',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '14px 16px',
      color: isDark ? '#ffffff' : '#1e293b',
      fontSize: '16px',
      fontWeight: 500,
      fontFamily: '"Inter", system-ui, sans-serif',
    }
  };

  const labelStyles = {
    display: 'block',
    mb: 1.2,
    color: isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(30, 41, 59, 0.95)",
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: '"Inter", system-ui, sans-serif',
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          {/* Nombre */}
          <Grid item xs={12} sm={6}>
            <Typography component="label" sx={labelStyles}>
              Nombre *
            </Typography>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Ej: Juan"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ 
                          color: errors.firstName 
                            ? theme.palette.error.main
                            : isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)',
                          fontSize: '18px'
                        }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              )}
            />
          </Grid>
          
          {/* Apellido */}
          <Grid item xs={12} sm={6}>
            <Typography component="label" sx={labelStyles}>
              Apellido *
            </Typography>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Ej: Pérez"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ 
                          color: errors.lastName 
                            ? theme.palette.error.main
                            : isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)',
                          fontSize: '18px'
                        }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              )}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <Typography component="label" sx={labelStyles}>
              Correo electrónico *
            </Typography>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="email"
                  placeholder="juan.perez@gmail.com"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ 
                          color: errors.email 
                            ? theme.palette.error.main
                            : isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)',
                          fontSize: '18px'
                        }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              )}
            />
          </Grid>
        </Grid>
      </Stack>

      {/* Contraseñas */}
      <Stack spacing={2} sx={{ mb: 2.5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography component="label" sx={labelStyles}>
              Contraseña *
            </Typography>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  error={!!errors.password}
                  helperText={errors.password?.message || "8+ caracteres, mayúscula, minúscula, número y símbolo"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ 
                          color: errors.password 
                            ? theme.palette.error.main
                            : isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)',
                          fontSize: '16px'
                        }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              )}
            />
            <PasswordStrengthIndicator 
              password={watchedPassword || ''} 
              show={!!watchedPassword} 
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography component="label" sx={labelStyles}>
              Confirmar contraseña *
            </Typography>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message || "Debe coincidir"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ 
                          color: errors.confirmPassword 
                            ? theme.palette.error.main
                            : isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)',
                          fontSize: '16px'
                        }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          size="small"
                        >
                          {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              )}
            />
          </Grid>
        </Grid>
      </Stack>

      {/* Términos y Botón */}
      <Stack spacing={2}>
        <Box>
          <Controller
            name="acceptTerms"
            control={control}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      size="small"
                      sx={{
                        color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(100,116,139,0.6)',
                        '&.Mui-checked': {
                          color: isDark ? '#a78bfa' : '#8b5cf6',
                        }
                      }}
                    />
                  }
                  label={
                    <Typography sx={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(30, 41, 59, 0.85)"
                    }}>
                      Acepto los{' '}
                      <Typography component="span" sx={{
                        color: isDark ? '#a78bfa' : '#8b5cf6',
                        fontWeight: 600,
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' }
                      }}>
                        términos y condiciones
                      </Typography>
                    </Typography>
                  }
                />
                {errors.acceptTerms && (
                  <FormHelperText error sx={{ ml: 3.5, fontSize: '10px' }}>
                    {errors.acceptTerms.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            py: 1.6,
            borderRadius: '10px',
            background: isLoading
              ? 'rgba(139, 92, 246, 0.6)'
              : 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
            fontSize: '14px',
            fontWeight: 700,
            textTransform: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            
            '&:hover': {
              background: isLoading
                ? 'rgba(139, 92, 246, 0.6)'
                : 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
              transform: isLoading ? 'none' : 'translateY(-1px)',
            }
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