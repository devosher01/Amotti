import { httpClient } from '@/lib/http-client';
import { AnalyticsResponse, PostsResponse, Platform, TimeRange } from './types';
import { endpoints } from './endpoints';

class AnalyticsV2Service {
  // General methods - usando el httpClient existente
  async getMetrics(platform: Platform, days: TimeRange): Promise<AnalyticsResponse> {
    const endpoint = endpoints.metrics(platform, days);
    console.log('📤 Analytics V2 Metrics Request:', { platform, days, endpoint });
    
    const data = await httpClient.get<AnalyticsResponse>(`/analytics-v2${endpoint}`);
    console.log('📥 Analytics V2 Metrics Response:', { platform, days, data });
    
    return data;
  }

  async getPosts(platform: Platform, limit: number): Promise<PostsResponse> {
    const endpoint = endpoints.posts(platform, limit);
    console.log('📤 Analytics V2 Posts Request:', { platform, limit, endpoint });
    
    const data = await httpClient.get<PostsResponse>(`/analytics-v2${endpoint}`);
    console.log('📥 Analytics V2 Posts Response:', { platform, limit, data });
    
    return data;
  }

  // Facebook-specific methods
  async getFacebookMetrics(days: TimeRange): Promise<AnalyticsResponse> {
    const endpoint = endpoints.facebook.metrics(days);
    console.log('📤 Facebook Metrics Request:', { days, endpoint });
    
    const data = await httpClient.get<AnalyticsResponse>(`/analytics-v2${endpoint}`);
    console.log('📥 Facebook Metrics Response:', { days, data });
    
    return data;
  }

  async getFacebookPosts(limit: number): Promise<PostsResponse> {
    const endpoint = endpoints.facebook.posts(limit);
    console.log('📤 Facebook Posts Request:', { limit, endpoint });
    
    const data = await httpClient.get<PostsResponse>(`/analytics-v2${endpoint}`);
    console.log('📥 Facebook Posts Response:', { limit, data });
    
    return data;
  }

  // Instagram-specific methods
  async getInstagramMetrics(days: TimeRange): Promise<AnalyticsResponse> {
    const endpoint = endpoints.instagram.metrics(days);
    console.log('📤 Instagram Metrics Request:', { days, endpoint });
    
    const data = await httpClient.get<AnalyticsResponse>(`/analytics-v2${endpoint}`);
    console.log('📥 Instagram Metrics Response:', { days, data });
    
    return data;
  }

  async getInstagramPosts(limit: number): Promise<PostsResponse> {
    const endpoint = endpoints.instagram.posts(limit);
    console.log('📤 Instagram Posts Request:', { limit, endpoint });
    
    const data = await httpClient.get<PostsResponse>(`/analytics-v2${endpoint}`);
    console.log('📥 Instagram Posts Response:', { limit, data });
    
    return data;
  }
}

export const analyticsV2Service = new AnalyticsV2Service();