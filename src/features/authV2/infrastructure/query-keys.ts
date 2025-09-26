export const authQueryKeys = {
  all: ['auth'] as const,
  user: () => [...authQueryKeys.all, 'user'] as const,
  currentUser: () => [...authQueryKeys.user(), 'current'] as const,
} as const;