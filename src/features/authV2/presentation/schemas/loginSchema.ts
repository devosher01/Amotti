import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email requerido')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Formato de email inválido'),
  password: z
    .string()
    .min(1, 'Contraseña requerida')
    .min(6, 'Contraseña debe tener al menos 6 caracteres'),
  rememberDevice: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;