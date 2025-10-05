import React from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  InputAdornment,
  type TextFieldProps 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useController } from 'react-hook-form';
import type { FormFieldProps } from '../types/formTypes';

export const FormField = ({
  name,
  control,
  label,
  icon,
  type = 'text',
  placeholder,
  InputProps,
  ...textFieldProps
}: FormFieldProps & Omit<TextFieldProps, 'name' | 'value' | 'onChange'>) => {
  const theme = useTheme();
  const {
    field,
    fieldState: { error, isTouched }
  } = useController({ name, control });

  const hasError = !!error && isTouched;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        component="label"
        sx={{
          display: 'block',
          mb: 2.5,
          color: hasError ? theme.palette.error.main : theme.palette.text.secondary,
          fontSize: '15px',
          fontWeight: 700,
          fontFamily: '"Inter", system-ui, sans-serif',
          letterSpacing: '-0.01em',
          transition: 'color 0.2s ease',
        }}
      >
        {label}
      </Typography>
      
      <TextField
        {...field}
        {...textFieldProps}
        fullWidth
        type={type}
        placeholder={placeholder}
        error={hasError}
        helperText={error?.message}
        InputProps={{
          ...InputProps,
          startAdornment: icon && (
            <InputAdornment position="start">
              {React.cloneElement(icon as React.ReactElement, {
                sx: {
                  color: hasError 
                    ? theme.palette.error.main
                    : theme.palette.text.disabled,
                  fontSize: '22px',
                  transition: 'color 0.2s ease',
                }
              })}
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '14px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: theme.palette.background.paper,
            '& fieldset': {
              borderColor: theme.palette.divider,
              borderWidth: '2px',
              transition: 'all 0.2s ease',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.text.secondary,
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
            padding: '16px 18px',
            color: theme.palette.text.primary,
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: '"Inter", system-ui, sans-serif',
            '&::placeholder': {
              color: theme.palette.text.disabled,
              opacity: 1,
              fontWeight: 400,
            },
          },
          '& .MuiFormHelperText-root': {
            fontSize: '13px',
            fontWeight: 500,
            marginTop: '8px',
            marginLeft: '4px',
          }
        }}
      />
    </Box>
  );
};