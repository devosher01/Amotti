// Reset Session Use Case - Clean Architecture Application Layer

import { injectable, inject } from 'inversify';
import type { AIChatServicePort } from '../ports/ai-chat.ports';
import { AI_CHAT_TYPES, type ResetSessionResponse } from '../../domain';

@injectable()
export class ResetSessionUseCase {
  constructor(
    @inject(AI_CHAT_TYPES.AIChatServicePort) private aiChatService: AIChatServicePort
  ) {}

  async execute(conversationId: string): Promise<ResetSessionResponse> {
    return this.aiChatService.resetSession(conversationId);
  }
}
