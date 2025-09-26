// AI Chat Ports - Clean Architecture Application Layer

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
  GenerateContentResponse
} from '../../domain';

// Puerto para el servicio de AI Chat
export interface AIChatServicePort {
  // Obtener herramientas disponibles
  getTools(currentText?: string): Promise<AIToolsResponse>;
  
  // Gestión de sesiones
  createSession(request: CreateSessionRequest): Promise<CreateSessionResponse>;
  getSession(conversationId: string): Promise<CreateSessionResponse>;
  getSessions(params?: {
    activeOnly?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<SessionsListResponse>;
  resetSession(conversationId: string): Promise<ResetSessionResponse>;
  
  // Interacción con el chat
  processTool(conversationId: string, request: ProcessToolRequest): Promise<ProcessToolResponse>;
  sendMessage(conversationId: string, request: SendMessageRequest): Promise<SendMessageResponse>;
  getConversation(conversationId: string, includeSystem?: boolean): Promise<ConversationResponse>;
  
  // Aplicar transformaciones y feedback
  applyTransformation(conversationId: string, messageId: string): Promise<ApplyTransformationResponse>;
  addFeedback(conversationId: string, messageId: string, request: FeedbackRequest): Promise<FeedbackResponse>;
  
  // Generación de contenido
  generateContent(sessionId: string, request: GenerateContentRequest): Promise<GenerateContentResponse>;
}
