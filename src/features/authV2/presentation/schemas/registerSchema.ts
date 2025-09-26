import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Nombre requerido')
    .min(2, 'Mínimo 2 caracteres'),
  
  lastName: z
    .string()
    .min(1, 'Apellido requerido')
    .min(2, 'Mínimo 2 caracteres'),
  
  email: z
    .string()
    .min(1, 'Email requerido')
    .regex(/\S+@\S+\.\S+/, 'Email inválido'),
  
  password: z
    .string()
    .min(1, 'Contraseña requerida')
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial (!@#$%^&*)'),
  
  confirmPassword: z
    .string()
    .min(1, 'Confirmación requerida'),
  
  acceptTerms: z
    .boolean()
    .refine(val => val === true, 'Debes aceptar los términos')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
});

export type RegisterFormData = z.infer<typeof registerSchema>;