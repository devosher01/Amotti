import { useMemo } from 'react';
import { createPublicationApiAdapter } from '../../services/adapters/publication-api-adapter';
import { createToastNotificationAdapter } from '../../services/adapters/toast-notification-adapter';
import { httpClient } from '../../../../lib/http-client';

export function usePublicationDependencies() {
  return useMemo(() => ({
    publicationRepository: createPublicationApiAdapter(httpClient),
    notificationService: createToastNotificationAdapter()
  }), []);
}