// Generate Content Use Case - Clean Architecture Application Layer

import { injectable, inject } from 'inversify';
import type { AIChatServicePort } from '../ports/ai-chat.ports';
import { AI_CHAT_TYPES, type GenerateContentRequest, type GenerateContentResponse } from '../../domain';

@injectable()
export class GenerateContentUseCase {
  constructor(
    @inject(AI_CHAT_TYPES.AIChatServicePort) private aiChatService: AIChatServicePort
  ) {}

  async execute(sessionId: string, request: GenerateContentRequest): Promise<GenerateContentResponse> {
    return this.aiChatService.generateContent(sessionId, request);
  }
}