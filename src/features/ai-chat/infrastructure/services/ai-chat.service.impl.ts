// AI Chat Service Implementation - Clean Architecture Infrastructure Layer

import { injectable } from 'inversify';
import { httpClient } from '@/lib/http-client';
import type { AIChatServicePort } from '../../application/ports/ai-chat.ports';
import type {
  AIToolsResponse,
  CreateSessionRequest,
  CreateSessionResponse,
  ProcessToolRequest,
  ProcessToolResponse,
  SendMessageRequest,
  SendMessageResponse,
  ApplyTransformationResponse,
  FeedbackRequest,
  FeedbackResponse,
  ConversationResponse,
  SessionsListResponse,
  ResetSessionResponse,
  GenerateContentRequest,
  GenerateContentResponse,
  APIError
} from '../../domain';

@injectable()
export class AIChatServiceImpl implements AIChatServicePort {
  private static readonly BASE_URL = '/ai-chat';

  /**
   * Obtener herramientas de IA disponibles
   */
  async getTools(currentText?: string): Promise<AIToolsResponse> {
    try {
      const params = currentText ? { currentText } : {};
      const response = await httpClient.get<AIToolsResponse>(
        `${AIChatServiceImpl.BASE_URL}/tools`,
        { params }
      );
      return response;
    } catch (error) {
      console.error('Error fetching AI tools:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Crear nueva sesión de chat
   */
  async createSession(request: CreateSessionRequest): Promise<CreateSessionResponse> {
    try {
      const response = await httpClient.post<CreateSessionResponse>(
        `${AIChatServiceImpl.BASE_URL}/sessions`,
        request
      );
      return response;
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Procesar herramienta de IA
   */
  async processTool(
    conversationId: string,
    request: ProcessToolRequest
  ): Promise<ProcessToolResponse> {
    try {
      const response = await httpClient.post<ProcessToolResponse>(
        `${AIChatServiceImpl.BASE_URL}/sessions/${conversationId}/tools`,
        request
      );
      return response;
    } catch (error) {
      console.error('Error processing AI tool:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Enviar mensaje conversacional
   */
  async sendMessage(
    conversationId: string,
    request: SendMessageRequest
  ): Promise<SendMessageResponse> {
    try {
      const response = await httpClient.post<SendMessageResponse>(
        `${AIChatServiceImpl.BASE_URL}/sessions/${conversationId}/messages`,
        request
      );
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Aplicar transformación de texto
   */
  async applyTransformation(
    conversationId: string,
    messageId: string
  ): Promise<ApplyTransformationResponse> {
    try {
      const response = await httpClient.put<ApplyTransformationResponse>(
        `${AIChatServiceImpl.BASE_URL}/sessions/${conversationId}/messages/${messageId}/apply`
      );
      return response;
    } catch (error) {
      console.error('Error applying transformation:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Añadir feedback a mensaje
   */
  async addFeedback(
    conversationId: string,
    messageId: string,
    request: FeedbackRequest
  ): Promise<FeedbackResponse> {
    try {
      const response = await httpClient.put<FeedbackResponse>(
        `${AIChatServiceImpl.BASE_URL}/sessions/${conversationId}/messages/${messageId}/feedback`,
        request
      );
      return response;
    } catch (error) {
      console.error('Error adding feedback:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtener historial de conversación
   */
  async getConversation(
    conversationId: string,
    includeSystem?: boolean
  ): Promise<ConversationResponse> {
    try {
      const params = includeSystem ? { includeSystem } : {};
      const response = await httpClient.get<ConversationResponse>(
        `${AIChatServiceImpl.BASE_URL}/sessions/${conversationId}/conversation`,
        { params }
      );
      return response;
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtener detalles de sesión
   */
  async getSession(conversationId: string): Promise<CreateSessionResponse> {
    try {
      const response = await httpClient.get<CreateSessionResponse>(
        `${AIChatServiceImpl.BASE_URL}/sessions/${conversationId}`
      );
      return response;
    } catch (error) {
      console.error('Error fetching session:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtener sesiones del usuario
   */
  async getSessions(params?: {
    activeOnly?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<SessionsListResponse> {
    try {
      const response = await httpClient.get<SessionsListResponse>(
        `${AIChatServiceImpl.BASE_URL}/sessions`,
        { params }
      );
      return response;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Reiniciar sesión de chat
   */
  async resetSession(conversationId: string): Promise<ResetSessionResponse> {
    try {
      const response = await httpClient.post<ResetSessionResponse>(
        `${AIChatServiceImpl.BASE_URL}/sessions/${conversationId}/reset`
      );
      return response;
    } catch (error) {
      console.error('Error resetting session:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Generar contenido desde cero usando IA
   */
  async generateContent(sessionId: string, request: GenerateContentRequest): Promise<GenerateContentResponse> {
    try {
      // 🎯 Usar el mismo formato que processTool - el backend espera toolType, no tool
      const requestBody = {
        toolType: String('generate_content'), // Asegurar que sea string
        userMessage: String(request.userInstructions || 'Genera contenido desde cero'),
        parameters: request.parameters || {}
      };

      console.log('🚀 [AI Service] Sending request to backend:', {
        url: `${AIChatServiceImpl.BASE_URL}/sessions/${sessionId}/tools`,
        method: 'POST',
        body: requestBody,
        toolTypeType: typeof requestBody.toolType,
        toolTypeValue: requestBody.toolType
      });

      const response = await httpClient.post<GenerateContentResponse>(
        `${AIChatServiceImpl.BASE_URL}/sessions/${sessionId}/tools`,
        requestBody
      );
      return response;
    } catch (error) {
      console.error('❌ [AI Service] Error generating content:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Manejar errores de la API
   */
  private handleError(error: any): APIError {
    if (error.response?.data) {
      return error.response.data;
    }
    
    return {
      message: 'Error de conexión con el servidor',
      error: 'NetworkError',
      statusCode: 0
    };
  }
}
