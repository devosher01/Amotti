# Publications Feature (Clean Architecture)

This feature manages social media publications independently of UI/Auth/Calendar concerns.

- Domain: immutable entities and pure transformations
- Application: ports, commands, use cases
- Infrastructure: repository adapter using `httpClient` (cookies/refresh are handled there)
- UI: minimalist filters store + `usePublications` hook for loading data; no dependency on calendar libs

Usage outline
```ts
import { ApiPublicationRepository, listPublicationsUseCase } from '@/features/publications';

const repo = new ApiPublicationRepository();
const { publications, meta } = await listPublicationsUseCase({ month: '2025-09' }, { repo });
```

Calendar integration
- Use the mapper `mapPublicationsToEvents` to convert domain publications to UI-friendly event inputs.
- Timezone and calendar plugins are handled in the calendar feature, not here.

Notes
- API returns UTC strings; adapters and mappers ensure Date objects for UI layers when necessary.
- Keep adding use cases and ports here; do not import UI/React in domain or application layers.
