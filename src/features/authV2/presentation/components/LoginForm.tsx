"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Typography, 
  InputAdornment, 
  IconButton,
  keyframes,
  type Theme
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Mail, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useLogin } from '../hooks/useAuth';

interface LoginFormData {
  readonly email: string;
  readonly password: string;
  readonly rememberDevice: boolean;
}

interface LoginFormErrors {
  readonly email?: string;
  readonly password?: string;
}

interface LoginFormProps {
  readonly onSuccess?: (credentials: { email: string; password: string }) => Promise<void>;
  readonly onError?: (error: LoginFormErrors) => void;
}

type FocusableField = keyof Pick<LoginFormData, 'email' | 'password'> | null;


const FORM_CONFIG = {
  FIELD_SPACING: 4,
  LABEL_SPACING: 2.5,
  BUTTON_HEIGHT: 2.5,
  ANIMATION_DURATION: '0.3s',
  BORDER_RADIUS: '14px',
  INPUT_PADDING: '16px 18px',
} as const;

const TYPOGRAPHY_CONFIG = {
  LABEL: { fontSize: '15px', fontWeight: 700 },
  INPUT: { fontSize: '16px', fontWeight: 600 },
  PLACEHOLDER: { fontWeight: 400 },
  HELPER: { fontSize: '13px', fontWeight: 500 },
  CHECKBOX: { fontSize: '14px', fontWeight: 600 },
  FORGOT: { fontSize: '12px', fontWeight: 400 },
  BUTTON: { fontSize: '16px', fontWeight: 700 },
} as const;

const createAnimations = (theme: Theme) => ({
  focusGlow: keyframes`
    0% { box-shadow: 0 0 0 0 ${theme.palette.primary.light}00; }
    50% { box-shadow: 0 0 0 4px ${theme.palette.primary.light}1A; }
    100% { box-shadow: 0 0 0 0 ${theme.palette.primary.light}00; }
  `,
  
  successPulse: keyframes`
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
  `,
  
  spin: keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `,
});



class FormValidator {
  static validateEmail(email: string): string | undefined {
    if (!email.trim()) return 'Email requerido';
    if (!this.isValidEmailFormat(email)) return 'Formato de email inválido';
    return undefined;
  }
  
  static validatePassword(password: string): string | undefined {
    if (!password.trim()) return 'Contraseña requerida';
    if (password.length < 6) return 'Contraseña debe tener al menos 6 caracteres';
    return undefined;
  }
  
  static validateForm(formData: LoginFormData): LoginFormErrors {
    return {
      email: this.validateEmail(formData.email),
      password: this.validatePassword(formData.password),
    };
  }
  
  private static isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// ============================================================================
// CUSTOM HOOKS (Separation of Concerns)
// ============================================================================

const useLoginForm = (onSuccess?: (credentials: { email: string; password: string }) => Promise<void>, onError?: (error: LoginFormErrors) => void) => {
  const { login, isLoading } = useLogin();
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberDevice: false
  });
  
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<FocusableField>(null);
  
  const updateField = useCallback(<K extends keyof LoginFormData>(
    field: K, 
    value: LoginFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof LoginFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);
  
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);
  
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = FormValidator.validateForm(formData);
    const hasErrors = Object.values(validationErrors).some(error => error !== undefined);
    
    if (hasErrors) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      onError?.(validationErrors);
      return;
    }
    
    try {
      const credentials = {
        email: formData.email.trim(),
        password: formData.password
      };
      
      await onSuccess?.(credentials);
      
    } catch (error: any) {
      console.error('Error durante el login:', error);
      
      let errorMessage = 'Error desconocido';
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      const isCredentialsError = errorMessage.toLowerCase().includes('credencial') || 
                                 errorMessage.toLowerCase().includes('usuario') ||
                                 errorMessage.toLowerCase().includes('contraseña') ||
                                 errorMessage.toLowerCase().includes('password') ||
                                 errorMessage.toLowerCase().includes('email') ||
                                 error?.response?.status === 401;
      
      const errorObj: LoginFormErrors = isCredentialsError 
        ? { email: 'Credenciales inválidas. Verifique su email y contraseña.' }
        : { email: `Error del servidor: ${errorMessage}` };
      
      setErrors(errorObj);
      onError?.(errorObj);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSuccess, onError]);
  
  return {
    formData,
    errors,
    isSubmitting: isSubmitting || isLoading, // Considerar también el loading del auth state
    showPassword,
    focusedField,
    updateField,
    togglePasswordVisibility,
    handleSubmit,
    setFocusedField,
  };
};

// ============================================================================
// STYLE GENERATORS (Interface Segregation Principle)
// ============================================================================



// ============================================================================
// UI COMPONENTS (Single Responsibility Principle)
// ============================================================================

interface FormFieldProps {
  label: string;
  placeholder: string;
  type: 'email' | 'password' | 'text';
  value: string;
  error?: string;
  focused: boolean;
  showPassword?: boolean;
  icon: React.ReactNode;
  endAdornment?: React.ReactNode;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  type,
  value,
  error,
  focused,
  showPassword,
  icon,
  endAdornment,
  onChange,
  onFocus,
  onBlur,
}) => {
  const theme = useTheme();
  const animations = useMemo(() => createAnimations(theme), [theme]);
  
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  
  return (
    <Box sx={{ mb: FORM_CONFIG.FIELD_SPACING }}>
      <Typography
        component="label"
        sx={{
          display: 'block',
          mb: FORM_CONFIG.LABEL_SPACING,
          color: focused ? theme.palette.primary.main : theme.palette.text.secondary,
          fontSize: TYPOGRAPHY_CONFIG.LABEL.fontSize,
          fontWeight: TYPOGRAPHY_CONFIG.LABEL.fontWeight,
          fontFamily: '"Inter", system-ui, sans-serif',
          letterSpacing: '-0.01em',
          transition: 'color 0.2s ease',
        }}
      >
        {label}
      </Typography>
      
      <TextField
        fullWidth
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {React.cloneElement(icon as React.ReactElement, {
                sx: {
                  color: error 
                    ? theme.palette.error.main
                    : focused
                      ? theme.palette.primary.main
                      : theme.palette.text.disabled,
                  fontSize: '22px',
                  transition: 'color 0.2s ease',
                }
              })}
            </InputAdornment>
          ),
          endAdornment,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: FORM_CONFIG.BORDER_RADIUS,
            transition: `all ${FORM_CONFIG.ANIMATION_DURATION} cubic-bezier(0.4, 0, 0.2, 1)`,
            backgroundColor: theme.palette.background.paper,
            '& fieldset': {
              borderColor: theme.palette.divider,
              borderWidth: '2px',
              transition: 'all 0.2s ease',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.text.secondary,
              animation: `${animations.focusGlow} 0.6s ease-out`,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
              borderWidth: '2px',
              boxShadow: `0 0 0 4px ${theme.palette.primary.main}1A`,
            },
            '&.Mui-error fieldset': {
              borderColor: theme.palette.error.main,
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: FORM_CONFIG.INPUT_PADDING,
            color: theme.palette.text.primary,
            fontSize: TYPOGRAPHY_CONFIG.INPUT.fontSize,
            fontWeight: TYPOGRAPHY_CONFIG.INPUT.fontWeight,
            fontFamily: '"Inter", system-ui, sans-serif',
            '&::placeholder': {
              color: theme.palette.text.disabled,
              opacity: 1,
              fontWeight: TYPOGRAPHY_CONFIG.PLACEHOLDER.fontWeight,
            },
          },
          '& .MuiFormHelperText-root': {
            fontSize: TYPOGRAPHY_CONFIG.HELPER.fontSize,
            fontWeight: TYPOGRAPHY_CONFIG.HELPER.fontWeight,
            marginTop: '8px',
            marginLeft: '4px',
          }
        }}
      />
    </Box>
  );
};

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 16 }) => {
  const theme = useTheme();
  const animations = useMemo(() => createAnimations(theme), [theme]);
  
  return (
    <Box
      sx={{
        width: size,
        height: size,
        border: `2px solid ${theme.palette.action.disabled}`,
        borderTop: `2px solid ${theme.palette.primary.contrastText}`,
        borderRadius: '50%',
        animation: `${animations.spin} 1s linear infinite`,
      }}
    />
  );
};

// ============================================================================
// MAIN COMPONENT (Interface Segregation Principle)
// ============================================================================

const OptimizedLoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const theme = useTheme();
  const animations = useMemo(() => createAnimations(theme), [theme]);
  
  const {
    formData,
    errors,
    isSubmitting,
    showPassword,
    focusedField,
    updateField,
    togglePasswordVisibility,
    handleSubmit,
    setFocusedField,
  } = useLoginForm(onSuccess, onError);

  const passwordEndAdornment = useMemo(() => (
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
  ), [showPassword, togglePasswordVisibility, theme]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Email Field */}
      <FormField
        label="Correo electrónico"
        placeholder="tu-email@empresa.com"
        type="email"
        value={formData.email}
        error={errors.email}
        focused={focusedField === 'email'}
        icon={<Mail />}
        onChange={(value) => updateField('email', value)}
        onFocus={() => setFocusedField('email')}
        onBlur={() => setFocusedField(null)}
      />

      {/* Password Field */}
      <FormField
        label="Contraseña"
        placeholder="Tu contraseña segura"
        type="password"
        value={formData.password}
        error={errors.password}
        focused={focusedField === 'password'}
        showPassword={showPassword}
        icon={<Lock />}
        endAdornment={passwordEndAdornment}
        onChange={(value) => updateField('password', value)}
        onFocus={() => setFocusedField('password')}
        onBlur={() => setFocusedField(null)}
      />

      {/* Options Row */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 5,
        flexWrap: 'wrap',
        gap: 2,
      }}>
        {/* Remember Device Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rememberDevice}
              onChange={(e) => updateField('rememberDevice', e.target.checked)}
              sx={{
                padding: '12px',
                color: theme.palette.text.disabled,
                '&.Mui-checked': {
                  color: theme.palette.primary.main,
                  animation: `${animations.successPulse} 0.3s ease-out`,
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
                fontSize: TYPOGRAPHY_CONFIG.CHECKBOX.fontSize,
                fontWeight: TYPOGRAPHY_CONFIG.CHECKBOX.fontWeight,
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

        {/* Forgot Password Link */}
        <Typography
          component="button"
          type="button"
          sx={{
            background: 'none',
            border: 'none',
            color: theme.palette.text.disabled,
            fontSize: TYPOGRAPHY_CONFIG.FORGOT.fontSize,
            fontWeight: TYPOGRAPHY_CONFIG.FORGOT.fontWeight,
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

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isSubmitting}
        sx={{
          py: FORM_CONFIG.BUTTON_HEIGHT,
          borderRadius: FORM_CONFIG.BORDER_RADIUS,
          backgroundColor: theme.palette.primary.main,
          boxShadow: `0 6px 20px ${theme.palette.primary.main}66`,
          fontSize: TYPOGRAPHY_CONFIG.BUTTON.fontSize,
          fontWeight: TYPOGRAPHY_CONFIG.BUTTON.fontWeight,
          fontFamily: '"Inter", system-ui, sans-serif',
          textTransform: 'none',
          transition: `all ${FORM_CONFIG.ANIMATION_DURATION} cubic-bezier(0.4, 0, 0.2, 1)`,
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
            <LoadingSpinner />
            Verificando acceso...
          </Box>
        ) : (
          'Iniciar Sesión'
        )}
      </Button>
    </Box>
  );
};

export default OptimizedLoginForm;
