export type LoadingDependencyId = 
  | 'user'
  | 'connections' 
  | 'theme'
  | 'analytics'
  | 'posts'
  | 'settings'
  | 'notifications'
  | string; 

export type LoadingPriority = 'critical' | 'high' | 'medium' | 'low';

export type LoadingPhase = 'initialization' | 'authentication' | 'data-loading' | 'ready';

export interface LoadingDependency {
  id: LoadingDependencyId;
  name: string;
  description?: string;
  priority: LoadingPriority;
  phase: LoadingPhase;
  isLoading: boolean;
  isRequired: boolean; 
  timeout?: number; 
  retries?: number;
  onTimeout?: () => void;
  onError?: (error: Error) => void;
}

export interface LoadingState {
  isGlobalLoading: boolean;
  currentPhase: LoadingPhase;
  dependencies: Map<LoadingDependencyId, LoadingDependency>;
  loadedDependencies: Set<LoadingDependencyId>;
  failedDependencies: Set<LoadingDependencyId>;
  progress: number; // 0-100
  estimatedTimeLeft?: number;
}

export interface LoadingManagerOptions {
  enableLogging?: boolean;
  globalTimeout?: number;
  progressCalculationStrategy?: 'linear' | 'weighted' | 'phase-based';
}

export type LoadingSubscriber = (state: LoadingState) => void;

export interface LoadingEventPayload {
  dependency: LoadingDependency;
  previousState: boolean;
  currentState: boolean;
  timestamp: number;
}