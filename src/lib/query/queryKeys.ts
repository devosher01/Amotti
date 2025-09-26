/**
 * OAuth Query Keys - Solo para la feature OAuth
 */

export const oauthQueryKeys = {
  // Connections
  connections: () => ['oauth', 'connections'] as const,
  
  // Facebook  
  facebook: {
    pages: () => ['oauth', 'facebook', 'pages'] as const,
  },
  
  // Instagram
  instagram: {
    accounts: (pageId?: string) => 
      pageId 
        ? ['oauth', 'instagram', 'accounts', pageId] as const
        : ['oauth', 'instagram', 'accounts'] as const,
  },
} as const;