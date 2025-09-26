// AI Chat Hook - Clean Architecture Presentation Layer

import { useState, useCallback, useEffect } from 'react';
import { useContainer } from 'inversify-react';
import { aiChatContainer } from '../../infrastructure/container/ai-chat.container';
import { AI_CHAT_TYPES } from '../../domain';
import type {
  GetToolsUseCase,
  CreateSessionUseCase,
  ProcessToolUseCase,
  SendMessageUseCase,
  ApplyTransformationUseCase,
  AddFeedbackUseCase,
  ResetSessionUseCase,
  GenerateContentUseCase
} from '../../application';
import type {
  ChatSession,
  ChatMessage,
  AITool,
  CreateSessionRequest,
  ProcessToolRequest,
  SendMessageRequest,
  FeedbackRequest,
  GenerateContentRequest,
  GenerateContentParameters,
  APIError
} from '../../domain';

interface UseAIChatProps {
  originalText: string;
  onTextGenerated?: (newText: string) => void;
}

interface UseAIChatReturn {
  // State
  session: ChatSession | null;
  messages: ChatMessage[];
  tools: AITool[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initializeSession: (config?: CreateSessionRequest['config']) => Promise<void>;
  processTool: (toolType: string, userMessage?: string, parameters?: Record<string, any>) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  applyTransformation: (messageId: string) => Promise<void>;
  addFeedback: (messageId: string, liked: boolean, feedbackText?: string) => Promise<void>;
  resetSession: () => Promise<void>;
  generateContent: (parameters: GenerateContentParameters, userInstructions?: string) => Promise<void>;
  clearError: () => void;
}

export const useAIChat = ({ originalText, onTextGenerated }: UseAIChatProps): UseAIChatReturn => {
  const container = useContainer();
  
  // Use Cases
  const getToolsUseCase = container.get<GetToolsUseCase>(AI_CHAT_TYPES.GetToolsUseCase);
  const createSessionUseCase = container.get<CreateSessionUseCase>(AI_CHAT_TYPES.CreateSessionUseCase);
  const processToolUseCase = container.get<ProcessToolUseCase>(AI_CHAT_TYPES.ProcessToolUseCase);
  const sendMessageUseCase = container.get<SendMessageUseCase>(AI_CHAT_TYPES.SendMessageUseCase);
  const applyTransformationUseCase = container.get<ApplyTransformationUseCase>(AI_CHAT_TYPES.ApplyTransformationUseCase);
  const addFeedbackUseCase = container.get<AddFeedbackUseCase>(AI_CHAT_TYPES.AddFeedbackUseCase);
  const resetSessionUseCase = container.get<ResetSessionUseCase>(AI_CHAT_TYPES.ResetSessionUseCase);
  const generateContentUseCase = container.get<GenerateContentUseCase>(AI_CHAT_TYPES.GenerateContentUseCase);

  // State
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tools, setTools] = useState<AITool[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTools = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getToolsUseCase.execute(originalText);
      if (response.success) {
        setTools(response.data.tools);
      }
    } catch (err) {
      const apiError = err as APIError;
      setError(Array.isArray(apiError.message) ? apiError.message.join(', ') : apiError.message);
    } finally {
      setIsLoading(false);
    }
  }, [getToolsUseCase, originalText]);

  // Cargar herramientas disponibles al inicializar
  useEffect(() => {
    if (tools.length === 0 && !isLoading) {
      loadTools();
    }
  }, [tools.length, isLoading, loadTools]);

  const initializeSession = useCallback(async (config?: CreateSessionRequest['config']) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // 🔍 Debug: Verificar qué texto se está enviando
      console.log('📝 Text being sent to AI Chat:', {
        originalText: originalText,
        type: typeof originalText,
        length: originalText?.length,
        trimmedLength: originalText?.trim?.()?.length,
        isEmpty: !originalText || originalText.trim().length === 0
      });

      // ⚠️ Validación antes de enviar
      if (!originalText || typeof originalText !== 'string') {
        throw new Error('Texto requerido');
      }

      const trimmed = originalText.trim();
      if (trimmed.length < 3) {
        throw new Error('El texto debe tener al menos 3 caracteres');
      }

      if (trimmed.length > 10000) {
        throw new Error('El texto no puede exceder 10,000 caracteres');
      }
      
      const request: CreateSessionRequest = {
        originalText: trimmed, // 🎯 Usar texto trimmed
        config: {
          aiInstructions: 'Usa un tono profesional y enfócate en beneficios',
          targetPlatforms: ['instagram', 'facebook'],
          contentStyle: 'profesional',
          maxMessages: 20,
          ...config
        }
      };

      console.log('🚀 Sending request to AI Chat:', request);

      const response = await createSessionUseCase.execute(request);
      
      if (response.success) {
        setSession(response.data);
        // Crear mensaje inicial del asistente
        const initialMessage: ChatMessage = {
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
        setMessages([initialMessage]);
      }
    } catch (err) {
      const apiError = err as APIError;
      setError(Array.isArray(apiError.message) ? apiError.message.join(', ') : apiError.message);
    } finally {
      setIsLoading(false);
    }
  }, [originalText, createSessionUseCase]);

  const processTool = useCallback(async (
    toolType: string, 
    userMessage?: string, 
    parameters?: Record<string, any>
  ) => {
    if (!session) {
      setError('No hay sesión activa');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const request: ProcessToolRequest = {
        toolType,
        userMessage: userMessage || `¿Puedes ${toolType.replace('_', ' ')}?`,
        parameters
      };

      const response = await processToolUseCase.execute(session.id, request);
      
      if (response.success) {
        setMessages(response.data.messages);
        setSession(prev => prev ? { ...prev, currentText: response.data.currentText } : null);
      }
    } catch (err) {
      const apiError = err as APIError;
      setError(Array.isArray(apiError.message) ? apiError.message.join(', ') : apiError.message);
    } finally {
      setIsLoading(false);
    }
  }, [session, processToolUseCase]);

  const sendMessage = useCallback(async (message: string) => {
    if (!session) {
      setError('No hay sesión activa');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const request: SendMessageRequest = { message };
      const response = await sendMessageUseCase.execute(session.id, request);
      
      if (response.success) {
        setMessages(response.data.messages);
        setSession(prev => prev ? { ...prev, currentText: response.data.currentText } : null);
      }
    } catch (err) {
      const apiError = err as APIError;
      setError(Array.isArray(apiError.message) ? apiError.message.join(', ') : apiError.message);
    } finally {
      setIsLoading(false);
    }
  }, [session, sendMessageUseCase]);

  const applyTransformation = useCallback(async (messageId: string) => {
    if (!session) {
      setError('No hay sesión activa');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await applyTransformationUseCase.execute(session.id, messageId);
      
      if (response.success) {
        setSession(response.data);
        // Llamar callback para actualizar el texto en el componente padre
        if (onTextGenerated) {
          onTextGenerated(response.data.currentText);
        }
      }
    } catch (err) {
      const apiError = err as APIError;
      setError(Array.isArray(apiError.message) ? apiError.message.join(', ') : apiError.message);
    } finally {
      setIsLoading(false);
    }
  }, [session, applyTransformationUseCase, onTextGenerated]);

  const addFeedback = useCallback(async (
    messageId: string, 
    liked: boolean, 
    feedbackText?: string
  ) => {
    if (!session) {
      setError('No hay sesión activa');
      return;
    }

    try {
      const request: FeedbackRequest = { liked, feedbackText };
      await addFeedbackUseCase.execute(session.id, messageId, request);
    } catch (err) {
      const apiError = err as APIError;
      setError(Array.isArray(apiError.message) ? apiError.message.join(', ') : apiError.message);
    }
  }, [session, addFeedbackUseCase]);

  const resetSession = useCallback(async () => {
    if (!session) {
      setError('No hay sesión activa');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await resetSessionUseCase.execute(session.id);
      
      if (response.success) {
        setSession(response.data);
        // Crear mensaje inicial del asistente
        const initialMessage: ChatMessage = {
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
        setMessages([initialMessage]);
      }
    } catch (err) {
      const apiError = err as APIError;
      setError(Array.isArray(apiError.message) ? apiError.message.join(', ') : apiError.message);
    } finally {
      setIsLoading(false);
    }
  }, [session, resetSessionUseCase, originalText]);

  const generateContent = useCallback(async (
    parameters: GenerateContentParameters,
    userInstructions?: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      // Crear sesión vacía para generación si no existe
      if (!session) {
        const sessionRequest: CreateSessionRequest = {
          originalText: '[GENERATION_MODE]', // 🎯 Usar el mismo marcador que el script de prueba
          config: {
            aiInstructions: 'Generar contenido desde cero',
            targetPlatforms: [parameters.platform || 'cualquier'],
            contentStyle: parameters.tone,
            maxMessages: 20
          }
        };

        console.log('🎯 Creating empty session for content generation:', sessionRequest);

        const sessionResponse = await createSessionUseCase.execute(sessionRequest);
        if (sessionResponse.success) {
          setSession(sessionResponse.data);
        } else {
          throw new Error('No se pudo crear la sesión para generación');
        }
      }

      // Preparar request de generación
      const generateRequest: GenerateContentRequest = {
        tool: 'generate_content',
        parameters,
        userInstructions
      };

      console.log('🚀 Generating content with parameters:', generateRequest);

      // Usar la sesión actual o la recién creada
      const currentSession = session || (await createSessionUseCase.execute({
        originalText: '[GENERATION_MODE]',
        config: { aiInstructions: 'Generar contenido desde cero' }
      })).data;

      const response = await generateContentUseCase.execute(currentSession.id, generateRequest);
      
      if (response.success) {
        // 🎯 La respuesta viene como ProcessToolResponse con messages y currentText
        if (response.data.messages) {
          setMessages(response.data.messages);
        }
        
        // Llamar callback para actualizar el texto en el componente padre
        if (onTextGenerated && response.data.currentText) {
          onTextGenerated(response.data.currentText);
        }

        console.log('✅ Content generated successfully:', response.data.currentText);
      }
    } catch (err) {
      const apiError = err as APIError;
      setError(Array.isArray(apiError.message) ? apiError.message.join(', ') : apiError.message);
      console.error('❌ Error generating content:', apiError);
    } finally {
      setIsLoading(false);
    }
  }, [session, createSessionUseCase, generateContentUseCase, onTextGenerated]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    session,
    messages,
    tools,
    isLoading,
    error,
    
    // Actions
    initializeSession,
    processTool,
    sendMessage,
    applyTransformation,
    addFeedback,
    resetSession,
    generateContent,
    clearError
  };
};
