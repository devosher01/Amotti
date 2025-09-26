import { useEffect, useState, useCallback } from 'react';
import { simpleLoadingManager } from '@/core/loading/SimpleLoadingManager';

export function useSimpleLoading() {
  const [, setTrigger] = useState(0);

  useEffect(() => {
    const unsubscribe = simpleLoadingManager.subscribe(() => {
      setTrigger(prev => prev + 1);
    });
    return unsubscribe;
  }, []);

  const registerLoader = useCallback((
    key: string, 
    options: {
      priority?: 'critical' | 'high' | 'medium' | 'low';
      required?: boolean;
      name?: string;
    } = {}
  ) => {
    simpleLoadingManager.register(key, {
      priority: options.priority || 'medium',
      required: options.required || false,
      name: options.name || key
    });
  }, []);

  const setLoading = useCallback((key: string, isLoading: boolean) => {
    simpleLoadingManager.setLoading(key, isLoading);
  }, []);

  return {
    isGlobalLoading: simpleLoadingManager.isGlobalLoading(),
    registerLoader,
    setLoading,
    state: simpleLoadingManager.getState()
  };
}

export function useFeatureLoading(featureKey: string) {
  const { registerLoader, setLoading } = useSimpleLoading();

  useEffect(() => {
    registerLoader(featureKey, { required: true });
    return () => {
      setLoading(featureKey, false);
    };
  }, [featureKey, registerLoader, setLoading]);

  return {
    setLoading: (isLoading: boolean) => setLoading(featureKey, isLoading),
    markComplete: () => setLoading(featureKey, false),
  };
}