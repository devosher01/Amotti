// 🎯 AUTOLISTAS POSTS - Domain Repository Interface

import type {
  CreatePostRequestDto,
  UpdatePostRequestDto,
  BulkCreatePostsRequestDto,
  ReorderPostsRequestDto,
  GetPostsQueryDto,
  GetPostsResponseDto,
  PostResponseDto,
  TogglePostStatusDto,
  PreviewPostDto,
} from '../dtos/AutolistaDto';

export interface IPostRepository {
  // ==============================
  // CRUD Operations
  // ==============================
  
  /**
   * Crear un nuevo post en una autolista
   */
  createPost(request: CreatePostRequestDto): Promise<PostResponseDto>;
  
  /**
   * Crear múltiples posts de una vez
   */
  bulkCreatePosts(request: BulkCreatePostsRequestDto): Promise<PostResponseDto[]>;
  
  /**
   * Obtener posts con paginación y filtros
   */
  getPosts(query: GetPostsQueryDto): Promise<GetPostsResponseDto>;
  
  /**
   * Obtener un post específico por ID
   */
  getPostById(id: string): Promise<PostResponseDto>;
  
  /**
   * Obtener posts de una autolista específica
   */
  getPostsByAutolistaId(autolistaId: string, query?: GetPostsQueryDto): Promise<GetPostsResponseDto>;
  
  /**
   * Actualizar un post existente
   */
  updatePost(request: UpdatePostRequestDto): Promise<PostResponseDto>;
  
  /**
   * Eliminar un post
   */
  deletePost(id: string): Promise<void>;
  
  /**
   * Duplicar un post
   */
  duplicatePost(id: string): Promise<PostResponseDto>;

  // ==============================
  // Status Management
  // ==============================
  
  /**
   * Activar/desactivar un post
   */
  togglePostStatus(request: TogglePostStatusDto): Promise<PostResponseDto>;
  
  /**
   * Pausar un post programado
   */
  pausePost(id: string): Promise<PostResponseDto>;
  
  /**
   * Reactivar un post pausado
   */
  resumePost(id: string): Promise<PostResponseDto>;

  // ==============================
  // Ordering & Organization
  // ==============================
  
  /**
   * Reordenar posts en una autolista
   */
  reorderPosts(request: ReorderPostsRequestDto): Promise<PostResponseDto[]>;
  
  /**
   * Mover un post a una posición específica
   */
  movePostToPosition(postId: string, newPosition: number): Promise<PostResponseDto>;
  
  /**
   * Obtener el siguiente post en la cola de una autolista
   */
  getNextPostInQueue(autolistaId: string): Promise<PostResponseDto | null>;

  // ==============================
  // Preview & Validation
  // ==============================
  
  /**
   * Generar vista previa de un post para diferentes plataformas
   */
  generatePreview(request: PreviewPostDto): Promise<{
    platform: string;
    preview: {
      content: string;
      characterCount: number;
      hashtags: string[];
      mentions: string[];
      media: any[];
      isValid: boolean;
      warnings: string[];
    };
  }[]>;
  
  /**
   * Validar contenido de un post para plataformas específicas
   */
  validatePostContent(content: string, platforms: string[]): Promise<{
    platform: string;
    isValid: boolean;
    errors: string[];
    warnings: string[];
    suggestions: string[];
  }[]>;

  // ==============================
  // Publishing & Scheduling
  // ==============================
  
  /**
   * Programar un post para publicación
   */
  schedulePost(postId: string, scheduledAt: Date): Promise<PostResponseDto>;
  
  /**
   * Cancelar programación de un post
   */
  unschedulePost(postId: string): Promise<PostResponseDto>;
  
  /**
   * Publicar un post inmediatamente
   */
  publishPostNow(postId: string): Promise<PostResponseDto>;
  
  /**
   * Obtener posts programados para una fecha específica
   */
  getScheduledPosts(date: Date): Promise<PostResponseDto[]>;

  // ==============================
  // Analytics & Performance
  // ==============================
  
  /**
   * Obtener métricas de rendimiento de un post
   */
  getPostMetrics(postId: string): Promise<{
    impressions: number;
    reach: number;
    engagement: number;
    clicks: number;
    shares: number;
    comments: number;
    likes: number;
    platformMetrics: {
      platform: string;
      impressions: number;
      engagement: number;
    }[];
  }>;
  
  /**
   * Obtener posts con mejor rendimiento de una autolista
   */
  getTopPerformingPosts(autolistaId: string, limit?: number): Promise<PostResponseDto[]>;

  // ==============================
  // AI & Content Generation
  // ==============================
  
  /**
   * Generar contenido con IA basado en un prompt
   */
  generateContentWithAI(prompt: string, platform?: string[]): Promise<{
    content: string;
    hashtags: string[];
    mentions: string[];
    suggestions: string[];
  }>;
  
  /**
   * Optimizar contenido existente para mejor engagement
   */
  optimizeContent(postId: string): Promise<{
    originalContent: string;
    optimizedContent: string;
    improvements: string[];
    expectedEngagementIncrease: number;
  }>;

  // ==============================
  // Batch Operations
  // ==============================
  
  /**
   * Activar/desactivar múltiples posts
   */
  bulkToggleStatus(postIds: string[], isActive: boolean): Promise<PostResponseDto[]>;
  
  /**
   * Eliminar múltiples posts
   */
  bulkDeletePosts(postIds: string[]): Promise<void>;
  
  /**
   * Actualizar plataformas de múltiples posts
   */
  bulkUpdatePlatforms(postIds: string[], platforms: string[]): Promise<PostResponseDto[]>;
} 