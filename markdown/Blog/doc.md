# 🚀 LA BIBLIA DEFINITIVA DE TYPESCRIPT
## De Cero Absoluto a DIOS LEVEL - Software de Ultra Alta Calidad

> **"El TypeScript que necesitas para construir software de clase mundial"**

---

# 📋 ÍNDICE COMPLETO

## 🟢 NIVEL 1: FUNDAMENTOS SÓLIDOS (Semanas 1-2)
- [Configuración Profesional Completa](#configuración-profesional)
- [Tipos Primitivos y Sistema de Tipos](#tipos-primitivos)
- [Funciones Tipadas Avanzadas](#funciones-tipadas)
- [**PROYECTO 1**: Todo App con TypeScript Puro](#proyecto-1-todo-app)

## 🔵 NIVEL 2: ESTRUCTURAS Y CONTRATOS (Semanas 3-4)
- [Interfaces vs Type Aliases - Cuándo usar cada uno](#interfaces-vs-types)
- [Objetos Complejos y Anidados](#objetos-complejos)
- [Enums y Uniones Literales](#enums-uniones)
- [**PROYECTO 2**: Sistema de Usuarios con Roles](#proyecto-2-usuarios)

## 🟡 NIVEL 3: GENÉRICOS Y REUTILIZACIÓN (Semanas 5-6)
- [Genéricos desde Cero hasta Maestría](#genericos-completos)
- [Utility Types - La Caja de Herramientas](#utility-types)
- [Indexed Access Types](#indexed-access)
- [**PROYECTO 3**: SDK de API con Tipado Completo](#proyecto-3-sdk)

## 🟠 NIVEL 4: PATRONES AVANZADOS (Semanas 7-8)
- [Discriminated Unions y Pattern Matching](#discriminated-unions)
- [Mapped Types y Template Literals](#mapped-types)
- [Type Guards Personalizados](#type-guards)
- [**PROYECTO 4**: State Machine con TypeScript](#proyecto-4-state-machine)

## 🔴 NIVEL 5: ARQUITECTURA PROFESIONAL (Semanas 9-10)
- [Branded Types y Domain Driven Design](#branded-types)
- [Fluent APIs y Builder Pattern](#fluent-apis)
- [Error Handling Tipado](#error-handling)
- [**PROYECTO 5**: E-commerce Backend con DDD](#proyecto-5-ecommerce)

## 🟣 NIVEL 6: METAPROGRAMACIÓN (Semanas 11-12)
- [Conditional Types y Infer](#conditional-types)
- [Recursive Types](#recursive-types)
- [Higher-Kinded Types Simulation](#hkt-simulation)
- [**PROYECTO 6**: Framework de Validación Custom](#proyecto-6-validation)

## 🖤 NIVEL 7: DIOS LEVEL (Semanas 13-16)
- [Compiler API y AST Manipulation](#compiler-api)
- [Phantom Types y Zero-Cost Abstractions](#phantom-types)
- [Type-Level Programming](#type-level-programming)
- [**PROYECTO FINAL**: Librería con Tipado Mágico](#proyecto-final-libreria)

---

# 🟢 NIVEL 1: FUNDAMENTOS SÓLIDOS

## Configuración Profesional Completa {#configuración-profesional}

### 🔧 Setup del Entorno Pro

**1. Instalación y Configuración Inicial:**

```bash
# Crear proyecto desde cero
mkdir typescript-mastery && cd typescript-mastery
npm init -y

# Instalar TypeScript y herramientas esenciales
npm install -D typescript @types/node ts-node nodemon
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
npm install -D jest @types/jest ts-jest

# Instalar utilidades de desarrollo
npm install -D concurrently cross-env rimraf
```

**2. tsconfig.json - Configuración Pro:**

```json
{
  "compilerOptions": {
    // === Compilación ===
    "target": "ES2022",                          // Moderno pero compatible
    "module": "CommonJS",                        // Para Node.js
    "moduleResolution": "node",                  // Resolución Node.js
    "lib": ["ES2022", "DOM", "DOM.Iterable"],   // APIs disponibles
    
    // === Paths y Output ===
    "rootDir": "./src",                          // Carpeta fuente
    "outDir": "./dist",                          // Carpeta compilada
    "baseUrl": "./src",                          // Base para imports
    "paths": {                                   // Aliases
      "@/*": ["*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"],
      "@services/*": ["services/*"],
      "@controllers/*": ["controllers/*"],
      "@models/*": ["models/*"]
    },
    
    // === Generación de Archivos ===
    "declaration": true,                         // Genera .d.ts
    "declarationMap": true,                      // Source maps para .d.ts
    "sourceMap": true,                           // Source maps para debug
    "removeComments": false,                     // Mantener comentarios JSDoc
    
    // === Strictness (ULTRA STRICT) ===
    "strict": true,                             // Modo estricto total
    "noImplicitAny": true,                      // No any implícito
    "strictNullChecks": true,                   // null/undefined explícitos
    "strictFunctionTypes": true,                // Tipos de función estrictos
    "strictBindCallApply": true,                // bind/call/apply estrictos
    "strictPropertyInitialization": true,       // Propiedades inicializadas
    "noImplicitReturns": true,                 // Return explícito
    "noFallthroughCasesInSwitch": true,        // Switch cases completos
    "noUncheckedIndexedAccess": true,          // Acceso índices seguro
    
    // === Checks Adicionales ===
    "noUnusedLocals": true,                    // Variables no usadas
    "noUnusedParameters": true,                // Parámetros no usados
    "exactOptionalPropertyTypes": true,         // Opcionales exactos
    "noImplicitOverride": true,                // Override explícito
    "noPropertyAccessFromIndexSignature": true, // Acceso propiedades explícito
    
    // === Experimental ===
    "experimentalDecorators": true,             // Decoradores
    "emitDecoratorMetadata": true,             // Metadata decoradores
    
    // === Interop ===
    "esModuleInterop": true,                   // Interop ES modules
    "allowSyntheticDefaultImports": true,       // Default imports sintéticos
    "forceConsistentCasingInFileNames": true,  // Case sensitive
    "skipLibCheck": true                       // Skip lib checks (performance)
  },
  
  "include": [
    "src/**/*",
    "tests/**/*",
    "**/*.d.ts"
  ],
  
  "exclude": [
    "node_modules",
    "dist",
    "coverage",
    "**/*.js"
  ],
  
  "ts-node": {
    "require": ["tsconfig-paths/register"]     // Support para paths
  }
}
```

**3. Package.json Scripts Pro:**

```json
{
  "scripts": {
    "dev": "concurrently \"tsc -w\" \"nodemon dist/index.js\"",
    "dev:ts": "ts-node -r tsconfig-paths/register src/index.ts",
    "build": "rimraf dist && tsc",
    "build:prod": "rimraf dist && tsc --project tsconfig.prod.json",
    "start": "node dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,md}\"",
    "type-check": "tsc --noEmit",
    "pre-commit": "npm run lint && npm run type-check && npm run test"
  }
}
```

**4. ESLint Configuración (.eslintrc.js):**

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    '@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  rules: {
    // TypeScript specific
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/prefer-const': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    
    // General
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
  },
};
```

**5. Prettier (.prettierrc):**

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 📁 Estructura de Proyecto Pro

```
typescript-mastery/
├── src/
│   ├── types/              # Definiciones de tipos globales
│   │   ├── index.ts
│   │   ├── api.ts
│   │   └── domain.ts
│   ├── utils/              # Utilidades tipadas
│   │   ├── index.ts
│   │   ├── validators.ts
│   │   └── formatters.ts
│   ├── services/           # Lógica de negocio
│   │   └── index.ts
│   ├── controllers/        # Controladores (si es API)
│   │   └── index.ts
│   ├── models/            # Modelos de datos
│   │   └── index.ts
│   ├── config/            # Configuración
│   │   ├── index.ts
│   │   └── database.ts
│   └── index.ts           # Entry point
├── tests/                 # Tests
│   ├── unit/
│   ├── integration/
│   └── setup.ts
├── dist/                  # Compilado (generado)
├── docs/                  # Documentación
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── tsconfig.json
├── tsconfig.prod.json
└── package.json
```

---

## Tipos Primitivos y Sistema de Tipos {#tipos-primitivos}

### 🎯 Los Tipos Fundamentales

**1. Tipos Primitivos - Más Allá de lo Básico:**

```typescript
// ===== BÁSICOS =====
let userName: string = 'Oscar';
let userAge: number = 25;
let isActive: boolean = true;
let data: unknown = fetchFromAPI(); // Mejor que any
let result: any = legacyFunction(); // Evitar en código nuevo

// ===== CASOS ESPECIALES =====
// undefined vs null (importantes en strict mode)
let maybeString: string | undefined = undefined;
let nullable: string | null = null;
let optional?: string; // Equivale a: string | undefined

// never - para casos imposibles
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // nunca retorna
  }
}

// void - funciones que no retornan valor
function logMessage(msg: string): void {
  console.log(msg);
  // no return statement o return undefined
}

// ===== ARRAYS TIPADOS =====
// Múltiples sintaxis para arrays
const numbers1: number[] = [1, 2, 3];
const numbers2: Array<number> = [1, 2, 3];

// Tuples - arrays con tipos específicos por posición
let coordinate: [number, number] = [10, 20];
let userInfo: [string, number, boolean] = ['Oscar', 25, true];

// Tuples con elementos opcionales
let partialCoord: [number, number?] = [10]; // ✅ Válido
let namedTuple: [x: number, y: number] = [10, 20]; // Con nombres

// ===== OBJETOS TIPADOS =====
// Tipos de objeto inline
let user: { id: number; name: string; email?: string } = {
  id: 1,
  name: 'Oscar',
};

// Index signatures para propiedades dinámicas
let dynamicObject: { [key: string]: any } = {
  prop1: 'value',
  prop2: 123,
  prop3: true,
};

// Readonly properties
let immutableUser: { readonly id: number; name: string } = {
  id: 1,
  name: 'Oscar',
};
// immutableUser.id = 2; // ❌ Error!
```

**2. Tipos Literales - Poder Real:**

```typescript
// ===== LITERALES DE STRING =====
type Theme = 'light' | 'dark' | 'system';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function setTheme(theme: Theme): void {
  document.body.className = theme;
}

setTheme('light'); // ✅
setTheme('blue');  // ❌ Error: Argument of type '"blue"' is not assignable

// ===== LITERALES NUMÉRICOS =====
type Port = 3000 | 8080 | 443;
type HttpStatusCode = 200 | 404 | 500;

function startServer(port: Port): void {
  console.log(`Server starting on port ${port}`);
}

// ===== LITERALES BOOLEAN =====
type Success = true;
type Failure = false;

// ===== COMBINACIONES COMPLEJAS =====
type ApiResponse = 
  | { status: 'success'; data: any }
  | { status: 'error'; message: string }
  | { status: 'loading' };

function handleResponse(response: ApiResponse): string {
  switch (response.status) {
    case 'success':
      return `Data: ${JSON.stringify(response.data)}`;
    case 'error':
      return `Error: ${response.message}`;
    case 'loading':
      return 'Loading...';
    default:
      // TypeScript garantiza que esto nunca se ejecute
      const _exhaustive: never = response;
      return _exhaustive;
  }
}
```

**3. Aserciones de Tipo - Uso Responsable:**

```typescript
// ===== ASERCIÓN CON 'as' =====
// Cuando sabes más que TypeScript
const userInput = document.getElementById('user-input') as HTMLInputElement;
const apiData = fetchData() as UserData;

// ===== ASERCIÓN CON ANGLE BRACKETS (menos común) =====
const element = <HTMLInputElement>document.getElementById('input');

// ===== NON-NULL ASSERTION (!) =====
// Solo cuando estás 100% seguro que no es null
const element = document.getElementById('required-element')!;

// ===== SAFE ASSERTION PATTERN =====
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Expected string');
  }
}

const userInput: unknown = getUserInput();
assertIsString(userInput);
// Aquí TypeScript ya sabe que userInput es string
console.log(userInput.toUpperCase());
```

### 🎯 Conceptos Clave para Dominar

**1. Type Narrowing (Refinamiento de Tipos):**

```typescript
function processValue(value: string | number | boolean): string {
  // Type guards naturales
  if (typeof value === 'string') {
    // Aquí TS sabe que value es string
    return value.toUpperCase();
  }
  
  if (typeof value === 'number') {
    // Aquí TS sabe que value es number
    return value.toFixed(2);
  }
  
  // Aquí TS sabe que value es boolean
  return value.toString();
}

// Truthiness narrowing
function handleOptional(value?: string): string {
  if (value) {
    // Aquí value es string (no undefined)
    return value.toUpperCase();
  }
  return 'DEFAULT';
}

// Array.isArray narrowing
function processArrayOrString(input: string | string[]): string {
  if (Array.isArray(input)) {
    return input.join(', ');
  }
  return input.toUpperCase();
}
```

**2. Discriminated Unions (Uniones Discriminadas):**

```typescript
// Patrón fundamental para manejar estados complejos
type LoadingState = {
  kind: 'loading';
  progress: number;
};

type SuccessState = {
  kind: 'success';
  data: any;
  timestamp: Date;
};

type ErrorState = {
  kind: 'error';
  message: string;
  code: number;
};

type AsyncState = LoadingState | SuccessState | ErrorState;

function renderUI(state: AsyncState): string {
  switch (state.kind) {
    case 'loading':
      return `Loading... ${state.progress}%`;
    case 'success':
      return `Success at ${state.timestamp}: ${JSON.stringify(state.data)}`;
    case 'error':
      return `Error ${state.code}: ${state.message}`;
    default:
      // Exhaustiveness checking
      const _never: never = state;
      throw new Error(`Unhandled state: ${_never}`);
  }
}
```

---

## Funciones Tipadas Avanzadas {#funciones-tipadas}

### 🎯 Funciones: De Básico a Maestro

**1. Signatures Básicas y Avanzadas:**

```typescript
// ===== FUNCIONES BÁSICAS =====
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// ===== PARÁMETROS OPCIONALES Y DEFAULT =====
function greet(name: string, greeting: string = 'Hello', punctuation?: string): string {
  const punct = punctuation ?? '!';
  return `${greeting}, ${name}${punct}`;
}

greet('Oscar');                    // "Hello, Oscar!"
greet('Oscar', 'Hi');             // "Hi, Oscar!"
greet('Oscar', 'Hi', '.');        // "Hi, Oscar."

// ===== REST PARAMETERS =====
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

sum(1, 2, 3, 4, 5); // 15

// ===== OVERLOADS (SOBRECARGAS) =====
// Múltiples signatures para una función
function format(value: string): string;
function format(value: number, decimals: number): string;
function format(value: boolean): string;
function format(value: string | number | boolean, decimals?: number): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  if (typeof value === 'number') {
    return value.toFixed(decimals || 0);
  }
  return value.toString();
}

format('hello');      // "HELLO"
format(3.14159, 2);   // "3.14"
format(true);         // "true"
```

**2. Function Types y Callbacks:**

```typescript
// ===== TIPOS DE FUNCIÓN =====
type MathOperation = (a: number, b: number) => number;
type EventHandler = (event: Event) => void;
type AsyncProcessor<T> = (input: T) => Promise<T>;

const divide: MathOperation = (a, b) => {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
};

// ===== CALLBACKS TIPADOS =====
function processAsync<T>(
  data: T,
  onSuccess: (result: T) => void,
  onError: (error: Error) => void
): void {
  setTimeout(() => {
    try {
      // Simular procesamiento
      onSuccess(data);
    } catch (error) {
      onError(error as Error);
    }
  }, 1000);
}

processAsync(
  'Hello World',
  (result) => console.log(`Success: ${result}`),
  (error) => console.error(`Error: ${error.message}`)
);

// ===== PROMISES Y ASYNC/AWAIT =====
async function fetchUserData(id: string): Promise<UserData> {
  const response = await fetch(`/api/users/${id}`);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const userData: UserData = await response.json();
  return userData;
}

// Error handling tipado
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function safeApiCall<T>(apiCall: () => Promise<T>): Promise<Result<T>> {
  try {
    const data = await apiCall();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
```

**3. Funciones de Alto Orden:**

```typescript
// ===== DECORATORS PATTERN (FUNCIONAL) =====
type Decorator<T extends (...args: any[]) => any> = (fn: T) => T;

function withLogging<T extends (...args: any[]) => any>(fn: T): T {
  return ((...args: any[]) => {
    console.log(`Calling ${fn.name} with:`, args);
    const result = fn(...args);
    console.log(`${fn.name} returned:`, result);
    return result;
  }) as T;
}

function withTiming<T extends (...args: any[]) => any>(fn: T): T {
  return ((...args: any[]) => {
    const start = Date.now();
    const result = fn(...args);
    const end = Date.now();
    console.log(`${fn.name} took ${end - start}ms`);
    return result;
  }) as T;
}

// Composición de decoradores
function compose<T>(...decorators: Array<(fn: T) => T>): (fn: T) => T {
  return (fn: T) => decorators.reduceRight((acc, decorator) => decorator(acc), fn);
}

const decoratedFunction = compose(
  withLogging,
  withTiming
)(function expensiveOperation(n: number): number {
  return Array.from({ length: n }, (_, i) => i).reduce((a, b) => a + b, 0);
});

// ===== CURRYING TIPADO =====
type CurriedFunction<Args extends readonly any[], Return> = 
  Args extends readonly [infer First, ...infer Rest]
    ? (arg: First) => CurriedFunction<Rest, Return>
    : Return;

function curry<Args extends readonly any[], Return>(
  fn: (...args: Args) => Return
): CurriedFunction<Args, Return> {
  return ((...args: any[]) => {
    if (args.length >= fn.length) {
      return fn(...(args as Args));
    }
    return curry(fn.bind(null, ...args));
  }) as any;
}

// Ejemplo de uso
const add3 = (a: number, b: number, c: number): number => a + b + c;
const curriedAdd3 = curry(add3);

const result1 = curriedAdd3(1)(2)(3); // 6
const result2 = curriedAdd3(1, 2)(3); // 6
const result3 = curriedAdd3(1, 2, 3); // 6
```

**4. Patrones Avanzados con Funciones:**

```typescript
// ===== BUILDER PATTERN CON FUNCIONES =====
type ConfigBuilder = {
  host: (host: string) => ConfigBuilder;
  port: (port: number) => ConfigBuilder;
  ssl: (enabled: boolean) => ConfigBuilder;
  build: () => ServerConfig;
};

function createConfigBuilder(): ConfigBuilder {
  let config: Partial<ServerConfig> = {};
  
  return {
    host: (host: string) => {
      config.host = host;
      return createConfigBuilder();
    },
    port: (port: number) => {
      config.port = port;
      return createConfigBuilder();
    },
    ssl: (enabled: boolean) => {
      config.ssl = enabled;
      return createConfigBuilder();
    },
    build: (): ServerConfig => {
      if (!config.host || !config.port) {
        throw new Error('Host and port are required');
      }
      return config as ServerConfig;
    }
  };
}

// Uso fluent
const serverConfig = createConfigBuilder()
  .host('localhost')
  .port(3000)
  .ssl(true)
  .build();

// ===== MEMOIZATION TIPADA =====
type MemoizedFunction<Args extends any[], Return> = {
  (...args: Args): Return;
  cache: Map<string, Return>;
  clear: () => void;
};

function memoize<Args extends any[], Return>(
  fn: (...args: Args) => Return,
  keyGenerator?: (...args: Args) => string
): MemoizedFunction<Args, Return> {
  const cache = new Map<string, Return>();
  const defaultKeyGen = (...args: Args): string => JSON.stringify(args);
  const getKey = keyGenerator || defaultKeyGen;
  
  const memoized = (...args: Args): Return => {
    const key = getKey(...args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
  
  memoized.cache = cache;
  memoized.clear = () => cache.clear();
  
  return memoized as MemoizedFunction<Args, Return>;
}

// Ejemplo: Fibonacci memoizado
const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Súper rápido después de la primera vez
console.log(fibonacci.cache.size); // Ver cuántos valores cachea
```

---

## PROYECTO 1: Todo App con TypeScript Puro {#proyecto-1-todo-app}

### 🎯 **Objetivo**: Aplicar todos los fundamentos en una app real

**Especificaciones:**
- Todo app completa con persistencia localStorage
- Tipado estricto en toda la aplicación
- Manejo de errores profesional
- Validaciones robustas
- Arquitectura escalable

**Estructura del Proyecto:**

```typescript
// ===== TYPES CENTRALES =====
// src/types/todo.ts
export type TodoId = string & { readonly brand: unique symbol };
export type UserId = string & { readonly brand: unique symbol };

export interface Todo {
  readonly id: TodoId;
  readonly userId: UserId;
  title: string;
  description?: string;
  completed: boolean;
  readonly createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  dueDate?: Date;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  priority?: Todo['priority'];
  category?: string;
  dueDate?: Date;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: Todo['priority'];
  category?: string;
  dueDate?: Date;
}

export type TodoFilter = {
  completed?: boolean;
  priority?: Todo['priority'];
  category?: string;
  searchTerm?: string;
};

// ===== RESULT TYPES =====
// src/types/result.ts
export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

// ===== REPOSITORY INTERFACE =====
// src/types/repository.ts
export interface TodoRepository {
  findAll(userId: UserId, filter?: TodoFilter): AsyncResult<Todo[]>;
  findById(id: TodoId): AsyncResult<Todo>;
  create(userId: UserId, todo: CreateTodoRequest): AsyncResult<Todo>;
  update(id: TodoId, updates: UpdateTodoRequest): AsyncResult<Todo>;
  delete(id: TodoId): AsyncResult<void>;
}
```

**Implementación del Repository:**

```typescript
// src/repositories/LocalStorageTodoRepository.ts
import { Todo, TodoId, UserId, CreateTodoRequest, UpdateTodoRequest, TodoFilter } from '@/types/todo';
import { Result, AsyncResult } from '@/types/result';
import { TodoRepository } from '@/types/repository';

class TodoNotFoundError extends Error {
  constructor(id: TodoId) {
    super(`Todo with id ${id} not found`);
    this.name = 'TodoNotFoundError';
  }
}

class StorageError extends Error {
  constructor(operation: string, cause?: Error) {
    super(`Storage operation '${operation}' failed: ${cause?.message || 'Unknown error'}`);
    this.name = 'StorageError';
    this.cause = cause;
  }
}

export class LocalStorageTodoRepository implements TodoRepository {
  private readonly storageKey = 'todos';

  private createTodoId(): TodoId {
    return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` as TodoId;
  }

  private async safeOperation<T>(operation: () => T): AsyncResult<T> {
    try {
      const result = operation();
      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error : new Error(String(error)) 
      };
    }
  }

  private loadTodos(): Todo[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return parsed.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      }));
    } catch (error) {
      throw new StorageError('load', error as Error);
    }
  }

  private saveTodos(todos: Todo[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(todos));
    } catch (error) {
      throw new StorageError('save', error as Error);
    }
  }

  private filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
    return todos.filter(todo => {
      if (filter.completed !== undefined && todo.completed !== filter.completed) {
        return false;
      }
      
      if (filter.priority && todo.priority !== filter.priority) {
        return false;
      }
      
      if (filter.category && todo.category !== filter.category) {
        return false;
      }
      
      if (filter.searchTerm) {
        const term = filter.searchTerm.toLowerCase();
        const matchesTitle = todo.title.toLowerCase().includes(term);
        const matchesDescription = todo.description?.toLowerCase().includes(term) ?? false;
        if (!matchesTitle && !matchesDescription) {
          return false;
        }
      }
      
      return true;
    });
  }

  async findAll(userId: UserId, filter: TodoFilter = {}): AsyncResult<Todo[]> {
    return this.safeOperation(() => {
      const todos = this.loadTodos().filter(todo => todo.userId === userId);
      return this.filterTodos(todos, filter);
    });
  }

  async findById(id: TodoId): AsyncResult<Todo> {
    return this.safeOperation(() => {
      const todos = this.loadTodos();
      const todo = todos.find(t => t.id === id);
      
      if (!todo) {
        throw new TodoNotFoundError(id);
      }
      
      return todo;
    });
  }

  async create(userId: UserId, request: CreateTodoRequest): AsyncResult<Todo> {
    return this.safeOperation(() => {
      const now = new Date();
      const newTodo: Todo = {
        id: this.createTodoId(),
        userId,
        title: request.title.trim(),
        description: request.description?.trim(),
        completed: false,
        createdAt: now,
        updatedAt: now,
        priority: request.priority ?? 'medium',
        category: request.category?.trim(),
        dueDate: request.dueDate,
      };

      const todos = this.loadTodos();
      todos.push(newTodo);
      this.saveTodos(todos);

      return newTodo;
    });
  }

  async update(id: TodoId, updates: UpdateTodoRequest): AsyncResult<Todo> {
    return this.safeOperation(() => {
      const todos = this.loadTodos();
      const index = todos.findIndex(t => t.id === id);
      
      if (index === -1) {
        throw new TodoNotFoundError(id);
      }

      const todo = todos[index];
      const updatedTodo: Todo = {
        ...todo,
        ...Object.fromEntries(
          Object.entries(updates).filter(([_, value]) => value !== undefined)
        ),
        updatedAt: new Date(),
      };

      todos[index] = updatedTodo;
      this.saveTodos(todos);

      return updatedTodo;
    });
  }

  async delete(id: TodoId): AsyncResult<void> {
    return this.safeOperation(() => {
      const todos = this.loadTodos();
      const index = todos.findIndex(t => t.id === id);
      
      if (index === -1) {
        throw new TodoNotFoundError(id);
      }

      todos.splice(index, 1);
      this.saveTodos(todos);
    });
  }
}
```

**Service Layer:**

```typescript
// src/services/TodoService.ts
import { Todo, TodoId, UserId, CreateTodoRequest, UpdateTodoRequest, TodoFilter } from '@/types/todo';
import { Result, AsyncResult } from '@/types/result';
import { TodoRepository } from '@/types/repository';

export class TodoValidationError extends Error {
  constructor(field: string, message: string) {
    super(`Validation error on ${field}: ${message}`);
    this.name = 'TodoValidationError';
  }
}

export class TodoService {
  constructor(private readonly repository: TodoRepository) {}

  private validateCreateRequest(request: CreateTodoRequest): Result<void> {
    if (!request.title || request.title.trim().length === 0) {
      return { 
        success: false, 
        error: new TodoValidationError('title', 'Title is required and cannot be empty') 
      };
    }

    if (request.title.length > 200) {
      return { 
        success: false, 
        error: new TodoValidationError('title', 'Title cannot exceed 200 characters') 
      };
    }

    if (request.description && request.description.length > 1000) {
      return { 
        success: false, 
        error: new TodoValidationError('description', 'Description cannot exceed 1000 characters') 
      };
    }

    if (request.dueDate && request.dueDate < new Date()) {
      return { 
        success: false, 
        error: new TodoValidationError('dueDate', 'Due date cannot be in the past') 
      };
    }

    return { success: true, data: undefined };
  }

  async getTodos(userId: UserId, filter?: TodoFilter): AsyncResult<Todo[]> {
    return this.repository.findAll(userId, filter);
  }

  async getTodo(id: TodoId): AsyncResult<Todo> {
    return this.repository.findById(id);
  }

  async createTodo(userId: UserId, request: CreateTodoRequest): AsyncResult<Todo> {
    const validation = this.validateCreateRequest(request);
    if (!validation.success) {
      return validation;
    }

    return this.repository.create(userId, request);
  }

  async updateTodo(id: TodoId, updates: UpdateTodoRequest): AsyncResult<Todo> {
    // Validar updates si es necesario
    if (updates.title !== undefined) {
      const validation = this.validateCreateRequest({ title: updates.title });
      if (!validation.success) {
        return validation;
      }
    }

    return this.repository.update(id, updates);
  }

  async deleteTodo(id: TodoId): AsyncResult<void> {
    return this.repository.delete(id);
  }

  async toggleTodoCompletion(id: TodoId): AsyncResult<Todo> {
    const getTodoResult = await this.repository.findById(id);
    
    if (!getTodoResult.success) {
      return getTodoResult;
    }

    return this.repository.update(id, { completed: !getTodoResult.data.completed });
  }

  async getStatistics(userId: UserId): AsyncResult<{
    total: number;
    completed: number;
    pending: number;
    overdue: number;
  }> {
    const todosResult = await this.repository.findAll(userId);
    
    if (!todosResult.success) {
      return todosResult;
    }

    const todos = todosResult.data;
    const now = new Date();
    
    const stats = {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length,
      overdue: todos.filter(t => 
        !t.completed && t.dueDate && t.dueDate < now
      ).length,
    };

    return { success: true, data: stats };
  }
}
```

**CLI Interface (para testing):**

```typescript
// src/cli/TodoCLI.ts
import { TodoService } from '@/services/TodoService';
import { LocalStorageTodoRepository } from '@/repositories/LocalStorageTodoRepository';
import { UserId } from '@/types/todo';

// Para Node.js, simular localStorage
if (typeof localStorage === 'undefined') {
  const { LocalStorage } = require('node-localstorage');
  global.localStorage = new LocalStorage('./storage');
}

export class TodoCLI {
  private readonly todoService: TodoService;
  private readonly currentUserId: UserId = 'user_1' as UserId;

  constructor() {
    const repository = new LocalStorageTodoRepository();
    this.todoService = new TodoService(repository);
  }

  private formatTodo(todo: any): string {
    const status = todo.completed ? '✅' : '❌';
    const priority = todo.priority.toUpperCase().padEnd(6);
    const dueDate = todo.dueDate ? ` (due: ${todo.dueDate.toDateString()})` : '';
    
    return `${status} [${priority}] ${todo.title}${dueDate}`;
  }

  async run(): Promise<void> {
    console.log('🚀 Todo App - TypeScript CLI');
    console.log('Commands: list, add <title>, complete <id>, delete <id>, stats, quit\n');

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const processCommand = async (input: string): Promise<void> => {
      const [command, ...args] = input.trim().split(' ');

      switch (command.toLowerCase()) {
        case 'list': {
          const result = await this.todoService.getTodos(this.currentUserId);
          if (result.success) {
            console.log('\n📋 Your Todos:');
            result.data.forEach((todo, index) => {
              console.log(`${index + 1}. ${this.formatTodo(todo)}`);
            });
          } else {
            console.error('❌ Error loading todos:', result.error.message);
          }
          break;
        }

        case 'add': {
          const title = args.join(' ');
          const result = await this.todoService.createTodo(this.currentUserId, { title });
          
          if (result.success) {
            console.log('✅ Todo created:', this.formatTodo(result.data));
          } else {
            console.error('❌ Error creating todo:', result.error.message);
          }
          break;
        }

        case 'stats': {
          const result = await this.todoService.getStatistics(this.currentUserId);
          if (result.success) {
            const { total, completed, pending, overdue } = result.data;
            console.log('\n📊 Statistics:');
            console.log(`Total: ${total}`);
            console.log(`Completed: ${completed}`);
            console.log(`Pending: ${pending}`);
            console.log(`Overdue: ${overdue}`);
          }
          break;
        }

        case 'quit':
          readline.close();
          return;

        default:
          console.log('❓ Unknown command. Available: list, add, stats, quit');
      }

      readline.prompt();
    };

    readline.on('line', processCommand);
    readline.prompt();
  }
}

// Entry point
if (require.main === module) {
  new TodoCLI().run().catch(console.error);
}
```

**Tests Profesionales:**

```typescript
// tests/TodoService.test.ts
import { TodoService, TodoValidationError } from '@/services/TodoService';
import { LocalStorageTodoRepository } from '@/repositories/LocalStorageTodoRepository';
import { UserId } from '@/types/todo';

// Mock localStorage for tests
const mockStorage = new Map<string, string>();
Object.defineProperty(global, 'localStorage', {
  value: {
    getItem: (key: string) => mockStorage.get(key) || null,
    setItem: (key: string, value: string) => mockStorage.set(key, value),
    removeItem: (key: string) => mockStorage.delete(key),
    clear: () => mockStorage.clear(),
  },
});

describe('TodoService', () => {
  let todoService: TodoService;
  let userId: UserId;

  beforeEach(() => {
    mockStorage.clear();
    const repository = new LocalStorageTodoRepository();
    todoService = new TodoService(repository);
    userId = 'test_user' as UserId;
  });

  describe('createTodo', () => {
    it('should create a todo successfully', async () => {
      const request = { title: 'Test todo' };
      const result = await todoService.createTodo(userId, request);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe('Test todo');
        expect(result.data.completed).toBe(false);
        expect(result.data.priority).toBe('medium');
      }
    });

    it('should fail with empty title', async () => {
      const request = { title: '' };
      const result = await todoService.createTodo(userId, request);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(TodoValidationError);
        expect(result.error.message).toContain('Title is required');
      }
    });

    it('should fail with title too long', async () => {
      const request = { title: 'a'.repeat(201) };
      const result = await todoService.createTodo(userId, request);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(TodoValidationError);
      }
    });
  });

  describe('toggleTodoCompletion', () => {
    it('should toggle completion status', async () => {
      // Create todo
      const createResult = await todoService.createTodo(userId, { title: 'Test' });
      expect(createResult.success).toBe(true);
      
      if (createResult.success) {
        const todoId = createResult.data.id;
        
        // Toggle to completed
        const toggleResult = await todoService.toggleTodoCompletion(todoId);
        expect(toggleResult.success).toBe(true);
        if (toggleResult.success) {
          expect(toggleResult.data.completed).toBe(true);
        }
        
        // Toggle back to pending
        const toggleBackResult = await todoService.toggleTodoCompletion(todoId);
        expect(toggleBackResult.success).toBe(true);
        if (toggleBackResult.success) {
          expect(toggleBackResult.data.completed).toBe(false);
        }
      }
    });
  });
});
```

### 🎯 **Tareas del Proyecto 1:**

1. **Implementar la aplicación completa** siguiendo el código anterior
2. **Agregar validaciones adicionales** (categorías predefinidas, límite de todos por usuario)
3. **Crear una interfaz web simple** usando vanilla TS + HTML
4. **Implementar export/import** de todos en formato JSON
5. **Agregar funcionalidad de búsqueda avanzada** con filtros múltiples
6. **Escribir tests completos** para todos los componentes

**Criterios de Evaluación:**
- ✅ Tipado estricto sin `any`
- ✅ Manejo de errores robusto
- ✅ Arquitectura limpia y separación de responsabilidades
- ✅ Tests comprehensivos
- ✅ Validaciones completas
- ✅ Performance optimizada

---

# 🔵 NIVEL 2: ESTRUCTURAS Y CONTRATOS

## Interfaces vs Type Aliases - Cuándo usar cada uno {#interfaces-vs-types}

### 🎯 **La Gran Diferencia: Extensibilidad y Rendimiento**

**Interfaces: Para Contratos Extensibles**

```typescript
// ===== INTERFACES - CASOS DE USO PERFECTOS =====

// 1. DEFINICIÓN DE CONTRATOS DE API
interface ApiResponse {
  status: number;
  message: string;
  timestamp: Date;
}

// Las interfaces se pueden extender y hacer merge
interface ApiResponse {
  requestId: string; // Declaration merging!
}

// 2. HERENCIA Y EXTENSIÓN
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User extends BaseEntity {
  email: string;
  username: string;
  profile: UserProfile;
}

interface AdminUser extends User {
  permissions: Permission[];
  lastLoginAt?: Date;
}

// 3. IMPLEMENTACIÓN DE CLASES
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

class UserRepository implements Repository<User> {
  async findById(id: string): Promise<User | null> {
    // Implementación
    return null;
  }
  
  async findAll(): Promise<User[]> {
    return [];
  }
  
  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date();
    return {
      ...userData,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
  }
  
  // ... resto de métodos
}

// 4. OBJETOS CON MÉTODOS (comportamiento)
interface EventEmitter<T = any> {
  on(event: string, listener: (data: T) => void): this;
  emit(event: string, data: T): boolean;
  off(event: string, listener?: (data: T) => void): this;
}

// 5. DECLARATION MERGING para librerías externas
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}
```

**Type Aliases: Para Tipos Complejos y Transformaciones**

```typescript
// ===== TYPE ALIASES - CASOS DE USO PERFECTOS =====

// 1. UNIONES COMPLEJAS
type Theme = 'light' | 'dark' | 'system';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type ResponseStatus = 'idle' | 'loading' | 'success' | 'error';

// 2. TIPOS COMPUTADOS Y TRANSFORMACIONES
type UserKeys = keyof User; // 'id' | 'email' | 'username' | 'profile' | 'createdAt' | 'updatedAt'
type UserWithoutTimestamps = Omit<User, 'createdAt' | 'updatedAt'>;
type CreateUserRequest = Pick<User, 'email' | 'username'> & {
  password: string;
};

// 3. CONDITIONAL TYPES
type NonNullable<T> = T extends null | undefined ? never : T;
type ApiResult<T> = T extends any[] 
  ? { data: T; total: number; page: number }
  : { data: T };

// 4. MAPPED TYPES
type ReadonlyEntity<T> = {
  readonly [K in keyof T]: T[K];
};

type OptionalExcept<T, K extends keyof T> = {
  [P in K]: T[P];
} & {
  [P in Exclude<keyof T, K>]?: T[P];
};

// 5. TEMPLATE LITERAL TYPES
type EventName<T extends string> = `on${Capitalize<T>}`;
type ApiEndpoint<T extends string> = `/api/${T}`;

// Ejemplo de uso
type UserEvents = EventName<'login' | 'logout' | 'register'>; // 'onLogin' | 'onLogout' | 'onRegister'
type UserEndpoints = ApiEndpoint<'users' | 'profiles'>; // '/api/users' | '/api/profiles'

// 6. FUNCIONES COMO TIPOS
type AsyncOperation<T, U> = (input: T) => Promise<U>;
type EventHandler<T> = (event: T) => void | Promise<void>;
type Validator<T> = (value: T) => boolean | string;

// 7. TIPOS RECURSIVOS
type JsonValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JsonValue[] 
  | { [key: string]: JsonValue };

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

### 🎯 **Reglas Definitivas: Cuándo Usar Cada Uno**

```typescript
// ===== MATRIZ DE DECISIÓN =====

// ✅ USA INTERFACE CUANDO:
interface GoodInterfaceExamples {
  // 1. Defines contratos para clases
  // 2. Necesitas herencia multiple
  // 3. Quieres declaration merging
  // 4. Defines APIs públicas
  // 5. El tipo puede evolucionar (librerías)
}

// ✅ USA TYPE CUANDO:
type GoodTypeExamples = 
  | string // Uniones
  | { computed: true } // Tipos computados
  | SomeInterface & AnotherType // Intersecciones complejas
  | ConditionalType<T> // Tipos condicionales
  | MappedType<T>; // Tipos mapeados

// ===== CASOS HÍBRIDOS (MIX) =====
interface BaseConfig {
  apiUrl: string;
  timeout: number;
}

type Environment = 'development' | 'staging' | 'production';

type EnvironmentConfig = BaseConfig & {
  environment: Environment;
  debug: boolean;
  features: Record<string, boolean>;
};

// Mejor práctica: Interface para la base, Type para extensiones complejas
```

### 🎯 **Casos del Mundo Real: Patrones Pro**

```typescript
// ===== PATRÓN 1: API CLIENT DEFINITION =====
// Interface para el contrato
interface ApiClient {
  get<T>(endpoint: string): Promise<ApiResult<T>>;
  post<T, U>(endpoint: string, data: T): Promise<ApiResult<U>>;
  put<T, U>(endpoint: string, data: T): Promise<ApiResult<U>>;
  delete(endpoint: string): Promise<void>;
}

// Types para los datos específicos
type UserApiMethods = {
  getUser: (id: string) => Promise<ApiResult<User>>;
  createUser: (data: CreateUserRequest) => Promise<ApiResult<User>>;
  updateUser: (id: string, data: UpdateUserRequest) => Promise<ApiResult<User>>;
};

type ProductApiMethods = {
  getProducts: (filters?: ProductFilters) => Promise<ApiResult<Product[]>>;
  getProduct: (id: string) => Promise<ApiResult<Product>>;
};

// Combinación final
type CompleteApiClient = ApiClient & UserApiMethods & ProductApiMethods;

// ===== PATRÓN 2: EVENT SYSTEM =====
interface EventEmitter {
  on(event: string, handler: Function): void;
  emit(event: string, ...args: any[]): void;
}

// Types para eventos específicos
type UserEvents = {
  'user:created': (user: User) => void;
  'user:updated': (user: User, changes: Partial<User>) => void;
  'user:deleted': (userId: string) => void;
};

type SystemEvents = {
  'app:ready': () => void;
  'app:error': (error: Error) => void;
};

type AllEvents = UserEvents & SystemEvents;

// Type-safe event emitter
class TypedEventEmitter<T extends Record<string, Function>> {
  private handlers = new Map<string, Function[]>();

  on<K extends keyof T>(event: K, handler: T[K]): void {
    const eventName = event as string;
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler);
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): void {
    const eventName = event as string;
    const handlers = this.handlers.get(eventName) || [];
    handlers.forEach(handler => handler(...args));
  }
}

// Usage
const emitter = new TypedEventEmitter<AllEvents>();
emitter.on('user:created', (user) => {
  // user es automáticamente tipado como User
  console.log(`User created: ${user.username}`);
});

// ===== PATRÓN 3: BUILDER CON INTERFACES Y TYPES =====
interface Buildable<T> {
  build(): T;
}

interface FluentBuilder<T> extends Buildable<T> {
  reset(): this;
  clone(): this;
}

type QueryBuilder<T> = FluentBuilder<T> & {
  select<K extends keyof T>(fields: K[]): QueryBuilder<Pick<T, K>>;
  where<K extends keyof T>(field: K, value: T[K]): QueryBuilder<T>;
  orderBy<K extends keyof T>(field: K, direction: 'ASC' | 'DESC'): QueryBuilder<T>;
  limit(count: number): QueryBuilder<T>;
};

class UserQueryBuilder implements QueryBuilder<User> {
  private query: any = {};

  select<K extends keyof User>(fields: K[]): QueryBuilder<Pick<User, K>> {
    this.query.select = fields;
    return this as any;
  }

  where<K extends keyof User>(field: K, value: User[K]): QueryBuilder<User> {
    this.query.where = { ...this.query.where, [field]: value };
    return this;
  }

  orderBy<K extends keyof User>(field: K, direction: 'ASC' | 'DESC'): QueryBuilder<User> {
    this.query.orderBy = { field, direction };
    return this;
  }

  limit(count: number): QueryBuilder<User> {
    this.query.limit = count;
    return this;
  }

  build(): User {
    // Aquí ejecutarías la query real
    return {} as User;
  }

  reset(): this {
    this.query = {};
    return this;
  }

  clone(): this {
    const cloned = new UserQueryBuilder();
    cloned.query = { ...this.query };
    return cloned as this;
  }
}

// Usage con full type safety
const users = new UserQueryBuilder()
  .select(['id', 'username', 'email'])  // Solo estos campos en el resultado
  .where('username', 'oscar')           // Type-safe field y value
  .orderBy('createdAt', 'DESC')         // Solo campos válidos
  .limit(10)
  .build();
```

---

## Objetos Complejos y Anidados {#objetos-complejos}

### 🎯 **Modelado Avanzado de Datos**

```typescript
// ===== ESTRUCTURAS JERÁRQUICAS COMPLEJAS =====

// Base types para costruir complejidad
type UUID = string & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };
type PhoneNumber = string & { readonly brand: unique symbol };
type Timestamp = Date & { readonly brand: unique symbol };

// Nested address system
interface Address {
  readonly id: UUID;
  street: string;
  streetNumber: string;
  apartment?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  metadata: {
    verified: boolean;
    verifiedAt?: Timestamp;
    source: 'user' | 'geocoding' | 'external';
  };
}

// Contact information with multiple channels
interface ContactInfo {
  primaryEmail: Email;
  secondaryEmails: Email[];
  phones: {
    primary?: PhoneNumber;
    mobile?: PhoneNumber;
    work?: PhoneNumber;
    home?: PhoneNumber;
  };
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  preferredContactMethod: 'email' | 'phone' | 'sms';
  timezone: string;
}

// Complex user profile with nested data
interface UserProfile {
  readonly id: UUID;
  readonly userId: UUID;
  
  // Personal information
  personal: {
    firstName: string;
    lastName: string;
    displayName?: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
    profilePicture?: {
      url: string;
      thumbnails: {
        small: string;
        medium: string;
        large: string;
      };
      metadata: {
        uploadedAt: Timestamp;
        size: number;
        mimeType: string;
      };
    };
  };

  // Location and contact
  contact: ContactInfo;
  addresses: {
    home?: Address;
    work?: Address;
    billing?: Address;
    shipping?: Address[];
  };

  // Professional information
  professional?: {
    company: string;
    position: string;
    industry: string;
    experienceYears?: number;
    skills: string[];
    resume?: {
      url: string;
      uploadedAt: Timestamp;
    };
  };

  // Preferences and settings
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    currency: string;
    notifications: {
      email: {
        marketing: boolean;
        security: boolean;
        updates: boolean;
      };
      push: {
        enabled: boolean;
        marketing: boolean;
        security: boolean;
      };
      sms: {
        enabled: boolean;
        security: boolean;
      };
    };
    privacy: {
      profileVisibility: 'public' | 'friends' | 'private';
      showEmail: boolean;
      showPhone: boolean;
      allowSearchEngineIndexing: boolean;
    };
  };

  // Audit fields
  readonly createdAt: Timestamp;
  updatedAt: Timestamp;
  lastActiveAt: Timestamp;
}

// ===== COMPLEX BUSINESS ENTITIES =====

// E-commerce order system
type OrderStatus = 
  | 'draft'
  | 'pending_payment'
  | 'payment_processing'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

interface Money {
  amount: number;
  currency: string;
  displayValue: string;
}

interface OrderItem {
  readonly id: UUID;
  productId: UUID;
  variantId?: UUID;
  sku: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: Money;
  totalPrice: Money;
  discounts?: Array<{
    type: 'percentage' | 'fixed' | 'coupon';
    name: string;
    amount: Money;
    code?: string;
  }>;
  metadata: {
    weight?: number;
    dimensions?: {
      length: number;
      width: number;
      height: number;
      unit: 'cm' | 'in';
    };
    customization?: Record<string, any>;
  };
}

interface Order {
  readonly id: UUID;
  readonly orderNumber: string;
  customerId: UUID;
  
  // Order details
  items: OrderItem[];
  status: OrderStatus;
  
  // Pricing
  subtotal: Money;
  tax: Money;
  shipping: Money;
  total: Money;
  
  // Addresses
  billingAddress: Address;
  shippingAddress: Address;
  
  // Payment information
  payment?: {
    method: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash';
    provider: string;
    transactionId: string;
    paidAt?: Timestamp;
    refunds?: Array<{
      id: UUID;
      amount: Money;
      reason: string;
      processedAt: Timestamp;
    }>;
  };
  
  // Shipping information
  shipping?: {
    method: string;
    provider: string;
    trackingNumber?: string;
    estimatedDelivery?: Date;
    actualDelivery?: Timestamp;
    events: Array<{
      timestamp: Timestamp;
      status: string;
      location?: string;
      description: string;
    }>;
  };
  
  // Audit and metadata
  notes?: string;
  tags: string[];
  readonly createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: UUID;
  
  // Calculated fields (readonly)
  readonly itemsCount: number;
  readonly isShippable: boolean;
  readonly canBeCancelled: boolean;
  readonly canBeRefunded: boolean;
}
```

### 🎯 **Patrones para Manejar Complejidad**

```typescript
// ===== PATTERN 1: NESTED BUILDERS =====
class OrderBuilder {
  private order: Partial<Order> = {
    items: [],
    tags: [],
    status: 'draft'
  };

  static create(): OrderBuilder {
    return new OrderBuilder();
  }

  withCustomer(customerId: UUID): this {
    this.order.customerId = customerId;
    return this;
  }

  withBillingAddress(address: Address): this {
    this.order.billingAddress = address;
    return this;
  }

  withShippingAddress(address: Address): this {
    this.order.shippingAddress = address;
    return this;
  }

  addItem(item: Omit<OrderItem, 'id'>): this {
    const orderItem: OrderItem = {
      ...item,
      id: generateUUID(),
    };
    
    this.order.items = [...(this.order.items || []), orderItem];
    return this;
  }

  addItems(items: Array<Omit<OrderItem, 'id'>>): this {
    items.forEach(item => this.addItem(item));
    return this;
  }

  withPaymentMethod(method: Order['payment']): this {
    this.order.payment = method;
    return this;
  }

  calculateTotals(): this {
    if (!this.order.items || this.order.items.length === 0) {
      throw new Error('Cannot calculate totals without items');
    }

    const subtotal = this.order.items.reduce(
      (sum, item) => sum + item.totalPrice.amount, 
      0
    );

    // Simplified tax calculation (8.5%)
    const tax = subtotal * 0.085;
    
    // Simplified shipping (free over $100)
    const shipping = subtotal > 100 ? 0 : 9.99;
    
    const total = subtotal + tax + shipping;

    const currency = this.order.items[0]?.totalPrice.currency || 'USD';
    
    this.order.subtotal = { amount: subtotal, currency, displayValue: `$${subtotal.toFixed(2)}` };
    this.order.tax = { amount: tax, currency, displayValue: `$${tax.toFixed(2)}` };
    this.order.shipping = { amount: shipping, currency, displayValue: `$${shipping.toFixed(2)}` };
    this.order.total = { amount: total, currency, displayValue: `$${total.toFixed(2)}` };

    return this;
  }

  build(): Order {
    const requiredFields: Array<keyof Order> = [
      'customerId', 'billingAddress', 'shippingAddress', 'items'
    ];

    for (const field of requiredFields) {
      if (!this.order[field]) {
        throw new Error(`${field} is required to build Order`);
      }
    }

    const now = new Date() as Timestamp;
    
    const completeOrder: Order = {
      id: generateUUID(),
      orderNumber: generateOrderNumber(),
      customerId: this.order.customerId!,
      items: this.order.items!,
      status: this.order.status!,
      subtotal: this.order.subtotal!,
      tax: this.order.tax!,
      shipping: this.order.shipping!,
      total: this.order.total!,
      billingAddress: this.order.billingAddress!,
      shippingAddress: this.order.shippingAddress!,
      payment: this.order.payment,
      tags: this.order.tags || [],
      createdAt: now,
      updatedAt: now,
      createdBy: this.order.customerId!, // Simplified
      
      // Calculated readonly fields
      get itemsCount(): number {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
      },
      get isShippable(): boolean {
        return this.items.some(item => item.metadata.weight && item.metadata.weight > 0);
      },
      get canBeCancelled(): boolean {
        return ['draft', 'pending_payment', 'paid'].includes(this.status);
      },
      get canBeRefunded(): boolean {
        return ['delivered'].includes(this.status) && !!this.payment;
      }
    };

    return completeOrder;
  }
}

// Usage
const order = OrderBuilder
  .create()
  .withCustomer('customer-123' as UUID)
  .withBillingAddress(billingAddr)
  .withShippingAddress(shippingAddr)
  .addItem({
    productId: 'product-1' as UUID,
    sku: 'PROD-001',
    name: 'Amazing Product',
    quantity: 2,
    unitPrice: { amount: 29.99, currency: 'USD', displayValue: '$29.99' },
    totalPrice: { amount: 59.98, currency: 'USD', displayValue: '$59.98' },
    metadata: { weight: 1.5 }
  })
  .calculateTotals()
  .build();
```

### 🎯 **Type Utilities para Objetos Complejos**

```typescript
// ===== UTILITIES PARA NAVEGACIÓN PROFUNDA =====

// Deep keys - obtener todas las keys anidadas
type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${DeepKeys<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

type UserProfileKeys = DeepKeys<UserProfile>;
// Result: "id" | "userId" | "personal" | "personal.firstName" | "personal.lastName" | ...

// Deep value - obtener el tipo de un valor anidado
type DeepValue<T, K extends string> = K extends keyof T
  ? T[K]
  : K extends `${infer P}.${infer S}`
  ? P extends keyof T
    ? DeepValue<T[P], S>
    : never
  : never;

type UserFirstName = DeepValue<UserProfile, 'personal.firstName'>; // string
type UserNotifications = DeepValue<UserProfile, 'preferences.notifications.email'>; // { marketing: boolean; security: boolean; updates: boolean }

// ===== DEEP PARTIAL Y REQUIRED =====
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object | undefined ? DeepRequired<NonNullable<T[P]>> : T[P];
};

// ===== UTILITY PARA ACTUALIZACIONES ANIDADAS =====
type UpdateInput<T> = DeepPartial<T> & {
  readonly id?: never; // No permitir cambiar ID
  readonly createdAt?: never; // No permitir cambiar createdAt
};

// Service para manejar updates complejos
class ProfileUpdateService {
  async updateProfile(
    userId: UUID, 
    updates: UpdateInput<UserProfile>
  ): Promise<UserProfile> {
    const currentProfile = await this.getProfile(userId);
    
    // Deep merge preservando estructura
    const updatedProfile = this.deepMerge(currentProfile, {
      ...updates,
      updatedAt: new Date() as Timestamp
    });

    return this.saveProfile(updatedProfile);
  }

  private deepMerge<T extends object>(target: T, source: DeepPartial<T>): T {
    const result = { ...target };
    
    for (const key in source) {
      const sourceValue = source[key];
      
      if (sourceValue === undefined) continue;
      
      if (this.isObject(sourceValue) && this.isObject(target[key])) {
        (result as any)[key] = this.deepMerge(target[key] as any, sourceValue);
      } else {
        (result as any)[key] = sourceValue;
      }
    }
    
    return result;
  }

  private isObject(item: any): item is object {
    return item && typeof item === 'object' && !Array.isArray(item) && !(item instanceof Date);
  }

  private async getProfile(userId: UUID): Promise<UserProfile> {
    // Implementation
    return {} as UserProfile;
  }

  private async saveProfile(profile: UserProfile): Promise<UserProfile> {
    // Implementation
    return profile;
  }
}
```

---

## Enums y Uniones Literales {#enums-uniones}

### 🎯 **Enums vs String Literals: La Batalla Definitiva**

```typescript
// ===== ENUMS TRADICIONALES =====
enum OrderStatus {
  Draft = 'draft',
  PendingPayment = 'pending_payment',
  Paid = 'paid',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
  Refunded = 'refunded'
}

// Problema: Los enums generan código JavaScript
console.log(OrderStatus.Draft); // 'draft'
console.log(OrderStatus[OrderStatus.Draft]); // undefined en string enums

// Ventajas de enums:
// ✅ Autocompletado
// ✅ Refactoring seguro
// ✅ Namespace
// ❌ Bundle size
// ❌ Comportamiento extraño en runtime

// ===== STRING LITERAL UNIONS (RECOMENDADO) =====
type OrderStatus = 
  | 'draft'
  | 'pending_payment'
  | 'paid'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

// Crear objeto para tener lo mejor de ambos mundos
const OrderStatus = {
  DRAFT: 'draft',
  PENDING_PAYMENT: 'pending_payment',
  PAID: 'paid',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
} as const;

type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

// Ahora tienes:
// ✅ No genera código JavaScript extra
// ✅ Autocompletado
// ✅ Type safety
// ✅ Namespace-like access
```

### 🎯 **Patrones Avanzados con Enums y Literales**

```typescript
// ===== CONST ASSERTIONS PARA CONFIGURACIONES =====
const API_ENDPOINTS = {
  USERS: '/api/v1/users',
  ORDERS: '/api/v1/orders',
  PRODUCTS: '/api/v1/products',
  PAYMENTS: '/api/v1/payments'
} as const;

type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;
type HttpMethod = typeof HTTP_METHODS[number];

// ===== DISCRIMINATED UNIONS CON ENUMS/LITERALS =====
const EventType = {
  USER_CREATED: 'user_created',
  USER_UPDATED: 'user_updated',
  USER_DELETED: 'user_deleted',
  ORDER_PLACED: 'order_placed',
  ORDER_SHIPPED: 'order_shipped',
  PAYMENT_RECEIVED: 'payment_received'
} as const;

type EventType = typeof EventType[keyof typeof EventType];

// Eventos tipados por discriminated union
type UserCreatedEvent = {
  type: typeof EventType.USER_CREATED;
  timestamp: Date;
  userId: string;
  userData: CreateUserRequest;
};

type UserUpdatedEvent = {
  type: typeof EventType.USER_UPDATED;
  timestamp: Date;
  userId: string;
  changes: Partial<User>;
  previousData: User;
};

type OrderPlacedEvent = {
  type: typeof EventType.ORDER_PLACED;
  timestamp: Date;
  orderId: string;
  customerId: string;
  total: Money;
};

type DomainEvent = 
  | UserCreatedEvent
  | UserUpdatedEvent
  | OrderPlacedEvent;

// Event handler tipado
function handleDomainEvent(event: DomainEvent): void {
  switch (event.type) {
    case EventType.USER_CREATED:
      // event es automáticamente UserCreatedEvent
      console.log(`New user created: ${event.userId}`);
      console.log(`Email: ${event.userData.email}`);
      break;
      
    case EventType.USER_UPDATED:
      // event es automáticamente UserUpdatedEvent
      console.log(`User ${event.userId} updated`);
      console.log('Changes:', event.changes);
      break;
      
    case EventType.ORDER_PLACED:
      // event es automáticamente OrderPlacedEvent
      console.log(`New order: ${event.orderId} for $${event.total.amount}`);
      break;
      
    default:
      // Exhaustiveness checking
      const _exhaustive: never = event;
      throw new Error(`Unhandled event type: ${(_exhaustive as any).type}`);
  }
}

// ===== FEATURE FLAGS CON LITERALES =====
const FEATURES = {
  NEW_CHECKOUT: 'new_checkout',
  ADVANCED_SEARCH: 'advanced_search',
  DARK_MODE: 'dark_mode',
  BETA_FEATURES: 'beta_features'
} as const;

type FeatureFlag = typeof FEATURES[keyof typeof FEATURES];

type FeatureConfig = {
  [K in FeatureFlag]: {
    enabled: boolean;
    rolloutPercentage?: number;
    userGroups?: string[];
    expiredAt?: Date;
  };
};

class FeatureManager {
  constructor(private config: FeatureConfig) {}

  isEnabled(feature: FeatureFlag, userId?: string): boolean {
    const featureConfig = this.config[feature];
    
    if (!featureConfig.enabled) {
      return false;
    }

    if (featureConfig.expiredAt && new Date() > featureConfig.expiredAt) {
      return false;
    }

    if (featureConfig.rolloutPercentage !== undefined) {
      // Simplified rollout logic
      return Math.random() < (featureConfig.rolloutPercentage / 100);
    }

    return true;
  }
  
  getEnabledFeatures(userId?: string): FeatureFlag[] {
    return Object.keys(FEATURES).filter(feature => 
      this.isEnabled(feature as FeatureFlag, userId)
    ) as FeatureFlag[];
  }
}

// ===== PERMISSIONS Y ROLES =====
const PERMISSIONS = {
  // User permissions
  READ_USERS: 'read_users',
  WRITE_USERS: 'write_users',
  DELETE_USERS: 'delete_users',
  
  // Order permissions
  READ_ORDERS: 'read_orders',
  WRITE_ORDERS: 'write_orders',
  CANCEL_ORDERS: 'cancel_orders',
  REFUND_ORDERS: 'refund_orders',
  
  // Admin permissions
  MANAGE_SYSTEM: 'manage_system',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_FEATURES: 'manage_features'
} as const;

type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

const ROLES = {
  CUSTOMER: 'customer',
  SUPPORT: 'support',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
} as const;

type Role = typeof ROLES[keyof typeof ROLES];

// Role-Permission mapping
type RolePermissions = {
  [ROLES.CUSTOMER]: typeof PERMISSIONS.READ_ORDERS;
  [ROLES.SUPPORT]: 
    | typeof PERMISSIONS.READ_USERS 
    | typeof PERMISSIONS.READ_ORDERS 
    | typeof PERMISSIONS.CANCEL_ORDERS;
  [ROLES.ADMIN]: 
    | typeof PERMISSIONS.READ_USERS 
    | typeof PERMISSIONS.WRITE_USERS 
    | typeof PERMISSIONS.READ_ORDERS 
    | typeof PERMISSIONS.WRITE_ORDERS 
    | typeof PERMISSIONS.CANCEL_ORDERS 
    | typeof PERMISSIONS.VIEW_ANALYTICS;
  [ROLES.SUPER_ADMIN]: Permission; // All permissions
};

class AuthorizationService {
  private rolePermissions: Record<Role, Permission[]> = {
    [ROLES.CUSTOMER]: [PERMISSIONS.READ_ORDERS],
    [ROLES.SUPPORT]: [
      PERMISSIONS.READ_USERS, 
      PERMISSIONS.READ_ORDERS, 
      PERMISSIONS.CANCEL_ORDERS
    ],
    [ROLES.ADMIN]: [
      PERMISSIONS.READ_USERS,
      PERMISSIONS.WRITE_USERS,
      PERMISSIONS.READ_ORDERS,
      PERMISSIONS.WRITE_ORDERS,
      PERMISSIONS.CANCEL_ORDERS,
      PERMISSIONS.VIEW_ANALYTICS
    ],
    [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS)
  };

  hasPermission(userRole: Role, permission: Permission): boolean {
    return this.rolePermissions[userRole].includes(permission);
  }

  getPermissions(role: Role): Permission[] {
    return this.rolePermissions[role];
  }

  // Type-safe permission checker
  canPerformAction<T extends Permission>(
    userRole: Role, 
    action: T
  ): userRole is RolePermissions[keyof RolePermissions] extends T ? Role : never {
    return this.hasPermission(userRole, action);
  }
}
```

### 🎯 **Enums Numéricos: Cuándo Son Útiles**

```typescript
// ===== CASOS VÁLIDOS PARA NUMERIC ENUMS =====

// 1. FLAGS/BITWISE OPERATIONS
enum FilePermissions {
  None = 0,
  Read = 1 << 0,    // 1
  Write = 1 << 1,   // 2
  Execute = 1 << 2  // 4
}

// Combinar permisos
const readWrite = FilePermissions.Read | FilePermissions.Write; // 3
const allPermissions = FilePermissions.Read | FilePermissions.Write | FilePermissions.Execute; // 7

function hasPermission(userPermissions: number, required: FilePermissions): boolean {
  return (userPermissions & required) === required;
}

console.log(hasPermission(readWrite, FilePermissions.Read)); // true
console.log(hasPermission(readWrite, FilePermissions.Execute)); // false

// 2. ESTADOS CON ORDEN LÓGICO
enum ProcessingStep {
  NotStarted,    // 0
  Initializing,  // 1
  Processing,    // 2
  Validating,    // 3
  Completed,     // 4
  Failed = -1
}

function canAdvanceToStep(current: ProcessingStep, target: ProcessingStep): boolean {
  if (current === ProcessingStep.Failed) return false;
  return target > current && target !== ProcessingStep.Failed;
}

// 3. PRIORITY LEVELS
enum Priority {
  Critical = 1,
  High = 2,
  Medium = 3,
  Low = 4
}

function shouldProcessFirst(a: Priority, b: Priority): boolean {
  return a < b; // Lower number = higher priority
}

// ===== MIXED ENUMS (AVOID) =====
// ❌ No hagas esto
enum BadExample {
  StringValue = 'string',
  NumberValue = 42,
  BooleanValue = true // Error!
}
```

### 🎯 **Template Literal Types con Enums**

```typescript
// ===== GENERAR TIPOS DINÁMICOS CON TEMPLATES =====

const MODULES = {
  USER: 'user',
  ORDER: 'order',
  PRODUCT: 'product',
  PAYMENT: 'payment'
} as const;

type Module = typeof MODULES[keyof typeof MODULES];

const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
} as const;

type Action = typeof ACTIONS[keyof typeof ACTIONS];

// Generar todos los permisos posibles
type Permission = `${Module}:${Action}`;
// Result: 
// | "user:create" | "user:read" | "user:update" | "user:delete"
// | "order:create" | "order:read" | "order:update" | "order:delete"
// | "product:create" | "product:read" | "product:update" | "product:delete"
// | "payment:create" | "payment:read" | "payment:update" | "payment:delete"

// Event names con template literals
type ModuleEvent<T extends Module> = `${T}:${Action}`;
type UserEvents = ModuleEvent<'user'>; // "user:create" | "user:read" | "user:update" | "user:delete"

// API endpoints
type ApiEndpoint<T extends Module> = `/api/v1/${T}`;
type ModuleEndpoints = {
  [K in Module]: ApiEndpoint<K>;
};

const endpoints: ModuleEndpoints = {
  user: '/api/v1/user',
  order: '/api/v1/order',
  product: '/api/v1/product',
  payment: '/api/v1/payment'
};

// CSS classes dinámicas
const THEMES = ['light', 'dark'] as const;
const SIZES = ['sm', 'md', 'lg', 'xl'] as const;
const VARIANTS = ['primary', 'secondary', 'success', 'danger'] as const;

type Theme = typeof THEMES[number];
type Size = typeof SIZES[number];
type Variant = typeof VARIANTS[number];

type ButtonClass = `btn-${Variant}` | `btn-${Size}` | `theme-${Theme}`;
// Result: "btn-primary" | "btn-secondary" | "btn-success" | "btn-danger" | "btn-sm" | "btn-md" | "btn-lg" | "btn-xl" | "theme-light" | "theme-dark"

type ComponentProps = {
  variant?: Variant;
  size?: Size;
  theme?: Theme;
  className?: ButtonClass;
};
```

---

## PROYECTO 2: Sistema de Usuarios con Roles {#proyecto-2-usuarios}

### 🎯 **Objetivo**: Aplicar interfaces, enums y objetos complejos en un sistema real

**Especificaciones del Sistema:**
- Sistema de usuarios multi-rol con permisos granulares
- Autenticación y autorización completa
- Auditoría de acciones
- API REST tipada
- Validaciones complejas

```typescript
// ===== DOMAIN TYPES =====
// src/types/auth.ts

const USER_ROLES = {
  CUSTOMER: 'customer',
  EMPLOYEE: 'employee',
  MANAGER: 'manager',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
} as const;

type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

const PERMISSIONS = {
  // User management
  USER_READ: 'user:read',
  USER_CREATE: 'user:create',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_SUSPEND: 'user:suspend',
  
  // Profile management
  PROFILE_READ_OWN: 'profile:read:own',
  PROFILE_READ_ANY: 'profile:read:any',
  PROFILE_UPDATE_OWN: 'profile:update:own',
  PROFILE_UPDATE_ANY: 'profile:update:any',
  
  // System management
  SYSTEM_CONFIG: 'system:config',
  SYSTEM_LOGS: 'system:logs',
  SYSTEM_BACKUP: 'system:backup',
  
  // Audit
  AUDIT_READ: 'audit:read',
  AUDIT_EXPORT: 'audit:export'
} as const;

type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Role-Permission mapping
type RolePermissions = {
  [USER_ROLES.CUSTOMER]: [
    typeof PERMISSIONS.PROFILE_READ_OWN,
    typeof PERMISSIONS.PROFILE_UPDATE_OWN
  ];
  
  [USER_ROLES.EMPLOYEE]: [
    typeof PERMISSIONS.PROFILE_READ_OWN,
    typeof PERMISSIONS.PROFILE_UPDATE_OWN,
    typeof PERMISSIONS.USER_READ
  ];
  
  [USER_ROLES.MANAGER]: [
    typeof PERMISSIONS.PROFILE_READ_OWN,
    typeof PERMISSIONS.PROFILE_UPDATE_OWN,
    typeof PERMISSIONS.PROFILE_READ_ANY,
    typeof PERMISSIONS.USER_READ,
    typeof PERMISSIONS.USER_CREATE,
    typeof PERMISSIONS.USER_UPDATE,
    typeof PERMISSIONS.AUDIT_READ
  ];
  
  [USER_ROLES.ADMIN]: [
    ...RolePermissions[typeof USER_ROLES.MANAGER],
    typeof PERMISSIONS.USER_DELETE,
    typeof PERMISSIONS.USER_SUSPEND,
    typeof PERMISSIONS.PROFILE_UPDATE_ANY,
    typeof PERMISSIONS.SYSTEM_CONFIG,
    typeof PERMISSIONS.AUDIT_EXPORT
  ];
  
  [USER_ROLES.SUPER_ADMIN]: Permission[]; // All permissions
};
```

**Entidades del Sistema:**

```typescript
// ===== CORE ENTITIES =====
// src/types/user.ts

type UserId = string & { readonly brand: unique symbol };
type SessionId = string & { readonly brand: unique symbol };
type AuditId = string & { readonly brand: unique symbol };

interface BaseEntity {
  readonly id: string;
  readonly createdAt: Date;
  updatedAt: Date;
  readonly version: number; // Para optimistic locking
}

interface User extends BaseEntity {
  readonly id: UserId;
  
  // Authentication
  email: Email;
  username: string;
  passwordHash: string;
  emailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  
  // Profile
  profile: UserProfile;
  
  // Authorization
  role: UserRole;
  permissions: Permission[];
  customPermissions?: Permission[]; // Additional permissions beyond role
  
  // Status
  status: 'active' | 'inactive' | 'suspended' | 'pending_verification';
  
  // Security
  failedLoginAttempts: number;
  lastFailedLoginAt?: Date;
  lockedUntil?: Date;
  lastLoginAt?: Date;
  lastActiveAt?: Date;
  
  // Audit
  createdBy: UserId;
  updatedBy: UserId;
}

interface UserSession extends BaseEntity {
  readonly id: SessionId;
  userId: UserId;
  token: string;
  refreshToken: string;
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
  lastActivityAt: Date;
}

interface AuditLog extends BaseEntity {
  readonly id: AuditId;
  
  // Who
  userId?: UserId;
  sessionId?: SessionId;
  ipAddress: string;
  userAgent: string;
  
  // What
  action: string;
  resource: string;
  resourceId?: string;
  
  // When & Where
  timestamp: Date;
  
  // Details
  details: {
    before?: any;
    after?: any;
    metadata?: Record<string, any>;
  };
  
  // Result
  success: boolean;
  errorMessage?: string;
}

// ===== REQUEST/RESPONSE TYPES =====
interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  role: UserRole;
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
    department?: string;
  };
}

interface UpdateUserRequest {
  email?: string;
  username?: string;
  role?: UserRole;
  status?: User['status'];
  profile?: Partial<UserProfile>;
  customPermissions?: Permission[];
}

interface LoginRequest {
  emailOrUsername: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResponse {
  user: Omit<User, 'passwordHash'>;
  session: {
    token: string;
    refreshToken: string;
    expiresAt: Date;
  };
  permissions: Permission[];
}

// ===== VALIDATION SCHEMAS =====
interface ValidationRule<T> {
  field: keyof T;
  rules: Array<{
    type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
    value?: any;
    message: string;
    validator?: (value: any) => boolean;
  }>;
}

const USER_VALIDATION_RULES: ValidationRule<CreateUserRequest>[] = [
  {
    field: 'email',
    rules: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
    ]
  },
  {
    field: 'username',
    rules: [
      { type: 'required', message: 'Username is required' },
      { type: 'minLength', value: 3, message: 'Username must be at least 3 characters' },
      { type: 'maxLength', value: 30, message: 'Username cannot exceed 30 characters' },
      { type: 'pattern', value: /^[a-zA-Z0-9_-]+$/, message: 'Username can only contain letters, numbers, underscores, and hyphens' }
    ]
  },
  {
    field: 'password',
    rules: [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' },
      { 
        type: 'custom', 
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        validator: (password: string) => {
          const hasUpper = /[A-Z]/.test(password);
          const hasLower = /[a-z]/.test(password);
          const hasNumber = /\d/.test(password);
          const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
          return hasUpper && hasLower && hasNumber && hasSpecial;
        }
      }
    ]
  }
];
```

**Repository Layer:**

```typescript
// ===== REPOSITORIES =====
// src/repositories/UserRepository.ts

interface UserRepository {
  // CRUD operations
  findById(id: UserId): AsyncResult<User>;
  findByEmail(email: Email): AsyncResult<User>;
  findByUsername(username: string): AsyncResult<User>;
  findAll(filters?: UserFilters): AsyncResult<User[]>;
  create(userData: CreateUserRequest): AsyncResult<User>;
  update(id: UserId, updates: UpdateUserRequest): AsyncResult<User>;
  delete(id: UserId): AsyncResult<void>;
  
  // Authentication specific
  findByEmailOrUsername(identifier: string): AsyncResult<User>;
  updateLoginAttempts(id: UserId, attempts: number): AsyncResult<void>;
  lockAccount(id: UserId, until: Date): AsyncResult<void>;
  unlockAccount(id: UserId): AsyncResult<void>;
  
  // Status management
  activate(id: UserId): AsyncResult<User>;
  suspend(id: UserId, reason: string): AsyncResult<User>;
  
  // Permissions
  addCustomPermission(id: UserId, permission: Permission): AsyncResult<void>;
  removeCustomPermission(id: UserId, permission: Permission): AsyncResult<void>;
  getUserPermissions(id: UserId): AsyncResult<Permission[]>;
}

type UserFilters = {
  role?: UserRole;
  status?: User['status'];
  department?: string;
  searchTerm?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  lastActiveAfter?: Date;
  limit?: number;
  offset?: number;
};

class InMemoryUserRepository implements UserRepository {
  private users: Map<UserId, User> = new Map();
  private emailIndex: Map<string, UserId> = new Map();
  private usernameIndex: Map<string, UserId> = new Map();

  private generateUserId(): UserId {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` as UserId;
  }

  private async safeOperation<T>(operation: () => T | Promise<T>): AsyncResult<T> {
    try {
      const result = await operation();
      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error : new Error(String(error)) 
      };
    }
  }

  async findById(id: UserId): AsyncResult<User> {
    return this.safeOperation(() => {
      const user = this.users.get(id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      return user;
    });
  }

  async findByEmail(email: Email): AsyncResult<User> {
    return this.safeOperation(() => {
      const userId = this.emailIndex.get(email);
      if (!userId) {
        throw new Error(`User with email ${email} not found`);
      }
      return this.users.get(userId)!;
    });
  }

  async findByUsername(username: string): AsyncResult<User> {
    return this.safeOperation(() => {
      const userId = this.usernameIndex.get(username.toLowerCase());
      if (!userId) {
        throw new Error(`User with username ${username} not found`);
      }
      return this.users.get(userId)!;
    });
  }

  async findByEmailOrUsername(identifier: string): AsyncResult<User> {
    // Try email first
    const emailResult = await this.findByEmail(identifier as Email);
    if (emailResult.success) {
      return emailResult;
    }
    
    // Then try username
    return this.findByUsername(identifier);
  }

  async create(userData: CreateUserRequest): AsyncResult<User> {
    return this.safeOperation(async () => {
      // Check for existing email
      const existingByEmail = await this.findByEmail(userData.email as Email);
      if (existingByEmail.success) {
        throw new Error('Email already in use');
      }

      // Check for existing username
      const existingByUsername = await this.findByUsername(userData.username);
      if (existingByUsername.success) {
        throw new Error('Username already in use');
      }

      const now = new Date();
      const userId = this.generateUserId();
      const passwordHash = await this.hashPassword(userData.password);

      const user: User = {
        id: userId,
        email: userData.email as Email,
        username: userData.username,
        passwordHash,
        emailVerified: false,
        profile: {
          id: `profile_${userId}` as UUID,
          userId,
          personal: {
            firstName: userData.profile.firstName,
            lastName: userData.profile.lastName,
            displayName: `${userData.profile.firstName} ${userData.profile.lastName}`
          },
          contact: {
            primaryEmail: userData.email as Email,
            secondaryEmails: [],
            phones: userData.profile.phone ? { primary: userData.profile.phone as PhoneNumber } : {},
            preferredContactMethod: 'email',
            timezone: 'UTC'
          },
          addresses: {},
          professional: userData.profile.department ? {
            company: 'Company Name',
            position: 'Employee',
            industry: 'Technology',
            skills: []
          } : undefined,
          preferences: {
            theme: 'system',
            language: 'en',
            currency: 'USD',
            notifications: {
              email: { marketing: false, security: true, updates: true },
              push: { enabled: true, marketing: false, security: true },
              sms: { enabled: false, security: false }
            },
            privacy: {
              profileVisibility: 'private',
              showEmail: false,
              showPhone: false,
              allowSearchEngineIndexing: false
            }
          },
          createdAt: now as Timestamp,
          updatedAt: now as Timestamp,
          lastActiveAt: now as Timestamp
        },
        role: userData.role,
        permissions: this.getRolePermissions(userData.role),
        status: 'pending_verification',
        failedLoginAttempts: 0,
        createdAt: now,
        updatedAt: now,
        version: 1,
        createdBy: userId, // Self-created
        updatedBy: userId
      };

      this.users.set(userId, user);
      this.emailIndex.set(userData.email, userId);
      this.usernameIndex.set(userData.username.toLowerCase(), userId);

      return user;
    });
  }

  async update(id: UserId, updates: UpdateUserRequest): AsyncResult<User> {
    return this.safeOperation(() => {
      const user = this.users.get(id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }

      // Handle email update
      if (updates.email && updates.email !== user.email) {
        this.emailIndex.delete(user.email);
        this.emailIndex.set(updates.email, id);
      }

      // Handle username update
      if (updates.username && updates.username !== user.username) {
        this.usernameIndex.delete(user.username.toLowerCase());
        this.usernameIndex.set(updates.username.toLowerCase(), id);
      }

      // Handle role change - update permissions
      let newPermissions = user.permissions;
      if (updates.role && updates.role !== user.role) {
        newPermissions = this.getRolePermissions(updates.role);
      }

      const updatedUser: User = {
        ...user,
        ...updates,
        permissions: newPermissions,
        customPermissions: updates.customPermissions ?? user.customPermissions,
        updatedAt: new Date(),
        version: user.version + 1
      };

      this.users.set(id, updatedUser);
      return updatedUser;
    });
  }

  private getRolePermissions(role: UserRole): Permission[] {
    const rolePermissions: Record<UserRole, Permission[]> = {
      [USER_ROLES.CUSTOMER]: [
        PERMISSIONS.PROFILE_READ_OWN,
        PERMISSIONS.PROFILE_UPDATE_OWN
      ],
      [USER_ROLES.EMPLOYEE]: [
        PERMISSIONS.PROFILE_READ_OWN,
        PERMISSIONS.PROFILE_UPDATE_OWN,
        PERMISSIONS.USER_READ
      ],
      [USER_ROLES.MANAGER]: [
        PERMISSIONS.PROFILE_READ_OWN,
        PERMISSIONS.PROFILE_UPDATE_OWN,
        PERMISSIONS.PROFILE_READ_ANY,
        PERMISSIONS.USER_READ,
        PERMISSIONS.USER_CREATE,
        PERMISSIONS.USER_UPDATE,
        PERMISSIONS.AUDIT_READ
      ],
      [USER_ROLES.ADMIN]: [
        PERMISSIONS.PROFILE_READ_OWN,
        PERMISSIONS.PROFILE_UPDATE_OWN,
        PERMISSIONS.PROFILE_READ_ANY,
        PERMISSIONS.PROFILE_UPDATE_ANY,
        PERMISSIONS.USER_READ,
        PERMISSIONS.USER_CREATE,
        PERMISSIONS.USER_UPDATE,
        PERMISSIONS.USER_DELETE,
        PERMISSIONS.USER_SUSPEND,
        PERMISSIONS.SYSTEM_CONFIG,
        PERMISSIONS.AUDIT_READ,
        PERMISSIONS.AUDIT_EXPORT
      ],
      [USER_ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS)
    };

    return rolePermissions[role];
  }

  private async hashPassword(password: string): Promise<string> {
    // In real implementation, use bcrypt or similar
    return `hashed_${password}`;
  }

  // Implement other methods...
  async findAll(filters: UserFilters = {}): AsyncResult<User[]> {
    return this.safeOperation(() => {
      let users = Array.from(this.users.values());

      // Apply filters
      if (filters.role) {
        users = users.filter(user => user.role === filters.role);
      }

      if (filters.status) {
        users = users.filter(user => user.status === filters.status);
      }

      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        users = users.filter(user => 
          user.username.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.profile.personal.firstName.toLowerCase().includes(term) ||
          user.profile.personal.lastName.toLowerCase().includes(term)
        );
      }

      // Apply pagination
      if (filters.offset) {
        users = users.slice(filters.offset);
      }

      if (filters.limit) {
        users = users.slice(0, filters.limit);
      }

      return users;
    });
  }

  async getUserPermissions(id: UserId): AsyncResult<Permission[]> {
    return this.safeOperation(() => {
      const user = this.users.get(id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }

      // Combine role permissions with custom permissions
      const allPermissions = [
        ...user.permissions,
        ...(user.customPermissions || [])
      ];

      // Remove duplicates
      return Array.from(new Set(allPermissions));
    });
  }

  // ... implement remaining methods
}
```

**Service Layer con Lógica de Negocio:**

```typescript
// ===== SERVICES =====
// src/services/AuthService.ts

class AuthService {
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCK_DURATION_MINUTES = 15;

  constructor(
    private userRepository: UserRepository,
    private sessionRepository: SessionRepository,
    private auditService: AuditService,
    private validationService: ValidationService
  ) {}

  async register(request: CreateUserRequest): AsyncResult<User> {
    // Validate request
    const validationResult = this.validationService.validate(request, USER_VALIDATION_RULES);
    if (!validationResult.success) {
      return validationResult;
    }

    // Create user
    const userResult = await this.userRepository.create(request);
    
    if (userResult.success) {
      // Log audit event
      await this.auditService.log({
        action: 'USER_REGISTERED',
        resource: 'user',
        resourceId: userResult.data.id,
        details: {
          after: this.sanitizeUser(userResult.data),
          metadata: { registrationMethod: 'email' }
        },
        success: true,
        ipAddress: 'unknown', // Would come from request context
        userAgent: 'unknown'
      });

      // Send verification email (would be async)
      // await this.emailService.sendVerificationEmail(userResult.data);
    }

    return userResult;
  }

  async login(request: LoginRequest, context: { ipAddress: string; userAgent: string }): AsyncResult<LoginResponse> {
    try {
      // Find user
      const userResult = await this.userRepository.findByEmailOrUsername(request.emailOrUsername);
      
      if (!userResult.success) {
        await this.auditService.log({
          action: 'LOGIN_FAILED',
          resource: 'auth',
          details: { metadata: { reason: 'user_not_found', identifier: request.emailOrUsername } },
          success: false,
          ipAddress: context.ipAddress,
          userAgent: context.userAgent
        });
        return { success: false, error: new Error('Invalid credentials') };
      }

      const user = userResult.data;

      // Check if account is locked
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        await this.auditService.log({
          action: 'LOGIN_FAILED',
          resource: 'auth',
          resourceId: user.id,
          details: { metadata: { reason: 'account_locked' } },
          success: false,
          ipAddress: context.ipAddress,
          userAgent: context.userAgent
        });
        return { success: false, error: new Error('Account is temporarily locked') };
      }

      // Verify password
      const isPasswordValid = await this.verifyPassword(request.password, user.passwordHash);
      
      if (!isPasswordValid) {
        // Increment failed attempts
        const newAttempts = user.failedLoginAttempts + 1;
        let lockedUntil: Date | undefined;

        if (newAttempts >= this.MAX_LOGIN_ATTEMPTS) {
          lockedUntil = new Date();
          lockedUntil.setMinutes(lockedUntil.getMinutes() + this.LOCK_DURATION_MINUTES);
          await this.userRepository.lockAccount(user.id, lockedUntil);
        }

        await this.userRepository.updateLoginAttempts(user.id, newAttempts);

        await this.auditService.log({
          action: 'LOGIN_FAILED',
          resource: 'auth',
          resourceId: user.id,
          details: { 
            metadata: { 
              reason: 'invalid_password',
              failedAttempts: newAttempts,
              locked: !!lockedUntil
            }
          },
          success: false,
          ipAddress: context.ipAddress,
          userAgent: context.userAgent
        });

        return { success: false, error: new Error('Invalid credentials') };
      }

      // Check account status
      if (user.status !== 'active') {
        await this.auditService.log({
          action: 'LOGIN_FAILED',
          resource: 'auth',
          resourceId: user.id,
          details: { metadata: { reason: 'account_inactive', status: user.status } },
          success: false,
          ipAddress: context.ipAddress,
          userAgent: context.userAgent
        });
        return { success: false, error: new Error('Account is not active') };
      }

      // Reset failed attempts on successful login
      if (user.failedLoginAttempts > 0) {
        await this.userRepository.updateLoginAttempts(user.id, 0);
        if (user.lockedUntil) {
          await this.userRepository.unlockAccount(user.id);
        }
      }

      // Create session
      const session = await this.createSession(user.id, context, request.rememberMe);
      
      // Get all permissions
      const permissionsResult = await this.userRepository.getUserPermissions(user.id);
      const permissions = permissionsResult.success ? permissionsResult.data : [];

      // Update last login
      await this.userRepository.update(user.id, { 
        lastLoginAt: new Date(),
        lastActiveAt: new Date()
      });

      await this.auditService.log({
        action: 'LOGIN_SUCCESS',
        resource: 'auth',
        resourceId: user.id,
        userId: user.id,
        sessionId: session.id,
        details: { metadata: { loginMethod: 'password' } },
        success: true,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent
      });

      const response: LoginResponse = {
        user: this.sanitizeUser(user),
        session: {
          token: session.token,
          refreshToken: session.refreshToken,
          expiresAt: session.expiresAt
        },
        permissions
      };

      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  private async createSession(
    userId: UserId, 
    context: { ipAddress: string; userAgent: string },
    rememberMe = false
  ): Promise<UserSession> {
    const now = new Date();
    const expiresAt = new Date(now);
    
    // Remember me sessions last 30 days, regular sessions last 24 hours
    const hoursToAdd = rememberMe ? 24 * 30 : 24;
    expiresAt.setHours(expiresAt.getHours() + hoursToAdd);

    const session: UserSession = {
      id: this.generateSessionId(),
      userId,
      token: this.generateToken(),
      refreshToken: this.generateToken(),
      expiresAt,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      isActive: true,
      lastActivityAt: now,
      createdAt: now,
      updatedAt: now,
      version: 1
    };

    // In real implementation, save to session repository
    return session;
  }

  private sanitizeUser(user: User): Omit<User, 'passwordHash'> {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }

  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    // In real implementation, use bcrypt.compare
    return hash === `hashed_${password}`;
  }

  private generateSessionId(): SessionId {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` as SessionId;
  }

  private generateToken(): string {
    return `token_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
  }
}

// ===== AUTHORIZATION SERVICE =====
// src/services/AuthorizationService.ts

class AuthorizationService {
  constructor(private userRepository: UserRepository) {}

  async hasPermission(userId: UserId, permission: Permission): AsyncResult<boolean> {
    const permissionsResult = await this.userRepository.getUserPermissions(userId);
    
    if (!permissionsResult.success) {
      return permissionsResult;
    }

    return {
      success: true,
      data: permissionsResult.data.includes(permission)
    };
  }

  async hasAnyPermission(userId: UserId, permissions: Permission[]): AsyncResult<boolean> {
    const userPermissionsResult = await this.userRepository.getUserPermissions(userId);
    
    if (!userPermissionsResult.success) {
      return userPermissionsResult;
    }

    const hasAny = permissions.some(permission => 
      userPermissionsResult.data.includes(permission)
    );

    return { success: true, data: hasAny };
  }

  async hasAllPermissions(userId: UserId, permissions: Permission[]): AsyncResult<boolean> {
    const userPermissionsResult = await this.userRepository.getUserPermissions(userId);
    
    if (!userPermissionsResult.success) {
      return userPermissionsResult;
    }

    const hasAll = permissions.every(permission => 
      userPermissionsResult.data.includes(permission)
    );

    return { success: true, data: hasAll };
  }

  // Resource-specific authorization
  async canAccessUser(requesterId: UserId, targetUserId: UserId): AsyncResult<boolean> {
    if (requesterId === targetUserId) {
      // Users can always access their own data
      return { success: true, data: true };
    }

    // Check if user has permission to read any user
    return this.hasPermission(requesterId, PERMISSIONS.USER_READ);
  }

  async canUpdateUser(requesterId: UserId, targetUserId: UserId): AsyncResult<boolean> {
    if (requesterId === targetUserId) {
      // Users can update their own profile
      return this.hasPermission(requesterId, PERMISSIONS.PROFILE_UPDATE_OWN);
    }

    // Check if user has permission to update any user
    return this.hasPermission(requesterId, PERMISSIONS.USER_UPDATE);
  }

  async canDeleteUser(requesterId: UserId, targetUserId: UserId): AsyncResult<boolean> {
    // Users cannot delete themselves
    if (requesterId === targetUserId) {
      return { success: true, data: false };
    }

    return this.hasPermission(requesterId, PERMISSIONS.USER_DELETE);
  }
}
```

**API Controllers:**

```typescript
// ===== CONTROLLERS =====
// src/controllers/AuthController.ts

interface RequestContext {
  userId?: UserId;
  sessionId?: SessionId;
  permissions?: Permission[];
  ipAddress: string;
  userAgent: string;
}

interface ApiRequest<T = any> {
  body: T;
  params: Record<string, string>;
  query: Record<string, string>;
  context: RequestContext;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: Date;
    requestId: string;
  };
}

class AuthController {
  constructor(
    private authService: AuthService,
    private authorizationService: AuthorizationService,
    private validationService: ValidationService
  ) {}

  async register(request: ApiRequest<CreateUserRequest>): Promise<ApiResponse<User>> {
    const result = await this.authService.register(request.body);
    
    if (result.success) {
      return {
        success: true,
        data: result.data,
        meta: {
          timestamp: new Date(),
          requestId: this.generateRequestId()
        }
      };
    }

    return {
      success: false,
      error: {
        code: 'REGISTRATION_FAILED',
        message: result.error.message
      },
      meta: {
        timestamp: new Date(),
        requestId: this.generateRequestId()
      }
    };
  }

  async login(request: ApiRequest<LoginRequest>): Promise<ApiResponse<LoginResponse>> {
    const context = {
      ipAddress: request.context.ipAddress,
      userAgent: request.context.userAgent
    };

    const result = await this.authService.login(request.body, context);
    
    if (result.success) {
      return {
        success: true,
        data: result.data,
        meta: {
          timestamp: new Date(),
          requestId: this.generateRequestId()
        }
      };
    }

    return {
      success: false,
      error: {
        code: 'LOGIN_FAILED',
        message: result.error.message
      },
      meta: {
        timestamp: new Date(),
        requestId: this.generateRequestId()
      }
    };
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// ===== USER CONTROLLER =====
class UserController {
  constructor(
    private userRepository: UserRepository,
    private authorizationService: AuthorizationService
  ) {}

  async getUsers(request: ApiRequest<never>): Promise<ApiResponse<User[]>> {
    // Check permission
    if (!request.context.userId) {
      return this.unauthorizedResponse();
    }

    const hasPermission = await this.authorizationService.hasPermission(
      request.context.userId, 
      PERMISSIONS.USER_READ
    );

    if (!hasPermission.success || !hasPermission.data) {
      return this.forbiddenResponse();
    }

    // Parse filters from query
    const filters: UserFilters = {
      role: request.query.role as UserRole,
      status: request.query.status as User['status'],
      searchTerm: request.query.search,
      limit: parseInt(request.query.limit) || 10,
      offset: parseInt(request.query.offset) || 0
    };

    const result = await this.userRepository.findAll(filters);

    if (result.success) {
      return {
        success: true,
        data: result.data.map(user => this.sanitizeUser(user)),
        meta: {
          timestamp: new Date(),
          requestId: this.generateRequestId()
        }
      };
    }

    return {
      success: false,
      error: {
        code: 'FETCH_FAILED',
        message: result.error.message
      }
    };
  }

  async getUser(request: ApiRequest<never>): Promise<ApiResponse<User>> {
    const targetUserId = request.params.id as UserId;
    
    if (!request.context.userId) {
      return this.unauthorizedResponse();
    }

    // Check if user can access this user
    const canAccess = await this.authorizationService.canAccessUser(
      request.context.userId, 
      targetUserId
    );

    if (!canAccess.success || !canAccess.data) {
      return this.forbiddenResponse();
    }

    const result = await this.userRepository.findById(targetUserId);

    if (result.success) {
      return {
        success: true,
        data: this.sanitizeUser(result.data)
      };
    }

    return {
      success: false,
      error: {
        code: 'USER_NOT_FOUND',
        message: result.error.message
      }
    };
  }

  async updateUser(request: ApiRequest<UpdateUserRequest>): Promise<ApiResponse<User>> {
    const targetUserId = request.params.id as UserId;
    
    if (!request.context.userId) {
      return this.unauthorizedResponse();
    }

    // Check if user can update this user
    const canUpdate = await this.authorizationService.canUpdateUser(
      request.context.userId, 
      targetUserId
    );

    if (!canUpdate.success || !canUpdate.data) {
      return this.forbiddenResponse();
    }

    const result = await this.userRepository.update(targetUserId, request.body);

    if (result.success) {
      return {
        success: true,
        data: this.sanitizeUser(result.data)
      };
    }

    return {
      success: false,
      error: {
        code: 'UPDATE_FAILED',
        message: result.error.message
      }
    };
  }

  private sanitizeUser(user: User): Omit<User, 'passwordHash'> {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }

  private unauthorizedResponse(): ApiResponse<never> {
    return {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      }
    };
  }

  private forbiddenResponse(): ApiResponse<never> {
    return {
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'Insufficient permissions'
      }
    };
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

**Sistema de Testing Completo:**

```typescript
// ===== TESTS =====
// tests/AuthService.test.ts

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: InMemoryUserRepository;
  let sessionRepository: InMemorySessionRepository;
  let auditService: MockAuditService;
  let validationService: ValidationService;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sessionRepository = new InMemorySessionRepository();
    auditService = new MockAuditService();
    validationService = new ValidationService();
    
    authService = new AuthService(
      userRepository,
      sessionRepository,
      auditService,
      validationService
    );
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const request: CreateUserRequest = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'SecureP@ssw0rd',
        role: USER_ROLES.CUSTOMER,
        profile: {
          firstName: 'Test',
          lastName: 'User'
        }
      };

      const result = await authService.register(request);

      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.email).toBe(request.email);
        expect(result.data.username).toBe(request.username);
        expect(result.data.role).toBe(USER_ROLES.CUSTOMER);
        expect(result.data.status).toBe('pending_verification');
        expect(result.data.profile.personal.firstName).toBe('Test');
        expect(result.data.profile.personal.lastName).toBe('User');
      }

      // Verify audit log was created
      expect(auditService.logs).toHaveLength(1);
      expect(auditService.logs[0].action).toBe('USER_REGISTERED');
    });

    it('should fail with invalid email', async () => {
      const request: CreateUserRequest = {
        email: 'invalid-email',
        username: 'testuser',
        password: 'SecureP@ssw0rd',
        role: USER_ROLES.CUSTOMER,
        profile: {
          firstName: 'Test',
          lastName: 'User'
        }
      };

      const result = await authService.register(request);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toContain('Invalid email format');
      }
    });

    it('should fail with weak password', async () => {
      const request: CreateUserRequest = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'weak',
        role: USER_ROLES.CUSTOMER,
        profile: {
          firstName: 'Test',
          lastName: 'User'
        }
      };

      const result = await authService.register(request);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toContain('Password must be at least 8 characters');
      }
    });

    it('should fail with duplicate email', async () => {
      const request: CreateUserRequest = {
        email: 'test@example.com',
        username: 'testuser1',
        password: 'SecureP@ssw0rd',
        role: USER_ROLES.CUSTOMER,
        profile: { firstName: 'Test', lastName: 'User' }
      };

      // Register first user
      await authService.register(request);

      // Try to register with same email
      const duplicateRequest = { ...request, username: 'testuser2' };
      const result = await authService.register(duplicateRequest);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Email already in use');
      }
    });
  });

  describe('login', () => {
    let testUser: User;

    beforeEach(async () => {
      const registerResult = await authService.register({
        email: 'test@example.com',
        username: 'testuser',
        password: 'SecureP@ssw0rd',
        role: USER_ROLES.CUSTOMER,
        profile: { firstName: 'Test', lastName: 'User' }
      });

      if (registerResult.success) {
        testUser = registerResult.data;
        // Activate user for login tests
        await userRepository.update(testUser.id, { status: 'active' });
      }
    });

    it('should successfully login with email', async () => {
      const request: LoginRequest = {
        emailOrUsername: 'test@example.com',
        password: 'SecureP@ssw0rd'
      };

      const context = {
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent'
      };

      const result = await authService.login(request, context);

      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.user.id).toBe(testUser.id);
        expect(result.data.session.token).toBeDefined();
        expect(result.data.session.refreshToken).toBeDefined();
        expect(result.data.permissions).toContain(PERMISSIONS.PROFILE_READ_OWN);
      }

      // Verify audit log
      const loginLog = auditService.logs.find(log => log.action === 'LOGIN_SUCCESS');
      expect(loginLog).toBeDefined();
    });

    it('should successfully login with username', async () => {
      const request: LoginRequest = {
        emailOrUsername: 'testuser',
        password: 'SecureP@ssw0rd'
      };

      const context = {
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent'
      };

      const result = await authService.login(request, context);

      expect(result.success).toBe(true);
    });

    it('should fail with invalid password', async () => {
      const request: LoginRequest = {
        emailOrUsername: 'test@example.com',
        password: 'wrongpassword'
      };

      const context = {
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent'
      };

      const result = await authService.login(request, context);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Invalid credentials');
      }

      // Verify failed login was logged
      const failLog = auditService.logs.find(log => log.action === 'LOGIN_FAILED');
      expect(failLog).toBeDefined();
    });

    it('should lock account after max failed attempts', async () => {
      const request: LoginRequest = {
        emailOrUsername: 'test@example.com',
        password: 'wrongpassword'
      };

      const context = {
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent'
      };

      // Attempt login 5 times with wrong password
      for (let i = 0; i < 5; i++) {
        await authService.login(request, context);
      }

      // 6th attempt should return account locked
      const result = await authService.login(request, context);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Account is temporarily locked');
      }
    });

    it('should fail for inactive account', async () => {
      // Suspend the user
      await userRepository.update(testUser.id, { status: 'suspended' });

      const request: LoginRequest = {
        emailOrUsername: 'test@example.com',
        password: 'SecureP@ssw0rd'
      };

      const context = {
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent'
      };

      const result = await authService.login(request, context);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Account is not active');
      }
    });
  });
});

// Mock implementations for testing
class MockAuditService {
  logs: AuditLog[] = [];

  async log(event: Omit<AuditLog, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'timestamp'>): Promise<void> {
    const auditLog: AuditLog = {
      id: `audit_${Date.now()}` as AuditId,
      ...event,
      timestamp: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1
    };
    
    this.logs.push(auditLog);
  }
}
```

### 🎯 **Tareas del Proyecto 2:**

1. **Implementar el sistema completo** siguiendo el código anterior
2. **Agregar middleware de autenticación** para proteger endpoints
3. **Crear sistema de recuperación de contraseña** con tokens seguros
4. **Implementar rate limiting** por usuario y por IP
5. **Agregar sistema de roles jerárquico** (un admin puede crear managers, etc.)
6. **Crear dashboard de administración** para gestionar usuarios
7. **Implementar notificaciones** (email, push) para eventos importantes
8. **Agregar sistema de invitaciones** con códigos únicos
9. **Crear API de auditoría** para consultar logs de actividad
10. **Implementar soft delete** y recuperación de usuarios

**Criterios de Evaluación:**
- ✅ Sistema de permisos granular funcional
- ✅ Autenticación y autorización segura
- ✅ Auditoría completa de acciones
- ✅ Validaciones robustas en todos los niveles
- ✅ Tests comprehensivos (>80% coverage)
- ✅ Manejo de errores profesional
- ✅ Código type-safe sin `any`
- ✅ Performance optimizada para operaciones comunes

---

# 🟡 NIVEL 3: GENÉRICOS Y REUTILIZACIÓN

## Genéricos desde Cero hasta Maestría {#genericos-completos}

### 🎯 **Genéricos: El Superpoder de la Reutilización**

Los genéricos son la herramienta más poderosa de TypeScript para crear código reutilizable y type-safe. Te permiten escribir componentes que funcionan con múltiples tipos manteniendo la seguridad de tipos.

```typescript
// ===== FUNDAMENTOS DE GENÉRICOS =====

// Sin genéricos (código duplicado)
function getArrayFirstString(arr: string[]): string | undefined {
  return arr[0];
}

function getArrayFirstNumber(arr: number[]): number | undefined {
  return arr[0];
}

// Con genéricos (reutilizable)
function getArrayFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Usage - TypeScript infiere automáticamente el tipo
const firstString = getArrayFirst(['a', 'b', 'c']); // string | undefined
const firstNumber = getArrayFirst([1, 2, 3]); // number | undefined
const firstUser = getArrayFirst([{ id: 1, name: 'John' }]); // { id: number; name: string } | undefined

// También puedes especificar el tipo explícitamente
const explicitFirst = getArrayFirst<string>(['a', 'b']);
```

### 🎯 **Genéricos con Constraints (Restricciones)**

```typescript
// ===== CONSTRAINTS BÁSICOS =====

// Constraint simple - T debe tener propiedad 'length'
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(`Length: ${arg.length}`);
  return arg;
}

logLength('Hello World'); // ✅ string tiene length
logLength([1, 2, 3, 4]); // ✅ Array tiene length
logLength({ length: 10, value: 'test' }); // ✅ Objeto con length
// logLength(123); // ❌ Error: number no tiene length

// ===== MULTIPLE CONSTRAINTS =====
interface Identifiable {
  id: string | number;
}

interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

// T debe implementar ambas interfaces
function updateEntity<T extends Identifiable & Timestamped>(
  entity: T,
  updates: Partial<Omit<T, 'id' | 'createdAt'>>
): T {
  return {
    ...entity,
    ...updates,
    updatedAt: new Date()
  };
}

// ===== KEYOF CONSTRAINTS =====
// Constraint usando keyof - K debe ser una clave de T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: 'John', age: 30, email: 'john@example.com' };
const name = getProperty(person, 'name'); // string
const age = getProperty(person, 'age'); // number
// const invalid = getProperty(person, 'invalid'); // ❌ Error

// ===== CONDITIONAL CONSTRAINTS =====
// T debe ser un array o string
function reverseArrayOrString<T extends any[] | string>(input: T): T {
  if (typeof input === 'string') {
    return input.split('').reverse().join('') as T;
  }
  return input.slice().reverse() as T;
}

const reversedArray = reverseArrayOrString([1, 2, 3]); // number[]
const reversedString = reverseArrayOrString('hello'); // string
```

### 🎯 **Genéricos Avanzados: Classes y Interfaces**

```typescript
// ===== GENERIC CLASSES =====
class Repository<T extends { id: string | number }> {
  private items: Map<string | number, T> = new Map();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  get(id: T['id']): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }

  update(id: T['id'], updates: Partial<Omit<T, 'id'>>): T | undefined {
    const existing = this.items.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...updates };
    this.items.set(id, updated);
    return updated;
  }

  delete(id: T['id']): boolean {
    return this.items.delete(id);
  }

  find(predicate: (item: T) => boolean): T[] {
    return this.getAll().filter(predicate);
  }

  findOne(predicate: (item: T) => boolean): T | undefined {
    return this.getAll().find(predicate);
  }
}

// Usage con diferentes tipos
interface User {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const userRepo = new Repository<User>();
const productRepo = new Repository<Product>();

userRepo.add({ id: '1', name: 'John', email: 'john@example.com' });
productRepo.add({ id: 1, name: 'Laptop', price: 999.99 });

// ===== GENERIC INTERFACES =====
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  meta: {
    timestamp: Date;
    requestId: string;
  };
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Usage
type UserListResponse = PaginatedResponse<User>;
type SingleUserResponse = ApiResponse<User>;
type LoginResponse = ApiResponse<{
  user: User;
  token: string;
  expiresAt: Date;
}>;

// ===== GENERIC FUNCTIONS CON OVERLOADS =====
interface QueryBuilder<T> {
  where<K extends keyof T>(field: K, value: T[K]): QueryBuilder<T>;
  where<K extends keyof T>(field: K, operator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' | 'ne', value: T[K]): QueryBuilder<T>;
  orderBy<K extends keyof T>(field: K, direction: 'ASC' | 'DESC'): QueryBuilder<T>;
  limit(count: number): QueryBuilder<T>;
  skip(count: number): QueryBuilder<T>;
  execute(): Promise<T[]>;
}

class SQLQueryBuilder<T> implements QueryBuilder<T> {
  private conditions: string[] = [];
  private ordering: string[] = [];
  private limitCount?: number;
  private skipCount?: number;

  constructor(private tableName: string) {}

  where<K extends keyof T>(field: K, valueOrOperator: T[K] | 'gt' | 'lt' | 'gte' | 'lte' | 'eq' | 'ne', value?: T[K]): QueryBuilder<T> {
    if (value !== undefined) {
      // Second overload - with operator
      const operator = valueOrOperator as string;
      const sqlOperator = this.getSQLOperator(operator);
      this.conditions.push(`${String(field)} ${sqlOperator} '${value}'`);
    } else {
      // First overload - direct value
      this.conditions.push(`${String(field)} = '${valueOrOperator}'`);
    }
    return this;
  }

  orderBy<K extends keyof T>(field: K, direction: 'ASC' | 'DESC'): QueryBuilder<T> {
    this.ordering.push(`${String(field)} ${direction}`);
    return this;
  }

  limit(count: number): QueryBuilder<T> {
    this.limitCount = count;
    return this;
  }

  skip(count: number): QueryBuilder<T> {
    this.skipCount = count;
    return this;
  }

  async execute(): Promise<T[]> {
    let sql = `SELECT * FROM ${this.tableName}`;
    
    if (this.conditions.length > 0) {
      sql += ` WHERE ${this.conditions.join(' AND ')}`;
    }
    
    if (this.ordering.length > 0) {
      sql += ` ORDER BY ${this.ordering.join(', ')}`;
    }
    
    if (this.limitCount !== undefined) {
      sql += ` LIMIT ${this.limitCount}`;
    }
    
    if (this.skipCount !== undefined) {
      sql += ` OFFSET ${this.skipCount}`;
    }

    console.log('Executing SQL:', sql);
    
    // Simulated database call
    return [] as T[];
  }

  private getSQLOperator(operator: string): string {
    const mapping: Record<string, string> = {
      'gt': '>',
      'lt': '<',
      'gte': '>=',
      'lte': '<=',
      'eq': '=',
      'ne': '!='
    };
    return mapping[operator] || '=';
  }
}

// Usage
const userQuery = new SQLQueryBuilder<User>('users');

const activeUsers = await userQuery
  .where('name', 'John')
  .where('age', 'gte', 18)  // age >= 18
  .orderBy('createdAt', 'DESC')
  .limit(10)
  .execute();
```

### 🎯 **Genéricos con Conditional Types**

```typescript
// ===== CONDITIONAL TYPES CON GENÉRICOS =====

// Extraer el tipo de retorno de una función
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getString(): string { return 'hello'; }
function getNumber(): number { return 42; }
async function getUser(): Promise<User> { return {} as User; }

type StringReturn = ReturnType<typeof getString>; // string
type NumberReturn = ReturnType<typeof getNumber>; // number
type UserReturn = ReturnType<typeof getUser>; // Promise<User>

// Unwrap Promise type
type Awaited<T> = T extends Promise<infer U> ? U : T;

type AwaitedUser = Awaited<Promise<User>>; // User
type AwaitedString = Awaited<string>; // string (no change)

// ===== DISTRIBUTED CONDITIONAL TYPES =====
// Aplicar transformación a cada miembro de una union
type NonNullable<T> = T extends null | undefined ? never : T;

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string

// ===== CONDITIONAL TYPES COMPLEJOS =====
// Determinar si un tipo es un array
type IsArray<T> = T extends any[] ? true : false;

type ArrayCheck1 = IsArray<string[]>; // true
type ArrayCheck2 = IsArray<string>; // false

// Obtener el tipo de elementos de un array
type ElementType<T> = T extends (infer U)[] ? U : never;

type StringElement = ElementType<string[]>; // string
type NumberElement = ElementType<number[]>; // number

// ===== RECURSIVE CONDITIONAL TYPES =====
// Deep readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface NestedObject {
  name: string;
  details: {
    age: number;
    address: {
      street: string;
      city: string;
    };
  };
  tags: string[];
}

type ReadonlyNested = DeepReadonly<NestedObject>;
// Result:
// {
//   readonly name: string;
//   readonly details: {
//     readonly age: number;
//     readonly address: {
//       readonly street: string;
//       readonly city: string;
//     };
//   };
//   readonly tags: readonly string[];
// }

// ===== GENERIC UTILITY FUNCTIONS =====
// Safe property access con genéricos
function safeGet<T, K1 extends keyof T>(obj: T, key1: K1): T[K1] | undefined;
function safeGet<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  obj: T, 
  key1: K1, 
  key2: K2
): T[K1][K2] | undefined;
function safeGet<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  obj: T, 
  key1: K1, 
  key2: K2, 
  key3: K3
): T[K1][K2][K3] | undefined;
function safeGet(obj: any, ...keys: string[]): any {
  let current = obj;
  for (const key of keys) {
    if (current == null) return undefined;
    current = current[key];
  }
  return current;
}

// Usage
const user = {
  profile: {
    address: {
      city: 'New York'
    }
  }
};

const city = safeGet(user, 'profile', 'address', 'city'); // string | undefined
const invalid = safeGet(user, 'profile', 'invalid'); // undefined (type-safe)
```

### 🎯 **Patrones Avanzados con Genéricos**

```typescript
// ===== GENERIC BUILDER PATTERN =====
class FluentQueryBuilder<T> {
  private conditions: Array<(item: T) => boolean> = [];
  private sortFunctions: Array<(a: T, b: T) => number> = [];
  private limitValue?: number;

  where(predicate: (item: T) => boolean): FluentQueryBuilder<T> {
    this.conditions.push(predicate);
    return this;
  }

  whereField<K extends keyof T>(field: K, value: T[K]): FluentQueryBuilder<T> {
    this.conditions.push(item => item[field] === value);
    return this;
  }

  orderBy<K extends keyof T>(field: K): FluentQueryBuilder<T> {
    this.sortFunctions.push((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
      return 0;
    });
    return this;
  }

  orderByDescending<K extends keyof T>(field: K): FluentQueryBuilder<T> {
    this.sortFunctions.push((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      if (aVal > bVal) return -1;
      if (aVal < bVal) return 1;
      return 0;
    });
    return this;
  }

  take(count: number): FluentQueryBuilder<T> {
    this.limitValue = count;
    return this;
  }

  execute(data: T[]): T[] {
    let result = data;

    // Apply where conditions
    for (const condition of this.conditions) {
      result = result.filter(condition);
    }

    // Apply sorting
    for (const sortFunc of this.sortFunctions) {
      result = result.sort(sortFunc);
    }

    // Apply limit
    if (this.limitValue !== undefined) {
      result = result.slice(0, this.limitValue);
    }

    return result;
  }
}

// Usage
const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com' }
];

const result = new FluentQueryBuilder<User>()
  .whereField('name', 'Alice')
  .orderBy('email')
  .take(5)
  .execute(users);

// ===== GENERIC DECORATOR PATTERN =====
type Constructor<T = {}> = new (...args: any[]) => T;

// Mixin para agregar timestamping
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt = new Date();
    updatedAt = new Date();

    touch() {
      this.updatedAt = new Date();
    }
  };
}

// Mixin para agregar logging
function Loggable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    log(message: string) {
      console.log(`[${this.constructor.name}] ${message}`);
    }
  };
}

// Base class
class Entity {
  constructor(public id: string) {}
}

// Aplicar mixins
const TimestampedEntity = Timestamped(Entity);
const LoggableTimestampedEntity = Loggable(Timestamped(Entity));

// Usage
const entity = new LoggableTimestampedEntity('123');
entity.log('Entity created'); // [LoggableTimestampedEntity] Entity created
entity.touch(); // Updates timestamp
console.log(entity.createdAt, entity.updatedAt);

// ===== GENERIC EVENT SYSTEM =====
interface EventMap {
  [eventName: string]: any[];
}

class TypedEventEmitter<T extends EventMap> {
  private listeners = new Map<keyof T, Array<(...args: any[]) => void>>();

  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): this {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
    return this;
  }

  emit<K extends keyof T>(event: K, ...args: T[K]): boolean {
    const eventListeners = this.listeners.get(event);
    if (!eventListeners) return false;

    eventListeners.forEach(listener => listener(...args));
    return true;
  }

  off<K extends keyof T>(event: K, listener?: (...args: T[K]) => void): this {
    if (!listener) {
      this.listeners.delete(event);
    } else {
      const eventListeners = this.listeners.get(event);
      if (eventListeners) {
        const index = eventListeners.indexOf(listener);
        if (index !== -1) {
          eventListeners.splice(index, 1);
        }
      }
    }
    return this;
  }
}

// Define event types
interface UserEvents {
  'user:created': [User];
  'user:updated': [User, Partial<User>];
  'user:deleted': [string]; // userId
  'error': [Error, string]; // error, context
}

// Usage
const emitter = new TypedEventEmitter<UserEvents>();

emitter.on('user:created', (user) => {
  // user is automatically typed as User
  console.log(`User created: ${user.name}`);
});

emitter.on('user:updated', (user, changes) => {
  // user: User, changes: Partial<User>
  console.log(`User ${user.name} updated`, changes);
});

emitter.emit('user:created', { id: '1', name: 'John', email: 'john@example.com' });
// emitter.emit('user:created', 'invalid'); // ❌ Type error
```

---

## Utility Types - La Caja de Herramientas {#utility-types}

### 🎯 **Built-in Utility Types Masterclass**

TypeScript viene con una colección impresionante de utility types. Dominarlos es esencial para escribir código profesional.

```typescript
// ===== PARTIAL - HACE TODAS LAS PROPIEDADES OPCIONALES =====
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

type PartialUser = Partial<User>;
// Result: {
//   id?: string;
//   name?: string;
//   email?: string;
//   age?: number;
//   isActive?: boolean;
// }

// Útil para updates
function updateUser(id: string, updates: Partial<User>): User {
  const currentUser = getUserById(id);
  return { ...currentUser, ...updates };
}

// Usage
updateUser('1', { name: 'New Name' }); // ✅ Solo name
updateUser('1', { name: 'New Name', age: 30 }); // ✅ name y age
updateUser('1', {}); // ✅ No updates

// ===== REQUIRED - HACE TODAS LAS PROPIEDADES OBLIGATORIAS =====
interface PartialConfig {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}

type CompleteConfig = Required<PartialConfig>;
// Result: {
//   apiUrl: string;
//   timeout: number;
//   retries: number;
// }

function createConfig(config: PartialConfig): CompleteConfig {
  return {
    apiUrl: config.apiUrl ?? 'https://api.default.com',
    timeout: config.timeout ?? 5000,
    retries: config.retries ?? 3
  };
}

// ===== READONLY - HACE TODAS LAS PROPIEDADES READONLY =====
type ReadonlyUser = Readonly<User>;
// Result: {
//   readonly id: string;
//   readonly name: string;
//   readonly email: string;
//   readonly age: number;
//   readonly isActive: boolean;
// }

function freezeUser(user: User): ReadonlyUser {
  return Object.freeze({ ...user });
}

// ===== PICK - SELECCIONA PROPIEDADES ESPECÍFICAS =====
type UserSummary = Pick<User, 'id' | 'name' | 'email'>;
// Result: {
//   id: string;
//   name: string;
//   email: string;
// }

type UserBasics = Pick<User, 'name' | 'email'>;
// Result: {
//   name: string;
//   email: string;
// }

// Útil para DTOs y responses
function getUserSummary(user: User): UserSummary {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

// ===== OMIT - EXCLUYE PROPIEDADES ESPECÍFICAS =====
type CreateUserRequest = Omit<User, 'id'>;
// Result: {
//   name: string;
//   email: string;
//   age: number;
//   isActive: boolean;
// }

type PublicUser = Omit<User, 'email'>;
// Result: {
//   id: string;
//   name: string;
//   age: number;
//   isActive: boolean;
// }

function createUser(userData: CreateUserRequest): User {
  return {
    id: generateId(),
    ...userData
  };
}

// ===== RECORD - CREA UN TIPO CON KEYS Y VALUES ESPECÍFICOS =====
type UserRole = 'admin' | 'user' | 'guest';
type RolePermissions = Record<UserRole, string[]>;
// Result: {
//   admin: string[];
//   user: string[];
//   guest: string[];
// }

const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete', 'manage'],
  user: ['read', 'write'],
  guest: ['read']
};

// Record con keys dinámicas
type ApiEndpoints = Record<string, {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  auth: boolean;
}>;

const endpoints: ApiEndpoints = {
  getUsers: { method: 'GET', url: '/users', auth: true },
  createUser: { method: 'POST', url: '/users', auth: true },
  updateUser: { method: 'PUT', url: '/users/:id', auth: true },
  deleteUser: { method: 'DELETE', url: '/users/:id', auth: true }
};
```

### 🎯 **Utility Types Avanzados y Combinaciones**

```typescript
// ===== EXCLUDE - EXCLUYE TIPOS DE UNA UNIÓN =====
type AllColors = 'red' | 'green' | 'blue' | 'yellow' | 'orange';
type PrimaryColors = Exclude<AllColors, 'yellow' | 'orange'>;
// Result: 'red' | 'green' | 'blue'

type NonStringTypes = Exclude<string | number | boolean | null, string>;
// Result: number | boolean | null

// ===== EXTRACT - EXTRAE TIPOS QUE COINCIDEN =====
type StringOrNumber = Extract<string | number | boolean, string | number>;
// Result: string | number

// ===== NONNULLABLE - EXCLUYE NULL Y UNDEFINED =====
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// Result: string

// ===== COMBINACIONES PODEROSAS =====

// Update type que permite partial updates excepto para ciertos campos
type UpdateUser = Partial<Omit<User, 'id'>> & Pick<User, 'id'>;
// Result: {
//   id: string;           // Required
//   name?: string;        // Optional
//   email?: string;       // Optional
//   age?: number;         // Optional
//   isActive?: boolean;   // Optional
// }

// DTO que excluye campos internos
type UserDTO = Omit<User, 'id'> & {
  id?: string; // ID opcional para creation
};

// Response type que siempre incluye ciertos campos
type ApiSuccessResponse<T> = {
  success: true;
  data: T;
} & Required<Pick<ApiResponse<T>, 'meta'>>;

// ===== UTILITY TYPES PARA FUNCIONES =====

// Extraer parámetros de una función
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

function example(name: string, age: number, isActive: boolean): User {
  return { id: '1', name, email: 'test@example.com', age, isActive };
}

type ExampleParams = Parameters<typeof example>;
// Result: [string, number, boolean]

// Extraer tipo de retorno
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type ExampleReturn = ReturnType<typeof example>;
// Result: User

// Constructor parameters
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;

class UserService {
  constructor(private apiUrl: string, private timeout: number) {}
}

type UserServiceParams = ConstructorParameters<typeof UserService>;
// Result: [string, number]

// Instance type
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;

type UserServiceInstance = InstanceType<typeof UserService>;
// Result: UserService
```

### 🎯 **Custom Utility Types - Creando Tus Propias Herramientas**

```typescript
// ===== DEEP UTILITIES =====

// Deep Partial - hace todos los campos anidados opcionales
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface NestedConfig {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
}

type PartialNestedConfig = DeepPartial<NestedConfig>;
// Result: Everything is optional, including nested properties

// ===== CONDITIONAL UTILITIES =====

// Optional except for specific keys
type OptionalExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type CreateUserData = OptionalExcept<User, 'name' | 'email'>;
// Result: {
//   id?: string;
//   name: string;        // Required
//   email: string;       // Required
//   age?: number;
//   isActive?: boolean;
// }

// Required except for specific keys
type RequiredExcept<T, K extends keyof T> = Required<T> & Partial<Pick<T, K>>;

interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

type SubmittedForm = RequiredExcept<FormData, 'phone' | 'address'>;
// Result: {
//   name: string;        // Required
//   email: string;       // Required
//   phone?: string;      // Still optional
//   address?: string;    // Still optional
// }

// ===== STRING MANIPULATION UTILITIES =====

// Capitalize first letter
type Capitalize<S extends string> = S extends `${infer F}${infer R}` 
  ? `${Uppercase<F>}${R}` 
  : S;

// Uncapitalize first letter
type Uncapitalize<S extends string> = S extends `${infer F}${infer R}` 
  ? `${Lowercase<F>}${R}` 
  : S;

type EventHandlers<T extends Record<string, any>> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (value: T[K]) => void;
};

interface FormFields {
  name: string;
  email: string;
  age: number;
}

type FormEventHandlers = EventHandlers<FormFields>;
// Result: {
//   onName: (value: string) => void;
//   onEmail: (value: string) => void;
//   onAge: (value: number) => void;
// }

// ===== ARRAY UTILITIES =====

// Get first element type
type Head<T extends readonly any[]> = T extends readonly [infer H, ...any[]] ? H : never;

// Get all except first
type Tail<T extends readonly any[]> = T extends readonly [any, ...infer R] ? R : never;

// Get length
type Length<T extends readonly any[]> = T['length'];

type ExampleArray = ['a', 'b', 'c', 'd'];

type FirstElement = Head<ExampleArray>; // 'a'
type RestElements = Tail<ExampleArray>; // ['b', 'c', 'd']
type ArrayLength = Length<ExampleArray>; // 4

// ===== FUNCTION UTILITIES =====

// Create overloaded function types
type Overload<T extends Record<string, (...args: any[]) => any>> = {
  [K in keyof T]: T[K];
}[keyof T];

interface MathOperations {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
  divide: (a: number, b: number) => number;
}

type MathFunction = Overload<MathOperations>;
// Result: Union of all function signatures

// Curry function type
type Curried<T extends (...args: any[]) => any> = T extends (...args: infer A) => infer R
  ? A extends [infer First, ...infer Rest]
    ? (arg: First) => Rest extends []
      ? R
      : Curried<(...args: Rest) => R>
    : () => R
  : never;

function add3(a: number, b: number, c: number): number {
  return a + b + c;
}

type CurriedAdd3 = Curried<typeof add3>;
// Result: (arg: number) => (arg: number) => (arg: number) => number

// ===== OBJECT TRANSFORMATION UTILITIES =====

// Swap keys and values
type Invert<T extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof T as T[K]]: K;
};

const StatusCodes = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
} as const;

type CodeToStatus = Invert<typeof StatusCodes>;
// Result: {
//   200: "OK";
//   404: "NOT_FOUND";
//   500: "SERVER_ERROR";
// }

// Filter keys by value type
type FilterByValue<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

interface MixedObject {
  name: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
  tags: string[];
}

type StringKeys = FilterByValue<MixedObject, string>; // 'name'
type NumberKeys = FilterByValue<MixedObject, number>; // 'age'
type ArrayKeys = FilterByValue<MixedObject, any[]>; // 'tags'

// ===== PRACTICAL UTILITY COMBINATIONS =====

// API Response builder
type ApiResult<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// Safe property access
type SafeAccess<T, K extends keyof T> = T[K] extends undefined 
  ? T[K] | undefined 
  : T[K];

// Merge two object types
type Merge<T, U> = Omit<T, keyof U> & U;

interface BaseUser {
  id: string;
  name: string;
}

interface UserExtras {
  email: string;
  age: number;
}

type CompleteUser = Merge<BaseUser, UserExtras>;
// Result: {
//   id: string;
//   name: string;
//   email: string;
//   age: number;
// }

// Mutable version of readonly type
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type ReadonlyConfig = {
  readonly apiUrl: string;
  readonly timeout: number;
};

type MutableConfig = Mutable<ReadonlyConfig>;
// Result: {
//   apiUrl: string;
//   timeout: number;
// }
```

### 🎯 **Real-World Utility Applications**

```typescript
// ===== FORM HANDLING UTILITIES =====

// Form validation state
type ValidationState<T> = {
  [K in keyof T]: {
    value: T[K];
    error?: string;
    touched: boolean;
    valid: boolean;
  };
};

interface LoginForm {
  email: string;
  password: string;
}

type LoginFormState = ValidationState<LoginForm>;
// Result: {
//   email: { value: string; error?: string; touched: boolean; valid: boolean };
//   password: { value: string; error?: string; touched: boolean; valid: boolean };
// }

// ===== API CLIENT UTILITIES =====

// Generate API methods from endpoint definitions
type ApiMethods<T extends Record<string, { method: string; path: string }>> = {
  [K in keyof T]: T[K] extends { method: 'GET' }
    ? () => Promise<any>
    : T[K] extends { method: 'POST' | 'PUT' }
    ? (data: any) => Promise<any>
    : T[K] extends { method: 'DELETE' }
    ? () => Promise<void>
    : never;
};

const apiEndpoints = {
  getUser: { method: 'GET', path: '/users/:id' },
  createUser: { method: 'POST', path: '/users' },
  updateUser: { method: 'PUT', path: '/users/:id' },
  deleteUser: { method: 'DELETE', path: '/users/:id' }
} as const;

type UserApiClient = ApiMethods<typeof apiEndpoints>;
// Result: {
//   getUser: () => Promise<any>;
//   createUser: (data: any) => Promise<any>;
//   updateUser: (data: any) => Promise<any>;
//   deleteUser: () => Promise<void>;
// }

// ===== STATE MANAGEMENT UTILITIES =====

// Redux-style action creators
type ActionCreators<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends undefined
    ? () => { type: K }
    : (payload: T[K]) => { type: K; payload: T[K] };
};

interface AppActions {
  SET_USER: User;
  CLEAR_USER: undefined;
  SET_LOADING: boolean;
  SET_ERROR: string;
}

type AppActionCreators = ActionCreators<AppActions>;
// Result: {
//   SET_USER: (payload: User) => { type: "SET_USER"; payload: User };
//   CLEAR_USER: () => { type: "CLEAR_USER" };
//   SET_LOADING: (payload: boolean) => { type: "SET_LOADING"; payload: boolean };
//   SET_ERROR: (payload: string) => { type: "SET_ERROR"; payload: string };
// }

// ===== DATABASE UTILITIES =====

// Generate database methods
type DbModel<T extends Record<string, any>> = {
  find: (conditions?: Partial<T>) => Promise<T[]>;
  findOne: (conditions: Partial<T>) => Promise<T | null>;
  create: (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => Promise<T>;
  update: (id: string, data: Partial<Omit<T, 'id' | 'createdAt'>>) => Promise<T>;
  delete: (id: string) => Promise<void>;
};

interface DatabaseUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserModel = DbModel<DatabaseUser>;
// Result: Fully typed database interface for User
```

---

## Indexed Access Types {#indexed-access}

### 🎯 **Indexed Access: Navegando Tipos como un Ninja**

Los Indexed Access Types te permiten acceder a los tipos de propiedades específicas de un objeto o elementos de un array, igual que accedes a propiedades en JavaScript, pero a nivel de tipos.

```typescript
// ===== BASICS DE INDEXED ACCESS =====

interface User {
  id: string;
  profile: {
    name: string;
    email: string;
    settings: {
      theme: 'light' | 'dark';
      notifications: boolean;
    };
  };
  posts: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

// Acceder a tipos de propiedades específicas
type UserId = User['id']; // string
type UserProfile = User['profile']; // { name: string; email: string; settings: {...} }
type UserEmail = User['profile']['email']; // string
type UserSettings = User['profile']['settings']; // { theme: 'light' | 'dark'; notifications: boolean }
type UserTheme = User['profile']['settings']['theme']; // 'light' | 'dark'

// Acceder a tipos de arrays
type UserPosts = User['posts']; // Array<{ id: string; title: string; content: string }>
type SinglePost = User['posts'][number]; // { id: string; title: string; content: string }
type PostTitle = User['posts'][number]['title']; // string

// ===== MULTIPLE ACCESS =====
// Acceder a múltiples keys a la vez
type UserBasics = User['id' | 'profile']; 
// Result: string | { name: string; email: string; settings: {...} }

// Con intersección para obtener object type
type UserIdAndProfile = {
  [K in 'id' | 'profile']: User[K];
};
// Result: {
//   id: string;
//   profile: { name: string; email: string; settings: {...} };
// }
```

### 🎯 **Indexed Access con Keyof**

```typescript
// ===== COMBINANDO CON KEYOF =====

// Obtener todas las keys de un tipo
type UserKeys = keyof User; // 'id' | 'profile' | 'posts'

// Obtener el tipo de cualquier propiedad de User
type AnyUserProperty = User[keyof User];
// Result: string | { name: string; email: string; settings: {...} } | Array<{...}>

// Función genérica para acceder propiedades
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = {
  id: '123',
  profile: { name: 'John', email: 'john@example.com', settings: { theme: 'dark', notifications: true } },
  posts: [{ id: '1', title: 'Hello', content: 'World' }]
};

const userId = getProperty(user, 'id'); // string
const userProfile = getProperty(user, 'profile'); // UserProfile
const userPosts = getProperty(user, 'posts'); // UserPosts

// ===== NESTED PROPERTY ACCESS =====
// Función para acceso anidado type-safe
function getNestedProperty<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(obj: T, key1: K1, key2: K2, key3: K3): T[K1][K2][K3] {
  return obj[key1][key2][key3];
}

const userTheme = getNestedProperty(user, 'profile', 'settings', 'theme'); // 'light' | 'dark'

// ===== DYNAMIC ACCESS CON PATHS =====
// Path-based access type
type PathValue<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? PathValue<T[K], R>
    : never
  : never;

type UserNamePath = PathValue<User, 'profile.name'>; // string
type UserThemePath = PathValue<User, 'profile.settings.theme'>; // 'light' | 'dark'

// Safe path access function
function getValue<T, P extends string>(
  obj: T, 
  path: P
): PathValue<T, P> | undefined {
  const keys = path.split('.');
  let current: any = obj;
  
  for (const key of keys) {
    if (current == null) return undefined;
    current = current[key];
  }
  
  return current;
}

const userName = getValue(user, 'profile.name'); // string | undefined
const userThemeFromPath = getValue(user, 'profile.settings.theme'); // 'light' | 'dark' | undefined
```

### 🎯 **Indexed Access en Arrays y Tuples**

```typescript
// ===== ARRAY ACCESS =====
const colors = ['red', 'green', 'blue'] as const;
type Colors = typeof colors; // readonly ['red', 'green', 'blue']
type Color = typeof colors[number]; // 'red' | 'green' | 'blue'
type FirstColor = typeof colors[0]; // 'red'
type SecondColor = typeof colors[1]; // 'green'

// Array de objetos
const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Charlie', role: 'moderator' }
] as const;

type Users = typeof users; // readonly [{ id: 1; name: 'Alice'; role: 'admin' }, ...]
type AnyUser = typeof users[number]; // { id: 1; name: 'Alice'; role: 'admin' } | ...
type FirstUser = typeof users[0]; // { id: 1; name: 'Alice'; role: 'admin' }
type UserRole = typeof users[number]['role']; // 'admin' | 'user' | 'moderator'

// ===== TUPLE ACCESS =====
type ApiEndpoint = [method: string, path: string, handler: Function];
type Method = ApiEndpoint[0]; // string
type Path = ApiEndpoint[1]; // string
type Handler = ApiEndpoint[2]; // Function

// Más específico con literals
type GetUserEndpoint = ['GET', '/users/:id', (id: string) => User];
type GetUserMethod = GetUserEndpoint[0]; // 'GET'
type GetUserPath = GetUserEndpoint[1]; // '/users/:id'
type GetUserHandler = GetUserEndpoint[2]; // (id: string) => User

// ===== UTILITY PARA EXTRACT ARRAY ELEMENT TYPES =====
type ArrayElement<T> = T extends (infer U)[] ? U : never;
type ArrayElementReadonly<T> = T extends readonly (infer U)[] ? U : never;

type NumberArray = number[];
type StringArray = readonly string[];

type NumberElement = ArrayElement<NumberArray>; // number
type StringElement = ArrayElementReadonly<StringArray>; // string
```

### 🎯 **Patrones Avanzados con Indexed Access**

```typescript
// ===== MAPPING CON INDEXED ACCESS =====

// Crear un tipo que mapee propiedades a sus tipos
type PropertyTypes<T> = {
  [K in keyof T]: T[K];
};

// Crear un tipo que mapee propiedades a funciones que las retornan
type PropertyGetters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

type ProductGetters = PropertyGetters<Product>;
// Result: {
//   getId: () => string;
//   getName: () => string;
//   getPrice: () => number;
//   getInStock: () => boolean;
// }

// ===== CONDITIONAL ACCESS =====
// Solo acceder si la propiedad existe
type SafeAccess<T, K> = K extends keyof T ? T[K] : never;

type UserIdSafe = SafeAccess<User, 'id'>; // string
type InvalidAccess = SafeAccess<User, 'invalidKey'>; // never

// ===== FILTER PROPERTIES BY TYPE =====
// Obtener solo las keys que tienen cierto tipo
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type StringKeys = KeysOfType<User, string>; // 'id'
type ObjectKeys = KeysOfType<User, object>; // 'profile' | 'posts'
type ArrayKeys = KeysOfType<User, any[]>; // 'posts'

// Crear un subtipo con solo propiedades de cierto tipo
type PropertiesOfType<T, U> = Pick<T, KeysOfType<T, U>>;

type UserStringProps = PropertiesOfType<User, string>;
// Result: { id: string }

type UserObjectProps = PropertiesOfType<User, object>;
// Result: { profile: {...}; posts: [...] }

// ===== DEEP ACCESS UTILITIES =====
// Obtener todas las paths posibles de un objeto
type Paths<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${Paths<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

type UserPaths = Paths<User>;
// Result: "id" | "profile" | "posts" | "profile.name" | "profile.email" | 
//         "profile.settings" | "profile.settings.theme" | "profile.settings.notifications"

// Obtener el tipo de un path específico
type DeepValue<T, P extends Paths<T>> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? R extends Paths<T[K]>
      ? DeepValue<T[K], R>
      : never
    : never
  : never;

type UserNameType = DeepValue<User, 'profile.name'>; // string
type UserThemeType = DeepValue<User, 'profile.settings.theme'>; // 'light' | 'dark'

// ===== PRACTICAL EXAMPLES =====
// Form field configuration based on model
type FormFieldConfig<T> = {
  [K in keyof T]: {
    type: T[K] extends string
      ? 'text' | 'email' | 'password'
      : T[K] extends number
      ? 'number'
      : T[K] extends boolean
      ? 'checkbox'
      : 'unknown';
    label: string;
    required: boolean;
    defaultValue?: T[K];
  };
};

interface RegistrationData {
  username: string;
  email: string;
  password: string;
  age