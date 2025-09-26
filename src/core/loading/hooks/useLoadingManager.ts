import { useEffect, useState, useCallback, useMemo } from 'react';
import { LoadingManager, loadingManager } from '../LoadingManager';
import { 
  LoadingState, 
  LoadingDependency, 
  LoadingDependencyId, 
  LoadingPhase 
} from '../types';

/**
 * 🪝 Hook personalizado para usar el LoadingManager
 * 
 * Proporciona una interfaz reactiva y fácil de usar para el sistema de loading
 */
export function useLoadingManager() {
  const [loadingState, setLoadingState] = useState<LoadingState>(
    loadingManager.getCurrentState()
  );

  // 🔄 Suscribirse a cambios del LoadingManager
  useEffect(() => {
    const unsubscribe = loadingManager.subscribe(setLoadingState);
    return unsubscribe;
  }, []);

  // 📝 Registrar una nueva dependencia
  const registerDependency = useCallback((dependency: LoadingDependency) => {
    loadingManager.registerDependency(dependency);
  }, []);

  // 🔄 Actualizar estado de dependencia
  const updateDependencyState = useCallback((
    id: LoadingDependencyId, 
    isLoading: boolean, 
    error?: Error
  ) => {
    loadingManager.updateDependencyState(id, isLoading, error);
  }, []);

  // 🎯 Métodos de conveniencia
  const markAsLoading = useCallback((id: LoadingDependencyId) => {
    loadingManager.updateDependencyState(id, true);
  }, []);

  const markAsComplete = useCallback((id: LoadingDependencyId) => {
    loadingManager.updateDependencyState(id, false);
  }, []);

  const markAsError = useCallback((id: LoadingDependencyId, error: Error) => {
    loadingManager.updateDependencyState(id, false, error);
  }, []);

  // 📊 Estado derivado y utilidades
  const derivedState = useMemo(() => ({
    // Estado principal
    isGlobalLoading: loadingState.isGlobalLoading,
    progress: loadingState.progress,
    currentPhase: loadingState.currentPhase,
    
    // Contadores útiles
    totalDependencies: loadingState.dependencies.size,
    loadedCount: loadingState.loadedDependencies.size,
    failedCount: loadingState.failedDependencies.size,
    loadingCount: Array.from(loadingState.dependencies.values()).filter(d => d.isLoading).length,
    
    // Estados por fase
    initializationComplete: !Array.from(loadingState.dependencies.values())
      .some(d => d.phase === 'initialization' && d.isLoading),
    
    authenticationComplete: !Array.from(loadingState.dependencies.values())
      .some(d => d.phase === 'authentication' && d.isLoading),
    
    dataLoadingComplete: !Array.from(loadingState.dependencies.values())
      .some(d => d.phase === 'data-loading' && d.isLoading),
    
    // Dependencias por prioridad
    criticalDependencies: Array.from(loadingState.dependencies.values())
      .filter(d => d.priority === 'critical'),
    
    highPriorityDependencies: Array.from(loadingState.dependencies.values())
      .filter(d => d.priority === 'high'),
    
    // Estado de dependencias requeridas
    hasRequiredDependenciesLoading: Array.from(loadingState.dependencies.values())
      .some(d => d.isRequired && d.isLoading),
    
    // Tiempo estimado
    estimatedTimeLeft: loadingState.estimatedTimeLeft,
    estimatedTimeLeftFormatted: loadingState.estimatedTimeLeft 
      ? formatTime(loadingState.estimatedTimeLeft)
      : undefined,
  }), [loadingState]);

  return {
    // Estado
    ...derivedState,
    rawState: loadingState,
    
    // Acciones
    registerDependency,
    updateDependencyState,
    markAsLoading,
    markAsComplete,
    markAsError,
    
    // Utilidades
    isLoading: (id?: LoadingDependencyId) => loadingManager.isLoading(id),
    getDependency: (id: LoadingDependencyId) => loadingManager.getDependency(id),
    reset: () => loadingManager.reset(),
  };
}

/**
 * 🪝 Hook para dependencias específicas
 */
export function useLoadingDependency(id: LoadingDependencyId) {
  const { rawState, updateDependencyState } = useLoadingManager();
  const dependency = rawState.dependencies.get(id);
  
  const setLoading = useCallback((isLoading: boolean, error?: Error) => {
    updateDependencyState(id, isLoading, error);
  }, [id, updateDependencyState]);

  return {
    dependency,
    isLoading: dependency?.isLoading ?? false,
    isLoaded: rawState.loadedDependencies.has(id),
    hasFailed: rawState.failedDependencies.has(id),
    setLoading,
    markComplete: () => setLoading(false),
    markError: (error: Error) => setLoading(false, error),
  };
}

/**
 * 🪝 Hook para configuración inicial de dependencias comunes
 */
export function useLoadingSetup() {
  const { registerDependency } = useLoadingManager();

  const setupCommonDependencies = useCallback(() => {
    const commonDeps = LoadingManager.createCommonDependencies();
    commonDeps.forEach(dep => registerDependency(dep));
  }, [registerDependency]);

  const setupCustomDependency = useCallback((
    id: LoadingDependencyId,
    options: Partial<Omit<LoadingDependency, 'id'>>
  ) => {
    const dependency: LoadingDependency = {
      id,
      name: options.name || id.toString(),
      priority: options.priority || 'medium',
      phase: options.phase || 'data-loading',
      isLoading: options.isLoading ?? true,
      isRequired: options.isRequired ?? false,
      ...options,
    };
    
    registerDependency(dependency);
  }, [registerDependency]);

  return {
    setupCommonDependencies,
    setupCustomDependency,
  };
}

/**
 * 🪝 Hook para monitoreo de fases
 */
export function useLoadingPhase() {
  const { currentPhase, rawState } = useLoadingManager();

  const phaseInfo = useMemo(() => {
    const dependencies = Array.from(rawState.dependencies.values());
    const phaseDependencies = dependencies.filter(d => d.phase === currentPhase);
    
    return {
      currentPhase,
      totalInPhase: phaseDependencies.length,
      loadingInPhase: phaseDependencies.filter(d => d.isLoading).length,
      completedInPhase: phaseDependencies.filter(d => !d.isLoading).length,
      phaseProgress: phaseDependencies.length > 0 
        ? ((phaseDependencies.filter(d => !d.isLoading).length / phaseDependencies.length) * 100)
        : 100,
    };
  }, [currentPhase, rawState]);

  return phaseInfo;
}

// 🔧 Utilidades
function formatTime(milliseconds: number): string {
  const seconds = Math.ceil(milliseconds / 1000);
  
  if (seconds < 60) {
    return `${seconds}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${remainingMinutes}m`;
  }
}