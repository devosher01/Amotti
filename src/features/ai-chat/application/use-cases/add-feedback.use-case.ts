// Add Feedback Use Case - Clean Architecture Application Layer

import { injectable, inject } from 'inversify';
import type { AIChatServicePort } from '../ports/ai-chat.ports';
import { AI_CHAT_TYPES, type FeedbackRequest, type FeedbackResponse } from '../../domain';

@injectable()
export class AddFeedbackUseCase {
  constructor(
    @inject(AI_CHAT_TYPES.AIChatServicePort) private aiChatService: AIChatServicePort
  ) {}

  async execute(conversationId: string, messageId: string, request: FeedbackRequest): Promise<FeedbackResponse> {
    return this.aiChatService.addFeedback(conversationId, messageId, request);
  }
}
