// Process Tool Use Case - Clean Architecture Application Layer

import { injectable, inject } from 'inversify';
import type { AIChatServicePort } from '../ports/ai-chat.ports';
import { AI_CHAT_TYPES, type ProcessToolRequest, type ProcessToolResponse } from '../../domain';

@injectable()
export class ProcessToolUseCase {
  constructor(
    @inject(AI_CHAT_TYPES.AIChatServicePort) private aiChatService: AIChatServicePort
  ) {}

  async execute(conversationId: string, request: ProcessToolRequest): Promise<ProcessToolResponse> {
    return this.aiChatService.processTool(conversationId, request);
  }
}
