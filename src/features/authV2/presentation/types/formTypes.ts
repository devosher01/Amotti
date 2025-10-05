import type { Control } from 'react-hook-form';
import type { LoginFormData } from '../schemas/loginSchema';

export interface LoginFormErrors {
  readonly email?: string;
  readonly password?: string;
}

export interface FormFieldProps {
  readonly name: keyof LoginFormData;
  readonly control: Control<LoginFormData>;
  readonly label: string;
  readonly icon?: React.ReactNode;
  readonly type?: string;
  readonly placeholder?: string;
  readonly InputProps?: Record<string, unknown>;
}