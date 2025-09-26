---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

# Clean Architecture Frontend - Prompt File Completo

## ACTIVACIÓN
Este prompt se activa cuando escribas: "Aplicar Clean Architecture", "Clean Architecture mode" o "CA frontend"

## PRINCIPIOS FUNDAMENTALES

### Definición Core
Clean Architecture es una forma de separar responsabilidades y funcionalidades según su proximidad al dominio de la aplicación. El dominio es la parte del mundo real que modelamos con un programa.

### Arquitectura de 3 Capas OBLIGATORIA
```
DOMINIO (Centro) → APLICACIÓN → ADAPTADORES (Exterior)
```

**Regla de Dependencias (CRÍTICA):**
- Solo las capas externas pueden depender de las internas
- Dominio debe ser independiente
- Aplicación puede depender solo del dominio
- Adaptadores pueden depender de todo

## ESTRUCTURA DE PROYECTO COMPLETA

### Estructura por Capas (Opción 1):
```
src/
├── domain/                 # CAPA DOMINIO
│   ├── entities/          # Tipos y entidades de dominio
│   ├── transformations/   # Funciones puras de transformación
│   └── shared-kernel/     # Tipos compartidos (branded types)
├── application/           # CAPA APLICACIÓN
│   ├── use-cases/        # Casos de uso (orchestradores)
│   ├── ports/           # Interfaces para servicios externos
│   └── commands/        # DTOs de entrada
├── infrastructure/       # CAPA ADAPTADORES
│   ├── adapters/        # Implementaciones de ports
│   ├── api/            # Clientes HTTP/GraphQL
│   ├── storage/        # Persistencia local/remota
│   └── services/       # Servicios externos
└── ui/                 # PRESENTACIÓN
    ├── components/     # Componentes React
    ├── pages/         # Páginas Next.js
    ├── hooks/         # React hooks de UI
    └── stores/        # Estado global
```

### Estructura por Features (Opción 2 - PREFERIDA):
```
src/
├── features/
│   ├── authentication/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── ui/
│   ├── product-catalog/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── ui/
│   └── shopping-cart/
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── ui/
├── shared/
│   ├── domain/           # Shared kernel
│   ├── infrastructure/   # Shared services
│   └── ui/              # Shared components
└── app/                 # Next.js app structure
```

## CAPA DOMINIO - COMANDOS DETALLADOS

### 1. Entidades de Dominio
```typescript
// domain/entities/[entity].ts

// SIEMPRE usar branded types para IDs
export type UserId = string & { readonly __brand: 'UserId' };
export type ProductId = string & { readonly __brand: 'ProductId' };

// Entidades inmutables con readonly
export type User = {
  readonly id: UserId;
  readonly name: UserName;
  readonly email: Email;
  readonly preferences: readonly Ingredient[];
  readonly allergies: readonly Ingredient[];
};

export type Product = {
  readonly id: ProductId;
  readonly title: ProductTitle;
  readonly price: Price; // Usar objeto Price, no number
  readonly toppings: readonly Ingredient[];
};

export type Cart = {
  readonly products: readonly Product[];
};

export type Order = {
  readonly user: UserId;
  readonly cart: Cart;
  readonly created: DateTimeString;
  readonly status: OrderStatus;
  readonly total: Price;
};
```

### 2. Transformaciones Puras (Functional Core)
```typescript
// domain/transformations/[entity].ts

// REGLAS: Solo funciones puras, sin side effects, sin dependencias externas

// Transformaciones de User
export function hasAllergy(user: User, ingredient: Ingredient): boolean {
  return user.allergies.includes(ingredient);
}

export function hasPreference(user: User, ingredient: Ingredient): boolean {
  return user.preferences.includes(ingredient);
}

export function updateUserPreferences(
  user: User, 
  newPreferences: readonly Ingredient[]
): User {
  return { ...user, preferences: newPreferences };
}

// Transformaciones de Cart
export function addProduct(cart: Cart, product: Product): Cart {
  return { ...cart, products: [...cart.products, product] };
}

export function removeProduct(cart: Cart, productId: ProductId): Cart {
  return {
    ...cart,
    products: cart.products.filter(p => p.id !== productId)
  };
}

export function contains(cart: Cart, product: Product): boolean {
  return cart.products.some(({ id }) => id === product.id);
}

export function clearCart(): Cart {
  return { products: [] };
}

// Transformaciones de Product
export function totalPrice(products: readonly Product[]): Price {
  const total = products.reduce((sum, { price }) => sum + price.value, 0);
  return createPrice(total, products[0]?.price.currency || 'USD');
}

export function filterByIngredient(
  products: readonly Product[], 
  ingredient: Ingredient
): readonly Product[] {
  return products.filter(p => p.toppings.includes(ingredient));
}

// Transformaciones de Order
export function createOrder(
  user: User, 
  cart: Cart, 
  createdDate: DateTimeString
): Order {
  return {
    user: user.id,
    cart,
    created: createdDate,
    status: "new",
    total: totalPrice(cart.products),
  };
}

export function updateOrderStatus(order: Order, status: OrderStatus): Order {
  return { ...order, status };
}
```

### 3. Shared Kernel (Tipos Compartidos)
```typescript
// domain/shared-kernel/types.ts

// Branded types para evitar primitive obsession
export type Email = string & { readonly __brand: 'Email' };
export type UserName = string & { readonly __brand: 'UserName' };
export type ProductTitle = string & { readonly __brand: 'ProductTitle' };
export type DateTimeString = string & { readonly __brand: 'DateTimeString' };
export type Ingredient = string & { readonly __brand: 'Ingredient' };

// Tipos de moneda y precio CORRECTOS
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'MXN';
export type AmountCents = number & { readonly __brand: 'AmountCents' };

export type Price = {
  readonly value: AmountCents;
  readonly currency: Currency;
  readonly __brand: 'Price';
};

// Factory functions para crear branded types
export function createEmail(value: string): Email {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new Error('Invalid email format');
  }
  return value as Email;
}

export function createPrice(cents: number, currency: Currency): Price {
  if (cents < 0) {
    throw new Error('Price cannot be negative');
  }
  return {
    value: cents as AmountCents,
    currency,
    __brand: 'Price'
  } as Price;
}

export function createUserId(value: string): UserId {
  if (!value.trim()) {
    throw new Error('UserId cannot be empty');
  }
  return value as UserId;
}

// Status types
export type OrderStatus = 'new' | 'delivery' | 'completed' | 'cancelled';
```

### 4. Validaciones de Dominio
```typescript
// domain/validations/[entity]-validations.ts

export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly field?: string
  ) {
    super(message);
    this.name = 'DomainError';
  }
}

export function validateUser(user: Partial<User>): DomainError[] {
  const errors: DomainError[] = [];
  
  if (!user.name?.trim()) {
    errors.push(new DomainError('Name is required', 'INVALID_NAME', 'name'));
  }
  
  if (!user.email) {
    errors.push(new DomainError('Email is required', 'INVALID_EMAIL', 'email'));
  }
  
  return errors;
}

export function validateCart(cart: Cart): DomainError[] {
  const errors: DomainError[] = [];
  
  if (cart.products.length === 0) {
    errors.push(new DomainError('Cart cannot be empty', 'EMPTY_CART'));
  }
  
  if (cart.products.length > 50) {
    errors.push(new DomainError('Cart has too many items', 'CART_OVERFLOW'));
  }
  
  return errors;
}
```

## CAPA APLICACIÓN - COMANDOS DETALLADOS

### 1. Ports (Interfaces)
```typescript
// application/ports/repositories.ts

export interface UserRepository {
  readonly getById: (id: UserId) => Promise<User | null>;
  readonly save: (user: User) => Promise<void>;
  readonly findByEmail: (email: Email) => Promise<User | null>;
  readonly delete: (id: UserId) => Promise<void>;
}

export interface ProductRepository {
  readonly getById: (id: ProductId) => Promise<Product | null>;
  readonly getAll: () => Promise<readonly Product[]>;
  readonly findByCategory: (category: string) => Promise<readonly Product[]>;
  readonly search: (query: string) => Promise<readonly Product[]>;
}

export interface OrderRepository {
  readonly save: (order: Order) => Promise<void>;
  readonly getByUserId: (userId: UserId) => Promise<readonly Order[]>;
  readonly getById: (id: string) => Promise<Order | null>;
}

// application/ports/services.ts

export interface PaymentService {
  readonly processPayment: (amount: Price, userId: UserId) => Promise<PaymentResult>;
  readonly refund: (transactionId: string) => Promise<boolean>;
}

export interface NotificationService {
  readonly notifyUser: (userId: UserId, message: string) => Promise<void>;
  readonly notifyError: (error: Error, context?: any) => Promise<void>;
  readonly sendEmail: (to: Email, subject: string, body: string) => Promise<void>;
}

export interface AuthenticationService {
  readonly authenticate: (email: Email, password: string) => Promise<AuthResult>;
  readonly generateToken: (userId: UserId) => Promise<string>;
  readonly validateToken: (token: string) => Promise<UserId | null>;
}

export interface CacheService {
  readonly get: <T>(key: string) => Promise<T | null>;
  readonly set: <T>(key: string, value: T, ttl?: number) => Promise<void>;
  readonly delete: (key: string) => Promise<void>;
}

// Types para responses
export type PaymentResult = {
  readonly success: boolean;
  readonly transactionId?: string;
  readonly errorMessage?: string;
};

export type AuthResult = {
  readonly success: boolean;
  readonly user?: User;
  readonly token?: string;
  readonly errorMessage?: string;
};
```

### 2. Commands (DTOs de Entrada)
```typescript
// application/commands/[feature]-commands.ts

export type AddToCartCommand = {
  readonly userId: UserId;
  readonly productId: ProductId;
  readonly quantity?: number;
};

export type RemoveFromCartCommand = {
  readonly userId: UserId;
  readonly productId: ProductId;
};

export type CheckoutCommand = {
  readonly userId: UserId;
  readonly paymentMethod: string;
  readonly shippingAddress: Address;
};

export type RegisterUserCommand = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly preferences?: readonly string[];
  readonly allergies?: readonly string[];
};

export type UpdateUserCommand = {
  readonly userId: UserId;
  readonly name?: string;
  readonly preferences?: readonly string[];
  readonly allergies?: readonly string[];
};
```

### 3. Use Cases (Functional Core + Imperative Shell)
```typescript
// application/use-cases/add-to-cart.use-case.ts

type Dependencies = {
  readonly userRepository: UserRepository;
  readonly productRepository: ProductRepository;
  readonly cartRepository: CartRepository;
  readonly notificationService: NotificationService;
};

// Use case PURO (sin React hooks)
export async function addToCartUseCase(
  command: AddToCartCommand,
  dependencies: Dependencies
): Promise<Cart> {
  const { userRepository, productRepository, cartRepository, notificationService } = dependencies;
  
  // 1. Side effect: obtener datos
  const [user, product, currentCart] = await Promise.all([
    userRepository.getById(command.userId),
    productRepository.getById(command.productId),
    cartRepository.getByUserId(command.userId)
  ]);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  // 2. Pure function: validar reglas de negocio
  const userErrors = validateUser(user);
  if (userErrors.length > 0) {
    throw new Error(`Invalid user: ${userErrors.map(e => e.message).join(', ')}`);
  }
  
  // Verificar alergias
  const hasAllergicIngredient = product.toppings.some(ingredient => 
    hasAllergy(user, ingredient)
  );
  
  if (hasAllergicIngredient) {
    await notificationService.notifyUser(
      user.id,
      `Warning: Product contains ingredients you're allergic to`
    );
  }
  
  // 3. Pure function: transformar datos
  const updatedCart = addProduct(currentCart, product);
  
  // Validar cart
  const cartErrors = validateCart(updatedCart);
  if (cartErrors.length > 0) {
    throw new Error(`Invalid cart: ${cartErrors.map(e => e.message).join(', ')}`);
  }
  
  // 4. Side effect: persistir resultado
  await cartRepository.save(updatedCart);
  
  return updatedCart;
}

// React Hook Adapter (Infrastructure layer)
export function useAddToCart() {
  const dependencies = useDependencies();
  
  return useCallback(async (command: AddToCartCommand) => {
    return addToCartUseCase(command, dependencies);
  }, [dependencies]);
}
```

### 4. Use Case Complejo - Checkout
```typescript
// application/use-cases/checkout.use-case.ts

export async function checkoutUseCase(
  command: CheckoutCommand,
  dependencies: Dependencies
): Promise<Order> {
  const {
    userRepository,
    cartRepository,
    orderRepository,
    paymentService,
    notificationService,
    dateTimeService
  } = dependencies;
  
  // 1. Side effects: obtener estado actual
  const [user, cart] = await Promise.all([
    userRepository.getById(command.userId),
    cartRepository.getByUserId(command.userId)
  ]);
  
  if (!user || !cart) {
    throw new Error('User or cart not found');
  }
  
  // 2. Pure functions: validaciones de dominio
  const cartErrors = validateCart(cart);
  if (cartErrors.length > 0) {
    throw new Error(`Invalid cart: ${cartErrors.map(e => e.message).join(', ')}`);
  }
  
  const total = totalPrice(cart.products);
  const currentDate = await dateTimeService.getCurrentDateTime();
  
  // 3. Pure function: crear order
  const order = createOrder(user, cart, currentDate);
  
  // 4. Side effect: procesar pago
  const paymentResult = await paymentService.processPayment(total, user.id);
  
  if (!paymentResult.success) {
    await notificationService.notifyUser(
      user.id,
      `Payment failed: ${paymentResult.errorMessage}`
    );
    throw new Error(`Payment failed: ${paymentResult.errorMessage}`);
  }
  
  // 5. Side effects: persistir y limpiar
  await Promise.all([
    orderRepository.save(order),
    cartRepository.clear(user.id)
  ]);
  
  // 6. Side effect: notificar éxito
  await notificationService.notifyUser(
    user.id,
    `Order created successfully! Order ID: ${order.id}`
  );
  
  return order;
}
```

## CAPA INFRAESTRUCTURA - COMANDOS DETALLADOS

### 1. Adaptadores de Repositorio
```typescript
// infrastructure/adapters/user-repository.adapter.ts

export class ApiUserRepository implements UserRepository {
  constructor(
    private readonly apiClient: ApiClient,
    private readonly cache: CacheService
  ) {}
  
  async getById(id: UserId): Promise<User | null> {
    // Intentar cache primero
    const cached = await this.cache.get<User>(`user:${id}`);
    if (cached) return cached;
    
    try {
      const response = await this.apiClient.get(`/users/${id}`);
      if (!response.data) return null;
      
      const user = this.toDomainUser(response.data);
      await this.cache.set(`user:${id}`, user, 300); // 5 min cache
      
      return user;
    } catch (error) {
      if (error.status === 404) return null;
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }
  
  async save(user: User): Promise<void> {
    try {
      const apiUser = this.toApiUser(user);
      await this.apiClient.put(`/users/${user.id}`, apiUser);
      
      // Invalidar cache
      await this.cache.delete(`user:${user.id}`);
    } catch (error) {
      throw new Error(`Failed to save user: ${error.message}`);
    }
  }
  
  private toDomainUser(apiUser: any): User {
    return {
      id: createUserId(apiUser.id),
      name: apiUser.name as UserName,
      email: createEmail(apiUser.email),
      preferences: apiUser.preferences as readonly Ingredient[],
      allergies: apiUser.allergies as readonly Ingredient[]
    };
  }
  
  private toApiUser(user: User): any {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      preferences: user.preferences,
      allergies: user.allergies
    };
  }
}
```

### 2. Adaptadores de Servicios
```typescript
// infrastructure/adapters/payment-service.adapter.ts

export class StripePaymentAdapter implements PaymentService {
  constructor(private readonly stripeClient: Stripe) {}
  
  async processPayment(amount: Price, userId: UserId): Promise<PaymentResult> {
    try {
      const paymentIntent = await this.stripeClient.paymentIntents.create({
        amount: amount.value,
        currency: amount.currency.toLowerCase(),
        metadata: {
          userId: userId
        }
      });
      
      return {
        success: true,
        transactionId: paymentIntent.id
      };
    } catch (error) {
      return {
        success: false,
        errorMessage: error.message
      };
    }
  }
  
  async refund(transactionId: string): Promise<boolean> {
    try {
      await this.stripeClient.refunds.create({
        payment_intent: transactionId
      });
      return true;
    } catch (error) {
      console.error('Refund failed:', error);
      return false;
    }
  }
}

// infrastructure/adapters/notification-service.adapter.ts

export class EmailNotificationAdapter implements NotificationService {
  constructor(private readonly emailService: EmailService) {}
  
  async notifyUser(userId: UserId, message: string): Promise<void> {
    // En una app real, obtendríamos el email del usuario
    const userEmail = await this.getUserEmail(userId);
    await this.sendEmail(userEmail, 'Notification', message);
  }
  
  async notifyError(error: Error, context?: any): Promise<void> {
    // Log to monitoring service
    console.error('Application error:', error, context);
    // Send to error tracking service like Sentry
  }
  
  async sendEmail(to: Email, subject: string, body: string): Promise<void> {
    await this.emailService.send({
      to,
      subject,
      body
    });
  }
  
  private async getUserEmail(userId: UserId): Promise<Email> {
    // Implementation depends on user service
    throw new Error('Not implemented');
  }
}
```

### 3. Dependency Injection Container
```typescript
// infrastructure/di/container.ts

export function createDependencies(): Dependencies {
  // HTTP Client
  const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL);
  
  // External Services
  const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  const emailService = new EmailService(process.env.EMAIL_SERVICE_KEY);
  
  // Cache
  const cacheService = new RedisCacheAdapter(process.env.REDIS_URL);
  
  // Repositories
  const userRepository = new ApiUserRepository(apiClient, cacheService);
  const productRepository = new ApiProductRepository(apiClient, cacheService);
  const orderRepository = new ApiOrderRepository(apiClient);
  const cartRepository = new LocalStorageCartRepository();
  
  // Services
  const paymentService = new StripePaymentAdapter(stripeClient);
  const notificationService = new EmailNotificationAdapter(emailService);
  const authService = new JwtAuthenticationAdapter();
  const dateTimeService = new SystemDateTimeAdapter();
  
  return {
    userRepository,
    productRepository,
    orderRepository,
    cartRepository,
    paymentService,
    notificationService,
    authService,
    dateTimeService
  };
}

// React Hook para DI
export function useDependencies(): Dependencies {
  return useMemo(() => createDependencies(), []);
}
```

## CAPA UI - COMANDOS DETALLADOS

### 1. Componentes React
```typescript
// ui/components/Cart/AddToCartButton.tsx

export function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useAddToCart();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleAddToCart = useCallback(async () => {
    if (!user) {
      setError('Please login first');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const command: AddToCartCommand = {
        userId: user.id,
        productId: product.id
      };
      
      await addToCart(command);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  }, [addToCart, user, product.id]);
  
  if (error) {
    return <ErrorMessage message={error} onRetry={handleAddToCart} />;
  }
  
  return (
    <Button 
      onClick={handleAddToCart}
      disabled={isLoading || !user}
      loading={isLoading}
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
}
```

### 2. Pages (Next.js)
```typescript
// pages/checkout.tsx

export default function CheckoutPage() {
  const checkout = useCheckout();
  const { user } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  
  const handleCheckout = useCallback(async (formData: CheckoutFormData) => {
    if (!user || !cart) return;
    
    try {
      const command: CheckoutCommand = {
        userId: user.id,
        paymentMethod: formData.paymentMethod,
        shippingAddress: formData.shippingAddress
      };
      
      const order = await checkout(command);
      router.push(`/orders/${order.id}`);
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  }, [checkout, user, cart, router]);
  
  if (!user) {
    return <LoginPrompt />;
  }
  
  if (!cart || cart.products.length === 0) {
    return <EmptyCartMessage />;
  }
  
  return (
    <Layout>
      <CheckoutForm 
        cart={cart}
        user={user}
        onSubmit={handleCheckout}
      />
    </Layout>
  );
}

// SSR con Clean Architecture
export async function getServerSideProps(context) {
  const dependencies = createServerDependencies();
  
  try {
    // Usar use cases del lado servidor
    const userToken = context.req.cookies.authToken;
    const userId = await dependencies.authService.validateToken(userToken);
    
    if (!userId) {
      return { redirect: { destination: '/login', permanent: false } };
    }
    
    const user = await dependencies.userRepository.getById(userId);
    const cart = await dependencies.cartRepository.getByUserId(userId);
    
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        cart: JSON.parse(JSON.stringify(cart))
      }
    };
  } catch (error) {
    return { notFound: true };
  }
}
```

### 3. API Routes (Next.js)
```typescript
// pages/api/cart/add.ts

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Validar autenticación
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const dependencies = createServerDependencies();
    const userId = await dependencies.authService.validateToken(token);
    
    if (!userId) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // Validar entrada
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    
    // Ejecutar use case
    const command: AddToCartCommand = {
      userId,
      productId: createProductId(productId)
    };
    
    const cart = await addToCartUseCase(command, dependencies);
    
    res.status(200).json({ cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}
```

## TESTING ESTRATEGIA COMPLETA

### 1. Domain Testing
```typescript
// domain/__tests__/cart.test.ts

describe('Cart domain functions', () => {
  const mockProduct1: Product = {
    id: 'prod-1' as ProductId,
    title: 'Chocolate Cookie' as ProductTitle,
    price: createPrice(299, 'USD'),
    toppings: ['chocolate' as Ingredient]
  };
  
  const mockProduct2: Product = {
    id: 'prod-2' as ProductId,
    title: 'Vanilla Cookie' as ProductTitle,
    price: createPrice(199, 'USD'),
    toppings: ['vanilla' as Ingredient]
  };
  
  describe('addProduct', () => {
    it('should add product to empty cart', () => {
      const emptyCart: Cart = { products: [] };
      const result = addProduct(emptyCart, mockProduct1);
      
      expect(result.products).toHaveLength(1);
      expect(result.products[0]).toEqual(mockProduct1);
      expect(result).not.toBe(emptyCart); // Inmutabilidad
    });
    
    it('should add product to existing cart', () => {
      const cart: Cart = { products: [mockProduct1] };
      const result = addProduct(cart, mockProduct2);
      
      expect(result.products).toHaveLength(2);
      expect(result.products).toContain(mockProduct1);
      expect(result.products).toContain(mockProduct2);
    });
  });
  
  describe('totalPrice', () => {
    it('should calculate total price correctly', () => {
      const products = [mockProduct1, mockProduct2];
      const result = totalPrice(products);
      
      expect(result.value).toBe(498); // 299 + 199
      expect(result.currency).toBe('USD');
    });
    
    it('should return zero for empty products', () => {
      const result = totalPrice([]);
      expect(result.value).toBe(0);
    });
  });
});
```

### 2. Application Layer Testing
```typescript
// application/__tests__/add-to-cart.use-case.test.ts

describe('addToCartUseCase', () => {
  let mockDependencies: Dependencies;
  
  beforeEach(() => {
    mockDependencies = {
      userRepository: {
        getById: jest.fn(),
        save: jest.fn(),
        findByEmail: jest.fn(),
        delete: jest.fn()
      },
      productRepository: {
        getById: jest.fn(),
        getAll: jest.fn(),
        findByCategory: jest.fn(),
        search: jest.fn()
      },
      cartRepository: {
        getByUserId: jest.fn(),
        save: jest.fn(),
        clear: jest.fn()
      },
      notificationService: {
        notifyUser: jest.fn(),
        notifyError: jest.fn(),
        sendEmail: jest.fn()
      }
    };
  });
  
  it('should add product to cart successfully', async () => {
    // Arrange
    const command: AddToCartCommand = {
      userId: 'user-1' as UserId,
      productId: 'prod-1' as ProductId
    };
    
    const mockUser: User = {
      id: 'user-1' as UserId,
      name: 'John Doe' as UserName,
      email: 'john@example.com' as Email,
      preferences: [],
      allergies: []
    };
    
    const mockProduct: Product = {
      id: 'prod-1' as ProductId,
      title: 'Cookie' as ProductTitle,
      price: createPrice(299, 'USD'),
      toppings: []
    };
    
    const mockCart: Cart = { products: [] };
    
    (mockDependencies.userRepository.getById as jest.Mock).mockResolvedValue(mockUser);
    (mockDependencies.productRepository.getById as jest.Mock).mockResolvedValue(mockProduct);
    (mockDependencies.cartRepository.getByUserId as jest.Mock).mockResolvedValue(mockCart);
    (mockDependencies.cartRepository.save as jest.Mock).mockResolvedValue(undefined);
    
    // Act
    const result = await addToCartUseCase(command, mockDependencies);
    
    // Assert
    expect(result.products).toHaveLength(1);
    expect(result.products[0]).toEqual(mockProduct);
    expect(mockDependencies.cartRepository.save).toHaveBeenCalledWith(result);
  });
  
  it('should notify user about allergic ingredients', async () => {
    // Arrange
    const allergyUser: User = {
      id: 'user-1' as UserId,
      name: 'John Doe' as UserName,
      email: 'john@example.com' as Email,
      preferences: [],
      allergies: ['nuts' as Ingredient]
    };
    
    const allergyProduct: Product = {
      id: 'prod-1' as ProductId,
      title: 'Nutty Cookie' as ProductTitle,
      price: createPrice(299, 'USD'),
      toppings: ['nuts' as Ingredient]
    };
    
    const command: AddToCartCommand = {
      userId: 'user-1' as UserId,
      productId: 'prod-1' as ProductId
    };
    
    (mockDependencies.userRepository.getById as jest.Mock).mockResolvedValue(allergyUser);
    (mockDependencies.productRepository.getById as jest.Mock).mockResolvedValue(allergyProduct);
    (mockDependencies.cartRepository.getByUserId as jest.Mock).mockResolvedValue({ products: [] });
    
    // Act
    await addToCartUseCase(command, mockDependencies);
    
    // Assert
    expect(mockDependencies.notificationService.notifyUser).toHaveBeenCalledWith(
      allergyUser.id,
      expect.stringContaining('allergic')
    );
  });
  
  it('should throw error when user not found', async () => {
    // Arrange
    const command: AddToCartCommand = {
      userId: 'nonexistent' as UserId,
      productId: 'prod-1' as ProductId
    };
    
    (mockDependencies.userRepository.getById as jest.Mock).mockResolvedValue(null);
    
    // Act & Assert
    await expect(addToCartUseCase(command, mockDependencies))
      .rejects.toThrow('User not found');
  });
});
```

### 3. Infrastructure Testing
```typescript
// infrastructure/__tests__/user-repository.adapter.test.ts

describe('ApiUserRepository', () => {
  let repository: ApiUserRepository;
  let mockApiClient: jest.Mocked<ApiClient>;
  let mockCache: jest.Mocked<CacheService>;
  
  beforeEach(() => {
    mockApiClient = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    };
    
    mockCache = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn()
    };
    
    repository = new ApiUserRepository(mockApiClient, mockCache);
  });
  
  describe('getById', () => {
    it('should return cached user when available', async () => {
      // Arrange
      const userId = 'user-1' as UserId;
      const cachedUser: User = {
        id: userId,
        name: 'John Doe' as UserName,
        email: 'john@example.com' as Email,
        preferences: [],
        allergies: []
      };
      
      mockCache.get.mockResolvedValue(cachedUser);
      
      // Act
      const result = await repository.getById(userId);
      
      // Assert
      expect(result).toEqual(cachedUser);
      expect(mockApiClient.get).not.toHaveBeenCalled();
    });
    
    it('should fetch from API when not cached', async () => {
      // Arrange
      const userId = 'user-1' as UserId;
      const apiResponse = {
        data: {
          id: 'user-1',
          name: 'John Doe',
          email: 'john@example.com',
          preferences: [],
          allergies: []
        }
      };
      
      mockCache.get.mockResolvedValue(null);
      mockApiClient.get.mockResolvedValue(apiResponse);
      mockCache.set.mockResolvedValue(undefined);
      
      // Act
      const result = await repository.getById(userId);
      
      // Assert
      expect(mockApiClient.get).toHaveBeenCalledWith('/users/user-1');
      expect(mockCache.set).toHaveBeenCalledWith(
        'user:user-1',
        expect.any(Object),
        300
      );
      expect(result?.id).toBe(userId);
    });
  });
});
```

### 4. Component Testing
```typescript
// ui/__tests__/AddToCartButton.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddToCartButton } from '../components/Cart/AddToCartButton';

// Mock use cases
const mockAddToCart = jest.fn();
const mockUseAuth = jest.fn();

jest.mock('../hooks/useAddToCart', () => ({
  useAddToCart: () => mockAddToCart
}));

jest.mock('../hooks/useAuth', () => ({
  useAuth: () => mockUseAuth()
}));

describe('AddToCartButton', () => {
  const mockProduct: Product = {
    id: 'prod-1' as ProductId,
    title: 'Test Cookie' as ProductTitle,
    price: createPrice(299, 'USD'),
    toppings: []
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should render add to cart button', () => {
    mockUseAuth.mockReturnValue({ user: { id: 'user-1' } });
    
    render(<AddToCartButton product={mockProduct} />);
    
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });
  
  it('should call addToCart when clicked', async () => {
    const mockUser = { id: 'user-1' as UserId };
    mockUseAuth.mockReturnValue({ user: mockUser });
    mockAddToCart.mockResolvedValue(undefined);
    
    render(<AddToCartButton product={mockProduct} />);
    
    fireEvent.click(screen.getByText('Add to Cart'));
    
    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith({
        userId: mockUser.id,
        productId: mockProduct.id
      });
    });
  });
  
  it('should show error when user not logged in', () => {
    mockUseAuth.mockReturnValue({ user: null });
    
    render(<AddToCartButton product={mockProduct} />);
    
    fireEvent.click(screen.getByText('Add to Cart'));
    
    expect(screen.getByText('Please login first')).toBeInTheDocument();
  });
});
```

## ERROR HANDLING ESTRATEGIA

### 1. Error Types por Capa
```typescript
// shared/errors/domain-errors.ts

export abstract class DomainError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
  
  constructor(message: string, public readonly field?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends DomainError {
  readonly code = 'VALIDATION_ERROR';
  readonly statusCode = 400;
}

export class BusinessRuleError extends DomainError {
  readonly code = 'BUSINESS_RULE_ERROR';
  readonly statusCode = 422;
}

export class EntityNotFoundError extends DomainError {
  readonly code = 'ENTITY_NOT_FOUND';
  readonly statusCode = 404;
}

// shared/errors/application-errors.ts

export class ApplicationError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export class UseCaseError extends ApplicationError {
  constructor(message: string, cause?: Error) {
    super(message, 'USE_CASE_ERROR', 500, cause);
  }
}

// shared/errors/infrastructure-errors.ts

export class InfrastructureError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'InfrastructureError';
  }
}

export class ExternalServiceError extends InfrastructureError {
  constructor(service: string, message: string, cause?: Error) {
    super(`${service}: ${message}`, 'EXTERNAL_SERVICE_ERROR', 503, cause);
  }
}
```

### 2. Error Handling en Use Cases
```typescript
// application/use-cases/error-handling.ts

export function withErrorHandling<T extends any[], R>(
  useCase: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await useCase(...args);
    } catch (error) {
      if (error instanceof DomainError) {
        // Domain errors se propagan tal como están
        throw error;
      }
      
      if (error instanceof InfrastructureError) {
        // Convertir errores de infraestructura a errores de aplicación
        throw new UseCaseError(
          `Use case failed due to infrastructure error: ${error.message}`,
          error
        );
      }
      
      // Errores desconocidos
      throw new UseCaseError(
        'An unexpected error occurred',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  };
}

// Uso en use cases
export const addToCartUseCase = withErrorHandling(async (
  command: AddToCartCommand,
  dependencies: Dependencies
): Promise<Cart> => {
  // Implementación del use case
});
```

## PERFORMANCE Y OPTIMIZACIÓN

### 1. Memoización en Domain
```typescript
// domain/transformations/optimized-calculations.ts

import { memoize } from 'lodash';

// Memoizar cálculos costosos
export const calculateComplexDiscount = memoize((
  products: readonly Product[],
  userTier: string,
  seasonalFactors: SeasonalFactors
): Price => {
  // Cálculo complejo de descuentos
  return complexCalculation(products, userTier, seasonalFactors);
});

// Cache por configuración
const priceCalculationCache = new Map<string, Price>();

export function calculateTotalWithCache(
  products: readonly Product[],
  discounts: readonly Discount[]
): Price {
  const cacheKey = `${products.map(p => p.id).join(',')}:${discounts.map(d => d.code).join(',')}`;
  
  if (priceCalculationCache.has(cacheKey)) {
    return priceCalculationCache.get(cacheKey)!;
  }
  
  const result = calculateTotal(products, discounts);
  priceCalculationCache.set(cacheKey, result);
  
  return result;
}
```

### 2. Optimización en UI
```typescript
// ui/hooks/optimized-hooks.ts

export function useOptimizedCart() {
  const { cart } = useCart();
  
  // Memoizar transformaciones costosas
  const cartTotal = useMemo(() => {
    return calculateTotalWithCache(cart.products, []);
  }, [cart.products]);
  
  const cartItemCount = useMemo(() => {
    return cart.products.length;
  }, [cart.products.length]);
  
  // Debounce para actualizaciones
  const debouncedSave = useMemo(
    () => debounce((cart: Cart) => {
      // Save to storage
    }, 500),
    []
  );
  
  return {
    cart,
    cartTotal,
    cartItemCount,
    debouncedSave
  };
}
```

## MONITOREO Y LOGGING

### 1. Logging Strategy
```typescript
// shared/logging/logger.ts

export interface Logger {
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, error?: Error, meta?: any): void;
  debug(message: string, meta?: any): void;
}

export class StructuredLogger implements Logger {
  constructor(private service: string) {}
  
  info(message: string, meta?: any): void {
    console.log(JSON.stringify({
      level: 'info',
      service: this.service,
      message,
      timestamp: new Date().toISOString(),
      ...meta
    }));
  }
  
  error(message: string, error?: Error, meta?: any): void {
    console.error(JSON.stringify({
      level: 'error',
      service: this.service,
      message,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : undefined,
      timestamp: new Date().toISOString(),
      ...meta
    }));
  }
  
  // ... otros métodos
}

// application/use-cases/logged-use-case.ts

export function withLogging<T extends any[], R>(
  useCase: (...args: T) => Promise<R>,
  useCaseName: string
) {
  const logger = new StructuredLogger('use-case');
  
  return async (...args: T): Promise<R> => {
    const startTime = Date.now();
    const correlationId = generateCorrelationId();
    
    logger.info(`Starting ${useCaseName}`, {
      correlationId,
      useCaseName,
      args: sanitizeArgs(args)
    });
    
    try {
      const result = await useCase(...args);
      
      logger.info(`Completed ${useCaseName}`, {
        correlationId,
        useCaseName,
        duration: Date.now() - startTime
      });
      
      return result;
    } catch (error) {
      logger.error(`Failed ${useCaseName}`, error as Error, {
        correlationId,
        useCaseName,
        duration: Date.now() - startTime
      });
      
      throw error;
    }
  };
}
```

## REGLAS DE IMPLEMENTACIÓN CRÍTICAS

### 1. NUNCA HACER:
- Importar React/Next.js en domain layer
- Usar hooks de React en application layer  
- Acceder directamente a APIs externas desde UI
- Crear dependencias circulares entre capas
- Usar `any` o `unknown` sin validación
- Mezclar lógica de negocio con lógica de presentación
- Violar la regla de dependencias
- Usar primitive obsession (string, number directos)
- Crear side effects en funciones de dominio
- Hardcodear URLs o configuraciones en domain/application

### 2. SIEMPRE HACER:
- Usar TypeScript con strict mode
- Implementar branded types para IDs y valores críticos
- Separar lógica de negocio de side effects
- Usar dependency injection para servicios
- Escribir tests para cada capa independientemente
- Validar datos en boundaries (API, forms, repositories)
- Manejar errores apropiadamente en cada capa
- Usar funciones puras en domain layer
- Implementar el patrón "Functional Core, Imperative Shell"
- Documentar interfaces y contratos
- Usar immutable data structures
- Implementar proper error types
- Cache cuando sea apropiado
- Log operaciones críticas

### 3. PATRONES OBLIGATORIOS:

**Functional Core + Imperative Shell:**
```typescript
async function useCase(command: Command) {
  // 1. Side effect: obtener datos
  const data = await repository.getData();
  
  // 2. Pure function: transformar
  const result = domainTransformation(data, command);
  
  // 3. Side effect: persistir
  await repository.save(result);
  
  return result;
}
```

**Dependency Injection:**
```typescript
type Dependencies = {
  readonly repository: Repository;
  readonly service: Service;
};

function useCase(command: Command, deps: Dependencies) {
  // usar deps, no importar directamente
}
```

**Error Propagation:**
```typescript
Domain → Application → Infrastructure → UI
DomainError → UseCaseError → InfrastructureError → UIError
```

---

## COMANDOS DE ACTIVACIÓN

### Para crear feature completa:
```
"Crear feature [FeatureName] con Clean Architecture completa"
```

### Para refactorizar código:
```
"Refactorizar [código] aplicando Clean Architecture"
```

### Para revisar arquitectura:
```
"Revisar arquitectura de [código] según Clean Architecture"
```

### Para implementar use case:
```
"Implementar use case [UseCaseName] con patrón Functional Core"
```

### Para crear tests:
```
"Crear tests completos para [feature] siguiendo Clean Architecture"