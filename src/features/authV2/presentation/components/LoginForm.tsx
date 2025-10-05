"use client";
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Typography, 
  InputAdornment, 
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Mail, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { FormField } from './FormField';
import { useLoginForm } from '../hooks/useLoginForm';
import type { LoginError } from '../types/loginTypes';

interface LoginFormProps {
  readonly onSuccess?: (credentials: { email: string; password: string }) => Promise<void>;
  readonly onError?: (error: LoginError) => void;
}


const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useLoginForm({ onSuccess, onError });
  const { control, handleSubmit, watch, formState: { isSubmitting } } = form;
  
  const rememberDevice = watch('rememberDevice');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const passwordEndAdornment = (
    <InputAdornment position="end">
      <IconButton
        onClick={togglePasswordVisibility}
        edge="end"
        sx={{
          color: theme.palette.text.disabled,
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
          }
        }}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormField
        name="email"
        control={control}
        label="Correo electrónico"
        placeholder="tu-email@empresa.com"
        type="email"
        icon={<Mail />}
      />

      <FormField
        name="password"
        control={control}
        label="Contraseña"
        placeholder="Tu contraseña segura"
        type={showPassword ? 'text' : 'password'}
        icon={<Lock />}
        InputProps={{ endAdornment: passwordEndAdornment }}
      />

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 5,
        flexWrap: 'wrap',
        gap: 2,
      }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberDevice}
              {...form.register('rememberDevice')}
              sx={{
                padding: '12px',
                color: theme.palette.text.disabled,
                '&.Mui-checked': {
                  color: theme.palette.primary.main,
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            />
          }
          label={
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                color: theme.palette.text.secondary,
                fontFamily: '"Inter", system-ui, sans-serif',
                userSelect: 'none',
                cursor: 'pointer',
              }}
            >
              Recordar dispositivo
            </Typography>
          }
          sx={{
            margin: 0,
            '& .MuiFormControlLabel-label': {
              paddingLeft: '8px',
            }
          }}
        />

        <Typography
          component="button"
          type="button"
          sx={{
            background: 'none',
            border: 'none',
            color: theme.palette.text.disabled,
            fontSize: '12px',
            fontWeight: 400,
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            fontFamily: '"Inter", system-ui, sans-serif',
            padding: '4px 8px',
            borderRadius: '6px',
            
            '&:hover': {
              color: theme.palette.text.secondary,
              backgroundColor: theme.palette.action.hover,
            }
          }}
          onClick={() => console.log('Forgot password clicked')}
        >
          ¿Olvidaste tu contraseña?
        </Typography>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isSubmitting}
        sx={{
          py: 2.5,
          borderRadius: '14px',
          backgroundColor: theme.palette.primary.main,
          boxShadow: `0 6px 20px ${theme.palette.primary.main}66`,
          fontSize: '16px',
          fontWeight: 700,
          fontFamily: '"Inter", system-ui, sans-serif',
          textTransform: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          color: theme.palette.primary.contrastText,
          '&:hover': !isSubmitting ? {
            backgroundColor: theme.palette.primary.dark,
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 25px ${theme.palette.primary.main}80`,
          } : {},
          '&:active': !isSubmitting ? { transform: 'translateY(0)' } : {},
          '&:disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
            color: theme.palette.action.disabled,
            transform: 'none',
            boxShadow: 'none',
          }
        }}
      >
        {isSubmitting ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                border: `2px solid ${theme.palette.action.disabled}`,
                borderTop: `2px solid ${theme.palette.primary.contrastText}`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            />
            Verificando acceso...
          </Box>
        ) : (
          'Iniciar Sesión'
        )}
      </Button>
    </Box>
  );
};

export default LoginForm;
