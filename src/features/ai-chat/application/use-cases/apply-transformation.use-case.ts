// Apply Transformation Use Case - Clean Architecture Application Layer

import { injectable, inject } from 'inversify';
import type { AIChatServicePort } from '../ports/ai-chat.ports';
import { AI_CHAT_TYPES, type ApplyTransformationResponse } from '../../domain';

@injectable()
export class ApplyTransformationUseCase {
  constructor(
    @inject(AI_CHAT_TYPES.AIChatServicePort) private aiChatService: AIChatServicePort
  ) {}

  async execute(conversationId: string, messageId: string): Promise<ApplyTransformationResponse> {
    return this.aiChatService.applyTransformation(conversationId, messageId);
  }
}
