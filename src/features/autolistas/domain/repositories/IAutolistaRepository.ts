// 🎯 AUTOLISTAS - Domain Repository Interface

import type {
  CreateAutolistaRequestDto,
  UpdateAutolistaRequestDto,
  GetAutolistasQueryDto,
  GetAutolistasResponseDto,
  AutolistaWithPostsResponseDto,
  AutolistaStatsResponseDto,
  ToggleAutolistaStatusDto,
  ExecuteAutolistaDto,
  ImportFromCSVRequestDto,
  ImportFromRSSRequestDto,
  ValidateRSSDto,
  ValidateRSSResponseDto,
  ValidateCSVDto,
  ValidateCSVResponseDto,
} from '../dtos/AutolistaDto';

export interface IAutolistaRepository {
  // ==============================
  // CRUD Operations
  // ==============================
  
  /**
   * Crear una nueva autolista
   */
  createAutolista(request: CreateAutolistaRequestDto): Promise<AutolistaWithPostsResponseDto>;
  
  /**
   * Obtener autolistas con paginación y filtros
   */
  getAutolistas(query: GetAutolistasQueryDto): Promise<GetAutolistasResponseDto>;
  
  /**
   * Obtener una autolista específica con sus posts
   */
  getAutolistaById(id: string): Promise<AutolistaWithPostsResponseDto>;
  
  /**
   * Actualizar una autolista existente
   */
  updateAutolista(request: UpdateAutolistaRequestDto): Promise<AutolistaWithPostsResponseDto>;
  
  /**
   * Eliminar una autolista
   */
  deleteAutolista(id: string): Promise<void>;
  
  /**
   * Duplicar una autolista existente
   */
  duplicateAutolista(id: string, newName: string): Promise<AutolistaWithPostsResponseDto>;

  // ==============================
  // Status Management
  // ==============================
  
  /**
   * Cambiar el estado de una autolista (activar/pausar)
   */
  toggleAutolistaStatus(request: ToggleAutolistaStatusDto): Promise<AutolistaWithPostsResponseDto>;
  
  /**
   * Ejecutar una autolista manualmente
   */
  executeAutolista(request: ExecuteAutolistaDto): Promise<void>;

  // ==============================
  // Import/Export
  // ==============================
  
  /**
   * Importar posts desde un archivo CSV
   */
  importFromCSV(request: ImportFromCSVRequestDto): Promise<AutolistaWithPostsResponseDto>;
  
  /**
   * Importar posts desde un feed RSS
   */
  importFromRSS(request: ImportFromRSSRequestDto): Promise<AutolistaWithPostsResponseDto>;
  
  /**
   * Validar un feed RSS antes de importar
   */
  validateRSS(request: ValidateRSSDto): Promise<ValidateRSSResponseDto>;
  
  /**
   * Validar un archivo CSV antes de importar
   */
  validateCSV(request: ValidateCSVDto): Promise<ValidateCSVResponseDto>;

  // ==============================
  // Analytics & Stats
  // ==============================
  
  /**
   * Obtener estadísticas generales de autolistas
   */
  getAutolistaStats(): Promise<AutolistaStatsResponseDto>;
  
  /**
   * Obtener métricas de una autolista específica
   */
  getAutolistaMetrics(id: string, startDate?: Date, endDate?: Date): Promise<{
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    avgEngagement: number;
    topPerformingPosts: any[];
    platformPerformance: any[];
  }>;

  // ==============================
  // Scheduling
  // ==============================
  
  /**
   * Obtener próximas ejecuciones programadas
   */
  getUpcomingExecutions(): Promise<{
    autolistaId: string;
    autolistaName: string;
    nextExecution: Date;
    postContent: string;
    platforms: string[];
  }[]>;
  
  /**
   * Reagendar una autolista
   */
  rescheduleAutolista(id: string, nextExecutionAt: Date): Promise<void>;
} 