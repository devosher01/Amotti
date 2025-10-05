import { HttpClient } from '../../../../lib/http-client';
import { PublicationRepositoryPort, CreatePublicationCommand, UpdatePublicationCommand, DeleteCommand, ListPublicationsQuery, GetPublicationQuery, ListPublicationsResponse } from '../../application/ports/publication-repository.port';
import { Publication } from '../../domain/entities/publication';
import { 
  mapApiResponseToPublication,
  mapCreateCommandToJsonRequest,
  mapUpdateCommandToJsonRequest,
  ApiPublicationData 
} from '../mappers/publication-api-mapper';

export function createPublicationApiAdapter(httpClient: HttpClient): PublicationRepositoryPort {
  return {

    async list(query: ListPublicationsQuery): Promise<ListPublicationsResponse> {
      const params = new URLSearchParams();
      
      if (query.status) params.append('status', query.status);
      if (query.platform) params.append('platform', query.platform);
      if (query.startDate) params.append('startDate', query.startDate.toISOString());
      if (query.endDate) params.append('endDate', query.endDate.toISOString());
      if (query.limit) params.append('limit', query.limit.toString());
      if (query.offset) params.append('offset', query.offset.toString());
      if (query.userId) params.append('userId', query.userId.toString());
      
      if (query.platforms) {
        const platformsArray = Array.isArray(query.platforms) ? query.platforms : [query.platforms];
        params.append('platforms', platformsArray.join(','));
      }
      
      if (query.period) params.append('period', query.period);
      if (query.referenceDate) params.append('referenceDate', query.referenceDate);
      if (query.contentType) params.append('contentType', query.contentType);

      const result = await httpClient.get<{
        success: boolean;
        data: {
          items: ApiPublicationData[];
          total: number;
          limit: number;
          offset: number;
        };
        message: string;
      }>(`/publications?${params.toString()}`);
      
      console.log('🔍 RAW API Response for publications:', {
        success: result.success,
        itemsCount: result.data?.items?.length || 0,
        firstItem: result.data?.items?.[0] || null,
        sampleDates: result.data?.items?.slice(0, 3)?.map(item => ({
          id: item.id,
          createdAt: item.createdAt,
          scheduledAt: item.scheduledAt,
          publishedAt: item.publishedAt
        })) || []
      });
      
      return {
        publications: result.data?.items?.map(mapApiResponseToPublication) || [],
        total: result.data?.total || 0,
        limit: result.data?.limit || query.limit || 10,
        offset: result.data?.offset || query.offset || 0,
        hasMore: (result.data?.offset || 0) + (result.data?.items?.length || 0) < (result.data?.total || 0)
      };
    },

    async getById(query: GetPublicationQuery): Promise<Publication> {
      try {
        const result = await httpClient.get<{ data: ApiPublicationData }>(
          `/publications/${query.id.toString()}`
        );
        return mapApiResponseToPublication(result.data);
      } catch (error: any) {
        if (error.response?.status === 404) {
          throw new Error('Publication not found');
        }
        throw error;
      }
    },

    async create(command: CreatePublicationCommand): Promise<Publication> {
      const requestData = mapCreateCommandToJsonRequest(command);
      const result = await httpClient.post<{ data: ApiPublicationData }>('/publications', requestData);
      return mapApiResponseToPublication(result.data);
    },

    async update(command: UpdatePublicationCommand): Promise<Publication> {
      const requestData = mapUpdateCommandToJsonRequest(command);
      const result = await httpClient.put<{ data: ApiPublicationData }>(`/publications/${command.id.toString()}`, requestData);
      return mapApiResponseToPublication(result.data);
    },


    async delete(command: DeleteCommand): Promise<void> {
      await httpClient.delete(`/publications/${command.id.toString()}`);
    }
  };
}
