// 🎯 AUTOLISTAS - React Hook

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
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
  PostResponseDto,
} from '../../domain/dtos/AutolistaDto';
import { 
  AutolistaStatus, 
  SocialPlatform, 
  ScheduleType, 
  PostStatus, 
  ContentType 
} from '../../domain/entities/Autolista';

// Mock data para desarrollo (esto sería reemplazado por llamadas reales a la API)
const mockAutolistaService = {
  async getAutolistas(query: GetAutolistasQueryDto): Promise<GetAutolistasResponseDto> {
    // Simulación de delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      autolistas: [
                 {
           id: '1',
           name: 'Contenido Motivacional',
           description: 'Posts inspiracionales para aumentar engagement',
           status: AutolistaStatus.ACTIVE,
           isCircular: true,
           useUrlShortener: true,
           platforms: [SocialPlatform.TWITTER, SocialPlatform.LINKEDIN, SocialPlatform.INSTAGRAM],
           schedule: {
             type: ScheduleType.DAILY,
             times: ['09:00', '15:00', '19:00'],
             timezone: 'America/Lima',
           },
           nextExecutionAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
           totalPosts: 45,
           activePosts: 42,
           publishedPosts: 120,
           createdAt: new Date('2024-01-15').toISOString(),
           updatedAt: new Date('2024-01-25').toISOString(),
           userId: 'user-1',
         },
         {
           id: '2',
           name: 'Tips de Marketing',
           description: 'Consejos profesionales sobre marketing digital',
           status: AutolistaStatus.ACTIVE,
           isCircular: false,
           useUrlShortener: false,
           platforms: [SocialPlatform.LINKEDIN, SocialPlatform.TWITTER],
           schedule: {
             type: ScheduleType.WEEKLY,
             times: ['10:00', '16:00'],
             days: [1, 2, 3, 4, 5],
             timezone: 'America/Lima',
           },
           nextExecutionAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
           totalPosts: 30,
           activePosts: 25,
           publishedPosts: 85,
           createdAt: new Date('2024-01-20').toISOString(),
           updatedAt: new Date('2024-01-25').toISOString(),
           userId: 'user-1',
         },
         {
           id: '3',
           name: 'Productos Destacados',
           description: 'Promoción de productos y servicios principales',
           status: AutolistaStatus.PAUSED,
           isCircular: true,
           useUrlShortener: true,
           platforms: [SocialPlatform.FACEBOOK, SocialPlatform.INSTAGRAM, SocialPlatform.TWITTER],
           schedule: {
             type: ScheduleType.CUSTOM,
             times: ['12:00', '18:00'],
             timezone: 'America/Lima',
           },
           totalPosts: 25,
           activePosts: 20,
           publishedPosts: 67,
           createdAt: new Date('2024-01-10').toISOString(),
           updatedAt: new Date('2024-01-25').toISOString(),
           userId: 'user-1',
         },
      ],
      total: 3,
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  },

  async getAutolistaById(id: string): Promise<AutolistaWithPostsResponseDto> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Helper para crear posts tipados correctamente
    const createPost = (postData: any): PostResponseDto => ({
      id: postData.id,
      autolistaId: postData.autolistaId,
      position: postData.position,
      content: postData.content,
      media: postData.media || [],
      platforms: postData.platforms,
      status: postData.status,
      scheduledAt: postData.scheduledAt,
      publishedAt: postData.publishedAt,
      hashtags: postData.hashtags || [],
      mentions: postData.mentions || [],
      isActive: postData.isActive,
      createdAt: postData.createdAt,
      updatedAt: postData.updatedAt,
    });

    // Mock data basada en el ID
    const baseAutolista: AutolistaWithPostsResponseDto = {
      id,
      name: 'Contenido Motivacional',
      description: 'Posts inspiracionales para aumentar engagement en redes sociales',
      status: AutolistaStatus.ACTIVE,
      isCircular: true,
      useUrlShortener: true,
      platforms: [SocialPlatform.TWITTER, SocialPlatform.LINKEDIN, SocialPlatform.INSTAGRAM],
      schedule: {
        type: ScheduleType.DAILY,
        times: ['09:00', '15:00', '19:00'],
        timezone: 'America/Lima',
      },
      nextExecutionAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      totalPosts: 45,
      activePosts: 42,
      publishedPosts: 120,
      createdAt: new Date('2024-01-15').toISOString(),
      updatedAt: new Date('2024-01-25').toISOString(),
      userId: 'user-1',
      posts: [
        createPost({
          id: '1',
          autolistaId: id,
          position: 1,
          content: '🌟 "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito." - Albert Schweitzer',
          media: [],
          platforms: [SocialPlatform.TWITTER, SocialPlatform.LINKEDIN],
          status: PostStatus.PENDING,
          scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          hashtags: ['motivacion', 'exito', 'felicidad'],
          mentions: [],
          isActive: true,
          createdAt: new Date('2024-01-20').toISOString(),
          updatedAt: new Date('2024-01-25').toISOString(),
        }),
        createPost({
          id: '2',
          autolistaId: id,
          position: 2,
          content: '💪 Cada desafío es una oportunidad disfrazada. No tengas miedo de enfrentar lo desconocido, porque ahí es donde encuentras tu verdadero potencial.',
          media: [
            {
              id: '1',
              type: ContentType.IMAGE,
              url: '/images/motivation-1.jpg',
              alt: 'Imagen motivacional',
            },
          ],
          platforms: [SocialPlatform.INSTAGRAM, SocialPlatform.TWITTER],
          status: PostStatus.PUBLISHED,
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          hashtags: ['desafios', 'oportunidades', 'potencial'],
          mentions: [],
          isActive: true,
          createdAt: new Date('2024-01-19').toISOString(),
          updatedAt: new Date('2024-01-25').toISOString(),
        }),
        createPost({
          id: '3',
          autolistaId: id,
          position: 3,
          content: '🚀 "No esperes el momento perfecto. Toma el momento y hazlo perfecto." El tiempo perfecto nunca llega, pero el momento correcto es ahora.',
          media: [],
          platforms: [SocialPlatform.LINKEDIN, SocialPlatform.TWITTER, SocialPlatform.INSTAGRAM],
          status: PostStatus.FAILED,
          scheduledAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          hashtags: ['accion', 'momento', 'perfecto'],
          mentions: [],
          isActive: false,
          createdAt: new Date('2024-01-18').toISOString(),
          updatedAt: new Date('2024-01-25').toISOString(),
        }),
      ],
    };

    return baseAutolista;
  },

  async getAutolistaStats(): Promise<AutolistaStatsResponseDto> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      totalAutolistas: 12,
      activeAutolistas: 8,
      totalPosts: 156,
      publishedToday: 24,
      scheduledNext24h: 18,
      platforms: [
        { platform: SocialPlatform.TWITTER, count: 10 },
        { platform: SocialPlatform.LINKEDIN, count: 8 },
        { platform: SocialPlatform.INSTAGRAM, count: 6 },
        { platform: SocialPlatform.FACEBOOK, count: 4 },
      ],
    };
  },

  async createAutolista(request: CreateAutolistaRequestDto): Promise<AutolistaWithPostsResponseDto> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Date.now().toString(),
      name: request.name,
      description: request.description,
      status: AutolistaStatus.DRAFT,
      isCircular: request.isCircular,
      useUrlShortener: request.useUrlShortener,
      platforms: request.platforms,
      schedule: request.schedule,
      totalPosts: 0,
      activePosts: 0,
      publishedPosts: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'user-1',
      posts: [],
    };
  },

  async updateAutolista(request: UpdateAutolistaRequestDto): Promise<AutolistaWithPostsResponseDto> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulación de actualización - en realidad vendría de la API
    const existing = await this.getAutolistaById(request.id);
    
    return {
      ...existing,
      ...request,
      updatedAt: new Date().toISOString(),
    };
  },

  async deleteAutolista(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 600));
    // Simulación de eliminación
  },

  async toggleAutolistaStatus(request: ToggleAutolistaStatusDto): Promise<AutolistaWithPostsResponseDto> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const existing = await this.getAutolistaById(request.id);
    
    return {
      ...existing,
      status: request.status,
      updatedAt: new Date().toISOString(),
    };
  },

  async executeAutolista(request: ExecuteAutolistaDto): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    // Simulación de ejecución
  },
};

// Query Keys
const QUERY_KEYS = {
  autolistas: ['autolistas'] as const,
  autolistasList: (query?: GetAutolistasQueryDto) => ['autolistas', 'list', query] as const,
  autolistaDetail: (id: string) => ['autolistas', 'detail', id] as const,
  autolistaStats: ['autolistas', 'stats'] as const,
} as const;

export const useAutolistas = (query?: GetAutolistasQueryDto) => {
  return useQuery({
    queryKey: QUERY_KEYS.autolistasList(query),
    queryFn: () => mockAutolistaService.getAutolistas(query || {}),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};

export const useAutolistaDetail = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.autolistaDetail(id),
    queryFn: () => mockAutolistaService.getAutolistaById(id),
    enabled: !!id,
    staleTime: 3 * 60 * 1000, // 3 minutos
  });
};

export const useAutolistaStats = () => {
  return useQuery({
    queryKey: QUERY_KEYS.autolistaStats,
    queryFn: () => mockAutolistaService.getAutolistaStats(),
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

export const useCreateAutolista = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: CreateAutolistaRequestDto) => 
      mockAutolistaService.createAutolista(request),
    onSuccess: () => {
      // Invalidar consultas relacionadas
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.autolistas });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.autolistaStats });
    },
  });
};

export const useUpdateAutolista = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: UpdateAutolistaRequestDto) => 
      mockAutolistaService.updateAutolista(request),
    onSuccess: (data, variables) => {
      // Actualizar cache específico
      queryClient.setQueryData(
        QUERY_KEYS.autolistaDetail(variables.id),
        data
      );
      // Invalidar lista
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.autolistas });
    },
  });
};

export const useDeleteAutolista = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => mockAutolistaService.deleteAutolista(id),
    onSuccess: (_, id) => {
      // Remover del cache
      queryClient.removeQueries({ queryKey: QUERY_KEYS.autolistaDetail(id) });
      // Invalidar lista y stats
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.autolistas });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.autolistaStats });
    },
  });
};

export const useToggleAutolistaStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: ToggleAutolistaStatusDto) => 
      mockAutolistaService.toggleAutolistaStatus(request),
    onSuccess: (data, variables) => {
      // Actualizar cache específico
      queryClient.setQueryData(
        QUERY_KEYS.autolistaDetail(variables.id),
        data
      );
      // Invalidar lista
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.autolistas });
    },
  });
};

export const useExecuteAutolista = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: ExecuteAutolistaDto) => 
      mockAutolistaService.executeAutolista(request),
    onSuccess: (_, variables) => {
      // Invalidar datos después de ejecutar
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.autolistaDetail(variables.id) 
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.autolistaStats });
    },
  });
};

// Hook compuesto para funcionalidades completas
export const useAutolistasManager = () => {
  const queryClient = useQueryClient();
  
  const invalidateAll = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.autolistas });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.autolistaStats });
  }, [queryClient]);

  const refreshAutolista = useCallback((id: string) => {
    queryClient.invalidateQueries({ 
      queryKey: QUERY_KEYS.autolistaDetail(id) 
    });
  }, [queryClient]);

  return {
    invalidateAll,
    refreshAutolista,
    // Re-exportar hooks individuales
    useAutolistas,
    useAutolistaDetail,
    useAutolistaStats,
    useCreateAutolista,
    useUpdateAutolista,
    useDeleteAutolista,
    useToggleAutolistaStatus,
    useExecuteAutolista,
  };
}; 