// InversifyJS Types - Clean Architecture Domain Layer

export const AI_CHAT_TYPES = {
  // Ports
  AIChatServicePort: Symbol.for('AIChatServicePort'),
  
  // Use Cases
  GetToolsUseCase: Symbol.for('GetToolsUseCase'),
  CreateSessionUseCase: Symbol.for('CreateSessionUseCase'),
  ProcessToolUseCase: Symbol.for('ProcessToolUseCase'),
  SendMessageUseCase: Symbol.for('SendMessageUseCase'),
  ApplyTransformationUseCase: Symbol.for('ApplyTransformationUseCase'),
  AddFeedbackUseCase: Symbol.for('AddFeedbackUseCase'),
  ResetSessionUseCase: Symbol.for('ResetSessionUseCase'),
  GenerateContentUseCase: Symbol.for('GenerateContentUseCase'),
} as const;
