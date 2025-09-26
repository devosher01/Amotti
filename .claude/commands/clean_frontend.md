# Comandos para Implementar Clean Architecture en Frontend

## 1. CONFIGURACIÓN INICIAL DEL PROYECTO

### Estructura de Carpetas Obligatoria
```
src/
├── domain/           # Capa de Dominio
├── application/      # Capa de Aplicación  
├── services/         # Capa de Adaptadores
├── ui/              # Interfaz de Usuario
├── lib/             # Utilidades compartidas
└── shared-kernel.d.ts # Tipos compartidos
```

### Configuración TypeScript Estricta
- NUNCA usar `any` en ninguna parte del código
- Activar `strict: true` en tsconfig.json
- Usar `noImplicitAny: true`
- Implementar `strictNullChecks: true`

## 2. CAPA DE DOMINIO (domain/)

### Definir Entidades de Dominio
1. Crear tipos específicos para cada entidad usando type-aliases o interfaces
2. NUNCA usar tipos primitivos directamente (string, number)
3. Usar branded types o type-aliases descriptivos

**Comando para Entidad Usuario:**
```typescript
// domain/user.ts
export type UserId = string;
export type UserName = string;
export type Email = string;

export interface User {
  id: UserId;
  name: UserName;
  email: Email;
  preferences: string[];
  allergies: string[];
}
```

### Crear Funciones de Transformación Puras
1. Cada función debe ser pura (sin efectos secundarios)
2. Usar parámetros tipados estrictamente
3. Retornar nuevos objetos (inmutabilidad)
4. NUNCA acceder a servicios externos

**Comando para Transformaciones:**
```typescript
// domain/user.ts
export function hasAllergy(user: User, ingredient: string): boolean {
  return user.allergies.includes(ingredient);
}

export function updateUserName(user: User, newName: UserName): User {
  return { ...user, name: newName };
}
```

### Reglas de la Capa de Dominio
- PROHIBIDO importar de application/ o services/
- PERMITIDO importar solo de shared-kernel y otras entidades del dominio
- Todas las funciones deben ser testeable sin dependencias externas

## 3. SHARED KERNEL (shared-kernel.d.ts)

### Definir Tipos Globales
```typescript
// shared-kernel.d.ts
declare global {
  type UniqueId = string;
  type Email = string;
  type DateTimeString = string;
  type PriceCents = number;
  type Currency = 'USD' | 'EUR' | 'GBP';
}

export {};
```

### Reglas del Shared Kernel
- Solo tipos y constantes que NO aumenten el acoplamiento
- Compatible con cualquier parte del sistema
- NUNCA incluir lógica de negocio específica

## 4. CAPA DE APLICACIÓN (application/)

### Definir Puertos (Interfaces)
1. Crear interfaces para servicios externos antes de implementar use cases
2. Diseñar interfaces convenientes para la aplicación, no para servicios externos
3. Agrupar por funcionalidad, no por servicio

**Comando para Puertos:**
```typescript
// application/ports.ts
export interface PaymentService {
  tryPay(amount: PriceCents): Promise<boolean>;
}

export interface NotificationService {
  notify(message: string): void;
}

export interface UserStorageService {
  getUser(): User | null;
  saveUser(user: User): void;
}
```

### Implementar Use Cases
1. Usar patrón "Functional Core, Imperative Shell"
2. Estructura: Efecto -> Transformación Pura -> Efecto
3. Inyectar dependencias por parámetros o DI

**Comando para Use Case:**
```typescript
// application/updateUser.ts
import { User } from '../domain/user';
import { NotificationService, UserStorageService } from './ports';

export type UpdateUserDependencies = {
  userStorage: UserStorageService;
  notifier: NotificationService;
};

export async function updateUser(
  userId: string,
  newName: string,
  dependencies: UpdateUserDependencies
): Promise<void> {
  // 1. Efecto: Obtener datos
  const user = dependencies.userStorage.getUser();
  if (!user) {
    dependencies.notifier.notify('Usuario no encontrado');
    return;
  }

  // 2. Transformación pura (dominio)
  const updatedUser = updateUserName(user, newName);

  // 3. Efecto: Guardar resultado
  dependencies.userStorage.saveUser(updatedUser);
  dependencies.notifier.notify('Usuario actualizado');
}
```

### Reglas de la Capa de Aplicación
- PERMITIDO importar del dominio
- PROHIBIDO importar de services/ directamente
- Usar solo interfaces/puertos para servicios externos
- Cada use case debe ser testeable con mocks

## 5. CAPA DE ADAPTADORES (services/)

### Implementar Adaptadores para Servicios Externos
1. Cada adaptador implementa una interfaz definida en application/ports
2. Adaptar APIs externas a las necesidades de la aplicación
3. Manejar errores y transformaciones de datos

**Comando para Adaptador de Storage:**
```typescript
// services/userStorageAdapter.ts
import { User } from '../domain/user';
import { UserStorageService } from '../application/ports';

export function createLocalStorageUserAdapter(): UserStorageService {
  return {
    getUser(): User | null {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    },

    saveUser(user: User): void {
      localStorage.setItem('user', JSON.stringify(user));
    }
  };
}
```

### Implementar Adaptadores UI (React)
1. Conectar use cases con componentes usando hooks
2. Inyectar dependencias en los use cases
3. Manejar estados de loading/error en UI

**Comando para Adaptador UI:**
```typescript
// services/userHooks.ts
import { updateUser, UpdateUserDependencies } from '../application/updateUser';
import { createLocalStorageUserAdapter } from './userStorageAdapter';
import { createNotificationAdapter } from './notificationAdapter';

export function useUpdateUser() {
  const dependencies: UpdateUserDependencies = {
    userStorage: createLocalStorageUserAdapter(),
    notifier: createNotificationAdapter()
  };

  return {
    updateUser: (userId: string, newName: string) => 
      updateUser(userId, newName, dependencies)
  };
}
```

### Reglas de la Capa de Adaptadores
- PERMITIDO importar de application/ y domain/
- PERMITIDO importar librerías externas
- Cada adaptador debe implementar exactamente una interfaz
- Manejar conversiones de datos entre formatos externos e internos

## 6. CAPA DE UI (ui/)

### Conectar Componentes con Use Cases
```typescript
// ui/components/UserProfile.tsx
import React, { useState } from 'react';
import { useUpdateUser } from '../../services/userHooks';

export function UserProfile() {
  const [newName, setNewName] = useState('');
  const { updateUser } = useUpdateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser('user-id', newName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={newName} 
        onChange={(e) => setNewName(e.target.value)} 
      />
      <button type="submit">Actualizar</button>
    </form>
  );
}
```

### Reglas de la Capa de UI
- PROHIBIDO importar directamente del dominio
- PERMITIDO usar solo hooks y adaptadores de services/
- Manejar solo lógica de presentación
- Delegar toda lógica de negocio a use cases

## 7. REGLAS DE DEPENDENCIAS (OBLIGATORIO)

### Dirección de Dependencias
```
UI → Services → Application → Domain
     ↑           ↑            ↑
     |           |            |
   Adapters    Use Cases   Entities
```

### Reglas Estrictas
1. **Domain NUNCA importa de otras capas**
2. **Application solo importa de Domain**
3. **Services puede importar de Application y Domain**
4. **UI solo importa de Services**

### Validación de Dependencias
- Usar ESLint rules para enforcar dependencias
- Revisar imports en cada PR
- Fallar el build si se violan las reglas

## 8. PATRONES DE IMPLEMENTACIÓN

### Patrón Repository
```typescript
// application/ports.ts
export interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}
```

### Patrón Command
```typescript
// application/commands.ts
export interface UpdateUserCommand {
  userId: UserId;
  name: UserName;
  email: Email;
}

export function executeUpdateUserCommand(
  command: UpdateUserCommand,
  dependencies: Dependencies
): Promise<void> {
  // Implementación del command
}
```

### Patrón Observer para Eventos
```typescript
// application/events.ts
export interface DomainEvent {
  type: string;
  timestamp: DateTimeString;
  payload: unknown;
}

export interface EventBus {
  publish(event: DomainEvent): void;
  subscribe(eventType: string, handler: (event: DomainEvent) => void): void;
}
```

## 9. TESTING ESTRATÉGICO

### Testing del Dominio
- Testear todas las funciones puras sin mocks
- Usar casos de prueba exhaustivos
- Validar reglas de negocio

### Testing de Use Cases
- Usar mocks para todas las dependencias
- Testear flujos completos
- Verificar interacciones con puertos

### Testing de Adaptadores
- Testear conversiones de datos
- Mockear servicios externos
- Validar manejo de errores

## 10. OPTIMIZACIONES AVANZADAS

### Branded Types en lugar de Type Aliases
```typescript
// shared-kernel.d.ts
type Brand<K, T> = K & { __brand: T };

type UserId = Brand<string, 'UserId'>;
type Email = Brand<string, 'Email'>;

export function createUserId(value: string): UserId {
  // Validación aquí
  return value as UserId;
}
```

### Separación por Features en lugar de Layers
```
src/
├── features/
│   ├── user/
│   │   ├── domain/
│   │   ├── application/
│   │   └── services/
│   └── products/
│       ├── domain/
│       ├── application/
│       └── services/
└── shared/
```

### Inyección de Dependencias Automática
```typescript
// lib/di.ts
export class Container {
  private dependencies = new Map<string, unknown>();

  register<T>(key: string, implementation: T): void {
    this.dependencies.set(key, implementation);
  }

  resolve<T>(key: string): T {
    const dependency = this.dependencies.get(key);
    if (!dependency) {
      throw new Error(`Dependency ${key} not found`);
    }
    return dependency as T;
  }
}
```

## 11. CHECKLIST DE VALIDACIÓN

### Antes de Cada Commit
- [ ] No hay imports que violen la regla de dependencias
- [ ] No hay uso de `any` en ninguna parte
- [ ] Todas las funciones del dominio son puras
- [ ] Todos los use cases usan el patrón correcto
- [ ] Los adaptadores implementan las interfaces correctas
- [ ] Los tests cubren los casos principales

### Antes de Cada Release
- [ ] Toda la lógica de negocio está en el dominio
- [ ] Los use cases son independientes entre sí
- [ ] Los adaptadores son intercambiables
- [ ] La UI no conoce el dominio directamente
- [ ] El código es testeable sin esfuerzo

## 12. ERRORES COMUNES A EVITAR

### En el Dominio
- ❌ Acceder a APIs externas
- ❌ Usar efectos secundarios
- ❌ Importar de capas superiores
- ❌ Usar `any` o tipos imprecisos

### En Application
- ❌ Llamar servicios externos directamente
- ❌ Mezclar lógica de negocio con orquestación
- ❌ Usar implementaciones concretas en lugar de interfaces

### En Services
- ❌ Incluir lógica de negocio
- ❌ Acoplar fuertemente con servicios externos
- ❌ No manejar errores apropiadamente

### En UI
- ❌ Importar del dominio directamente
- ❌ Incluir lógica de negocio
- ❌ Llamar use cases sin inyección de dependencias

---

**REGLA DE ORO: Si tienes dudas sobre dónde va algo, pregúntate: "¿Esto cambiaría si cambio de React a Vue?" Si la respuesta es NO, va en el dominio. Si es SÍ, va en adapters o UI.**