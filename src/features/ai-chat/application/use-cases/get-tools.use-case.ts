// Get Tools Use Case - Clean Architecture Application Layer

import { injectable, inject } from 'inversify';
import type { AIChatServicePort } from '../ports/ai-chat.ports';
import { AI_CHAT_TYPES, type AIToolsResponse } from '../../domain';

@injectable()
export class GetToolsUseCase {
  constructor(
    @inject(AI_CHAT_TYPES.AIChatServicePort) private aiChatService: AIChatServicePort
  ) {}

  async execute(currentText?: string): Promise<AIToolsResponse> {
    return this.aiChatService.getTools(currentText);
  }
}
