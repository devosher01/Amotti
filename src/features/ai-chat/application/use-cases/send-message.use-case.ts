// Send Message Use Case - Clean Architecture Application Layer

import { injectable, inject } from 'inversify';
import type { AIChatServicePort } from '../ports/ai-chat.ports';
import { AI_CHAT_TYPES, type SendMessageRequest, type SendMessageResponse } from '../../domain';

@injectable()
export class SendMessageUseCase {
  constructor(
    @inject(AI_CHAT_TYPES.AIChatServicePort) private aiChatService: AIChatServicePort
  ) {}

  async execute(conversationId: string, request: SendMessageRequest): Promise<SendMessageResponse> {
    return this.aiChatService.sendMessage(conversationId, request);
  }
}
