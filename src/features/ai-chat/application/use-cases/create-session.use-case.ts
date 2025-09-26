// Create Session Use Case - Clean Architecture Application Layer

import { injectable, inject } from 'inversify';
import type { AIChatServicePort } from '../ports/ai-chat.ports';
import { AI_CHAT_TYPES, type CreateSessionRequest, type CreateSessionResponse } from '../../domain';

@injectable()
export class CreateSessionUseCase {
  constructor(
    @inject(AI_CHAT_TYPES.AIChatServicePort) private aiChatService: AIChatServicePort
  ) {}

  async execute(request: CreateSessionRequest): Promise<CreateSessionResponse> {
    return this.aiChatService.createSession(request);
  }
}
