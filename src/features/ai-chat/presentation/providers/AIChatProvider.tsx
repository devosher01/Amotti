// AI Chat Provider - Clean Architecture Presentation Layer

import React from 'react';
import { Provider } from 'inversify-react';
import { aiChatContainer } from '../../infrastructure/container/ai-chat.container';

interface AIChatProviderProps {
  children: React.ReactNode;
}

export const AIChatProvider: React.FC<AIChatProviderProps> = ({ children }) => {
  return (
    <Provider container={aiChatContainer}>
      {children}
    </Provider>
  );
};
