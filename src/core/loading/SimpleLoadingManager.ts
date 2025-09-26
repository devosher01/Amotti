type LoadingKey = string;

interface LoadingItem {
  isLoading: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
  required: boolean;
  name?: string;
}

class SimpleLoadingManager {
  private static instance: SimpleLoadingManager;
  private loadingStates = new Map<LoadingKey, LoadingItem>();
  private listeners = new Set<() => void>();

  private constructor() {}

  static getInstance(): SimpleLoadingManager {
    if (!SimpleLoadingManager.instance) {
      SimpleLoadingManager.instance = new SimpleLoadingManager();
    }
    return SimpleLoadingManager.instance;
  }

  register(key: LoadingKey, config: Omit<LoadingItem, 'isLoading'>) {
    this.loadingStates.set(key, {
      isLoading: true,
      ...config
    });
    this.notifyListeners();
  }

  setLoading(key: LoadingKey, isLoading: boolean) {
    const item = this.loadingStates.get(key);
    if (item) {
      item.isLoading = isLoading;
      this.notifyListeners();
    }
  }

  // 🎯 Verificar si algún item crítico está cargando
  isGlobalLoading(): boolean {
    for (const [_, item] of this.loadingStates) {
      if (item.required && item.isLoading) {
        return true;
      }
    }
    return false;
  }

  // 👂 Escuchar cambios
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  // 🧹 Reset
  reset() {
    this.loadingStates.clear();
    this.notifyListeners();
  }

  // 📊 Estado para debugging
  getState() {
    return {
      total: this.loadingStates.size,
      loading: Array.from(this.loadingStates.values()).filter(item => item.isLoading).length,
      critical: Array.from(this.loadingStates.values()).filter(item => item.required && item.isLoading).length,
      isGlobalLoading: this.isGlobalLoading()
    };
  }
}

export const simpleLoadingManager = SimpleLoadingManager.getInstance();