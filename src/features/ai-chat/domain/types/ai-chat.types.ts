// AI Chat Domain Types - Clean Architecture Domain Layer

// ===== ENTIDADES PRINCIPALES =====

export interface AITool {
  type: string;
  displayName: string;
  description: string;
  isHighlighted: boolean;
  requiresSubMenu: boolean;
  requiresParameters?: {
    required: boolean;
    parameters: string[];
    suggestions?: Record<string, string[]>;
  };
}

export interface ChatSessionConfig {
  aiInstructions?: string;
  targetPlatforms?: string[];
  contentStyle?: string;
  maxMessages?: number;
}

export interface ChatSession {
  id: string;
  userId: string;
  originalText: string;
  currentText: string;
  config: ChatSessionConfig;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  summary: {
    id: string;
    messageCount: number;
    userMessages: number;
    assistantMessages: number;
    hasTransformations: boolean;
    currentTextWordCount: number;
    originalTextWordCount: number;
    duration: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  avatar: string;
  alignment: 'left' | 'right';
  color: string;
  timestamp: string;
  hasTransformedText: boolean;
  transformedText?: string;
  feedback?: {
    liked: boolean;
    appliedAt: string;
    feedbackText?: string;
  };
}

// ===== REQUEST/RESPONSE TYPES =====

export interface AIToolsResponse {
  success: boolean;
  data: {
    tools: AITool[];
    suggestions: {
      recommended: string[];
      optional: string[];
      reasoning: string;
    };
  };
}

export interface CreateSessionRequest {
  originalText: string;
  config?: ChatSessionConfig;
}

export interface CreateSessionResponse {
  success: boolean;
  data: ChatSession;
  message: string;
}

export interface ProcessToolRequest {
  toolType: string;
  userMessage?: string;
  parameters?: Record<string, any>;
}

// ===== CONTENT GENERATION TYPES =====

export interface GenerateContentParameters {
  topic: string;
  tone: string;
  language: string;
  platform?: string;
  length?: string;
}

export interface GenerateContentRequest {
  tool: 'generate_content';
  parameters: GenerateContentParameters;
  userInstructions?: string;
}

export interface GenerateContentResponse {
  success: boolean;
  data: {
    id: string;
    messages: ChatMessage[];
    currentText: string;
  };
  message?: string;
}

export interface ProcessToolResponse {
  success: boolean;
  data: {
    id: string;
    messages: ChatMessage[];
    currentText: string;
  };
  message: string;
}

export interface SendMessageRequest {
  message: string;
}

export interface SendMessageResponse {
  success: boolean;
  data: {
    id: string;
    messages: ChatMessage[];
    currentText: string;
  };
  message: string;
}

export interface ApplyTransformationResponse {
  success: boolean;
  data: ChatSession;
  message: string;
}

export interface FeedbackRequest {
  liked: boolean;
  feedbackText?: string;
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
}

export interface ConversationResponse {
  success: boolean;
  data: {
    id: string;
    messages: ChatMessage[];
    currentText: string;
  };
}

export interface SessionsListResponse {
  success: boolean;
  data: {
    sessions: ChatSession[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface ResetSessionResponse {
  success: boolean;
  data: ChatSession;
  message: string;
}

// ===== ERROR TYPES =====

export interface APIError {
  message: string | string[];
  error: string;
  statusCode: number;
}

// ===== DOMAIN FUNCTIONS =====

export function createInitialMessage(originalText: string): ChatMessage {
  return {
    id: 'initial',
    role: 'assistant',
    content: '¡Hola! Soy tu asistente de IA.\n\nEste es el texto que has escrito hasta ahora. Selecciona una opción para modificarlo.',
    avatar: '🤖',
    alignment: 'left',
    color: 'blue',
    timestamp: new Date().toISOString(),
    hasTransformedText: true,
    transformedText: originalText
  };
}

export function mapAIToolToOption(tool: AITool) {
  return {
    id: tool.type,
    title: tool.displayName.replace(/^[^\s]+\s/, ''), // Remover emoji del título
    icon: tool.displayName.split(' ')[0], // Extraer emoji
    hasSubmenu: tool.requiresSubMenu,
    isHighlighted: tool.isHighlighted,
    description: tool.description,
    requiresParameters: tool.requiresParameters?.required || false
  };
}

// Re-export InversifyJS types
export * from './inversify.types';
