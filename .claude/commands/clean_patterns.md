# Clean Architecture Frontend - Guía de Implementación Completa

## Tabla de Contenidos
1. [Preparación del Proyecto](#preparación-del-proyecto)
2. [Estructura de Directorios](#estructura-de-directorios)
3. [Capa de Dominio](#capa-de-dominio)
4. [Shared Kernel](#shared-kernel)
5. [Capa de Aplicación](#capa-de-aplicación)
6. [Capa de Adaptadores](#capa-de-adaptadores)
7. [Integración con UI](#integración-con-ui)
8. [Testing](#testing)
9. [Mejoras Avanzadas](#mejoras-avanzadas)
10. [Validación y Refactoring](#validación-y-refactoring)

---

## Preparación del Proyecto

### 1.1 Mentalidad y Principios Fundamentales

**COMANDO CRÍTICO**: Antes de escribir cualquier código, interioriza estos principios:

```
REGLA DE ORO: Las capas externas dependen de las internas, NUNCA al revés
- Domain Layer: Completamente independiente
- Application Layer: Solo puede depender del Domain
- Adapters Layer: Puede depender de cualquier cosa
```

### 1.2 Análisis del Dominio

**PASO 1**: Identifica las entidades principales del dominio
```bash
# Pregúntate:
# - ¿Cuáles son las entidades principales de mi aplicación?
# - ¿Qué transformaciones ocurren con estos datos?
# - ¿Qué reglas de negocio existen?
# - ¿Qué NO cambiaría si migro de React a Vue?
```

**PASO 2**: Documenta los casos de uso principales
```bash
# Para cada caso de uso pregúntate:
# - ¿Quién es el actor?
# - ¿Qué acción realiza?
# - ¿Cuál es el resultado esperado?
# - ¿Qué servicios externos se necesitan?
```

---

## Estructura de Directorios

### 2.1 Estructura Base Obligatoria

**COMANDO**: Crea esta estructura EXACTA:

```
src/
├── domain/                 # 🔵 CAPA DE DOMINIO
│   ├── entities/
│   ├── types/
│   └── transformations/
├── application/            # 🟡 CAPA DE APLICACIÓN
│   ├── use-cases/
│   ├── ports/
│   └── hooks/
├── infrastructure/         # 🟠 CAPA DE ADAPTADORES
│   ├── api/
│   ├── storage/
│   ├── services/
│   └── adapters/
├── presentation/           # 🔴 CAPA DE UI
│   ├── components/
│   ├── pages/
│   └── hooks/
├── shared/                 # ⚪ SHARED KERNEL
│   ├── types/
│   ├── constants/
│   └── utils/
└── lib/                    # 📚 BIBLIOTECAS
```

### 2.2 Reglas de Importación

**COMANDO CRÍTICO**: Configura estas reglas de importación:

```typescript
// ❌ PROHIBIDO - Domain NO puede importar de Application o Infrastructure
// domain/user.ts
import { someFunction } from '../application/...' // ❌ NUNCA

// ❌ PROHIBIDO - Application NO puede importar de Infrastructure
// application/use-case.ts  
import { ApiService } from '../infrastructure/...' // ❌ NUNCA

// ✅ PERMITIDO - Infrastructure puede importar de cualquier lado
// infrastructure/adapter.ts
import { User } from '../domain/entities/user' // ✅ OK
import { UserRepository } from '../application/ports/user-repository' // ✅ OK
```

---

## Capa de Dominio

### 3.1 Definición de Entidades

**PASO 1**: Crea los tipos de entidades principales

```typescript
// domain/entities/user.ts
export type UserId = string;
export type Email = string;

export type User = {
  id: UserId;
  name: string;
  email: Email;
  createdAt: DateTimeString;
  preferences: string[];
  settings: UserSettings;
};

export type UserSettings = {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: 'en' | 'es';
};
```

**COMANDO**: Para cada entidad, pregúntate:
- ¿Tiene toda la información necesaria?
- ¿Puede existir de forma independiente?
- ¿Las relaciones están bien definidas?

### 3.2 Funciones de Transformación

**PASO 2**: Crea funciones PURAS para transformar entidades

```typescript
// domain/transformations/user.ts
import { User, UserSettings } from '../entities/user';

// ✅ Función PURA - solo transforma datos
export function updateUserSettings(
  user: User, 
  newSettings: Partial<UserSettings>
): User {
  return {
    ...user,
    settings: {
      ...user.settings,
      ...newSettings
    }
  };
}

// ✅ Función PURA - solo valida
export function isUserActive(user: User): boolean {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return new Date(user.createdAt) > thirtyDaysAgo;
}

// ✅ Función PURA - solo calcula
export function getUserDisplayName(user: User): string {
  return user.name || user.email.split('@')[0];
}
```

**REGLA ABSOLUTA**: Las funciones de dominio deben ser:
- Puras (sin side effects)
- Deterministas (mismo input = mismo output)
- Sin dependencias externas
- Fáciles de testear

### 3.3 Validaciones de Dominio

**PASO 3**: Implementa validaciones de reglas de negocio

```typescript
// domain/validations/user.ts
export function validateUserEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUserAge(birthDate: DateTimeString): boolean {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  return age >= 13; // Regla de negocio: mínimo 13 años
}
```

---

## Shared Kernel

### 4.1 Types Globales

**COMANDO**: Define tipos que se usan en toda la aplicación:

```typescript
// shared/types/common.ts
export type UniqueId = string;
export type Email = string;
export type DateTimeString = string; // ISO 8601
export type Timestamp = number;
export type Currency = 'USD' | 'EUR' | 'GBP';

export type Money = {
  amount: number; // En centavos/centimos
  currency: Currency;
};

export type ApiResponse<T> = {
  data: T;
  status: 'success' | 'error';
  message?: string;
};
```

### 4.2 Constantes Globales

```typescript
// shared/constants/app.ts
export const APP_CONFIG = {
  MAX_RETRY_ATTEMPTS: 3,
  TIMEOUT_MS: 5000,
  SUPPORTED_LANGUAGES: ['en', 'es', 'fr'] as const,
} as const;

export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_USERNAME_LENGTH: 50,
  ALLOWED_FILE_TYPES: ['jpg', 'png', 'pdf'] as const,
} as const;
```

---

## Capa de Aplicación

### 5.1 Definición de Ports (Interfaces)

**PASO 1**: Define interfaces para servicios externos

```typescript
// application/ports/user-repository.port.ts
import { User, UserId } from '../../domain/entities/user';

export interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  delete(id: UserId): Promise<void>;
  findAll(filters?: UserFilters): Promise<User[]>;
}

export interface UserFilters {
  isActive?: boolean;
  createdAfter?: DateTimeString;
  preferences?: string[];
}
```

**PASO 2**: Define interfaces para servicios externos

```typescript
// application/ports/notification.port.ts
export interface NotificationService {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
  sendPush(userId: string, message: string): Promise<void>;
  sendSMS(phone: string, message: string): Promise<void>;
}

// application/ports/storage.port.ts
export interface StorageService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

### 5.2 Implementación de Use Cases

**COMANDO**: Cada use case debe seguir este patrón EXACTO:

```typescript
// application/use-cases/update-user-profile.use-case.ts
import { User, UserId } from '../../domain/entities/user';
import { updateUserSettings } from '../../domain/transformations/user';
import { UserRepository } from '../ports/user-repository.port';
import { NotificationService } from '../ports/notification.port';

export type UpdateUserProfileCommand = {
  userId: UserId;
  name?: string;
  settings?: Partial<UserSettings>;
};

export type UpdateUserProfileDependencies = {
  userRepository: UserRepository;
  notificationService: NotificationService;
};

// ✅ PATRÓN SANDWICH: Side Effect -> Pure Function -> Side Effect
export async function updateUserProfile(
  command: UpdateUserProfileCommand,
  dependencies: UpdateUserProfileDependencies
): Promise<User> {
  const { userRepository, notificationService } = dependencies;
  
  // 🔴 SIDE EFFECT: Obtener datos
  const existingUser = await userRepository.findById(command.userId);
  if (!existingUser) {
    throw new Error(`User with id ${command.userId} not found`);
  }
  
  // 🟢 PURE FUNCTION: Transformación del dominio
  let updatedUser = existingUser;
  
  if (command.name) {
    updatedUser = { ...updatedUser, name: command.name };
  }
  
  if (command.settings) {
    updatedUser = updateUserSettings(updatedUser, command.settings);
  }
  
  // 🔴 SIDE EFFECT: Persistir datos
  const savedUser = await userRepository.save(updatedUser);
  
  // 🔴 SIDE EFFECT: Notificar
  await notificationService.sendEmail(
    savedUser.email,
    'Profile Updated',
    'Your profile has been successfully updated.'
  );
  
  return savedUser;
}
```

### 5.3 React Hooks para Use Cases

**COMANDO**: Crea hooks que conecten UI con use cases:

```typescript
// application/hooks/use-update-user-profile.ts
import { useMutation, useQueryClient } from 'react-query';
import { updateUserProfile, UpdateUserProfileCommand } from '../use-cases/update-user-profile.use-case';
import { useUserRepository } from '../../infrastructure/repositories/user-repository';
import { useNotificationService } from '../../infrastructure/services/notification-service';

export function useUpdateUserProfile() {
  const userRepository = useUserRepository();
  const notificationService = useNotificationService();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (command: UpdateUserProfileCommand) =>
      updateUserProfile(command, {
        userRepository,
        notificationService,
      }),
    onSuccess: (updatedUser) => {
      // Actualizar cache
      queryClient.invalidateQueries(['user', updatedUser.id]);
      // Notificación local
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
```

---

## Capa de Adaptadores

### 6.1 API Adapters

**COMANDO**: Crea adaptadores para APIs externas:

```typescript
// infrastructure/api/user-api.adapter.ts
import { User, UserId } from '../../domain/entities/user';
import { UserRepository, UserFilters } from '../../application/ports/user-repository.port';

// DTO para la API externa
interface UserApiDto {
  id: string;
  full_name: string; // ⚠️ Diferente naming
  email_address: string; // ⚠️ Diferente naming  
  created_timestamp: number; // ⚠️ Diferente formato
  user_preferences: string[];
}

export class UserApiAdapter implements UserRepository {
  constructor(private apiClient: ApiClient) {}
  
  async findById(id: UserId): Promise<User | null> {
    try {
      const response = await this.apiClient.get<UserApiDto>(`/users/${id}`);
      return this.mapFromDto(response.data);
    } catch (error) {
      if (error.status === 404) return null;
      throw error;
    }
  }
  
  async save(user: User): Promise<User> {
    const dto = this.mapToDto(user);
    const response = await this.apiClient.put<UserApiDto>(`/users/${user.id}`, dto);
    return this.mapFromDto(response.data);
  }
  
  // ✅ Mapeo desde DTO externo a entidad de dominio
  private mapFromDto(dto: UserApiDto): User {
    return {
      id: dto.id,
      name: dto.full_name,
      email: dto.email_address,
      createdAt: new Date(dto.created_timestamp).toISOString(),
      preferences: dto.user_preferences,
      settings: {
        theme: 'light', // Default value
        notifications: true, // Default value
        language: 'en', // Default value
      }
    };
  }
  
  // ✅ Mapeo desde entidad de dominio a DTO externo
  private mapToDto(user: User): UserApiDto {
    return {
      id: user.id,
      full_name: user.name,
      email_address: user.email,
      created_timestamp: new Date(user.createdAt).getTime(),
      user_preferences: user.preferences,
    };
  }
}
```

### 6.2 Storage Adapters

```typescript
// infrastructure/storage/local-storage.adapter.ts
import { StorageService } from '../../application/ports/storage.port';

export class LocalStorageAdapter implements StorageService {
  async get<T>(key: string): Promise<T | null> {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }
  
  async set<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
  
  async clear(): Promise<void> {
    localStorage.clear();
  }
}
```

### 6.3 Service Adapters

```typescript
// infrastructure/services/notification.adapter.ts
import { NotificationService } from '../../application/ports/notification.port';

export class NotificationAdapter implements NotificationService {
  constructor(
    private emailService: EmailService,
    private pushService: PushService,
    private smsService: SMSService
  ) {}
  
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // Adaptamos el API del servicio externo a nuestras necesidades
    await this.emailService.dispatch({
      recipient: to,
      title: subject,
      content: body,
      template: 'default',
    });
  }
  
  async sendPush(userId: string, message: string): Promise<void> {
    await this.pushService.notify({
      user_id: userId,
      message,
      priority: 'normal',
    });
  }
  
  async sendSMS(phone: string, message: string): Promise<void> {
    await this.smsService.send(phone, message);
  }
}
```

---

## Integración con UI

### 7.1 Container Components

**COMANDO**: Separa lógica de presentación:

```typescript
// presentation/containers/UserProfileContainer.tsx
import React from 'react';
import { useQuery } from 'react-query';
import { useUpdateUserProfile } from '../../application/hooks/use-update-user-profile';
import { useUser } from '../hooks/use-user';
import { UserProfileForm } from '../components/UserProfileForm';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface UserProfileContainerProps {
  userId: string;
}

export const UserProfileContainer: React.FC<UserProfileContainerProps> = ({
  userId
}) => {
  // ✅ Container maneja la lógica de estado y side effects
  const { data: user, isLoading } = useUser(userId);
  const updateUserMutation = useUpdateUserProfile();
  
  const handleSubmit = (formData: UserFormData) => {
    updateUserMutation.mutate({
      userId,
      name: formData.name,
      settings: formData.settings,
    });
  };
  
  if (isLoading) return <LoadingSpinner />;
  if (!user) return <div>User not found</div>;
  
  // ✅ Container pasa props simples al componente de presentación
  return (
    <UserProfileForm
      user={user}
      onSubmit={handleSubmit}
      isSubmitting={updateUserMutation.isLoading}
    />
  );
};
```

### 7.2 Presentation Components

```typescript
// presentation/components/UserProfileForm.tsx
import React from 'react';
import { User } from '../../domain/entities/user';

interface UserProfileFormProps {
  user: User;
  onSubmit: (data: UserFormData) => void;
  isSubmitting: boolean;
}

// ✅ Componente PURO - solo presentación
export const UserProfileForm: React.FC<UserProfileFormProps> = ({
  user,
  onSubmit,
  isSubmitting
}) => {
  const [formData, setFormData] = useState({
    name: user.name,
    settings: user.settings,
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ 
          ...prev, 
          name: e.target.value 
        }))}
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};
```

---

## Testing

### 8.1 Testing del Dominio

**COMANDO**: Testea funciones de dominio (las más importantes):

```typescript
// domain/transformations/__tests__/user.test.ts
import { updateUserSettings, isUserActive } from '../user';
import { User } from '../../entities/user';

describe('User Domain Functions', () => {
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: '2023-01-01T00:00:00Z',
    preferences: [],
    settings: {
      theme: 'light',
      notifications: true,
      language: 'en',
    }
  };
  
  describe('updateUserSettings', () => {
    it('should update user settings preserving other data', () => {
      const newSettings = { theme: 'dark' as const };
      const result = updateUserSettings(mockUser, newSettings);
      
      expect(result.settings.theme).toBe('dark');
      expect(result.settings.notifications).toBe(true); // Preservado
      expect(result.name).toBe('John Doe'); // Preservado
    });
  });
  
  describe('isUserActive', () => {
    it('should return true for recent users', () => {
      const recentUser = {
        ...mockUser,
        createdAt: new Date().toISOString()
      };
      
      expect(isUserActive(recentUser)).toBe(true);
    });
  });
});
```

### 8.2 Testing de Use Cases

```typescript
// application/use-cases/__tests__/update-user-profile.test.ts
import { updateUserProfile } from '../update-user-profile.use-case';
import { UserRepository } from '../../ports/user-repository.port';
import { NotificationService } from '../../ports/notification.port';

describe('updateUserProfile Use Case', () => {
  let mockUserRepository: jest.Mocked<UserRepository>;
  let mockNotificationService: jest.Mocked<NotificationService>;
  
  beforeEach(() => {
    mockUserRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    } as any;
    
    mockNotificationService = {
      sendEmail: jest.fn(),
    } as any;
  });
  
  it('should update user profile successfully', async () => {
    const existingUser = { /* ... */ };
    const updatedUser = { /* ... */ };
    
    mockUserRepository.findById.mockResolvedValue(existingUser);
    mockUserRepository.save.mockResolvedValue(updatedUser);
    mockNotificationService.sendEmail.mockResolvedValue();
    
    const result = await updateUserProfile(
      { userId: '1', name: 'New Name' },
      {
        userRepository: mockUserRepository,
        notificationService: mockNotificationService,
      }
    );
    
    expect(mockUserRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'New Name' })
    );
    expect(mockNotificationService.sendEmail).toHaveBeenCalled();
    expect(result).toEqual(updatedUser);
  });
});
```

---

## Mejoras Avanzadas

### 9.1 Branded Types

**COMANDO**: Reemplaza type aliases con branded types:

```typescript
// shared/types/branded.ts
declare const __brand: unique symbol;
type Brand<T, TBrand> = T & { [__brand]: TBrand };

export type UserId = Brand<string, 'UserId'>;
export type Email = Brand<string, 'Email'>;
export type DateTimeString = Brand<string, 'DateTimeString'>;

// Helpers para crear branded types
export const UserId = (value: string): UserId => value as UserId;
export const Email = (value: string): Email => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new Error('Invalid email format');
  }
  return value as Email;
};
```

### 9.2 Feature Slicing

**COMANDO**: Organiza por features en lugar de layers:

```
src/
├── features/
│   ├── user-management/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   └── transformations/
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   └── ports/
│   │   ├── infrastructure/
│   │   │   └── adapters/
│   │   └── presentation/
│   │       ├── components/
│   │       └── containers/
│   ├── order-management/
│   │   └── ... (misma estructura)
│   └── payment-processing/
│       └── ... (misma estructura)
├── shared/
│   ├── domain/
│   ├── infrastructure/
│   └── presentation/
└── app/
```

### 9.3 Dependency Injection

```typescript
// infrastructure/di/container.ts
import { Container } from 'inversify';
import { UserRepository } from '../../application/ports/user-repository.port';
import { UserApiAdapter } from '../api/user-api.adapter';

const container = new Container();

// Bind interfaces to implementations
container.bind<UserRepository>('UserRepository').to(UserApiAdapter);
container.bind<NotificationService>('NotificationService').to(NotificationAdapter);

export { container };

// React hook para DI
export function useContainer() {
  return container;
}
```

---

## Validación y Refactoring

### 10.1 Checklist de Validación

**COMANDO**: Antes de hacer commit, verifica:

#### ✅ Domain Layer Checklist:
- [ ] No imports desde application o infrastructure
- [ ] Todas las funciones son puras
- [ ] Entidades bien tipadas
- [ ] Sin lógica de UI o networking
- [ ] Tests unitarios >90% coverage

#### ✅ Application Layer Checklist:
- [ ] Use cases siguen patrón "sandwich"
- [ ] Ports bien definidos
- [ ] Sin dependencias de infrastructure directas
- [ ] Manejo de errores consistente
- [ ] Tests con mocks de dependencies

#### ✅ Infrastructure Layer Checklist:
- [ ] Adapters implementan ports correctamente
- [ ] Mapeo correcto entre DTOs y entities
- [ ] Manejo de errores de servicios externos
- [ ] Configuración centralizada
- [ ] Tests de integración

#### ✅ Presentation Layer Checklist:
- [ ] Separación container/component
- [ ] Props simples y tipadas
- [ ] Sin lógica de negocio
- [ ] Componentes reutilizables
- [ ] Tests de renderizado

### 10.2 Métricas de Calidad

**COMANDO**: Monitorea estas métricas:

```bash
# Dependencias circulares
npx madge --circular --extensions ts,tsx src/

# Complejidad ciclomática
npx complexity-report --format json src/

# Coverage de tests
npm run test:coverage

# Bundle size
npm run build:analyze
```

### 10.3 Refactoring Signals

**COMANDO**: Refactoriza cuando veas:

- Use cases >100 líneas
- Adaptadores con lógica de negocio
- Entidades de dominio con dependencias
- Componentes de UI con lógica compleja
- Tests que requieren muchos mocks

---

## Comandos de Verificación Final

### Reglas de Oro para Verificar

**COMANDO FINAL**: Antes de cada PR, ejecuta:

```bash
# 1. Verificar estructura de directorios
find src -name "*.ts" -o -name "*.tsx" | head -20

# 2. Verificar imports no permitidos
grep -r "infrastructure" src/domain/ || echo "✅ Domain clean"
grep -r "infrastructure" src/application/ || echo "✅ Application clean"

# 3. Ejecutar tests
npm run test:unit        # Domain + Application
npm run test:integration # Infrastructure
npm run test:e2e        # Full flow

# 4. Verificar tipos
npm run type-check

# 5. Verificar build
npm run build
```

### Preguntas de Auto-Evaluación

Antes de considerar completada la implementación:

1. **¿Podría cambiar React por Vue sin tocar domain/application?** ✅
2. **¿Podría cambiar la API externa sin tocar use cases?** ✅
3. **¿Podría testear use cases sin UI ni API real?** ✅
4. **¿Las entidades representan correctamente el dominio?** ✅
5. **¿Los ports abstraen correctamente los servicios externos?** ✅

---

## Conclusión

Esta guía proporciona un framework completo para implementar Clean Architecture en frontend. La clave está en:

1. **Empezar por el dominio** - Es lo más importante
2. **Respetar la dependency rule** - Fundamental para el desacoplamiento
3. **Usar el patrón sandwich** - Side effect → Pure function → Side effect
4. **Implementar ports antes que adapters** - Define lo que necesitas
5. **Testear cada capa independientemente** - Garantiza calidad

**RECUERDA**: Esta arquitectura es una herramienta. Úsala pragmáticamente según el tamaño y complejidad de tu proyecto.