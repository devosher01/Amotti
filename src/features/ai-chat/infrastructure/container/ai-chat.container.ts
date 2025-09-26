// AI Chat Container - Clean Architecture Infrastructure Layer

import { Container } from 'inversify';
import { AIChatServiceImpl } from '../services/ai-chat.service.impl';
import {
  GetToolsUseCase,
  CreateSessionUseCase,
  ProcessToolUseCase,
  SendMessageUseCase,
  ApplyTransformationUseCase,
  AddFeedbackUseCase,
  ResetSessionUseCase,
  GenerateContentUseCase
} from '../../application';
import { AI_CHAT_TYPES } from '../../domain';

// Crear contenedor específico para AI Chat
export const aiChatContainer = new Container();

// Bindings
aiChatContainer.bind(AI_CHAT_TYPES.AIChatServicePort).to(AIChatServiceImpl);

// Use Cases
aiChatContainer.bind(AI_CHAT_TYPES.GetToolsUseCase).to(GetToolsUseCase);
aiChatContainer.bind(AI_CHAT_TYPES.CreateSessionUseCase).to(CreateSessionUseCase);
aiChatContainer.bind(AI_CHAT_TYPES.ProcessToolUseCase).to(ProcessToolUseCase);
aiChatContainer.bind(AI_CHAT_TYPES.SendMessageUseCase).to(SendMessageUseCase);
aiChatContainer.bind(AI_CHAT_TYPES.ApplyTransformationUseCase).to(ApplyTransformationUseCase);
aiChatContainer.bind(AI_CHAT_TYPES.AddFeedbackUseCase).to(AddFeedbackUseCase);
aiChatContainer.bind(AI_CHAT_TYPES.ResetSessionUseCase).to(ResetSessionUseCase);
aiChatContainer.bind(AI_CHAT_TYPES.GenerateContentUseCase).to(GenerateContentUseCase);
