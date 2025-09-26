import { 
  LoadingDependency, 
  LoadingDependencyId, 
  LoadingState, 
  LoadingSubscriber, 
  LoadingEventPayload, 
  LoadingPhase,
  LoadingManagerOptions,
  LoadingPriority
} from './types';

export class LoadingManager {
  private static instance: LoadingManager;
  
  private state: LoadingState;
  private subscribers: Set<LoadingSubscriber>;
  private timeouts: Map<LoadingDependencyId, NodeJS.Timeout>;
  private options: LoadingManagerOptions;
  private startTime: number;

  private constructor(options: LoadingManagerOptions = {}) {
    this.options = {
      enableLogging: true,
      globalTimeout: 30000, // 30 segundos
      progressCalculationStrategy: 'weighted',
      ...options
    };

    this.state = {
      isGlobalLoading: false,
      currentPhase: 'initialization',
      dependencies: new Map(),
      loadedDependencies: new Set(),
      failedDependencies: new Set(),
      progress: 0,
    };

    this.subscribers = new Set();
    this.timeouts = new Map();
    this.startTime = Date.now();
  }

  public static getInstance(options?: LoadingManagerOptions): LoadingManager {
    if (!LoadingManager.instance) {
      LoadingManager.instance = new LoadingManager(options);
    }
    return LoadingManager.instance;
  }

  public registerDependency(dependency: LoadingDependency): void {
    this.log(`📝 Registrando dependencia: ${dependency.name} (${dependency.id})`);
    
    this.state.dependencies.set(dependency.id, dependency);
    
    if (!dependency.isLoading) {
      this.state.loadedDependencies.add(dependency.id);
    }

    if (dependency.timeout) {
      this.setupTimeout(dependency);
    }

    this.updateGlobalState();
    this.notifySubscribers();
  }

  public updateDependencyState(
    id: LoadingDependencyId, 
    isLoading: boolean, 
    error?: Error
  ): void {
    const dependency = this.state.dependencies.get(id);
    
    if (!dependency) {
      this.log(`⚠️ Dependencia no encontrada: ${id}`, 'warn');
      return;
    }

    const previousState = dependency.isLoading;
    dependency.isLoading = isLoading;

    // Limpiar timeout si existe
    this.clearTimeout(id);

    if (error) {
      this.log(`❌ Error en dependencia ${dependency.name}: ${error.message}`, 'error');
      this.state.failedDependencies.add(id);
      dependency.onError?.(error);
    } else if (!isLoading && previousState) {
      this.log(`✅ Dependencia completada: ${dependency.name}`);
      this.state.loadedDependencies.add(id);
      this.state.failedDependencies.delete(id);
    }

    this.updateGlobalState();
    this.notifySubscribers();

    this.emitDependencyEvent({
      dependency,
      previousState,
      currentState: isLoading,
      timestamp: Date.now()
    });
  }

  public static createCommonDependencies(): LoadingDependency[] {
    return [
      {
        id: 'user',
        name: 'Autenticación de Usuario',
        description: 'Verificando sesión y cargando perfil',
        priority: 'critical',
        phase: 'authentication',
        isLoading: true,
        isRequired: true,
        timeout: 10000,
      },
      {
        id: 'connections',
        name: 'Conexiones Sociales',
        description: 'Cargando cuentas conectadas',
        priority: 'high',
        phase: 'data-loading',
        isLoading: true,
        isRequired: true,
        timeout: 8000,
      },
      {
        id: 'theme',
        name: 'Configuración de Tema',
        description: 'Aplicando preferencias visuales',
        priority: 'medium',
        phase: 'initialization',
        isLoading: false,
        isRequired: false,
      },
      {
        id: 'analytics',
        name: 'Datos de Analíticas',
        description: 'Cargando métricas recientes',
        priority: 'low',
        phase: 'data-loading',
        isLoading: false,
        isRequired: false,
        timeout: 15000,
      }
    ];
  }

  private calculateProgress(): number {
    const dependencies = Array.from(this.state.dependencies.values());
    
    if (dependencies.length === 0) return 100;

    switch (this.options.progressCalculationStrategy) {
      case 'linear':
        return this.calculateLinearProgress(dependencies);
      
      case 'weighted':
        return this.calculateWeightedProgress(dependencies);
      
      case 'phase-based':
        return this.calculatePhaseBasedProgress(dependencies);
      
      default:
        return this.calculateWeightedProgress(dependencies);
    }
  }

  private calculateLinearProgress(dependencies: LoadingDependency[]): number {
    const completed = dependencies.filter(d => !d.isLoading).length;
    return Math.round((completed / dependencies.length) * 100);
  }

  private calculateWeightedProgress(dependencies: LoadingDependency[]): number {
    const weights: Record<LoadingPriority, number> = {
      critical: 40,
      high: 30,
      medium: 20,
      low: 10
    };

    let totalWeight = 0;
    let completedWeight = 0;

    dependencies.forEach(dep => {
      const weight = weights[dep.priority];
      totalWeight += weight;
      
      if (!dep.isLoading) {
        completedWeight += weight;
      }
    });

    return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 100;
  }

  private calculatePhaseBasedProgress(dependencies: LoadingDependency[]): number {
    const phaseWeights: Record<LoadingPhase, number> = {
      initialization: 10,
      authentication: 30,
      'data-loading': 50,
      ready: 10
    };

    const currentPhaseProgress = this.calculatePhaseProgress(this.state.currentPhase, dependencies);
    const completedPhasesWeight = this.getCompletedPhasesWeight();
    
    return Math.min(100, completedPhasesWeight + (currentPhaseProgress * phaseWeights[this.state.currentPhase] / 100));
  }

  private calculatePhaseProgress(phase: LoadingPhase, dependencies: LoadingDependency[]): number {
    const phaseDeps = dependencies.filter(d => d.phase === phase);
    if (phaseDeps.length === 0) return 100;
    
    const completed = phaseDeps.filter(d => !d.isLoading).length;
    return (completed / phaseDeps.length) * 100;
  }

  private getCompletedPhasesWeight(): number {
    const phases: LoadingPhase[] = ['initialization', 'authentication', 'data-loading'];
    const currentIndex = phases.indexOf(this.state.currentPhase);
    
    const weights = [10, 30, 50]; 
    
    return weights.slice(0, currentIndex).reduce((sum, weight) => sum + weight, 0);
  }

  private updateGlobalState(): void {
    const dependencies = Array.from(this.state.dependencies.values());
    const requiredDeps = dependencies.filter(d => d.isRequired);
    
    this.state.isGlobalLoading = requiredDeps.some(d => d.isLoading);
    
    this.updateCurrentPhase();
    
    this.state.progress = this.calculateProgress();
    
    this.state.estimatedTimeLeft = this.estimateTimeLeft();
  }

  private updateCurrentPhase(): void {
    const dependencies = Array.from(this.state.dependencies.values());
    
    if (dependencies.some(d => d.phase === 'initialization' && d.isLoading)) {
      this.state.currentPhase = 'initialization';
    } else if (dependencies.some(d => d.phase === 'authentication' && d.isLoading)) {
      this.state.currentPhase = 'authentication';
    } else if (dependencies.some(d => d.phase === 'data-loading' && d.isLoading)) {
      this.state.currentPhase = 'data-loading';
    } else {
      this.state.currentPhase = 'ready';
    }
  }

  private estimateTimeLeft(): number | undefined {
    if (!this.state.isGlobalLoading) return undefined;
    
    const elapsed = Date.now() - this.startTime;
    const progress = this.state.progress;
    
    if (progress <= 0) return undefined;
    
    const estimatedTotal = (elapsed / progress) * 100;
    return Math.max(0, estimatedTotal - elapsed);
  }

  private setupTimeout(dependency: LoadingDependency): void {
    if (!dependency.timeout) return;

    const timeoutId = setTimeout(() => {
      this.log(`⏰ Timeout para dependencia: ${dependency.name}`, 'warn');
      dependency.onTimeout?.();
      
      if (dependency.isRequired) {
        this.updateDependencyState(dependency.id, false, new Error('Timeout'));
      }
    }, dependency.timeout);

    this.timeouts.set(dependency.id, timeoutId);
  }

  private clearTimeout(id: LoadingDependencyId): void {
    const timeoutId = this.timeouts.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.timeouts.delete(id);
    }
  }

  public subscribe(callback: LoadingSubscriber): () => void {
    this.subscribers.add(callback);
    
    callback(this.getCurrentState());
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notifySubscribers(): void {
    const currentState = this.getCurrentState();
    this.subscribers.forEach(subscriber => {
      try {
        subscriber(currentState);
      } catch (error) {
        this.log(`Error en subscriber: ${error}`, 'error');
      }
    });
  }

  private emitDependencyEvent(payload: LoadingEventPayload): void {
    this.log(`🔄 Evento de dependencia: ${payload.dependency.name} -> ${payload.currentState ? 'loading' : 'completed'}`);
  }

  public getCurrentState(): LoadingState {
    return {
      ...this.state,
      dependencies: new Map(this.state.dependencies),
      loadedDependencies: new Set(this.state.loadedDependencies),
      failedDependencies: new Set(this.state.failedDependencies),
    };
  }

  public getDependency(id: LoadingDependencyId): LoadingDependency | undefined {
    return this.state.dependencies.get(id);
  }

  public isLoading(id?: LoadingDependencyId): boolean {
    if (id) {
      return this.state.dependencies.get(id)?.isLoading ?? false;
    }
    return this.state.isGlobalLoading;
  }

  public getProgress(): number {
    return this.state.progress;
  }

  public getCurrentPhase(): LoadingPhase {
    return this.state.currentPhase;
  }

  public reset(): void {
    this.log('🔄 Reseteando LoadingManager');
    
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();
    
    // Reset state
    this.state = {
      isGlobalLoading: false,
      currentPhase: 'initialization',
      dependencies: new Map(),
      loadedDependencies: new Set(),
      failedDependencies: new Set(),
      progress: 0,
    };
    
    this.startTime = Date.now();
    this.notifySubscribers();
  }

  private log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
    if (!this.options.enableLogging) return;
    
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const emoji = level === 'error' ? '🚨' : level === 'warn' ? '⚠️' : 'ℹ️';
    
    console.log(`${emoji} [LoadingManager ${timestamp}] ${message}`);
  }

  public destroy(): void {
    this.log('🧹 Destruyendo LoadingManager');
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();
    this.subscribers.clear();
  }
}

export const loadingManager = LoadingManager.getInstance();