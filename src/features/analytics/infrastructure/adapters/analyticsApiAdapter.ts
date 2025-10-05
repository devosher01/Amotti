import { 
  FacebookAnalyticsData, 
  FacebookPost, 
  InstagramAnalyticsData, 
  InstagramPost, 
  AnalyticsApiResponse, 
  PostsApiResponse 
} from '../../domain/types';
import { httpClient } from '@/lib/http-client';

interface AnalyticsAdapter {
  getFacebookAnalytics: (accountId: string, startDate: string, endDate: string) => Promise<FacebookAnalyticsData>;
  getFacebookPosts: (accountId: string, limit: number) => Promise<FacebookPost[]>;
  getInstagramAnalytics: (accountId: string, startDate: string, endDate: string) => Promise<InstagramAnalyticsData>;
  getInstagramPosts: (accountId: string, limit: number) => Promise<InstagramPost[]>;
}

export const analyticsApiAdapter: AnalyticsAdapter = {
  async getFacebookAnalytics(accountId, startDate, endDate) {
    console.log('📤 Facebook Analytics Request:', {
      url: `/analytics?platform=facebook&accountId=${accountId}&startDate=${startDate}&endDate=${endDate}`,
      params: { accountId, startDate, endDate }
    });
    
    const data = await httpClient.get<AnalyticsApiResponse>(
      `/analytics?platform=facebook&accountId=${accountId}&startDate=${startDate}&endDate=${endDate}`
    );
    
    console.log('📥 Facebook Analytics Response - RAW DATA:', JSON.stringify(data, null, 2));
    console.log('📥 Facebook Analytics Response - METRICS:', data.metrics);
    console.log('📥 Facebook Analytics Response - CONNECTIONS:', data.availableConnections);
    
    return {
      metrics: data.metrics,
      posts: [], // Posts are fetched separately
      availableConnections: data.availableConnections,
    };
  },

  async getFacebookPosts(accountId, limit) {
    console.log('📤 Facebook Posts Request:', {
      url: `/analytics/posts?platform=facebook&accountId=${accountId}&limit=${limit}`,
      params: { accountId, limit }
    });
    
    const data = await httpClient.get<PostsApiResponse<FacebookPost>>(
      `/analytics/posts?platform=facebook&accountId=${accountId}&limit=${limit}`
    );
    
    console.log('📥 Facebook Posts Response - RAW DATA:', JSON.stringify(data, null, 2));
    console.log('📥 Facebook Posts Response - POSTS ARRAY:', data.posts);
    console.log('📥 Facebook Posts Response - POSTS COUNT:', data.posts?.length);
    
    return data.posts;
  },

  async getInstagramAnalytics(accountId, startDate, endDate) {
    console.log('📤 Instagram Analytics Request:', {
      url: `/analytics?platform=instagram&accountId=${accountId}&startDate=${startDate}&endDate=${endDate}`,
      params: { accountId, startDate, endDate }
    });
    
    const data = await httpClient.get<AnalyticsApiResponse>(
      `/analytics?platform=instagram&accountId=${accountId}&startDate=${startDate}&endDate=${endDate}`
    );
    
    console.log('📥 Instagram Analytics Response - RAW DATA:', JSON.stringify(data, null, 2));
    console.log('📥 Instagram Analytics Response - METRICS:', data.metrics);
    console.log('📥 Instagram Analytics Response - CONNECTIONS:', data.availableConnections);
    
    return {
      metrics: data.metrics,
      posts: [], // Posts are fetched separately
      availableConnections: data.availableConnections,
    };
  },

  async getInstagramPosts(accountId, limit) {
    console.log('📤 Instagram Posts Request:', {
      url: `/analytics/posts?platform=instagram&accountId=${accountId}&limit=${limit}`,
      params: { accountId, limit }
    });
    
    const data = await httpClient.get<PostsApiResponse<InstagramPost>>(
      `/analytics/posts?platform=instagram&accountId=${accountId}&limit=${limit}`
    );
    
    console.log('📥 Instagram Posts Response - RAW DATA:', JSON.stringify(data, null, 2));
    console.log('📥 Instagram Posts Response - POSTS ARRAY:', data.posts);
    console.log('📥 Instagram Posts Response - POSTS COUNT:', data.posts?.length);
    
    return data.posts;
  },
};
